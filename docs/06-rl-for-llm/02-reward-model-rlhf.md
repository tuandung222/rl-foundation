---
title: 6.2 Reward Model và RLHF Pipeline
---

# 6.2 Reward Model và RLHF Pipeline

RLHF thường được nhắc như một kỹ thuật làm LLM trở nên hữu ích hơn. Nhưng nếu bóc tách kỹ, RLHF không phải một bước đơn lẻ. Nó là một pipeline chuyển human preference thành tín hiệu tối ưu policy.

Điều quan trọng là hiểu từng khâu của pipeline và rủi ro của từng khâu. Nếu chỉ nói "dùng RLHF để model tốt hơn", ta sẽ bỏ qua câu hỏi thật: preference nào, reward model nào, policy nào, constraint nào, và đánh giá bằng gì?

## Ba pha thường gặp

Một pipeline RLHF cổ điển thường có ba pha.

Pha đầu là supervised fine-tuning. Model học từ các instruction-response examples chất lượng cao để có hành vi cơ bản: trả lời đúng format, làm theo yêu cầu, biết từ chối một số request rõ ràng.

Pha thứ hai là huấn luyện reward model. Annotator so sánh nhiều responses cho cùng prompt và chọn response tốt hơn. Reward model học dự đoán preference đó.

Pha thứ ba là policy optimization. Model sinh responses, reward model chấm, và thuật toán như PPO cập nhật policy để tăng reward có ràng buộc.

Ba pha này liên kết chặt. SFT tạo policy khởi đầu đủ tốt. Reward model cung cấp proxy cho preference. Policy optimization khai thác proxy đó. Nếu một pha yếu, toàn bộ pipeline có thể lệch.

## Reward model học gì?

Reward model thường nhận prompt và response, rồi trả một scalar score. Nó không học chân lý tuyệt đối. Nó học pattern trong dữ liệu preference.

Nếu annotator thích câu trả lời có cấu trúc rõ, reward model học cấu trúc. Nếu annotator thích câu dài hơn, reward model có thể học độ dài. Nếu dataset thiếu câu hỏi khó về an toàn, reward model có thể yếu ở safety. Nếu annotator không kiểm chứng factuality, reward model có thể thích câu nghe thuyết phục nhưng sai.

Đây là lý do reward model phải được xem như một evaluator có bias. Nó hữu ích, nhưng không được thần thánh hóa.

## Preference không phải reward cuối cùng

Human preference cũng có giới hạn. Người chấm có thể bị ảnh hưởng bởi văn phong, độ tự tin, độ dài, formatting hoặc kiến thức nền. Một câu trả lời sai nhưng rất mượt có thể được chọn nếu người chấm không kiểm chứng. Một câu trả lời đúng nhưng thận trọng có thể bị đánh giá kém nếu người chấm thích sự chắc chắn.

Vì vậy, RLHF tốt cần nhiều loại eval: factuality, safety, helpfulness, calibration, refusal quality, reasoning robustness và task success. Một reward model duy nhất thường không đủ phản ánh toàn bộ giá trị sản phẩm.

## RLHF cho agent trace

Với chatbot một lượt, reward model chấm response. Với agent, ta nên chấm cả trace. Agent có đọc đúng tài liệu không? Có gọi tool đúng không? Có tránh action nguy hiểm không? Có chạy verification không? Có dừng đúng lúc không?

Nếu chỉ chấm final answer, agent có thể học che giấu quá trình xấu. Một coding agent có thể tạo patch đúng nhưng sửa quá rộng. Một research agent có thể trả lời hay nhưng dùng source không đáng tin. Một support agent có thể giải quyết ticket nhưng vi phạm policy riêng tư. Trace-level reward giúp ta đánh giá hành vi, không chỉ kết quả.

## Ghi chú nghiên cứu: Bradley-Terry reward model và ambiguity của reward

Reward model trong RLHF thường được huấn luyện từ preference pairs bằng một mô hình xác suất kiểu Bradley-Terry. Với prompt $x$, response được chọn $y_w$ và response bị loại $y_l$, ta giả định:

$$
P(y_w \succ y_l \mid x) = \sigma(r_\phi(x, y_w) - r_\phi(x, y_l))
$$

Trong đó $r_\phi$ là reward model và $\sigma$ là sigmoid. Loss thường là:

$$
\mathcal{L}(\phi) = -\log \sigma(r_\phi(x, y_w) - r_\phi(x, y_l))
$$

Đọc theo nghĩa đời thường: reward model không cần biết điểm tuyệt đối của từng response. Nó chỉ cần làm cho response được chọn có score cao hơn response bị loại.

Nhưng điều này tạo ra vài hệ quả research quan trọng. Thứ nhất, reward chỉ được xác định tương đối. Nếu cộng cùng một hằng số vào mọi reward cho cùng prompt, preference probability không đổi. Thứ hai, scale của reward ảnh hưởng mạnh tới policy optimization phía sau. Reward quá lớn có thể làm PPO update mạnh, reward quá nhỏ làm tín hiệu yếu. Thứ ba, preference data có noise, disagreement và bias annotator, nên reward model học một proxy có uncertainty.

Với research scientist, câu hỏi không chỉ là reward model accuracy bao nhiêu. Ta cần hỏi calibration ra sao, uncertainty ở vùng nào, reward có tương quan với human eval ngoài mẫu không, reward có bị length bias không, và policy optimization có đẩy model vào vùng reward model chưa được train không.

## Tóm tắt

RLHF chuyển human preference thành reward model rồi dùng reward đó để tối ưu policy. Pipeline này mạnh nhưng dễ lệch nếu preference data, reward model hoặc constraint kém. Với LLM systems, reward model là proxy có bias, không phải chân lý. Với agent, cần đánh giá trace chứ không chỉ final answer.
