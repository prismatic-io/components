import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { createCandidateV3ExamplePayload } from "../../../examplePayloads/v3/candidates";
import { createCandidateV3Inputs } from "../../../inputs/v3/candidates";
import { generatePayload } from "../../../util";
export const createCandidateV3 = action({
  display: {
    label: "Create Candidate",
    description: "Creates a new candidate, optionally with an application.",
  },
  inputs: createCandidateV3Inputs,
  perform: async (
    context,
    {
      connection,
      firstName,
      lastName,
      preferredName,
      company,
      title,
      timeZone,
      canEmail,
      contactInformation = {},
      tags,
      linkedUserIds,
      customFields,
      application,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const body = generatePayload({
      first_name: firstName,
      last_name: lastName,
      preferred_name: preferredName,
      company,
      title,
      time_zone: timeZone,
      can_email: canEmail,
      phone_numbers: contactInformation.phoneNumbers,
      addresses: contactInformation.addresses,
      email_addresses: contactInformation.emailAddresses,
      website_addresses: contactInformation.websiteAddresses,
      social_media_addresses: contactInformation.socialMediaAddresses,
      tags,
      linked_user_ids: linkedUserIds,
      custom_fields: customFields,
      application,
    });
    const { data } = await client.post("/candidates", body);
    return { data };
  },
  examplePayload: createCandidateV3ExamplePayload,
});
