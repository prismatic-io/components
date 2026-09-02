import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createEntryExamplePayload } from "../../examplePayloads";
import { createEntryInputs } from "../../inputs";
import { createEntryOutputSchema } from "../../outputSchemas";
export const createEntry = action({
  display: {
    label: "Create Changelog Entry",
    description: "Creates a new changelog entry.",
  },
  inputs: createEntryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createEntryOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, entryTitle, entryDetails, entryType, additionalFields },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/entries/create", {
      title: entryTitle,
      details: entryDetails,
      type: entryType,
      notify: additionalFields.notify,
      published: additionalFields.published,
      ...additionalFields.additionalFields,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createEntryExamplePayload,
  examplePayload: createEntryExamplePayload,
});
