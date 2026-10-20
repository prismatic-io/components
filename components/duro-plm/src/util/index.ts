import {
  type ActionLogger,
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral";
import type { GraphQLClient } from "graphql-request";
import connections from "../connections";
import {
  LOOK_BACK_DATE_PATTERN,
  MAX_POLL_PAGES,
  POLL_PAGE_SIZE,
  POLL_RESOURCE_CONFIG,
} from "../constants";
import type { ComponentEdge } from "../types/ComponentEdge";
import type { ComponentNode } from "../types/ComponentNode";
import type { DuroRecord } from "../types/DuroRecord";
import type { ListComponentsResponse } from "../types/ListComponentsResponse";
import type { PollConnection } from "../types/PollConnection";
import type { PollingChangesObject } from "../types/PollingChangesObject";
import type { PollingRecordChange } from "../types/PollingRecordChange";
import type { PollingState } from "../types/PollingState";
import type { PollingStream } from "../types/PollingStream";
export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};
export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanNumberInput = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const getCredentials = (
  connection: Connection,
): {
  apiKey: string;
  url: string;
} => {
  const customDuroEnvironment = util.types
    .toString(connection.fields.customDuroEnvironment)
    .trim();
  const url =
    customDuroEnvironment ||
    util.types.toString(connection.fields.duroEnvironment);
  const apiKey = util.types.toString(connection.fields.username);
  return {
    apiKey,
    url,
  };
};
export const cleanCodeInput = (value: unknown): object =>
  value ? util.types.toObject(value) : {};
export const cleanKeyValueListInput = (
  value: unknown,
): Record<string, unknown> => {
  if (Array.isArray(value)) return util.types.keyValPairListToObject(value);
  return {};
};
export const parseJsonArray = (value: unknown) => {
  if (value) {
    const json = util.types.toObject(value);
    if (!Array.isArray(json)) {
      throw new Error("Expected a JSON array");
    }
    return json;
  }
  return [];
};
const mapComponentEdges = (edges: ComponentEdge[]) =>
  edges.map((edge) => edge.node);
export const getComponentsList = async (
  client: GraphQLClient,
  query: string,
  first: number,
  libraryType: string,
): Promise<ComponentNode[]> => {
  const variables = {
    first,
    libraryType,
  };
  const data = await client.request<ListComponentsResponse>(query, variables);
  const edges = data?.components?.connection?.edges ?? [];
  const mappedEdges = mapComponentEdges(edges);
  return mappedEdges;
};
const toResourceLabel = (key: string): string =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());
export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value]) => ({
    label: toResourceLabel(value),
    value,
  }),
);
const readConnection = (
  data: unknown,
  dataPath: string[],
): PollConnection | undefined => {
  let current: unknown = data;
  for (const key of dataPath) {
    if (current && typeof current === "object") {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current as PollConnection | undefined;
};
export const fetchAllSince = async (
  client: GraphQLClient,
  resourceType: string,
  lastPolledAt: string,
  options: {
    after?: string;
    debug?: boolean;
    logger?: ActionLogger;
  } = {},
): Promise<{
  records: DuroRecord[];
  truncated: boolean;
  endCursor?: string;
}> => {
  const config = POLL_RESOURCE_CONFIG[resourceType];
  if (!config) {
    throw new Error(`Unsupported resource type: ${resourceType}`);
  }
  const { debug, logger } = options;
  const lastPolledAtDate = new Date(lastPolledAt);
  const records: DuroRecord[] = [];
  let after: string | undefined = options.after;
  let page = 0;
  while (page < MAX_POLL_PAGES) {
    page += 1;
    const variables = config.buildVariables(POLL_PAGE_SIZE, after);
    const data = await client.request(config.query, variables);
    const connection = readConnection(data, config.dataPath);
    const edges = connection?.edges ?? [];
    let stop = false;
    for (const edge of edges) {
      const node = edge?.node;
      if (!node) continue;
      records.push(node);
      if (
        config.earlyStop &&
        typeof node.lastModified === "string" &&
        new Date(node.lastModified) <= lastPolledAtDate
      ) {
        stop = true;
        break;
      }
    }
    if (stop) return { records, truncated: false };
    const pageInfo = connection?.pageInfo;
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) {
      return { records, truncated: false };
    }
    after = pageInfo.endCursor;
  }
  if (debug && logger) {
    logger.warn(
      `Reached MAX_POLL_PAGES (${MAX_POLL_PAGES}) while polling ${resourceType}; results truncated. The next poll resumes from the held cursor.`,
    );
  }
  return { records, truncated: true, endCursor: after };
};
export const resolvePollingStart = (
  state: PollingState | undefined,
  lookBackDate: string | undefined,
  now: string,
): {
  since: string;
  isBackfill: boolean;
} => ({
  since: state?.lastPolledAt ?? (lookBackDate || now),
  isBackfill:
    state?.backfillActive === true ||
    (!state?.lastPolledAt && Boolean(lookBackDate)),
});
export const resolvePollingStream = (
  state: PollingState | undefined,
  resourceType: string,
  now: string,
): PollingStream => {
  const resumable =
    Boolean(state?.endCursor) &&
    Boolean(state?.streamStartedAt) &&
    state?.pollResourceType === resourceType;
  return resumable
    ? {
        streamStartedAt: state?.streamStartedAt as string,
        endCursor: state?.endCursor,
      }
    : { streamStartedAt: now };
};
export const nextPollingState = (
  round: {
    lastPolledAt: string;
    stream: PollingStream;
    resourceType: string;
    isBackfill: boolean;
  },
  endCursor: string | undefined,
): PollingState =>
  endCursor
    ? {
        lastPolledAt: round.lastPolledAt,
        endCursor,
        streamStartedAt: round.stream.streamStartedAt,
        pollResourceType: round.resourceType,
        ...(round.isBackfill ? { backfillActive: true } : {}),
      }
    : { lastPolledAt: round.stream.streamStartedAt };
export const lookBackDateClean = (value: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "";
  }
  const raw = typeof value === "string" ? value.trim() : String(value);
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};
export const classifyRecords = (
  records: DuroRecord[],
  lastPolledAt: string,
  options: {
    showNewRecords?: boolean;
    showUpdatedRecords?: boolean;
    isBackfill: boolean;
  },
): Required<PollingChangesObject> => {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: DuroRecord[] = [];
  const updated: DuroRecord[] = [];
  for (const record of records) {
    const createdDate =
      typeof record.created === "string" ? new Date(record.created) : null;
    const lastModifiedDate =
      typeof record.lastModified === "string"
        ? new Date(record.lastModified)
        : null;
    const isNew = createdDate !== null && createdDate > lastPolledAtDate;
    const isUpdated =
      !isNew &&
      lastModifiedDate !== null &&
      lastModifiedDate > lastPolledAtDate;
    if (isNew && (options.isBackfill || options.showNewRecords)) {
      created.push(record);
    } else if (
      isUpdated &&
      (options.isBackfill || options.showUpdatedRecords)
    ) {
      updated.push(record);
    }
  }
  return { created, updated };
};
export const resolveRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
