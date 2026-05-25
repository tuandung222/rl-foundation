---
title: 6.1 Vì sao RL quan trọng với LLM?
---

# 6.1 Vì sao RL quan trọng với LLM?

Nếu chỉ nhìn LLM như một mô hình dự đoán token tiếp theo, RL có vẻ không cần thiết. Pretraining đã học từ corpus rất lớn. Supervised fine-tuning đã học từ instruction và response mẫu. Vậy tại sao các hệ thống LLM hiện đại vẫn nói nhiều về RLHF, reward model, PPO, DPO, preference optimization và rollout?

Lý do là chất lượng của một câu trả lời LLM không chỉ là xác suất token trong dữ liệu. Người dùng không chỉ muốn câu giống corpus. Họ muốn câu hữu ích, đúng, an toàn, phù hợp ngữ cảnh, ngắn gọn khi cần, chi tiết khi cần, biết từ chối khi nên từ chối, biết dùng tool khi cần kiểm chứng, và biết không bịa khi thiếu thông tin. Những tiêu chí đó khó viết thành target duy nhất cho supervised learning.

RL bước vào khi ta muốn tối ưu hành vi theo feedback, đặc biệt là feedback về preference và outcome.

## Từ next-token prediction tới behavior optimization

Pretraining học một kỹ năng nền: dự đoán token tiếp theo. Đây là cách học cực kỳ mạnh vì nó buộc model nén tri thức ngôn ngữ, tri thức thế giới, style, reasoning pattern và nhiều regularity trong dữ liệu.

Nhưng next-token prediction không đồng nghĩa với hành vi tốt trong sản phẩm. Một model có thể dự đoán text rất tốt nhưng vẫn trả lời dài dòng, thiếu an toàn, quá tự tin, hoặc không theo instruction. Vì vậy, ta thêm supervised fine-tuning để model học format và instruction-following.

Sau đó vẫn còn một khoảng cách: nhiều response đều hợp lý về mặt ngôn ngữ, nhưng response nào tốt hơn? Đây là preference problem. Người dùng hoặc annotator có thể không viết được đáp án tuyệt đối, nhưng có thể so sánh hai câu trả lời và nói câu nào tốt hơn. RLHF bắt đầu từ tín hiệu như vậy.

## Reward trong RLHF là gì?

Trong RLHF, ta thường huấn luyện một reward model từ dữ liệu preference. Annotator xem hai hoặc nhiều response cho cùng một prompt và chọn response tốt hơn. Reward model học cách dự đoán preference đó.

Điểm quan trọng: reward model không phải ground truth tuyệt đối. Nó là một mô hình học từ preference data, và vì vậy có bias, noise và lỗ hổng. Khi ta tối ưu policy quá mạnh theo reward model, model có thể tìm ra cách làm reward model thích mà không thật sự làm người dùng hài lòng. Đây là reward hacking trong bối cảnh LLM.

Vì vậy, RLHF luôn đi kèm ràng buộc. Một ràng buộc quan trọng là KL penalty, dùng để giữ policy mới không đi quá xa so với policy gốc. Nếu không có ràng buộc, policy có thể drift sang vùng ngôn ngữ kỳ lạ nhưng reward model chấm cao.

## Rollout trong LLM nghĩa là gì?

Trong game, rollout là một episode agent chơi từ state hiện tại tới kết thúc. Với LLM, rollout có thể là một response hoàn chỉnh được sinh từ prompt, hoặc một trace nhiều bước của agent.

Nếu action là token, rollout là chuỗi token. Nếu action là tool call, rollout là chuỗi hành động gồm suy nghĩ, gọi tool, đọc kết quả, sinh câu trả lời. Nếu task là customer support, rollout có thể là cả cuộc hội thoại nhiều lượt.

Điều này làm credit assignment trở nên khó. Nếu final answer bị chấm thấp, lỗi nằm ở đâu? Token nào, đoạn reasoning nào, retrieval query nào, tool nào, hay quyết định không hỏi lại người dùng? Đây là lý do tư duy RL quan trọng hơn việc chỉ biết tên thuật toán.

## PPO, DPO và preference optimization

PPO là thuật toán policy optimization được dùng nổi tiếng trong RLHF. Ở mức trực giác, PPO cập nhật policy để tăng xác suất những response được reward cao, nhưng giới hạn bước cập nhật để tránh làm policy thay đổi quá mạnh. Nó là một cách cân bằng giữa cải thiện và ổn định.

DPO đi theo hướng khác. Thay vì huấn luyện reward model rồi chạy RL đầy đủ, DPO trực tiếp học từ preference pairs bằng một objective có liên hệ với tối ưu policy có ràng buộc KL. Với người làm LLM, DPO thường dễ triển khai hơn PPO, ít moving parts hơn, nhưng không có nghĩa là nó thay thế mọi bài toán RL. Khi hệ thống có long-horizon interaction, tool use, environment feedback và reward không chỉ là pairwise preference trên response đơn, tư duy RL rộng hơn vẫn cần thiết.

## RL cho agentic systems

LLM agent làm vấn đề trở lại rất gần RL cổ điển. Agent có state, action, tool, environment, reward và trajectory rõ ràng hơn chatbot một lượt. Nó phải quyết định khi nào search, khi nào đọc file, khi nào sửa, khi nào chạy test, khi nào hỏi người dùng, khi nào dừng.

Một evaluator cuối cùng có thể nói task thành công hay thất bại. Nhưng để cải thiện agent, ta cần hiểu trace. Một trace tốt thường có các đặc điểm: đọc đúng context, không sửa quá rộng, chạy đúng test, giải thích rõ, không làm lộ secret, không dùng tool nguy hiểm khi chưa cần, và biết dừng đúng lúc. Đây là hành vi tuần tự, không phải classification đơn giản.

## Tóm tắt

RL quan trọng với LLM vì LLM product là hệ thống hành vi, không chỉ là model dự đoán token. RL cung cấp ngôn ngữ để nói về policy, reward, rollout, preference, credit assignment, constraint và long-horizon outcome. RLHF, DPO và PPO chỉ là một phần của bức tranh. Điều quan trọng hơn là biết nhìn LLM và agent như những hệ thống ra quyết định trong môi trường có feedback.
