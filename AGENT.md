# AGENT.md

## 1. Project overview

This repository is a Vietnamese Docusaurus curriculum for Reinforcement Learning. It is written for readers who already work with NLP, LLMs, retrieval systems, agents, evaluation pipelines, applied ML products, or AI systems in production.

The goal is not only to define RL terms. The goal is to help readers understand why RL exists, what problem it solves, where the math comes from, why algorithms are unstable, and how RL ideas transfer into RLHF, RLAIF, DPO, PPO, reward models, preference optimization, tool-using agents, recommendation loops, and production feedback systems.

This file is the operating manual for future agents. Treat it as the stable source of truth for writing quality, repository safety, verification, privacy, and completion criteria.

## 2. Repository map

- `docs/`: public Vietnamese curriculum chapters.
- `docs/resources/`: public syllabus, glossary, learning paths, references, checklists, and other student-facing resources.
- `src/`: Docusaurus landing page and styling.
- `static/`: public static assets and `robots.txt`.
- `scripts/`: local QA and automation scripts.
- `.github/workflows/`: CI and GitHub Pages deployment workflow.
- `huggingface-deep-rl-class/`: local reference clone of the Hugging Face Deep RL Class. Use it as topic map and inspiration only. Do not copy prose into `docs/`.
- `README.md`: must remain empty.

## 3. Curriculum-wide content standard

These standards apply to this repository and should be reused for future Vietnamese curriculum repositories.

Public content must be educational, neutral, technically rigorous, and written for learners. Do not expose private task instructions, local absolute paths, credentials, internal notes, hidden constraints, or agent coordination details in public docs.

A curriculum chapter is not a quick note. It should teach. It should anticipate confusion. It should make the reader feel that the concept was introduced because a real problem forced it to exist.

Use `Phần` for course sections. Do not use older section terminology. Do not use em dash characters. Use commas, colons, semicolons, or parentheses instead.

## 4. Pedagogical writing style

Write like an excellent Vietnamese university lecturer who deeply understands both the theory and the target reader's practical world. The prose must be natural, serious, precise, patient, and pedagogical. It must not sound like a slide bullet dump, marketing article, literal translation, or terse developer note.

Use Vietnamese as the main language. Use English technical terms when they are standard or more precise: policy, value function, return, reward model, rollout, advantage, KL penalty, credit assignment, on-policy, off-policy, actor-critic, PPO, DPO, offline RL, Decision Transformer. Explain a term before relying on it heavily.

Avoid slang, jokes, playful phrasing, memes, flippant remarks, and overly casual language. The tone should be friendly through clarity and patience, not through entertainment.

For every important concept, prefer this teaching flow:

1. Start from a concrete tension or question.
2. Build intuition with a small example.
3. Formalize with notation or terminology.
4. Explain the algorithmic consequence.
5. Connect to NLP, LLM, agents, or production AI systems.
6. Point out common misconceptions.
7. End with a short summary of what the reader should retain.

A strong chapter should answer the questions an intelligent reader will ask next:

- Why do we need this object?
- What breaks if we remove it?
- What is the simplest example where it matters?
- How does it relate to supervised learning?
- What changes when the policy is a neural network?
- What changes when the action is a token, response, tool call, or routing decision?
- What makes the method unstable in practice?
- What should an engineer monitor in production?

## 5. Math, diagrams, and examples

Math is welcome, but it must be taught, not thrown at the reader.

- Introduce notation slowly.
- Explain what each symbol means in words.
- Use equations to compress an idea after intuition has been built.
- Never present an equation as if it explains itself.
- After each important equation, include a prose explanation such as: `Đọc công thức này theo nghĩa đời thường...` or `Điểm quan trọng của công thức không nằm ở ký hiệu, mà ở...`.

Diagrams are useful when they clarify dynamics, feedback loops, system boundaries, or algorithm flow. Prefer diagrams that show relationships and failure modes, not decorative diagrams.

Use examples close to the target reader:

- chatbot response quality
- retrieval and reranking
- multi-turn support agents
- code agents using tools
- summarization with human preference
- recommendation loops
- model routing and escalation to human
- cost, latency, safety, and reliability trade-offs
- agent traces and process evaluation

Classic RL examples such as GridWorld, FrozenLake, CartPole, Atari, robotics, and self-play are allowed, especially for labs and algorithm intuition. They should not dominate the course without being mapped back to NLP, LLM, or AI systems.

## 6. Source material and attribution policy

The Hugging Face Deep RL Class is a reference for topic coverage, beginner-friendly sequencing, labs, and practical orientation. It is not a text source to translate line by line.

Rules:

- Do not copy paragraphs from the reference.
- Do not mechanically translate reference prose.
- Do not reproduce images unless licensing and attribution are explicitly handled.
- You may reuse standard RL terminology, standard formulas, and standard algorithmic structure.
- Public chapters must be original Vietnamese teaching material with deeper NLP and LLM framing.
- If a future task requires public attribution or a references page, keep attribution factual and do not imply this curriculum is an official Hugging Face derivative unless that is explicitly intended.

For any external source, use it to understand the topic, then write from first principles in the voice of this course.

## 7. Public privacy and safety constraints

`README.md` must remain empty. Do not add whitespace, title, badges, deployment notes, or explanations to it.

Public docs must not mention:

- private user instructions
- hidden constraints
- the fact that the README is intentionally empty
- local absolute paths
- credentials, tokens, secrets, API keys, or private URLs
- agent memory contents
- internal planning files

Privacy controls must remain intact unless the user explicitly asks to change them:

- `static/robots.txt` must disallow all crawling.
- Docusaurus must include `noindex,nofollow,noarchive,nosnippet` metadata.
- Sitemap generation must stay disabled.

Do not deploy, rewrite git history, delete reference materials, mutate dependencies, or change privacy posture unless the user explicitly asks.

## 8. Commands and verification

Safe read-only or verification commands:

- `npm run qa:docs`: run documentation QA.
- `npm run typecheck`: run TypeScript typecheck.
- `npm run build`: build the Docusaurus site.
- `npm run verify`: run docs QA, typecheck, and build.
- `git status --short --branch`: inspect repository state.

Commands requiring explicit approval:

- publishing or deploying manually
- pushing to GitHub if not already requested
- changing repository visibility
- changing GitHub Pages settings
- rewriting git history
- deleting files or folders
- running dependency mutation commands such as audit fixes, major upgrades, or lockfile rewrites unrelated to the task

Deployment workflow:

- GitHub Pages deploy runs from `.github/workflows/deploy.yml`.
- The workflow uses `npm run verify` before uploading the Pages artifact.
- After a deploy-related change, check the workflow run and spot-check live URLs when practical.

## 9. Completion checklist

Before reporting completion, verify the relevant items:

- `README.md` is still 0 bytes.
- `npm run qa:docs` passes for documentation-only changes.
- `npm run verify` passes for structural, config, TypeScript, workflow, or site changes.
- No em dash characters appear in public or source text.
- No old section terminology appears in public or source text.
- Sidebar doc IDs exist.
- Absolute `/docs/...` links do not point to missing docs.
- Public docs read like original Vietnamese teaching material, not translated notes.
- If pushed, the commit author and committer are the intended identity.
- If deployed, GitHub Pages workflow succeeds and important live URLs return HTTP 200 with noindex metadata.
- If deploy privacy matters, `/sitemap.xml` should remain 404.

## 10. Repo specialization: RL Foundation

### Audience

Write for people who may already know machine learning, NLP, LLMs, retrieval, evaluation, agents, or production ML, but may not have a solid RL mental model.

Do not assume they are game AI researchers. When using game examples, explain the transfer to LLM systems.

### Learning promise

A reader should finish this curriculum able to explain:

- how RL differs from supervised learning
- why reward is not the same as a label
- why delayed reward creates credit assignment
- why Bellman equations matter
- why Q-learning, DQN, policy gradient, actor-critic, and PPO exist
- why deep RL is unstable
- why reward models can be exploited
- why DPO is useful but does not replace all RL
- why agent traces matter for LLM systems
- how to reason about RLHF, RLAIF, reward models, KL constraints, offline RL, and production feedback loops

### NLP and LLM mapping

When possible, translate classic RL ideas into LLM intuition:

- State can include prompt, conversation history, retrieved context, tool outputs, user profile, hidden system state, and safety constraints.
- Action can be a token, response, tool call, retrieval query, routing decision, clarification question, or stop decision.
- Reward can be human preference, evaluator score, task success, factuality score, safety score, cost reduction, latency reduction, or long-horizon user satisfaction.
- Trajectory can be a full response, conversation, support session, recommendation session, or agent trace.
- Credit assignment explains why a final bad answer does not immediately reveal which token, retrieval step, tool call, or reasoning branch caused the failure.

### Coverage map

Maintain the course as a coherent path:

- Phần 0: orientation and why RL matters for NLP and LLMs.
- Phần 1: agent, environment, reward, MDP, trajectory, return, policy, value, model.
- Phần 2: Bellman equation and value-based thinking.
- Phần 3: Monte Carlo, Temporal Difference, SARSA, Q-learning, exploration.
- Phần 4: DQN, replay buffer, target network, instability, reward hacking.
- Phần 5: policy gradient, baseline, advantage, actor-critic, PPO.
- Phần 6: RLHF, reward model, DPO, preference optimization, agent traces, credit assignment.
- Phần 7: multi-agent RL, self-play, curiosity, model-based RL, offline RL, Decision Transformers.
- Phần 8: labs, reward hacking, safety, production checklists.

### Misconceptions to actively prevent

- Reward is not a ground-truth label.
- A reward model is not truth. It is a learned proxy.
- Higher reward score does not always mean better product behavior.
- PPO does not fix a bad reward function.
- DPO is not a universal replacement for RL.
- A final answer alone is not enough to debug an agent.
- Exploration in production must be constrained.
- Multi-agent workflows do not automatically improve quality.
- Benchmarks and evaluators can be gamed.

## 11. Maintenance notes for future agents

Keep this file concise enough to be read, but specific enough to guide action. If it becomes too long, split public teaching guidance into a student-facing authoring guide and keep operational constraints here.

Update this file when:

- commands change
- directory structure changes
- privacy or deployment posture changes
- QA rules change
- agents repeatedly make the same mistake
- course scope expands in a stable way

Do not use this file as a task log. Use git history for history, issues or plans for task-specific work, and memory for cross-session context.
