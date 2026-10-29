import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { deleteCandidateV3ExamplePayload } from "../../../examplePayloads/v3/candidates";
import { deleteCandidateV3Inputs } from "../../../inputs/v3/candidates";

export const deleteCandidateV3 = action({
  display: {
    label: "Delete Candidate",
    description: "Permanently deletes a candidate and all associated records.",
  },
  inputs: deleteCandidateV3Inputs,
  perform: async (context, { connection, candidateId }) => {
    const client = createV3Client(connection, context.debug.enabled);
    const { data } = await client.delete(`/candidates/${candidateId}`);
    return { data };
  },
  examplePayload: deleteCandidateV3ExamplePayload,
});
