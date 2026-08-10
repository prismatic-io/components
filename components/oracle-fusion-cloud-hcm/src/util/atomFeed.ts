import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { XMLParser } from "fast-xml-parser";
import { ATOM_FEED_CONFIG } from "../constants";
import type { AtomFeedEntry } from "../types";
export const atomFeedModel = Object.entries(ATOM_FEED_CONFIG).map(
  ([value, { label }]) => ({
    label,
    value,
  }),
);
const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  isArray: (name) => name === "entry" || name === "Attribute",
});
export const fetchAtomEntries = async (
  client: HttpClient,
  feedName: string,
  since: string,
  pageSize: number,
): Promise<AtomFeedEntry[]> => {
  const { data: rawXml } = await client.get<string>(`/atomFeed/${feedName}`, {
    params: { "updated-min": since, "page-size": pageSize },
  });
  const parsed = xmlParser.parse(String(rawXml));
  const feed: Record<string, unknown> = parsed?.feed ?? {};
  const rawEntries: Record<string, unknown>[] =
    (feed.entry as Record<string, unknown>[]) ?? [];
  return rawEntries.map((entry) => {
    const contentWrapper = entry.content as Record<string, unknown> | undefined;
    const innerKey = Object.keys(contentWrapper ?? {}).find(
      (k) => !k.startsWith("@_"),
    );
    const innerContent =
      (innerKey
        ? (contentWrapper?.[innerKey] as Record<string, unknown>)
        : {}) ?? {};
    const rawAttrs = (innerContent.ChangedAttributes as Record<string, unknown>)
      ?.Attribute;
    const changedAttributes: string[] = Array.isArray(rawAttrs)
      ? rawAttrs.map(String)
      : rawAttrs
        ? [String(rawAttrs)]
        : [];
    return {
      id: String(entry.id ?? ""),
      feedName,
      updated: String(entry.updated ?? ""),
      published: String(entry.published ?? ""),
      changedAttributes,
      content: innerContent,
    };
  });
};
