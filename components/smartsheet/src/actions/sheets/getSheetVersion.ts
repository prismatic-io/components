import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSheetVersionExamplePayload } from "../../examplePayloads";
import { getSheetVersionInputs } from "../../inputs";

export const getSheetVersion = action({
  display: {
    label: "Get Sheet Version",
    description: "Retrieves the version number of a sheet.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, sheetId }) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/sheets/${sheetId}/version`);
    return { data };
  },
  inputs: getSheetVersionInputs,
  examplePayload: getSheetVersionExamplePayload,
});
