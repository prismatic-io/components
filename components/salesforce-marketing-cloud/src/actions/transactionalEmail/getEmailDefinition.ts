import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { EMAIL_DEFINITIONS_PATH } from "../../constants";
import { getEmailDefinitionExamplePayload } from "../../examplePayloads";
import { getEmailDefinitionInputs } from "../../inputs";
import { emailDefinitionOutputSchema } from "../../outputSchemas";
export const getEmailDefinition = action({
  examplePayload: getEmailDefinitionExamplePayload,
  display: {
    label: "Get Email Definition",
    description: "Retrieve a transactional email send definition by key.",
  },
  inputs: getEmailDefinitionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emailDefinitionOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, emailDefinitionKey }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${EMAIL_DEFINITIONS_PATH}/${encodeURIComponent(emailDefinitionKey)}`,
    );
    return { data };
  },
});
