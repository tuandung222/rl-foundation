---
title: 1.2 MDP, Trajectory, Return và Discount
---

# 1.2 MDP, Trajectory, Return và Discount

Ở bài trước, ta đã có ba nhân vật: agent, environment và reward. Nhưng nếu chỉ nói như vậy, ta mới có một bức tranh trực giác. Để phân tích nghiêm túc, ta cần một mô hình hình thức hơn. Mô hình kinh điển của RL là Markov Decision Process, thường viết tắt là MDP.

MDP có vẻ là một định nghĩa toán học khô khan, nhưng thực ra nó trả lời một câu hỏi rất đời thường: ta cần biết tối thiểu những gì về hiện tại để ra quyết định tốt cho tương lai?

## Markov property là gì?

Một state có tính Markov nếu nó chứa đủ thông tin cần thiết để dự đoán tương lai, miễn là ta biết action tiếp theo. Nói cách khác, nếu state hiện tại đã đầy đủ, thì lịch sử trước đó không cần được nhìn lại trực tiếp.

Trong game cờ, bàn cờ hiện tại thường đủ để quyết định nước đi, không cần biết quân cờ đã đi qua đâu. Trong chatbot, điều này phức tạp hơn. Prompt hiện tại có thể không đủ nếu thiếu lịch sử hội thoại, profile người dùng, retrieved documents hoặc tool outputs. Nếu ta gọi một thứ là state nhưng nó thiếu thông tin quan trọng, agent sẽ ra quyết định dựa trên một thế giới bị cắt cụt.

Đây là lý do context engineering rất gần với RL. Với LLM agent, thiết kế state chính là thiết kế context. Nếu context thiếu, policy dù mạnh vẫn chọn action trong tình trạng mù một phần.

## MDP gồm những thành phần nào?

Một MDP thường được mô tả bằng năm thành phần:

- **State space $S$:** tập các trạng thái có thể có.
- **Action space $A$:** tập các hành động agent có thể chọn.
- **Transition function $P(s' \mid s, a)$:** xác suất môi trường chuyển sang state mới $s'$ khi agent chọn action $a$ tại state $s$.
- **Reward function $R(s, a, s')$:** reward nhận được khi đi từ $s$ sang $s'$ qua action $a$.
- **Discount factor $\gamma$:** hệ số cho biết ta coi trọng reward tương lai đến mức nào.

Đọc danh sách này theo nghĩa hệ thống: ta cần biết thế giới có những trạng thái nào, agent được làm gì, hành động làm thế giới thay đổi ra sao, phản hồi được tính thế nào, và ta có kiên nhẫn với lợi ích dài hạn đến đâu.

## Trajectory là một câu chuyện hành động

Trong RL, một lần tương tác đầy đủ thường được gọi là trajectory hoặc episode:

$$
\tau = (s_0, a_0, r_1, s_1, a_1, r_2, ..., s_T)
$$

Đọc công thức này theo nghĩa đời thường: trajectory là câu chuyện của agent từ lúc bắt đầu đến lúc kết thúc. Nó ghi lại agent đã thấy gì, làm gì, nhận phản hồi nào, rồi đi tới đâu.

Với LLM, trajectory có thể là toàn bộ một cuộc hội thoại. Với coding agent, trajectory là trace gồm các bước đọc file, sửa code, chạy test và phản hồi lỗi. Với retrieval agent, trajectory có thể gồm query đầu tiên, documents được lấy, reranking, synthesis, citation và final answer.

Cách nhìn trajectory rất quan trọng vì chất lượng của hệ thống thường không nằm ở một action đơn lẻ. Một action tốt trong ngắn hạn có thể mở đường cho hành động xấu về sau. Một action trông thừa, như hỏi lại người dùng để làm rõ, có thể làm giảm lỗi ở cuối episode.

## Return là tổng giá trị mà agent thật sự quan tâm

Reward ở từng bước là tín hiệu cục bộ. Nhưng agent thường cần tối ưu tổng reward theo thời gian, gọi là return:

$$
G_t = r_{t+1} + \gamma r_{t+2} + \gamma^2 r_{t+3} + ...
$$

Điểm quan trọng của công thức không nằm ở ký hiệu, mà ở cách nó buộc ta nhìn xa hơn reward ngay lập tức. $G_t$ là tổng lợi ích tương lai tính từ thời điểm $t$. Hệ số $\gamma$ nằm giữa 0 và 1, dùng để giảm trọng số của reward xa trong tương lai.

Nếu $\gamma$ gần 0, agent gần như chỉ quan tâm reward ngay trước mắt. Nếu $\gamma$ gần 1, agent quan tâm nhiều hơn đến hậu quả dài hạn.

## Discount trong LLM systems

Discount factor nghe có vẻ chỉ là chi tiết toán học, nhưng nó có ý nghĩa thiết kế hệ thống.

Một chatbot tối ưu phản hồi tức thời có thể trả lời thật nhanh và thật tự tin, vì reward ngắn hạn có thể cao. Nhưng nếu ta quan tâm đến niềm tin dài hạn của người dùng, ta cần phạt hallucination, phạt thiếu kiểm chứng và thưởng cho việc hỏi lại khi chưa chắc. Nghĩa là ta đang tăng tầm quan trọng của reward dài hạn.

Một agent tự động sửa code cũng vậy. Nếu chỉ thưởng cho việc làm test hiện tại pass, agent có thể hard-code, bỏ qua edge cases hoặc làm nợ kỹ thuật. Nếu reward phản ánh maintainability, readability và future failures, agent sẽ phải học hành vi bền vững hơn.

Trong thực tế, ta hiếm khi chọn một con số $\gamma$ cho LLM product theo nghĩa textbook. Nhưng tư duy discount vẫn hữu ích: sản phẩm của ta đang tối ưu hành vi ngắn hạn hay dài hạn?

## MDP có phải lúc nào cũng đúng không?

Không. MDP là mô hình, không phải bản sao hoàn hảo của thế giới. Nhiều hệ thống LLM là partially observable: agent không thấy hết trạng thái thật. Người dùng có ý định ẩn, database có dữ liệu thiếu, tool có lỗi ngẫu nhiên, evaluator có bias, và context window có giới hạn. Khi state không đầy đủ, ta có POMDP, tức là partially observable Markov decision process.

Tuy vậy, MDP vẫn là điểm bắt đầu tốt. Nó cho ta một ngôn ngữ rõ ràng để hỏi: state của ta có đủ không, action space có hợp lý không, reward có lệch không, transition có ổn định không, và mục tiêu dài hạn là gì?

## Tóm tắt

MDP formalize vấn đề ra quyết định tuần tự. Trajectory là câu chuyện hành động của agent. Return là tổng reward tương lai mà agent cần tối ưu. Discount factor biểu diễn mức độ ta coi trọng tương lai. Với LLM systems, những khái niệm này không xa lạ: state là context, action là token hoặc tool call, trajectory là trace, reward là preference hoặc task success, và discount là thái độ của hệ thống với lợi ích dài hạn.
