import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectDocumentExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

export const selectDocument = dataSource({
  display: {
    label: "Select Document",
    description: "Select a document from your Sage HR account.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/documents");

    if (data.data) {
      const result: Element[] = data.data
        .map((item: { id: number; file_name: string }) => ({
          label: item.file_name,
          key: item.id.toString(),
        }))
        .sort((a: Element, b: Element) => (a.label < b.label ? -1 : 1));
      return { result };
    }

    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: selectDocumentExamplePayload,
});
