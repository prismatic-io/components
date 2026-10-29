import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { createCustomTableEntryExamplePayload } from "../../examplePayloads";
import { createCustomTableEntryInputs } from "../../inputs";

export const createCustomTableEntry = action({
  display: {
    label: "Create Custom Table Entry",
    description: "Creates a new entry in a custom table for an employee.",
  },
  perform: async (
    context,
    { connection, employeeId, customTableId, entryData },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.post(
      `/people/custom-tables/${employeeId}/${customTableId}`,
      { values: entryData },
    );
    return {
      data,
    };
  },
  inputs: createCustomTableEntryInputs,
  examplePayload: createCustomTableEntryExamplePayload,
});
