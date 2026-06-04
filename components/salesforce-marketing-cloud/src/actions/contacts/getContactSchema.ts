import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CONTACTS_SCHEMA_PATH } from "../../constants";
import { getContactSchemaExamplePayload } from "../../examplePayloads";
import { getContactSchemaInputs } from "../../inputs";

export const getContactSchema = action({
  examplePayload: getContactSchemaExamplePayload,
  display: {
    label: "Get Contact Schema",
    description:
      "Retrieve the contact schema definition, including attribute sets and field definitions.",
  },
  inputs: getContactSchemaInputs,
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(CONTACTS_SCHEMA_PATH);

    return { data };
  },
});
