import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import {
  connection,
  site,
  company,
  filterDataAfterDate,
} from "../../inputs/general";
import { listCustomerContactsPayload } from "../../examplePayloads";
import { filterDataChangedAfter } from "../../util";

export const listCustomerContacts = action({
  display: {
    label: "List Customer Contacts",
    description: "Retrieve a list of customer contacts",
  },
  perform: async (
    context,
    { connection, site, company, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get("/customer_contacts");
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
    filterDataAfterDate,
  },
  examplePayload: listCustomerContactsPayload,
});
