export interface PageRef {
  loc: string;
  lastmod: string | null;
}

export interface PageContent {
  url: string;
  finalUrl: string;
  statusCode: number;
  contentType: string | null;
  lastModified: string | null;
  etag: string | null;
  html: string;
}

export interface ListPagesParams {
  sitemapUrl: string;
  modifiedAfter?: string;
  includePathPrefixes?: string[];
  excludePathPrefixes?: string[];
}

export interface PageSource {
  listPages(params: ListPagesParams): Promise<PageRef[]>;
  getPageContent(url: string): Promise<PageContent>;
}

export interface ParsedSitemap {
  sitemaps: string[];
  pages: PageRef[];
}
