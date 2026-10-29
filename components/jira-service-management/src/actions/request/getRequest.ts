import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getRequestExamplePayload } from "../../examplePayloads";
import { getRequestInputs } from "../../inputs";

export const getRequest = action({
  display: {
    label: "Get Request",
    description: "Returns a single service request by issue ID or key.",
  },
  inputs: getRequestInputs,
  perform: async (context, { connection, issueIdOrKey }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/request/${issueIdOrKey}`);
    return { data };
  },
  examplePayload: getRequestExamplePayload,
});
