import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { EMAIL_DEFINITIONS_PATH } from "../../constants";
import { updateEmailDefinitionExamplePayload } from "../../examplePayloads";
import { updateEmailDefinitionInputs } from "../../inputs";
import { emailDefinitionOutputSchema } from "../../outputSchemas";
export const updateEmailDefinition = action({
  examplePayload: updateEmailDefinitionExamplePayload,
  display: {
    label: "Update Email Definition",
    description:
      "Update a transactional email send definition by key. Changes are applied automatically.",
  },
  inputs: updateEmailDefinitionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emailDefinitionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      emailDefinitionKey,
      emailDefinitionName,
      emailDefinitionDescription,
      emailDefinitionExtraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body: Record<string, unknown> = {
      ...(emailDefinitionExtraBody as Record<string, unknown>),
    };
    if (emailDefinitionName) body.name = emailDefinitionName;
    if (emailDefinitionDescription)
      body.description = emailDefinitionDescription;
    const { data } = await client.patch(
      `${EMAIL_DEFINITIONS_PATH}/${emailDefinitionKey}`,
      body,
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { emailDefinitionKey, emailDefinitionName, emailDefinitionDescription },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateEmailDefinitionExamplePayload.data,
      definitionKey: emailDefinitionKey,
      name:
        emailDefinitionName ?? updateEmailDefinitionExamplePayload.data.name,
      description:
        emailDefinitionDescription ??
        updateEmailDefinitionExamplePayload.data.description,
    },
  }),
});
