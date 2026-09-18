import crypto from "node:crypto";
import { trigger, util } from "@prismatic-io/spectral";
import { dropboxWebhookExamplePayload } from "../examplePayloads";
import { dropboxWebhookInputs } from "../inputs";
export const dropboxWebhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Dropbox for webhooks you configure.",
  },
  allowsBranching: true,
  staticBranchNames: ["Notification", "Verification Request"],
  inputs: dropboxWebhookInputs,
  perform: async (context, payload, params) => {
    if (payload.queryParameters?.challenge) {
      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          contentType: "text/plain",
          body: payload.queryParameters.challenge,
        },
        branch: "Verification Request",
      });
    }
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({
        payload,
        branch: "Notification",
      });
    }
    const requestBody = util.types.toString(payload.rawBody.data);
    const computedSignature = crypto
      .createHmac("sha256", params.signingSecret)
      .update(requestBody, "utf8")
      .digest("hex");
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const payloadSignature = util.types.toString(
      headers["x-dropbox-signature"],
    );
    if (payloadSignature !== computedSignature) {
      throw new Error(
        "Error validating message signature. Check your signing secret and verify that this message came from Dropbox.",
      );
    }
    return Promise.resolve({
      payload,
      branch: "Notification",
    });
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: dropboxWebhookExamplePayload,
});
