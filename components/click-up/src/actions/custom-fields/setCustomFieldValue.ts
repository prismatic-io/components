import { action, util } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { setCustomFieldValueExamplePayload } from "../../examplePayloads";
import { connectionInput, fieldId, fieldValue, getTaskId, valueType } from "../../inputs";

const taskId = getTaskId(true, "Enter the task ID of the task you want to update.");

export const setCustomFieldValue = action({
  display: {
    label: "Set Custom Field Value",
    description: "Update the value of a Custom Field on a task.",
  },
  examplePayload: setCustomFieldValueExamplePayload,
  perform: async (context, { connection, taskId, fieldId, fieldValue, valueType }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    let value = fieldValue;
    if (valueType === "date") {
      value = Date.parse(util.types.toString(fieldValue));
    }
    const { data } = await client.post(`/task/${taskId}/field/${fieldId}`, {
      value,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    taskId,
    fieldId,
    fieldValue,
    valueType,
  },
});
