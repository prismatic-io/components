import { type HttpResponse, type TriggerPayload, trigger, util } from "@prismatic-io/spectral";
import { webhookEmployeeLifecycleInputs } from "../inputs";
import { isValidHmacSignature } from "../util/triggers";

export const webhookEmployeeLifecycle = trigger({
  display: {
    label: "Employee Lifecycle Events",
    description:
      "Receive and validate webhook requests from UKG Pro for manually configured employee lifecycle event subscriptions.",
  },
  inputs: webhookEmployeeLifecycleInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: async (context, payload: TriggerPayload, { webhookSecret, verifySignature }) => {
    const headers = payload.headers || {};
    const normalizedHeaders = util.types.lowerCaseHeaders(headers);

    
    if (verifySignature) {
      const signature = normalizedHeaders["x-ukg-signature"];

      if (!signature) {
        context.logger.error(
          "Webhook signature verification failed: Missing X-UKG-Signature header",
        );
        return {
          payload,
          response: {
            statusCode: 401,
            contentType: "application/json",
            body: JSON.stringify({ error: "Missing webhook signature" }),
          } as HttpResponse,
        };
      }

      if (!webhookSecret) {
        context.logger.error(
          "Webhook signature verification enabled but no webhook secret configured",
        );
        return {
          payload,
          response: {
            statusCode: 500,
            contentType: "application/json",
            body: JSON.stringify({ error: "Webhook secret not configured" }),
          } as HttpResponse,
        };
      }

      
      const rawBody = payload.rawBody?.data?.toString() || JSON.stringify(payload.body);

      if (!isValidHmacSignature(rawBody, signature, util.types.toString(webhookSecret))) {
        context.logger.error("Webhook signature verification failed: Invalid signature");
        return {
          payload,
          response: {
            statusCode: 401,
            contentType: "application/json",
            body: JSON.stringify({ error: "Invalid webhook signature" }),
          } as HttpResponse,
        };
      }

      context.logger.debug("Webhook signature verified successfully");
    }

    const response: HttpResponse = {
      statusCode: 200,
      contentType: "application/json",
      body: JSON.stringify({ received: true }),
    };

    return { payload, response };
  },
});
