import { util } from "@prismatic-io/spectral";
import type { ActionContext, TriggerPayload } from "@prismatic-io/spectral";
import { getApiKey, getApiSecret, verifySignature } from "../util";
import type { EventsWebhookInputs } from "../types";





export const eventsWebhookPerform = async (
  context: ActionContext,
  payload: TriggerPayload,
  { connection }: EventsWebhookInputs,
) => {
  
  if (!context.isSimulatedTestExecution) {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const signature = headers["sm-signature"];
    const receivedApiKey = headers["sm-apikey"];

    if (!signature) {
      throw new Error(
        "Missing Sm-Signature header. This request may not be from SurveyMonkey.",
      );
    }

    
    const rawBody = util.types.toString(payload.rawBody.data);

    
    const apiKey = getApiKey(connection);
    const apiSecret = getApiSecret(connection);

    
    if (receivedApiKey && receivedApiKey !== apiKey) {
      context.logger.warn(
        "Sm-Apikey header does not match configured API key.",
      );
    }

    
    const isValid = verifySignature(rawBody, signature, apiKey, apiSecret);

    if (!isValid) {
      throw new Error(
        "Webhook signature verification failed. The request may have been tampered with.",
      );
    }

    context.logger.debug("Webhook signature verified successfully.");
  }

  return { payload };
};
