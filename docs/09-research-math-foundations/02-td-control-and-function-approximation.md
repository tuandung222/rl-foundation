---
title: 9.2 TD Control, Stochastic Approximation và Function Approximation
---

# 9.2 TD Control, Stochastic Approximation và Function Approximation

Một update TD nhìn rất nhỏ: lấy reward vừa nhận, cộng với value của state kế tiếp, rồi sửa value hiện tại một chút. Nhưng phía sau update nhỏ đó là cả một cách nhìn về stochastic approximation. Nếu dạy ở mức research, ta cần giúp học viên thấy TD không chỉ là công thức học nhanh, mà là một quá trình lặp nhiễu để tìm fixed point của Bellman operator từ samples.

## TD như stochastic approximation

Với policy evaluation, TD(0) cập nhật:

$$
V(s_t) \leftarrow V(s_t) + \alpha_t [r_{t+1} + \gamma V(s_{t+1}) - V(s_t)]
$$

Phần trong ngoặc là TD error:

$$
\delta_t = r_{t+1} + \gamma V(s_{t+1}) - V(s_t)
$$

Nếu có model đầy đủ của environment, ta có thể áp dụng Bellman operator bằng kỳ vọng chính xác. Nhưng trong RL, ta thường chỉ có một sample transition. TD update dùng sample này như một noisy estimate của Bellman update.

Stochastic approximation hỏi: nếu mỗi bước ta đi theo một hướng nhiễu nhưng kỳ vọng đúng, với step size giảm hợp lý, liệu ta có hội tụ không? Điều kiện Robbins-Monro kinh điển là:

$$
\sum_t \alpha_t = \infty, \qquad \sum_t \alpha_t^2 < \infty
$$

Điều kiện đầu nói rằng ta phải tiếp tục học đủ lâu. Điều kiện thứ hai nói rằng tổng noise phải được kiểm soát. Nếu learning rate giảm quá nhanh, agent dừng học trước khi tới fixed point. Nếu không giảm đủ, estimate có thể dao động mãi.

## SARSA và Q-learning ở tabular control

SARSA update:

$$
Q(s_t,a_t) \leftarrow Q(s_t,a_t) + \alpha [r_{t+1} + \gamma Q(s_{t+1},a_{t+1}) - Q(s_t,a_t)]
$$

Q-learning update:

$$
Q(s_t,a_t) \leftarrow Q(s_t,a_t) + \alpha [r_{t+1} + \gamma \max_{a'} Q(s_{t+1},a') - Q(s_t,a_t)]
$$

SARSA học action-value của policy đang sinh dữ liệu, nên là on-policy. Q-learning dùng target greedy, nên có thể học policy tối ưu trong khi behavior policy vẫn exploration, nên là off-policy.

Trong tabular discounted MDP, Q-learning hội tụ tới $Q^*$ dưới các điều kiện mạnh: state-action space hữu hạn, mọi state-action cần thiết được thăm vô hạn lần, step size thỏa Robbins-Monro, reward bounded và $\gamma < 1$. Các điều kiện này nghe kỹ thuật, nhưng thông điệp rất thực tế: convergence cần coverage, step size tốt và môi trường đủ ổn định.

## GLIE và exploration giảm dần

Một kết quả hay gặp trong SARSA là GLIE, viết đầy đủ là greedy in the limit with infinite exploration. Agent phải exploration vô hạn lần để học đúng, nhưng policy phải trở nên greedy về dài hạn để performance cuối cùng tốt.

Nếu $\epsilon$ trong epsilon-greedy giảm quá nhanh, agent có thể khóa vào hành vi sai vì chưa khám phá đủ. Nếu $\epsilon$ không giảm, agent luôn giữ một mức random behavior, tốt cho exploration nhưng không tối ưu về control. Đây là ví dụ rõ ràng về mâu thuẫn giữa học và hành động.

Với LLM products, mâu thuẫn này trở nên nhạy cảm hơn. Exploration trực tiếp trên user thật có thể gây hại. Vì vậy ta thường chuyển exploration sang sandbox, canary rollout, offline simulation hoặc constrained online tests.

## Function approximation và projected Bellman equation

Khi dùng function approximation, ta không còn một tham số riêng cho từng state-action pair. Với linear approximation, có thể viết:

$$
\hat{V}(s; w) = x(s)^\top w
$$

TD update trở thành:

$$
w_{t+1} = w_t + \alpha_t \delta_t x(s_t)
$$

Ngay cả linear approximation đã cần phân tích cẩn thận. Bellman update có thể tạo ra value function không nằm trong span của features. Ta phải chiếu nó về không gian biểu diễn được. Vì vậy xuất hiện projected Bellman equation:

$$
\hat{V} = \Pi T^\pi \hat{V}
$$

Trong on-policy linear TD, có những bảo đảm hội tụ nhất định. Nhưng off-policy TD với function approximation có thể divergence. Khi chuyển sang nonlinear neural networks, phân tích còn khó hơn nhiều.

## Deadly triad dưới góc nhìn research

Deadly triad gồm function approximation, bootstrapping và off-policy learning. Ta có thể đọc nó như sau.

Function approximation làm update ở một điểm ảnh hưởng nhiều điểm khác. Bootstrapping làm target phụ thuộc vào estimate hiện tại. Off-policy learning làm data distribution khác target policy distribution. Khi ba yếu tố này kết hợp, update có thể không còn đi về một fixed point ổn định.

DQN dùng replay buffer và target network để giảm rủi ro, nhưng không xóa bản chất vấn đề. Replay buffer làm distribution huấn luyện ít correlation hơn. Target network làm target chậm hơn. Double DQN giảm overestimation. Những kỹ thuật này là engineering responses cho một vấn đề toán học sâu.

## Điều này dạy gì cho LLM research?

Khi train reward model, value head hoặc trace critic từ logs, ta đang làm một dạng function approximation trên distribution có giới hạn. Nếu policy mới sinh hành vi khác logs, critic phải extrapolate. Nếu critic lại được dùng để update policy, lỗi có thể bị khuếch đại.

Vì vậy một research scientist không nên chỉ hỏi loss có giảm không. Cần hỏi dữ liệu phủ state-action nào, policy mới có đi ra khỏi support không, reward model có calibration không, target có bị update cùng lúc không, và evaluation có độc lập với training logs không.

## Điều cần giữ lại

TD control là stochastic approximation của Bellman fixed point từ samples. Trong tabular setting, ta có convergence dưới điều kiện mạnh. Với function approximation, đặc biệt off-policy và bootstrapping, bảo đảm yếu đi nhanh. Đây là nền tảng để hiểu vì sao deep RL cần ổn định hóa và vì sao LLM feedback loops phải được thiết kế như một hệ thống có kiểm soát.
