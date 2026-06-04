import { action, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, pageLimit, pageToken } from "../inputs";
import { handleErrors } from "../errors";
import { listGroupsExamplePayload } from "../examplePayloads";

export const listGroups = action({
  display: {
    label: "List Groups",
    description: "Returns a list of all groups the user has access to",
  },
  perform: async (context, { connection, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get("/groups", {
          params:
            pageLimit || pageToken
              ? {
                  $top: util.types.toInt(pageLimit) || undefined,
                  $skipToken: util.types.toString(pageToken) || undefined,
                }
              : undefined,
        }),
      ),
    };
  },
  inputs: {
    connection: oneDriveConnection,
    pageToken,
    pageLimit,
  },
  examplePayload: listGroupsExamplePayload,
});
