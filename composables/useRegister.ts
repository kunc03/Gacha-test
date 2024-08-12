const useRegister = defineStore('useRegister', () => {
  const sourceFrom = ref<string>('')

  const setSourceFrom = (value: string) => {
    console.log(value)
    sourceFrom.value = value
  }

  const isSpin = computed(() => {
    return sourceFrom.value === 'spin'
  })

  return {
    isSpin,
    setSourceFrom,
  }
})

export default useRegister
