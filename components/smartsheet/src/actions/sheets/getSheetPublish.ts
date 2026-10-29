import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSheetPublishExamplePayload } from "../../examplePayloads";
import { getSheetPublishInputs } from "../../inputs";

export const getSheetPublish = action({
  display: {
    label: "Get Sheet Publish Status",
    description: "Retrieves the publish status of a sheet.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, sheetId }) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/sheets/${sheetId}/publish`);
    return { data };
  },
  inputs: getSheetPublishInputs,
  examplePayload: getSheetPublishExamplePayload,
});
