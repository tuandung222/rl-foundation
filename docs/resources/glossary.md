---
title: Glossary
---

# Glossary

## Agent

Thực thể chọn hành động. Trong RL cổ điển, agent có thể là người chơi game hoặc robot controller. Trong LLM systems, agent có thể là model sinh token, workflow chọn tool, hoặc toàn bộ hệ thống gồm model, retrieval, tools và evaluator.

## Environment

Phần thế giới mà agent tương tác. Environment nhận action, cập nhật state và trả reward. Với LLM agent, environment có thể bao gồm người dùng, conversation history, tools, repo, filesystem, API, retrieval index và policy constraints.

## State

Thông tin agent dùng để ra quyết định tại một thời điểm. Với LLM, state thường gần với context: prompt, lịch sử hội thoại, retrieved documents, tool outputs và metadata liên quan.

## Action

Điều agent chọn làm. Action có thể là một move trong game, một token, một response hoàn chỉnh, một tool call, một retrieval query, một quyết định route model, hoặc một quyết định dừng.

## Reward

Tín hiệu phản hồi cho biết hành vi tốt đến đâu theo một tiêu chí nào đó. Reward không phải lúc nào cũng là mục tiêu thật. Nó thường là proxy và có thể bị khai thác nếu thiết kế sai.

## Return

Tổng reward tương lai, thường có discount. Return cho phép RL nói về mục tiêu dài hạn thay vì chỉ reward trước mắt.

## Policy

Quy tắc chọn action từ state. Với LLM, policy có thể là phân phối xác suất sinh token hoặc policy cấp workflow chọn giữa trả lời, gọi tool, hỏi lại và dừng.

## Value Function

Hàm ước lượng state hoặc action có triển vọng tốt đến đâu xét theo reward tương lai. Value function trả lời câu hỏi: từ đây trở đi, kỳ vọng tổng lợi ích là bao nhiêu?

## Q Function

Action-value function, ký hiệu $Q(s, a)$, ước lượng giá trị của việc chọn action $a$ tại state $s$, rồi tiếp tục theo một policy nào đó.

## Trajectory

Chuỗi state, action và reward trong một episode. Với LLM agent, trajectory là trace gồm prompt, tool calls, observations, intermediate decisions và final answer.

## Credit Assignment

Bài toán xác định hành động nào trong quá khứ chịu trách nhiệm cho reward cuối cùng. Đây là vấn đề rất quan trọng trong multi-turn LLM agents và RLHF.

## Reward Model

Model học cách chấm điểm output hoặc trajectory dựa trên dữ liệu preference, human feedback hoặc evaluator labels. Reward model là proxy, không phải chân lý tuyệt đối.

## KL Penalty

Ràng buộc dùng để giữ policy mới không đi quá xa policy tham chiếu. Trong RLHF, KL penalty giúp giảm nguy cơ policy tối ưu quá mức reward model và drift khỏi hành vi ngôn ngữ ổn định.

## PPO

Proximal Policy Optimization, một thuật toán policy optimization thường dùng trong RLHF. Ý tưởng chính là cải thiện policy nhưng giới hạn bước cập nhật để giữ ổn định.

## DPO

Direct Preference Optimization, phương pháp học trực tiếp từ preference pairs mà không cần chạy vòng RL đầy đủ với reward model riêng theo cách truyền thống.
