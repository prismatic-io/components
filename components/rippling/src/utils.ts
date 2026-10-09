import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import connections from "./connections";
import { API_VERSION, BASE_URL_V1, BASE_URL_V2 } from "./constants";
import type {
  ApiVersion,
  RipplingChangesObject,
  RipplingRecord,
  RipplingRecordChange,
} from "./types";
export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
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
export const resolvePollingRecordChanges = (
  data: RipplingChangesObject | undefined,
): RipplingRecordChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): RipplingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): RipplingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const validateConnection = (connection: Connection): void => {
  if (!connections.map((conn) => conn.key).includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Received unexpected connection type: ${connection.key}`,
    );
  }
};
export const toAuthorizationHeaders = (
  connection: Connection,
): {
  Authorization: string;
} => {
  const accessToken = util.types.toString(connection.token?.access_token);
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }
  const apiKey = util.types.toString(connection.fields?.apiKey);
  if (apiKey) {
    return { Authorization: `Bearer ${apiKey}` };
  }
  const username = util.types.toString(connection.fields?.username);
  const password = util.types.toString(connection.fields?.password);
  if (username && password) {
    const encoded = Buffer.from(`${username}:${password}`).toString("base64");
    return { Authorization: `Basic ${encoded}` };
  }
  throw new Error(
    `Failed to guess at authorization parameters for Connection: ${connection.key}`,
  );
};
export const getBaseUrl = (version: ApiVersion): string => {
  return version === API_VERSION.V2 ? BASE_URL_V2 : BASE_URL_V1;
};
export const fetchAllRecords = async (
  client: HttpClient,
  endpoint: string,
  filter?: string,
): Promise<RipplingRecord[]> => {
  const allRecords: RipplingRecord[] = [];
  let cursorParam: string | undefined;
  do {
    const { data } = await client.get(endpoint, {
      params: {
        ...(filter ? { filter } : {}),
        ...(cursorParam ? { cursor: cursorParam } : {}),
      },
    });
    const records: RipplingRecord[] = data.results || [];
    allRecords.push(...records);
    cursorParam = data.next_link
      ? new URL(data.next_link).searchParams.get("cursor") || undefined
      : undefined;
  } while (cursorParam);
  return allRecords;
};
