import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { deleteEmployeeFileExamplePayload } from "../../examplePayloads";
import { deleteEmployeeFileInputs } from "../../inputs";

export const deleteEmployeeFile = action({
  display: {
    label: "Delete Employee File",
    description: "Delete an employee file.",
  },
  inputs: deleteEmployeeFileInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      `/v1/employees/${params.employeeId}/files/${params.employeeFileId}`,
    );
    return { data };
  },
  examplePayload: deleteEmployeeFileExamplePayload,
});
