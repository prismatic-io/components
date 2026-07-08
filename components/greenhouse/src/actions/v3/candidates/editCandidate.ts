import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { editCandidateV3ExamplePayload } from "../../../examplePayloads/v3/candidates";
import { editCandidateV3Inputs } from "../../../inputs/v3/candidates";
import { generatePayload } from "../../../util";
export const editCandidateV3 = action({
  display: {
    label: "Edit Candidate",
    description: "Updates an existing candidate.",
  },
  inputs: editCandidateV3Inputs,
  perform: async (
    context,
    {
      connection,
      candidateId,
      nameInformation = {},
      contactInformation = {},
      company,
      title,
      timeZone,
      canEmail,
      isPrivateCandidate,
      tags,
      linkedUserIds,
      customFields,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const body = generatePayload({
      first_name: nameInformation.firstNameOptional,
      last_name: nameInformation.lastNameOptional,
      preferred_name: nameInformation.preferredName,
      company,
      title,
      time_zone: timeZone,
      can_email: canEmail,
      is_private: isPrivateCandidate,
      phone_numbers: contactInformation.phoneNumbers,
      addresses: contactInformation.addresses,
      email_addresses: contactInformation.emailAddresses,
      website_addresses: contactInformation.websiteAddresses,
      social_media_addresses: contactInformation.socialMediaAddresses,
      tags,
      linked_user_ids: linkedUserIds,
      custom_fields: customFields,
    });
    const { data } = await client.patch(`/candidates/${candidateId}`, body);
    return { data };
  },
  examplePayload: editCandidateV3ExamplePayload,
});
