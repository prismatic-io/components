import crypto from "node:crypto";
import { trigger, util } from "@prismatic-io/spectral";
import { ensWebhookInputs } from "../inputs";
import type { EnsBodyData, EnsVerificationRequest } from "../types";




























export const ensWebhook = trigger({
  display: {
    label: "ENS Webhook",
    description:
      "Receive event notifications from Salesforce Marketing Cloud Event Notification Service (ENS). Requires manual setup of ENS callback and subscription using the provided actions.",
  },
  allowsBranching: false,
  inputs: ensWebhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: async (context, payload, { signatureKey }) => {
    const headers = util.types.lowerCaseHeaders(payload.headers);

    
    
    const bodyData = payload.body?.data as EnsBodyData | undefined;
    if (bodyData?.verificationKey && bodyData?.callbackId) {
      context.logger.info(
        `Verification request received from ENS for callback ${bodyData.callbackId}`,
      );

      
      const verificationResponse: EnsVerificationRequest = {
        callbackId: bodyData.callbackId,
        verificationKey: bodyData.verificationKey,
      };

      return {
        payload: {
          ...payload,
          body: {
            data: verificationResponse,
          },
        },
      };
    }

    
    if (!context.isSimulatedTestExecution) {
      const signature =
        headers["x-sfmc-ens-signature"] || headers["x-sfmc-hmac-sha256"];

      if (!signature) {
        throw new Error(
          "Missing signature header. This request may not be from Salesforce Marketing Cloud ENS.",
        );
      }

      if (signatureKey) {
        
        const rawBody = util.types.toString(payload.rawBody.data);

        
        
        const decodedKey = Buffer.from(signatureKey, "base64");

        
        const calculatedSignature = crypto
          .createHmac("sha256", decodedKey)
          .update(rawBody, "utf8")
          .digest("base64");

        
        if (calculatedSignature !== signature) {
          throw new Error(
            "Webhook signature verification failed. The request may have been tampered with.",
          );
        }

        context.logger.debug("ENS webhook signature verified successfully.");
      } else {
        context.logger.warn(
          "No signature key provided. Webhook signatures cannot be verified. Consider providing the signature key from ENS callback creation for enhanced security.",
        );
      }
    }

    return {
      payload,
    };
  },
});
