import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { createCustomObjectExamplePayload } from "../../../examplePayloads";
import { createCustomObjectInputs } from "../../../inputs";

export const createCustomObject = action({
  display: {
    label: "Create Custom Object (V2)",
    description: "Create a new custom object.",
  },
  inputs: createCustomObjectInputs,
  examplePayload: createCustomObjectExamplePayload,
  perform: async (context, { connection, name, description, category }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.post("/custom-objects/", {
      name,
      description,
      category,
    });
    return { data };
  },
});
