// register service worker if the device supports it
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceworker.js')
    .then(function(registration) {
      console.log('Service worker registration succeeded:', registration)
    })
    .catch(function(error) {
      console.error('Service worker registration failed:', error)
    })
} else {
  console.log('This device does not support service workers!')
}

window.addEventListener('beforeinstallprompt', e => {
  deferredPrompt = e

  document.querySelector('#pwainstall').addEventListener('click', function(e) {
    deferredPrompt.prompt()

    // wait for the user response
    deferredPrompt.userChoice.then(function(choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        console.log('User has installed the app')
      } else {
        console.log('User dismissed the installation')
      }
      deferredPrompt = null
    })
  })
})
