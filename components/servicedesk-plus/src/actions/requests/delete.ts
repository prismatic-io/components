import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteRequestResponse as examplePayload } from "../../examplePayloads";
import { deleteRequestInputs as inputs } from "../../inputs";

export const deleteRequest = action({
  display: {
    label: "Delete Request",
    description: "Delete a request by ID",
  },
  inputs,
  perform: async (context, { connectionInput, toDeleteRequestId }) => {
    const client = createClient(connectionInput, context.debug.enabled);

    const { data } = await client.delete(`/requests/${toDeleteRequestId}`);
    return { data };
  },
  examplePayload,
});
