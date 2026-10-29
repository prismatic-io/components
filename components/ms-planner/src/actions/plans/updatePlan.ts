import type { PlannerPlan } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { updatePlanExamplePayload } from "../../examplePayloads";
import { updatePlanOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { patchWithEtag } from "../../utils";
import { updatePlanInputs } from "../../inputs";

export const updatePlan = action({
  display: {
    label: "Update Plan",
    description:
      "Rename a plan. The title is the only property a plan allows changing.",
  },
  inputs: updatePlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updatePlanOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, planId, title, etag }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await patchWithEtag<PlannerPlan & Etagged>(
      client,
      PLANNER_ENDPOINTS.PLAN(planId),
      { title },
      etag,
    );
    return { data };
  },
  examplePerform: async (_context, { title }): Promise<{ data: unknown }> => ({
    data: { ...updatePlanExamplePayload.data, title },
  }),
  examplePayload: updatePlanExamplePayload,
});
