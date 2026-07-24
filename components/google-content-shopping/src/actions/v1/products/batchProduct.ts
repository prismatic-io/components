import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { batchProductExamplePayload } from "../../../examplePayloads/v1";
import { batchProductInputs } from "../../../inputs/v1/products";
import { runBulk } from "../../../util/bulk";
import {
  accountResourceName,
  dataSourceResourceName,
} from "../../../util/resourceNames";
export const batchProductMerchant = action({
  display: {
    description:
      "Upserts multiple product inputs in parallel, replacing the removed Content API custombatch with bounded parallel inserts and returning a per-item result list.",
    label: "Batch Upsert Products (Merchant v1)",
  },
  inputs: batchProductInputs,
  perform: async (
    context,
    { connectionInput, account, dataSource, entries },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const parent = accountResourceName(account);
    const dataSourceName = dataSourceResourceName(account, dataSource);
    const results = await runBulk(entries as unknown[], async (entry) => {
      const { data } = await client.post(
        `/products/v1/${parent}/productInputs:insert`,
        entry,
        { params: { dataSource: dataSourceName } },
      );
      return data;
    });
    return { data: { results } };
  },
  examplePayload: batchProductExamplePayload,
});
