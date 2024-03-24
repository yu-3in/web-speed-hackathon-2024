export async function registerServiceWorker() {
  await navigator.serviceWorker
    .register('/serviceworker.mjs', { type: 'module', updateViaCache: 'none' })
    .then(() => navigator.serviceWorker.ready);
}
