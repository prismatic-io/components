import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeCustomFieldValueExamplePayload } from "../../examplePayloads";
import { removeCustomFieldValueInputs } from "../../inputs";
import type { RemoveCustomFieldValueQueryParams } from "../../types";
export const removeCustomFieldValue = action({
  display: {
    label: "Remove Custom Field Value",
    description:
      "Remove the data from a Custom Field on a task. This does not delete the option from the Custom Field.",
  },
  examplePayload: removeCustomFieldValueExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, taskId, fieldId, customTaskIds, teamId },
  ) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const params: RemoveCustomFieldValueQueryParams = {
      custom_task_ids: customTaskIds,
    };
    if (teamId?.length) params.team_id = teamId;
    const { data } = await client.delete(`/task/${taskId}/field/${fieldId}`, {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async () => removeCustomFieldValueExamplePayload,
  inputs: removeCustomFieldValueInputs,
});
