import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTrainingPlansExamplePayload } from "../../examplePayloads";
import { listTrainingPlansInputs } from "../../inputs";
import { listTrainingPlansOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listTrainingPlans = action({
  display: {
    label: "List Training Plans",
    description:
      "Search for training plans using filters like number, name, status, or manager.",
  },
  inputs: listTrainingPlansInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTrainingPlansOutputSchema,
  }),
  examplePayload: listTrainingPlansExamplePayload,
  perform: async (
    context,
    {
      connection,
      number,
      name,
      status,
      managerGuid,
      managerFullName,
      userGuid,
      pagination = {},
      fetchAll,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        number,
        name,
        status,
        "manager.guid": managerGuid,
        "manager.fullName": managerFullName,
        "user.guid": userGuid,
        offset: pagination.offset,
        limit: pagination.limit,
      };
      context.logger.info("Fetching training plans from Arena", {
        queryParamNames: Object.keys(queryParams),
      });
      const data = await fetchArenaList(
        client,
        "/trainingplans",
        queryParams,
        fetchAll,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} training plans`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Training Plans");
    }
  },
});
