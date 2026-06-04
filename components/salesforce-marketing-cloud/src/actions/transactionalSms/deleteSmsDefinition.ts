import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SMS_DEFINITIONS_PATH } from "../../constants";
import { deleteSmsDefinitionExamplePayload } from "../../examplePayloads";
import { deleteSmsDefinitionInputs } from "../../inputs";

export const deleteSmsDefinition = action({
  examplePayload: deleteSmsDefinitionExamplePayload,
  display: {
    label: "Delete SMS Definition",
    description:
      "Delete a transactional SMS send definition by key. Deleted definitions are archived and the key can be reused.",
  },
  inputs: deleteSmsDefinitionInputs,
  perform: async (context, { connection, smsDefinitionKey }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.delete(
      `${SMS_DEFINITIONS_PATH}/${smsDefinitionKey}`,
    );

    return { data };
  },
});
