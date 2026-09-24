<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({ title: () => t('contact'), description: () => t('contactText') })
</script>
<template><div class="shell page prose-page"><p class="eyebrow">{{ t('contact') }}</p><h1>{{ t('contactTitle') }}</h1><p class="page-lead">{{ t('contactText') }}</p><UButton to="https://www.hcu-hamburg.de/" target="_blank" trailing-icon="i-lucide-arrow-up-right">{{ t('institution') }}</UButton></div></template>
