import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listEmployeeFieldsExamplePayload } from "../../examplePayloads";
import { listEmployeeFieldsInputs } from "../../inputs";

export const listEmployeeFields = action({
  display: {
    label: "List Employee Fields",
    description: "Retrieves a list of all employee fields in the company.",
  },
  perform: async (context, { connection }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.get(`/company/people/fields`);
    return {
      data,
    };
  },
  inputs: listEmployeeFieldsInputs,
  examplePayload: listEmployeeFieldsExamplePayload,
});
