import type { PageRef, ParsedSitemap } from "../types";
import { toIsoDate } from "./dates";

const XML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
};

const decodeXml = (value: string): string =>
  value
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1")
    .replace(
      /&(amp|lt|gt|quot|apos);/g,
      (entity) => XML_ENTITIES[entity] ?? entity,
    )
    .trim();

const readTag = (block: string, tag: string): string | null => {
  const match = block.match(
    new RegExp(`<(?:\\w+:)?${tag}[^>]*>([\\s\\S]*?)</(?:\\w+:)?${tag}>`),
  );
  return match ? decodeXml(match[1]) : null;
};

const readBlocks = (xml: string, tag: string): string[] =>
  xml.match(
    new RegExp(`<(?:\\w+:)?${tag}[\\s>][\\s\\S]*?</(?:\\w+:)?${tag}>`, "g"),
  ) ?? [];

export const parseSitemap = (xml: string): ParsedSitemap => {
  const toIsoOrNull = (value: string | null): string | null => {
    if (value === null || value === "") return null;
    try {
      return toIsoDate(value).toISOString();
    } catch {
      return null;
    }
  };
  return {
    sitemaps: readBlocks(xml, "sitemap")
      .map((block) => readTag(block, "loc"))
      .filter((loc): loc is string => loc !== null && loc !== ""),
    pages: readBlocks(xml, "url")
      .map((block) => ({
        loc: readTag(block, "loc"),
        lastmod: toIsoOrNull(readTag(block, "lastmod")),
      }))
      .filter((page): page is PageRef => page.loc !== null && page.loc !== ""),
  };
};

export const filterPages = (
  pages: PageRef[],
  {
    modifiedAfter,
    includePathPrefixes = [],
    excludePathPrefixes = [],
  }: {
    modifiedAfter?: string;
    includePathPrefixes?: string[];
    excludePathPrefixes?: string[];
  },
): PageRef[] =>
  pages.filter((page) => {
    let path: string;
    try {
      path = new URL(page.loc).pathname;
    } catch {
      return false;
    }
    if (
      includePathPrefixes.length &&
      !includePathPrefixes.some((prefix) => path.startsWith(prefix))
    )
      return false;
    if (excludePathPrefixes.some((prefix) => path.startsWith(prefix)))
      return false;
    if (!modifiedAfter) return true;
    return (
      page.lastmod !== null &&
      toIsoDate(page.lastmod) > toIsoDate(modifiedAfter)
    );
  });
