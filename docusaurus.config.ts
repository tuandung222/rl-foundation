import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'Reinforcement Learning Foundation',
  tagline: 'Giáo trình nền tảng Reinforcement Learning bằng tiếng Việt cho người làm NLP, LLM và AI systems',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
    faster: true,
  },

  url: 'https://tuandung222.github.io',
  baseUrl: '/rl-foundation/',
  organizationName: 'tuandung222',
  projectName: 'rl-foundation',
  trailingSlash: false,
  onBrokenLinks: 'warn',

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'noindex,nofollow,noarchive,nosnippet',
      },
    },
  ],

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
    localeConfigs: {
      vi: {label: 'Tiếng Việt', htmlLang: 'vi-VN'},
    },
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/tuandung222/rl-foundation/edit/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: false,
          numberPrefixParser: false,
        },
        blog: false,
        sitemap: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'vi'],
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    navbar: {
      title: 'RL Foundation',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'lectureSidebar',
          position: 'left',
          label: 'Bài giảng',
        },
        {
          to: '/docs/06-rl-for-llm/01-why-rl-matters-for-llm',
          label: 'RL cho LLM',
          position: 'left',
        },
        {
          to: '/docs/resources/glossary',
          label: 'Thuật ngữ',
          position: 'left',
        },
        {
          href: 'https://github.com/tuandung222/rl-foundation',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Lộ trình',
          items: [
            {label: 'Tổng quan', to: '/docs/intro'},
            {label: 'Q-learning', to: '/docs/03-learning-from-experience/03-q-learning-sarsa-exploration'},
            {label: 'DQN', to: '/docs/04-deep-q-learning/01-from-q-table-to-dqn'},
            {label: 'PPO', to: '/docs/05-policy-gradient-actor-critic/03-ppo-intuition'},
            {label: 'RL cho LLM', to: '/docs/06-rl-for-llm/01-why-rl-matters-for-llm'},
            {label: 'Production', to: '/docs/08-labs-production/03-production-rl-checklist'},
            {label: 'Research Math', to: '/docs/09-research-math-foundations/01-bellman-operators-and-convergence'},
          ],
        },
        {
          title: 'Tài nguyên',
          items: [
            {label: 'Syllabus', to: '/docs/resources/syllabus'},
            {label: 'Glossary', to: '/docs/resources/glossary'},
          ],
        },
      ],
      copyright: `Bản quyền © ${new Date().getFullYear()} Reinforcement Learning Foundation. Nội dung đang được biên soạn.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'json', 'typescript', 'yaml', 'python', 'markdown'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
