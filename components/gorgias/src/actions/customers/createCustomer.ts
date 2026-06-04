import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomerInputs as inputs } from "../../inputs/customers";
import type { CreateCustomerResponse } from "../../interfaces/customers";
import { createCustomerExamplePayload as examplePayload } from "../../examplePayloads/customers";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a customer.",
  },
  perform: async (context, { connection, ...body }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).post<CreateCustomerResponse>("/customers", body);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
