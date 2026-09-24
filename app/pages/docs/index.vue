<script setup lang="ts">
import manifest from '~/data/api-versions.json'
const versions = manifest as { version: string, commit: string, href: string }[]
const { t } = useI18n()
const localePath = useLocalePath()
useSeoMeta({ title: () => t('docs'), description: () => t('learnIntro') })
</script>
<template><div class="shell page"><p class="eyebrow">TOSCA / {{ t('docs') }}</p><h1>{{ t('learn') }}</h1><p class="page-lead">{{ t('learnIntro') }}</p><div class="docs-tiles"><section class="docs-tile"><UIcon name="i-lucide-book-open" class="size-8" /><h2>{{ t('guides') }}</h2><p>{{ t('learnIntro') }}</p><UButton :to="localePath('/docs/getting-started')" trailing-icon="i-lucide-arrow-right">{{ t('start') }}</UButton></section><section class="docs-tile"><UIcon name="i-lucide-code-xml" class="size-8" /><h2>{{ t('api') }}</h2><p v-if="!versions.length">{{ t('apiNote') }}</p><ul v-else><li v-for="version in versions" :key="version.version"><a :href="version.href" class="underline">{{ version.version }} · {{ version.commit.slice(0, 7) }}</a></li></ul><UButton :to="localePath('/docs/documentation-pipeline')" variant="outline" trailing-icon="i-lucide-arrow-right">{{ t('integration') }}</UButton></section></div></div></template>
