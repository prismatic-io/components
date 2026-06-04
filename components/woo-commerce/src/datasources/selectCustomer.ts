import { dataSource, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import {
  after,
  before,
  connectionInput,
  resultsPerPage,
  search,
} from "../inputs";
import type { Customer } from "../interfaces/Customer";
import type { WooCommerceResponse } from "../interfaces/WooComerResponse";
import { paginateRecords } from "../util";

export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "Select a customer from a list of WooCommerce customers.",
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
    const { data }: WooCommerceResponse<Customer> = await paginateRecords(
      client,
      "/customers",
      {
        per_page: resultsPerPage,
        search,
        before,
        after,
      },
      true,
    );

    return {
      result: data.map(({ id, first_name, last_name, email }) => ({
        label: `${first_name} ${last_name} - ${email}`,
        key: util.types.toString(id),
      })),
    };
  },
});
