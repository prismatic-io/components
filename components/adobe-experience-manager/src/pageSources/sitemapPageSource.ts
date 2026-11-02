import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_SITEMAPS } from "../constants";
import type {
  ListPagesParams,
  PageContent,
  PageRef,
  PageSource,
} from "../types";
import { filterPages, parseSitemap } from "../utils/sitemap";

const headerOrNull = (
  headers: Record<string, unknown>,
  name: string,
): string | null => {
  const value = headers[name];
  return typeof value === "string" ? value : null;
};

export const createSitemapPageSource = (client: HttpClient): PageSource => ({
  async listPages(params: ListPagesParams): Promise<PageRef[]> {
    const rootHost = new URL(params.sitemapUrl).host;
    const queue = [params.sitemapUrl];
    const visited = new Set<string>();
    const pages: PageRef[] = [];
    while (queue.length && visited.size < MAX_SITEMAPS) {
      const url = queue.shift() as string;
      if (visited.has(url)) continue;
      visited.add(url);
      const { data } = await client.get<string>(url);
      const parsed = parseSitemap(util.types.toString(data));
      queue.push(
        ...parsed.sitemaps.filter((child) => {
          try {
            const childUrl = new URL(child);
            return childUrl.protocol === "https:" && childUrl.host === rootHost;
          } catch {
            return false;
          }
        }),
      );
      pages.push(...parsed.pages);
    }
    return filterPages(pages, params);
  },

  async getPageContent(url: string): Promise<PageContent> {
    const response = await client.get<string>(url);
    const headers = response.headers as Record<string, unknown>;
    const finalUrl =
      (response.request as { res?: { responseUrl?: string } } | undefined)?.res
        ?.responseUrl ?? url;
    return {
      url,
      finalUrl,
      statusCode: response.status,
      contentType: headerOrNull(headers, "content-type"),
      lastModified: headerOrNull(headers, "last-modified"),
      etag: headerOrNull(headers, "etag"),
      html: util.types.toString(response.data),
    };
  },
});
