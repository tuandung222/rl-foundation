---
title: 3.2 Monte Carlo và Temporal Difference
---

# 3.2 Monte Carlo và Temporal Difference

Monte Carlo và Temporal Difference là hai cách rất khác nhau để trả lời cùng một câu hỏi: làm sao biết một state đáng giá bao nhiêu khi ta không có công thức đầy đủ của environment?

Cách dễ nhất để hiểu chúng là tưởng tượng bạn đang đánh giá một agent hỗ trợ khách hàng. Một cuộc hội thoại có thể kéo dài nhiều lượt. Cuối cùng người dùng hài lòng hoặc không hài lòng. Nếu đợi đến cuối cuộc hội thoại rồi mới đánh giá từng trạng thái, bạn đang nghĩ kiểu Monte Carlo. Nếu sau mỗi lượt bạn cập nhật ngay nhận định dựa trên dấu hiệu hiện tại và ước lượng tương lai, bạn đang nghĩ kiểu Temporal Difference.

## Monte Carlo, học sau khi câu chuyện kết thúc

Monte Carlo dùng return thật của episode để cập nhật value. Nếu một episode bắt đầu từ state $s$ và kết thúc với return $G_t$, ta cập nhật $V(s)$ để gần hơn với $G_t$.

Trực giác rất đơn giản: tôi đã đi qua state này, tôi đã thấy cuối cùng nhận được bao nhiêu reward, vậy state đó nên được đánh giá gần với kết quả đã xảy ra.

Ưu điểm của Monte Carlo là target không phụ thuộc vào ước lượng value hiện tại. Nó nhìn outcome thật. Với LLM evaluation, điều này giống như chờ một agent hoàn thành task rồi dùng success/failure cuối cùng, human rating hoặc business metric để học.

Nhược điểm là phải chờ episode kết thúc. Nếu episode dài, feedback đến muộn. Nếu reward cuối cùng rất nhiễu, cập nhật có variance cao. Một customer support session bị đánh giá thấp có thể do agent, do người dùng khó tính, do tài liệu thiếu, hoặc do tool lỗi. Monte Carlo thấy outcome thật nhưng không tự biết nguyên nhân.

## Temporal Difference, học ngay khi có một bước mới

TD cập nhật value bằng target một bước:

$$
V(s_t) \leftarrow V(s_t) + \alpha [r_{t+1} + \gamma V(s_{t+1}) - V(s_t)]
$$

Đọc công thức này theo nghĩa đời thường: ta so sánh ước lượng cũ của state hiện tại với một target mới gồm reward vừa nhận cộng với value ước lượng của state tiếp theo. Phần trong ngoặc vuông là TD error, tức là mức độ ngạc nhiên của agent.

Nếu reward và state kế tiếp tốt hơn kỳ vọng, TD error dương, value tăng. Nếu tệ hơn kỳ vọng, TD error âm, value giảm.

Điểm mạnh của TD là học được trước khi episode kết thúc. Điều này rất quan trọng trong task dài. Một LLM agent có thể nhận tín hiệu sớm: tool call fail, retrieval không có kết quả, test fail, hoặc evaluator trung gian cảnh báo hallucination. Ta không cần chờ toàn bộ task thất bại mới cập nhật đánh giá.

## Bias và variance

Monte Carlo thường ít bias hơn vì dùng return thật, nhưng variance cao hơn vì return phụ thuộc vào toàn bộ tương lai. TD thường variance thấp hơn vì cập nhật từng bước, nhưng có bias vì bootstrap từ value ước lượng.

Đây là trade-off rất sâu. Trong LLM, human feedback cuối cùng có thể đáng tin hơn evaluator trung gian, nhưng đắt và chậm. Evaluator trung gian rẻ và nhanh, nhưng có thể sai. Một hệ thống tốt thường cần cả hai: outcome thật để neo mục tiêu, evaluator trung gian để học và debug nhanh hơn.

## TD error như tín hiệu debug

TD error không chỉ là công cụ toán học. Nó còn là một mental model rất hay để debug agent.

Nếu agent kỳ vọng một tool call sẽ giúp nhiều nhưng thực tế tool trả dữ liệu rỗng, đó là một bất ngờ âm. Nếu một câu hỏi làm rõ tưởng như làm chậm cuộc hội thoại nhưng sau đó giúp giải quyết task tốt hơn, đó là bất ngờ dương. Nếu một retrieval query thường xuyên dẫn tới state xấu, hệ thống nên học giảm xác suất query kiểu đó.

Trong agent production, ta có thể không tính TD error đúng textbook, nhưng vẫn có thể log các bước làm thay đổi xác suất thành công: bước nào giảm uncertainty, bước nào tăng rủi ro, bước nào làm chi phí tăng mà không cải thiện outcome.

## Ghi chú nghiên cứu: bias, variance, n-step return và eligibility traces

Ở mức research, khác biệt giữa Monte Carlo và TD không chỉ là học cuối episode hay học từng bước. Khác biệt sâu hơn nằm ở cách chọn estimator cho return.

Monte Carlo dùng sampled return đầy đủ:

$$
G_t = \sum_{k=0}^{T-t-1} \gamma^k r_{t+k+1}
$$

Nếu policy cố định và episode được sample đúng từ environment, $G_t$ là một estimator tự nhiên cho return dưới policy đó. Nó ít bias theo nghĩa không bootstrap từ value estimate hiện tại. Nhưng variance có thể lớn vì $G_t$ phụ thuộc vào toàn bộ tương lai, bao gồm nhiều nguồn noise mà state hiện tại không kiểm soát được.

TD(0) dùng target:

$$
y_t^{TD} = r_{t+1} + \gamma V(s_{t+1})
$$

Target này thường có variance thấp hơn vì chỉ nhìn một bước reward rồi dùng value estimate. Nhưng nó có bias nếu $V(s_{t+1})$ chưa chính xác. Đây là bias do bootstrapping. Vì vậy, TD không đơn giản là tốt hơn Monte Carlo. Nó đổi variance thấp hơn lấy bias có kiểm soát.

Giữa hai cực này là n-step return:

$$
G_t^{(n)} = r_{t+1} + \gamma r_{t+2} + ... + \gamma^{n-1} r_{t+n} + \gamma^n V(s_{t+n})
$$

Khi $n=1$, ta gần TD(0). Khi $n$ bằng độ dài còn lại của episode, ta gần Monte Carlo. Vì vậy $n$ là núm điều chỉnh bias-variance.

Một cách tổng quát hơn là $\lambda$-return:

$$
G_t^{\lambda} = (1 - \lambda) \sum_{n=1}^{\infty} \lambda^{n-1} G_t^{(n)}
$$

Đọc công thức này theo nghĩa trực giác: thay vì chọn một độ dài n cố định, ta trộn nhiều n-step returns, trong đó $\lambda$ quyết định ta tin nhiều hơn vào target ngắn hay target dài. Eligibility traces là cơ chế tính toán hiệu quả ý tưởng này trong quá trình học online.

Với agent LLM, cùng trực giác xuất hiện khi ta quyết định học từ tín hiệu nào. Chấm cuối toàn bộ task giống Monte Carlo. Chấm từng tool call bằng evaluator trung gian giống TD. Chấm một đoạn trace vài bước giống n-step return. Một hệ thống research tốt thường không chọn một cực duy nhất, mà thiết kế nhiều tầng feedback với bias và variance được hiểu rõ.

## Tóm tắt

Monte Carlo học từ kết quả thật sau khi episode kết thúc. TD học từng bước bằng cách so reward vừa nhận và value ước lượng của state tiếp theo với kỳ vọng cũ. Monte Carlo gần outcome thật hơn nhưng chậm và nhiễu. TD nhanh hơn nhưng phụ thuộc vào ước lượng. Với LLM systems, khác biệt này tương ứng với việc học từ human outcome cuối cùng và học từ evaluator hoặc trace signal trung gian.
