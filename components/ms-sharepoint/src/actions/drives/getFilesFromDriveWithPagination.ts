import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFilesFromDriveWithPaginationExamplePayload } from "../../examplePayloads";
import { getFilesFromDriveWithPaginationInputs } from "../../inputs";
import { getFilesFromDriveFN, getSkipToken, paginateResults, resolvePagination } from "../../util";
import { listDriveFilesOutputSchema } from "../../outputSchemas";

export const getFilesFromDriveWithPagination = action({
  display: {
    label: "List Files in Drive",
    description: "List all the files from a Drive.",
  },
  inputs: getFilesFromDriveWithPaginationInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, driveId, fetchAll, recursive, ...paging }) => {
    const client = await createClient(connection, context.debug.enabled);
    const endpoint = `/drives/${driveId}/root/children`;

    if (fetchAll) {
      if (recursive) {
        const data = await getFilesFromDriveFN(client, driveId);
        return { data };
      }
      const results = await paginateResults(client, endpoint, { returnFullData: true });
      return {
        data: results,
      };
    }

    const { pageLimit, pageToken } = resolvePagination(paging);
    const { data } = await client.get(endpoint, {
      params: { $top: pageLimit, $skipToken: pageToken },
    });

    if (data["@odata.nextLink"]) {
      data["@odata.nextToken"] = getSkipToken(data["@odata.nextLink"]);
    }

    if (recursive) {
      const { value: allFiles } = await getFilesFromDriveFN(client, driveId, data.value);
      return {
        data: {
          ...data,
          value: allFiles,
        },
      };
    }

    return {
      data,
    };
  },
  examplePerform: async () => getFilesFromDriveWithPaginationExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDriveFilesOutputSchema,
  }),
  examplePayload: getFilesFromDriveWithPaginationExamplePayload,
});
