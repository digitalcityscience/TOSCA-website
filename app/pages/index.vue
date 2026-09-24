<script setup lang="ts">
import { projects } from '~/data/projects'
const { t } = useI18n()
const localePath = useLocalePath()
useSeoMeta({ title: () => t('home'), description: () => t('intro') })
const milestones = computed(() => [
  { date: '2019', title: t('timeline1'), description: t('timeline1Text'), icon: 'i-lucide-sprout', ids: ['tosca-ind-1', 'tosca-ecu-1'] },
  { date: '2022', title: t('timeline2'), description: t('timeline2Text'), icon: 'i-lucide-map', ids: ['tosca-pal'] },
  { date: '2023', title: t('timeline3'), description: t('timeline3Text'), icon: 'i-lucide-cloud', ids: ['tosca-ind-2', 'tosca-ecu-2', 'kaba'] },
  { date: '2025 →', title: t('timeline4'), description: t('timeline4Text'), icon: 'i-lucide-waypoints', ids: ['sumo-ngcn'] }
])
</script>
<template>
  <div class="shell">
    <section class="hero"><div class="hero-copy"><p class="eyebrow">{{ t('eyebrow') }}</p><h1>{{ t('hero') }}</h1><p class="intro">{{ t('intro') }}</p><UButton :to="localePath('/projects')" trailing-icon="i-lucide-arrow-up-right" size="xl">{{ t('explore') }}</UButton><a href="#journey" class="story-link">{{ t('story') }} <UIcon name="i-lucide-arrow-down" /></a></div><CityIllustration /></section>
    <div class="context-strip"><span>DIGITAL CITY SCIENCE <b>×</b> HAFENCITY UNIVERSITY</span><span>2019 — {{ t('current') }}</span><span>{{ t('countries') }}</span></div>
    <section id="journey" class="journey-section"><div class="section-heading"><div><p class="eyebrow">01 / {{ t('story') }}</p><h2>{{ t('journey') }}</h2></div><p>{{ t('journeyIntro') }}</p></div>
      <UTimeline :items="milestones" :default-value="3" size="lg" :ui="{ wrapper: 'pb-14 pl-5', title: 'text-2xl mb-5 font-semibold', date: 'text-primary font-mono text-sm mb-2', indicator: 'rounded-full', separator: 'bg-accented' }">
        <template #description="{ item }"><p class="milestone-description">{{ item.description }}</p><div class="timeline-cards"><ProjectCard v-for="project in projects.filter(p => item.ids.includes(p.slug))" :key="project.slug" :project="project" compact /></div></template>
      </UTimeline>
    </section>
    <section class="next-chapter"><p class="eyebrow">{{ t('current') }} / SUMO_15</p><h2>{{ t('currentText') }}</h2><UButton :to="localePath('/projects/sumo-ngcn')" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right">{{ t('read') }}</UButton></section>
    <section class="docs-cta"><div><p class="eyebrow">02 / {{ t('docs') }}</p><h2>{{ t('learn') }}</h2><p>{{ t('learnIntro') }}</p></div><UButton :to="localePath('/docs')" variant="outline" trailing-icon="i-lucide-book-open">{{ t('viewDocs') }}</UButton></section>
  </div>
</template>
