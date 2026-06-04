import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getMessageTemplateByIdExamplePayload } from "../../examplePayloads";
import { getMessageTemplateByIdInputs } from "../../inputs";

export const getMessageTemplateById = action({
  display: {
    label: "Get Message Template by ID",
    description: "Retrieves a message template by ID.",
  },
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
  examplePayload: getMessageTemplateByIdExamplePayload,
});
