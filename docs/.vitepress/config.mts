import { defineConfig, UserConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// Define user configuration.
const userConfig: UserConfig = {
  title: 'Secretium',
  titleTemplate: 'A smart self-hosted tool for sharing secrets ~ Secretium',
  description: 'A smart self-hosted tool for sharing secrets with your friends, colleagues or everyone.',
  lastUpdated: true,
  cleanUrls: true,
  mermaid: {
    theme: 'neutral'
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/'
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/'
    },
    zh_HK: {
      label: '简体中文',
      lang: 'zh_HK',
      link: '/zh_HK/'
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/'
    }
  },
  themeConfig: {
    siteTitle: 'Secretium',
    logo: '/secretium-logo.svg',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting started', link: '/getting-started' },
      { text: 'Complete user guide', link: '/complete-user-guide' },
      { text: '🎉 Get PRO', link: '/get-pro' },
      { text: 'FAQ', link: '/faq' },
      { text: 'Troubleshooting', link: '/troubleshooting' }
    ],
    sidebar: {
      '/getting-started': [
        {
          text: 'Introduction',
          collapsed: false,
          items: [
            { text: 'What is Secretium?', link: '/getting-started' },
            { text: 'How does it work?', link: '/getting-started/how-does-it-work' },
          ]
        },
        {
          text: 'Try it now',
          collapsed: false,
          items: [
            { text: 'Quick start guide', link: '/getting-started/quick-start-guide' },
          ]
        },
        {
          text: 'Development',
          collapsed: false,
          items: [
            { text: 'Release notes', link: '/getting-started/release-notes' },
            { text: 'Our team', link: '/getting-started/our-team' }
          ]
        }
      ],
      '/complete-user-guide': [
        {
          text: 'Introduction',
          collapsed: false,
          items: [
            { text: 'Before we begin', link: '/complete-user-guide' }
          ]
        },
        {
          text: 'Project under the hood',
          collapsed: false,
          items: [
            { text: 'Project structure', link: '/complete-user-guide/project-structure' },
            { text: 'Technologies used', link: '/complete-user-guide/technologies-used' }
          ]
        },
        {
          text: 'Installation',
          collapsed: false,
          items: [
            { text: 'Prepare server', link: '/complete-user-guide/prepare-your-server' },
            { text: 'Create files with sensitive data', link: '/complete-user-guide/create-files-with-sensitive-data' },
            { text: 'Run installation script', link: '/complete-user-guide/run-installation-script' },
            { text: 'Edit Docker Compose file', link: '/complete-user-guide/edit-docker-compose' },
            { text: 'Run container', link: '/complete-user-guide/run-container' }
          ]
        },
        {
          text: 'Configuration',
          collapsed: false,
          items: [
            { text: 'Default config', link: '/complete-user-guide/default-config' },
            { text: 'Secret key', link: '/complete-user-guide/configuration-secret-key' },
            { text: 'Admin credentials', link: '/complete-user-guide/configuration-admin-credentials' },
            { text: 'Domain', link: '/complete-user-guide/configuration-domain' },
            { text: 'Server', link: '/complete-user-guide/configuration-server' },
          ]
        },
        {
          text: 'Web/proxy server',
          collapsed: false,
          items: [
            { text: 'Nginx (manual installation)', link: '/complete-user-guide/nginx' },
            { text: 'Nginx Proxy Manager', link: '/complete-user-guide/nginx-proxy-manager' },
            { text: 'Traefik', link: '/complete-user-guide/traefik' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/secretium/secretium' },
      {
        icon: {
          svg: '<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m30.679 13.367c-.613-.404-1.366-.645-2.175-.645-.093 0-.185.003-.276.009l.012-.001c-.446.001-.882.041-1.306.115l.046-.007c-.235-1.357-1.025-2.495-2.122-3.191l-.019-.011-.429-.248-.282.408c-.336.512-.599 1.108-.756 1.745l-.008.039c-.089.324-.14.696-.14 1.08 0 .831.24 1.605.654 2.258l-.01-.017c-.637.299-1.381.488-2.164.524h-.013-19.729c-.516.001-.934.418-.936.933-.001.056-.001.123-.001.19 0 1.751.317 3.428.897 4.977l-.032-.098c.558 1.633 1.612 2.975 2.98 3.881l.028.017c1.744.903 3.808 1.432 5.995 1.432.207 0 .412-.005.617-.014l-.029.001h.06c1.272 0 2.515-.121 3.72-.352l-.123.02c1.795-.336 3.395-.939 4.845-1.773l-.074.039c1.257-.735 2.331-1.621 3.245-2.652l.012-.014c1.325-1.56 2.403-3.381 3.145-5.365l.041-.125h.276c.055.002.119.004.183.004 1.226 0 2.34-.481 3.163-1.265l-.002.002c.377-.358.676-.793.873-1.281l.009-.024.122-.359zm-26.889 1.482h2.646c.127-.001.23-.104.23-.231v-2.355-.001c0-.127-.103-.23-.23-.231h-2.646c-.127.001-.23.104-.23.231v2.356.001c0 .127.103.23.23.23h.001zm3.644 0h2.644c.127 0 .231-.103.231-.231v-2.355-.001c0-.127-.103-.23-.23-.231h-2.646c-.128 0-.232.104-.232.232v2.355c.001.128.104.231.232.231zm3.698 0h2.646c.127-.001.23-.104.23-.231v-2.355-.001c0-.127-.103-.23-.23-.231h-2.646c-.127.001-.23.104-.23.231v2.356c0 .127.103.231.231.231zm3.656 0h2.643c.128 0 .231-.103.232-.231v-2.355c0-.128-.104-.232-.232-.232h-2.643c-.127 0-.231.103-.231.231v2.356.001c0 .127.103.23.23.23zm-7.354-3.388h2.644c.128-.001.231-.104.231-.232v-2.355c0-.127-.103-.231-.231-.231h-2.644c-.128 0-.231.103-.232.231v2.355c.001.128.104.231.232.232zm3.698 0h2.646c.127-.001.23-.105.23-.232v-2.355c0-.127-.103-.231-.231-.231h-2.643c-.127 0-.231.103-.231.231v2.355c.001.128.103.231.231.232zm3.656 0h2.643c.128-.001.231-.104.232-.232v-2.355c-.001-.128-.104-.231-.232-.231h-2.643c-.127 0-.231.103-.231.231v2.355c0 .128.103.231.231.232zm0-3.388h2.643c.128 0 .232-.104.232-.232v-2.356c-.001-.128-.104-.231-.232-.231h-2.643c-.127 0-.231.103-.231.231v2.356.001c0 .127.103.23.23.23h.001zm3.687 6.776h2.644c.128 0 .231-.103.232-.231v-2.355c0-.128-.104-.232-.232-.232h-2.644c-.128 0-.231.103-.231.231v2.356c0 .127.103.231.231.231z"/></svg>'
        },
        link: 'https://hub.docker.com/repository/docker/secretium/secretium',
        ariaLabel: 'docker hub'
      }
    ],
    footer: {
      message: "<a href='https://github.com/secretium' target='_blank'>Secretium</a> is 100% free and Open Source project under the Apache 2.0 license.",
      copyright: "Copyright © 2023-present <a href='https://github.com/koddr' target='_blank'>Vic Shóstak</a> and the <a href='https://github.com/secretium' target='_blank'>True Web Artisans team</a>.",
    },
    editLink: {
      pattern: 'https://github.com/secretium/docs/edit/main/docs/:path'
    },
  }
}

export default withMermaid(defineConfig(userConfig))
