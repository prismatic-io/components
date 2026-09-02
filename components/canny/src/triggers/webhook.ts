import crypto from "node:crypto";
import { trigger, util } from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";
import { validateConnection } from "../util";
export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receives webhook events from Canny when configured events occur.",
  },
  inputs: webhookInputs,
  perform: async (context, payload, { connection }) => {
    if (context.isSimulatedTestExecution) {
      return { payload };
    }
    const apiKey = validateConnection(connection);
    const headers = util.types.lowerCaseHeaders(
      payload.headers as Record<string, string>,
    );
    const nonce = util.types.toString(headers["canny-nonce"]);
    const signature = util.types.toString(headers["canny-signature"]);
    const calculated = crypto
      .createHmac("sha256", apiKey)
      .update(nonce)
      .digest("base64");
    if (signature !== calculated) {
      throw new Error("Invalid Canny webhook signature");
    }
    return { payload };
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookExamplePayload,
});
