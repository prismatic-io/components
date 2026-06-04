import { dataSource, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import {
  after,
  before,
  connectionInput,
  resultsPerPage,
  search,
} from "../inputs";
import type { Refund } from "../interfaces/Refund";
import type { WooCommerceResponse } from "../interfaces/WooComerResponse";
import { paginateRecords } from "../util";

export const selectRefund = dataSource({
  display: {
    label: "Select Refund",
    description: "Select a refund from a list of WooCommerce refunds.",
  },
  dataSourceType: "picklist",
  inputs: {
    connection: connectionInput,
    resultsPerPage,
    search,
    before,
    after,
  },
  perform: async (
    context,
    { connection, resultsPerPage, search, before, after },
  ) => {
    const client = getClient(connection, false);
    const { data }: WooCommerceResponse<Refund> = await paginateRecords(
      client,
      "/refunds",
      {
        per_page: resultsPerPage,
        search,
        before,
        after,
      },
      true,
    );

    return {
      result: data.map(({ id, amount, reason, refunded_by, parent_id }) => ({
        label: `${amount} - ${reason} - ${refunded_by} - ${parent_id}`,
        key: util.types.toString(id),
      })),
    };
  },
});
