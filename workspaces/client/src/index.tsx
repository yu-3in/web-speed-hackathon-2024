import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

// import { preloadImages } from './utils/preloadImages';
import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  registerServiceWorker();
  // await preloadImages();

  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  if (window.location.pathname.startsWith('/admin')) {
    const { AdminApp } = await import('@wsh-2024/admin/src/index');
    ReactDOM.createRoot(rootElement).render(<AdminApp />);
  } else {
    const { ClientApp } = await import('@wsh-2024/app/src/index');
    ReactDOM.hydrateRoot(
      rootElement,
      <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
        <BrowserRouter>
          <ClientApp />
        </BrowserRouter>
      </SWRConfig>,
    );
  }
};

main().catch(console.error);
