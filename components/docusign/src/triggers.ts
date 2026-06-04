import { trigger, util } from "@prismatic-io/spectral";
import { connectKey, connection, webhookEvents } from "./inputs";
import {
  createWebhook,
  deleteAllInstancedWebhooks,
  isHashValid,
  webhookExists as webhookExistsFn,
} from "./utils";
import { getDocuSignClient } from "./client";

export const accountTrigger = trigger({
  display: {
    label: "Account Level Trigger",
    description: "Get notified when an event occurs at the account.",
  },
  perform: async (context, payload, { connectKey }) => {
    const textPayload = util.types.toString(payload.rawBody.data);
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const signatureHeaderKeys = Object.keys(headers).filter((headerKey) =>
      headerKey.startsWith("x-docusign-signature"),
    );
    if (!context.isSimulatedTestExecution) {
      const isValidCall = signatureHeaderKeys.some((key) =>
        isHashValid({
          verify: headers[key],
          secret: connectKey,
          payload: textPayload,
        }),
      );
      if (!isValidCall) {
        throw new Error("Invalid or missing signature.");
      }
    }
    return Promise.resolve({
      payload,
    });
  },
  webhookLifecycleHandlers: {
    create: async (context, { connection, webhookEvents }) => {
      const client = await getDocuSignClient(connection);
      const urlToPublishTo = context.webhookUrls[context.flow.name];
      const webhookExists = await webhookExistsFn(client, urlToPublishTo);
      if (webhookExists) {
        throw new Error("Webhook already exists.");
      }
      const webhookName = context.flow.name + " Webhook";
      await createWebhook(
        client,
        urlToPublishTo,
        webhookName,
        webhookEvents as string[],
        true,
      );
    },
    delete: async (context, { connection }) => {
      const client = await getDocuSignClient(connection);
      const flowEndpoint = context.webhookUrls[context.flow.name];
      await deleteAllInstancedWebhooks(client, flowEndpoint);
    },
  },
  inputs: { connectKey, connection, webhookEvents },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});

export default { accountTrigger };
