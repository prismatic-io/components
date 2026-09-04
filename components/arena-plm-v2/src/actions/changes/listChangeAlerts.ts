import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeAlertsExamplePayload } from "../../examplePayloads";
import { listChangeAlertsInputs } from "../../inputs";
import { listChangeAlertsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangeAlerts = action({
  display: {
    label: "List Change Alerts",
    description: "Retrieve all alerts for a specific change.",
  },
  inputs: listChangeAlertsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangeAlertsOutputSchema,
  }),
  examplePayload: listChangeAlertsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/changes/${util.types.toString(params.changeGuid)}/alerts`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Change Alerts");
    }
  },
});
