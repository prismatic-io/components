import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { createProductOptionsExamplePayload } from "../examplePayloads";
import { validateJSON } from "../helpers";
import { connectionInput, option } from "../inputs";

export const createProductOptions = action({
  display: {
    label: "Create Product Options",
    description: "Save Custom Option",
  },
  perform: async (context, { connection, option }) => {
    const client = await getClient(connection, context.debug.enabled);

    if (!validateJSON(option)) {
      throw new Error("Option must be valid JSON.");
    }

    try {
      const { data } = await client.post("/products/options", option);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    option,
  },
  examplePayload: createProductOptionsExamplePayload,
});

export default { createProductOptions };
