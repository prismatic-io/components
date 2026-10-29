import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { XMLParser } from "fast-xml-parser";
import { ATOM_FEED_CONFIG } from "../constants";
import type {
  AtomFeedEntry,
  HcmAtomChangesObject,
  HcmAtomRecordChange,
} from "../types";

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

const parseAtomEntry = (
  entry: Record<string, unknown>,
  feedName: string,
): AtomFeedEntry => {
  const contentWrapper = entry.content as Record<string, unknown> | undefined;
  const innerKey = Object.keys(contentWrapper ?? {}).find(
    (k) => !k.startsWith("@_"),
  );
  const innerContent =
    (innerKey ? (contentWrapper?.[innerKey] as Record<string, unknown>) : {}) ??
    {};

  const rawAttrs = (innerContent.ChangedAttributes as Record<string, unknown>)
    ?.Attribute;
  const changedAttributes: string[] = Array.isArray(rawAttrs)
    ? rawAttrs.map((a) => util.types.toString(a))
    : rawAttrs
      ? [util.types.toString(rawAttrs)]
      : [];

  return {
    id: util.types.toString(entry.id),
    feedName,
    updated: util.types.toString(entry.updated),
    published: util.types.toString(entry.published),
    changedAttributes,
    content: innerContent,
  };
};

export const fetchAtomEntries = async (
  client: HttpClient,
  feedName: string,
  since: string,
  pageSize: number,
): Promise<AtomFeedEntry[]> => {
  const allEntries: AtomFeedEntry[] = [];
  let page = 1;

  let pageEntries: AtomFeedEntry[];
  do {
    const { data: rawXml } = await client.get<string>(`/atomFeed/${feedName}`, {
      params: {
        "updated-min": since,
        "page-size": pageSize,
        page,
        orderBy: "updated:asc",
      },
    });

    const parsed = xmlParser.parse(util.types.toString(rawXml));
    const feed: Record<string, unknown> = parsed?.feed ?? {};
    const rawEntries: Record<string, unknown>[] =
      (feed.entry as Record<string, unknown>[]) ?? [];

    pageEntries = rawEntries.map((entry) => parseAtomEntry(entry, feedName));
    allEntries.push(...pageEntries);
    page++;
  } while (pageEntries.length === pageSize);

  return allEntries;
};

export const resolveAtomPollingRecordChanges = (
  data: HcmAtomChangesObject | undefined,
): HcmAtomRecordChange[] => {
  const changesObject = data ?? {};
  return (changesObject.entries ?? []).map(
    (record): HcmAtomRecordChange => ({ changeType: "updated", record }),
  );
};
