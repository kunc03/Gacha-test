import { useRuntimeConfig } from '#app'

const useFetchApi = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  opts = {}
) => {
  const config = useRuntimeConfig()

  return $fetch(url, {
    ...opts,
    method,
    baseURL: config.public.API_URL as string,
    async onRequest({ request, options }) {
      const TOKEN = sessionStorage.getItem('TOKEN')
      const USER = sessionStorage.getItem('USER')

      if (TOKEN && USER) {
        options.headers = {
          ...(options.headers || {}),
          Authorization: `Bearer ${TOKEN}`,
        }
      }
    },
    onRequestError({ request, options, error }) {
      return Promise.reject(error)
    },
    async onResponse({ request, response, options }): Promise<any> {
      // Example: process response before returning it
      const data = await response.json()
      return data
    },
    async onResponseError({ request, response, options }) {
      // Handle the response error, maybe log it or show a notification
      console.error('API response error:', response)
      return Promise.reject(response)
    },
  })
}

export default useFetchApi
