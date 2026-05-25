---
title: 3.1 Learning from Experience, học từ trải nghiệm thay vì đáp án có sẵn
---

# 3.1 Learning from Experience, học từ trải nghiệm thay vì đáp án có sẵn

Sau khi hiểu Bellman equation, ta có thể thấy một con đường lý tưởng: nếu biết đầy đủ transition và reward của environment, ta có thể tính value bằng dynamic programming. Nhưng trong phần lớn bài toán thật, agent không được trao sẵn bản đồ của thế giới. Nó phải hành động, quan sát hậu quả, rồi học từ trải nghiệm.

Đây là bước chuyển quan trọng từ RL như một mô hình toán học sang RL như một quy trình học. Với người làm LLM, bước chuyển này rất quen: ta không bao giờ biết đầy đủ mọi phản ứng người dùng, mọi lỗi tool, mọi tình huống edge case của repo, hoặc mọi bias của evaluator. Ta chỉ có logs, traces, feedback, preference data và những lần hệ thống đã tương tác với thế giới.

## Experience là gì?

Trong RL, một mẩu experience thường có dạng:

$$
(s_t, a_t, r_{t+1}, s_{t+1})
$$

Đọc công thức này theo nghĩa đời thường: tại một trạng thái, agent làm một việc, nhận một phản hồi, rồi thấy trạng thái kế tiếp. Nếu gom nhiều mẩu như vậy, ta có trajectory. Nếu gom nhiều trajectory, ta có dataset trải nghiệm.

Trong LLM system, experience có thể là một conversation log, một agent trace, một session recommendation, hoặc một rollout sinh response. Ví dụ một trace của coding agent có thể ghi: prompt ban đầu, file được mở, diff được tạo, test được chạy, lỗi test, patch sửa lại, kết quả cuối cùng. Nếu chỉ lưu final answer, ta mất đi phần quan trọng nhất của RL: quá trình hành động.

## Monte Carlo và Temporal Difference

Có hai cách học value từ experience rất nền tảng.

Monte Carlo chờ episode kết thúc rồi dùng return thật đã quan sát để cập nhật value. Nó giống như sau khi một dự án kết thúc, ta nhìn lại toàn bộ kết quả và đánh giá từng quyết định. Ưu điểm là target gần với outcome thật. Nhược điểm là phải chờ kết thúc, và variance có thể cao.

Temporal Difference, thường viết là TD, cập nhật value ngay sau một bước bằng cách bootstrap từ value ước lượng của state kế tiếp. Nó giống như trong lúc đang làm dự án, ta chưa biết kết quả cuối cùng nhưng vẫn cập nhật nhận định dựa trên dấu hiệu mới nhất. Ưu điểm là học sớm và hiệu quả hơn. Nhược điểm là target phụ thuộc vào ước lượng hiện tại, nên có bias.

Sự khác biệt giữa Monte Carlo và TD chính là một trong những căng thẳng trung tâm của RL: học từ kết quả thật nhưng muộn và nhiễu, hay học sớm từ ước lượng nhưng có thể sai.

## On-policy và off-policy

Một câu hỏi khác: experience đến từ policy nào?

On-policy learning học từ dữ liệu sinh ra bởi chính policy hiện tại. Nó giống như bạn đánh giá đúng thói quen làm việc hiện tại của agent. Nếu agent hiện tại hay hỏi lại người dùng, dữ liệu on-policy sẽ phản ánh các cuộc hội thoại có nhiều câu hỏi làm rõ.

Off-policy learning học từ dữ liệu sinh ra bởi một policy khác. Ví dụ, bạn có log từ phiên bản cũ của chatbot, từ human agent, hoặc từ một model khác. Off-policy hấp dẫn vì tận dụng được dữ liệu có sẵn, nhưng khó hơn vì dữ liệu không phản ánh chính xác hành vi hiện tại của policy mới.

Trong LLM, off-policy là chuyện thường xuyên. Preference datasets, logs từ model cũ, human demonstrations và synthetic traces đều có thể đến từ policy khác. Nếu không chú ý, ta có thể tối ưu một policy mới dựa trên distribution không còn khớp với môi trường hiện tại.

## Exploration và exploitation

Agent phải cân bằng giữa exploitation và exploration. Exploitation nghĩa là dùng hành động ta tin là tốt. Exploration nghĩa là thử hành động mới để học thêm.

Với LLM, exploration không nhất thiết là hành động nguy hiểm trong production. Nó có thể là sampling nhiều responses trong offline eval, thử nhiều retrieval query trong sandbox, dùng canary traffic nhỏ, hoặc cho agent thử workflow khác trong môi trường giả lập. Điều quan trọng là exploration cần boundary. Không phải cứ thử nhiều là tốt. Một agent có quyền ghi database thật, gửi email thật hoặc chạy command nguy hiểm thì exploration thiếu kiểm soát có thể gây hại.

## Bài học hệ thống

Nếu bạn xây LLM product, hãy nghĩ về experience design. Bạn có lưu đủ trace để học không? Bạn có biết reward đến từ đâu không? Bạn có phân biệt feedback tức thời và outcome dài hạn không? Bạn có biết data được sinh bởi policy nào không? Bạn có sandbox để exploration không?

Một hệ thống không lưu trace tốt sẽ rất khó cải thiện bằng RL. Nó giống như muốn huấn luyện vận động viên nhưng chỉ ghi kết quả thắng thua, không ghi lại trận đấu diễn ra thế nào.

## Tóm tắt

Learning from experience là trái tim thực dụng của RL. Agent không chỉ học từ công thức, mà học từ các mẩu tương tác với environment. Monte Carlo học từ return thật sau khi episode kết thúc. TD học sớm bằng bootstrap. On-policy và off-policy nói về nguồn gốc dữ liệu. Exploration giúp agent tìm hành vi tốt hơn nhưng cần được kiểm soát, đặc biệt trong LLM systems có tool và quyền hạn thật.
