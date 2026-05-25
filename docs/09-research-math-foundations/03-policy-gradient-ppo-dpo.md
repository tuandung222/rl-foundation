---
title: 9.3 Policy Gradient, PPO và DPO từ Theorem tới Objective
---

# 9.3 Policy Gradient, PPO và DPO từ Theorem tới Objective

Policy gradient là điểm nối tự nhiên giữa RL cổ điển và LLM. Một language model là một stochastic policy trên chuỗi token. Khi ta tối ưu model bằng reward hoặc preference, ta đang thay đổi phân phối hành vi. Nhưng để dạy ở mức research, nói như vậy chưa đủ. Ta cần thấy vì sao gradient có dạng log-probability, baseline vì sao không làm bias, PPO kiểm soát update bằng cách nào, và DPO đến từ objective nào.

## Policy gradient theorem

Mục tiêu là tối đa hóa expected return:

$$
J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta}[R(\tau)] = \sum_\tau P_\theta(\tau)R(\tau)
$$

Dùng likelihood ratio trick:

$$
\nabla_\theta J(\theta) = \sum_\tau P_\theta(\tau) \nabla_\theta \log P_\theta(\tau) R(\tau)
$$

Với MDP có transition dynamics không phụ thuộc vào $\theta$:

$$
P_\theta(\tau) = \rho(s_0) \prod_t \pi_\theta(a_t \mid s_t)p(s_{t+1}\mid s_t,a_t)
$$

Lấy log rồi lấy gradient, dynamics biến mất:

$$
\nabla_\theta \log P_\theta(\tau) = \sum_t \nabla_\theta \log \pi_\theta(a_t \mid s_t)
$$

Vì vậy policy gradient có thể được ước lượng bằng samples mà không cần biết gradient của environment dynamics. Đây là điểm mạnh lớn của policy gradient.

## Baseline và advantage

Một baseline $b(s)$ không phụ thuộc action có thể được trừ khỏi return mà không làm bias gradient:

$$
\mathbb{E}_{a \sim \pi_\theta}[b(s)\nabla_\theta \log \pi_\theta(a\mid s)] = b(s)\nabla_\theta \sum_a \pi_\theta(a\mid s) = 0
$$

Do đó ta có thể dùng:

$$
(G_t - V(s_t)) \nabla_\theta \log \pi_\theta(a_t \mid s_t)
$$

Phần $G_t - V(s_t)$ là advantage estimate. Nó trả lời câu hỏi: action này tốt hơn kỳ vọng tại state này bao nhiêu? Actor-critic học $V(s)$ để giảm variance cho policy gradient.

## GAE và bias-variance

Generalized Advantage Estimation dùng chuỗi TD residual:

$$
\delta_t^V = r_{t+1} + \gamma V(s_{t+1}) - V(s_t)
$$

và:

$$
\hat{A}_t^{GAE(\gamma,\lambda)} = \sum_{l=0}^{\infty}(\gamma\lambda)^l\delta_{t+l}^V
$$

$\lambda$ kiểm soát trade-off. Nhỏ hơn thì bootstrap nhiều hơn, variance thấp hơn, bias có thể cao hơn. Gần 1 thì gần Monte Carlo hơn, bias thấp hơn, variance cao hơn. Trong RLHF, value head yếu có thể làm advantage sai, nên GAE không phải chi tiết phụ. Nó ảnh hưởng trực tiếp tới hướng update của policy.

## PPO như trust region thực dụng

TRPO đặt bài toán:

$$
\max_\theta \mathbb{E}_t[r_t(\theta)\hat{A}_t] \quad \text{subject to} \quad \mathbb{E}_t[\text{KL}(\pi_{old}||\pi_\theta)] \leq \delta
$$

PPO thay constraint khó bằng clipped surrogate:

$$
L^{CLIP}(\theta) = \mathbb{E}_t[\min(r_t(\theta)\hat{A}_t, \text{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat{A}_t)]
$$

Clipping làm objective không còn thưởng thêm cho update quá xa. Tuy nhiên PPO clipping không phải hard KL guarantee. Trong triển khai thật, ta vẫn phải theo dõi KL, entropy, reward scale, value loss, ratio distribution và per-slice behavior.

Với LLM, ratio có thể được tính ở cấp token hoặc sequence. Nếu reward cuối chỉ gán cho toàn response, credit assignment rất nhiễu. Nếu reward token-level được shaping sai, model học shortcut. Đây là lý do PPO trong RLHF là một hệ thống tối ưu tinh tế, không chỉ một công thức.

## Reward model và Bradley-Terry

Reward model thường học từ preference pairs bằng xác suất:

$$
P(y_w \succ y_l \mid x) = \sigma(r_\phi(x,y_w) - r_\phi(x,y_l))
$$

Loss:

$$
\mathcal{L}(\phi) = -\log \sigma(r_\phi(x,y_w) - r_\phi(x,y_l))
$$

Reward chỉ được xác định tương đối trong cặp so sánh. Scale và calibration của reward rất quan trọng khi đưa vào PPO. Nếu reward model có length bias, policy optimization sẽ khuếch đại length bias. Nếu reward model overestimate sự tự tin, policy có thể học trả lời tự tin hơn thay vì đúng hơn.

## DPO từ KL-regularized RL

DPO bắt đầu từ objective:

$$
\max_\pi \mathbb{E}_{y\sim\pi}[r(x,y)] - \beta \text{KL}(\pi(\cdot\mid x)||\pi_{ref}(\cdot\mid x))
$$

Nghiệm tối ưu có dạng:

$$
\pi^*(y\mid x) = \frac{1}{Z(x)}\pi_{ref}(y\mid x)\exp\left(\frac{1}{\beta}r(x,y)\right)
$$

Từ đó reward có thể được viết bằng log-ratio giữa policy và reference. Khi lấy hiệu reward giữa chosen và rejected, hằng số chuẩn hóa bị triệt tiêu. Objective DPO là:

$$
\mathcal{L}_{DPO}(\theta) = -\log \sigma\left(\beta\left[\log\frac{\pi_\theta(y_w\mid x)}{\pi_{ref}(y_w\mid x)} - \log\frac{\pi_\theta(y_l\mid x)}{\pi_{ref}(y_l\mid x)}\right]\right)
$$

DPO đơn giản hóa pipeline vì không cần train reward model riêng rồi chạy PPO. Nhưng nó vẫn dựa vào preference pairs, reference policy và giả định bài toán phù hợp với response-level preference optimization. Với multi-step agents, tool-use và outcome dài hạn, DPO có thể là một phần của hệ thống, không phải câu trả lời đầy đủ.

## Điều cần giữ lại

Policy gradient cho ta cách tối ưu policy mà không cần gradient của environment. Baseline và GAE giảm variance. PPO kiểm soát policy drift bằng surrogate thực dụng. DPO tái tham số hóa một bài toán KL-regularized preference optimization. Với LLM research, hiểu các derivation này giúp ta biết phương pháp nào đang giả định gì, và khi nào giả định đó bị phá vỡ.
