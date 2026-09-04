import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTrainingManagersExamplePayload } from "../../examplePayloads";
import { listTrainingManagersInputs } from "../../inputs";
import { userCompactListSchema } from "../../outputSchemas";
import type { UserCompactVoResultRep } from "../../types";
import { handleArenaError } from "../../util";
export const listTrainingManagers = action({
  display: {
    label: "List Training Managers",
    description: "List all training managers in Arena PLM system.",
  },
  inputs: listTrainingManagersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: userCompactListSchema,
  }),
  examplePayload: listTrainingManagersExamplePayload,
  perform: async (context, { connection }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Fetching training managers from Arena");
      const { data } = await client.get<UserCompactVoResultRep>(
        "/settings/trainingplans/managers",
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} training managers`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Training Managers");
    }
  },
});
