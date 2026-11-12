import type { HttpClient } from "@prismatic-io/spectral/http";
import crypto from "crypto";

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
  const received = new Uint8Array(Buffer.from(args.verify, "base64"));
  const expected = new Uint8Array(Buffer.from(computeHash(args), "base64"));
  if (received.length !== expected.length) {
    return false;
  }
  return crypto.timingSafeEqual(received, expected);
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
