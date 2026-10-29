import { trigger, util } from "@prismatic-io/spectral";
import { webhookSecretToken } from "./inputs";
import { computeZoomVerifyHash } from "./util";
import type { WebhookValidationBody } from "./interfaces/WebhookValidationBody";

export const webhookReceiver = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Zoom for webhooks you configure.",
  },
  allowsBranching: true,
  staticBranchNames: ["Notification", "URL Verify"],
  perform: async (context, payload, params) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({
        payload,
        branch: "Notification",
        response: {
          contentType: "text/plain; charset=utf-8",
          statusCode: 200,
        },
      });
    }

    const ENDPOINT_VALIDATION_EVENT = "endpoint.url_validation";
    const { body, headers } = payload;
    const webhookSecretToken = util.types.toString(params.webhookSecretToken);
    const zoomRequestBody = util.types.toObject(
      body.data,
    ) as WebhookValidationBody;

    const {
      "x-zm-signature": zoomSignature,
      "x-zm-request-timestamp": zoomRequestTimestamp,
    } = util.types.lowerCaseHeaders(headers);

    const message = `v0:${zoomRequestTimestamp}:${JSON.stringify(
      zoomRequestBody,
    )}`;
    const verifyHash = `v0=${computeZoomVerifyHash(
      webhookSecretToken,
      message,
    )}`;

    if (verifyHash !== zoomSignature) {
      throw new Error(
        "Zoom signature doesn't match computed signature, request does not come from Zoom or invalid signature.",
      );
    }

    if (zoomRequestBody.event === ENDPOINT_VALIDATION_EVENT) {
      const plainToken = zoomRequestBody.payload.plainToken;
      const validationHash = computeZoomVerifyHash(
        webhookSecretToken,
        plainToken,
      );

      return Promise.resolve({
        payload,
        branch: "URL Verify",
        response: {
          statusCode: 200,
          contentType: "application/json",
          body: JSON.stringify({
            plainToken,
            encryptedToken: validationHash,
          }),
        },
      });
    }

    return Promise.resolve({
      payload,
      branch: "Notification",
      response: {
        contentType: "text/plain; charset=utf-8",
        statusCode: 200,
      },
    });
  },
  inputs: { webhookSecretToken },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
