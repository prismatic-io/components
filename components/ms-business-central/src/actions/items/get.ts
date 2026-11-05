import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createItemExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import { itemId } from "../../inputs/items/updateItemInputs";
import type { Item } from "../../interfaces";

export const getItem = action({
  display: {
    label: "Get Item",
    description: "Retrieves an item object from your Business Central Organization.",
  },
  perform: async (context, { companyId, itemId, connection }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.get<Item>(`/companies(${companyId})/items(${itemId})`);

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    itemId,
  },
  examplePayload: createItemExamplePayload,
});
