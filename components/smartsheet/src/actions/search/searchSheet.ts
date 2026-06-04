import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchSheetExamplePayload } from "../../examplePayloads";
import { searchSheetInputs } from "../../inputs";

export const searchSheet = action({
  display: {
    label: "Search Sheets",
    description: "Searches sheets for a specified phrase.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, query },
  ) => {
    const client = createClient(connection, debug);
    const endpoint = sheetId ? `/search/sheets/${sheetId}` : "/search";
    const { data } = await client.get(endpoint, { params: { query } });
    return { data };
  },
  inputs: searchSheetInputs,
  examplePayload: searchSheetExamplePayload,
});
