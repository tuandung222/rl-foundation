---
title: 5.3 PPO, cập nhật policy nhưng không đi quá xa
---

# 5.3 PPO, cập nhật policy nhưng không đi quá xa

PPO, viết đầy đủ là Proximal Policy Optimization, nổi tiếng vì là một thuật toán thực dụng: đủ mạnh, tương đối ổn định, và được dùng trong nhiều hệ thống RLHF. Nhưng nếu chỉ nhớ PPO như một cái tên, ta sẽ bỏ lỡ ý tưởng quan trọng nhất: khi cập nhật policy, đừng để policy mới đi quá xa policy cũ trong một bước.

Đây là bài học cực kỳ phù hợp với LLM. Một language model đã được pretrain và instruction-tune chứa rất nhiều năng lực ngôn ngữ. Nếu ta tối ưu quá mạnh theo reward model, model có thể mất đi sự ổn định, sinh văn bản kỳ lạ, hoặc học exploit reward model. PPO cố gắng cải thiện nhưng giữ bước đi gần.

## Ratio giữa policy mới và policy cũ

PPO nhìn vào tỷ lệ xác suất:

$$
r_t(\theta) = \frac{\pi_\theta(a_t \mid s_t)}{\pi_{old}(a_t \mid s_t)}
$$

Đọc công thức này theo nghĩa đời thường: policy mới đang làm action này có xác suất cao hơn hay thấp hơn policy cũ bao nhiêu lần?

Nếu ratio quá lớn, policy mới đã tăng xác suất action quá mạnh. Nếu ratio quá nhỏ, policy mới đã giảm xác suất quá mạnh. Cả hai đều có thể gây bất ổn.

## Clipped objective

PPO dùng clipping để giới hạn lợi ích của việc thay đổi quá mạnh. Một dạng phổ biến là:

$$
L^{CLIP}(\theta) = \mathbb{E}[\min(r_t(\theta) A_t, \text{clip}(r_t(\theta), 1 - \epsilon, 1 + \epsilon) A_t)]
$$

Công thức này nhìn có vẻ nặng, nhưng trực giác khá rõ: nếu update làm policy thay đổi quá xa so với policy cũ, ta không cho objective tiếp tục thưởng thêm cho thay đổi đó. Clipping giống như lan can. Nó không cấm policy học, nhưng ngăn policy nhảy quá mạnh.

## PPO trong RLHF

Trong RLHF kiểu PPO, pipeline thường có các thành phần: policy model sinh response, reward model chấm response, value model ước lượng expected reward, và reference model để tính penalty giữ policy không drift quá xa.

Một reward thường có dạng gồm reward model score trừ đi KL penalty:

$$
R = R_{model} - \beta \text{KL}(\pi_\theta || \pi_{ref})
$$

Đọc công thức này theo nghĩa hệ thống: ta muốn response được reward model thích, nhưng cũng muốn policy mới không quá khác policy tham chiếu. Nếu chỉ tối đa hóa reward model score, model có thể overfit vào lỗ hổng của reward model. KL penalty giữ model ở vùng hành vi ngôn ngữ hợp lý hơn.

## PPO không phải phép màu

PPO ổn định hơn nhiều policy gradient thuần, nhưng không giải quyết mọi vấn đề. Nếu reward model sai, PPO sẽ tối ưu cái sai. Nếu preference data lệch, PPO học lệch. Nếu KL quá mạnh, model không cải thiện đủ. Nếu KL quá yếu, model drift. Nếu rollout distribution hẹp, policy không học được tình huống hiếm.

Với LLM, nhiều lỗi không nằm ở PPO mà nằm ở dữ liệu, reward, evaluator, prompt distribution và safety constraints. Vì vậy, học PPO phải đi kèm học system design.

## Khi nào nên quan tâm tới PPO?

Nếu bạn chỉ fine-tune LLM từ preference pairs đơn giản, DPO hoặc các phương pháp preference optimization trực tiếp có thể dễ hơn. Nhưng nếu bạn cần tối ưu long-horizon interaction, tool-use agent, environment feedback, reward kết hợp nhiều nguồn, hoặc online rollout, tư duy PPO và actor-critic vẫn rất quan trọng.

PPO dạy một nguyên tắc chung: trong hệ thống hành vi phức tạp, cải thiện từng bước nhỏ có kiểm soát thường an toàn hơn tối ưu mạnh theo một proxy chưa hoàn hảo.

## Tóm tắt

PPO giới hạn bước cập nhật policy bằng ratio clipping và thường đi cùng KL constraint trong RLHF. Ý tưởng cốt lõi là cải thiện policy nhưng không để policy mới đi quá xa policy cũ hoặc reference model. Với LLM, PPO là bài học về ổn định, không chỉ là thuật toán: reward model có thể sai, policy có thể drift, và mọi update cần guardrail.
