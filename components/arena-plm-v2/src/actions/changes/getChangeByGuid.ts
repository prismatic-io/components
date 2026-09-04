import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getChangeByGuidExamplePayload } from "../../examplePayloads";
import { getChangeByGuidInputs } from "../../inputs";
import { changeFullSchema } from "../../outputSchemas";
import type { ChangeFullVo } from "../../types";
import { handleArenaError } from "../../util";
export const getChangeByGuid = action({
  display: {
    label: "Get Change by GUID",
    description:
      "Retrieve detailed information of a specific change by its GUID from Arena PLM system.",
  },
  inputs: getChangeByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeFullSchema,
  }),
  examplePayload: getChangeByGuidExamplePayload,
  perform: async (
    context,
    { connection, guid, includeEmptyAdditionalAttributes },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const params = { includeEmptyAdditionalAttributes };
      const response = await client.get(`/changes/${guid}`, { params });
      const change: ChangeFullVo = response.data;
      context.logger.info("Retrieved change", { guid: change.guid });
      return { data: change };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Change by GUID");
    }
  },
});
