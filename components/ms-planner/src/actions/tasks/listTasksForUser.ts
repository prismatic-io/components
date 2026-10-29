import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { listTasksForUserExamplePayload } from "../../examplePayloads";
import { listTasksForUserOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { computeEndpointBasedOnConnection, fetchAllPlanner } from "../../utils";
import { listTasksForUserInputs } from "../../inputs";

export const listTasksForUser = action({
  display: {
    label: "List Tasks for User",
    description: "List every task assigned to the user, across every plan.",
  },
  inputs: listTasksForUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTasksForUserOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const endpoint = computeEndpointBasedOnConnection(
      connection,
      PLANNER_ENDPOINTS.USER_TASKS,
    );
    const data = await fetchAllPlanner<PlannerTask & Etagged>(client, endpoint);
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listTasksForUserExamplePayload,
  examplePayload: listTasksForUserExamplePayload,
});
