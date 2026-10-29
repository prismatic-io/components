import { trigger, util } from "@prismatic-io/spectral";
import { WEBHOOK_AUTH_HEADER } from "../constants";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookEventsInputs } from "../inputs";
import type { ManagedWebhookState } from "../types";
import {
  createManagedWebhooks,
  deleteManagedWebhooks,
  getStoreKey,
} from "../util";

export const webhookEvents = trigger({
  display: {
    label: "Webhook Events",
    description:
      "Subscribe to Jamf Pro events. On deploy, this trigger creates a webhook in Jamf Pro for each selected event (secured with a generated authentication header) and removes them when the instance is deleted. Incoming requests are validated against that header.",
  },
  inputs: webhookEventsInputs,
  perform: async (context, payload) => {
    if (!context.isSimulatedTestExecution) {
      const state = context.crossFlowState[
        getStoreKey(context.flow.stableId)
      ] as ManagedWebhookState | undefined;

      const headers = util.types.lowerCaseHeaders(payload.headers);

      if (
        !state?.webhookAuthValue ||
        headers[WEBHOOK_AUTH_HEADER.toLowerCase()] !== state.webhookAuthValue
      ) {
        throw new Error(
          "Jamf webhook header authentication failed: missing or invalid auth header.",
        );
      }
    }
    return Promise.resolve({ payload });
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "invalid",
  examplePayload: webhookExamplePayload,
  webhookLifecycleHandlers: {
    create: createManagedWebhooks,
    delete: deleteManagedWebhooks,
  },
});
