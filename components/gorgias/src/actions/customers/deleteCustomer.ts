import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { MESSAGES } from "../../constants";
import { deleteCustomerInputs as inputs } from "../../inputs/customers";
import { successEmptyExamplePayload as examplePayload } from "../../examplePayloads/shared";

export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Delete a customer.",
  },
  perform: async (context, { connection, id }) => {
    await createClient({
      connection,
      debug: context.debug.enabled,
    }).delete(`/customers/${id}`);

    return {
      data: { message: MESSAGES.SUCCESS },
    };
  },
  inputs,
  examplePayload,
});
