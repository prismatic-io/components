import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listDrivesExamplePayload } from "../../examplePayloads";
import { listDrivesInputs } from "../../inputs";
export const listDrives = action({
  display: {
    label: "List My Drives",
    description: "Returns a list of all drives available to the current user",
  },
  perform: async (context, { connection, fetchAll, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listDrivesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: "/me/drives",
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  inputs: listDrivesInputs,
  examplePayload: listDrivesExamplePayload,
});
