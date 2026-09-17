import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getRequesterExamplePayload as examplePayload } from "../../examplePayloads";
import { getRequesterInputs as inputs } from "../../inputs";
import { requesterOutputSchema } from "../../outputSchemas";
export const getRequester = action({
  display: {
    label: "Get Requester",
    description: "Retrieves details of a requester by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, requesterId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/requesters/${requesterId}`);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requesterOutputSchema,
  }),
  inputs,
  examplePayload,
});
