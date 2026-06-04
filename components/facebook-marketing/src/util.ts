import * as crypto from "node:crypto";
import {
  util,
  type ActionContext,
  type Connection,
  ConnectionError,
  type TriggerPayload,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { createClient } from "./client";
import connections, {
  clientCredentials,
  conversionsToken,
} from "./connections";
import { API_URL, DEFAULT_VERSION, TriggerBranches } from "./constants";

export const adCreativeDefaults =
  "name, object_story_spec, adlabels, body, object_id, url_tags";
export const adSetDefaults =
  "name,account_id,adlabels,adset_schedule,asset_feed_id,attribution_spec,bid_adjustments,bid_amount,bid_constraints,bid_info,billing_event,budget_remaining,campaign,configured_status,created_time,creative_sequence,daily_budget,daily_min_spend_target,daily_spend_cap,destination_type,effective_status,end_time,optimization_goal,optimization_sub_event,pacing_type,promoted_object,recommendations,status,targeting,start_time,targeting_optimization_types,updated_time";
export const adAccountDefaults =
  "name,age,balance,is_personal,account_status,line_numbers,adcreatives";
export const adDefaults =
  "name,adset,account_id,ad_review_feedback,adlabels,adset_id,bid_amount,campaign,campaign_id,configured_status,conversion_domain,created_time,creative,effective_status,issues_info,last_updated_by_app_id,preview_shareable_link,recommendations,status,tracking_specs";

export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value)) {
    return value;
  }
  return undefined;
};

export const cleanString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanNumber = (value: unknown) => {
  return value ? util.types.toNumber(value) : undefined;
};

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      const object = util.types.toObject(value);
      if (typeof object === "string") {
        return JSON.parse(object);
      }
      return object;
    } catch (error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};

export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  const object = cleanCodeInput(value, inputLabel);
  if (object) {
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }

  return undefined;
};

export const validateConversionsConnection = (connection: Connection) => {
  if (connection.key !== conversionsToken.key) {
    throw new Error(
      "The provided connection is not a valid Conversions API connection.",
    );
  }
};

export const eventTimeClean = (value: unknown) => {
  if (!value) {
    
    return Math.floor(new Date().getTime() / 1000);
  }
  return cleanNumber(value);
};

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const getBaseUrl = (version = DEFAULT_VERSION): string =>
  `${API_URL}/v${version}.0`;

export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => {
  const token = util.types.toString(
    connection.token?.access_token || connection.fields.token,
  );
  return { Authorization: `Bearer ${token}` };
};

export const getPaginatedData = async (
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
) => {
  if (fetchAll) {
    params.limit = undefined;
    params.before = undefined;
    params.after = undefined;
  }

  const response = await client.get(url, {
    params,
  });

  if (!fetchAll) {
    return response;
  }

  const allData: Record<string, unknown>[] = response.data.data;

  let next = response.data.paging?.next;
  while (next) {
    const { data } = await client.get(next);

    allData.push(...data.data);

    next = data.paging?.next;
  }

  return {
    data: {
      data: allData,
      paging: {},
    },
  };
};

export const performFunction = async (
  context: ActionContext,
  payload: TriggerPayload,
  params: Record<string, unknown>,
): Promise<{
  payload: TriggerPayload;
  branch: string;
}> => {
  const verifyToken = util.types.toString(params.verifyToken);
  const query = payload.queryParameters;
  if (!query) {
    throw new Error("No parameters provided for the webhook.");
  }
  const mode = query["hub.mode"];
  const token = query["hub.verify_token"];
  const challenge = query["hub.challenge"];

  if (mode === "subscribe") {
    const validWebhook = validateWebhook(token, challenge, verifyToken);
    if (validWebhook) {
      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          contentType: "text/plain",
          body: validWebhook,
        },
        branch: TriggerBranches.URLValidation,
      });
    }
  }

  const validWebhook = verifyWebhook(payload, params);
  if (validWebhook) {
    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
      },
      branch: TriggerBranches.Notification,
    });
  }
  throw new Error("Invalid webhook");
};

const verifyWebhook = (
  payload: TriggerPayload,
  params: Record<string, unknown>,
) => {
  const requestSignature =
    payload.headers["X-Hub-Signature-256"] ||
    payload.headers["x-hub-signature-256"];
  if (!requestSignature) {
    throw new Error("No signature found");
  }
  const [algorithm, signature] = requestSignature.split("=");
  if (algorithm !== "sha256") {
    throw new Error("Invalid algorithm");
  }
  const secret = util.types.toString(params.verifyToken);
  const bodySignature = crypto
    .createHmac("sha256", secret)
    .update(util.types.toString(payload.rawBody.data))
    .digest("hex");
  return signature === bodySignature;
};

const validateWebhook = (
  token: string,
  challenge: string,
  verifyToken: string,
) => {
  if (token === verifyToken) {
    return challenge;
  }
  return null;
};

export const onInstanceDeploy = async (
  context: ActionContext,
  { connection, version, object, verifyToken, fields },
) => {
  clientCredentialsConnection(connection);
  const appId = getAppId(connection);
  const client = createClient(connection, false, version);
  const endpoint = context.webhookUrls[context.flow.name];
  await createWebhookFn(client, appId, object, endpoint, verifyToken, fields);
};

export const onInstanceDelete = async (
  context: ActionContext,
  { connection, version, object, fields },
) => {
  clientCredentialsConnection(connection);
  const client = createClient(connection, false, version);
  const appId = getAppId(connection);
  await deleteWebhookFn(client, appId, object, fields);
};

export const getWebhookObject = (object: string) => {
  let webhookObject: string;
  let webhookFields: string;
  switch (object) {
    case "page":
      webhookObject = "page";
      webhookFields = "feed, messages";
      break;
    case "ad_account":
      webhookObject = "ad_account";
      webhookFields = "with_issues_ad_objects, in_process_ad_objects";
      break;
    case "lead":
      webhookObject = "page";
      webhookFields = "leadgen";
      break;
    default:
      throw new Error("Invalid object");
  }
  return { webhookObject, webhookFields };
};

export const getAppId = (connection: Connection) => {
  return util.types.toString(connection.fields.clientId);
};

export const createWebhookFn = async (
  client: HttpClient,
  appId: string,
  object: string,
  callback_url: string,
  verify_token: string,
  fields: string[],
) => {
  const { data } = await client.post(`/${appId}/subscriptions`, {
    object,
    fields: fields.length > 0 ? fields : undefined,
    callback_url,
    verify_token,
    include_values: true,
  });
  return data;
};

export const deleteWebhookFn = async (
  client: HttpClient,
  appId: string,
  object: string,
  fields: string[],
) => {
  await client.delete(`/${appId}/subscriptions`, {
    params: {
      object,
      fields: fields.length > 0 ? fields : undefined,
    },
  });
};

export const clientCredentialsConnection = (connection: Connection) => {
  if (connection.key !== clientCredentials.key) {
    throw new Error(
      `Invalid connection provided, expected ${clientCredentials.display.label}`,
    );
  }
};

export const validateFields = (fields: string[]) => {
  if (fields.length === 0) {
    throw new Error("At least one field must be selected");
  }
};
