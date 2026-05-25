---
title: 1.1 Agent, Environment và Reward
---

# 1.1 Agent, Environment và Reward

Hãy bắt đầu bằng một tình huống quen thuộc với người làm LLM. Bạn có một coding agent. Người dùng giao task: sửa một bug trong repo. Agent đọc yêu cầu, mở file, tìm hàm liên quan, sửa code, chạy test, đọc lỗi, sửa tiếp, rồi báo hoàn thành. Cuối cùng, ta đánh giá: bug đã hết chưa, test có pass không, patch có phá kiến trúc không, có làm lộ secret không?

Nếu nhìn bằng supervised learning, ta sẽ hỏi: input là yêu cầu, output đúng là patch nào? Câu hỏi này hữu ích nhưng thiếu. Trong thực tế, agent không nhảy thẳng từ yêu cầu tới patch. Nó đi qua một chuỗi quan sát và hành động. Mỗi hành động thay đổi trạng thái của thế giới: file được đọc, code được sửa, test được chạy, lỗi mới xuất hiện. Phản hồi cuối cùng thường đến sau cả chuỗi đó.

Đây là điểm Reinforcement Learning bước vào.

## Ba nhân vật chính

Trong RL cơ bản, ta luôn gặp ba nhân vật: agent, environment và reward.

**Agent** là thực thể chọn hành động. Trong game, agent là người chơi. Trong robot, agent là controller. Trong LLM system, agent có thể là model sinh token, workflow chọn tool, router chọn model, hoặc toàn bộ hệ thống đang quyết định bước tiếp theo.

**Environment** là phần còn lại của thế giới mà agent tương tác. Trong game, environment là màn chơi. Trong chatbot, environment có thể là người dùng, conversation state, retrieval system, policy an toàn, tool runtime và dữ liệu bên ngoài. Trong coding agent, environment bao gồm repo, filesystem, test runner, compiler, API docs và phản hồi từ reviewer.

**Reward** là tín hiệu phản hồi cho biết hành động hoặc chuỗi hành động tốt đến đâu. Reward không nhất thiết là nhãn đúng. Nó có thể là điểm game, số test pass, human preference score, evaluator score, mức giảm chi phí, mức hài lòng của người dùng, hoặc penalty khi vi phạm policy an toàn.

## RL không học từ đáp án, RL học từ hậu quả

Câu này rất quan trọng. Trong supervised learning, dữ liệu thường nói rõ output đúng. Trong RL, dữ liệu thường nói về hậu quả của hành động.

Giả sử một agent trả lời câu hỏi khách hàng. Người dùng đánh giá 1 sao. Đánh giá đó không nói chính xác token nào sai. Nó chỉ nói toàn bộ hành vi vừa rồi không đạt kỳ vọng. Có thể agent hiểu sai ý định, truy xuất sai document, trả lời quá dài, bỏ qua ràng buộc bảo mật, hoặc dùng giọng văn không phù hợp. Reward là tín hiệu tổng hợp, không phải lời giải chi tiết.

Vì vậy, RL buộc ta xử lý một bài toán khó hơn: từ phản hồi thô và thường đến muộn, làm sao cải thiện cách chọn hành động?

## Formalization tối thiểu

Ta có thể viết một bước tương tác như sau:

$$
s_t \xrightarrow{a_t} s_{t+1}, r_{t+1}
$$

Đọc công thức này theo nghĩa đời thường: tại thời điểm $t$, agent nhìn thấy state $s_t$, chọn action $a_t$, environment chuyển sang state mới $s_{t+1}$ và trả về reward $r_{t+1}$.

Trong một LLM agent, state $s_t$ có thể bao gồm prompt hiện tại, lịch sử hội thoại, tool outputs và các file đã đọc. Action $a_t$ có thể là sinh câu trả lời, gọi search, đọc file, chạy test, hỏi người dùng, hoặc dừng lại. Reward $r_{t+1}$ có thể đến ngay, ví dụ tool call thành công, hoặc đến cuối trace, ví dụ task được reviewer chấp nhận.

## Reward không phải objective hoàn hảo

Một hiểu nhầm rất phổ biến là: nếu có reward thì chỉ cần tối đa hoá reward. Trong thực tế, reward chỉ là một proxy cho điều ta thật sự muốn. Proxy có thể sai.

Một reward model có thể thích câu trả lời dài vì trong dữ liệu preference, câu dài thường được chọn. Nhưng nếu tối ưu mù quáng, model có thể sinh câu trả lời dài dòng, tự tin, nghe có vẻ tốt nhưng không chính xác. Một evaluator có thể cho điểm cao khi câu trả lời có nhiều citation, nhưng agent có thể học cách thêm citation không liên quan. Một hệ thống support có thể thưởng cho tốc độ phản hồi, nhưng agent có thể trả lời quá nhanh mà không kiểm tra đủ thông tin.

Hiện tượng này gọi là reward hacking hoặc specification gaming. Agent tối ưu đúng tín hiệu được giao, nhưng tín hiệu đó không hoàn toàn khớp với mục tiêu thật.

## Bài học cho người làm LLM

Khi thiết kế LLM system, hãy tự hỏi ba câu hỏi RL trước khi nghĩ tới thuật toán.

Thứ nhất, agent thật sự là gì? Có phải chỉ là model sinh token, hay là cả workflow gồm retrieval, tool use, evaluator và fallback?

Thứ hai, environment thật sự gồm những gì? Có người dùng, dữ liệu thay đổi, tool không ổn định, latency, cost, policy an toàn và trạng thái phiên làm việc không?

Thứ ba, reward thật sự đo gì? Nó đo sự hài lòng, độ đúng, độ an toàn, chi phí, hay một proxy dễ đo nhưng có thể bị khai thác?

Nếu trả lời mơ hồ ba câu này, thuật toán RL phía sau sẽ không cứu được hệ thống. RL giỏi tối ưu tín hiệu, nhưng không tự đảm bảo tín hiệu đó đúng với giá trị sản phẩm.

## Tóm tắt

Agent chọn hành động. Environment phản hồi và chuyển trạng thái. Reward cho biết một phần về chất lượng hành vi. Điểm khác biệt của RL so với supervised learning là agent học từ hậu quả của hành động trong một chuỗi tương tác, không chỉ từ đáp án đúng đã có sẵn. Với LLM, đây là mental model nền tảng để hiểu RLHF, tool-using agents và evaluation theo trace.
