import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { sendSMSExamplePayload } from "../../examplePayloads";
import { sendSMSInputs } from "../../inputs";
import { createPayload } from "../../payload";

export const sendSMS = action({
  display: {
    label: "Send SMS",
    description: "Send an SMS message via Twilio.",
  },
  perform: async (context, { to, from, message, twilioConnection }) => {
    const twilioClient = createAuthorizedClient(
      twilioConnection,
      context.debug.enabled,
    );
    const payload = createPayload({
      to: util.types.toString(to),
      from: util.types.toString(from),
      message: util.types.toString(message),
    });

    const result = await twilioClient.messages.create(payload);
    return {
      data: result.toJSON(),
    };
  },
  inputs: sendSMSInputs,
  examplePayload: sendSMSExamplePayload,
});
