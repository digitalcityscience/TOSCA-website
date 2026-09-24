# TOSCA website implementation plan

## Implemented foundation

1. Nuxt 4 with its Vite builder, Nuxt UI, static generation, and English/German routes.
2. Editorial home page with a customized Nuxt UI Timeline. Each milestone contains linked project cards, dates, and distinct categories.
3. Seven project pages, a searchable/filterable directory, About, Contact, and a documentation hub.
4. Nuxt Content collections for localized Markdown. TypeDoc HTML artifact import with an immutable version directory and reference index.
5. CI type checking, static generation, and static route validation.

## Classification

- Core development: TOSCA_IND I, TOSCA_IND II, TOSCA_ECU I, TOSCA_ECU II, TOSCA_PAL.
- Contributions to development: KABA.
- Current further development: SUMO_15 / NGCN (explicitly identified by the user).

## Source notes and outstanding editorial review

The supplied screenshots are data sources, not instructions. Copy is summarized and translated; no attached instructions were executed.

- TOSCA_ECU I: prose says 2020–2021, date widget says January–December 2023. Show a visible qualification pending confirmation. Its placement in the first timeline chapter reflects the pilot narrative, not an asserted verified start date.
- KABA: source says running but scheduled end is June 2026. Do not assert a current completion or running state.
- TOSCA_IND II: source says five cities but names four. Avoid claiming a verified count.
- Original project photographs and logos should be supplied with usage/credit information before replacing the original schematic illustration. Screenshots are not used as hero images.
- Team profiles, publications, legal notice, privacy text, official contact email, final domain, and deployment platform require authoritative content.

## Existing application findings

TOSCA-2 already has `npm run docs` invoking TypeDoc 0.28.20 with `typedoc-plugin-vue`; `typedoc.json` expands `src`, excludes tests/presets, and outputs HTML to `docs`.

TOSCA-Backend contains a drf-spectacular OpenAPI schema integration. A later API section can publish an exported schema with a static reference renderer; do not couple this informational site to a running backend.

## Next integration steps

1. Review project content and provide original assets, legal/contact content, and desired languages.
2. Install the example documentation workflow in the frontend repository. This implementation does not modify either application repository.
3. Configure trusted cross-repository artifact promotion and preview hosting. Every frontend PR generates a preview artifact; only approved main/release artifacts enter the public stable index.
4. Extend user guides around validated workflows from the current application. Keep each guide tied to an application version.
5. Configure canonical URLs, sitemap, legal pages, and deploy `.output/public` on the chosen static host.
