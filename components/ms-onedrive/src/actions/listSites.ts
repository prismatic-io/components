import { action, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, pageLimit, pageToken } from "../inputs";
import { handleErrors } from "../errors";
import { listSitesExamplePayload } from "../examplePayloads";

export const listSites = action({
  display: {
    label: "List Sites",
    description: "Returns a list of all sites available to the current user",
  },
  perform: async (context, { connection, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get("/sites", {
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
    pageLimit,
    pageToken,
  },
  examplePayload: listSitesExamplePayload,
});
