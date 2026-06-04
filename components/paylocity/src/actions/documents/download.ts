import { action } from "@prismatic-io/spectral";
import { createClient, validateV1Connection } from "../../client";
import { companyId, connectionInput, documentId } from "../../inputs";

export const downloadDocument = action({
  display: {
    label: "Download Document",
    description: "Download a document by ID",
  },
  inputs: {
    connectionInput,
    companyId,
    documentId,
  },
  perform: async (context, { connectionInput, companyId, documentId }) => {
    validateV1Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.post(
      `/documents/v1/companies/${companyId}/documents/${documentId}/downloads`,
    );
    return {
      data,
    };
  },
});
