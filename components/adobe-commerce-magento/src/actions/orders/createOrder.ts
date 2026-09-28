import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { createOrderExamplePayload } from "../../examplePayloads";
import { createOrderInputs } from "../../inputs";
import { asJsonObject } from "../../utils";
export const createOrder = action({
  display: {
    label: "Create Order",
    description: "Performs persist operations for a specified order.",
  },
  examplePayload: createOrderExamplePayload,
  performSafety: "notAllowed",
  examplePerform: async () => createOrderExamplePayload,
  perform: async (context, { connection, entity }) => {
    const client = await getClient(connection, context.debug.enabled);
    const body = asJsonObject(entity, "Entity");
    const { data } = await client.post(ENDPOINTS.orders, body);
    return { data };
  },
  inputs: createOrderInputs,
});
