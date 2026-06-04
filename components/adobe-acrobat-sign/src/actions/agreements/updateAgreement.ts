import { action } from "@prismatic-io/spectral";
import { updateAgreementInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import { updateAgreementExamplePayload } from "../../examplePayloads";

export const updateAgreement = action({
  display: {
    label: "Update Agreement",
    description:
      "Updates the agreement in draft state, or update the expiration" +
      " time on an existing agreement that is already out for signature.",
  },
  inputs: updateAgreementInputs,
  perform: async (
    context,
    {
      agreementState,
      agreementName,
      connection,
      participantMemberInfoEmail,
      signatureType,
      transientDocumentId,
      participantsSetInfoRole,
      expirationDate,
      agreementId,
    },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const payload = {
      fileInfos: [
        {
          transientDocumentId,
        },
      ],
      name: agreementName,
      participantSetsInfo: [
        {
          memberInfos: [{ email: participantMemberInfoEmail }],
          order: 1,
          role: participantsSetInfoRole,
        },
      ],
      signatureType,
      state: agreementState,
      expirationDate,
    };

    const { data } = await client.put(`/agreements/${agreementId}`, payload);

    return {
      data,
    };
  },
  examplePayload: updateAgreementExamplePayload,
});
