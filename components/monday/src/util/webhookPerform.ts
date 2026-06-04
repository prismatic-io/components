import type {
  ActionContext,
  HttpResponse,
  TriggerPayload,
} from "@prismatic-io/spectral";
import type { ChallengeRequest } from "../types";

export const perform = async (
  context: ActionContext,
  payload: TriggerPayload,
  { signingSecret }: { signingSecret?: string },
) => {
  const body = payload.body.data as ChallengeRequest;

  
  if (body?.challenge) {
    context.logger.info("Received challenge verification request.");
    const response: HttpResponse = {
      statusCode: 200,
      contentType: "application/json",
      body: JSON.stringify({ challenge: body.challenge }),
    };
    return {
      payload,
      response,
      branch: "Challenge Verification",
    };
  }

  
  if (signingSecret && !context.isSimulatedTestExecution) {
    const authorization =
      payload.headers?.Authorization || payload.headers?.authorization;
    if (authorization !== signingSecret) {
      context.logger.error("Webhook signature verification failed.");
      throw new Error(
        "Signature verification failed. Check your signing secret and verify that this request came from Monday.com.",
      );
    }
    context.logger.info("Webhook signature verified successfully.");
  }

  return {
    payload,
    branch: "Notification",
  };
};
