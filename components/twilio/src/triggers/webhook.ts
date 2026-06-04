import { trigger } from "@prismatic-io/spectral";
import querystring from "node:querystring";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Twilio for manually configured webhook subscriptions.",
  },
  perform: async (context, payload) => {
    if (!Buffer.isBuffer(payload.body.data))
      return Promise.resolve({ payload });

    const bufferData: Buffer = payload.body.data;

    
    const urlEncodedString = bufferData.toString("utf-8");

    
    const json = querystring.parse(urlEncodedString);

    
    payload.body.data = json;

    return Promise.resolve({
      payload,
    });
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookExamplePayload,
});
