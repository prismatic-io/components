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
      $filter,
      $select,
      $expand,
      $orderby,
      $top,
      getAllPaginatedResults,
      $count,
      $search,
      eventualConsistencyLevelHeader,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter,
      $select,
      $expand,
      $orderby,
      $top,
      $count,
      $search,
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
