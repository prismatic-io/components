import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateCustomerExamplePayload as examplePayload } from "../../examplePayloads/customers";
import { updateCustomerInputs as inputs } from "../../inputs/customers";
import type { UpdateCustomerResponse } from "../../interfaces/customers";
export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update a customer.",
  },
  perform: async (context, { connection, id, ...body }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).put<UpdateCustomerResponse>(`/customers/${id}`, body);
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
