import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listApplicationsExamplePayload as examplePayload } from "../../examplePayloads";
import { listApplicationsInputs as inputs } from "../../inputs/application";
import { getConsistencyLevelHeader, getValues } from "../../util";

export const listApplications = action({
  display: {
    label: "List Applications",
    description: "Retrieve the list of applications in the organization.",
  },
  perform: async (
    context,
    {
      connection,
      $count,
      $expand,
      $filter,
      $orderby,
      $search,
      $select,
      $top,
      eventualConsistencyLevelHeader,
      getAllPaginatedResults,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $count,
      $expand,
      $filter,
      $orderby,
      $search,
      $select,
      $top,
    };
    const { data } = await getValues(
      getAllPaginatedResults,
      client,
      `/applications`,
      {
        params,
        headers: getConsistencyLevelHeader(eventualConsistencyLevelHeader),
      },
    );
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
