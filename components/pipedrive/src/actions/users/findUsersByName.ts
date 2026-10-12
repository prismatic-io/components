import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { findUsersByNameInputs } from "../../inputs";
import { findUsersByNameExamplePayload } from "../../examplePayloads";
import { findUsersByNameOutputSchema } from "../../outputSchemas";
export const findUsersByName = action({
  display: {
    label: "Find Users By Name",
    description: "Finds users by name.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, term, searchByEmail }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/users/find", {
      params: { term, search_by_email: searchByEmail },
    });
    return { data };
  },
  inputs: findUsersByNameInputs,
  examplePayload: findUsersByNameExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: findUsersByNameOutputSchema,
  }),
});
