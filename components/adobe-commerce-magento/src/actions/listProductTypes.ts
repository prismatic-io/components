import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { listProductTypesExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

export const listProductTypes = action({
  display: {
    label: "List Product Types",
    description: "Retrieve available product types",
  },
  perform: async (context, { connection }) => {
    const client = await getClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get("/products/types");
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
  },
  examplePayload: listProductTypesExamplePayload,
});

export default { listProductTypes };
