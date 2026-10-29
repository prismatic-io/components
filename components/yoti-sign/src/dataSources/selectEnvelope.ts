import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";
import type { Envelope } from "../interfaces";
import { fetchAllRecords } from "../util";

export const selectEnvelope = dataSource({
  display: {
    label: "Select Envelope",
    description:
      "Select an envelope from a list of envelopes in your Yoti Sign account.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await fetchAllRecords<Envelope>(
      client,
      "/organisations/envelopes/search",
      {},
    );

    return {
      result: data
        .map<Element>((item) => ({
          label: item.envelope,
          key: item.envelope_id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Envelope", key: "example-envelope-id-123" }],
  },
});
