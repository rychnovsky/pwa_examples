var cacheName = 'pwa-example-01'
var filesToCache = ['/offline.html']

// wait in the install phase until all files are pre-cached
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache)
    }),
  )
})

// catch any error from fetch method and return offline file instead
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match('/offline.html')
    }),
  )
})
