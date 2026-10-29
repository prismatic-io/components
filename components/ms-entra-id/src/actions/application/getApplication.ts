import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getApplicationExamplePayload as examplePayload } from "../../examplePayloads";
import { getApplicationInputs as inputs } from "../../inputs/application";

export const getApplication = action({
  display: {
    label: "Get Application",
    description: "Read properties of an application object.",
  },
  perform: async (context, { connection, applicationObjectId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/applications/${applicationObjectId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
