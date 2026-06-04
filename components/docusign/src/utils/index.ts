import { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import crypto from "crypto";
type AnyObject = Record<string, unknown>;
export const cleanObject = (obj: AnyObject): AnyObject => {
  const cleanedObject: AnyObject = {};

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      
      if (value.length > 0) {
        cleanedObject[key] = value.map((item) =>
          typeof item === "object" && !Array.isArray(item)
            ? cleanObject(item)
            : item,
        );
      }
    } else if (value && typeof value === "object") {
      
      const cleanedNestedObject = cleanObject(value as AnyObject);
      if (Object.keys(cleanedNestedObject).length > 0) {
        cleanedObject[key] = cleanedNestedObject;
      }
    } else {
      
      if (value !== undefined && value !== null && value !== "") {
        cleanedObject[key] = value;
      }
    }
  }

  return cleanedObject;
};

export const jsonCheck = (json: unknown) => {
  if (typeof json === "string" && json.length) {
    return JSON.parse(json);
  } else return {};
};

export const getDocumentIds = (ids: unknown) => {
  return Array.isArray(ids)
    ? ids.map((id: string) => {
        return {
          documentId: id,
        };
      })
    : [];
};

export const getUserIds = (ids: unknown) => {
  return Array.isArray(ids)
    ? ids.map((id: unknown) => {
        return {
          userId: id,
        };
      })
    : [];
};

export const getFolders = async (
  client: HttpClient,
  count: string,
  include: string,
  includeItems: boolean,
  startPosition: string,
  subFolderDepth: string,
  userFilter: string,
) => {
  const { data } = await client.get(`/folders`, {
    params: {
      count: count || undefined,
      include: include || undefined,
      include_items: includeItems,
      start_position: startPosition || undefined,
      sub_folder_depth: subFolderDepth || undefined,
      user_filter: userFilter || undefined,
    },
  });
  return data;
};

export const getTemplates = async (client: HttpClient) => {
  const { data } = await client.get(`/templates`);
  return data;
};

export const getWebhooks = async (client: HttpClient) => {
  const { data } = await client.get(`/connect`);
  return data;
};

export const deleteWebhook = async (client: HttpClient, connectId: string) => {
  const { data } = await client.delete(`/connect/${connectId}`);
  return data;
};

export const createWebhook = async (
  client: HttpClient,
  urlToPublishTo: string,
  webhookName: string,
  webhookEvents: string[],
  includeHMAC: boolean,
) => {
  const { data } = await client.post(`/connect`, {
    configurationType: "custom",
    urlToPublishTo,
    name: webhookName,
    allowEnvelopePublish: "true",
    enableLog: "true",
    requiresAcknowledgement: "true",
    signMessageWithX509Certificate: "false",
    deliveryMode: "SIM",
    events: webhookEvents,
    eventData: {
      version: "restv2.1",
      includeData: [""],
    },
    allUsers: "true",
    includeHMAC: includeHMAC.toString(),
  });

  return data;
};

export const computeHash = (args: {
  secret: string;
  payload: string;
}): string => {
  const hmac = crypto.createHmac("sha256", args.secret);
  hmac.write(args.payload);
  hmac.end();
  return hmac.read().toString("base64");
};

export const isHashValid = (args: {
  verify: string;
  secret: string;
  payload: string;
}): boolean => {
  return crypto.timingSafeEqual(
    new Uint8Array(Buffer.from(args.verify, "base64")),
    new Uint8Array(Buffer.from(computeHash(args), "base64")),
  );
};

export const deleteAllInstancedWebhooks = async (
  client: HttpClient,
  flowEndpoint: string,
) => {
  const data = await getWebhooks(client);
  const webhooksToDelete: Promise<unknown>[] = [];
  data.configurations.forEach(
    (webhook: { connectId: string; urlToPublishTo: string }) => {
      if (webhook.urlToPublishTo === flowEndpoint) {
        webhooksToDelete.push(deleteWebhook(client, webhook.connectId));
      }
    },
  );
  await Promise.all(webhooksToDelete);
  return { deletedWebhooks: webhooksToDelete.length };
};

export const webhookExists = async (
  client: HttpClient,
  flowEndpoint: string,
): Promise<boolean> => {
  const data = await getWebhooks(client);
  return data.configurations.some(
    (webhook: { urlToPublishTo: string }) =>
      webhook.urlToPublishTo === flowEndpoint,
  );
};
