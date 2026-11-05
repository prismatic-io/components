import { util } from "@prismatic-io/spectral";
import type {
  AemChangeItem,
  AemChangeType,
  AemCloudEvent,
  AemEventEnvelope,
  AemResourceType,
} from "../types";
import { toPublishUrl } from "./records";

const RESOURCE_PREFIXES: [string, AemResourceType][] = [
  ["aem.sites.contentFragment.", "contentFragment"],
  ["aem.sites.page.", "page"],
  ["aem.assets.asset.", "asset"],
];

const ACTION_CHANGE_TYPES: Record<string, AemChangeType> = {
  created: "created",
  modified: "modified",
  published: "published",
  unpublished: "unpublished",
  deleted: "deleted",
  processing_completed: "created",
  metadata_updated: "modified",
};

const asString = (value: unknown): string | null => (typeof value === "string" ? value : null);

const asRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

const asResourceUrl = (value: unknown): string | null => {
  const url = asString(value);
  if (!url) return null;
  try {
    return new URL(url).pathname.length > 1 ? url : null;
  } catch {
    return null;
  }
};

export const parseAemCloudEvent = (body: unknown, rawBody: string): AemCloudEvent => {
  if (body && typeof body === "object" && !Array.isArray(body) && !(body instanceof Uint8Array)) {
    return body as AemCloudEvent;
  }
  try {
    const parsed: unknown = JSON.parse(rawBody);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed))
      return parsed as AemCloudEvent;
  } catch {}
  throw new Error("Adobe I/O Events delivered a body that is not a JSON CloudEvent.");
};

export const toAemEventItem = (
  event: AemCloudEvent,
  scope: string,
  publishBaseUrl?: string,
): AemChangeItem & AemEventEnvelope => {
  const code = event.type ?? "";
  const prefix = RESOURCE_PREFIXES.find(([value]) => code.startsWith(value));
  const resourceType: AemResourceType = prefix?.[1] ?? "unknown";
  const action = prefix ? code.slice(prefix[0].length) : (code.split(".").pop() ?? "");
  const data = event.data ?? {};
  const repository = asRecord(data.repositoryMetadata);
  const path = asString(data.path) ?? asString(repository["repo:path"]);
  const id = asString(data.id) ?? asString(repository["repo:assetId"]) ?? path ?? event.id ?? "";
  return {
    changeType: ACTION_CHANGE_TYPES[action] ?? "modified",
    record: {
      resourceType,
      id,
      path,
      url:
        asResourceUrl(data.sourceUrl) ??
        toPublishUrl(publishBaseUrl, resourceType === "page" && path ? `${path}.html` : path),
      title: asString(data.title) ?? asString(asRecord(data.assetMetadata)["dc:title"]),
      tags: (Array.isArray(data.tags) ? data.tags : []).map((tag) => ({
        id: util.types.toString(tag),
        title: null,
        titlePath: null,
      })),
      created: null,
      modified: event.time ?? null,
      published: null,
      scope,
      data: event,
    },
    eventId: event.id ?? null,
    eventSource: event.source ?? null,
    eventType: event.type ?? null,
  };
};
