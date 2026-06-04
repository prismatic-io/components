import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { deleteCustomTableEntryExamplePayload } from "../../examplePayloads";
import { deleteCustomTableEntryInputs } from "../../inputs";

export const deleteCustomTableEntry = action({
  display: {
    label: "Delete Custom Table Entry",
    description:
      "Deletes an existing entry from a custom table for an employee.",
  },
  perform: async (
    context,
    { connection, employeeId, customTableId, entryId },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    await client.delete(
      `/people/custom-tables/${employeeId}/${customTableId}/${entryId}`,
    );
    return {
      data: {
        success: true,
        message: `Custom table entry ${entryId} deleted successfully`,
      },
    };
  },
  inputs: deleteCustomTableEntryInputs,
  examplePayload: deleteCustomTableEntryExamplePayload,
});
