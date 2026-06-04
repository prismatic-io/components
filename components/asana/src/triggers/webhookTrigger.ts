import { trigger, util } from "@prismatic-io/spectral";
import { WEBHOOK_SECRETS_LEGACY_KEY } from "../constants";
import { webhookExamplePayload } from "../examplePayloads";
import {
  isHeartbeatData,
  resolveWebhookSecrets,
  validateHmac,
  webhookSecretsStateKey,
} from "./utils";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Asana for manually configured webhook subscriptions.",
  },
  allowsBranching: true,
  staticBranchNames: ["Notification", "URL Verify"],
  examplePayload: webhookExamplePayload,
  perform: async (context, payload, _params) => {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const webhookSecret = headers["x-hook-secret"];
    const { value: secrets, isLegacy } = resolveWebhookSecrets(context);

    if (webhookSecret) {
      
      

      
      const webhookSecrets = secrets
        ? [...new Set([...secrets, webhookSecret])]
        : [webhookSecret];

      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          headers: {
            "X-Hook-Secret": webhookSecret,
          },
          contentType: "text/plain",
        },
        branch: "URL Verify",
        crossFlowState: {
          [webhookSecretsStateKey(context)]: webhookSecrets,
        },
      });
    } else {
      const stateSecrets = secrets || [];
      
      validateHmac(payload, headers["x-hook-signature"], stateSecrets);

      if (isLegacy) {
        context.crossFlowState[webhookSecretsStateKey(context)] = secrets;
        context.instanceState[WEBHOOK_SECRETS_LEGACY_KEY] = null;
      }

      if (isHeartbeatData(payload.body.data)) {
        
        context.logger.debug("Asana Heartbeat received");
        return Promise.resolve({
          payload,
          branch: "URL Verify",
        });
      } else {
        return Promise.resolve({
          payload,
          branch: "Notification",
        });
      }
    }
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
