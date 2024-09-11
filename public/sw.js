// Tentukan nama cache dan file yang ingin di-cache
const CACHE_NAME = 'gacharary-v1'
const urlsToCache = [
  '/logo-icon.ico',
  '/video/spin-point.mp4',
  '/video/spin-character.mp4',
  '/images/gacha2.webp',
  '/images/bg-red2.webp',
  '/images/sparkling.webp',
  '/images/bg-green.webp',
  '/images/logo.webp',
  '/images/warning.svg',
  '/images/close.svg',
  '/images/export.svg',
  '/images/intl-icon.svg',
  '/images/back-button.svg',
]

self.addEventListener('install', function (event) {
  self.skipWaiting()
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache')
        return cache.addAll(urlsToCache).then(() => {
          console.log('Add all cache')
        })
      })
      .catch((error) => {
        console.error('Failed to cache:', error)
      })
  )
})

self.addEventListener('activate', function (event) {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .catch((error) => {
        console.error('Failed to clean up old caches:', error)
      })
  )

  return self.clients.claim()
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          return response
        }

        return fetch(event.request)
          .then(function (networkResponse) {
            return networkResponse
          })
          .catch((error) => {
            console.error('Fetch failed:', error)
          })
      })
      .catch((error) => {
        console.error('Cache match failed:', error)
      })
  )
})
