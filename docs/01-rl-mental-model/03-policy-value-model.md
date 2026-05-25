---
title: 1.3 Policy, Value và Model
---

# 1.3 Policy, Value và Model

Sau khi có MDP, câu hỏi tự nhiên là: agent cần học cái gì? Có ba câu trả lời lớn trong RL: học policy, học value, hoặc học model của environment. Ba hướng này không loại trừ nhau, nhưng chúng đại diện cho ba cách nhìn khác nhau về trí thông minh hành động.

## Policy là cách agent hành xử

Policy, ký hiệu thường là $\pi$, là quy tắc chọn action từ state. Nếu policy deterministic, nó chọn một action cụ thể:

$$
a = \pi(s)
$$

Nếu policy stochastic, nó cho phân phối xác suất trên actions:

$$
\pi(a \mid s) = P(a \text{ được chọn tại state } s)
$$

Đọc công thức này theo nghĩa đời thường: policy là thói quen hành động của agent. Khi nhìn thấy tình huống này, agent có xu hướng làm gì?

Trong LLM, policy có thể chính là language model. Tại mỗi bước decode, model nhận context và tạo phân phối xác suất trên vocabulary. Nếu mở rộng sang agent, policy có thể chọn giữa nhiều loại action: trả lời trực tiếp, gọi tool, truy xuất tài liệu, hỏi lại người dùng, hoặc escalate cho human.

## Value là khả năng đánh giá tương lai

Value function trả lời một câu hỏi khác: state này tốt đến mức nào nếu tiếp tục hành động theo policy hiện tại?

State-value function:

$$
V^\pi(s) = \mathbb{E}_\pi[G_t \mid s_t = s]
$$

Đọc công thức này theo nghĩa đời thường: nếu bây giờ tôi đang ở state $s$, và từ đây trở đi tôi hành động theo policy $\pi$, tôi kỳ vọng tổng reward tương lai là bao nhiêu?

Action-value function, thường gọi là Q function:

$$
Q^\pi(s, a) = \mathbb{E}_\pi[G_t \mid s_t = s, a_t = a]
$$

Công thức này hỏi cụ thể hơn: nếu ở state $s$ tôi chọn action $a$ ngay bây giờ, rồi sau đó tiếp tục theo policy $\pi$, tổng reward tương lai kỳ vọng là bao nhiêu?

Với LLM agent, value function có thể được hiểu như một critic đánh giá triển vọng của một trace. Ví dụ, sau khi agent chọn đọc một file nhất định, critic có thể ước lượng bước đó có đưa task tới thành công không. Trong RLHF, reward model và value model có vai trò khác nhau, nhưng cùng chia sẻ một ý tưởng: không phải mọi đánh giá đều là action trực tiếp, có những module học cách chấm điểm tương lai hoặc kết quả.

## Model là khả năng mô phỏng thế giới

Model trong RL không phải language model theo nghĩa LLM, mà là model của environment. Nó dự đoán nếu agent chọn action $a$ ở state $s$, state tiếp theo và reward sẽ là gì:

$$
\hat{P}(s' \mid s, a), \quad \hat{R}(s, a, s')
$$

Nếu có model tốt, agent có thể lập kế hoạch bằng cách tưởng tượng các tương lai có thể xảy ra. Con người làm điều này liên tục. Trước khi gửi email, ta tưởng tượng người nhận sẽ phản ứng ra sao. Trước khi sửa một module lớn, ta tưởng tượng test nào có thể fail.

Trong LLM agent, model-based thinking xuất hiện dưới nhiều dạng: simulator, world model, tool result prediction, self-evaluation, planning, tree search hoặc rollout nội bộ. Khi một agent viết plan trước khi code, nó đang dùng một dạng mô phỏng trừu tượng về thế giới phần mềm.

## Ba hướng học khác nhau thế nào?

Ta có thể tóm tắt như sau:

| Hướng | Câu hỏi chính | Ví dụ gần LLM |
|---|---|---|
| Policy-based | Nên làm gì? | Model sinh token hoặc chọn tool |
| Value-based | Tình huống hoặc action này đáng giá bao nhiêu? | Critic chấm triển vọng của response hoặc trace |
| Model-based | Nếu làm vậy, thế giới sẽ thay đổi ra sao? | Agent dự đoán tool output, test result hoặc phản ứng người dùng |

Một hệ thống mạnh thường kết hợp cả ba. LLM policy sinh hành động. Evaluator hoặc critic ước lượng chất lượng. Planning module hoặc simulator giúp thử nhiều khả năng trước khi hành động thật.

## Nhầm lẫn phổ biến

Nhầm lẫn đầu tiên là nghĩ policy luôn phải deterministic. Với LLM, stochasticity rất quan trọng. Nếu model luôn chọn token xác suất cao nhất, nó có thể trở nên cứng nhắc, thiếu exploration và kém đa dạng. Nhưng nếu sampling quá tự do, chất lượng và an toàn giảm. Điều chỉnh temperature, top-p và reranking thực chất là điều chỉnh cách policy khám phá action space.

Nhầm lẫn thứ hai là nghĩ value function chỉ cần cho game. Trong LLM system, ta luôn cần đánh giá trung gian. Response này có khả năng được người dùng thích không? Tool call này có đáng chi phí không? Trace này có đi đúng hướng không? Những câu hỏi đó đều là tư duy value.

Nhầm lẫn thứ ba là nghĩ model-based RL quá xa LLM. Thực ra LLM rất mạnh ở việc mô phỏng ngôn ngữ, ý định, API usage và kế hoạch. Vấn đề là mô phỏng đó có thể sai. Vì vậy, khi dùng LLM làm planner hoặc simulator, ta cần kiểm chứng bằng tool, test và external feedback.

## Tóm tắt

Policy quyết định cách agent hành động. Value đánh giá state hoặc action theo lợi ích tương lai. Model dự đoán environment sẽ phản ứng ra sao. Ba khái niệm này là xương sống của RL, và cũng là cách ta phân tích nhiều hệ thống LLM hiện đại: model sinh hành động, evaluator chấm chất lượng, planner tưởng tượng tương lai, và feedback loop cải thiện hành vi.
