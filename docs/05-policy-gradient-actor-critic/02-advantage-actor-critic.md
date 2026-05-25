---
title: 5.2 Advantage và Actor-Critic
---

# 5.2 Advantage và Actor-Critic

Policy gradient thuần có một điểm yếu lớn: nó biết trajectory tốt hay xấu, nhưng không biết rõ hành động tại state cụ thể tốt hơn kỳ vọng bao nhiêu. Advantage giải quyết đúng câu hỏi đó.

Nếu value function nói state này đáng giá bao nhiêu, thì advantage nói action này tốt hơn hoặc tệ hơn mức trung bình của state đó bao nhiêu. Đây là một ý tưởng cực kỳ quan trọng, vì nó giúp policy update có ý nghĩa hơn.

## Advantage là gì?

Advantage function được định nghĩa:

$$
A^\pi(s, a) = Q^\pi(s, a) - V^\pi(s)
$$

Đọc công thức này theo nghĩa đời thường: giá trị của việc chọn action $a$ tại state $s$ cao hơn hay thấp hơn giá trị trung bình khi ở state $s$?

Nếu $A(s, a)$ dương, action tốt hơn kỳ vọng. Nếu âm, action tệ hơn kỳ vọng. Nếu gần 0, action không khác biệt nhiều.

Trong LLM, advantage giúp ta không thưởng phạt một response theo điểm tuyệt đối một cách mù quáng. Một prompt dễ có nhiều response tốt. Một prompt khó có thể response tốt nhất vẫn chưa hoàn hảo. Điều quan trọng là response đó tốt hơn expectation trong context đó bao nhiêu.

## Actor và critic

Actor-critic chia vai trò thành hai module.

Actor là policy, chọn action. Critic là value estimator, đánh giá state hoặc action. Actor dùng tín hiệu từ critic để update policy. Critic học cách dự đoán return tốt hơn.

Mối quan hệ này rất gần với nhiều hệ thống LLM hiện đại. Generator sinh response. Evaluator hoặc reward model chấm response. Một value head có thể dự đoán expected reward từ prefix. Một planner sinh bước tiếp theo, trong khi critic đánh giá trace có đi đúng hướng không.

Điểm cần nhớ là critic không phải trọng tài tuyệt đối. Critic cũng là model học từ dữ liệu, nên có thể sai. Nếu actor tin critic quá mức, actor có thể khai thác lỗi của critic.

## Vì sao actor-critic hữu ích?

Actor-critic hữu ích vì nó kết hợp hai thế mạnh. Policy-based methods xử lý action space liên tục hoặc rất lớn tốt hơn value argmax trực tiếp. Value-based methods cung cấp tín hiệu giảm variance. Actor-critic dùng critic làm baseline có học, giúp actor update ổn định hơn policy gradient thuần.

Trong LLM, action space là vocabulary hoặc tập tool/action rất lớn. Việc học trực tiếp policy là tự nhiên. Nhưng nếu không có critic hoặc reward estimator, update rất nhiễu. RLHF với PPO thường dùng reward model và value model chính vì lý do này.

## Critic sai thì sao?

Critic sai là chuyện bình thường. Vấn đề không phải tránh sai hoàn toàn, mà là kiểm soát hậu quả của sai.

Nếu critic đánh giá cao câu trả lời dài, actor sẽ học dài dòng. Nếu critic đánh giá cao citation format, actor có thể học thêm citation dù không cần. Nếu critic đánh giá thấp câu trả lời từ chối an toàn, actor có thể trở nên quá chiều người dùng. Vì vậy, critic cần được đánh giá trên held-out data, adversarial prompts, safety slices và human review.

Một hệ thống tốt không chỉ hỏi average reward tăng không. Nó hỏi reward tăng ở slice nào, có trade-off safety không, có reward hacking không, có drift khỏi reference policy không.

## Tóm tắt

Advantage đo action tốt hơn kỳ vọng của state bao nhiêu. Actor-critic dùng actor để hành động và critic để đánh giá, nhờ đó policy gradient bớt nhiễu. Với LLM, actor là model hoặc agent policy, critic có thể là value model, reward model hoặc evaluator. Nhưng critic cũng có bias, nên cần versioning, held-out eval và kiểm tra reward hacking.
