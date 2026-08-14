import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CONTACTS_ESTABLISH_PATH } from "../../constants";
import { getContactExamplePayload } from "../../examplePayloads";
import { getContactInputs } from "../../inputs";
import { getContactOutputSchema } from "../../outputSchemas";
export const getContact = action({
  examplePayload: getContactExamplePayload,
  display: {
    label: "Get Contact",
    description: "Retrieve a contact by contact key.",
  },
  inputs: getContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getContactOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, contactKey }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(CONTACTS_ESTABLISH_PATH, {
      contactKeys: [contactKey],
    });
    const contact = data?.items?.[0]?.value?.contactReference || null;
    return { data: contact };
  },
  examplePerform: async (
    _context,
    { contactKey },
  ): Promise<{
    data: unknown;
  }> => ({
    data: { ...getContactExamplePayload.data, contactKey },
  }),
});
