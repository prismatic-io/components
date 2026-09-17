import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listRequestersExamplePayload as examplePayload } from "../../examplePayloads";
import { listRequestersInputs as inputs } from "../../inputs";
import { listRequestersOutputSchema } from "../../outputSchemas";
import { getListData } from "../../util";
export const listRequesters = action({
  display: {
    label: "List Requesters",
    description: "Returns a list of all requesters.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, pagination, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await getListData(client, `/requesters`, "requesters", {
      fetchAll,
      params: {
        ...additionalQueryParams,
        per_page: pagination.perPage,
        page: pagination.page,
      },
    });
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequestersOutputSchema,
  }),
  inputs,
  examplePayload,
});
