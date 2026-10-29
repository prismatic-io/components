import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { updateTaskExamplePayload } from "../../examplePayloads";
import { updateTaskOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import {
  buildAppliedCategories,
  buildAssignments,
  compact,
  patchWithEtag,
} from "../../utils";
import { updateTaskInputs } from "../../inputs";
export const updateTask = action({
  display: {
    label: "Update Task",
    description:
      "Update a task's properties. Only the fields supplied are changed; everything else keeps its current value.",
  },
  inputs: updateTaskInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTaskOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      taskId,
      title,
      bucketId,
      assignment,
      schedule,
      priority,
      percentComplete,
      categories,
      conversationThreadId,
      etag,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const assignments = buildAssignments(
      assignment?.assignTo,
      assignment?.unassign,
    );
    const appliedCategories = buildAppliedCategories(
      categories?.applyCategories,
      categories?.removeCategories,
    );
    const body = compact({
      title,
      bucketId,
      priority,
      percentComplete,
      conversationThreadId,
      startDateTime: schedule?.startDateTime,
      dueDateTime: schedule?.dueDateTime,
      assignments: Object.keys(assignments).length ? assignments : undefined,
      appliedCategories: Object.keys(appliedCategories).length
        ? appliedCategories
        : undefined,
    });
    const data = await patchWithEtag<PlannerTask & Etagged>(
      client,
      PLANNER_ENDPOINTS.TASK(taskId),
      body,
      etag,
    );
    return { data };
  },
  examplePerform: async (
    _context,
    {
      title,
      bucketId,
      schedule,
      priority,
      percentComplete,
      categories,
      conversationThreadId,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const exampleTask = updateTaskExamplePayload.data;
    const appliedCategories: Record<string, unknown> = {
      ...exampleTask.appliedCategories,
    };
    for (const category of categories?.applyCategories ?? []) {
      appliedCategories[category] = true;
    }
    for (const category of categories?.removeCategories ?? []) {
      delete appliedCategories[category];
    }
    return {
      data: {
        ...exampleTask,
        title: title ?? exampleTask.title,
        bucketId: bucketId ?? exampleTask.bucketId,
        priority: priority ?? exampleTask.priority,
        percentComplete: percentComplete ?? exampleTask.percentComplete,
        startDateTime: schedule?.startDateTime ?? exampleTask.startDateTime,
        dueDateTime: schedule?.dueDateTime ?? exampleTask.dueDateTime,
        conversationThreadId:
          conversationThreadId ?? exampleTask.conversationThreadId,
        appliedCategories,
      },
    };
  },
  examplePayload: updateTaskExamplePayload,
});
