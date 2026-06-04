import { dataSource, type Element } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { selectAccountInputs } from "../inputs/dataSources/account";

export const selectAccount = dataSource({
  display: {
    label: "Select Account",
    description: "Select an account from your Zendesk Sell instance.",
  },
  inputs: selectAccountInputs,
  perform: async (_context, { connection }) => {
    const client = getZendeskClient(connection, false);
    const { data } = await client.get("/accounts/self", {
      headers: { Accept: "application/json" },
    });

    return {
      result: [
        {
          key: data.data.id.toString(),
          label: data.data.name,
        } as Element,
      ],
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Account", key: "12345" }],
  },
});
