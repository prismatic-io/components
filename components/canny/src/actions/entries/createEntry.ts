import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createEntryExamplePayload } from "../../examplePayloads";
import { createEntryInputs } from "../../inputs";

export const createEntry = action({
  display: {
    label: "Create Changelog Entry",
    description: "Creates a new changelog entry.",
  },
  inputs: createEntryInputs,
  perform: async (
    context,
    {
      connection,
      entryTitle,
      entryDetails,
      entryType,
      notify,
      published,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/entries/create", {
      title: entryTitle,
      details: entryDetails,
      type: entryType,
      notify,
      published,
      additionalFields,
    });
    return { data };
  },
  examplePayload: createEntryExamplePayload,
});
