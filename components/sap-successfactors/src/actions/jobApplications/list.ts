import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listJobApplicationsExamplePayload } from "../../examplePayloads/jobApplications";
import { defaultListInputs } from "../../inputs/general";
import { paginateData } from "../../util";

export const listJobApplications = action({
  display: {
    label: "List Job Applications",
    description: "Get entities from JobApplication",
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
    const data = await paginateData(client, "/JobApplication", fetchAll, {
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
  examplePayload: listJobApplicationsExamplePayload,
});
