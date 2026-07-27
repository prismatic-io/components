import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listDrivesExamplePayload } from "../../examplePayloads";
import { listDrivesByGroupInputs } from "../../inputs";
export const listDrivesByGroup = action({
  display: {
    label: "List Drives By Group",
    description: "Returns a list of all drives available to the given group",
  },
  perform: async (
    context,
    { connection, groupId, fetchAll, pageLimit, pageToken },
  ) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listDrivesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/groups/${groupId}/drives`,
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  inputs: listDrivesByGroupInputs,
  examplePayload: listDrivesExamplePayload,
});
