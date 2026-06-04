import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { createNewFieldExamplePayload } from "../../examplePayloads";
import { createNewFieldInputs } from "../../inputs";

export const createNewField = action({
  display: {
    label: "Create New Field",
    description: "Creates a new custom field in HiBob.",
  },
  perform: async (
    context,
    { connection, name, category, type, description, historical },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    const fieldData = {
      name,
      category,
      type,
      description,
      historical,
    };

    const { data } = await client.post("/company/people/fields", fieldData);
    return {
      data,
    };
  },
  inputs: createNewFieldInputs,
  examplePayload: createNewFieldExamplePayload,
});
