import { action, util } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, queryParams } from "../../inputs";

export const queryVendorExpenses = action({
  display: {
    label: "Get Vendor Expenses",
    description: "Retrieve information about vendor expenses.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );

    const { data } = await client.get("/reports/VendorExpenses", {
      params: util.types.keyValPairListToObject(params.queryParams),
    });
    return { data };
  },
  inputs: { quickbooksConnection: connectionInput, queryParams },
});
