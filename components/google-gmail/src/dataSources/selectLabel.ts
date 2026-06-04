import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput, userIdInput } from "../inputs";
import { createClient } from "../client";

export const selectLabel = dataSource({
  display: {
    label: "Select Label",
    description: "Select a label from the list of labels",
  },
  inputs: { connection: connectionInput, userId: userIdInput },
  perform: async (context, { connection, userId }) => {
    const client = await createClient(connection);
    const { data } = await client.users.labels.list({
      userId,
    });
    const result = data.labels.map<Element>((label) => ({
      label: label.name,
      key: label.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
