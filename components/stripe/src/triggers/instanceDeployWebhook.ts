import { util, trigger } from "@prismatic-io/spectral";
import { createStripeClient } from "../client";
import { instanceDeployWebhookInputs } from "../inputs";
import type { CreatedWebhook } from "../types";
import {
  getStripeHeaderSignature,
  onInstanceDelete,
  onInstanceDeploy,
  validateTrigger,
} from "../util";
export const instanceDeployWebhook = trigger({
  display: {
    label: "Webhook Events",
    description:
      "Receive event notifications from Stripe. Automatically creates and manages a webhook subscription for the selected events when the instance is deployed, and removes the subscription when the instance is deleted. Incoming webhook signatures are validated by default.",
  },
  perform: async (
    context,
    payload,
    { connection, disableWebhookValidation, webhookSecret },
  ) => {
    const createdWebhook = context.crossFlowState[context.flow.name] as
      | CreatedWebhook
      | undefined;
    const client = createStripeClient({
      stripeConnection: connection,
      timeout: 5000,
    });
    if (!disableWebhookValidation && !context.isSimulatedTestExecution) {
      const signingSecret = webhookSecret || createdWebhook?.webhook?.secret;
      if (!signingSecret) {
        throw new Error(
          "No webhook signing secret is available for this flow. This happens when the deployment reused an endpoint that already pointed at this flow's URL, because Stripe returns a signing secret only when an endpoint is created. Copy the signing secret from the endpoint's page in the Stripe dashboard into the Webhook Secret input, or delete the endpoint in Stripe and redeploy the instance to have a new one created.",
        );
      }
      const sig = getStripeHeaderSignature(
        util.types.lowerCaseHeaders(payload.headers),
      );
      validateTrigger(
        client,
        payload.rawBody.data as string,
        sig,
        signingSecret,
      );
    }
    return Promise.resolve({
      payload,
    });
  },
  inputs: instanceDeployWebhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: onInstanceDeploy,
    delete: onInstanceDelete,
  },
});
