import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { validateJSON } from "../helpers";
import { connectionInput, entity } from "../inputs";

export const createOrder = action({
  display: {
    label: "Create Order",
    description: "Performs persist operations for a specified order.",
  },
  perform: async (context, { connection, entity }) => {
    const client = await getClient(connection, context.debug.enabled);

    if (!validateJSON(entity)) {
      throw new Error("Entity must be valid JSON.");
    }

    try {
      const { data } = await client.post("/orders", entity);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    entity,
  },
});

export default { createOrder };
