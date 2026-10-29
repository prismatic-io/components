import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateDepartmentExamplePayload } from "../../examplePayloads";
import { updateDepartmentInputs } from "../../inputs";
import type { Department } from "../../types";

export const updateDepartment = action({
  display: {
    label: "Update Department",
    description: "Update an existing department.",
  },
  inputs: updateDepartmentInputs,
  perform: async (context, { connection, resourceId, departmentName }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.put<Department>(
      `/v1/departments/${resourceId}`,
      { name: departmentName },
    );
    return { data };
  },
  examplePayload: updateDepartmentExamplePayload,
});
