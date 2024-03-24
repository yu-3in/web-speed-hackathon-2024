export async function registerServiceWorker() {
  await navigator.serviceWorker
    .register('/serviceworker.js', { updateViaCache: 'none' })
    .then(() => navigator.serviceWorker.ready);
}
