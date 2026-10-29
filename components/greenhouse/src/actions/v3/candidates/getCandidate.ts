import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { getCandidateV3ExamplePayload } from "../../../examplePayloads/v3/candidates";
import { getCandidateV3Inputs } from "../../../inputs/v3/candidates";
import type { V3Candidate } from "../../../types";

export const getCandidateV3 = action({
  display: {
    label: "Get Candidate",
    description: "Retrieves a single candidate by ID.",
  },
  inputs: getCandidateV3Inputs,
  perform: async (context, { connection, candidateId }) => {
    const client = createV3Client(connection, context.debug.enabled);
    const { data } = await client.get<V3Candidate[]>("/candidates", {
      params: { ids: candidateId },
    });
    return { data: data[0] ?? null };
  },
  examplePayload: getCandidateV3ExamplePayload,
});
