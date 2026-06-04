import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, jsonInput } from "../inputs";
import { accountSignatureJson } from "../json/accountSignatureJson";

export const createAccountSignature = action({
  display: {
    label: "Create Account Signature",
    description: "Adds or updates one or more account stamps.",
  },
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.post(`/signatures`, jsonInput);
    return { data };
  },
  inputs: {
    connection,
    jsonInput: {
      ...jsonInput,
      required: true,
      default: JSON.stringify(accountSignatureJson, null, 2),
      comments:
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/accounts/accountsignatures/createaccountsignatures/",
    },
  },
});
