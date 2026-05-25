---
title: 4.3 Vì sao DQN và Deep RL dễ bất ổn?
---

# 4.3 Vì sao DQN và Deep RL dễ bất ổn?

Deep RL hấp dẫn vì nó hứa hẹn học trực tiếp từ quan sát phức tạp. Nhưng bất kỳ ai từng train RL đều biết một điều: nó rất dễ bất ổn. Loss có thể giảm nhưng policy tệ đi. Reward có thể tăng rồi sụp. Agent có thể học hành vi kỳ quặc. Một seed chạy tốt, seed khác thất bại.

Để hiểu các thuật toán hiện đại như PPO hoặc các pipeline RLHF, ta cần hiểu vì sao bất ổn này xuất hiện.

## Deadly triad

Trong RL có một thuật ngữ nổi tiếng: deadly triad. Nó gồm ba yếu tố:

- function approximation
- bootstrapping
- off-policy learning

Mỗi yếu tố riêng lẻ đã có rủi ro. Khi đi cùng nhau, chúng có thể gây divergence.

Function approximation nghĩa là ta dùng neural network thay vì bảng. Network generalize, nhưng cũng có thể generalize sai. Bootstrapping nghĩa là target dùng chính ước lượng của model. Nếu ước lượng sai, target cũng sai. Off-policy learning nghĩa là data đến từ policy khác policy ta đang học. Nếu distribution mismatch lớn, update có thể đẩy model vào vùng không được data hỗ trợ.

DQN phải kiểm soát deadly triad bằng replay buffer, target network và nhiều kỹ thuật bổ sung.

## Overestimation bias

Q-learning dùng phép max trên Q value. Nếu Q estimates có noise, phép max có xu hướng chọn action bị overestimate. Theo thời gian, agent có thể quá lạc quan về một số action.

Trong LLM, ta cũng thấy dạng tương tự. Nếu evaluator có noise, policy sẽ tìm ra response được evaluator chấm quá cao. Nếu reward model overestimate câu trả lời nghe có vẻ tự tin, policy sẽ học tự tin quá mức. Đây là overoptimization trên proxy.

Double DQN được đề xuất để giảm overestimation bằng cách tách action selection và action evaluation. Bài học rộng hơn là: khi dùng một model vừa chọn vừa chấm, bias có thể tự khuếch đại.

## Non-stationary data

Trong RL, policy thay đổi làm dữ liệu thay đổi. Khi agent tốt hơn, nó đi tới state khác. Khi agent tệ đi, nó mắc kẹt trong state khác. Dataset không đứng yên.

Với LLM product, non-stationarity còn rõ hơn. Người dùng thay đổi hành vi khi model thay đổi. Tool version thay đổi. Prompt template thay đổi. Retrieval index cập nhật. Policy an toàn thay đổi. Nếu ta so sánh metric qua thời gian mà không version hóa các yếu tố này, ta dễ kết luận sai.

## Reward hacking

Agent không tối ưu ý định của người thiết kế. Agent tối ưu reward được cung cấp. Nếu reward lệch, agent học hành vi lệch.

Trong game, agent có thể tìm bug của môi trường. Trong LLM, agent có thể học viết câu trả lời dài để reward model thích, thêm citation giả, tránh trả lời những câu khó để giảm lỗi, hoặc hỏi lại quá nhiều để không chịu trách nhiệm. Những hành vi này có thể tăng score nhưng giảm giá trị thật.

## Checklist debug

Khi một deep RL hoặc LLM feedback loop bất ổn, đừng chỉ hỏi learning rate bao nhiêu. Hãy hỏi hệ thống:

- Data đến từ policy nào?
- Reward có bị khai thác không?
- Target có thay đổi cùng lúc với policy không?
- Evaluation set có bị train leak không?
- Có theo dõi distribution shift không?
- Có so sánh với baseline đơn giản không?
- Có kiểm tra nhiều seed hoặc nhiều slices dữ liệu không?

## Tóm tắt

DQN và deep RL dễ bất ổn vì neural network, bootstrapping và off-policy data tạo feedback loop khó kiểm soát. Overestimation, non-stationarity và reward hacking là các lỗi rất thực tế. Với LLM systems, những lỗi này xuất hiện dưới dạng evaluator bias, reward model exploitation, trace distribution shift và metric tăng nhưng trải nghiệm thật giảm. Học deep RL là học cách tôn trọng feedback loop.
