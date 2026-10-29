import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getEmployeeCustomFieldsExamplePayload } from "../../examplePayloads";
import { connectionInput, employee_id } from "../../inputs";

export const getEmployeeCustomFields = action({
  display: {
    label: "Get Employee Custom Fields",
    description: "Get employee custom fields",
  },
  inputs: {
    connectionInput,
    employee_id,
  },
  perform: async (context, { connectionInput, employee_id }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/employees/${employee_id}/custom-fields`,
    );
    return {
      data,
    };
  },
  examplePayload: getEmployeeCustomFieldsExamplePayload,
});
