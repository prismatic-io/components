import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { MESSAGES } from "../../constants";
import { updateCustomerDataInputs as inputs } from "../../inputs/customers";
import { successEmptyExamplePayload as examplePayload } from "../../examplePayloads/shared";

export const updateCustomerData = action({
  display: {
    label: "Update Customer Data",
    description: "Set a customer's data.",
  },
  perform: async (context, { connection, id, ...body }) => {
    await createClient({
      connection,
      debug: context.debug.enabled,
    }).put(`/customers/${id}/data`, body);

    return {
      data: { message: MESSAGES.SUCCESS },
    };
  },
  inputs,
  examplePayload,
});
