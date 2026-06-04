import { action } from "@prismatic-io/spectral";
import { createAgreementInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { ParticipantSetInfo, Role } from "../../types";
import { createAgreementExamplePayload } from "../../examplePayloads";

export const createAgreement = action({
  display: {
    label: "Create Agreement",
    description:
      "Creates an agreement. Sends it out for signatures and " +
      "returns the agreementId in the response to the client.",
  },
  inputs: createAgreementInputs,
  perform: async (
    context,
    {
      additionalAgreementParticipants,
      agreementName,
      agreementState,
      connection,
      participantMemberInfoEmail,
      signatureType,
      transientDocumentId,
      participantsSetInfoRole,
    },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const participantSetsInfo: ParticipantSetInfo[] = [
      {
        memberInfos: [
          {
            email: participantMemberInfoEmail,
          },
        ],
        order: 1,
        role: participantsSetInfoRole as Role,
      },
    ];

    if (additionalAgreementParticipants) {
      participantSetsInfo.push(
        ...(additionalAgreementParticipants as ParticipantSetInfo[]),
      );
    }

    const payload = {
      fileInfos: [
        {
          transientDocumentId,
        },
      ],
      name: agreementName,
      participantSetsInfo,
      signatureType,
      state: agreementState,
    };

    const {
      data: { id },
    } = await client.post("/agreements", payload);

    return {
      data: id,
    };
  },
  examplePayload: createAgreementExamplePayload,
});
