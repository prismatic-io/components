import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeCustomFieldValueExamplePayload } from "../../examplePayloads";
import { connectionInput, fieldId, getCustomTaskIds, getTaskId, getTeamId } from "../../inputs";
import type { RemoveCustomFieldValueQueryParams } from "./types/RemoveCustomFieldValueQueryParams";

const taskId = getTaskId(true, "Enter the task ID of the task you want to update.");

const customTaskIds = getCustomTaskIds(
  false,
  "If you want to reference a task by its Custom Task ID, this value must be true.",
  true
);

const teamId = getTeamId(false, "Only used when the custom_task_ids parameter is set to true");

export const removeCustomFieldValue = action({
  display: {
    label: "Remove Custom Field Value",
    description:
      "Remove the data from a Custom Field on a task. This does not delete the option from the Custom Field.",
  },
  examplePayload: removeCustomFieldValueExamplePayload,
  perform: async (context, { connection, taskId, fieldId, customTaskIds, teamId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const params: RemoveCustomFieldValueQueryParams = {
      custom_task_ids: customTaskIds,
    };
    if (teamId.length) params.team_id = teamId;
    const { data } = await client.delete(`/task/${taskId}/field/${fieldId}`, {
      params,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    taskId,
    fieldId,
    customTaskIds,
    teamId,
  },
});
