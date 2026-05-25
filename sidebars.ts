import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  lectureSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Phần 0: Định hướng',
      link: {type: 'doc', id: '00-orientation/01-overview'},
      collapsed: false,
      items: [
        '00-orientation/01-overview',
      ],
    },
    {
      type: 'category',
      label: 'Phần 1: Mental Model của RL',
      link: {type: 'doc', id: '01-rl-mental-model/01-agent-environment-reward'},
      collapsed: false,
      items: [
        '01-rl-mental-model/01-agent-environment-reward',
        '01-rl-mental-model/02-mdp-return-discount',
        '01-rl-mental-model/03-policy-value-model',
      ],
    },
    {
      type: 'category',
      label: 'Phần 2: Bellman và Value-based Methods',
      link: {type: 'doc', id: '02-bellman-value-methods/01-bellman-equation'},
      collapsed: false,
      items: [
        '02-bellman-value-methods/01-bellman-equation',
      ],
    },
    {
      type: 'category',
      label: 'Phần 3: Learning from Experience',
      link: {type: 'doc', id: '03-learning-from-experience/01-overview'},
      collapsed: false,
      items: [
        '03-learning-from-experience/01-overview',
        '03-learning-from-experience/02-monte-carlo-vs-td',
        '03-learning-from-experience/03-q-learning-sarsa-exploration',
      ],
    },
    {
      type: 'category',
      label: 'Phần 4: Deep Q-Learning',
      link: {type: 'doc', id: '04-deep-q-learning/01-from-q-table-to-dqn'},
      collapsed: false,
      items: [
        '04-deep-q-learning/01-from-q-table-to-dqn',
        '04-deep-q-learning/02-replay-buffer-target-network',
        '04-deep-q-learning/03-dqn-failure-modes',
      ],
    },
    {
      type: 'category',
      label: 'Phần 5: Policy Gradient và Actor-Critic',
      link: {type: 'doc', id: '05-policy-gradient-actor-critic/01-policy-gradient'},
      collapsed: false,
      items: [
        '05-policy-gradient-actor-critic/01-policy-gradient',
        '05-policy-gradient-actor-critic/02-advantage-actor-critic',
        '05-policy-gradient-actor-critic/03-ppo-intuition',
      ],
    },
    {
      type: 'category',
      label: 'Phần 6: RL cho NLP và LLM',
      link: {type: 'doc', id: '06-rl-for-llm/01-why-rl-matters-for-llm'},
      collapsed: false,
      items: [
        '06-rl-for-llm/01-why-rl-matters-for-llm',
        '06-rl-for-llm/02-reward-model-rlhf',
        '06-rl-for-llm/03-dpo-and-preference-optimization',
        '06-rl-for-llm/04-agent-traces-credit-assignment',
      ],
    },
    {
      type: 'category',
      label: 'Phần 7: Advanced Topics',
      link: {type: 'doc', id: '07-advanced-topics/01-multi-agent-self-play'},
      collapsed: false,
      items: [
        '07-advanced-topics/01-multi-agent-self-play',
        '07-advanced-topics/02-curiosity-and-exploration',
        '07-advanced-topics/03-model-based-offline-decision-transformers',
      ],
    },
    {
      type: 'category',
      label: 'Phần 8: Labs và Production',
      link: {type: 'doc', id: '08-labs-production/01-lab-roadmap'},
      collapsed: false,
      items: [
        '08-labs-production/01-lab-roadmap',
        '08-labs-production/02-reward-hacking-and-safety',
        '08-labs-production/03-production-rl-checklist',
      ],
    },
    {
      type: 'category',
      label: 'Phần 9: Research Mathematical Foundations',
      link: {type: 'doc', id: '09-research-math-foundations/01-bellman-operators-and-convergence'},
      collapsed: false,
      items: [
        '09-research-math-foundations/01-bellman-operators-and-convergence',
        '09-research-math-foundations/02-td-control-and-function-approximation',
        '09-research-math-foundations/03-policy-gradient-ppo-dpo',
        '09-research-math-foundations/04-offline-rl-and-sequence-modeling',
      ],
    },
    {
      type: 'category',
      label: 'Tài nguyên',
      collapsed: true,
      items: [
        'resources/syllabus',
        'resources/glossary',
      ],
    },
  ],
};

export default sidebars;
