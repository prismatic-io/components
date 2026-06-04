import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../../client";
import {
  connectionInput,
  minorVersion,
  nonInventoryItemData,
} from "../../../inputs";

export const createNonInventoryItem = action({
  display: {
    label: "Create Item",
    description: "Create a new non-inventory item in QuickBooks.",
  },
  perform: async (context, { nonInventoryItemData, quickbooksConnection }) => {
    const client = createHttpClient(
      quickbooksConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      "/item/",
      {
        ...nonInventoryItemData,
        Type: "NonInventory",
      },
      {
        params: {
          minorversion: minorVersion,
        },
      },
    );

    return {
      data,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    nonInventoryItemData: {
      ...nonInventoryItemData,
      comments: "The attributes of the non-inventory item to create",
    },
    minorVersion,
  },
});
