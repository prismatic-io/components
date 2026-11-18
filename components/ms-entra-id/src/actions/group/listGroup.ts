import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listGroupExamplePayload as examplePayload } from "../../examplePayloads";
import { listGroupInputs as inputs } from "../../inputs/group";
import { listGroupOutputSchema } from "../../outputSchemas";
import { getConsistencyLevelHeader, getValues } from "../../util";

export const listGroup = action({
  display: {
    label: "List Groups",
    description: "List group objects and their properties.",
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
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listGroupOutputSchema,
  }),
  examplePayload,
});
