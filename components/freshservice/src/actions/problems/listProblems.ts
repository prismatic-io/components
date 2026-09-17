import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listProblemsExamplePayload as examplePayload } from "../../examplePayloads";
import { listProblemsInputs as inputs } from "../../inputs";
import { listProblemsOutputSchema } from "../../outputSchemas";
import { getListData } from "../../util";
export const listProblems = action({
  display: {
    label: "List Problems",
    description: "Returns a list of all problems.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, pagination, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await getListData(client, `/problems`, "problems", {
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
    schema: listProblemsOutputSchema,
  }),
  inputs,
  examplePayload,
});
