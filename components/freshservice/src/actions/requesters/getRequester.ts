import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getRequesterExamplePayload as examplePayload } from "../../examplePayloads";
import { getRequesterInputs as inputs } from "../../inputs/requesters";

export const getRequester = action({
  display: {
    label: "Get Requester",
    description: "Retrieves details of a requester by ID.",
  },
  perform: async (context, { connection, requesterId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await client.get(`/requesters/${requesterId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
