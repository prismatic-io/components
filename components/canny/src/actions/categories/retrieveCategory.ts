import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { retrieveCategoryExamplePayload } from "../../examplePayloads";
import { retrieveCategoryInputs } from "../../inputs";

export const retrieveCategory = action({
  display: {
    label: "Retrieve Category",
    description: "Retrieves a single category by ID.",
  },
  inputs: retrieveCategoryInputs,
  perform: async (context, { connection, categoryIdRequired }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/categories/retrieve", {
      id: categoryIdRequired,
    });
    return { data };
  },
  examplePayload: retrieveCategoryExamplePayload,
});
