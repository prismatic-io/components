import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getMessageTemplateByIdExamplePayload } from "../../examplePayloads";
import { getMessageTemplateByIdInputs } from "../../inputs";
import { getMessageTemplateByIdOutputSchema } from "../../outputSchemas";
export const getMessageTemplateById = action({
  display: {
    label: "Get Message Template by ID",
    description: "Retrieves a message template by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, messageTemplateId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.connect}/messageTemplates/${messageTemplateId}`,
    );
    return {
      data,
    };
  },
  inputs: getMessageTemplateByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getMessageTemplateByIdOutputSchema,
  }),
  examplePayload: getMessageTemplateByIdExamplePayload,
});
