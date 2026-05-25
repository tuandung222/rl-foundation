---
title: 9.1 Bellman Operators và Convergence
---

# 9.1 Bellman Operators và Convergence

Khi học Bellman lần đầu, ta thường nhớ một câu ngắn: giá trị hiện tại bằng reward một bước cộng với giá trị tương lai. Câu đó đúng và rất hữu ích cho trực giác. Nhưng nếu dạy cho học viên research, PhD hoặc research scientist, ta cần đi thêm một tầng: Bellman không chỉ là công thức, mà là một operator trên không gian các hàm value.

Cách nhìn operator giúp ta trả lời những câu hỏi mà công thức trực giác chưa trả lời đủ. Vì sao value iteration hội tụ trong tabular MDP? Vì sao discount factor quan trọng? Vì sao thay Q-table bằng neural network làm bảo đảm toán học yếu đi? Và vì sao một critic trong LLM agent có thể hữu ích về mặt tư duy nhưng không được tin như một định lý convergence?

## Bellman expectation operator

Xét một finite MDP với state space $\mathcal{S}$, action space $\mathcal{A}$, transition probability $p(s', r \mid s, a)$ và policy $\pi(a \mid s)$. Với một hàm value bất kỳ $V: \mathcal{S} \rightarrow \mathbb{R}$, Bellman expectation operator được định nghĩa:

$$
(T^\pi V)(s) = \sum_a \pi(a \mid s) \sum_{s', r} p(s', r \mid s, a) [r + \gamma V(s')]
$$

Đọc công thức này theo nghĩa đời thường: lấy một hàm value hiện tại, nhìn một bước theo policy $\pi$, rồi tạo ra một hàm value mới bằng immediate reward cộng với discounted future value.

Value function thật của policy $\pi$ là fixed point của operator này:

$$
V^\pi = T^\pi V^\pi
$$

Đây là một cách nói chặt chẽ hơn của Bellman expectation equation. Ta không chỉ có một phương trình, ta có một quá trình biến đổi hàm. Nếu lặp $T^\pi$ đủ lâu trong điều kiện tabular và $\gamma < 1$, ta đi về fixed point duy nhất.

## Vì sao contraction quan trọng?

Một operator $T$ là contraction nếu có hằng số $c < 1$ sao cho:

$$
\|TV - TU\| \leq c \|V - U\|
$$

Với Bellman expectation operator trong chuẩn vô cực, ta có:

$$
\|T^\pi V - T^\pi U\|_\infty \leq \gamma \|V - U\|_\infty
$$

Ý nghĩa của bất đẳng thức này rất sâu. Nếu hai ước lượng value ban đầu khác nhau, sau một lần áp dụng Bellman operator, khoảng cách giữa chúng bị co lại theo hệ số tối đa $\gamma$. Nếu $\gamma$ gần 1, co chậm. Nếu $\gamma$ nhỏ, co nhanh hơn nhưng agent trở nên ngắn hạn hơn.

Theo Banach fixed point theorem, contraction trên không gian đầy đủ có fixed point duy nhất và lặp operator sẽ hội tụ tới fixed point đó. Đây là nền tảng của iterative policy evaluation trong finite discounted MDP.

## Bellman optimality operator

Khi tìm policy tối ưu, ta dùng operator:

$$
(T^* V)(s) = \max_a \sum_{s', r} p(s', r \mid s, a) [r + \gamma V(s')]
$$

Fixed point của $T^*$ là $V^*$:

$$
V^* = T^* V^*
$$

Từ $V^*$, ta có thể lấy policy greedy:

$$
\pi^*(s) \in \arg\max_a \sum_{s', r} p(s', r \mid s, a)[r + \gamma V^*(s')]
$$

Điểm cần nhấn mạnh cho học viên research là phép max không chỉ là trick thuật toán. Nó chuyển từ evaluation của một policy cố định sang optimal control. Q-learning về sau chính là cách học sample-based cho fixed point tương ứng của Bellman optimality operator trên $Q$.

## Policy iteration và value iteration

Policy iteration gồm hai bước lặp lại: policy evaluation và policy improvement. Evaluation tìm hoặc xấp xỉ $V^\pi$. Improvement lấy policy greedy theo value vừa đánh giá. Trong finite discounted MDP, quá trình này có bảo đảm hội tụ tới policy tối ưu.

Value iteration gộp hai ý tưởng lại bằng cách lặp trực tiếp Bellman optimality operator:

$$
V_{k+1} = T^* V_k
$$

Nếu điều kiện contraction giữ, $V_k$ tiến tới $V^*$. Khi đã có $V^*$ xấp xỉ, policy greedy theo $V_k$ sẽ gần tối ưu nếu sai số value đủ nhỏ.

## Điều gì thay đổi khi dùng function approximation?

Trong tabular setting, ta có thể cập nhật một giá trị cho từng state hoặc state-action pair. Nhưng với neural network, ta biểu diễn value bằng $V_\theta$ hoặc $Q_\theta$. Không gian các hàm biểu diễn được chỉ là một phần nhỏ của mọi possible value functions.

Khi áp dụng Bellman operator lên $V_\theta$, kết quả $T^\pi V_\theta$ có thể không nằm trong family mà network biểu diễn được. Ta phải học một approximation thông qua gradient descent trên samples. Khi đó, câu hỏi không còn là lặp contraction lý tưởng, mà là tối ưu một objective nhiễu, trên distribution mẫu, với target có thể di chuyển.

Đây là nguồn gốc của nhiều khó khăn trong deep RL. Một định lý tabular không tự động chuyển sang DQN. Một Bellman target đẹp không đảm bảo neural network hội tụ ổn định nếu distribution shift, bootstrapping và off-policy data cùng xuất hiện.

## Liên hệ với LLM critics

Trong LLM systems, ta có thể muốn một critic đánh giá state của agent trace: bước hiện tại có triển vọng hoàn thành task không, tool call này có mở ra tương lai tốt hơn không, có nên hỏi lại người dùng không. Tư duy Bellman rất phù hợp để đặt câu hỏi đó.

Nhưng các giả định của Bellman operator cổ điển hiếm khi giữ nguyên. State không hữu hạn theo nghĩa thực tế. Transition phụ thuộc vào user, tools, index, prompt template và model version. Reward là proxy. Environment có thể thay đổi sau mỗi release.

Vì vậy, dùng Bellman cho LLM không có nghĩa là ta có convergence guarantee như tabular MDP. Nó có nghĩa là ta mượn một ngôn ngữ chính xác để phân tích quyết định tuần tự, rồi phải kiểm chứng bằng eval, logging, versioning và controlled rollout.

## Điều cần giữ lại

Bellman equation là cửa vào. Bellman operator mới là ngôn ngữ research. Nó cho ta fixed point, contraction, policy iteration, value iteration và điều kiện hội tụ trong finite discounted MDP. Khi chuyển sang function approximation và LLM agent, ta vẫn giữ được trực giác về một bước cộng tương lai, nhưng phải khiêm tốn với bảo đảm toán học.
