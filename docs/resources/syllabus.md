---
title: Syllabus
---

# Syllabus

Tài liệu này là bản đồ phát triển giáo trình Reinforcement Learning Foundation. Giáo trình lấy cảm hứng từ lộ trình thân thiện của Hugging Face Deep RL Class, nhưng được viết lại thành một khóa học tiếng Việt có chiều sâu hơn cho người làm NLP, LLM và AI systems.

## Lộ trình tổng thể

| Phần | Chủ đề | Mục tiêu |
|---|---|---|
| Phần 0 | Định hướng | Hiểu vì sao RL quan trọng với NLP, LLM và agentic systems |
| Phần 1 | Mental Model của RL | Agent, environment, reward, state, action, trajectory, return, policy, value, model |
| Phần 2 | Bellman và Value-based Methods | Bellman equation, dynamic programming intuition, value function và Q function |
| Phần 3 | Learning from Experience | Monte Carlo, Temporal Difference, SARSA, Q-learning, on-policy, off-policy, exploration |
| Phần 4 | Deep Q-Learning | Function approximation, DQN, replay buffer, target network, instability, reward hacking |
| Phần 5 | Policy Gradient và Actor-Critic | REINFORCE, baseline, advantage, actor-critic, PPO, KL constraint |
| Phần 6 | RL cho NLP và LLM | RLHF, reward model, DPO, preference optimization, agent traces, credit assignment |
| Phần 7 | Advanced Topics | Multi-agent RL, self-play, curiosity, model-based RL, offline RL, Decision Transformers |
| Phần 8 | Labs và Production | Gymnasium labs, toy preference optimization, trace evaluator, safety, monitoring, rollout |

## Ánh xạ từ Hugging Face Deep RL Class

| Nguồn tham khảo | Bản phát triển trong giáo trình này |
|---|---|
| Unit 1, Introduction to Deep RL | Phần 0 và Phần 1, có thêm framing cho LLM và agentic systems |
| Unit 2, Q-learning | Phần 2 và Phần 3, nhấn mạnh Bellman, TD, SARSA, Q-learning và trace learning |
| Unit 3, Deep Q-Learning | Phần 4, thêm phân tích deadly triad, target stability và liên hệ reward model |
| Unit 4, Policy Gradient | Phần 5, giải thích policy gradient bằng token policy và preference feedback |
| Unit 6, Actor-Critic | Phần 5, nối advantage, critic và value head trong RLHF |
| Unit 8, PPO | Phần 5 và Phần 6, giải thích clipping, KL penalty và policy drift |
| Unit 7, Multi-agent | Phần 7, nối multi-agent RL với planner, coder, reviewer và evaluator agents |
| Bonus topics | Phần 7 và Phần 8, gồm curiosity, offline RL, Decision Transformers, RLHF và labs |

## Nguyên tắc thiết kế bài học

Mỗi bài học nên có bốn lớp.

Thứ nhất là lớp trực giác. Người học cần hiểu vấn đề trước khi thấy thuật toán. Nếu chưa hiểu vì sao reward muộn gây khó, Q-learning sẽ chỉ là công thức.

Thứ hai là lớp hình thức. RL cần notation, nhưng notation phải được giới thiệu như công cụ làm rõ suy nghĩ, không phải rào cản.

Thứ ba là lớp thuật toán. Khi thuật toán xuất hiện, nó phải được giải thích như một hệ quả tự nhiên của vấn đề, không phải một recipe rời rạc.

Thứ tư là lớp ứng dụng LLM. Mỗi khái niệm nên có cầu nối sang token policy, reward model, rollout, tool-using agent, preference optimization hoặc production evaluation.

## Bài thực hành dự kiến

- FrozenLake hoặc GridWorld để hiểu state, action và reward.
- CartPole để hiểu policy và value trong môi trường liên tục đơn giản.
- Q-learning tabular để thấy Bellman update hoạt động.
- DQN tối giản để hiểu replay buffer và target network.
- PPO toy để hiểu policy update có ràng buộc.
- Preference optimization toy cho summarization hoặc response ranking.
- Agent trace evaluator cho một workflow nhỏ có tool calls.
- Reward hacking lab để thấy proxy metric có thể bị khai thác.

## Thứ tự học khuyến nghị

Nếu bạn mới học RL, hãy đọc Phần 0 đến Phần 3 thật chậm. Đừng vội đi tới PPO khi chưa hiểu return, value, Bellman và TD error.

Nếu bạn đã biết RL nhưng muốn nối sang LLM, hãy đọc nhanh Phần 1 đến Phần 5, rồi tập trung vào Phần 6, Phần 7 và Phần 8.

Nếu bạn đang xây agent production, hãy đọc Phần 1, Phần 6 và Phần 8 trước, sau đó quay lại thuật toán để hiểu sâu các failure modes.
