import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { listEmployeeFilesExamplePayload } from "../../examplePayloads";
import { listEmployeeFilesInputs } from "../../inputs";

export const listEmployeeFiles = action({
  display: {
    label: "List Employee Files",
    description: "List all employee file categories and files.",
  },
  inputs: listEmployeeFilesInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      `/v1/employees/${params.employeeId}/files/view`,
    );
    return { data };
  },
  examplePayload: listEmployeeFilesExamplePayload,
});
