import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { setSheetPublishExamplePayload } from "../../examplePayloads";
import { setSheetPublishInputs } from "../../inputs";

export const setSheetPublish = action({
  display: {
    label: "Set Sheet Publish Status",
    description: "Sets the publish status of a sheet.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      sheetId,
      icalEnabled,
      readOnlyFullAccessibleBy,
      readOnlyFullDefaultView,
      readOnlyFullEnabled,
      readOnlyLiteEnabled,
      readWriteAccessibleBy,
      readWriteDefaultView,
      readWriteEnabled,
    },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.put(`/sheets/${sheetId}/publish`, {
      icalEnabled,
      readOnlyFullAccessibleBy,
      readOnlyFullDefaultView,
      readOnlyFullEnabled,
      readOnlyLiteEnabled,
      readWriteAccessibleBy,
      readWriteDefaultView,
      readWriteEnabled,
    });
    return { data };
  },
  inputs: setSheetPublishInputs,
  examplePayload: setSheetPublishExamplePayload,
});
