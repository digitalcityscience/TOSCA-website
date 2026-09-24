import { defineCollection, defineContentConfig } from '@nuxt/content'
export default defineContentConfig({ collections: {
  en: defineCollection({ type: 'page', source: { include: 'en/**/*.md', prefix: '/docs' } }),
  de: defineCollection({ type: 'page', source: { include: 'de/**/*.md', prefix: '/docs' } })
} })
