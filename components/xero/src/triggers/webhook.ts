import { type HttpResponse, trigger, util } from "@prismatic-io/spectral";
import crypto from "crypto";
import { webhookInputs } from "../inputs";
import { webhookExamplePayload } from "../examplePayloads";
const validateSignature = (
  signature: string,
  payload: string | Buffer,
  webhookKey: unknown,
): boolean => {
  const hash = crypto
    .createHmac("sha256", util.types.toString(webhookKey))
    .update(payload)
    .digest("base64");
  return signature === hash;
};
export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Xero for manually configured webhook subscriptions.",
  },
  perform: async (context, payload, params) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          contentType: "text/plain; charset=utf-8",
        },
      });
    }
    const incomingSignature = payload.headers["x-xero-signature"];
    const incomingPayload = payload.rawBody.data as string | Buffer;
    const response: HttpResponse = {
      statusCode: 200,
      contentType: "text/plain; charset=utf-8",
    };
    const error: HttpResponse = {
      contentType: "text/plain; charset=utf-8",
      statusCode: 401,
    };
    const isValid = validateSignature(
      incomingSignature,
      incomingPayload,
      params.webhookKey,
    );
    if (isValid) {
      return Promise.resolve({
        payload,
        response,
      });
    }
    return Promise.resolve({
      payload,
      response: error,
    });
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookExamplePayload,
});
