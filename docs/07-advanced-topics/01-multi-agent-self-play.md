---
title: 7.1 Multi-agent RL và Self-play
---

# 7.1 Multi-agent RL và Self-play

Trong single-agent RL, agent học trong một environment mà ta thường xem là cố định. Trong multi-agent RL, environment có thể chứa các agent khác cũng đang học, cạnh tranh, hợp tác hoặc thương lượng. Điều này làm bài toán khó hơn rất nhiều, vì thế giới không còn đứng yên khi một agent update policy.

Với LLM systems, multi-agent không còn là chuyện xa lạ. Ta có planner, coder, reviewer, researcher, critic, evaluator, safety checker và human supervisor. Mỗi agent hoặc role có objective riêng, context riêng và lỗi riêng. Khi chúng tương tác, lỗi có thể được sửa, nhưng cũng có thể khuếch đại.

## Non-stationarity trong multi-agent

Nếu agent A học trong khi agent B cũng thay đổi, từ góc nhìn của A, environment đang biến đổi. Một policy hôm nay tốt vì B hành động theo kiểu cũ, nhưng ngày mai có thể tệ khi B đã thích nghi.

Trong LLM multi-agent workflows, điều này xuất hiện khi prompt của reviewer đổi, planner đổi style, tool output đổi format, hoặc evaluator được cập nhật. Nếu ta không version hóa từng role, ta không biết system behavior thay đổi vì agent nào.

## Cooperation và competition

Multi-agent có thể là cooperative, competitive hoặc mixed. Trong cooperative setting, các agent cùng tối ưu mục tiêu chung. Ví dụ planner và executor cùng muốn giải task. Trong competitive setting, agent đối đầu nhau, như self-play trong game. Trong mixed setting, mỗi agent có lợi ích riêng nhưng vẫn cần phối hợp.

LLM systems thường là cooperative trên giấy, nhưng mixed trong thực tế. Một retrieval agent muốn recall cao, có thể đưa quá nhiều context. Một summarizer muốn ngắn gọn, có thể bỏ chi tiết. Một safety checker muốn giảm rủi ro, có thể từ chối quá nhiều. Objective lệch nhau tạo conflict.

## Self-play

Self-play là kỹ thuật agent học bằng cách chơi với chính các phiên bản của mình. Nó rất mạnh trong game vì tạo curriculum tự nhiên: khi agent giỏi hơn, đối thủ cũng giỏi hơn.

Trong LLM, self-play có thể hiểu rộng hơn. Một model sinh câu hỏi khó cho model khác. Một adversarial agent tìm prompt làm policy sai. Một critic tạo phản biện cho response. Một code reviewer agent cố tìm bug trong patch của coder agent. Nếu thiết kế tốt, self-play tạo data khó mà con người không cần viết thủ công từng case.

Nhưng self-play cũng có rủi ro. Agents có thể đồng tiến hóa theo một game lệch khỏi mục tiêu thật. Ví dụ generator và evaluator học một ngôn ngữ riêng để vượt eval, nhưng người dùng thật không thấy hữu ích. Vì vậy, self-play cần neo vào human eval, task thật và safety constraints.

## Bài học cho agent workflows

Khi thiết kế multi-agent LLM workflow, đừng chỉ hỏi có bao nhiêu agent. Hãy hỏi:

- Agent nào sở hữu quyết định cuối cùng?
- Objective của từng agent có xung đột không?
- Agent nào có quyền gọi tool nguy hiểm?
- Có evaluator độc lập không?
- Có trace để biết lỗi đến từ planner, executor hay reviewer không?
- Có baseline single-agent để so sánh không?

Nhiều workflow multi-agent thất bại vì thêm vai trò nhưng không thêm accountability. RL nhắc ta rằng phối hợp nhiều policy là một bài toán động, không chỉ là orchestration.

## Tóm tắt

Multi-agent RL nghiên cứu nhiều agent cùng tương tác và học trong một môi trường. Vấn đề khó hơn vì non-stationarity, objective conflict và coordination. Với LLM, multi-agent xuất hiện trong planner-coder-reviewer, critic loops, adversarial testing và self-play data generation. Muốn dùng tốt, cần versioning, trace, role boundary và eval độc lập.
