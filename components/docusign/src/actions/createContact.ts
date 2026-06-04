import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, jsonInput } from "../inputs";
import { contactJson } from "../json/contactJson";
import { createContactPayload } from "../examplePayloads";

export const createContact = action({
  display: {
    label: "Create Contact",
    description: "This method adds multiple contacts into a contacts list.",
  },
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.post(`/contacts`, jsonInput);
    return { data };
  },
  inputs: {
    connection,
    jsonInput: {
      ...jsonInput,
      required: true,
      default: JSON.stringify(contactJson, null, 2),
      comments:
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/users/contacts/create/",
    },
  },
  examplePayload: createContactPayload,
});
