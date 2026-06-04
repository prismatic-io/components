import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { EMAIL_DEFINITIONS_PATH } from "../../constants";
import { createEmailDefinitionExamplePayload } from "../../examplePayloads";
import { createEmailDefinitionInputs } from "../../inputs";

export const createEmailDefinition = action({
  examplePayload: createEmailDefinitionExamplePayload,
  display: {
    label: "Create Email Definition",
    description: "Create a new transactional email send definition.",
  },
  inputs: createEmailDefinitionInputs,
  perform: async (
    context,
    {
      connection,
      emailDefinitionKey,
      emailDefinitionName,
      emailDefinitionDescription,
      emailContentCustomerKey,
      emailDefinitionExtraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      definitionKey: emailDefinitionKey,
      name: emailDefinitionName,
      description: emailDefinitionDescription,
      content: { customerKey: emailContentCustomerKey },
      ...emailDefinitionExtraBody,
    };

    const { data } = await client.post(EMAIL_DEFINITIONS_PATH, body);

    return { data };
  },
});
