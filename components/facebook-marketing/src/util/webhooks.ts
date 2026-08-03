import * as crypto from "node:crypto";
import {
  type ActionContext,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { createClient } from "../client";
import { TriggerBranches } from "../constants";
import { clientCredentialsConnection, getAppId } from "./auth";
export const performFunction = async (
  _context: ActionContext,
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
  _context: ActionContext,
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
export const validateFields = (fields: string[]) => {
  if (fields.length === 0) {
    throw new Error("At least one field must be selected");
  }
};
