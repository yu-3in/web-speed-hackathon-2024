export async function registerServiceWorker() {
  await navigator.serviceWorker
    .register('/serviceworker.mjs', { updateViaCache: 'none' })
    .then(() => navigator.serviceWorker.ready);
}
