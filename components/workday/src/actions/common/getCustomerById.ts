import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getCustomerByIdExamplePayload } from "../../examplePayloads";
import { getCustomerByIdInputs } from "../../inputs";

export const getCustomerById = action({
  display: {
    label: "Get Customer by ID",
    description: "Retrieves customer by ID.",
  },
  perform: async (context, { connection, customerId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.common}/customers/${customerId}`,
    );
    return {
      data,
    };
  },
  inputs: getCustomerByIdInputs,
  examplePayload: getCustomerByIdExamplePayload,
});
