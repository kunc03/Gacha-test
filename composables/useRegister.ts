const useRegister = defineStore('useRegister', () => {
  const sourceFrom = ref<string>('')

  const setSourceFrom = (value) => {
    sourceFrom.value = value
  }

  const isTop = computed(() => {
    return sourceFrom.value === 'top'
  })

  return {
    isTop,
    setSourceFrom,
  }
})

export default useRegister
