---
title: 4.2 Replay Buffer và Target Network
---

# 4.2 Replay Buffer và Target Network

Replay buffer và target network là hai chi tiết kỹ thuật, nhưng đằng sau chúng là hai nguyên tắc thiết kế rất sâu. Replay buffer trả lời câu hỏi: làm sao học từ trải nghiệm mà không bị cuốn theo correlation của hiện tại? Target network trả lời câu hỏi: làm sao học khi chính mục tiêu học cũng đang thay đổi?

Hai câu hỏi này không chỉ dành cho Atari. Chúng xuất hiện trong mọi hệ thống AI học từ feedback, kể cả LLM product.

## Replay buffer, trí nhớ có thể sample lại

Replay buffer lưu các transition:

$$
(s, a, r, s')
$$

Thay vì train ngay trên transition mới nhất theo thứ tự thời gian, agent sample mini-batch ngẫu nhiên từ buffer. Điều này có ba lợi ích.

Thứ nhất, nó phá correlation theo thời gian. Các frame liên tiếp trong game thường rất giống nhau. Các bước liên tiếp trong agent trace cũng vậy. Nếu train liên tục trên dữ liệu quá giống nhau, network dễ overfit vào trạng thái gần nhất.

Thứ hai, nó tăng hiệu quả dữ liệu. Một experience tốn chi phí để thu thập. Replay cho phép học nhiều lần từ experience đó.

Thứ ba, nó làm training bớt phụ thuộc vào mood hiện tại của policy. Nếu policy vừa đi vào vùng hành vi xấu, buffer vẫn giữ các experience cũ để network không quên hoàn toàn.

## Replay trong LLM systems

Trong LLM, replay buffer có thể được hiểu rộng hơn là trace store hoặc experience dataset. Ta lưu lại prompts, responses, tool calls, evaluator outputs, human feedback, cost, latency và outcome. Khi cải thiện model hoặc agent, ta không chỉ nhìn vài lỗi mới nhất, mà sample lại từ nhiều loại tình huống.

Nếu chỉ học từ lỗi mới nhất, team rất dễ rơi vào reactive tuning. Hôm nay người dùng phàn nàn câu trả lời quá dài, ta phạt độ dài. Mai người dùng phàn nàn thiếu chi tiết, ta thưởng độ dài. Không có buffer cân bằng, policy sẽ dao động theo feedback gần nhất.

Replay tốt cần metadata. Một trace không chỉ là text. Nó nên có task type, model version, policy version, evaluator version, tool version, outcome, failure mode và safety tags. Nếu không, replay chỉ là đống log khó học.

## Target network, giữ mục tiêu đủ ổn định

Trong DQN, target để train là:

$$
y = r + \gamma \max_{a'} Q_{target}(s', a')
$$

Điểm quan trọng là $Q_{target}$ không phải network đang update từng bước. Nó là một bản copy được cập nhật chậm hơn. Nhờ vậy, target không chạy quá nhanh trong lúc model đang học.

Đọc theo nghĩa đời thường: nếu thầy giáo thay đáp án sau mỗi lần học sinh sửa bài, học sinh sẽ rất khó học. Target network giữ đáp án tương đối ổn định trong một khoảng thời gian.

## Target stability trong RLHF

Trong RLHF, ta cũng cần khái niệm tương tự. Reward model, reference model, evaluator và policy không nên thay đổi hỗn loạn cùng lúc. Nếu reward model vừa được update, policy vừa được update, data collection vừa đổi, evaluator cũng đổi, ta sẽ không biết improvement đến từ đâu và lỗi do đâu.

Đây là lý do nhiều pipeline giữ reference policy cố định để tính KL, giữ eval set cố định để so sánh, version reward model rõ ràng, và tách offline evaluation khỏi online rollout. Target stability không phải chi tiết nhỏ. Nó là điều kiện để học có thể debug.

## Những lỗi thường gặp

Lỗi đầu tiên là replay buffer lệch distribution. Nếu buffer toàn task dễ, agent sẽ giỏi task dễ nhưng fail task khó. Nếu buffer toàn failure, agent có thể quá thận trọng. Nếu buffer quá cũ, agent học từ thế giới đã thay đổi.

Lỗi thứ hai là target network update quá nhanh hoặc quá chậm. Quá nhanh thì mất ổn định. Quá chậm thì học trì trệ. Trong LLM systems, analog là evaluator hoặc reward model quá nhạy với feedback mới, hoặc quá lỗi thời so với hành vi thật.

Lỗi thứ ba là thiếu held-out evaluation. Nếu cùng một trace store được dùng để train và đánh giá, ta không biết agent thật sự generalize hay chỉ học cách vượt qua bộ trace cũ.

## Tóm tắt

Replay buffer giúp agent học lại từ experience cũ, giảm correlation và tăng hiệu quả dữ liệu. Target network giúp target học ổn định hơn khi Q network thay đổi. Với LLM systems, hai ý tưởng này chuyển thành trace store có metadata, reward/evaluator versioning, reference model cố định và eval set tách biệt. Đây là nền tảng để học từ feedback mà không tự làm hệ thống dao động.
