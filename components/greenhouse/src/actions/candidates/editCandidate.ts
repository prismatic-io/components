import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { editCandidateExamplePayload } from "../../examplePayloads";
import {
  addresses,
  candidate_id,
  company,
  connectionInput,
  coordinator,
  custom_fields,
  email_addresses,
  first_name,
  is_private,
  last_name,
  on_behalf_of_user_id,
  phone_numbers,
  recruiter,
  social_media_addresses,
  tags,
  title,
  version,
  website_addresses,
} from "../../inputs";

import { generatePayload } from "../../util";

export const editCandidate = action({
  display: {
    label: "Edit Candidate",
    description: "Updates an existing candidate.",
  },
  perform: async (
    context,
    { connection, version, user_id, candidate_id, ...params },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const candidatePayload = generatePayload(params);
    console.log("candidatePayload", candidatePayload);
    const { data } = await client.patch(
      `/candidates/${candidate_id}`,
      candidatePayload,
      {
        headers: {
          "On-Behalf-Of": user_id,
        },
      },
    );
    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    version,
    user_id: on_behalf_of_user_id,
    candidate_id: { ...candidate_id, required: true },
    first_name: {
      ...first_name,
      comments: "The candidate's first name",
      required: false,
    },
    last_name: {
      ...last_name,
      comments: "The candidate's last name",
      required: false,
    },
    company,
    title,
    is_private,
    phone_numbers,
    addresses,
    email_addresses,
    website_addresses,
    social_media_addresses,
    tags,
    custom_fields,
    recruiter: {
      ...recruiter,
      comments: "An object representing the candidate's new recruiter",
    },
    coordinator: {
      ...coordinator,
      comments: "An object representing the candidate's new coordinator",
    },
  },
  examplePayload: editCandidateExamplePayload,
});
