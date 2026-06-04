import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { NO_CONTENT_RESPONSE, NO_CONTENT_RESPONSE_TEXT } from "../../constants";
import { updateCandidateInputs } from "../../inputs/candidates";

export const updateCandidate = action({
  display: {
    label: "Update Candidate",
    description: "Update an entity in Candidate",
  },
  inputs: updateCandidateInputs,
  perform: async (
    context,
    { connection, additionalInputs, candidateId, country, firstName, lastName, primaryEmail },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.put(`/Candidate('${candidateId}')`, {
      ...additionalInputs,
      firstName,
      lastName,
      primaryEmail,
      country,
    });
    return {
      data: NO_CONTENT_RESPONSE_TEXT,
    };
  },
  examplePayload: NO_CONTENT_RESPONSE,
});
