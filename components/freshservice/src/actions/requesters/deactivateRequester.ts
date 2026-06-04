import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deactivateRequesterExamplePayload as examplePayload } from "../../examplePayloads";
import { deactivateRequesterInputs as inputs } from "../../inputs/requesters";

export const deactivateRequester = action({
  display: {
    label: "Deactivate Requester",
    description: "Deactivates a requester by ID.",
  },
  perform: async (context, { connection, requesterId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    await client.delete(`/requesters/${requesterId}`);

    return SUCCESS_RESPONSE;
  },
  inputs,
  examplePayload,
});
