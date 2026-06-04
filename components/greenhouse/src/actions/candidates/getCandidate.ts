import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCandidateExamplePayload } from "../../examplePayloads";
import { candidate_id, connectionInput, version } from "../../inputs";

export const getCandidate = action({
  display: {
    label: "Get Candidate",
    description: "Retrieves a candidate by ID.",
  },
  perform: async (context, { connection, version, candidate_id }) => {
    const client = createClient(connection, version, context.debug.enabled);
    const { data } = await client.get(`/candidates/${candidate_id}`);
    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    version,
    candidate_id: { ...candidate_id, required: true },
  },
  examplePayload: getCandidateExamplePayload,
});
