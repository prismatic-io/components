import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { createObjectCategoryExamplePayload } from "../../../examplePayloads";
import { createObjectCategoryInputs } from "../../../inputs";

export const createObjectCategory = action({
  display: {
    label: "Create Object Category (V2)",
    description: "Create a new object category.",
  },
  inputs: createObjectCategoryInputs,
  examplePayload: createObjectCategoryExamplePayload,
  perform: async (context, { connection, name, description }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.post("/object-categories/", {
      name,
      description,
    });
    return { data };
  },
});
