import type {
  PlannerTask,
  PlannerTaskDetails,
} from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { createTaskExamplePayload } from "../../examplePayloads";
import { createTaskOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import {
  buildAppliedCategories,
  buildAssignments,
  compact,
  patchWithEtag,
} from "../../utils";
import { createTaskInputs } from "../../inputs";
export const createTask = action({
  display: {
    label: "Create Task",
    description:
      "Create a task in a plan. Supplying a description performs a second write, because a task's description is stored on its details resource and cannot be set when the task is created.",
  },
  inputs: createTaskInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTaskOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      planId,
      bucketId,
      title,
      assignment,
      schedule,
      priority,
      percentComplete,
      categories,
      description,
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
      planId,
      title,
      bucketId,
      priority,
      percentComplete,
      startDateTime: schedule?.startDateTime,
      dueDateTime: schedule?.dueDateTime,
      assignments: Object.keys(assignments).length ? assignments : undefined,
      appliedCategories: Object.keys(appliedCategories).length
        ? appliedCategories
        : undefined,
    });
    const { data: task } = await client.post<PlannerTask & Etagged>(
      PLANNER_ENDPOINTS.TASKS,
      body,
    );
    if (!description) {
      return { data: { task, details: null } };
    }
    const details = await patchWithEtag<PlannerTaskDetails & Etagged>(
      client,
      PLANNER_ENDPOINTS.TASK_DETAILS(task.id as string),
      { description },
    );
    return { data: { task, details } };
  },
  examplePerform: async (
    _context,
    {
      planId,
      bucketId,
      title,
      schedule,
      priority,
      percentComplete,
      categories,
      description,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const exampleTask = createTaskExamplePayload.data.task;
    const appliedCategories: Record<string, unknown> = {
      ...exampleTask.appliedCategories,
    };
    for (const category of categories?.applyCategories ?? []) {
      appliedCategories[category] = true;
    }
    for (const category of categories?.removeCategories ?? []) {
      delete appliedCategories[category];
    }
    const task = {
      ...exampleTask,
      planId,
      title,
      bucketId: bucketId ?? exampleTask.bucketId,
      priority: priority ?? exampleTask.priority,
      percentComplete: percentComplete ?? exampleTask.percentComplete,
      startDateTime: schedule?.startDateTime ?? exampleTask.startDateTime,
      dueDateTime: schedule?.dueDateTime ?? exampleTask.dueDateTime,
      appliedCategories,
      hasDescription: Boolean(description),
    };
    if (!description) {
      return { data: { task, details: null } };
    }
    return {
      data: {
        task,
        details: { ...createTaskExamplePayload.data.details, description },
      },
    };
  },
  examplePayload: createTaskExamplePayload,
});
