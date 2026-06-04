import { action } from "@prismatic-io/spectral";
import { downloadAgreementFileInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import { downloadAgreementFileExamplePayload } from "../../examplePayloads";

export const downloadAgreementFile = action({
  display: {
    label: "Download Agreement PDF",
    description: "Downloads the PDF associated with an agreement.",
  },
  inputs: downloadAgreementFileInputs,
  perform: async (context, { agreementId, connection }) => {
    const client = getAdobeSignClient(
      connection,
      context.debug.enabled,
      "arraybuffer",
    );

    const { data } = await client.get(
      `/agreements/${agreementId}/combinedDocument`,
    );

    return { data };
  },
  examplePayload: downloadAgreementFileExamplePayload,
});
