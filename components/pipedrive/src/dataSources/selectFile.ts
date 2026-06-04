import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { sortRecords } from "../util";

interface PipedriveFile {
  id: number;
  file_name: string;
  file_type: string;
}

export const selectFile = dataSource({
  display: {
    label: "Select File",
    description: "Select a file from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false);
    const { data } = await client.get<{ data: PipedriveFile[] }>("/files");

    const files = data?.data ?? [];

    const result = sortRecords(files, "file_name").map<Element>((file) => ({
      key: file.id.toString(),
      label: file.file_name,
    }));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "document.pdf", key: "123" }],
  },
});
