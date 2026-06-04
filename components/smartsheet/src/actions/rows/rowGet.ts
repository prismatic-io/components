import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { rowGetExamplePayload } from "../../examplePayloads";
import { rowGetInputs } from "../../inputs";

export const rowGet = action({
  display: {
    label: "Get Row",
    description: "Retrieves the contents of a row by its ID.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, rowId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/sheets/${sheetId}/rows/${rowId}`, {
      params: {
        include:
          "attachments,columnType,discussions,filters,format,objectValue,rowPermalink,writerInfo",
      },
    });
    return { data };
  },
  inputs: rowGetInputs,
  examplePayload: rowGetExamplePayload,
});
