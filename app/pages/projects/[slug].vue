<script setup lang="ts">
import { projects } from '~/data/projects'
const route = useRoute()
const project = projects.find(p => p.slug === route.params.slug)
if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found' })
const { t } = useI18n()
const { localize, location } = useProjectContent()
const localePath = useLocalePath()
useSeoMeta({ title: () => project.name, description: () => localize(project.description) })
</script>
<template><article v-if="project" class="shell page project-detail"><NuxtLink class="back-link" :to="localePath('/projects')">← {{ t('back') }}</NuxtLink><div class="detail-heading"><UBadge variant="subtle">{{ t(project.category) }}</UBadge><p class="eyebrow">{{ project.name }}</p><h1>{{ localize(project.title) }}</h1></div><div class="detail-layout"><div><h2>{{ t('context') }}</h2><p class="page-lead">{{ localize(project.description) }}</p><UAlert v-if="project.slug === 'tosca-ecu-1' || project.slug === 'kaba'" color="warning" variant="subtle" :description="t(project.slug === 'kaba' ? 'statusNote' : 'dateNote')" class="my-8" /><h2>{{ t('partners') }}</h2><ul class="partner-list"><li v-for="partner in project.partners" :key="partner"><UIcon name="i-lucide-building-2" /> {{ partner }}</li></ul><p class="source-note">{{ t('sourceNote') }}</p></div><aside class="facts"><dl><dt>{{ t('place') }}</dt><dd>{{ location(project.location) }}</dd><dt>{{ t('period') }}</dt><dd>{{ project.period }}</dd><dt>{{ t('role') }}</dt><dd>{{ t(project.category) }}</dd></dl></aside></div></article></template>
