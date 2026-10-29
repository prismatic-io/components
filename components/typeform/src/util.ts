import * as crypto from "node:crypto";
import {
  type ActionContext,
  type Connection,
  type KeyValuePair,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { AxiosResponse } from "axios";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { oauth2, personalToken } from "./connections";
import { INVALID_CONNECTION } from "./constants";
import { createClient } from "./client";
import type {
  FetchAllData,
  GenericListData,
  Trigger,
} from "./interfaces/general";
import type {
  CreateWebhook,
  DeleteWebhook,
  Webhook,
} from "./interfaces/webhook";

export const cleanBoolean = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;

export const cleanString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanCode = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanKeyValueList = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair[])
    : undefined;

export const fetchAllData = async <T>(
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
  fetchAll = false,
): Promise<FetchAllData<T>> => {
  if (!fetchAll) {
    const { items } = await fetchData<GenericListData<T>>(client, path, params);
    return { data: { items } };
  }
  let records: T[] = [];
  let page = 1;
  let keepFetching = true;
  const pageSize = 200;
  do {
    const { items } = await fetchData<GenericListData<T>>(client, path, {
      page,
      page_size: pageSize,
    });
    records = records.concat(items);
    page += 1;
    keepFetching = items.length === pageSize;
  } while (keepFetching);
  return {
    data: {
      items: records,
    },
  };
};

export const fetchData = async <T>(
  client: HttpClient,
  path: string,
  params: Record<string, unknown> | undefined = undefined,
): Promise<T> => {
  const { data } = await client.get<T>(path, {
    params,
  });
  return data;
};

export const validateConnection = (connection: Connection) => {
  if (![oauth2.key, personalToken.key].includes(connection.key)) {
    throw new Error(INVALID_CONNECTION);
  }
};

export const getAuthorizationHeaders = (connection: Connection) => {
  validateConnection(connection);
  switch (connection.key) {
    case oauth2.key:
      return {
        Authorization: `Bearer ${connection?.token?.access_token}`,
      };
    case personalToken.key:
      return {
        Authorization: `Bearer ${connection.fields.personalToken}`,
      };
    default:
      throw new Error(INVALID_CONNECTION);
  }
};

export const mapModel = (model: string[]) => {
  return model.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
};

export const mapObjectModel = (model: Record<string, string>) => {
  return Object.keys(model).map((key) => {
    return {
      label: key,
      value: model[key],
    };
  });
};

export const formatCode = (code: unknown) =>
  code ? JSON.stringify(code, null, 2) : undefined;

export const setHrefObject = (href: string | undefined) =>
  href ? { href } : undefined;

export const performFunction = (
  context: ActionContext,
  payload: TriggerPayload,
  {
    secret,
  }: {
    secret: string;
  },
): Promise<{
  payload: TriggerPayload;
}> => {
  if (!context.isSimulatedTestExecution) {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const signature = headers["typeform-signature"];
    const isValid = verifySignature(
      signature,
      util.types.toString(payload.rawBody.data),
      secret,
    );
    if (!isValid) {
      throw new Error("Invalid signature");
    }
  }

  return Promise.resolve({
    payload,
  });
};

const verifySignature = (
  receivedSignature: string,
  payload: string,
  secret: string,
) => {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64");
  return receivedSignature === `sha256=${hash}`;
};

export const onInstanceDeploy = async (
  context: ActionContext,
  { connection, formId, formResponse, formResponsePartial, secret }: Trigger,
) => {
  const url = context.webhookUrls[context.flow.name];
  const client = createClient(connection, false);

  await createWebhookFunction({
    client,
    formId,
    tag: context.flow.name,
    enabled: true,
    form_response: formResponse,
    form_response_partial: formResponsePartial,
    secret,
    url,
  });
};

export const onInstanceDelete = async (
  context: ActionContext,
  { connection, formId }: Trigger,
) => {
  const flowName = context.flow.name;
  const client = createClient(connection, false);
  await deleteWebhookFunction({
    client,
    formId,
    tag: flowName,
  });
};

export const createWebhookFunction = async ({
  client,
  formId,
  tag,
  secret,
  form_response,
  form_response_partial,
  enabled,
  url,
}: CreateWebhook) => {
  return await client.put<Webhook>(`/forms/${formId}/webhooks/${tag}`, {
    enabled,
    event_types: {
      form_response,
      form_response_partial,
    },
    secret,
    url,
    verify_ssl: true,
  });
};

export const deleteWebhookFunction = async ({
  client,
  formId,
  tag,
}: DeleteWebhook) => {
  return client.delete(`/forms/${formId}/webhooks/${tag}`);
};

export const listAllWebhooks = async (
  client: HttpClient,
  formId: string,
): Promise<AxiosResponse<GenericListData<Webhook>>> => {
  return await client.get<GenericListData<Webhook>>(
    `/forms/${formId}/webhooks`,
  );
};
