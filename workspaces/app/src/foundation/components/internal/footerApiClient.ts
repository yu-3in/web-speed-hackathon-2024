import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type FooterApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ type: string }, GetFooterTextResponse];
}>;

export type GetFooterTextResponse = {
  content: string;
};

const API_URL = process.env['API_URL'] || '/';

export const footerApiClient: FooterApiClient = {
  fetch: async ({ type }) => {
    const response = await fetch(`${API_URL}assets/contents/${type}.txt`);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const content = await response.text();

    return { content };
  },
  fetch$$key: (options) => ({
    requestUrl: `/assets/contents/${options.type}.txt`,
    ...options,
  }),
};
