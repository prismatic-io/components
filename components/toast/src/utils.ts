import { createHmac } from "node:crypto";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import connections from "./connections";
import { LOOK_BACK_DATE_PATTERN } from "./constants";
import type {
  ToastChangesObject,
  ToastRecordChange,
  ToastTimeEntryRecord,
} from "./interfaces";
export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};
export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};
export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    let object: unknown;
    try {
      object = util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
};
export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};
export const cleanCodeInputEmptyObject = (
  value: unknown,
  inputLabel: string,
) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return {};
};
export const cleanValueListInput = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value : undefined;
  }
  return undefined;
};
export const getToastToken = async (
  connection: Connection,
  debug: boolean,
): Promise<string> => {
  const client = createClient({
    baseUrl: util.types.toString(connection.fields.apiUrl),
    debug,
  });
  const body = {
    clientId: connection.fields.clientId,
    clientSecret: connection.fields.clientSecret,
    userAccessType: "TOAST_MACHINE_CLIENT",
  };
  const { data } = await client.post(
    "/authentication/v1/authentication/login",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return `Bearer ${data.token?.accessToken}`;
};
export const getSignature = (
  secret: string,
  body: string,
  timestamp: string,
): string => {
  const signatureData = body + timestamp;
  const hmac = createHmac("sha256", Buffer.from(secret, "utf-8"));
  const hash = hmac.update(signatureData, "utf-8").digest("base64");
  return hash;
};
export const serializeRepeatedParam = (
  arrayParam: string[],
  param: string,
): string =>
  arrayParam
    .map((element) => `${param}=${encodeURIComponent(element)}`)
    .join("&");
export const fetchTimeEntriesModified = async (
  client: HttpClient,
  modifiedStartDate: string,
  modifiedEndDate: string,
): Promise<ToastTimeEntryRecord[]> => {
  const { data } = await client.get("/labor/v1/timeEntries", {
    params: { modifiedStartDate, modifiedEndDate },
  });
  return Array.isArray(data) ? (data as ToastTimeEntryRecord[]) : [];
};
export const resolvePollingRecordChanges = (
  data: ToastChangesObject | undefined,
): ToastRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): ToastRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): ToastRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
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
