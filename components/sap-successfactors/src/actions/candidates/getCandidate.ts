import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCandidateExamplePayload as getCandidateExamplePayload } from "../../examplePayloads";
import { getCandidateInputs } from "../../inputs";
import { cleanResultFromResponse } from "../../util";

export const getCandidate = action({
  display: {
    label: "Get Candidate",
    description: "Retrieve a candidate by ID.",
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
