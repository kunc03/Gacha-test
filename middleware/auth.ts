export default defineNuxtRouteMiddleware(() => {
  //to do replace with proper condition
  if (process.client) {
    const userId = sessionStorage.getItem('user_id')
    if (!userId) {
      // Jika user_id tidak ada, arahkan ke halaman index
      return navigateTo({ name: 'index' })
    }
  }
})
