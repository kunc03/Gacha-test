const useFetchApi = (method: any, url: string, opts = {}) => {
  const config = useRuntimeConfig()

  const TOKEN = useCookie('TOKEN')
  const USER = useCookie('USER')
  return $fetch(url, {
    ...opts,
    method,
    baseURL: config.public.API_URL as string,
    async onRequest({ request, options }) {
      if (TOKEN.value && USER.value) {
        options.headers = { Authorization: `Bearer ${TOKEN.value}` }
      }
    },
    onRequestError({ request, options, error }) {
      return Promise.reject(error)
    },
    async onResponse({ request, response, options }): Promise<any> {
      return response
    },
    async onResponseError({ request, response, options }) {
      if (response?.status === 401) {
        localStorage.clear()
        TOKEN.value = null
        USER.value = null
        await navigateTo('/')
      }
      return Promise.reject(response)
    },
  })
}

export default useFetchApi
