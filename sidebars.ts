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
      label: 'Phần 6: RL cho NLP và LLM',
      link: {type: 'doc', id: '06-rl-for-llm/01-why-rl-matters-for-llm'},
      collapsed: false,
      items: [
        '06-rl-for-llm/01-why-rl-matters-for-llm',
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
