import './setup';

import React, { Suspense } from 'react';

import { GlobalStyle } from './foundation/styles/GlobalStyle';
import { Router } from './routes';

const Dialog = React.lazy(() => import('./foundation/components/Dialog'));

export const ClientApp: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={null}>
        <Dialog />
      </Suspense>
      <Router />
    </>
  );
};
