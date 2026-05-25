---
title: 7.2 Curiosity và Exploration có kiểm soát
---

# 7.2 Curiosity và Exploration có kiểm soát

Exploration là điều kiện để agent học cái mới. Nhưng trong nhiều environment, reward ngoài rất thưa. Agent có thể đi rất lâu mà không nhận tín hiệu. Curiosity và intrinsic motivation được đề xuất để giải quyết vấn đề này: agent tự thưởng cho việc khám phá trạng thái mới, bất ngờ hoặc giàu thông tin.

Với LLM systems, curiosity không nên được hiểu là để model tò mò vô hạn. Nó nên được hiểu là cơ chế khuyến khích agent giảm uncertainty một cách có ích: hỏi thêm khi thiếu thông tin, đọc tài liệu liên quan, chạy test, kiểm chứng citation, hoặc thử một plan trong sandbox.

## Sparse reward

Sparse reward nghĩa là reward hiếm. Trong game, agent chỉ nhận điểm khi đạt mục tiêu. Trong coding task, agent chỉ biết thành công khi test pass hoặc reviewer chấp nhận. Trong research task, agent chỉ biết câu trả lời tốt khi evaluator kiểm tra citation và factuality.

Nếu reward quá thưa, agent khó biết hành động trung gian nào hữu ích. Nó cần tín hiệu phụ để tìm đường.

## Intrinsic reward

Intrinsic reward là reward nội tại, không đến trực tiếp từ task cuối. Ví dụ agent được thưởng khi thăm state mới, khi prediction error cao, hoặc khi giảm uncertainty.

Trong LLM agent, intrinsic reward có thể tương ứng với:

- đọc đúng file giúp giảm uncertainty
- tìm được source đáng tin
- chạy test cung cấp thông tin mới
- hỏi người dùng làm rõ yêu cầu mơ hồ
- phát hiện assumption sai trong plan

Nhưng intrinsic reward phải cẩn thận. Nếu thưởng quá mạnh cho novelty, agent có thể lang thang. Một research agent có thể mở vô số tài liệu nhưng không trả lời. Một coding agent có thể đọc quá nhiều file nhưng không sửa lỗi. Curiosity cần phục vụ task, không thay thế task.

## Exploration an toàn

Trong production LLM systems, exploration phải có ranh giới. Một agent không nên thử action nguy hiểm chỉ vì chưa biết hậu quả. Exploration nên diễn ra trong môi trường kiểm soát: offline simulation, shadow mode, synthetic tasks, canary traffic nhỏ, hoặc tool permissions hạn chế.

Một nguyên tắc thực tế là phân loại action theo rủi ro. Đọc file public có thể an toàn. Gửi email cho khách hàng không an toàn. Chạy test local có thể an toàn. Xóa dữ liệu production không an toàn. Exploration policy phải biết sự khác biệt này.

## Curiosity trong học tập con người

Một giáo trình tốt cũng dùng curiosity. Trước khi đưa công thức, nó tạo câu hỏi. Vì sao reward muộn khó? Vì sao Q-learning overestimate? Vì sao PPO cần clipping? Khi người học thấy vấn đề, công thức có ý nghĩa. Đây cũng là cách giáo trình này được viết.

## Tóm tắt

Curiosity và intrinsic reward giúp agent khám phá khi external reward thưa. Với LLM agents, curiosity nên được hiểu là hành vi giảm uncertainty có ích, như hỏi lại, kiểm chứng, đọc source và chạy test. Nhưng exploration phải có boundary, vì agent production có thể gây hại nếu thử sai hành động. Curiosity tốt là curiosity phục vụ mục tiêu và nằm trong sandbox an toàn.
