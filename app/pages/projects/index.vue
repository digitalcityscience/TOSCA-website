<script setup lang="ts">
import { projects } from '~/data/projects'
const { t } = useI18n()
const { localize, location } = useProjectContent()
const category = ref('all')
const search = ref('')
const filtered = computed(() => projects.filter(p => (category.value === 'all' || p.category === category.value) && `${p.name} ${location(p.location)} ${localize(p.title)} ${localize(p.description)}`.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())))
useSeoMeta({ title: () => t('projects'), description: () => t('journeyIntro') })
</script>
<template><div class="shell page"><p class="eyebrow">TOSCA / {{ t('projects') }}</p><h1>{{ t('projects') }}</h1><p class="page-lead">{{ t('journeyIntro') }}</p><div class="filters"><div class="filter-buttons"><UButton v-for="key in ['all','core','contributor','ongoing']" :key="key" :variant="category === key ? 'solid' : 'ghost'" :aria-pressed="category === key" @click="category = key">{{ t(key) }}</UButton></div><UInput v-model="search" icon="i-lucide-search" :placeholder="t('search')" :aria-label="t('search')" /></div><p class="result-count" aria-live="polite">{{ t('results', filtered.length) }}</p><div class="project-grid"><ProjectCard v-for="project in filtered" :key="project.slug" :project="project" /></div><p v-if="!filtered.length" role="status">{{ t('empty') }}</p></div></template>
