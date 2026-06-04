import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";








export async function fetchGuruResults<T>(
  client: HttpClient,
  path: string,
  fetchAll: boolean,
  queryParams?: Record<string, unknown>,
): Promise<T[]> {
  const results: T[] = [];

  let url: string | undefined = path;

  do {
    const response = await client.get<T[]>(url, { params: queryParams });
    results.push(...(response.data || []));

    if (!fetchAll) {
      return results; 
    }

    const linkHeader = response.headers.link;
    const nextPageUrl = parseNextPageUrl(linkHeader);

    url = nextPageUrl ?? undefined;
  } while (url);

  return results;
}




function parseNextPageUrl(linkHeader?: string): string | null {
  if (!linkHeader) return null;

  const matches = linkHeader.match(/<([^>]+)>;\s*rel="next-page"/);
  return matches ? matches[1].trim() : null;
}
