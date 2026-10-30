import { BoxApiError } from "box-node-sdk/lib/box/errors";
import { deserializeFileFull } from "box-node-sdk/lib/schemas/fileFull";
import { deserializeFiles } from "box-node-sdk/lib/schemas/files";
import { deserializeFolderFull } from "box-node-sdk/lib/schemas/folderFull";
import { deserializeItems } from "box-node-sdk/lib/schemas/items";
import { deserializeUserFull } from "box-node-sdk/lib/schemas/userFull";
import { deserializeWebhook } from "box-node-sdk/lib/schemas/webhook";
import { deserializeWebhooks } from "box-node-sdk/lib/schemas/webhooks";

type SerializedData = Parameters<typeof deserializeWebhooks>[0];

export const webhooksResponse = (raw: Record<string, unknown>) => ({
  ...deserializeWebhooks(raw as SerializedData),
  rawData: raw,
});

export const itemsResponse = (raw: Record<string, unknown>) => ({
  ...deserializeItems(raw as SerializedData),
  rawData: raw,
});

export const folderFullResponse = (raw: Record<string, unknown>) => ({
  ...deserializeFolderFull(raw as SerializedData),
  rawData: raw,
});

export const fileFullResponse = (raw: Record<string, unknown>) => ({
  ...deserializeFileFull(raw as SerializedData),
  rawData: raw,
});

export const filesResponse = (raw: Record<string, unknown>) => ({
  ...deserializeFiles(raw as SerializedData),
  rawData: raw,
});

export const userFullResponse = (raw: Record<string, unknown>) => ({
  ...deserializeUserFull(raw as SerializedData),
  rawData: raw,
});

export const webhookResponse = (raw: Record<string, unknown>) => ({
  ...deserializeWebhook(raw as SerializedData),
  rawData: raw,
});

export const boxApiError = (statusCode: number) =>
  new BoxApiError({
    message: `Box responded ${statusCode}`,
    requestInfo: {
      method: "POST",
      url: "https://api.box.com/2.0/webhooks",
      queryParams: {},
      headers: {},
      body: undefined,
    },
    responseInfo: {
      statusCode,
      headers: {},
      body: {},
      rawBody: "",
      code: "",
      contextInfo: {},
      requestId: "request-id",
      helpUrl: "",
    },
  });
