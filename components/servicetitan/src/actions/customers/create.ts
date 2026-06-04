import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomerResponse } from "../../examplePayloads";
import {
  address,
  connection,
  contacts,
  customerType,
  customFields,
  doNotMail,
  doNotService,
  externalData,
  location,
  name,
  tagTypeIds,
} from "../../inputs";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a New Customer",
  },
  inputs: {
    connection,
    name,
    locations: { ...location, required: true },
    address: {
      ...address,
      required: true,
      comments: "Bill-To address of the customer record",
    },
    type: customerType,
    doNotMail,
    doNotService,
    contacts,
    customFields,
    tagTypeIds,
    externalData,
  },
  perform: async (
    context,
    {
      connection,
      address,
      contacts,
      customFields,
      doNotMail,
      doNotService,
      externalData,
      locations,
      name,
      tagTypeIds,
      type,
    },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.post(`/customers`, {
      address,
      contacts,
      customFields,
      doNotMail,
      doNotService,
      externalData,
      locations,
      name,
      tagTypeIds,
      type,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createCustomerResponse,
  },
});
