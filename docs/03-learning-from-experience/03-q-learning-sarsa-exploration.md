---
title: 3.3 SARSA, Q-learning và Exploration
---

# 3.3 SARSA, Q-learning và Exploration

Khi đã có Q function, ta có thể học một cách hành động khá tự nhiên: ở mỗi state, chọn action có Q cao nhất. Nhưng có hai câu hỏi xuất hiện ngay. Thứ nhất, ta cập nhật Q bằng dữ liệu nào? Thứ hai, nếu luôn chọn action đang có Q cao nhất, làm sao agent khám phá được action tốt hơn mà nó chưa từng thử?

SARSA và Q-learning là hai câu trả lời kinh điển cho câu hỏi đầu. Exploration strategy là câu trả lời cho câu hỏi thứ hai.

## SARSA, học theo hành vi thật đang làm

Tên SARSA đến từ chuỗi:

$$
(s_t, a_t, r_{t+1}, s_{t+1}, a_{t+1})
$$

Nó cập nhật Q của action hiện tại dựa trên action tiếp theo mà policy thật sự chọn:

$$
Q(s_t, a_t) \leftarrow Q(s_t, a_t) + \alpha [r_{t+1} + \gamma Q(s_{t+1}, a_{t+1}) - Q(s_t, a_t)]
$$

Đọc công thức này theo nghĩa đời thường: tôi đánh giá hành động vừa làm dựa trên reward vừa nhận và hành động tiếp theo mà chính policy của tôi sẽ thật sự thực hiện. Vì vậy, SARSA là on-policy.

Điều này làm SARSA thận trọng hơn trong nhiều môi trường. Nếu policy hiện tại vẫn có exploration và đôi khi chọn action rủi ro, SARSA học value có tính đến rủi ro đó.

## Q-learning, học theo hành vi tối ưu giả định

Q-learning dùng target khác:

$$
Q(s_t, a_t) \leftarrow Q(s_t, a_t) + \alpha [r_{t+1} + \gamma \max_{a'} Q(s_{t+1}, a') - Q(s_t, a_t)]
$$

Điểm khác nằm ở $\max_{a'}$. Q-learning hỏi: sau khi đến state kế tiếp, nếu từ đó trở đi tôi chọn action tốt nhất theo Q hiện tại, giá trị là bao nhiêu?

Vì target dùng action tốt nhất giả định, không nhất thiết là action policy thật sự đã chọn, Q-learning là off-policy. Nó có thể học policy tối ưu ngay cả khi behavior policy vẫn đang exploration.

## Liên hệ với LLM

Hãy tưởng tượng một agent đang học từ trace. SARSA giống như đánh giá hành vi của chính agent hiện tại, bao gồm cả thói quen đôi khi thử tool mới hoặc hỏi thêm người dùng. Q-learning giống như nói: dữ liệu có thể đến từ nhiều hành vi khác nhau, nhưng khi tính target, ta giả định tương lai sẽ chọn phương án tốt nhất theo critic hiện tại.

Trong LLM, điều này gợi nhắc tới khác biệt giữa học từ logs của policy hiện tại và học từ dữ liệu offline của policy khác. Nếu logs đến từ model cũ, human, hoặc synthetic agent, off-policy learning hấp dẫn nhưng phải cẩn thận với distribution shift. Một action trông tốt trong data cũ có thể không còn tốt khi policy mới sinh context khác.

## Exploration, vì greedy quá sớm là nguy hiểm

Nếu agent luôn chọn action có Q cao nhất, nó có thể mắc kẹt trong hiểu biết ban đầu. Đây là greedy trap. Một retrieval agent có thể luôn dùng query pattern cũ vì nó từng đủ tốt, và không bao giờ khám phá cách query tốt hơn. Một chatbot có thể luôn trả lời ngay vì reward ngắn hạn cao, và không học được rằng hỏi lại đôi khi giúp outcome dài hạn tốt hơn.

Chiến lược đơn giản nhất là epsilon-greedy. Với xác suất $\epsilon$, agent chọn action ngẫu nhiên. Với xác suất còn lại, nó chọn action có Q cao nhất. Khi học sớm, $\epsilon$ có thể cao. Khi agent đã hiểu môi trường hơn, $\epsilon$ giảm dần.

Trong LLM product, exploration cần được thiết kế khác. Ta không muốn random action trong production một cách vô trách nhiệm. Thay vào đó, ta có thể exploration trong offline sandbox, A/B test nhỏ, shadow mode, hoặc constrained decoding. Exploration tốt là exploration có ranh giới.

## Ghi chú nghiên cứu: on-policy, off-policy và điều kiện hội tụ

SARSA và Q-learning thường được dạy bằng hai update equation, nhưng ở mức research ta cần nhìn chúng qua quan hệ giữa behavior policy và target policy.

Behavior policy là policy sinh dữ liệu. Target policy là policy mà ta muốn học hoặc đánh giá. Với SARSA, hai policy này về cơ bản trùng nhau: agent học giá trị của hành vi mà chính nó đang thực hiện. Nếu behavior policy có exploration, value học được cũng phản ánh rủi ro do exploration đó tạo ra.

Với Q-learning, target policy là greedy policy ngầm định bởi $Q$, còn behavior policy có thể vẫn exploration. Đây là lý do Q-learning là off-policy. Nó học về một policy khác policy đang sinh dữ liệu.

Trong tabular setting, Q-learning có kết quả hội tụ cổ điển nếu một số điều kiện được thỏa:

- MDP hữu hạn.
- $0 \leq \gamma < 1$.
- Mọi state-action pair liên quan được thăm vô hạn lần.
- Learning rate thỏa điều kiện Robbins-Monro:

$$
\sum_t \alpha_t(s,a) = \infty, \qquad \sum_t \alpha_t(s,a)^2 < \infty
$$

Các điều kiện này nói bằng lời rằng agent phải tiếp tục học đủ lâu, nhưng step size phải giảm đủ nhanh để noise không làm ước lượng dao động mãi.

SARSA thường được phân tích với điều kiện GLIE, viết đầy đủ là greedy in the limit with infinite exploration. Nghĩa là agent vẫn exploration đủ nhiều để học, nhưng về dài hạn policy tiến dần tới greedy. Nếu giảm $\epsilon$ quá nhanh, agent có thể không khám phá đủ. Nếu không giảm, policy cuối cùng vẫn nhiễu.

Khi chuyển sang function approximation, đặc biệt là neural network, các bảo đảm này yếu đi rất nhiều. Một update trên một state-action pair có thể thay đổi Q ở nhiều vùng state khác. Off-policy data có thể nằm ở distribution khác distribution mà greedy policy sẽ đi tới. Đây là bước đầu tiên để hiểu vì sao deadly triad xuất hiện trong deep RL.

Với LLM logs, câu hỏi tương ứng là: dữ liệu này đến từ policy nào? Model hiện tại, model cũ, human annotator, synthetic generator, hay mixture nhiều nguồn? Nếu ta học một policy mới từ logs cũ, ta đang làm off-policy learning theo nghĩa rộng. Khi policy mới đi vào context mà logs không bao phủ, value hoặc reward estimate có thể không đáng tin.

## Tóm tắt

SARSA cập nhật theo action tiếp theo mà policy thật sự chọn, nên là on-policy và phản ánh rủi ro của hành vi hiện tại. Q-learning cập nhật theo action tốt nhất giả định ở state kế tiếp, nên là off-policy và thường hướng tới policy tối ưu. Exploration giúp agent không mắc kẹt với hành vi đang biết, nhưng với LLM systems, exploration phải được kiểm soát bằng sandbox, traffic nhỏ và safety boundary.
