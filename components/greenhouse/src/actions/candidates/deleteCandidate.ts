import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCandidateExamplePayload } from "../../examplePayloads";
import {
  candidate_id,
  connectionInput,
  on_behalf_of_user_id,
  version,
} from "../../inputs";

export const deleteCandidate = action({
  display: {
    label: "Delete Candidate",
    description: "Deletes a candidate by ID.",
  },
  perform: async (context, { connection, version, candidate_id, user_id }) => {
    const client = createClient(connection, version, context.debug.enabled);
    const { data } = await client.delete(`/candidates/${candidate_id}`, {
      headers: {
        "On-Behalf-Of": user_id,
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
    candidate_id: {
      ...candidate_id,
      required: true,
      comments: "ID of the candidate to delete.",
    },
  },
  examplePayload: deleteCandidateExamplePayload,
});
