import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCandidateExamplePayload } from "../../examplePayloads/candidate";
import { createCandidateInputs } from "../../inputs/candidates";
import { cleanResultFromResponse } from "../../util";

export const createCandidate = action({
  display: {
    label: "Create Candidate",
    description: "Add a new entity to Candidate",
  },
  inputs: createCandidateInputs,
  perform: async (
    context,
    { connection, additionalInputs, country, firstName, lastName, primaryEmail },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/Candidate`, {
      ...additionalInputs,
      firstName,
      lastName,
      primaryEmail,
      country,
    });
    return {
      data: cleanResultFromResponse(data),
    };
  },
  examplePayload: createCandidateExamplePayload,
});
