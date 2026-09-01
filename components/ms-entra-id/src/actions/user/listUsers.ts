import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUsersExamplePayload as examplePayload } from "../../examplePayloads";
import { listUsersInputs as inputs } from "../../inputs/user";
import { getConsistencyLevelHeader, getValues } from "../../util";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "Retrieve a list of user objects.",
  },
  perform: async (
    context,
    {
      connection,
      odataQueryParams,
      getAllPaginatedResults,
      eventualConsistencyLevelHeader,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter: odataQueryParams.$filter,
      $select: odataQueryParams.$select,
      $expand: odataQueryParams.$expand,
      $orderby: odataQueryParams.$orderby,
      $top: odataQueryParams.$top,
      $count: odataQueryParams.$count,
      $search: odataQueryParams.$search,
    };
    const { data } = await getValues(getAllPaginatedResults, client, `/users`, {
      params,
      headers: getConsistencyLevelHeader(eventualConsistencyLevelHeader),
    });
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
