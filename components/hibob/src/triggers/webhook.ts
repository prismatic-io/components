import crypto from "node:crypto";
import { trigger, util } from "@prismatic-io/spectral";
import { webhookInputs } from "../inputs";
import { WebhookBranch } from "../types/webhookTypes";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from HiBob for manually configured webhook subscriptions.",
  },
  allowsBranching: true,
  staticBranchNames: [WebhookBranch.PingTest, WebhookBranch.EventNotification],
  perform: async (_context, payload, { appSecret }) => {
    const body = util.types.toString(payload.rawBody.data);

    
    if (body === "Ping test" || body === '{"text":"Ping test"}') {
      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          body: "OK",
        },
        branch: WebhookBranch.PingTest,
      });
    }

    
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const signature = headers["bob-signature"];

    if (!signature) {
      throw new Error("Missing Bob signature");
    }

    
    const hmac = crypto.createHmac("sha512", appSecret);
    const computedSignature = hmac
      .update(Buffer.from(body, "utf-8"))
      .digest("base64");

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
