export default defineNuxtRouteMiddleware(() => {
  //to do replace with proper condition
  if (process.client) {
    const TOKEN = sessionStorage.getItem('TOKEN')
    if (!TOKEN) {
      return navigateTo({ name: 'index' })
    }
  }
})
