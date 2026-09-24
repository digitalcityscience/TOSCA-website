<script setup lang="ts">
import type { Project } from '~/data/projects'
defineProps<{ project: Project, compact?: boolean }>()
const { t } = useI18n()
const { localize, location } = useProjectContent()
const localePath = useLocalePath()
</script>
<template>
  <NuxtLink :to="localePath('/projects/' + project.slug)" class="project-card" :class="[{ compact }, project.category]">
    <div class="card-top"><span class="eyebrow">{{ project.name }}</span><UIcon name="i-lucide-arrow-up-right" /></div>
    <h3>{{ localize(project.title) }}</h3>
    <p v-if="!compact">{{ localize(project.description) }}</p>
    <div class="card-bottom"><span>{{ location(project.location) }} · {{ project.year }}</span><UBadge color="neutral" variant="subtle" size="sm">{{ t(project.category) }}</UBadge></div>
  </NuxtLink>
</template>
