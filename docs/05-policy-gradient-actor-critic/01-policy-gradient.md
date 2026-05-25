---
title: 5.1 Policy Gradient, học trực tiếp policy
---

# 5.1 Policy Gradient, học trực tiếp policy

Value-based methods như Q-learning học cách chấm action, rồi chọn action có điểm cao. Nhưng có một hướng khác: học trực tiếp policy. Thay vì hỏi action nào có Q lớn nhất, ta điều chỉnh tham số của policy để các trajectory tốt trở nên có xác suất cao hơn.

Đây là tinh thần của policy gradient. Với người làm LLM, hướng này rất tự nhiên. Language model vốn đã là một stochastic policy trên token. Mỗi bước sinh token là một lựa chọn action từ phân phối xác suất. Nếu một response được đánh giá tốt, ta muốn tăng xác suất của những lựa chọn đã dẫn tới response đó, nhưng phải làm cẩn thận để model không drift hoặc collapse.

## Objective của policy

Ta ký hiệu policy có tham số $\theta$ là $\pi_\theta(a \mid s)$. Mục tiêu là tối đa hóa expected return:

$$
J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta}[G(\tau)]
$$

Đọc công thức này theo nghĩa đời thường: nếu agent dùng policy hiện tại để tạo nhiều trajectory, ta muốn trung bình return của các trajectory đó cao nhất có thể.

Policy gradient tìm hướng thay đổi $\theta$ để $J(\theta)$ tăng. Một dạng trực giác của update là: nếu một action xuất hiện trong trajectory có return cao, tăng log-probability của action đó. Nếu trajectory tệ, giảm xác suất những action đã dẫn tới nó.

## REINFORCE

Thuật toán REINFORCE dùng update dựa trên:

$$
\nabla_\theta J(\theta) \approx G_t \nabla_\theta \log \pi_\theta(a_t \mid s_t)
$$

Đọc công thức này chậm rãi: gradient của log probability cho ta hướng tăng xác suất action đã chọn. Return $G_t$ đóng vai trò trọng số. Nếu return cao, ta đẩy policy về phía action đó. Nếu return thấp, ta không khuyến khích nó.

Với LLM, hình ảnh tương ứng là: response được reward cao thì các token trong response được tăng xác suất. Nhưng cách nói này hơi nguy hiểm nếu hiểu quá đơn giản. Không phải token nào trong response tốt cũng thật sự là nguyên nhân. Một câu trả lời dài có thể có nhiều token trung tính, một token quan trọng, hoặc một tool call quyết định. Đây là credit assignment.

## Variance là vấn đề lớn

Policy gradient thuần thường có variance cao. Hai trajectory có thể bắt đầu giống nhau nhưng outcome khác nhau vì sampling, environment noise hoặc phản ứng người dùng. Nếu dùng return thô để update, gradient có thể dao động mạnh.

Trong LLM, variance còn lớn hơn vì action space khổng lồ. Vocabulary có hàng chục nghìn token. Response dài hàng trăm token. Reward thường đến cuối response. Nếu chỉ biết final reward, việc gán credit cho từng token là rất nhiễu.

Đó là lý do các phương pháp thực tế dùng baseline, advantage, critic, KL constraint và batch lớn. Policy gradient là ý tưởng nền, nhưng pipeline production cần nhiều cơ chế ổn định.

## Baseline

Một cách giảm variance là trừ baseline:

$$
(G_t - b(s_t)) \nabla_\theta \log \pi_\theta(a_t \mid s_t)
$$

Nếu baseline là value function $V(s_t)$, phần $G_t - V(s_t)$ cho biết outcome tốt hơn hay tệ hơn kỳ vọng. Đây chính là advantage ở mức trực giác.

Đọc theo nghĩa đời thường: không phải cứ reward cao là hành động tốt tuyệt đối. Ta cần hỏi reward đó cao hơn kỳ vọng trong hoàn cảnh này bao nhiêu. Một câu trả lời đạt 7 điểm cho câu hỏi rất khó có thể tốt. Một câu trả lời đạt 7 điểm cho câu hỏi rất dễ có thể bình thường.

## Ghi chú nghiên cứu: policy gradient theorem và baseline không gây bias

Ta có thể đi từ objective:

$$
J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta}[R(\tau)] = \sum_\tau P_\theta(\tau) R(\tau)
$$

Dùng likelihood ratio trick:

$$
\nabla_\theta J(\theta) = \sum_\tau P_\theta(\tau) \nabla_\theta \log P_\theta(\tau) R(\tau)
$$

Với MDP mà transition dynamics không phụ thuộc vào tham số policy, xác suất trajectory có dạng:

$$
P_\theta(\tau) = \rho(s_0) \prod_{t=0}^{T-1} \pi_\theta(a_t \mid s_t) p(s_{t+1} \mid s_t, a_t)
$$

Khi lấy log rồi lấy gradient, các thành phần $\rho$ và $p$ biến mất vì không phụ thuộc vào $\theta$:

$$
\nabla_\theta \log P_\theta(\tau) = \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t \mid s_t)
$$

Do đó:

$$
\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta}\left[\sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t \mid s_t) R(\tau)\right]
$$

Nhờ tính causal, reward trước thời điểm $t$ không nên gán cho action tại $t$. Vì vậy trong thực hành ta dùng return từ $t$ trở đi, $G_t$, thay cho toàn bộ $R(\tau)$.

Baseline không phụ thuộc vào action không làm gradient bị bias. Lý do là:

$$
\mathbb{E}_{a \sim \pi_\theta(\cdot \mid s)}[b(s) \nabla_\theta \log \pi_\theta(a \mid s)] = b(s) \nabla_\theta \sum_a \pi_\theta(a \mid s) = b(s) \nabla_\theta 1 = 0
$$

Đây là kết quả rất quan trọng. Ta được phép trừ baseline để giảm variance mà không đổi kỳ vọng của gradient. Actor-critic tận dụng chính điểm này bằng cách học $V(s)$ làm baseline.

Với LLM, công thức trên nói rằng gradient token-level có thể được tính qua log-probability của policy, nhưng chất lượng estimator phụ thuộc mạnh vào reward, baseline, sampling distribution và sequence length. Một công thức đúng không tự đảm bảo training ổn định nếu variance quá lớn hoặc reward bị sai.

## Tóm tắt

Policy gradient học trực tiếp cách tăng xác suất hành động dẫn tới return cao. Nó rất phù hợp về mặt khái niệm với LLM vì language model là stochastic policy. Tuy nhiên, reward muộn, action space lớn và credit assignment làm variance cao. Vì vậy, policy gradient thực tế cần baseline, advantage, critic và ràng buộc ổn định.
