import { trigger, util } from "@prismatic-io/spectral";
import { webhookInputs } from "../inputs/webhookInputs";
import crypto from "crypto";

enum WebhookBranch {
  VerificationRequest = "Verification Request",
  EventNotification = "Event Notification",
}

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from WhatsApp Business for webhooks you configure.",
  },
  allowsBranching: true,
  staticBranchNames: [
    WebhookBranch.VerificationRequest,
    WebhookBranch.EventNotification,
  ],
  perform: async (context, payload, { verifyToken, appSecret }) => {
    const hubChallenge = payload.queryParameters?.["hub.challenge"] || null;
    const hubMode = payload.queryParameters?.["hub.mode"] || null;
    const hubVerifyToken =
      payload.queryParameters?.["hub.verify_token"] || null;

    if (hubChallenge && hubMode && hubVerifyToken) {
      if (hubVerifyToken !== verifyToken)
        throw new Error("Invalid verify token");

      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          body: util.types.toNumber(hubChallenge),
        },
        branch: WebhookBranch.VerificationRequest,
      });
    }

    const headers = util.types.lowerCaseHeaders(payload.headers);
    let signature = headers["x-hub-signature-256"];

    if (!signature) throw new Error("Missing signature");

    const body = util.types.toString(payload.rawBody.data);

    const computedSignature = crypto
      .createHmac("sha256", appSecret)
      .update(body)
      .digest("hex");

    signature = signature.replace("sha256=", "");

    if (computedSignature === signature) {
      return Promise.resolve({
        payload,
        branch: WebhookBranch.EventNotification,
      });
    }

    throw new Error("Invalid signature");
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
