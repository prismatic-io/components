import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { listGroupsInputs } from "../../inputs";
export const listGroups = action({
  display: {
    label: "List Groups",
    description: "Returns a list of all groups the user has access to",
  },
  perform: async (context, { connection, fetchAll, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listGroupsExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: "/groups",
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  inputs: listGroupsInputs,
  examplePayload: listGroupsExamplePayload,
});
