import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCandidateExamplePayload } from "../../examplePayloads";
import {
  addresses,
  applications,
  company,
  connectionInput,
  custom_fields,
  educations,
  email_addresses,
  employments,
  first_name,
  last_name,
  on_behalf_of_user_id,
  phone_numbers,
  social_media_addresses,
  tags,
  title,
  version,
  website_addresses,
} from "../../inputs";
import { generatePayload } from "../../util";

export const createCandidate = action({
  display: {
    label: "Create Candidate",
    description: "Creates a new candidate.",
  },
  perform: async (context, { connection, version, user_id, ...params }) => {
    const client = createClient(connection, version, context.debug.enabled);
    const candidatePayload = generatePayload(params);
    const { data } = await client.post(`/candidates`, candidatePayload, {
      headers: {
        "On-Behalf-Of": user_id,
        "Content-Type": "application/json",
      },
    });
    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    version,
    user_id: on_behalf_of_user_id,
    first_name: { ...first_name, comments: "The candidate's first name" },
    last_name: { ...last_name, comments: "The candidate's last name" },
    applications,
    company,
    title,
    phone_numbers,
    addresses,
    email_addresses,
    website_addresses,
    social_media_addresses,
    educations,
    employments,
    tags,
    custom_fields,
  },
  examplePayload: createCandidateExamplePayload,
});
