import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection } from "../inputs";

export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description: "A picklist of subscriptions available to the current user.",
  },
  inputs: {
    connection: oneDriveConnection,
  },
  perform: async (_context, { connection }) => {
    const client = getOneDriveClient(connection, false);
    const {
      data: { value },
    } = await client.get<{
      value: { id: string; resource: string; changeType: string }[];
    }>("/subscriptions");

    return {
      result: value
        .map<Element>((item) => ({
          label: `${item.resource} (${item.changeType})`,
          key: item.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "/me/drive/root (updated)",
        key: "38031b7d-16b1-448a-8e68-68b8aec62315",
      },
    ],
  },
});
