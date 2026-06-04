import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createApplicationExamplePayload as examplePayload } from "../../examplePayloads";
import { createApplicationInputs as inputs } from "../../inputs/application";

export const createApplication = action({
  display: {
    label: "Create Application",
    description: "Creates (registers) a new application.",
  },
  perform: async (
    context,
    { connection, displayName, additionalProperties },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      displayName,
      ...(additionalProperties || {}),
    };
    const { data } = await client.post(`/applications`, payload);
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
