import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createItemExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import { itemDisplayName, number } from "../../inputs/items/createItemInputs";
import type { Item } from "../../interfaces";

export const createItem = action({
  display: {
    label: "Create Item",
    description: "Creates a new item object in your Business Central Organization.",
  },
  perform: async (context, { companyId, number, displayName, connection }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const payload = {
      number,
      displayName,
    };

    const { data } = await client.post<Item>(`/companies(${companyId})/items`, payload);

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    number,
    displayName: itemDisplayName,
  },
  examplePayload: createItemExamplePayload,
});
