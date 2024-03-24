import { inject } from 'regexparam';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';
import { apiClient } from '../../../lib/api/apiClient';

type FooterApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ type: string }, GetFooterTextResponse];
}>;

export type GetFooterTextResponse = {
  content: string;
};

export const footerApiClient: FooterApiClient = {
  fetch: async (params) => {
    const response = await apiClient.get<GetFooterTextResponse>(inject('/api/v1/footer/:type', params));

    return response.data;
  },
  fetch$$key: (options) => ({
    requestUrl: '/api/v1/footer/:type',
    ...options,
  }),
};
