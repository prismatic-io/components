import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { getEmployeeFileExamplePayload } from "../../examplePayloads";
import { getEmployeeFileInputs } from "../../inputs";

export const getEmployeeFile = action({
  display: {
    label: "Get Employee File",
    description: "Retrieve an employee file.",
  },
  inputs: getEmployeeFileInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.get(
      `/v1/employees/${params.employeeId}/files/${params.employeeFileId}`,
      { responseType: "arraybuffer" },
    );
    return { data, contentType: headers["content-type"] };
  },
  examplePayload: getEmployeeFileExamplePayload,
});
