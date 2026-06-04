import {
  type ActionContext,
  type ConfigVarResultCollection,
  type Connection,
  ConnectionError,
  type InputFieldChoice,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import { msIntuneClientCredentials, msIntuneOAuth2 } from "./connections";
import {
  API_URL,
  API_VERSIONS,
  GENERAL_MEMBER_TYPE_URL,
  MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION,
  TriggerBranches,
} from "./constants";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { Subscription } from "./interfaces";

export const validateConnection = (connection: Connection): void => {
  if (
    ![msIntuneOAuth2.key, msIntuneClientCredentials.key].includes(
      connection.key,
    )
  ) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`,
    );
  }
};

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanCodeInput = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanBooleanStringInput = (value: unknown) => {
  if (value) {
    return util.types.toBool(value);
  }
  return undefined;
};

export const cleanBodyInput = (value: unknown) =>
  value ? util.types.toObject(value) : {};

export const generateApiVersionModel = (): InputFieldChoice[] =>
  Object.keys(API_VERSIONS).map(
    (key): InputFieldChoice => ({
      label: key,
      value: API_VERSIONS[key as keyof typeof API_VERSIONS],
    }),
  );
export const getBaseUrl = (useBeta: boolean): string => {
  const version = useBeta ? API_VERSIONS.beta : API_VERSIONS.v1;

  return `${API_URL}${version}`;
};

export const getMobileAppObject = (
  intent: string,
  target: string,
  settings: string,
  groupId?: string,
) => ({
  intent,
  target: {
    "@odata.type": target,
  },
  settings: {
    "@odata.type": settings,
    useDeviceContext: true,
  },
  id: groupId,
});

export const cleanArrayInput = (value: unknown) => {
  if (value) {
    const data = util.types.toObject(value);
    if (Array.isArray(data)) {
      return data.map(cleanStringInput).filter(Boolean) as string[];
    }
  }
  throw new Error("Change Type must be an array.");
};

export const cleanOptionalArrayInput = (value: unknown) => {
  if (value) {
    const data = util.types.toObject(value);
    if (Array.isArray(data)) {
      return data.map(cleanStringInput).filter(Boolean) as string[];
    }
    throw new Error("Member IDs must be an array.");
  }
  return undefined;
};

export const paginateResults = async (
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown> | undefined = undefined,
) => {
  if (fetchAll) {
    const results = [];
    let nextLink = url;
    let lastResponse = null;
    let firstRequest = true;
    let paramsToSend = params;
    do {
      if (
        firstRequest &&
        paramsToSend &&
        Object.keys(paramsToSend || {})?.length > 0
      ) {
        
        const { $top, $skip, $skipToken, ...rest } = paramsToSend;
        paramsToSend = rest;
        firstRequest = false;
      } else {
        paramsToSend = undefined;
      }
      const { data } = await client.get(nextLink, {
        params: paramsToSend,
      });
      const { value, ...rest } = data;
      lastResponse = rest;
      results.push(...value);
      nextLink = data["@odata.nextLink"];
    } while (nextLink);
    return {
      value: results,
      ...lastResponse,
    };
  }
  const { data } = await client.get(url, {
    params,
  });
  return data;
};

export const triggerPerformFunction = async (
  context: ActionContext<ConfigVarResultCollection>,
  payload: TriggerPayload,
) => {
  const rawValidationToken = payload.queryParameters?.validationToken;
  const validationToken = util.types.toString(rawValidationToken);
  if (validationToken)
    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        contentType: "text/plain",
        body: validationToken,
      },
      branch: TriggerBranches.URLValidation,
    });

  return Promise.resolve({
    payload,
    branch: TriggerBranches.Notification,
  });
};

export const subscribeToResource = async (
  client: HttpClient,
  endpoint: string,
  resource: string,
  changeTypes: string[],
  expirationDateTime: string,
  extraParams: Record<string, unknown> = {},
) => {
  const promises = [];
  const data = await paginateResults(client, "/subscriptions", true, {});
  for (const type of changeTypes) {
    const existingSubscription = (data.value as Subscription[]).find(
      ({ notificationUrl, changeType }) =>
        notificationUrl === endpoint && type === changeType,
    );

    if (existingSubscription)
      throw new Error(
        `Subscription of type ${type} already exists for this endpoint.`,
      );

    const payload = {
      changeType: type,
      notificationUrl: endpoint,
      resource,
      expirationDateTime,
      ...extraParams,
    };
    promises.push(client.post("/subscriptions", payload));
  }
  const createdSubscriptions = await Promise.all(promises);
  return createdSubscriptions.map(({ data }) => data);
};

export const addMinutesToDate = (
  currentDate: Date,
  minutesToAdd: number,
): string => {
  const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60 * 1000);
  const formattedDate = futureDate
    .toISOString()
    .replace("Z", "Z")
    .replace(/\.\d{3}Z$/, (match) => {
      
      const milliseconds = `${match.slice(1, 4)}0000`;
      return `.${milliseconds}Z`;
    });

  return formattedDate;
};

export const removeSubscriptions = async (
  client: HttpClient,
  instanceWebhooks: Set<string>,
) => {
  const data = await paginateResults(client, "/subscriptions", true, {});

  const subscriptionsToRemove: string[] = (data.value as Subscription[])
    .filter(({ notificationUrl }) => instanceWebhooks.has(notificationUrl))
    .map(({ id }) => id);

  await Promise.all(
    subscriptionsToRemove.map((id) => client.delete(`/subscriptions/${id}`)),
  );

  return { subscriptionsRemoved: subscriptionsToRemove };
};

export const getExpirationDate = (expirationDateTime: string | undefined) => {
  return expirationDateTime
    ? expirationDateTime
    : addMinutesToDate(
        new Date(),
        MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION,
      );
};

export const addObjectTypeToMemberIds = (memberIds: string[]) =>
  memberIds.map((id) =>
    isValidUrl(id) ? id : `${GENERAL_MEMBER_TYPE_URL}/${id}`,
  );

export const getMemberIds = (
  memberIds: string[] | undefined,
  memberIdsString: string | undefined,
) => {
  const memberIdsToAdd =
    memberIds && memberIds.length > 0
      ? memberIds
      : memberIdsString?.split(",") || [];

  if (memberIdsToAdd.length === 0) {
    throw new Error(
      "No member IDs provided. You must fill either the dynamic member IDs input or the member IDs input.",
    );
  }
  return memberIdsToAdd;
};

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};
