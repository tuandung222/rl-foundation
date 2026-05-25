---
title: Glossary
---

# Glossary

## Agent

Thực thể chọn hành động. Trong RL cổ điển, agent có thể là người chơi game hoặc robot controller. Trong LLM systems, agent có thể là model sinh token, workflow chọn tool, hoặc toàn bộ hệ thống gồm model, retrieval, tools và evaluator.

## Environment

Phần thế giới mà agent tương tác. Environment nhận action, cập nhật state và trả reward. Với LLM agent, environment có thể bao gồm người dùng, conversation history, tools, repo, filesystem, API, retrieval index và policy constraints.

## State

Thông tin agent dùng để ra quyết định tại một thời điểm. Với LLM, state thường gần với context: prompt, lịch sử hội thoại, retrieved documents, tool outputs và metadata liên quan.

## Action

Điều agent chọn làm. Action có thể là một move trong game, một token, một response hoàn chỉnh, một tool call, một retrieval query, một quyết định route model, hoặc một quyết định dừng.

## Reward

Tín hiệu phản hồi cho biết hành vi tốt đến đâu theo một tiêu chí nào đó. Reward không phải lúc nào cũng là mục tiêu thật. Nó thường là proxy và có thể bị khai thác nếu thiết kế sai.

## Return

Tổng reward tương lai, thường có discount. Return cho phép RL nói về mục tiêu dài hạn thay vì chỉ reward trước mắt.

## Policy

Quy tắc chọn action từ state. Với LLM, policy có thể là phân phối xác suất sinh token hoặc policy cấp workflow chọn giữa trả lời, gọi tool, hỏi lại và dừng.

## Value Function

Hàm ước lượng state hoặc action có triển vọng tốt đến đâu xét theo reward tương lai. Value function trả lời câu hỏi: từ đây trở đi, kỳ vọng tổng lợi ích là bao nhiêu?

## Q Function

Action-value function, ký hiệu $Q(s, a)$, ước lượng giá trị của việc chọn action $a$ tại state $s$, rồi tiếp tục theo một policy nào đó.

## Trajectory

Chuỗi state, action và reward trong một episode. Với LLM agent, trajectory là trace gồm prompt, tool calls, observations, intermediate decisions và final answer.

## Credit Assignment

Bài toán xác định hành động nào trong quá khứ chịu trách nhiệm cho reward cuối cùng. Đây là vấn đề rất quan trọng trong multi-turn LLM agents và RLHF.

## Reward Model

Model học cách chấm điểm output hoặc trajectory dựa trên dữ liệu preference, human feedback hoặc evaluator labels. Reward model là proxy, không phải chân lý tuyệt đối.

## KL Penalty

Ràng buộc dùng để giữ policy mới không đi quá xa policy tham chiếu. Trong RLHF, KL penalty giúp giảm nguy cơ policy tối ưu quá mức reward model và drift khỏi hành vi ngôn ngữ ổn định.

## PPO

Proximal Policy Optimization, một thuật toán policy optimization thường dùng trong RLHF. Ý tưởng chính là cải thiện policy nhưng giới hạn bước cập nhật để giữ ổn định.

## DPO

Direct Preference Optimization, phương pháp học trực tiếp từ preference pairs mà không cần chạy vòng RL đầy đủ với reward model riêng theo cách truyền thống.

## Monte Carlo

Nhóm phương pháp học value bằng cách chờ episode kết thúc rồi dùng return thật đã quan sát. Monte Carlo gần outcome thật nhưng thường variance cao và feedback đến muộn.

## Temporal Difference

Nhóm phương pháp học value bằng cách cập nhật sau từng bước, dùng reward vừa nhận và value ước lượng của state kế tiếp. TD học nhanh hơn Monte Carlo nhưng có bias vì bootstrap.

## TD Error

Mức chênh lệch giữa target một bước và ước lượng hiện tại. TD error có thể được hiểu như mức độ ngạc nhiên của agent khi quan sát reward và state tiếp theo.

## SARSA

Thuật toán on-policy học Q function từ chuỗi state, action, reward, next state và next action thật sự được policy chọn.

## Q-learning

Thuật toán off-policy học Q function bằng target có phép max trên action ở state kế tiếp. Q-learning học theo giả định tương lai sẽ chọn action tốt nhất theo Q hiện tại.

## Exploration

Quá trình thử hành động chưa chắc là tốt nhất để thu thập thông tin. Trong LLM systems, exploration nên diễn ra trong sandbox, offline eval, canary traffic hoặc môi trường có boundary rõ.

## DQN

Deep Q-Network, phương pháp dùng neural network để xấp xỉ Q function thay vì Q-table. DQN cần replay buffer và target network để giảm bất ổn.

## Replay Buffer

Bộ nhớ lưu experience cũ để sample lại khi training. Với LLM agents, khái niệm tương ứng là trace store có metadata đầy đủ.

## Target Network

Bản copy chậm của Q network dùng để tính target ổn định hơn. Ý tưởng rộng hơn là giữ evaluator, reward model hoặc reference policy đủ ổn định để feedback loop có thể debug.

## Policy Gradient

Nhóm phương pháp tối ưu trực tiếp policy bằng gradient của expected return. Với LLM, policy gradient gần với việc điều chỉnh xác suất token hoặc action dựa trên reward.

## Advantage

Độ tốt của một action so với kỳ vọng tại state hiện tại, thường viết là $A(s, a) = Q(s, a) - V(s)$.

## Actor-Critic

Kiến trúc trong đó actor chọn action còn critic đánh giá value hoặc advantage. Trong LLM, actor có thể là model sinh response, critic có thể là value model, reward model hoặc evaluator.

## PPO

Proximal Policy Optimization, thuật toán policy optimization giới hạn bước cập nhật policy bằng ratio clipping và thường dùng KL constraint trong RLHF.

## DPO

Direct Preference Optimization, phương pháp học trực tiếp từ chosen/rejected preference pairs mà không cần chạy vòng PPO-style RLHF đầy đủ.

## Self-play

Kỹ thuật agent học bằng cách tương tác với chính phiên bản của mình hoặc agent đối thủ. Trong LLM, self-play có thể dùng để tạo adversarial prompts, critique hoặc training traces.

## Offline RL

Học policy từ dataset có sẵn mà không tương tác online trong lúc train. Offline RL hữu ích khi exploration thật đắt hoặc nguy hiểm, nhưng phụ thuộc mạnh vào coverage của dataset.

## Decision Transformer

Cách nhìn RL như sequence modeling, trong đó trajectory được biểu diễn như chuỗi state, action, reward và return mong muốn.


## Bellman Operator

Operator biến một value function hiện tại thành value function mới bằng reward một bước cộng với discounted future value. Cách nhìn operator giúp phân tích fixed point, contraction và convergence của value iteration.

## Contraction Mapping

Ánh xạ làm khoảng cách giữa hai điểm giảm theo một hệ số nhỏ hơn 1. Trong finite discounted MDP, Bellman operators là contraction trong chuẩn vô cực khi $\gamma < 1$, giúp giải thích vì sao iterative evaluation hội tụ.

## Stochastic Approximation

Khung toán học cho các update dùng sample nhiễu để tiến dần tới nghiệm của một phương trình kỳ vọng. TD learning và Q-learning tabular có thể được hiểu như stochastic approximation của Bellman fixed point.

## Robbins-Monro Conditions

Điều kiện thường dùng cho learning rate trong stochastic approximation: tổng step size phải vô hạn, nhưng tổng bình phương step size phải hữu hạn. Điều này cân bằng giữa tiếp tục học đủ lâu và kiểm soát noise.

## Semi-gradient

Gradient trong đó target được xem như hằng số dù target có thể được tạo từ model liên quan. DQN dùng semi-gradient khi tối ưu Bellman error với target network.

## Projected Bellman Equation

Phương trình xuất hiện khi Bellman update tạo ra value function ngoài không gian function approximation, nên phải chiếu lại vào không gian biểu diễn được. Đây là cách nhìn quan trọng để hiểu instability khi dùng function approximation.

## GAE

Generalized Advantage Estimation, kỹ thuật ước lượng advantage bằng tổng có trọng số của các TD residual. GAE điều chỉnh bias-variance qua tham số $\lambda$.

## Bradley-Terry Model

Mô hình xác suất cho pairwise preference, thường dùng trong reward model training. Nó mô hình hóa xác suất response được chọn dựa trên hiệu reward giữa response được chọn và response bị loại.

## Support Mismatch

Tình huống policy mới chọn action mà dataset offline gần như không bao phủ. Đây là nguồn chính của extrapolation error trong offline RL và learning from logs.

## Conservative Objective

Objective được thiết kế để tránh quá lạc quan ở vùng thiếu dữ liệu, ví dụ phạt Q value của action ngoài data support hoặc ràng buộc policy mới gần behavior policy.
