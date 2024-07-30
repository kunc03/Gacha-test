const useFetchApi = (method: any, url: string, opts = {}) => {
  const config = useRuntimeConfig()

  return $fetch(url, {
    ...opts,
    method,
    baseURL: config.public.API_URL as string,
    async onRequest({ request, options }) {
      // You can add any additional headers or logic here if needed
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
