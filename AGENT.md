# AGENT.md

## Project overview

This repository is a Vietnamese Reinforcement Learning curriculum for readers who already work with NLP, LLMs, retrieval systems, agents, evaluation pipelines, or applied ML products. The course takes inspiration from the Hugging Face Deep RL Class stored locally in `huggingface-deep-rl-class/`, but public course chapters must be original explanations, not translated copies.

The learning goal is not only to define RL terms. The learning goal is to make readers understand why RL exists, what problem it solves, where the math comes from, why algorithms are unstable, and how the ideas transfer into RLHF, RLAIF, preference optimization, tool-using agents, recommendation loops, and production LLM systems.

## Main directories

- `docs/`: Vietnamese public curriculum chapters.
- `docs/resources/`: glossary, syllabus, learning path, references and checklists.
- `src/`: Docusaurus landing page and styling.
- `static/`: public static assets and robots.txt.
- `scripts/`: local QA scripts.
- `huggingface-deep-rl-class/`: local reference clone of Hugging Face Deep RL Class. Use as source inspiration and topic map only. Do not copy prose into `docs/`.

## STYLING_WRITING STYLE

### Core writing promise

Write like an excellent Vietnamese university lecturer who deeply understands both RL theory and modern NLP/LLM systems. The prose must be natural, serious, precise, patient and pedagogical. It must not sound like a quick note, a slide bullet dump, a marketing article, or a literal translation from English.

A chapter should help the reader feel: "I can see why this concept was invented, what problem it solves, how it behaves in small examples, and why it matters for my LLM work."

### Voice

- Use Vietnamese as the main language.
- Use English technical terms when they are standard in the field: policy, value function, return, reward model, rollout, advantage, KL penalty, credit assignment, off-policy, on-policy, actor-critic, PPO, DPO.
- Do not force awkward Vietnamese translations if the English term is more recognizable.
- Explain terms before using them heavily.
- Avoid slang, jokes, playful phrasing, flippant remarks, memes or overly casual language.
- Avoid robotic listing. A list is allowed only after the concept has been explained in prose.
- Do not use em dash characters. Use commas, colons or parentheses instead.

### Pedagogical structure

For every important concept, prefer this flow:

1. Start from a concrete tension or question.
2. Build intuition with a small example.
3. Formalize with notation.
4. Connect to algorithmic consequences.
5. Connect to NLP, LLM or AI system practice.
6. Point out common misconceptions.
7. End with a short summary of what the reader should retain.

Example structure:

- Motivation: why supervised learning is not enough when the quality signal arrives after a sequence of actions.
- Intuition: compare an agent writing a multi-step answer to a player navigating a maze.
- Formalization: state, action, reward, trajectory, return.
- Algorithmic consequence: sparse delayed reward creates credit assignment.
- LLM connection: RLHF evaluates a completed answer, not each token independently.
- Misconception: reward is not the same as ground-truth label.
- Retain: RL is about optimizing behavior under feedback from interaction.

### Depth expectations

Do not write shallow definitions. A strong chapter should answer the questions an intelligent reader will ask next:

- Why do we need this object?
- What breaks if we remove it?
- What is the simplest example where it matters?
- How does it relate to supervised learning?
- What changes when the policy is a neural network?
- What changes when the action is a token or a tool call?
- What makes the method unstable in practice?
- What should an engineer monitor in production?

### NLP and LLM orientation

When possible, translate classic RL ideas into LLM intuition:

- State can be an environment observation, but for LLM systems it can also include prompt, conversation history, retrieved context, tool outputs and hidden system state.
- Action can be a move in a game, but also a token, a sequence of tokens, a tool call, a retrieval query, or a routing decision.
- Reward can be game score, human preference, evaluator score, task success, cost reduction, safety score or long-horizon user satisfaction.
- Trajectory can be an episode in a simulator, but also a full user session or an agent trace.
- Credit assignment explains why a final bad answer does not immediately tell us which token, retrieval step, reasoning branch or tool call caused the failure.

### Math style

Math is welcome, but it must be taught, not thrown at the reader.

- Introduce notation slowly.
- Explain what each symbol means in words.
- Use equations to compress an idea after intuition has been built.
- Never present an equation as if it explains itself.
- After each important equation, include a paragraph beginning with a phrase like: "Đọc công thức này theo nghĩa đời thường..." or "Điểm quan trọng của công thức không nằm ở ký hiệu, mà ở..."

### Examples

Use examples that are close to the target reader:

- chatbot response quality
- retrieval and reranking
- multi-turn support agent
- code agent using tools
- summarization with human preference
- recommendation loops
- cost, latency and safety trade-offs
- model routing and escalation to human

Classic examples such as CartPole, Atari, FrozenLake and robotics are allowed, especially when mapping to Hugging Face labs, but should not dominate the course.

### Relationship to Hugging Face reference

The Hugging Face Deep RL Class is a reference for topic coverage, beginner-friendly sequencing and hands-on orientation. It is not a text source to translate line by line.

Rules:

- Do not copy paragraphs from the reference.
- Do not mechanically translate their prose.
- Do not reproduce images unless licensing and attribution are explicitly handled.
- You may reuse standard RL terminology and standard algorithmic structure.
- Public chapters should be written as an original Vietnamese course with deeper NLP/LLM framing.

### Public content constraints

- `README.md` must remain empty.
- Do not mention private user instructions in public docs.
- Do not mention that README is intentionally empty in public docs.
- Do not expose credentials, tokens, local absolute paths or private notes.
- Do not use em dash characters.
- Prefer `Phần` for course sections, not the older section wording.

## Commands

- `npm run qa:docs`: run local documentation QA.
- `npm run typecheck`: run TypeScript typecheck after dependencies are installed.
- `npm run build`: build Docusaurus site after dependencies are installed.
- `npm run verify`: run docs QA, typecheck and build.

## Safety boundaries

- Do not add content to `README.md`.
- Do not delete `huggingface-deep-rl-class/` unless explicitly asked.
- Do not copy Hugging Face prose into public docs.
- Do not publish or deploy unless explicitly asked.
- Do not rewrite git history unless explicitly asked.

## Completion checklist

Before reporting completion:

- `README.md` is still 0 bytes.
- `npm run qa:docs` passes.
- No em dash characters appear in public/source text.
- No old section terminology remains in public/source text.
- Sidebar doc IDs exist.
- Public docs read like original Vietnamese teaching material, not translated notes.
