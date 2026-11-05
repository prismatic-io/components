import { input } from "@prismatic-io/spectral";
import {
  cleanHttpsUrl,
  cleanOptionalDateTime,
  cleanOptionalHttpsUrl,
  cleanStringList,
} from "../utils/clean";
import { connection } from "./common";

export const sitemapUrl = input({
  label: "Sitemap URL",
  placeholder: "Enter sitemap URL",
  type: "string",
  required: true,
  comments:
    "The https:// URL of the site's sitemap or sitemap index. Child sitemaps on the same host are followed.",
  example: "https://www.example.com/sitemap.xml",
  clean: cleanHttpsUrl,
});

const modifiedAfter = input({
  label: "Modified After",
  placeholder: "Enter date-time (ISO 8601)",
  type: "string",
  required: false,
  comments:
    "Only return pages whose sitemap lastmod is after this ISO 8601 date-time. Pages without a lastmod are excluded when set.",
  example: "2026-01-01T00:00:00Z",
  clean: cleanOptionalDateTime,
});

const includePathPrefixes = input({
  label: "Include Path Prefixes",
  placeholder: "Enter path prefix",
  type: "string",
  collection: "valuelist",
  required: false,
  default: [],
  comments: "Only return pages whose URL path starts with one of these prefixes.",
  example: "/en/adventures",
  clean: cleanStringList,
});

const excludePathPrefixes = input({
  label: "Exclude Path Prefixes",
  placeholder: "Enter path prefix",
  type: "string",
  collection: "valuelist",
  required: false,
  default: [],
  comments: "Leave out pages whose URL path starts with one of these prefixes.",
  example: "/en/legal",
  clean: cleanStringList,
});

const pageUrl = input({
  label: "Page URL",
  placeholder: "Enter page URL",
  type: "string",
  required: true,
  dataSource: "selectSitemapPage",
  comments: "The https:// URL of the published page to fetch.",
  example: "https://www.example.com/en/adventures/surf-camp.html",
  clean: cleanHttpsUrl,
});

export const listSitemapUrlsInputs = {
  connection,
  sitemapUrl,
  modifiedAfter,
  includePathPrefixes,
  excludePathPrefixes,
};

export const getPublishedPageHtmlInputs = {
  connection,
  sitemapUrl: input({
    ...sitemapUrl,
    required: false,
    clean: cleanOptionalHttpsUrl,
    comments:
      "The https:// URL of the site's sitemap or sitemap index. Used only to populate the Page URL dropdown; this action does not send it.",
  }),
  pageUrl,
};
