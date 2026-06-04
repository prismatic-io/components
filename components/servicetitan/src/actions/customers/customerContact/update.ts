import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { createCustomerContactResponse as updateCustomerContactResponse } from "../../../examplePayloads";
import {
  connection,
  customerContactId,
  customerContactType,
  customerContactTypeValue,
  customerId,
  memo,
} from "../../../inputs";

export const updateCustomerContact = action({
  display: {
    label: "Update Customer Contact",
    description: "Updates a contact on the customers",
  },
  inputs: {
    connection,
    customerId,
    customerContactId,
    type: { ...customerContactType, required: false },
    value: { ...customerContactTypeValue, required: false },
    memo: {
      ...memo,
      required: false,
      comments:
        "Short description about this contact, for example, “work #” or “Owner’s daughter - Kelly”",
    },
  },
  perform: async (
    context,
    { connection, customerId, memo, type, value, customerContactId },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.patch(
      `/customers/${customerId}/contacts/${customerContactId}`,
      {
        memo,
        type,
        value,
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: updateCustomerContactResponse,
  },
});
