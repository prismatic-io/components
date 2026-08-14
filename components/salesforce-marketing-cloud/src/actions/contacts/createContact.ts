import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CONTACTS_PATH } from "../../constants";
import { createContactExamplePayload } from "../../examplePayloads";
import { createContactInputs } from "../../inputs";
import { createContactOutputSchema } from "../../outputSchemas";
export const createContact = action({
  examplePayload: createContactExamplePayload,
  display: {
    label: "Create Contact",
    description: "Create a new contact in Marketing Cloud.",
  },
  inputs: createContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createContactOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, contactKey, attributeSets }) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      contactKey,
      attributeSets,
    };
    const { data } = await client.post(CONTACTS_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { contactKey },
  ): Promise<{
    data: unknown;
  }> => ({
    data: { ...createContactExamplePayload.data, contactKey },
  }),
});
