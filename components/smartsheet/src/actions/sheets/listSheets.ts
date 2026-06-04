import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSheetsExamplePayload } from "../../examplePayloads";
import { listSheetsInputs } from "../../inputs";

export const listSheets = action({
  display: {
    label: "List Sheets",
    description: "Lists all sheets accessible to the authenticated user.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, includeAll, modifiedSince, page, pageSize },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/sheets`, {
      params: {
        include: "sheetVersion",
        includeAll,
        modifiedSince,
        page,
        pageSize,
      },
    });
    return { data };
  },
  inputs: listSheetsInputs,
  examplePayload: listSheetsExamplePayload,
});
