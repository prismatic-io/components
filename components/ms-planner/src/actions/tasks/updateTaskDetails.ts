import type { PlannerTaskDetails } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { updateTaskDetailsExamplePayload } from "../../examplePayloads";
import { updateTaskDetailsOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import {
  buildChecklist,
  buildReferences,
  compact,
  patchWithEtag,
} from "../../utils";
import { updateTaskDetailsInputs } from "../../inputs";
export const updateTaskDetails = action({
  display: {
    label: "Update Task Details",
    description:
      "Set a task's description, checklist items, and external links.",
  },
  inputs: updateTaskDetailsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTaskDetailsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      taskId,
      description,
      checklist,
      references,
      previewType,
      etag,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const checklistBody = buildChecklist(
      checklist?.addItems,
      [],
      checklist?.removeItemIds,
    );
    const referencesBody = buildReferences(
      references?.addReferences,
      references?.removeReferenceUrls,
    );
    const body = compact({
      description,
      previewType,
      checklist: Object.keys(checklistBody).length ? checklistBody : undefined,
      references: Object.keys(referencesBody).length
        ? referencesBody
        : undefined,
    });
    const data = await patchWithEtag<PlannerTaskDetails & Etagged>(
      client,
      PLANNER_ENDPOINTS.TASK_DETAILS(taskId),
      body,
      etag,
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { description, previewType },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateTaskDetailsExamplePayload.data,
      description:
        description ?? updateTaskDetailsExamplePayload.data.description,
      previewType:
        previewType ?? updateTaskDetailsExamplePayload.data.previewType,
    },
  }),
  examplePayload: updateTaskDetailsExamplePayload,
});
