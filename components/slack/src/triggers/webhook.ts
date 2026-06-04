import crypto from "node:crypto";
import { type HttpResponse, trigger, util } from "@prismatic-io/spectral";
import { webhookInputs } from "../inputs";

const computeSignature = (
  requestBody: string,
  signingSecret: string,
  timestamp: number
) => {
  const signatureBaseString = `v0:${timestamp}:${requestBody}`;
  const signature = crypto
    .createHmac("sha256", signingSecret)
    .update(signatureBaseString, "utf8")
    .digest("hex");
  return `v0=${signature}`;
};

interface Request {
  challenge?: string;
}

export const webhook = trigger({
  display: {
    label: "Events API Webhook",
    description:
      "Receive and validate event notifications from Slack's Events API for manually configured webhook subscriptions. Handles URL verification challenges automatically.",
  },
  allowsBranching: true,
  staticBranchNames: ["Notification", "URL Verify", "Management"],
  perform: async (context, payload, params) => {
    const bypassHeader = util.types.toBool(
      payload.headers?.["prismatic-bypass-challenge"] || false
    );
    if (bypassHeader || context.isSimulatedTestExecution) {
      return Promise.resolve({
        payload,
        branch: "Management",
      });
    }

    
    
    const signingSecret = util.types.toString(
      params.slackConnection.fields.signingSecret
    );
    const requestBody = util.types.toString(payload.rawBody.data);
    const timestamp = util.types.toInt(
      payload.headers["X-Slack-Request-Timestamp"]
    );
    const computedSignature = computeSignature(
      requestBody,
      signingSecret,
      timestamp
    );
    const payloadSignature = util.types.toString(
      payload.headers["X-Slack-Signature"]
    );
    if (payloadSignature !== computedSignature) {
      throw new Error(
        "Error validating message signature. Check your signing secret and verify that this message came from Slack."
      );
    }

    
    
    const challenge = (payload.body.data as Request)?.challenge;
    const response: HttpResponse = {
      statusCode: 200,
      contentType: "text/plain",
      body: challenge,
    };

    return Promise.resolve({
      payload,
      response,
      branch: challenge ? "URL Verify" : "Notification",
    });
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
