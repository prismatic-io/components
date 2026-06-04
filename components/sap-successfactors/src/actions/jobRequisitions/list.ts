import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listJobRequisitionsExamplePayload } from "../../examplePayloads/jobRequisitions";
import { defaultListInputs } from "../../inputs/general";
import { paginateData } from "../../util";

export const listJobRequisitions = action({
  display: {
    label: "List Job Requisitions",
    description: "Get entities from JobRequisition",
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
    const data = await paginateData(client, "/JobRequisition", fetchAll, {
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
  examplePayload: listJobRequisitionsExamplePayload,
});
