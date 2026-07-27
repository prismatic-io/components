import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listDrivesExamplePayload } from "../../examplePayloads";
import { listDrivesBySiteInputs } from "../../inputs";
export const listDrivesBySite = action({
  display: {
    label: "List Drives By Site",
    description: "Returns a list of all drives available to the given site",
  },
  perform: async (
    context,
    { connection, siteId, fetchAll, pageLimit, pageToken },
  ) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listDrivesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/sites/${siteId}/drives`,
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  inputs: listDrivesBySiteInputs,
  examplePayload: listDrivesExamplePayload,
});
