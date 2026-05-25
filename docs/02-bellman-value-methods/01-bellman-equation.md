---
title: 2.1 Bellman Equation, tư duy nhìn một bước và phần còn lại
---

# 2.1 Bellman Equation, tư duy nhìn một bước và phần còn lại

Bellman equation là một trong những ý tưởng đẹp nhất của Reinforcement Learning. Nó có thể trông như một công thức toán, nhưng trực giác phía sau rất đơn giản: giá trị của hiện tại bằng phần thưởng ngay trước mắt cộng với giá trị của tương lai sau bước tiếp theo.

Nếu phải giải thích bằng ngôn ngữ đời thường, Bellman nói rằng ta không cần nhìn toàn bộ tương lai cùng một lúc. Ta có thể tách vấn đề thành một bước gần nhất và phần còn lại. Chính phép tách này làm cho rất nhiều thuật toán RL trở nên khả thi.

## Từ return tới đệ quy

Ta đã định nghĩa return:

$$
G_t = r_{t+1} + \gamma r_{t+2} + \gamma^2 r_{t+3} + ...
$$

Ta có thể nhóm lại như sau:

$$
G_t = r_{t+1} + \gamma G_{t+1}
$$

Đọc công thức này theo nghĩa đời thường: tổng lợi ích từ bây giờ bằng reward nhận ngay sau hành động tiếp theo, cộng với tổng lợi ích tương lai bắt đầu từ state sau đó, có discount.

Điểm tinh tế là công thức này biến một chuỗi dài thành quan hệ giữa hiện tại và bước kế tiếp. Đây là lý do Bellman equation nằm ở trung tâm của value learning.

## Bellman expectation equation

Với một policy $\pi$, state-value function được viết:

$$
V^\pi(s) = \mathbb{E}_\pi[r_{t+1} + \gamma V^\pi(s_{t+1}) \mid s_t = s]
$$

Đọc công thức này chậm rãi: giá trị của state $s$ dưới policy $\pi$ bằng reward kỳ vọng sau một bước, cộng với value kỳ vọng của state tiếp theo, nếu agent tiếp tục hành động theo policy đó.

Công thức không nói agent nên hành động tối ưu. Nó chỉ đánh giá một policy đã cho. Nếu policy hiện tại là một chatbot hay hỏi lại quá nhiều, Bellman expectation equation cho ta cách đánh giá hành vi đó. Nếu policy hiện tại là một agent hay gọi tool đắt tiền, ta cũng có thể đánh giá nó theo expected return.

## Bellman optimality equation

Nếu muốn tìm hành động tốt nhất, ta thêm phép max:

$$
V^*(s) = \max_a \mathbb{E}[r_{t+1} + \gamma V^*(s_{t+1}) \mid s_t = s, a_t = a]
$$

Đây là Bellman optimality equation. Nó nói: giá trị tối ưu của state bằng giá trị tốt nhất có thể đạt được nếu chọn action tốt nhất ngay bây giờ, rồi tiếp tục tối ưu sau đó.

Nghe có vẻ hiển nhiên, nhưng đây là hiển nhiên rất mạnh. Nó biến bài toán tối ưu cả tương lai thành bài toán lặp lại của tối ưu một bước cộng tương lai tối ưu.

## Vì sao Bellman quan trọng với Q-learning?

Q-learning học action-value function $Q(s, a)$. Ý tưởng Bellman cho Q function là:

$$
Q^*(s, a) = \mathbb{E}[r_{t+1} + \gamma \max_{a'} Q^*(s_{t+1}, a')]
$$

Đọc công thức này theo nghĩa kỹ sư: nếu tôi chọn action $a$ tại state $s$, giá trị của lựa chọn đó bằng reward tôi nhận sau một bước, cộng với giá trị tốt nhất tôi có thể đạt được ở state kế tiếp.

Q-learning sẽ dùng target kiểu này để cập nhật ước lượng Q. Chính vì vậy nó là value-based method: thay vì học trực tiếp policy, nó học bảng hoặc hàm đánh giá action, rồi chọn action có Q cao.

## Liên hệ với LLM evaluator

Bellman giúp ta nhìn một LLM agent trace theo cách có cấu trúc. Giả sử một agent đang ở bước thứ 5 trong task sửa bug. Nó có vài action: đọc thêm file, chạy test, sửa patch, hoặc hỏi người dùng. Nếu có một critic kiểu value function, critic không chỉ chấm action theo cảm giác tức thời. Nó phải ước lượng action đó mở ra tương lai nào.

Đọc thêm file có thể không tạo reward ngay, nhưng có thể tăng xác suất sửa đúng. Chạy test có thể tốn thời gian, nhưng giảm rủi ro báo sai. Sửa patch ngay có thể nhanh, nhưng nếu thiếu context, tương lai có thể xấu. Tư duy Bellman buộc ta đánh giá action bằng cả reward ngắn hạn và giá trị tương lai.

## Bellman và planning trong agent

Khi một agent lập plan, nó thường chia task thành các bước. Một plan tốt không chỉ hỏi bước này có vẻ hợp lý không, mà hỏi bước này đưa ta tới trạng thái nào và trạng thái đó có giá trị không. Đây là cùng trực giác với Bellman.

Trong production, ta có thể không viết Bellman equation trực tiếp. Nhưng khi thiết kế evaluator cho agent, ta vẫn cần câu hỏi Bellman:

- Action này có tạo tiến triển thật không?
- Nó có làm state tiếp theo dễ giải hơn không?
- Nó có giảm uncertainty không?
- Nó có tránh rủi ro về sau không?
- Nó có đáng chi phí hiện tại không?

## Tóm tắt

Bellman equation nói rằng giá trị hiện tại có thể được tách thành reward một bước và giá trị tương lai. Ý tưởng này là nền tảng cho dynamic programming, Q-learning, TD learning và nhiều critic trong actor-critic methods. Với LLM systems, Bellman là cách nghĩ về hành động trung gian: một bước tốt không chỉ trông hay ngay lúc đó, mà phải làm tương lai tốt hơn.
