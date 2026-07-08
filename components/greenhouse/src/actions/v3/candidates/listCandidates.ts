import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { listCandidatesV3ExamplePayload } from "../../../examplePayloads/v3/candidates";
import { listCandidatesV3Inputs } from "../../../inputs/v3/candidates";
import type { V3Candidate } from "../../../types";
import { generatePayload, paginateV3 } from "../../../util";
export const listCandidatesV3 = action({
  display: {
    label: "List Candidates",
    description: "Retrieves a list of candidates.",
  },
  inputs: listCandidatesV3Inputs,
  perform: async (
    context,
    {
      connection,
      candidateIds,
      email,
      tag,
      isPrivate,
      dateRangeFilters = {},
      fetchAll,
      pagination: { perPage, cursor } = {},
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const filterParams = generatePayload({
      ids: candidateIds,
      email,
      tag,
      private: isPrivate,
      "created_at[gte]": dateRangeFilters.createdAtGte,
      "created_at[lte]": dateRangeFilters.createdAtLte,
      "updated_at[gte]": dateRangeFilters.updatedAtGte,
      "updated_at[lte]": dateRangeFilters.updatedAtLte,
    });
    const data = await paginateV3<V3Candidate>(
      client,
      "/candidates",
      fetchAll,
      { perPage, cursor, params: filterParams },
    );
    return { data };
  },
  examplePayload: listCandidatesV3ExamplePayload,
});
