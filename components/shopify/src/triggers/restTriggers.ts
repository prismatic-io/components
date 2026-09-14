import * as crypto from "node:crypto";
import { type TriggerPayload, trigger, util } from "@prismatic-io/spectral";
import { webhookInputs } from "../inputs";
import { signaturesMatch } from "../util";
export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Shopify for manually configured webhook subscriptions.",
  },
  perform: async (context, payload: TriggerPayload, { secret_key }) => {
    if (secret_key) {
      const headers = util.types.lowerCaseHeaders(payload.headers);
      const SHOPIFY_HMAC = headers["x-shopify-hmac-sha256"];
      if (SHOPIFY_HMAC) {
        const requestBody = util.types.toString(payload.rawBody.data);
        if (!context.isSimulatedTestExecution) {
          const signature = crypto
            .createHmac("sha256", secret_key)
            .update(requestBody, "utf8")
            .digest("base64");
          if (!signaturesMatch(signature, SHOPIFY_HMAC)) {
            throw new Error("Signature verification failed");
          }
        }
        return Promise.resolve({
          payload,
          response: {
            headers: {
              ...headers,
              "X-Shopify-Hmac-SHA256": SHOPIFY_HMAC,
            },
            statusCode: 200,
            contentType: "application/json",
            body: JSON.parse(util.types.toString(requestBody)),
          },
        });
      }
    }
    if (!context.isSimulatedTestExecution) {
      throw new Error("Signature verification failed");
    }
    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        contentType: "application/json",
        body: "{}",
      },
    });
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
export default { webhook };
