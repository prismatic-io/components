import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listProblemsExamplePayload as examplePayload } from "../../examplePayloads";
import { listProblemsInputs as inputs } from "../../inputs/problems";
import { getListData } from "../../util";

export const listProblems = action({
  display: {
    label: "List Problems",
    description: "Returns a list of all problems.",
  },
  perform: async (
    context,
    { connection, fetchAll, perPage, page, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await getListData(
      client,
      `/problems`,
      "problems",
      fetchAll,
      {
        ...additionalQueryParams,
        per_page: perPage,
        page,
      },
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
