import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, merchantId } from "../inputs";

export const selectAccount = dataSource({
  display: {
    label: "Select Account",
    description: "A picklist of sub-accounts in your Merchant Center account.",
  },
  inputs: {
    connection: connectionInput,
    merchantId: {
      ...merchantId,
      comments:
        "The ID of the managing account. Used to list sub-accounts under this merchant.",
    },
  },
  perform: async (_context, { connection, merchantId }) => {
    const client = createClient(connection);

    const allResources: { id?: string | null; name?: string | null }[] = [];
    let nextPageToken: string | null | undefined;

    do {
      const { data } = await client.accounts.list({
        merchantId,
        pageToken: nextPageToken || undefined,
      });

      if (data.resources) {
        allResources.push(...data.resources);
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return {
      result: allResources
        .map<Element>((account) => ({
          label: account.name || account.id?.toString() || "Unknown",
          key: account.id?.toString() || "",
        }))
        .filter((item) => item.key)
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Main Store Account", key: "123456789" },
      { label: "Sub-Account Store", key: "987654321" },
    ],
  },
});
