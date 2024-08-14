export default defineNuxtRouteMiddleware(() => {
  //to do replace with proper condition
  if (process.client) {
    const TOKEN = localStorage.getItem('TOKEN')
    if (!TOKEN) {
      return navigateTo({ name: 'index' })
    }
  }
})
