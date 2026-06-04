import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listGroupExamplePayload as examplePayload } from "../../examplePayloads";
import { listGroupInputs as inputs } from "../../inputs/group";
import { getConsistencyLevelHeader, getValues } from "../../util";

export const listGroup = action({
  display: {
    label: "List Groups",
    description: "List group objects and their properties.",
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
      `/groups`,
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
