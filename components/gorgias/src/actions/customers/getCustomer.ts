import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomerInputs as inputs } from "../../inputs/customers";
import type { GetCustomerResponse } from "../../interfaces/customers";
import { getCustomerExamplePayload as examplePayload } from "../../examplePayloads/customers";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieve a customer.",
  },
  perform: async (context, { connection, id }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).get<GetCustomerResponse>(`/customers/${id}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
