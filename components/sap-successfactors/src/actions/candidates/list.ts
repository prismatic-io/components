import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCandidatesExamplePayload } from "../../examplePayloads/candidate";
import { defaultListInputs } from "../../inputs/general";
import { paginateData } from "../../util";

export const listCandidates = action({
  display: {
    label: "List Candidates",
    description: "Get entities from Candidate",
  },
  inputs: defaultListInputs,
  perform: async (
    context,
    {
      connection,
      customQueryParams,
      fetchAll,
      $count,
      $filter,
      $orderby,
      $search,
      $select,
      $skip,
      $top,
    },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateData(client, "/Candidate", fetchAll, {
      $count,
      $filter,
      $orderby,
      $search,
      $select,
      $skip,
      $top,
      ...customQueryParams,
    });
    return {
      data,
    };
  },
  examplePayload: listCandidatesExamplePayload,
});
