---
title: 4.1 Từ Q-table tới Deep Q-Network
---

# 4.1 Từ Q-table tới Deep Q-Network

Q-learning tabular rất đẹp khi state space nhỏ. Ta có thể lưu một bảng $Q(s, a)$, mỗi hàng là state, mỗi cột là action. Nhưng thế giới thật hiếm khi nhỏ như vậy. Một ảnh Atari có hàng chục nghìn pixel. Một trạng thái robot là vector liên tục. Một context của LLM có hàng nghìn token. Một agent trace có lịch sử tool calls, file contents, error messages và user intent.

Khi state quá lớn hoặc liên tục, Q-table không còn khả thi. Ta cần function approximation: thay vì lưu từng giá trị riêng lẻ, ta dùng một hàm có tham số để ước lượng Q.

## Ý tưởng của DQN

Deep Q-Network, thường viết là DQN, dùng neural network để xấp xỉ Q function:

$$
Q(s, a; \theta)
$$

Đọc công thức này theo nghĩa đời thường: neural network nhận state, và dự đoán giá trị của các action. $\theta$ là tham số của mạng. Thay vì học từng ô trong bảng, ta học một hàm có khả năng generalize từ state đã thấy sang state chưa thấy.

Nếu input là ảnh game, network học biểu diễn thị giác. Nếu input là vector trạng thái, network học pattern trong không gian liên tục. Nếu ta áp dụng ý tưởng này vào LLM agent, Q function có thể là một critic nhận trace state và action candidate, rồi dự đoán xác suất task thành công hoặc expected utility.

## Vì sao không chỉ thay bảng bằng neural network?

Câu hỏi tự nhiên là: nếu Q-table quá lớn, ta thay bằng neural network, rồi train bằng Bellman target, vậy là xong? Không đơn giản như vậy.

Deep RL khó vì dữ liệu không độc lập và target không cố định. Trong supervised learning, dataset thường tương đối cố định. Target label không đổi khi model update. Trong DQN, target có chứa chính mạng Q đang học:

$$
y = r + \gamma \max_{a'} Q(s', a'; \theta)
$$

Nếu network thay đổi, target cũng thay đổi. Agent giống như đang cố bắn vào một mục tiêu di chuyển. Thêm nữa, dữ liệu liên tiếp trong trajectory có correlation mạnh. State hiện tại và state tiếp theo rất giống nhau, làm gradient update dễ bất ổn.

## Hai kỹ thuật ổn định cốt lõi

DQN nổi tiếng không chỉ vì dùng deep network, mà vì dùng hai kỹ thuật giúp training bớt bất ổn: replay buffer và target network.

Replay buffer lưu lại các experience đã thấy, rồi sample mini-batch ngẫu nhiên để train. Điều này làm dữ liệu bớt correlation theo thời gian và cho phép agent học lại từ experience cũ.

Target network là một bản copy chậm của Q network dùng để tính target. Thay vì target phụ thuộc ngay vào network đang update từng bước, ta giữ một network mục tiêu ổn định hơn và cập nhật nó định kỳ.

Hai kỹ thuật này nghe đơn giản, nhưng thể hiện một bài học lớn: khi policy, data và target đều thay đổi cùng lúc, hệ thống học rất dễ rung lắc. Muốn deep RL chạy được, ta phải kiểm soát feedback loop.

## Liên hệ với LLM critic

Trong LLM, nếu ta train một critic hoặc reward model liên tục từ dữ liệu do chính policy mới sinh ra, ta cũng gặp feedback loop. Policy thay đổi làm distribution response thay đổi. Reward model thay đổi làm policy update khác đi. Evaluator có bias làm agent học khai thác bias đó. Đây là lý do RLHF và agent learning cần versioning, held-out eval, frozen references và monitoring.

DQN nhắc ta rằng neural network không tự làm RL ổn định. Ngược lại, neural network làm RL mạnh hơn nhưng cũng dễ bất ổn hơn. Với LLM systems, bài học này càng quan trọng vì model lớn, action space lớn, reward nhiễu và chi phí update cao.

## Tóm tắt

DQN thay Q-table bằng neural network để xử lý state space lớn. Nhưng deep RL không chỉ là thêm deep learning vào Q-learning. Vì target di chuyển và dữ liệu có correlation, DQN cần replay buffer và target network để ổn định. Với LLM, đây là bài học về mọi hệ thống học từ feedback loop: phải quản lý data distribution, evaluator drift và target stability.
