import { action } from "@prismatic-io/spectral";
import { createActivityClient } from "../client";
import {
  pageToken,
  connection,
  consolidationStrategy,
  filter,
  itemName,
  ancestorName,
  fetchAll,
} from "../inputs";
import { getQueryDriveActivity } from "../util";
import { getActivityExamplePayload } from "../examplePayloads";

export const queryDriveActivity = action({
  display: {
    label: "Query Drive Activity",
    description: "Query past activity in Google Drive.",
  },
  perform: async (
    _context,
    { connection, pageToken, ancestorName, consolidationStrategy, filter, itemName, fetchAll },
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
  inputs: {
    connection,
    itemName,
    ancestorName,
    pageToken,
    filter,
    consolidationStrategy,
    fetchAll,
  },
  examplePayload: { ...getActivityExamplePayload },
});
