---
title: 6.3 DPO và Preference Optimization
---

# 6.3 DPO và Preference Optimization

DPO, viết đầy đủ là Direct Preference Optimization, trở nên phổ biến vì nó làm một việc rất hấp dẫn: học trực tiếp từ preference pairs mà không cần chạy vòng RLHF đầy đủ với reward model riêng và PPO phức tạp.

Nhưng DPO không nên được hiểu như một mẹo thay thế mọi thứ. Nó là một cách nhìn gọn hơn cho một lớp bài toán cụ thể: ta có prompt, có response được chọn, có response bị loại, và muốn policy tăng xác suất response được chọn so với response bị loại dưới một ràng buộc ngầm với reference policy.

## Preference pair

Dữ liệu DPO thường có dạng:

$$
(x, y_w, y_l)
$$

Trong đó $x$ là prompt, $y_w$ là response được preferred, và $y_l$ là response bị rejected.

Đọc theo nghĩa đời thường: với cùng một yêu cầu, người chấm thích câu trả lời này hơn câu trả lời kia. Ta không cần score tuyệt đối. Ta chỉ cần quan hệ so sánh.

Điều này rất gần với cách con người đánh giá LLM. Nhiều khi ta khó nói response xứng đáng 8.2 điểm hay 7.6 điểm, nhưng khá dễ nói response A tốt hơn response B.

## Vì sao DPO đơn giản hơn PPO?

PPO-style RLHF cần sinh rollout, chấm bằng reward model, ước lượng value, tính advantage, kiểm soát KL và update policy. DPO biến preference learning thành một supervised-like objective trên cặp chosen/rejected. Vì vậy, pipeline đơn giản hơn, ít moving parts hơn, dễ triển khai hơn.

Với team LLM thực dụng, đây là lợi thế lớn. Ít moving parts nghĩa là ít thứ có thể lỗi: không cần training reward model riêng, không cần tune PPO phức tạp, không cần rollout online trong mỗi update.

## DPO vẫn có giả định

DPO không miễn phí. Nó dựa vào chất lượng preference pairs. Nếu pairs nghèo, model học nghèo. Nếu chosen response chỉ tốt hơn rejected một cách bề mặt, model học tín hiệu bề mặt. Nếu dataset thiếu long-horizon interaction, DPO không tự phát minh ra khả năng tối ưu trace dài.

DPO cũng thường phù hợp nhất khi action là response hoàn chỉnh và feedback là pairwise preference. Khi bài toán là agent nhiều bước với tool calls, environment state thay đổi, reward đến từ outcome dài hạn, hoặc cần exploration thật, tư duy RL rộng hơn vẫn cần thiết.

## DPO, RLHF và supervised fine-tuning

Có thể nhìn SFT, DPO và PPO như ba mức độ khác nhau.

SFT nói: hãy bắt chước response mẫu. DPO nói: hãy ưu tiên response được chọn hơn response bị loại. PPO nói: hãy sinh rollout, nhận reward, rồi update policy có ràng buộc.

Không có phương pháp nào luôn thắng. Nếu có demonstrations chất lượng cao, SFT rất mạnh. Nếu có preference pairs tốt, DPO hiệu quả. Nếu cần tối ưu outcome dài hạn trong environment tương tác, PPO hoặc các phương pháp RL khác có thể phù hợp hơn.

## Ghi chú nghiên cứu: DPO từ KL-regularized RL

Một cách hiểu DPO là bắt đầu từ objective RL có KL regularization. Với mỗi prompt $x$, ta muốn tối đa hóa reward nhưng không để policy đi quá xa reference policy:

$$
\max_\pi \; \mathbb{E}_{y \sim \pi(\cdot \mid x)}[r(x,y)] - \beta \text{KL}(\pi(\cdot \mid x) || \pi_{ref}(\cdot \mid x))
$$

Nghiệm tối ưu của bài toán này có dạng:

$$
\pi^*(y \mid x) = \frac{1}{Z(x)} \pi_{ref}(y \mid x) \exp\left(\frac{1}{\beta} r(x,y)\right)
$$

Sắp xếp lại, ta có thể biểu diễn reward theo policy tối ưu và reference policy:

$$
r(x,y) = \beta \log \frac{\pi^*(y \mid x)}{\pi_{ref}(y \mid x)} + \beta \log Z(x)
$$

Trong preference pair, hằng số $\log Z(x)$ bị triệt tiêu khi lấy hiệu reward giữa $y_w$ và $y_l$. Vì vậy, thay vì học reward model riêng rồi tối ưu PPO, DPO trực tiếp tối ưu policy sao cho log-ratio giữa chosen và rejected phù hợp với preference:

$$
\mathcal{L}_{DPO}(\theta) = -\log \sigma\left(\beta\left[\log \frac{\pi_\theta(y_w \mid x)}{\pi_{ref}(y_w \mid x)} - \log \frac{\pi_\theta(y_l \mid x)}{\pi_{ref}(y_l \mid x)}\right]\right)
$$

Công thức này cho thấy DPO không phải một mẹo supervised learning đơn giản. Nó là một cách tái tham số hóa một bài toán KL-regularized preference optimization dưới một số giả định.

Các giả định đó rất quan trọng. DPO phù hợp khi preference pair phản ánh lựa chọn giữa response hoàn chỉnh, reference policy có ý nghĩa, và bài toán không cần exploration online phức tạp. Nếu agent phải tương tác nhiều bước, action ảnh hưởng state tương lai, hoặc reward đến từ tool outcome dài hạn, DPO có thể vẫn hữu ích cho một phần pipeline nhưng không thay thế toàn bộ RL.

## Tóm tắt

DPO học trực tiếp từ preference pairs và làm đơn giản hóa nhiều pipeline alignment. Nó rất hữu ích cho LLM fine-tuning khi dữ liệu là chosen/rejected responses. Nhưng DPO không loại bỏ nhu cầu hiểu RL. Khi bài toán có trajectory dài, tool use, exploration, reward phức hợp hoặc outcome động, ta vẫn cần policy, reward, rollout, credit assignment và constraint.
