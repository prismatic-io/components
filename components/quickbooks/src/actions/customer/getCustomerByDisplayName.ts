import { action } from "@prismatic-io/spectral";
import { escapeString } from "../../actionUtils";
import { createHttpClient } from "../../client";
import { getCustomerByDisplayNamePayload as examplePayload } from "../../examplePayloads";
import { connectionInput, customerDisplayName } from "../../inputs";

export const getCustomerByDisplayName = action({
  display: {
    label: "Get Customer By Display Name",
    description:
      "Retrieve information about the Customer which matches the given Display Name.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );

    const queryString = `select * from Customer Where DisplayName = '${escapeString(
      params.customerDisplayName,
    )}'`;

    const { data } = await client.get(`/query?query=${queryString}`);

    const customer = data.QueryResponse?.Customer?.[0] || {};
    return {
      data: customer,
    };
  },
  inputs: { quickbooksConnection: connectionInput, customerDisplayName },
  examplePayload,
});
