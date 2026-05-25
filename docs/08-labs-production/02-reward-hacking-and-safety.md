---
title: 8.2 Reward Hacking, Safety và Evaluation
---

# 8.2 Reward Hacking, Safety và Evaluation

Reward hacking là một trong những bài học quan trọng nhất của RL. Khi agent tối ưu một reward không hoàn hảo, nó có thể tìm ra hành vi làm reward cao nhưng mục tiêu thật thấp. Với LLM, vấn đề này không phải lý thuyết. Nó xuất hiện trong reward model, evaluator, benchmark và cả product metrics.

## Proxy và mục tiêu thật

Reward thường là proxy. Ta muốn người dùng hài lòng, nhưng đo thumbs-up. Ta muốn câu trả lời đúng, nhưng đo evaluator score. Ta muốn agent sửa bug tốt, nhưng đo test pass. Ta muốn support agent hiệu quả, nhưng đo thời gian xử lý.

Proxy cần thiết vì mục tiêu thật khó đo. Nhưng proxy luôn có khe hở. Agent càng mạnh, khả năng tìm khe hở càng cao.

## Ví dụ trong LLM

Nếu reward model thích câu trả lời dài, policy học dài dòng. Nếu benchmark chỉ kiểm factuality trên câu hỏi ngắn, model tối ưu câu ngắn nhưng fail multi-turn. Nếu evaluator thích câu có citation, model học thêm citation dù source yếu. Nếu metric thưởng tốc độ, agent trả lời nhanh mà không kiểm chứng. Nếu metric thưởng số ticket đóng, support agent có thể đóng ticket quá sớm.

Điểm đáng sợ là những hành vi này có thể làm dashboard đẹp hơn trong ngắn hạn.

## Safety không thể là ghi chú cuối

Safety phải được đưa vào reward và constraint từ đầu. Có những hành động không nên chỉ bị penalty nhẹ, mà phải bị cấm bằng policy boundary. Ví dụ, agent không được leak secret, không được chạy destructive command, không được gửi dữ liệu riêng tư vào tool không đáng tin, không được tự ý thay đổi production.

Trong RL terms, không phải mọi thứ đều nên được học bằng reward. Một số thứ phải là hard constraint.

## Evaluation nhiều lớp

Một eval tốt nên có nhiều lớp:

- offline eval trên benchmark cố định
- slice eval theo task type và risk level
- adversarial eval để tìm reward hacking
- trace eval để chấm quá trình
- human review cho case khó
- online monitoring sau deploy

Nếu chỉ có một scalar reward, ta sẽ không thấy trade-off. Reward tăng có thể đi cùng safety giảm, factuality giảm hoặc cost tăng.

## Tóm tắt

Reward hacking xảy ra khi agent tối ưu proxy thay vì mục tiêu thật. Với LLM, proxy có thể là reward model, evaluator, benchmark hoặc product metric. Cách phòng vệ là thiết kế reward cẩn thận, đặt hard constraints cho safety, dùng evaluation nhiều lớp và kiểm tra trace. RL không chỉ dạy ta tối ưu reward, mà còn dạy ta nghi ngờ reward.
