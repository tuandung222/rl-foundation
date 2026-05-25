---
title: 7.3 Model-based RL, Offline RL và Decision Transformers
---

# 7.3 Model-based RL, Offline RL và Decision Transformers

Sau khi học Q-learning, DQN, policy gradient và PPO, ta có thể nghĩ RL luôn cần agent tương tác online với environment. Nhưng có nhiều hướng khác rất quan trọng: model-based RL, offline RL và decision transformers. Những hướng này đặc biệt gần với NLP và LLM vì chúng dựa nhiều vào dữ liệu, mô hình hóa chuỗi và khả năng dự đoán.

## Model-based RL

Model-based RL học hoặc dùng một model của environment để dự đoán tương lai. Nếu agent biết khi chọn action này thì state kế tiếp và reward có thể là gì, nó có thể planning trước khi hành động thật.

Trong LLM agent, model-based thinking xuất hiện khi agent lập plan, mô phỏng phản ứng người dùng, dự đoán test nào sẽ fail, hoặc dùng simulator để đánh giá tool sequence. LLM có khả năng mô phỏng ngôn ngữ rất mạnh, nhưng mô phỏng không đồng nghĩa với đúng. Vì vậy, model-based LLM agents cần verification: chạy test thật, gọi tool thật, kiểm tra source thật.

## Offline RL

Offline RL học policy từ dataset có sẵn mà không tương tác thêm với environment trong lúc train. Đây là tình huống rất thực tế. Nhiều công ty có logs khổng lồ nhưng không muốn agent exploration trực tiếp trên người dùng thật.

Offline RL khó vì policy mới có thể chọn action không xuất hiện trong data. Khi đó value estimate có thể không đáng tin. Đây gọi là extrapolation error. Nếu dataset không có ví dụ agent dùng một tool mới trong context nào đó, model có thể đánh giá sai tool đó.

Trong LLM, offline preference optimization, learning from logs và imitation from traces đều mang tinh thần offline. Bài học là: dataset coverage rất quan trọng. Không thể học policy tốt cho tình huống mà data không hề bao phủ, trừ khi có model hoặc giả định bổ sung đủ mạnh.

## Decision Transformers

Decision Transformer nhìn RL như sequence modeling. Thay vì học value hoặc policy theo cách truyền thống, nó học mô hình dự đoán action tiếp theo từ lịch sử state, action, reward và return mong muốn.

Ý tưởng này rất gần NLP: coi trajectory như một chuỗi token có cấu trúc. Model nhận quá khứ và mục tiêu return, rồi sinh action. Đây là cầu nối tự nhiên giữa RL và transformer architectures.

Với LLM practitioners, Decision Transformer gợi ý một cách nhìn: nhiều bài toán hành vi có thể được biểu diễn thành sequence prediction nếu ta format dữ liệu đúng. Agent traces, tool calls, observations và outcomes có thể trở thành training sequences. Tuy nhiên, sequence modeling không tự giải quyết exploration và distribution shift. Nó học từ những gì data đã có.

## Khi nào các hướng này hữu ích?

Model-based RL hữu ích khi interaction thật đắt hoặc nguy hiểm, nhưng ta có simulator đủ tốt. Offline RL hữu ích khi có log lớn và online exploration bị hạn chế. Decision Transformers hữu ích khi có nhiều trajectories và muốn tận dụng sức mạnh sequence modeling.

Với LLM systems, ba hướng này thường kết hợp. Ta có logs offline, dùng LLM làm simulator một phần, train model trên traces, rồi kiểm chứng bằng eval và rollout có kiểm soát.

## Ghi chú nghiên cứu: support mismatch và conservative learning trong offline RL

Offline RL khó hơn supervised imitation vì policy mới có thể chọn action mà dataset không bao phủ. Giả sử dataset được sinh bởi behavior policy $\mu(a \mid s)$, còn policy ta muốn học là $\pi(a \mid s)$. Nếu tồn tại action mà $\pi(a \mid s)$ cao nhưng $\mu(a \mid s)$ gần 0, ta đang yêu cầu value function dự đoán ngoài vùng dữ liệu.

Đây là support mismatch. Về trực giác, model đang nói về một hành động mà nó hầu như chưa từng thấy trong state đó. Nếu dùng Q-learning offline, phép $\max_a Q(s,a)$ có thể chọn đúng những action bị overestimate ngoài support. Lỗi extrapolation sau đó bị bootstrapping khuếch đại.

Nhiều thuật toán offline RL hiện đại vì vậy thêm tính bảo thủ. Một số phương pháp phạt Q value của action ngoài data. Một số phương pháp ràng buộc policy mới ở gần behavior policy. Một số phương pháp học uncertainty để tránh tin vào vùng không có coverage.

Với LLM logs, support mismatch rất thực tế. Nếu logs chỉ chứa agent không bao giờ gọi một tool mới, ta không thể kết luận chắc tool đó tốt hay xấu từ logs. Nếu logs đến từ model cũ không biết kỹ thuật mới, offline learning có thể đánh giá thấp hành vi mà model mới có thể làm tốt. Ngược lại, nếu policy mới sinh chain hành động chưa từng có trong logs, evaluator học từ logs có thể chấm sai.

Decision Transformer cũng chịu giới hạn tương tự. Nó giỏi bắt chước trajectory trong data và condition theo return mong muốn, nhưng nếu yêu cầu return vượt xa vùng data, model có thể sinh chuỗi trông hợp lý nhưng không được environment thật bảo đảm. Sequence modeling mạnh, nhưng không xóa bỏ câu hỏi coverage, exploration và verification.

## Tóm tắt

Model-based RL dùng model của environment để planning. Offline RL học từ dataset có sẵn nhưng đối mặt với coverage và extrapolation error. Decision Transformers biến trajectory thành sequence modeling problem. Đây là các hướng rất gần với NLP/LLM, nhưng vẫn cần hiểu giới hạn: dữ liệu quyết định vùng policy có thể tin, simulator có thể sai, và sequence prediction không thay thế feedback thật.
