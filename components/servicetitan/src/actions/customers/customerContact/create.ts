import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { createCustomerContactResponse } from "../../../examplePayloads";
import {
  connection,
  customerContactType,
  customerContactTypeValue,
  customerId,
  memo,
} from "../../../inputs";

export const createCustomerContact = action({
  display: {
    label: "Create Customer Contact",
    description: "Create a contact for a customer",
  },
  inputs: {
    connection,
    customerId,
    type: customerContactType,
    value: customerContactTypeValue,
    memo: {
      ...memo,
      required: false,
      comments:
        "Short description about this contact, for example, “work #” or “Owner’s daughter - Kelly”",
    },
  },
  perform: async (context, { connection, customerId, memo, type, value }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.post(`/customers/${customerId}/contacts`, {
      memo,
      type,
      value,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createCustomerContactResponse,
  },
});
