import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCandidateExamplePayload as getCandidateExamplePayload } from "../../examplePayloads/candidate";
import { getCandidateInputs } from "../../inputs/candidates";
import { cleanResultFromResponse } from "../../util";

export const getCandidate = action({
  display: {
    label: "Get Candidate",
    description: "Get entity from Candidate by key",
  },
  inputs: getCandidateInputs,
  perform: async (context, { connection, candidateId, $select }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/Candidate('${candidateId}')`, {
      params: {
        $select,
      },
    });
    return {
      data: cleanResultFromResponse(data),
    };
  },
  examplePayload: getCandidateExamplePayload,
});
