import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { getSMSExamplePayload } from "../../examplePayloads";
import { getSMSInputs } from "../../inputs";

export const getSMS = action({
  display: {
    label: "Get SMS",
    description: "Retrieve an SMS message by SID.",
  },
  perform: async (context, { sid, twilioConnection }) => {
    const twilioClient = createAuthorizedClient(
      twilioConnection,
      context.debug.enabled,
    );
    const result = await twilioClient.messages
      .get(util.types.toString(sid))
      .fetch();
    return {
      data: result.toJSON(),
    };
  },
  inputs: getSMSInputs,
  examplePayload: getSMSExamplePayload,
});
