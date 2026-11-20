import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectCurrencyExamplePayload } from "../examplePayloads";
import { selectCurrencyInputs } from "../inputs";
import type { CurrencySummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectCurrency = dataSource({
  display: {
    label: "Select Currency",
    description: "A picklist of currencies in the Workday tenant.",
  },
  inputs: selectCurrencyInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.common}/currencies`,
      fetchAll: true,
    });

    return {
      result: toSortedPicklist(data as CurrencySummary[], (item) => ({
        key: item.id,
        label: item.descriptor || item.code || item.id,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectCurrencyExamplePayload,
});
