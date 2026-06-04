import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { searchEmployeeExamplePayload } from "../../examplePayloads";
import { searchEmployeeInputs } from "../../inputs";

export const searchEmployee = action({
  display: {
    label: "Search Employee",
    description: "Searches for employees based on specified criteria.",
  },
  perform: async (
    context,
    { connection, fields, filters, showInactive, humanReadable },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.post(`/people/search`, {
      showInactive,
      fields,
      filters,
      humanReadable,
    });
    return {
      data,
    };
  },
  inputs: searchEmployeeInputs,
  examplePayload: searchEmployeeExamplePayload,
});
