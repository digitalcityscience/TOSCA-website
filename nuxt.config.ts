export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  ui: { fonts: false },
  icon: {
    provider: 'none',
    clientBundle: { scan: true, icons: ['lucide:sun', 'lucide:moon', 'lucide:globe', 'lucide:arrow-up-right', 'lucide:arrow-down', 'lucide:arrow-right', 'lucide:menu', 'lucide:sprout', 'lucide:map', 'lucide:users', 'lucide:waypoints', 'lucide:book-open', 'lucide:code-xml', 'lucide:building-2', 'lucide:search'] }
  },
  colorMode: { preference: 'system', fallback: 'light' },
  i18n: {
    defaultLocale: 'en', strategy: 'prefix_except_default', detectBrowserLanguage: false,
    locales: [{ code: 'en', language: 'en', name: 'English', file: 'en.json' }, { code: 'de', language: 'de', name: 'Deutsch', file: 'de.json' }]
  },
  nitro: { prerender: { crawlLinks: true, failOnError: true, routes: ['/', '/de'] } },
  app: { head: { titleTemplate: '%s · TOSCA', meta: [{ name: 'theme-color', content: '#234d40' }] } },
  devtools: { enabled: false }
})
