import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SMS_DEFINITIONS_PATH } from "../../constants";
import { createSmsDefinitionExamplePayload } from "../../examplePayloads";
import { createSmsDefinitionInputs } from "../../inputs";
import { smsDefinitionOutputSchema } from "../../outputSchemas";
export const createSmsDefinition = action({
  examplePayload: createSmsDefinitionExamplePayload,
  display: {
    label: "Create SMS Definition",
    description: "Create a new transactional SMS send definition.",
  },
  inputs: createSmsDefinitionInputs,
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
    const body = {
      definitionKey: smsDefinitionKey,
      name: smsDefinitionName,
      description: smsDefinitionDescription,
      ...smsDefinitionExtraBody,
    };
    const { data } = await client.post(SMS_DEFINITIONS_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { smsDefinitionKey, smsDefinitionName, smsDefinitionDescription },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createSmsDefinitionExamplePayload.data,
      definitionKey: smsDefinitionKey,
      name: smsDefinitionName,
      description:
        smsDefinitionDescription ??
        createSmsDefinitionExamplePayload.data.description,
    },
  }),
});
