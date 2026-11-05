import { util } from "@prismatic-io/spectral";
import type { AemContentRecord, AssetSearchHit, ContentFragment } from "../types";

export const toPublishUrl = (
  publishBaseUrl: string | undefined,
  path: string | null,
): string | null => (publishBaseUrl && path ? `${publishBaseUrl}${path}` : null);

export const toContentFragmentRecord = (
  fragment: ContentFragment,
  scope: string,
  publishBaseUrl?: string,
): AemContentRecord => ({
  resourceType: "contentFragment",
  id: fragment.id,
  path: fragment.path ?? null,
  url: toPublishUrl(publishBaseUrl, fragment.path ?? null),
  title: fragment.title ?? null,
  tags: (fragment.tags ?? []).map((tag) => ({
    id: tag.id,
    title: tag.title ?? null,
    titlePath: tag.titlePath ?? null,
  })),
  created: fragment.created?.at ?? null,
  modified: fragment.modified?.at ?? null,
  published: fragment.published?.at ?? null,
  scope,
  data: fragment,
});

export const toAssetRecord = (
  hit: AssetSearchHit,
  scope: string,
  publishBaseUrl?: string,
): AemContentRecord => {
  const repo = hit.repositoryMetadata ?? {};
  const meta = hit.assetMetadata ?? {};
  const path = repo["repo:path"] ?? null;
  const keywords = Array.isArray(meta["xcm:keywords"]) ? meta["xcm:keywords"] : [];
  return {
    resourceType: "asset",
    id: hit.assetId,
    path,
    url: toPublishUrl(publishBaseUrl, path),
    title: typeof meta["dc:title"] === "string" ? meta["dc:title"] : (repo["repo:name"] ?? null),
    tags: keywords.map((keyword) => {
      const entry = keyword as { tagId?: string; value?: string };
      return {
        id: entry.tagId ?? entry.value ?? util.types.toString(keyword),
        title: entry.value ? (entry.value.split(/\s*[/:]\s*/).pop() ?? null) : null,
        titlePath: entry.value ?? null,
      };
    }),
    created: repo["repo:createDate"] ?? null,
    modified: repo["repo:modifyDate"] ?? null,
    published: repo["aem:published"] ?? null,
    scope,
    data: hit,
  };
};
