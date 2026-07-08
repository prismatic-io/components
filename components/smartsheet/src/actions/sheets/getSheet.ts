import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSheetExamplePayload } from "../../examplePayloads";
import { getSheetInputs } from "../../inputs";
export const getSheet = action({
  display: {
    label: "Get Sheet",
    description: "Retrieves a sheet by its ID.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, pagination },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/sheets/${sheetId}`, {
      params: {
        pageSize: pagination.pageSize,
        page: pagination.page,
      },
    });
    return { data };
  },
  inputs: getSheetInputs,
  examplePayload: getSheetExamplePayload,
});
