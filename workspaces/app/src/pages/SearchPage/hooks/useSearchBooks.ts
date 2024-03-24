import useSWR from 'swr';

import { bookApiClient } from '../../../features/book/apiClient/bookApiClient';

export function useSearchBooks(...[options]: Parameters<typeof bookApiClient.search>) {
  return useSWR(bookApiClient.search$$key(options), bookApiClient.search, { suspense: true });
}
