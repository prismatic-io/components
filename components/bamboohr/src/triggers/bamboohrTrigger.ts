import { trigger, util } from "@prismatic-io/spectral";
import { bamboohrTriggerExamplePayload } from "../examplePayloads";
import { bamboohrTriggerInputs } from "../inputs";
import { validateHmac } from "../util";

export const bamboohrTrigger = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from BambooHR for manually configured webhook subscriptions.",
  },
  examplePayload: bamboohrTriggerExamplePayload,
  perform: async (context, payload) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({
        payload,
      });
    }

    const headers = util.types.lowerCaseHeaders(payload.headers);
    const bamboohrSignature = headers["x-bamboohr-signature"];
    const bamboohrTimestamp = headers["x-bamboohr-timestamp"];
    const secrets = context.crossFlowState.webhookSecrets as string[];

    validateHmac(
      payload.rawBody,
      bamboohrTimestamp,
      bamboohrSignature,
      secrets || [],
    );

    return Promise.resolve({
      payload,
    });
  },
  inputs: bamboohrTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
