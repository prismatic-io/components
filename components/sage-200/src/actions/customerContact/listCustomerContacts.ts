import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listCustomerContactsPayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import {
  company,
  connection,
  fetchAll,
  filterDataAfterDate,
  site,
} from "../../inputs/general";
import { filterDataChangedAfter } from "../../util";

export const listCustomerContacts = action({
  display: {
    label: "List Customer Contacts",
    description: "Retrieve a list of customer contacts",
  },
  perform: async (
    context,
    { connection, site, company, fetchAll, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await paginateResults({
      client,
      endpoint: "/customer_contacts",
      fetchAll,
    });

    return {
      data: filterDataAfterDate
        ? filterDataChangedAfter(data, filterDataAfterDate)
        : data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    fetchAll,
    filterDataAfterDate,
  },
  examplePayload: listCustomerContactsPayload,
});
