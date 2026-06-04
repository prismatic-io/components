import {
  type ActionContext,
  type ConfigVarResultCollection,
  type Connection,
  ConnectionError,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  CONNECTION_KEYS,
  type SubscriptionResources,
  TriggerBranches,
} from "../constants";
import type { Subscription } from "../types";

export const validateConnection = (connection: Connection): void => {
  if (!CONNECTION_KEYS.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`,
    );
  }
};


export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;


export const cleanStringInput = toOptionalString;
export const cleanNumberInput = toOptionalNumber;

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
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

export const cleanGroupTypes = (groupType: unknown) => {
  if (groupType && typeof groupType === "string") {
    const groupTypes = groupType.split(",");
    return groupTypes.map((type) => type.trim());
  }
  return undefined;
};

export const toOptionalObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanBooleanInput = (value: unknown): boolean | undefined =>
  value ? util.types.toBool(value) : undefined;

export const getConsistencyLevelHeader = (
  eventualConsistencyLevelHeader: boolean,
) => (eventualConsistencyLevelHeader ? { ConsistencyLevel: "Eventual" } : {});

export const getUpsertHeader = (useAsUpsert: boolean) =>
  useAsUpsert ? { Prefer: "create-if-missing" } : {};

export const getMinimalHeader = (returnMinimal: boolean) => {
  return returnMinimal ? { Prefer: "return=minimal" } : {};
};

export const getOptionalBooleanModel = () =>
  ["True", "False"].map((choice) => ({
    label: choice,
    value: choice.toLowerCase(),
  }));

export const getValues = async (
  getAllPaginatedResults: boolean,
  client: HttpClient,
  path: string,
  config: Record<string, unknown> & {
    params?: { $top?: string; $select?: string };
  },
) => {
  
  if (getAllPaginatedResults) {
    if (config.params?.$top) {
      delete config.params.$top;
    }
  }

  const { data: ogData } = await client.get(path, config);
  let nextLink: string | undefined = ogData?.["@odata.nextLink"];

  if (getAllPaginatedResults) {
    
    while (nextLink) {
      const { data } = await client.get(nextLink);
      ogData.value.push(...data.value);
      nextLink = data?.["@odata.nextLink"];
    }
    delete ogData["@odata.nextLink"];
  }

  return { data: ogData };
};

export const triggerPerformFunction = async (
  _context: ActionContext<ConfigVarResultCollection>,
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

export const cleanChangeType = (changeType: unknown): string => {
  if (changeType && Array.isArray(changeType)) {
    if (changeType.length === 0) {
      throw new Error("Change type input must have at least one value.");
    }
    const changeTypes = new Set(changeType);
    return Array.from(changeTypes).join(",");
  }
  throw new Error("Invalid change type input.");
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
  const {
    data: { value: subscriptions },
  } = await getValues(true, client, `/subscriptions`, {});

  const subscriptionsToRemove: string[] = (subscriptions as Subscription[])
    .filter(({ notificationUrl }) => instanceWebhooks.has(notificationUrl))
    .map(({ id }) => id);

  await Promise.all(
    subscriptionsToRemove.map((id) => client.delete(`/subscriptions/${id}`)),
  );

  return { subscriptionsRemoved: subscriptionsToRemove };
};









export const subscribeToResource = async (
  client: HttpClient,
  endpoint: string,
  resource: SubscriptionResources,
  changeType: string,
  expirationDateTime: string,
) => {
  const {
    data: { value: subscriptions },
  } = await getValues(true, client, `/subscriptions`, {});

  const existingSubscription = (subscriptions as Subscription[]).find(
    ({ notificationUrl }) => notificationUrl === endpoint,
  );

  if (existingSubscription) {
    await client.patch(`/subscriptions/${existingSubscription.id}`, {
      expirationDateTime,
    });
    return;
  }

  const payload = {
    changeType,
    notificationUrl: endpoint,
    resource,
    expirationDateTime,
  };
  await client.post(`/subscriptions`, payload);
};

export const cleanHeaders = (headersList: unknown): Record<string, string> => {
  if (Array.isArray(headersList)) {
    return util.types.keyValPairListToObject(headersList);
  }
  return {};
};
