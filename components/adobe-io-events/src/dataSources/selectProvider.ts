import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { connection, consumerOrgId } from "../inputs";

export const selectProvider = dataSource({
  display: {
    label: "Select Provider",
    description:
      "Select an Adobe I/O Events Provider from those available in your organization.",
  },
  inputs: {
    connection,
    consumerOrgId,
  },
  perform: async (_context, { connection, consumerOrgId }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${consumerOrgId}/providers`);

    const providers = data?._embedded?.providers ?? [];

    return {
      result: providers
        .map((provider: { id: string; label: string }) => ({
          label: provider.label,
          key: provider.id.toString(),
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label < b.label ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Example Provider",
        key: "example-provider-id-123",
      },
    ],
  },
});
