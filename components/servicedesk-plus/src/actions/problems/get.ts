import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProblemResponse as examplePayload } from "../../examplePayloads";
import { getProblemInputs as inputs } from "../../inputs";

export const getProblem = action({
  display: {
    label: "Get Problem",
    description: "Get a problem by ID",
  },
  inputs,
  perform: async (context, { connectionInput, toGetProblemId }) => {
    const client = createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(`/problems/${toGetProblemId}`);
    return { data };
  },
  examplePayload,
});
