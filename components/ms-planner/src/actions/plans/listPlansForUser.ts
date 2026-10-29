import type { PlannerPlan } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { listPlansForUserExamplePayload } from "../../examplePayloads";
import { listPlansForUserOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { computeEndpointBasedOnConnection, fetchAllPlanner } from "../../utils";
import { listPlansForUserInputs } from "../../inputs";

export const listPlansForUser = action({
  display: {
    label: "List Plans for User",
    description: "List the plans shared with the user.",
  },
  inputs: listPlansForUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPlansForUserOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const endpoint = computeEndpointBasedOnConnection(
      connection,
      PLANNER_ENDPOINTS.USER_PLANS,
    );
    const data = await fetchAllPlanner<PlannerPlan & Etagged>(client, endpoint);
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listPlansForUserExamplePayload,
  examplePayload: listPlansForUserExamplePayload,
});
