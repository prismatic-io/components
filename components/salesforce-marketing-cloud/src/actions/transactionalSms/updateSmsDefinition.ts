import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SMS_DEFINITIONS_PATH } from "../../constants";
import { updateSmsDefinitionExamplePayload } from "../../examplePayloads";
import { updateSmsDefinitionInputs } from "../../inputs";
import { smsDefinitionOutputSchema } from "../../outputSchemas";
export const updateSmsDefinition = action({
  examplePayload: updateSmsDefinitionExamplePayload,
  display: {
    label: "Update SMS Definition",
    description:
      "Update a transactional SMS send definition by key. Changes may take up to two minutes to reflect in outbound messages.",
  },
  inputs: updateSmsDefinitionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: smsDefinitionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      smsDefinitionKey,
      smsDefinitionName,
      smsDefinitionDescription,
      smsDefinitionExtraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body: Record<string, unknown> = {
      ...(smsDefinitionExtraBody as Record<string, unknown>),
    };
    if (smsDefinitionName) body.name = smsDefinitionName;
    if (smsDefinitionDescription) body.description = smsDefinitionDescription;
    const { data } = await client.patch(
      `${SMS_DEFINITIONS_PATH}/${smsDefinitionKey}`,
      body,
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { smsDefinitionKey, smsDefinitionName, smsDefinitionDescription },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateSmsDefinitionExamplePayload.data,
      definitionKey: smsDefinitionKey,
      name: smsDefinitionName ?? updateSmsDefinitionExamplePayload.data.name,
      description:
        smsDefinitionDescription ??
        updateSmsDefinitionExamplePayload.data.description,
    },
  }),
});
