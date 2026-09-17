import { action, outputSchema } from "@prismatic-io/spectral";
import { createActivityClient } from "../../client";
import { queryDriveActivityInputs } from "../../inputs";
import { queryDriveActivityOutputSchema } from "../../outputSchemas";
import { getQueryDriveActivity } from "../../util";
import { queryDriveActivityExamplePayload } from "../../examplePayloads";
export const queryDriveActivity = action({
  display: {
    label: "Query Drive Activity",
    description: "Query past activity in Google Drive.",
  },
  performSafety: "notAllowed",
  perform: async (
    _context,
    {
      connection,
      pageToken,
      ancestorName,
      consolidationStrategy,
      filter,
      itemName,
      fetchAll,
    },
  ) => {
    const drive = createActivityClient(connection);
    const data = await getQueryDriveActivity(
      drive,
      { pageToken, ancestorName, filter, itemName, consolidationStrategy },
      fetchAll,
    );
    return {
      data,
    };
  },
  inputs: queryDriveActivityInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: queryDriveActivityOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => queryDriveActivityExamplePayload,
  examplePayload: queryDriveActivityExamplePayload,
});
