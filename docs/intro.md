---
title: Giới thiệu Reinforcement Learning Foundation
---

# Reinforcement Learning Foundation

Reinforcement Learning thường bị hiểu nhầm là một nhánh học máy dành cho game, robot hoặc những môi trường mô phỏng xa công việc hằng ngày của người làm NLP. Cách nhìn đó không sai hoàn toàn, nhưng quá hẹp. Nếu nhìn sâu hơn, RL là ngôn ngữ để mô tả một câu hỏi rất thực tế: khi một hệ thống phải đưa ra nhiều quyết định nối tiếp nhau, và chỉ nhận phản hồi sau khi cả chuỗi hành động đã diễn ra, ta học như thế nào?

Đây chính là kiểu vấn đề xuất hiện ngày càng nhiều trong hệ thống LLM hiện đại. Một chatbot không chỉ dự đoán một nhãn. Nó sinh nhiều token, gọi tool, truy xuất tài liệu, tự sửa câu trả lời, cân bằng giữa helpfulness và safety, rồi cuối cùng mới nhận đánh giá từ người dùng hoặc evaluator. Một coding agent không chỉ chọn một dòng code. Nó đọc repo, lập plan, sửa file, chạy test, đọc lỗi, sửa lại, và sau đó mới biết task thành công hay thất bại. Một hệ thống retrieval không chỉ chọn một document. Nó query, rerank, synthesize, cite, rồi chịu trách nhiệm về câu trả lời cuối cùng.

Vì vậy, giáo trình này học RL theo một hướng khác với nhiều tài liệu nhập môn. Ta vẫn học agent, environment, reward, return, policy, value function, Bellman equation, Q-learning, policy gradient, actor-critic và PPO. Nhưng mỗi khái niệm sẽ luôn được nối về câu hỏi của người làm NLP và LLM: khái niệm này giúp ta hiểu điều gì về hành vi của model, về preference data, về reward model, về long-horizon interaction, về agent trace, và về hệ thống AI production?

## Mục tiêu của giáo trình

Sau khi đi qua giáo trình này, người đọc cần đạt ba tầng hiểu biết.

Thứ nhất là tầng trực giác. Bạn cần cảm được vì sao RL khác supervised learning. Trong supervised learning, dữ liệu thường nói khá rõ input nào đi với target nào. Trong RL, hành động hôm nay có thể tạo điều kiện cho phần thưởng ngày mai, và phần thưởng ngày mai có thể không nói rõ hành động nào trước đó là nguyên nhân. Đây là khác biệt nền tảng.

Thứ hai là tầng hình thức. Trực giác tốt nhưng chưa đủ. Ta sẽ formalize bằng state, action, reward, transition, trajectory, return, policy và value. Những ký hiệu này không phải trang trí toán học. Chúng là cách nén một vấn đề phức tạp thành mô hình có thể phân tích và tối ưu.

Thứ ba là tầng ứng dụng. Mỗi phần đều cố gắng trả lời: nếu bạn đang xây LLM product, agent workflow, reward model, evaluator, personalization loop hoặc tool-using system, bài học RL này thay đổi cách bạn thiết kế hệ thống ra sao?

## Cách đọc

Nếu bạn đã quen với NLP hoặc LLM nhưng chưa học RL, hãy bắt đầu từ Phần 0 và Phần 1. Đừng vội nhảy vào PPO hay RLHF. PPO chỉ có nghĩa khi bạn hiểu policy, return, value và advantage. RLHF chỉ có nghĩa khi bạn hiểu reward không phải label, và rollout không phải một sample độc lập.

Nếu bạn đã biết RL cơ bản nhưng muốn nối sang LLM, hãy đọc Phần 1 nhanh, rồi tập trung vào Phần 6. Tuy nhiên, vẫn nên đọc lại các khái niệm nền tảng bằng lăng kính LLM, vì nhiều nhầm lẫn trong RLHF đến từ việc dùng thuật ngữ quen tai nhưng hiểu theo nghĩa supervised learning.

Nếu bạn đang xây hệ thống production, hãy chú ý các đoạn về failure modes, monitoring và trade-off. RL không chỉ là thuật toán. RL là cách nhìn hành vi của một hệ thống học từ feedback, và hệ thống như vậy luôn có rủi ro về reward hacking, distribution shift, evaluation bias và feedback loop.

Nếu bạn là học viên research, PhD hoặc research scientist, hãy đọc mạch chính trước để giữ trực giác, sau đó quay lại các mục Ghi chú nghiên cứu trong từng bài và đọc Phần 9. Phần này nối các công thức quen thuộc với Bellman operators, stochastic approximation, convergence assumptions, policy gradient theorem, PPO surrogate, DPO derivation và support mismatch trong offline RL.
