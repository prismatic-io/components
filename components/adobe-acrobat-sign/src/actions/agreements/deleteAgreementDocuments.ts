import { action } from "@prismatic-io/spectral";
import { deleteAgreementDocumentsInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import { deleteAgreementDocumentsExamplePayload } from "../../examplePayloads";

export const deleteAgreementDocuments = action({
  display: {
    label: "Delete Agreement Documents",
    description: "Deletes all the documents for an agreement.",
  },
  inputs: deleteAgreementDocumentsInputs,
  perform: async (context, { connection, agreementId }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    await client.delete(`/agreements/${agreementId}/documents`);

    return {
      data: null,
    };
  },
  examplePayload: deleteAgreementDocumentsExamplePayload,
});
