---
title: 8.1 Lab Roadmap, học RL bằng thực hành có kiểm soát
---

# 8.1 Lab Roadmap, học RL bằng thực hành có kiểm soát

RL rất khó học nếu chỉ đọc công thức. Người học cần thấy agent thất bại, thấy reward bị thiết kế sai, thấy Q-table hội tụ chậm, thấy DQN rung lắc, thấy PPO nhạy với hyperparameter, và thấy evaluator có thể bị khai thác. Vì vậy, labs là phần không thể thiếu của giáo trình.

Nhưng labs cũng cần có triết lý. Mục tiêu không phải chạy notebook cho ra video đẹp. Mục tiêu là khiến người học hiểu cơ chế.

## Lab 1, GridWorld hoặc FrozenLake

Lab đầu tiên nên nhỏ tới mức người học có thể vẽ state space trên giấy. GridWorld hoặc FrozenLake giúp thấy agent, environment, reward, terminal state và exploration.

Người học nên tự chỉnh reward để thấy reward shaping ảnh hưởng hành vi ra sao. Nếu thưởng sai, agent đi đường kỳ lạ. Đây là bài học đầu tiên về reward design.

## Lab 2, Q-learning tabular

Sau khi có môi trường nhỏ, ta cài Q-learning. Người học nên quan sát Q-table thay đổi, epsilon giảm dần, và policy cuối cùng hình thành.

Điểm quan trọng là không chỉ nhìn reward curve. Hãy nhìn policy map. Hãy hỏi state nào học nhanh, state nào học chậm, state nào ít được thăm. Đây là cách hiểu exploration và coverage.

## Lab 3, DQN trên CartPole

CartPole đủ đơn giản để chạy nhanh nhưng đủ phức tạp để cần function approximation. Lab này dùng để quan sát replay buffer, target network và instability.

Người học nên thử bỏ target network hoặc giảm buffer để thấy training tệ đi. Một lab tốt không chỉ cho thấy thuật toán đúng, mà cho thấy vì sao kỹ thuật ổn định cần thiết.

## Lab 4, Policy gradient và PPO toy

Lab này cho thấy policy gradient có variance cao, baseline giúp ổn định, và PPO clipping giúp tránh update quá mạnh.

Không cần bắt đầu bằng mô hình lớn. Một môi trường nhỏ nhưng có biểu đồ rõ ràng tốt hơn một notebook lớn mà người học không hiểu.

## Lab 5, Preference optimization toy

Đây là lab nối sang LLM. Ta có thể tạo một task nhỏ như response ranking hoặc summarization toy. Dữ liệu gồm prompt, chosen response và rejected response. Người học train một mô hình nhỏ hoặc mô phỏng objective DPO để hiểu preference pairs hoạt động thế nào.

Điểm cần nhấn mạnh: preference data có bias thì model học bias. Nếu chosen responses dài hơn một cách hệ thống, model có thể học thích độ dài.

## Lab 6, Agent trace evaluator

Lab cuối nên gần production hơn. Ta tạo một agent workflow nhỏ có tool calls giả lập. Mỗi trace được chấm theo process: chọn tool đúng không, kiểm chứng không, final answer đúng không, chi phí có hợp lý không.

Lab này giúp người học thấy RL cho LLM agents không chỉ là token-level reward. Nó là thiết kế trace, evaluator, reward và feedback loop.

## Tóm tắt

Labs nên đi từ môi trường nhỏ tới LLM-oriented traces. Mỗi lab cần một câu hỏi học tập rõ ràng: reward design, exploration, Bellman update, stability, policy update, preference bias hoặc trace evaluation. Nếu lab chỉ chạy được mà không làm người học hiểu failure mode, lab đó chưa đủ tốt.
