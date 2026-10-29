import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCandidatesExamplePayload } from "../../examplePayloads";
import { defaultListInputs } from "../../inputs";
import { paginateData } from "../../util";

export const listCandidates = action({
  display: {
    label: "List Candidates",
    description: "List candidates.",
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
