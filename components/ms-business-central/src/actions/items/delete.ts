import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import { itemId } from "../../inputs/items/updateItemInputs";

export const deleteItem = action({
  display: {
    label: "Delete Item",
    description: "Deletes an item object in your Business Central Organization.",
  },
  perform: async (context, { companyId, itemId, connection }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    await client.delete(`/companies(${companyId})/items(${itemId})`);

    return SUCCESS_PAYLOAD;
  },
  inputs: {
    connection: connectionInput,
    companyId,
    itemId,
  },
  examplePayload: SUCCESS_PAYLOAD,
});
