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
  ['06', 'RL cho LLM', 'Từ RLHF, reward model, PPO tới preference optimization và agent traces.', '/docs/06-rl-for-llm/01-why-rl-matters-for-llm'],
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
          <Link className={`button button--secondary button--lg ${styles.heroButton}`} to="/docs/06-rl-for-llm/01-why-rl-matters-for-llm">RL cho LLM</Link>
        </div>
      </div>
    </header>
  );
}

function PartGrid(): ReactNode {
  return (
    <section className={styles.gridSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Giáo trình RL cho người làm NLP và LLM</Heading>
        <p className={styles.sectionSubtitle}>
          Lộ trình đi từ trực giác nền tảng tới RLHF và hệ thống LLM có hành động, được viết bằng tiếng Việt với trọng tâm là hiểu bản chất và áp dụng vào công việc.
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
