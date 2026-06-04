import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { listProductOptionTypesExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

export const listProductOptionTypes = action({
  display: {
    label: "List Product Option Types",
    description: "Get custom option types",
  },
  perform: async (context, { connection }) => {
    const client = await getClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get("/products/options/types");
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
  examplePayload: listProductOptionTypesExamplePayload,
});

export default { listProductOptionTypes };
