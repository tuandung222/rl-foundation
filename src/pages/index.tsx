import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const parts = [
  ['00', 'Định hướng', 'Vì sao RL quan trọng với người làm NLP, LLM và agentic systems.', '/docs/00-orientation/01-overview'],
  ['01', 'Mental Model của RL', 'Agent, environment, reward, return, policy, value và credit assignment.', '/docs/01-rl-mental-model/01-agent-environment-reward'],
  ['02', 'Bellman và Value', 'Tư duy quy hoạch động phía sau value function, Q function và bootstrap.', '/docs/02-bellman-value-methods/01-bellman-equation'],
  ['03', 'Learning from Experience', 'Monte Carlo, Temporal Difference, SARSA, Q-learning và exploration.', '/docs/03-learning-from-experience/01-overview'],
  ['04', 'Deep Q-Learning', 'Từ Q-table tới DQN, replay buffer, target network và failure modes.', '/docs/04-deep-q-learning/01-from-q-table-to-dqn'],
  ['05', 'Policy Gradient', 'REINFORCE, baseline, advantage, actor-critic và PPO.', '/docs/05-policy-gradient-actor-critic/01-policy-gradient'],
  ['06', 'RL cho LLM', 'RLHF, reward model, DPO, preference optimization và agent traces.', '/docs/06-rl-for-llm/01-why-rl-matters-for-llm'],
  ['07', 'Advanced Topics', 'Multi-agent, self-play, curiosity, model-based RL, offline RL và Decision Transformers.', '/docs/07-advanced-topics/01-multi-agent-self-play'],
  ['08', 'Labs và Production', 'Roadmap thực hành, reward hacking, safety, evaluation và checklist production.', '/docs/08-labs-production/01-lab-roadmap'],
  ['09', 'Research Math Foundations', 'Bellman operators, convergence, stochastic approximation, PPO, DPO, offline RL và giới hạn sequence modeling.', '/docs/09-research-math-foundations/01-bellman-operators-and-convergence'],
];

function HomepageHeader(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <Heading as="h1" className={styles.heroTitle}>{siteConfig.title}</Heading>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.heroButtons}>
          <Link className={`button button--primary button--lg ${styles.heroButton}`} to="/docs/intro">Bắt đầu học</Link>
          <Link className={`button button--secondary button--lg ${styles.heroButton}`} to="/docs/resources/syllabus">Xem syllabus</Link>
        </div>
      </div>
    </header>
  );
}

function PartGrid(): ReactNode {
  return (
    <section className={styles.gridSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Mười phần bài giảng RL cho NLP và LLM</Heading>
        <p className={styles.sectionSubtitle}>
          Lộ trình đi từ trực giác nền tảng tới Q-learning, DQN, policy gradient, PPO, RLHF, DPO, offline RL, production feedback loops và nền tảng toán học cho research.
        </p>
        <div className={styles.grid}>
          {parts.map(([number, title, description, to]) => (
            <Link key={number} to={to} className={styles.card}>
              <div className={styles.cardNumber}>PHẦN {number}</div>
              <Heading as="h3" className={styles.cardTitle}>{title}</Heading>
              <p className={styles.cardDescription}>{description}</p>
              <span className={styles.badgeReady}>Đọc phần này</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection(): ReactNode {
  return (
    <section className={styles.philosophy}>
      <div className="container">
        <blockquote className={styles.quote}>
          <p><em>Reinforcement Learning bắt đầu khi ta không chỉ dự đoán nhãn đúng, mà phải chọn hành động trong một chuỗi quyết định, nhận phản hồi muộn, rồi học cách cải thiện hành vi.</em></p>
        </blockquote>
        <p className={styles.philosophyText}>
          Với người làm LLM, RL không nên được nhìn như một chủ đề game xa lạ. Nó là ngôn ngữ để nói về preference, reward model, rollout, tool use, multi-turn interaction, evaluation và tối ưu hành vi dưới ràng buộc an toàn, chi phí và trải nghiệm người dùng.
        </p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline as string}>
      <HomepageHeader />
      <main>
        <PartGrid />
        <PhilosophySection />
      </main>
    </Layout>
  );
}
