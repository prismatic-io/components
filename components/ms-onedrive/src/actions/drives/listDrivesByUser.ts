import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listDrivesExamplePayload } from "../../examplePayloads";
import { listDrivesByUserInputs } from "../../inputs";
export const listDrivesByUser = action({
  display: {
    label: "List Drives By User",
    description: "Returns a list of all drives available to the given user",
  },
  perform: async (
    context,
    { connection, userId, fetchAll, pageLimit, pageToken },
  ) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listDrivesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/users/${userId}/drives`,
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  inputs: listDrivesByUserInputs,
  examplePayload: listDrivesExamplePayload,
});
