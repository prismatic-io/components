import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateEmployeeCustomFieldExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  custom_field_id,
  employee_id,
  value,
} from "../../inputs";

export const updateEmployeeCustomField = action({
  display: {
    label: "Update Employee Custom Field",
    description: "Update employee custom field",
  },
  inputs: {
    connectionInput,
    employee_id,
    custom_field_id,
    value,
  },
  perform: async (
    context,
    { connectionInput, employee_id, custom_field_id, value },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.put(
      `/employees/${employee_id}/custom-fields/${custom_field_id}`,
      {
        value: value || undefined,
      },
    );
    return {
      data,
    };
  },
  examplePayload: updateEmployeeCustomFieldExamplePayload,
});
