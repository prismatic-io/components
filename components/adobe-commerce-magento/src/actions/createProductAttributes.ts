import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { createProductAttributesExamplePayload } from "../examplePayloads";
import { validateJSON } from "../helpers";
import { attribute, connectionInput } from "../inputs";

export const createProductAttributes = action({
  display: {
    label: "Create Product Attributes",
    description: "Save attribute data",
  },
  perform: async (context, { connection, attribute }) => {
    const client = await getClient(connection, context.debug.enabled);

    if (!validateJSON(attribute)) {
      throw new Error("Attribute must be valid JSON.");
    }

    try {
      const { data } = await client.post("/products/attributes", attribute);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    attribute,
  },
  examplePayload: createProductAttributesExamplePayload,
});

export default { createProductAttributes };
