<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const slug = computed(() => (Array.isArray(route.params.slug) ? route.params.slug.filter(Boolean).join('/') : route.params.slug || '').replace(/\/+$/, ''))
const { data: page } = await useAsyncData(() => `doc-${locale.value}-${slug.value}`, () => queryCollection(locale.value === 'de' ? 'de' : 'en').path(`/docs/${slug.value}`).first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Document not found' })
useSeoMeta({ title: () => page.value?.title, description: () => page.value?.description })
</script>
<template><div class="shell page docs-layout"><nav class="docs-nav" :aria-label="t('docs')"><NuxtLink :to="localePath('/docs')">{{ t('docs') }}</NuxtLink><NuxtLink :to="localePath('/docs/getting-started')">{{ t('start') }}</NuxtLink><NuxtLink :to="localePath('/docs/documentation-pipeline')">{{ t('integration') }}</NuxtLink></nav><article class="docs-content"><ContentRenderer v-if="page" :value="page" /></article></div></template>
