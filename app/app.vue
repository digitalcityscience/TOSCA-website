<script setup lang="ts">
import { en, de } from '@nuxt/ui/locale'
const { locale, t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
useHead({ htmlAttrs: { lang: locale } })
const githubUrl = 'https://github.com/digitalcityscience/TOSCA-2'
const links = [{ key: 'home', path: '/' }, { key: 'projects', path: '/projects' }, { key: 'about', path: '/about' }, { key: 'docs', path: '/docs' }]
</script>
<template>
  <UApp :locale="locale === 'de' ? de : en">
    <a href="#main" class="skip-link">{{ t('skip') }}</a>
    <header class="site-header shell">
      <NuxtLink :to="localePath('/')" class="wordmark" :aria-label="t('homeLabel')"><span class="brand-mark">✳</span> TOSCA<span class="brand-dot">.</span></NuxtLink>
      <nav class="desktop-nav" :aria-label="t('mainNav')"><NuxtLink v-for="link in links" :key="link.key" :to="localePath(link.path)">{{ t(link.key) }}</NuxtLink></nav>
      <div class="header-actions"><UButton :to="githubUrl" target="_blank" rel="noopener noreferrer" icon="i-lucide-github" color="neutral" variant="ghost" :aria-label="t('github')" :title="t('github')" /><UColorModeButton /><NuxtLink :to="switchLocalePath(locale === 'en' ? 'de' : 'en')" class="language-link" :lang="locale === 'en' ? 'de' : 'en'">{{ locale === 'en' ? 'DE' : 'EN' }} <UIcon name="i-lucide-globe" /></NuxtLink><UButton class="mobile-toggle" color="neutral" variant="ghost" icon="i-lucide-menu" :aria-label="t('menu')" :aria-expanded="open" @click="open = !open" /></div>
    </header>
    <nav v-if="open" class="mobile-nav shell"><NuxtLink v-for="link in links" :key="link.key" :to="localePath(link.path)">{{ t(link.key) }}</NuxtLink></nav>
    <main id="main"><NuxtPage /></main>
    <footer class="site-footer shell"><div><NuxtLink :to="localePath('/')" class="wordmark">✳ TOSCA.</NuxtLink><p>{{ t('footer') }}</p><small>{{ t('footerNote') }}</small></div><div class="footer-links"><a :href="githubUrl" target="_blank" rel="noopener noreferrer" class="github-link"><UIcon name="i-lucide-github" /> {{ t('github') }}</a><NuxtLink :to="localePath('/about')">{{ t('about') }}</NuxtLink><NuxtLink :to="localePath('/contact')">{{ t('contact') }}</NuxtLink><NuxtLink :to="localePath('/docs')">{{ t('docs') }}</NuxtLink></div><span class="footer-credit">DIGITAL CITY SCIENCE<br>HAFENCITY UNIVERSITY HAMBURG</span></footer>
  </UApp>
</template>
