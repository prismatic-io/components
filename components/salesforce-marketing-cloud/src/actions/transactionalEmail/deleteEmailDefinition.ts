import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { EMAIL_DEFINITIONS_PATH } from "../../constants";
import { deleteEmailDefinitionExamplePayload } from "../../examplePayloads";
import { deleteEmailDefinitionInputs } from "../../inputs";

export const deleteEmailDefinition = action({
  examplePayload: deleteEmailDefinitionExamplePayload,
  display: {
    label: "Delete Email Definition",
    description:
      "Delete a transactional email send definition by key. Deleted definitions are archived and cannot be restored.",
  },
  inputs: deleteEmailDefinitionInputs,
  perform: async (context, { connection, emailDefinitionKey }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.delete(
      `${EMAIL_DEFINITIONS_PATH}/${emailDefinitionKey}`,
    );

    return { data };
  },
});
