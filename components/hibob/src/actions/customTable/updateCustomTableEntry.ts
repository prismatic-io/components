import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { updateCustomTableEntryExamplePayload } from "../../examplePayloads";
import { updateCustomTableEntryInputs } from "../../inputs";

export const updateCustomTableEntry = action({
  display: {
    label: "Update Custom Table Entry",
    description: "Updates an existing entry in a custom table for an employee.",
  },
  perform: async (
    context,
    { connection, employeeId, customTableId, entryId, entryData },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    await client.put(
      `/people/custom-tables/${employeeId}/${customTableId}/${entryId}`,
      entryData,
    );
    return {
      data: {
        success: true,
        message: "Custom table entry updated successfully",
      },
    };
  },
  inputs: updateCustomTableEntryInputs,
  examplePayload: updateCustomTableEntryExamplePayload,
});
