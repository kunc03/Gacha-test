const useFetchApi = (method: any, url: string, opts = {}) => {
  const config = useRuntimeConfig()

  return $fetch(url, {
    ...opts,
    method,
    baseURL: config.public.API_URL as string,
    async onRequest({ request, options }) {
      const TOKEN = sessionStorage.getItem('TOKEN')
      const USER = sessionStorage.getItem('USER')

      if (TOKEN && USER) {
        options.headers = { Authorization: `Bearer ${TOKEN}` }
      }
    },
    onRequestError({ request, options, error }) {
      return Promise.reject(error)
    },
    async onResponse({ request, response, options }): Promise<any> {
      return response
    },
    async onResponseError({ request, response, options }) {
      return Promise.reject(response)
    },
  })
}

export default useFetchApi
