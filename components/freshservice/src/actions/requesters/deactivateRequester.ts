import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deactivateRequesterExamplePayload as examplePayload } from "../../examplePayloads";
import { deactivateRequesterInputs as inputs } from "../../inputs";
import { successOutputSchema } from "../../outputSchemas";
export const deactivateRequester = action({
  display: {
    label: "Deactivate Requester",
    description: "Deactivates a requester by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, requesterId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    await client.delete(`/requesters/${requesterId}`);
    return SUCCESS_RESPONSE;
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: successOutputSchema,
  }),
  inputs,
  examplePayload,
});
