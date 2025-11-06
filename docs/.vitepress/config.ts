import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'TokiForge',
  description: 'Modern Design Token & Theme Engine',
  base: '/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#7C3AED' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/core' },
      { text: 'Examples', link: '/examples/react' },
      { text: 'CLI', link: '/cli/overview' },
      { text: 'GitHub', link: 'https://github.com/tokiforge/tokiforge' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Core Concepts', link: '/guide/core-concepts' },
            { text: 'Framework Support', link: '/guide/framework-support' },
          ],
        },
        {
          text: 'Frameworks',
          items: [
            { text: 'React', link: '/guide/react' },
            { text: 'Vue', link: '/guide/vue' },
            { text: 'Svelte', link: '/guide/svelte' },
            { text: 'Any Framework', link: '/guide/framework-support' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Design Tokens', link: '/guide/design-tokens' },
            { text: 'Custom Exporters', link: '/guide/custom-exporters' },
            { text: 'Performance', link: '/guide/performance' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Core API',
          items: [
            { text: 'Core Package', link: '/api/core' },
            { text: 'TokenParser', link: '/api/token-parser' },
            { text: 'TokenExporter', link: '/api/token-exporter' },
            { text: 'ThemeRuntime', link: '/api/theme-runtime' },
          ],
        },
        {
          text: 'Framework APIs',
          items: [
            { text: 'React', link: '/api/react' },
            { text: 'Vue', link: '/api/vue' },
            { text: 'Svelte', link: '/api/svelte' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'React Example', link: '/examples/react' },
            { text: 'Vue Example', link: '/examples/vue' },
            { text: 'Svelte Example', link: '/examples/svelte' },
            { text: 'CLI Usage', link: '/examples/cli' },
          ],
        },
      ],
      '/cli/': [
        {
          text: 'CLI Documentation',
          items: [
            { text: 'Overview', link: '/cli/overview' },
            { text: 'Commands', link: '/cli/commands' },
            { text: 'Configuration', link: '/cli/configuration' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tokiforge/tokiforge' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 TokiForge Community',
    },

    search: {
      provider: 'local',
    },
  },
});

