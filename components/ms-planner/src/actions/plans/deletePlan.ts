import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { deletePlanExamplePayload } from "../../examplePayloads";
import { deleteWithEtag } from "../../utils";
import { deletePlanInputs } from "../../inputs";
import { deletePlanOutputSchema } from "../../outputSchemas";
export const deletePlan = action({
  display: {
    label: "Delete Plan",
    description: "Delete a plan and everything it contains.",
  },
  inputs: deletePlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePlanOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, planId, etag }) => {
    const client = createClient(connection, context.debug.enabled);
    await deleteWithEtag(client, PLANNER_ENDPOINTS.PLAN(planId), etag);
    return {
      data: { success: true, id: planId, message: "Plan deleted successfully" },
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deletePlanExamplePayload,
  examplePayload: deletePlanExamplePayload,
});
