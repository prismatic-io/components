import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDepartmentExamplePayload } from "../../examplePayloads";
import { deleteDepartmentInputs } from "../../inputs";

export const deleteDepartment = action({
  display: {
    label: "Delete Department",
    description: "Delete a department by ID.",
  },
  inputs: deleteDepartmentInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.delete(`/v1/departments/${resourceId}`);
    return { data: `Successfully deleted department ${resourceId}` };
  },
  examplePayload: deleteDepartmentExamplePayload,
});
