import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { createOrderInputs } from "../../inputs/orders/create";

export const createOrder = action({
  display: {
    label: "Create Order",
    description: "Create an instance of Orders.",
  },
  inputs: {
    ...createOrderInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, CardCode, DocDueDate, DocumentLines }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.post(`/Orders`, {
      CardCode,
      DocDueDate,
      DocumentLines,
      ...bodyFields,
    });
    return {
      data,
    };
  },
});
