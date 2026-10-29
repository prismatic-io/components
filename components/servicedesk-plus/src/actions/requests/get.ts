import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getRequestResponse as examplePayload } from "../../examplePayloads";
import { getRequestInputs as inputs } from "../../inputs";

export const getRequest = action({
  display: {
    label: "Get Request",
    description: "Get a request by ID",
  },
  inputs,
  perform: async (context, { connectionInput, toGetRequestId }) => {
    const client = createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(`/requests/${toGetRequestId}`);
    return { data };
  },
  examplePayload,
});
