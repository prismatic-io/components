import { auth } from "@googleapis/drive";
import { type ActionContext, type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import type { driveactivity_v2 } from "googleapis";
import type { ResolvedListChangesPageToken } from "./interfaces";
import { LIST_CHANGES_STATE_KEY_PREFIX, MY_DRIVE } from "./constants";

export const getToken = (connection: Connection) => {
  const { access_token: token } = connection.token;
  if (!token) {
    throw new ConnectionError(connection, "Did not receive a valid token.");
  }
  return util.types.toString(token);
};

export const getOauth = (token: string) => {
  const oauth2Client = new auth.OAuth2();
  oauth2Client.setCredentials({ access_token: `${token}` });

  return oauth2Client;
};

export const cleanCodeInput = (value: unknown) => (value ? util.types.toObject(value) : undefined);
export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanArrayInput = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map(cleanStringInput).filter(Boolean);
  }
  return [];
};

export const cleanItemInput = (value: unknown) => {
  const string = cleanStringInput(value);
  if (value === MY_DRIVE) {
    return undefined;
  }
  if (string) {
    return string.includes("items/") ? string : `items/${string}`;
  }
  return undefined;
};

export const getQueryDriveActivity = async (
  drive: driveactivity_v2.Driveactivity,
  params: Record<string, unknown>,
  fetchAll: boolean,
) => {
  const { pageToken, ancestorName, filter, itemName, consolidationStrategy } = params;

  let drivePageToken: string | undefined;
  const requestBody: Record<string, unknown> = {
    pageToken,
    ancestorName,
    filter,
    itemName,
    consolidationStrategy,
  };
  const { data } = await drive.activity.query(requestBody);
  if (fetchAll) {
    drivePageToken = data.nextPageToken;
    while (drivePageToken) {
      const nextPage = await drive.activity.query({
        requestBody: {
          pageToken: drivePageToken,
          ancestorName,
          consolidationStrategy,
          filter,
          itemName,
        } as Record<string, unknown>,
      });
      data.activities.push(...nextPage.data.activities);
      drivePageToken = nextPage.data.nextPageToken;
    }
    drivePageToken = undefined;
  }
  return data;
};

export const getDriveQueryParams = (driveId: string) => {
  if (driveId === MY_DRIVE) {
    return {
      supportsAllDrives: false,
      includeItemsFromAllDrives: false,
      corpora: "user",
    };
  }
  return {
    driveId,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    corpora: driveId ? "drive" : undefined,
  };
};

export const getListChangesNewStateKey = (context: ActionContext): string =>
  `${LIST_CHANGES_STATE_KEY_PREFIX}:${context.flow.stableId}:${context.stepId}`;

export const getListChangesLegacyStateKey = (context: ActionContext): string => context.stepId;

export const resolveListChangesPageToken = (
  context: ActionContext,
): ResolvedListChangesPageToken => {
  const fromNew = util.types.toString(context.crossFlowState[getListChangesNewStateKey(context)]);
  if (fromNew) {
    return { value: fromNew, isLegacy: false };
  }
  const fromLegacy = util.types.toString(
    context.instanceState[getListChangesLegacyStateKey(context)],
  );
  if (fromLegacy) {
    return { value: fromLegacy, isLegacy: true };
  }
  return { value: "", isLegacy: false };
};
