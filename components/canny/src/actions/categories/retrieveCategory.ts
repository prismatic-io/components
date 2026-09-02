import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { retrieveCategoryExamplePayload } from "../../examplePayloads";
import { retrieveCategoryInputs } from "../../inputs";
import { retrieveCategoryOutputSchema } from "../../outputSchemas";
export const retrieveCategory = action({
  display: {
    label: "Retrieve Category",
    description: "Retrieves a single category by ID.",
  },
  inputs: retrieveCategoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: retrieveCategoryOutputSchema,
  }),
  perform: async (context, { connection, categoryIdRequired }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/categories/retrieve", {
      id: categoryIdRequired,
    });
    return { data };
  },
  examplePayload: retrieveCategoryExamplePayload,
});
