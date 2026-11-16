<script setup lang="ts">
import { kinds, links, layers, edges, flows, integrations, type Part, type Msg } from '~/data/architecture'
const { t } = useI18n()
const { localize } = useProjectContent()
const parts = new Map<string, Part & { layer: number }>(layers.flatMap((l, i) => l.groups.flatMap(g => g.parts.map(p => [p.id, { ...p, layer: i }] as const))))
const kindLabel = Object.fromEntries(kinds.map(k => [k.kind, k.label]))
const selectedId = ref<string | null>(null)
const selected = computed(() => selectedId.value ? parts.get(selectedId.value) : undefined)
// Neighbours of the selected card, grouped by layer in page order.
const connects = computed(() => {
  const id = selectedId.value
  const ids = id ? edges.filter(e => e.includes(id)).map(([a, b]) => a === id ? b : a) : []
  return layers.map((l, i) => ({ title: l.title, ids: [...parts.values()].filter(p => p.layer === i && ids.includes(p.id)).map(p => p.id) })).filter(g => g.ids.length)
})
const linked = computed(() => new Set(connects.value.flatMap(g => g.ids)))
// Row 1 holds the actor names, so message k sits on row k + 2 and spans the columns between sender and receiver.
const seqPlace = (m: Msg, k: number) => ({ gridRow: k + 2, gridColumn: `${Math.min(m.from, m.to) + 1} / ${Math.max(m.from, m.to) + 2}`, '--span': Math.abs(m.from - m.to) + 1 })
const flow = ref(0)
const panel = ref<HTMLElement>()
function select(id: string) {
  selectedId.value = id
  nextTick(() => panel.value?.focus({ preventScroll: true }))
}
const state = (id: string) => id === selectedId.value ? 'is-active' : linked.value.has(id) ? 'is-linked' : ''
useSeoMeta({ title: () => t('architecture'), description: () => t('archLead') })
</script>
<template>
  <div class="shell page">
    <p class="eyebrow">TOSCA / {{ t('architecture') }}</p>
    <h1>{{ t('archTitle') }}</h1>
    <p class="page-lead">{{ t('archLead') }}</p>
    <div class="arch-links"><UButton v-for="link in links" :key="link.url" :to="link.url" target="_blank" rel="noopener noreferrer" variant="outline" size="sm" trailing-icon="i-lucide-arrow-up-right">{{ link.label }}</UButton></div>

    <div class="arch-explorer" @keydown.esc="selectedId = null">
      <div class="arch-main">
        <ul class="arch-legend" :aria-label="t('archLegend')"><li v-for="k in kinds" :key="k.kind"><i :class="`kind-${k.kind}`" />{{ localize(k.label) }}</li><li class="arch-hint"><UIcon name="i-lucide-mouse-pointer-click" />{{ t('archHint') }}</li></ul>

        <section class="arch-stack" aria-labelledby="layers-heading">
          <h2 id="layers-heading" class="sr-only">{{ t('archLayers') }}</h2>
          <article v-for="(layer, i) in layers" :key="i" class="arch-layer">
            <div class="arch-layer-head"><p class="eyebrow">0{{ i + 1 }}</p><h3>{{ localize(layer.title) }}</h3><p>{{ localize(layer.lead) }}</p></div>
            <div class="arch-layer-body">
              <div v-for="(group, g) in layer.groups" :key="g">
                <p v-if="group.title" class="arch-group-title">{{ localize(group.title) }}</p>
                <ul class="arch-parts">
                  <li v-for="part in group.parts" :key="part.id"><button type="button" :class="['arch-part', `kind-${part.kind}`, state(part.id)]" :aria-pressed="part.id === selectedId" @click="select(part.id)"><b>{{ part.name }}</b><span>{{ localize(part.note) }}</span></button></li>
                </ul>
              </div>
              <p v-if="layer.note" class="arch-note">{{ localize(layer.note) }}</p>
            </div>
          </article>
        </section>

        <section class="arch-section" aria-labelledby="flow-heading">
          <p class="eyebrow">{{ t('archFlowEyebrow') }}</p>
          <h2 id="flow-heading">{{ t('archFlowTitle') }}</h2>
          <p class="arch-section-lead">{{ t('archFlowLead') }}</p>
          <div class="filter-buttons"><UButton v-for="(f, i) in flows" :key="i" :variant="flow === i ? 'solid' : 'ghost'" :aria-pressed="flow === i" @click="flow = i">{{ localize(f.label) }}</UButton></div>
          <ul class="arch-lanes"><li><i class="lane-app" />{{ t('archLaneApp') }}</li><li><i class="lane-map" />{{ t('archLaneMap') }}</li></ul>
          <ol class="arch-steps" aria-live="polite">
            <li v-for="(step, i) in flows[flow]!.steps" :key="`${flow}-${i}`" :class="`lane-${step.lane}`">
              <span class="arch-step-no">{{ i + 1 }}</span>
              <div><button type="button" :class="['arch-step-name', `kind-${parts.get(step.id)!.kind}`, state(step.id)]" @click="select(step.id)">{{ parts.get(step.id)!.name }}</button><p>{{ localize(step.text) }}</p></div>
            </li>
          </ol>
          <p class="arch-note">{{ localize(flows[flow]!.takeaway) }}</p>
        </section>
      </div>

      <aside ref="panel" :class="['arch-panel', { open: selected }]" tabindex="-1" :aria-label="t('archPanel')" aria-live="polite">
        <template v-if="selected">
          <div class="arch-panel-top"><p class="eyebrow">{{ localize(layers[selected.layer]!.title) }} · {{ localize(kindLabel[selected.kind] ?? kindLabel.service!) }}</p><UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" :aria-label="t('archClose')" @click="selectedId = null" /></div>
          <h3 :class="`kind-${selected.kind}`">{{ selected.name }}</h3>
          <dl>
            <dt>{{ t('archWhat') }}</dt><dd>{{ localize(selected.what) }}</dd>
            <dt>{{ t('archRole') }}</dt><dd>{{ localize(selected.role) }}</dd>
            <dt>{{ t('archConnects') }}</dt>
            <dd v-for="group in connects" :key="group.title.en" class="arch-connects"><span>{{ localize(group.title) }}</span><button v-for="id in group.ids" :key="id" type="button" :class="`kind-${parts.get(id)!.kind}`" @click="select(id)">{{ parts.get(id)!.name }}</button></dd>
          </dl>
          <div v-if="selected.links?.length" class="arch-panel-links"><a v-for="link in selected.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }} <UIcon name="i-lucide-arrow-up-right" /></a></div>
        </template>
        <div v-else class="arch-panel-empty"><UIcon name="i-lucide-mouse-pointer-click" class="size-7" /><p>{{ t('archPanelEmpty') }}</p></div>
      </aside>
    </div>

    <section class="arch-section" aria-labelledby="integrations-heading">
      <div class="section-heading"><div><p class="eyebrow">{{ t('archIntEyebrow') }}</p><h2 id="integrations-heading">{{ t('archIntTitle') }}</h2></div><p>{{ t('archIntLead') }}</p></div>
      <ul class="seq-legend"><li><i class="seq-key" />{{ t('archSeqRequest') }}</li><li><i class="seq-key reply" />{{ t('archSeqReply') }}</li><li><i class="seq-key self" />{{ t('archSeqWork') }}</li></ul>
      <div class="arch-integrations">
        <details v-for="(item, i) in integrations" :key="i" class="arch-integration" name="integration" :open="i === 0">
          <summary><span class="eyebrow">0{{ i + 1 }}</span><span class="arch-int-copy"><strong>{{ localize(item.title) }}</strong><span>{{ localize(item.summary) }}</span></span><UBadge :color="item.poc ? 'warning' : 'neutral'" variant="subtle">{{ localize(item.status) }}</UBadge><UIcon name="i-lucide-plus" class="arch-toggle" /></summary>
          <div class="arch-int-body">
            <div v-for="(phase, p) in item.phases" :key="p" class="arch-phase">
              <div class="arch-phase-head"><span class="arch-step-no">{{ p + 1 }}</span><h3>{{ localize(phase.title) }}</h3><UBadge color="neutral" variant="outline" icon="i-lucide-repeat">{{ localize(phase.when) }}</UBadge></div>
              <div class="seq" role="list" :style="{ '--cols': phase.actors.length }">
                <div v-for="(actor, c) in phase.actors" :key="`a${c}`" :class="['seq-actor', `kind-${actor.kind}`]" :style="{ gridColumn: c + 1 }" aria-hidden="true">{{ actor.name }}</div>
                <div v-for="(actor, c) in phase.actors" :key="`l${c}`" class="seq-life" :style="{ gridColumn: c + 1, gridRow: `2 / span ${phase.msgs.length}` }" aria-hidden="true" />
                <div v-for="(m, k) in phase.msgs" :key="k" role="listitem" :class="['seq-msg', { reply: m.reply, self: m.from === m.to, back: m.from > m.to }]" :style="seqPlace(m, k)">
                  <span class="seq-route">{{ m.from === m.to ? phase.actors[m.from]!.name : `${phase.actors[m.from]!.name} ${m.reply ? '⇠' : '→'} ${phase.actors[m.to]!.name}` }}</span>
                  <span class="seq-label"><b>{{ k + 1 }}</b>{{ localize(m.text) }}</span>
                  <i v-if="m.from !== m.to" class="seq-line" aria-hidden="true" />
                </div>
              </div>
            </div>
            <p class="arch-note">{{ localize(item.point) }}</p>
            <p class="arch-guard"><UIcon name="i-lucide-shield-check" />{{ localize(item.guard) }}</p>
            <div class="arch-links"><UButton v-for="link in item.links" :key="link.url" :to="link.url" target="_blank" rel="noopener noreferrer" variant="link" size="sm" trailing-icon="i-lucide-arrow-up-right">{{ link.label }}</UButton></div>
          </div>
        </details>
      </div>
      <p class="source-note">{{ t('archDisclaimer') }}</p>
    </section>
  </div>
</template>
