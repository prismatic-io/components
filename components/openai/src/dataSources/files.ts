import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, timeout } from "../inputs";

const selectFile = dataSource({
  display: {
    label: "Select File",
    description: "Select a file from the list of uploaded files.",
  },
  inputs: {
    connection: connectionInput,
    timeout,
  },
  perform: async (_context, params) => {
    const client = createClient(params.connection, false, params.timeout);
    const { data } = await client.get<{
      data: { id: string; filename: string }[];
    }>("/v1/files");

    const result = data.data
      .map<Element>(({ id, filename }) => ({
        label: filename,
        key: id,
      }))
      .sort((a, b) => ((a.label || "") < (b.label || "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "training_data.jsonl", key: "file-abc123" },
      { label: "validation_data.jsonl", key: "file-xyz456" },
    ],
  },
});

export default { selectFile };
