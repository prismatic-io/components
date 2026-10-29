import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, workspaceId } from "../inputs";

interface Call {
  calls: {
    id: string;
    title: string;
  }[];
}

export const calls = dataSource({
  display: {
    label: "Select Call",
    description: "Select a call from your Gong workspace",
  },
  inputs: {
    connection,
    workspaceId: {
      ...workspaceId,
      dataSource: undefined,
    },
  },
  perform: async (_context, { connection, workspaceId }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<Call>(`/v2/calls`, {
      params: {
        workspaceId,
      },
    });

    const result = data.calls.map<Element>((call) => ({
      label: call.title,
      key: call.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Title of the call", key: "3843152912968920037" }],
  },
});
