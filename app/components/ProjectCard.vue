<script setup lang="ts">
import type { Project } from '~/data/projects'
import { platforms } from '~/data/platforms'
const props = defineProps<{ project: Project, compact?: boolean }>()
const { t } = useI18n()
const { localize, location } = useProjectContent()
const localePath = useLocalePath()
const platformUrl = computed(() => platforms[props.project.slug])
</script>
<template>
  <div class="project-card-wrap">
    <NuxtLink :to="localePath('/projects/' + project.slug)" class="project-card" :class="[{ compact }, project.category]">
      <div class="card-top"><span class="eyebrow">{{ project.name }}</span><UIcon name="i-lucide-arrow-up-right" /></div>
      <h3>{{ localize(project.title) }}</h3>
      <p v-if="!compact">{{ localize(project.description) }}</p>
      <div class="card-bottom"><span>{{ location(project.location) }} · {{ project.year }}</span><UBadge color="neutral" variant="subtle" size="sm">{{ t(project.category) }}</UBadge></div>
    </NuxtLink>
    <a v-if="platformUrl" :href="platformUrl" class="platform-link" target="_blank" rel="noopener noreferrer"><span>{{ t('platformLive') }}</span><UIcon name="i-lucide-external-link" /></a>
  </div>
</template>
