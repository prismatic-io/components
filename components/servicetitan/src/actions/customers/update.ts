import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomerResponse as updateCustomerResponse } from "../../examplePayloads";
import {
  active,
  address,
  connection,
  customerId,
  customerType,
  customFields,
  doNotMail,
  doNotService,
  externalData,
  name,
  tagTypeIds,
} from "../../inputs";

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update a customer",
  },
  inputs: {
    connection,
    customerId,
    name: {
      ...name,
      required: false,
    },
    type: customerType,
    address,
    customFields,
    externalData,
    doNotMail,
    doNotService,
    active: {
      ...active,
      required: false,
      comments: "Whether the customer is active",
    },
    tagTypeIds,
  },
  perform: async (
    context,
    {
      connection,
      active,
      address,
      customFields,
      customerId,
      doNotMail,
      doNotService,
      externalData,
      name,
      tagTypeIds,
      type,
    },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.patch(`/customers/${customerId}`, {
      active,
      address,
      customFields,
      doNotMail,
      doNotService,
      externalData,
      name,
      tagTypeIds,
      type,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updateCustomerResponse,
  },
});
