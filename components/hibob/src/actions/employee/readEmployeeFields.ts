import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { readEmployeeFieldsExamplePayload } from "../../examplePayloads";
import { readEmployeeFieldsInputs } from "../../inputs";

export const readEmployeeFields = action({
  display: {
    label: "Read Employee Fields",
    description:
      "Retrieves employee data for a specific employee by ID or email.",
  },
  perform: async (
    context,
    { connection, identifier, fields, humanReadable },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.post(`/people/${identifier}`, {
      fields,
      humanReadable,
    });
    return {
      data,
    };
  },
  inputs: readEmployeeFieldsInputs,
  examplePayload: readEmployeeFieldsExamplePayload,
});
