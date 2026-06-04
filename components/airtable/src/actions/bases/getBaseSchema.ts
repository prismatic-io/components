import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { getBaseSchemaExamplePayload } from "../../examplePayloads";
import { getBaseSchemaInputs } from "../../inputs";

export const getBaseSchema = action({
  display: {
    label: "Get Base Schema",
    description: "Retrieve the schema of all tables within a base.",
  },
  inputs: getBaseSchemaInputs,
  perform: async (context, params) => {
    const client = createAirtableClient(
      params.airtableConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/v0/meta/bases/${params.baseId}/tables`);
    return { data };
  },
  examplePayload: getBaseSchemaExamplePayload,
});
