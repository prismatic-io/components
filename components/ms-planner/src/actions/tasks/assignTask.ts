import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { assignTaskExamplePayload } from "../../examplePayloads";
import { assignTaskOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { buildAssignments, patchWithEtag } from "../../utils";
import { assignTaskInputs } from "../../inputs";

export const assignTask = action({
  display: {
    label: "Assign Task",
    description: "Add or remove the users assigned to a task.",
  },
  inputs: assignTaskInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assignTaskOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, taskId, assignment, etag }) => {
    const client = createClient(connection, context.debug.enabled);

    const assignments = buildAssignments(
      assignment?.assignTo,
      assignment?.unassign,
    );
    if (!Object.keys(assignments).length) {
      throw new Error(
        "Select at least one user to assign or unassign before running the Assign Task action.",
      );
    }

    const data = await patchWithEtag<PlannerTask & Etagged>(
      client,
      PLANNER_ENDPOINTS.TASK(taskId),
      { assignments },
      etag,
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { assignment },
  ): Promise<{ data: unknown }> => {
    const exampleAssignments = assignTaskExamplePayload.data.assignments ?? {};
    const exampleEntry = Object.values(exampleAssignments)[0];

    const assignments: Record<string, unknown> = { ...exampleAssignments };
    for (const userId of assignment?.assignTo ?? []) {
      assignments[userId] = exampleEntry;
    }
    for (const userId of assignment?.unassign ?? []) {
      delete assignments[userId];
    }

    return { data: { ...assignTaskExamplePayload.data, assignments } };
  },
  examplePayload: assignTaskExamplePayload,
});
