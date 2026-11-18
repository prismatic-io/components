import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listApplicationsExamplePayload as examplePayload } from "../../examplePayloads";
import { listApplicationsInputs as inputs } from "../../inputs/application";
import { listApplicationsOutputSchema } from "../../outputSchemas";
import { getConsistencyLevelHeader, getValues } from "../../util";

export const listApplications = action({
  display: {
    label: "List Applications",
    description: "Retrieve the list of applications in the organization.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      odataQueryParams,
      eventualConsistencyLevelHeader,
      getAllPaginatedResults,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $count: odataQueryParams.$count,
      $expand: odataQueryParams.$expand,
      $filter: odataQueryParams.$filter,
      $orderby: odataQueryParams.$orderby,
      $search: odataQueryParams.$search,
      $select: odataQueryParams.$select,
      $top: odataQueryParams.$top,
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
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listApplicationsOutputSchema,
  }),
  examplePayload,
});
