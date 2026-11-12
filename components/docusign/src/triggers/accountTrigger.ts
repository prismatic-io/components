import { trigger, util } from "@prismatic-io/spectral";
import { accountTriggerInputs } from "../inputs";
import {
  createWebhook,
  deleteAllInstancedWebhooks,
  isHashValid,
  webhookExists as webhookExistsFn,
} from "../util";
import { getDocuSignClient } from "../client";
import { accountTriggerExamplePayload } from "../examplePayloads";

export const accountTrigger = trigger({
  display: {
    label: "Account Level Trigger",
    description:
      "Manages DocuSign Connect webhook subscriptions for your instance. On instance deploy, this trigger creates a Connect configuration for the selected events. On instance deletion, it removes the configuration.",
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
        webhookEvents,
        true,
      );
    },
    delete: async (context, { connection }) => {
      const client = await getDocuSignClient(connection);
      const flowEndpoint = context.webhookUrls[context.flow.name];
      await deleteAllInstancedWebhooks(client, flowEndpoint);
    },
  },
  inputs: accountTriggerInputs,
  examplePayload: accountTriggerExamplePayload,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
