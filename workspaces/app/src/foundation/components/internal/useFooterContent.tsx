import useSWR from 'swr';

import { footerApiClient } from './footerApiClient';

export function useFooterContent(...[options]: Parameters<typeof footerApiClient.fetch>) {
  return useSWR(footerApiClient.fetch$$key(options), footerApiClient.fetch, { suspense: true });
}
