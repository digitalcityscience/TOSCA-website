<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const features = [
  { key: 'Gis', icon: 'i-lucide-map', upcoming: false },
  { key: 'Story', icon: 'i-lucide-book-open', upcoming: false },
  { key: 'Event', icon: 'i-lucide-calendar-days', upcoming: false },
  { key: 'Feedback', icon: 'i-lucide-messages-square', upcoming: false },
  { key: '3d', icon: 'i-lucide-box', upcoming: true },
  { key: 'Simulation', icon: 'i-lucide-workflow', upcoming: true }
]
useSeoMeta({ title: () => t('about'), description: () => t('aboutText') })
</script>
<template>
  <div class="shell page prose-page">
    <p class="eyebrow">{{ t('about') }}</p>
    <h1>{{ t('aboutTitle') }}</h1>
    <p class="page-lead">{{ t('aboutText') }}</p>
    <p class="page-lead">{{ t('aboutSecond') }}</p>
    <p class="page-lead">{{ t('platformStory') }}</p>
    <section class="features-section" aria-labelledby="features-heading">
      <h2 id="features-heading">{{ t('featuresHeading') }}</h2>
      <p class="page-lead">{{ t('featuresIntro') }}</p>
      <div class="features-grid">
        <article v-for="feature in features" :key="feature.key" class="feature-card">
          <div class="feature-heading"><UIcon :name="feature.icon" class="size-7" /><UBadge v-if="feature.upcoming" variant="subtle">{{ t('upcoming') }}</UBadge></div>
          <h3>{{ t(`feature${feature.key}Title`) }}</h3>
          <p>{{ t(`feature${feature.key}Text`) }}</p>
        </article>
      </div>
    </section>
    <UButton :to="localePath('/projects')" trailing-icon="i-lucide-arrow-right">{{ t('explore') }}</UButton>
  </div>
</template>
