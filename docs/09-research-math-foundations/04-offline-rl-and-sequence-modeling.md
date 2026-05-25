---
title: 9.4 Offline RL, Decision Transformers và Giới hạn của Sequence Modeling
---

# 9.4 Offline RL, Decision Transformers và Giới hạn của Sequence Modeling

Offline RL đặc biệt hấp dẫn với người làm LLM vì hầu hết hệ thống lớn đều có logs. Ta có conversations, tool traces, feedback, human ratings, tests, latency, cost và business outcomes. Câu hỏi tự nhiên là: có thể học một policy tốt hơn chỉ từ logs mà không exploration online không?

Câu trả lời là có thể, nhưng rất khó. Offline RL không phải supervised learning đơn giản. Nó phải đối mặt với support mismatch, extrapolation error, confounding, non-stationarity và reward misspecification.

## Dataset distribution và behavior policy

Giả sử dataset $D$ được sinh bởi behavior policy $\mu(a\mid s)$. Ta muốn học policy mới $\pi(a\mid s)$. Nếu $\pi$ chọn những action mà $\mu$ hiếm khi hoặc chưa từng chọn trong state tương tự, dataset không có bằng chứng đáng tin về hậu quả của action đó.

Nói bằng ký hiệu, vấn đề xuất hiện khi:

$$
\pi(a\mid s) > 0 \quad \text{nhưng} \quad \mu(a\mid s) \approx 0
$$

Đây là support mismatch. Một Q function học từ offline data có thể gán Q cao cho action ngoài support chỉ vì function approximation extrapolate sai. Nếu sau đó policy chọn action theo $\arg\max_a Q(s,a)$, lỗi nhỏ ngoài support có thể biến thành hành vi chính.

## Extrapolation error và conservative objectives

Trong offline Q-learning, target thường có dạng:

$$
y = r + \gamma \max_{a'} Q(s',a')
$$

Phép max thích chọn action có Q cao nhất, kể cả khi Q cao đó là do lỗi extrapolation. Đây là nguồn gốc của overestimation ngoài support.

Một hướng xử lý là conservative learning. Thay vì chỉ fit Q trên data, ta phạt Q cao ở những action không được data hỗ trợ. Trực giác là: nếu không có bằng chứng, đừng lạc quan. Một số phương pháp khác ràng buộc policy mới gần behavior policy, hoặc dùng uncertainty để tránh action thiếu coverage.

Trong LLM logs, điều này tương ứng với việc không nên kết luận một tool mới sẽ tốt chỉ vì evaluator đoán vậy. Nếu logs không chứa tool đó, estimate là suy đoán. Ngược lại, nếu logs chỉ đến từ model yếu, dataset cũng có thể đánh giá thấp hành vi mà model mạnh hơn có thể làm.

## Importance sampling và giới hạn thực tế

Một cách cổ điển để đánh giá off-policy là importance sampling:

$$
\prod_t \frac{\pi(a_t\mid s_t)}{\mu(a_t\mid s_t)}
$$

Tỷ lệ này sửa phân phối từ behavior policy sang target policy. Nhưng trong trajectory dài, tích nhiều tỷ lệ có variance rất lớn. Với LLM, sequence dài hàng trăm token làm vấn đề này nặng hơn. Một vài token có xác suất rất khác giữa policy mới và policy cũ có thể làm estimator bất ổn.

Vì vậy offline evaluation cho LLM thường phải kết hợp nhiều phương pháp: held-out human eval, simulator, unit tests, factuality checks, safety eval, counterfactual logging khi có thể, và rollout online có kiểm soát.

## Model-based RL và uncertainty

Model-based RL học model dynamics hoặc reward để planning. Trong offline setting, model-based approach hấp dẫn vì ta có thể mô phỏng trước khi hành động thật. Nhưng learned model cũng chịu distribution shift. Nếu policy planning đưa state-action ra ngoài dataset, model dynamics có thể hallucinate.

Với LLM agents, một LLM có thể mô phỏng user, tool result hoặc code behavior, nhưng mô phỏng không phải environment thật. Một research pipeline tốt phải biết khi nào dùng simulator để giảm chi phí, và khi nào phải kiểm chứng bằng tool thật, test thật, user study hoặc production canary.

## Decision Transformer như conditional imitation

Decision Transformer biểu diễn trajectory thành sequence và học dự đoán action tiếp theo từ history cùng return mong muốn:

$$
(R_{desired}, s_0, a_0, r_1, s_1, a_1, ...)
$$

Đây là ý tưởng rất gần NLP. Ta biến RL thành sequence modeling. Nếu có nhiều trajectories chất lượng, transformer có thể học pattern hành vi mạnh mà không cần Bellman backup trực tiếp.

Nhưng Decision Transformer không xóa vấn đề offline RL. Nó học từ data support. Nếu yêu cầu return cao hơn vùng data đã thấy, model có thể sinh action sequence trông giống thành công nhưng không được environment đảm bảo. Nếu dataset có confounding, model học correlation thay vì causal decision rule. Nếu high-return trajectories hiếm, model có thể không học được chiến lược thật sự.

## LLM traces và câu hỏi causal

Agent traces thường chứa nhiều bước: prompt, retrieved documents, tool calls, observations, intermediate reasoning, final answer và evaluation. Nếu trace thành công, ta vẫn chưa biết bước nào gây thành công. Một tool call có thể xuất hiện trong nhiều trace thành công chỉ vì task dễ thường cần tool đó, không phải vì tool đó tạo ra thành công.

Research scientist cần phân biệt prediction và intervention. Model dự đoán rằng action xuất hiện trong trace tốt không có nghĩa là nếu can thiệp chọn action đó ở state khác thì outcome sẽ tốt. Đây là lý do offline RL và causal inference có nhiều điểm giao nhau.

## Điều cần giữ lại

Offline RL rất phù hợp với LLM vì dữ liệu logs phong phú và online exploration đắt. Nhưng offline RL không được hiểu như supervised learning trên traces. Câu hỏi cốt lõi là support, coverage, extrapolation, uncertainty và causal effect của action. Decision Transformer mở cầu nối mạnh giữa RL và sequence modeling, nhưng vẫn bị giới hạn bởi data distribution và cần verification thật.
