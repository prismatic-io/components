import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { updateOrderInputs } from "../../inputs/orders/update";
import { DEFAULT_UPDATE_RESPONSE } from "../../constants";

export const updateOrder = action({
  display: {
    label: "Update Order",
    description: "Update an instance of Orders.",
  },
  inputs: {
    ...updateOrderInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, DocEntry, Comments }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.patch(`/Orders(${DocEntry})`, {
      Comments,
      ...bodyFields,
    });

    return {
      data: DEFAULT_UPDATE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_UPDATE_RESPONSE,
  },
});
