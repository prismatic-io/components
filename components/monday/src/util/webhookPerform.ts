import {
  type ActionContext,
  type HttpResponse,
  type TriggerPayload,
  type TriggerResult,
  util,
} from "@prismatic-io/spectral";
import {
  WEBHOOK_BRANCH_CHALLENGE,
  WEBHOOK_BRANCH_NOTIFICATION,
} from "../constants";
import type { ChallengeRequest } from "../types";
import { verifyMondayJwt } from "./verifyMondayJwt";

export const perform = async (
  context: ActionContext,
  payload: TriggerPayload,
  { signingSecret }: { signingSecret?: string },
): Promise<NonNullable<TriggerResult<true, TriggerPayload>>> => {
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
      branch: WEBHOOK_BRANCH_CHALLENGE,
    };
  }

  if (signingSecret && !context.isSimulatedTestExecution) {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    try {
      verifyMondayJwt(headers.authorization, signingSecret);
    } catch (error) {
      const reason =
        error instanceof Error ? error.message : util.types.toString(error);
      context.logger.error(`Webhook signature verification failed: ${reason}.`);
      throw new Error(
        "Signature verification failed. Check the signing secret, and that the webhook was created with an OAuth token for the Monday.com app that owns it. The execution log has the reason.",
      );
    }
    context.logger.info("Webhook signature verified successfully.");
  }

  return {
    payload,
    branch: WEBHOOK_BRANCH_NOTIFICATION,
  };
};
