---
title: Phần 0, Định hướng học RL cho người làm NLP và LLM
---

# Phần 0, Định hướng học RL cho người làm NLP và LLM

Trước khi học công thức, ta cần trả lời một câu hỏi đơn giản: vì sao người làm NLP và LLM nên học Reinforcement Learning?

Nếu ta chỉ nhìn vào pipeline NLP truyền thống, câu trả lời có vẻ không rõ. Bài toán sentiment classification có input là câu, output là nhãn. Bài toán named entity recognition có token, có tag. Bài toán machine translation có câu nguồn, có câu đích. Rất nhiều thứ có thể được học bằng supervised learning, tức là học từ cặp input và target.

Nhưng LLM hiện đại không chỉ sống trong thế giới input và target đơn giản như vậy. Khi một model trả lời người dùng, nó không tạo ra một nhãn duy nhất. Nó tạo ra một chuỗi token. Khi một agent giải task, nó không chỉ sinh văn bản. Nó có thể gọi search, đọc file, chạy command, nhận lỗi, sửa lại plan, rồi mới tạo ra kết quả cuối cùng. Chất lượng của hệ thống thường chỉ được đánh giá sau cả một quá trình. Đây là nơi tư duy RL trở nên cần thiết.

## Supervised learning trả lời câu hỏi nào?

Supervised learning hỏi: với input này, output đúng là gì?

Ví dụ, với câu "Sản phẩm này dùng rất tốt", model học nhãn positive. Với prompt dịch thuật, model học câu dịch tham chiếu. Với instruction tuning, model học phản hồi mẫu do con người viết. Cấu trúc chung là:

$$
(x, y) \rightarrow \text{learn } p(y \mid x)
$$

Đọc công thức này theo nghĩa đời thường: ta có một đầu vào, ta có một câu trả lời mong muốn, và ta huấn luyện model tạo ra câu trả lời giống dữ liệu mẫu. Đây là cách học cực kỳ mạnh, và phần lớn tiến bộ của NLP hiện đại dựa vào nó.

Nhưng supervised learning gặp khó khi câu hỏi không còn là "đáp án đúng là gì?" mà là "hành vi nào tốt hơn trong một quá trình tương tác?".

## RL trả lời câu hỏi nào?

Reinforcement Learning hỏi: trong một trạng thái hiện tại, nên chọn hành động nào để tối đa hoá tổng phản hồi nhận được về lâu dài?

Điểm quan trọng nằm ở nhóm từ "về lâu dài". Một hành động có thể trông tốt ngay bây giờ nhưng gây hại về sau. Một câu trả lời có thể làm người dùng hài lòng trong một lượt chat nhưng khiến hệ thống tự tin sai. Một agent có thể vượt qua một test nhỏ bằng hack tạm thời nhưng làm hỏng kiến trúc repo. Một recommender có thể tăng click hôm nay nhưng làm người dùng mệt mỏi trong tuần sau.

RL được sinh ra để nói về loại vấn đề này. Nó không chỉ học mapping từ input sang output. Nó học policy, tức là cách chọn hành động trong từng trạng thái để đạt kết quả tốt sau một chuỗi tương tác.

## Vì sao RL khó hơn supervised learning?

Có ba lý do nền tảng.

Thứ nhất, dữ liệu phụ thuộc vào chính policy. Trong supervised learning, dataset thường được xem là cố định. Trong RL, nếu agent hành động khác, nó sẽ nhìn thấy dữ liệu khác. Một chatbot hỏi thêm câu làm rõ sẽ đi vào cuộc hội thoại khác với chatbot trả lời ngay. Một agent chọn tool khác sẽ tạo trace khác. Dữ liệu không còn là thứ nằm yên trên bàn, mà là thứ agent tạo ra khi tương tác.

Thứ hai, reward có thể đến muộn. Khi một coding agent thất bại sau 20 bước, ta biết trace đó tệ, nhưng không biết ngay bước nào gây lỗi. Có thể lỗi nằm ở plan đầu tiên, ở file được chọn, ở patch cụ thể, ở test bị bỏ qua, hoặc ở assumption sai về API. Đây là credit assignment problem.

Thứ ba, exploration là cần thiết nhưng nguy hiểm. Agent phải thử hành động mới để học, nhưng trong hệ thống thật, thử bừa có thể gây chi phí, lỗi, hoặc rủi ro an toàn. Với LLM, exploration có thể nghĩa là sinh câu trả lời khác, dùng tool khác, hỏi thêm người dùng, hoặc thử chain-of-thought khác trong môi trường kiểm soát.

## Bản đồ giáo trình

Giáo trình này sẽ đi theo một đường dây có chủ ý.

- **Phần 1:** xây mental model của RL: agent, environment, reward, return, state, action, policy, value.
- **Phần 2:** học Bellman equation, vì đây là ngôn ngữ nền tảng của value-based methods.
- **Phần 3:** học Monte Carlo, Temporal Difference, SARSA và Q-learning.
- **Phần 4:** học Deep Q-Network và các kỹ thuật ổn định khi value function là neural network.
- **Phần 5:** học policy gradient, actor-critic, advantage và PPO.
- **Phần 6:** nối RL sang NLP và LLM: RLHF, reward model, KL penalty, preference optimization, DPO, GRPO và agent evaluation.
- **Phần 7:** mở rộng sang multi-agent, self-play, curiosity, model-based RL, offline RL và Decision Transformers.
- **Phần 8:** thực hành qua môi trường nhỏ, toy preference optimization, agent trace evaluator và checklist production.

## Điều cần giữ trong đầu

Nếu chỉ nhớ một ý sau bài này, hãy nhớ: RL không bắt đầu từ thuật toán, mà bắt đầu từ một kiểu vấn đề. Đó là vấn đề của hành động nối tiếp, feedback muộn, và mục tiêu dài hạn. Khi nhìn LLM system bằng lăng kính đó, rất nhiều khái niệm tưởng như rời rạc, như reward model, evaluator, rollout, policy update, tool-use trace và human preference, bắt đầu nằm trong cùng một bản đồ.
