---
title: 6.4 Agent Traces và Credit Assignment trong LLM Systems
---

# 6.4 Agent Traces và Credit Assignment trong LLM Systems

Một LLM agent hiếm khi thất bại vì một token đơn lẻ. Nó thất bại vì một chuỗi quyết định: hiểu sai yêu cầu, chọn sai tool, đọc thiếu file, bỏ qua lỗi test, tin retrieval sai, hoặc dừng quá sớm. Nếu chỉ nhìn final answer, ta thấy kết quả. Nếu nhìn trace, ta thấy cơ chế tạo ra kết quả.

Credit assignment là bài toán tìm xem phần nào của trace chịu trách nhiệm cho outcome. Đây là một trong những lý do RL quan trọng với agentic systems.

## Trace nên chứa gì?

Một agent trace tốt nên ghi lại đủ thông tin để replay và debug:

- user request và system constraints
- context được đưa vào model
- action được chọn ở từng bước
- tool call arguments và tool outputs
- intermediate observations
- final answer hoặc final action
- evaluator scores, human feedback và outcome
- model version, prompt version, tool version

Nếu thiếu các trường này, ta khó biết agent học từ gì. Một final answer sai mà không có trace giống như một test fail không có stack trace.

## Credit assignment trong token-level LLM

Nếu một response bị chấm thấp, lỗi có thể nằm ở đâu? Có thể ở token hallucinated, ở câu mở đầu quá tự tin, ở việc bỏ qua điều kiện trong prompt, hoặc ở toàn bộ strategy trả lời. Token-level credit assignment rất khó vì reward thường gắn với toàn response.

Đây là lý do value head, advantage estimation và KL constraint xuất hiện trong RLHF. Chúng giúp biến reward cuối response thành tín hiệu update ổn định hơn cho policy token-level.

## Credit assignment trong tool-using agent

Tool-using agent còn khó hơn. Một tool call sai có thể làm toàn bộ trace sai. Nhưng một tool call không tạo kết quả ngay có thể vẫn rất quan trọng vì nó giảm uncertainty. Một bước hỏi lại người dùng có thể bị xem là chậm nếu metric chỉ đo latency, nhưng lại tăng task success.

Vì vậy, evaluator của agent không nên chỉ chấm final text. Nó nên chấm cả quá trình: agent có đọc đúng nguồn không, có dùng tool an toàn không, có verify output không, có giữ scope không, có tránh hành động không được phép không.

## Từ trace tới training data

Trace tốt có thể chuyển thành nhiều loại data.

Ta có thể tạo preference pairs giữa hai traces cho cùng task. Ta có thể annotate bước nào là lỗi. Ta có thể trích ra các state-action pairs tốt để SFT. Ta có thể train process reward model để chấm từng bước. Ta có thể tạo eval tasks tái hiện lỗi production.

Điều quan trọng là trace không chỉ phục vụ observability. Trace là nguyên liệu học.

## Tóm tắt

Agent trace là đơn vị dữ liệu trung tâm của RL cho LLM agents. Credit assignment giúp ta hiểu outcome cuối cùng đến từ quyết định nào trong quá trình. Nếu không lưu trace đủ giàu, ta chỉ có thể tối ưu final answer một cách thô. Nếu lưu trace tốt, ta có thể debug, evaluate, train process reward và cải thiện agent có kiểm soát.
