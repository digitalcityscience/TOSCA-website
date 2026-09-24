export function useProjectContent() {
  const { locale } = useI18n()
  const language = computed(() => locale.value === 'de' ? 'de' : 'en')
  const localize = (value: { en: string, de: string }) => value[language.value]
  const location = (value: string) => language.value === 'de'
    ? value.replace('West Bank, Palestine', 'Westjordanland, Palästina').replace('Germany', 'Deutschland').replace('India', 'Indien')
    : value
  return { localize, language, location }
}
