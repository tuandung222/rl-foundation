---
title: Syllabus
---

# Syllabus

Tài liệu này là bản đồ phát triển giáo trình Reinforcement Learning Foundation. Các phần đầu tiên đã được khởi tạo để đặt chuẩn văn phong và hướng tiếp cận. Các phần sau sẽ được mở rộng dần theo cùng tiêu chuẩn trong `AGENT.md`.

## Lộ trình tổng thể

| Phần | Chủ đề | Mục tiêu |
|---|---|---|
| Phần 0 | Định hướng | Hiểu vì sao RL quan trọng với NLP, LLM và agentic systems |
| Phần 1 | Mental Model của RL | Agent, environment, reward, state, action, trajectory, return, policy, value, model |
| Phần 2 | Bellman và Value-based Methods | Bellman equation, dynamic programming, value iteration, policy iteration |
| Phần 3 | Learning from Experience | Monte Carlo, Temporal Difference, SARSA, Q-learning, exploration |
| Phần 4 | Deep Q-Learning | Function approximation, replay buffer, target network, instability |
| Phần 5 | Policy Gradient và Actor-Critic | REINFORCE, baseline, advantage, actor-critic, PPO |
| Phần 6 | RL cho NLP và LLM | RLHF, reward model, KL penalty, DPO, GRPO, RLAIF, agent traces |
| Phần 7 | Labs | Gymnasium, toy environments, toy preference optimization, evaluation harness |
| Phần 8 | Production Patterns | Monitoring, reward hacking, safety constraints, offline evaluation, deployment risk |

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
