import { action } from "@prismatic-io/spectral";
import { getAgreementInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { AgreementInfo } from "../../types";
import { getAgreementExamplePayload } from "../../examplePayloads";

export const getAgreement = action({
  display: {
    label: "Get Agreement",
    description: "Retrieves the current status of an agreement.",
  },
  inputs: getAgreementInputs,
  perform: async (context, { connection, agreementId }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const { data } = await client.get<AgreementInfo>(
      `/agreements/${agreementId}`,
    );

    return { data };
  },
  examplePayload: getAgreementExamplePayload,
});
