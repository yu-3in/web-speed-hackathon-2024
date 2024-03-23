export async function registerServiceWorker() {
  await navigator.serviceWorker
    .register('/serviceworker.global.js', { updateViaCache: 'none' })
    .then(() => navigator.serviceWorker.ready);
}
