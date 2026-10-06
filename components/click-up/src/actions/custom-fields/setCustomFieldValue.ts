import { action, util } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { setCustomFieldValueExamplePayload } from "../../examplePayloads";
import { setCustomFieldValueInputs } from "../../inputs";
export const setCustomFieldValue = action({
  display: {
    label: "Set Custom Field Value",
    description: "Update the value of a Custom Field on a task.",
  },
  examplePayload: setCustomFieldValueExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, taskId, fieldId, fieldValue, valueType },
  ) => {
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
  examplePerform: async () => setCustomFieldValueExamplePayload,
  inputs: setCustomFieldValueInputs,
});
