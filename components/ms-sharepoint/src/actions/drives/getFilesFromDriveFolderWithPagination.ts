import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFilesFromDriveFolderWithPaginationExamplePayload } from "../../examplePayloads";
import { getFilesFromDriveFolderWithPaginationInputs } from "../../inputs";
import { getSkipToken, paginateResults, resolvePagination } from "../../util";
import { listDriveFolderFilesOutputSchema } from "../../outputSchemas";

export const getFilesFromDriveFolderWithPagination = action({
  display: {
    label: "List Folder Files in Drive",
    description: "List all the files inside of a folder from a Drive.",
  },
  inputs: getFilesFromDriveFolderWithPaginationInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, folderId, driveId, fetchAll, ...paging },
  ) => {
    const endpoint = `/drives/${driveId}/items/${folderId}/children`;
    const client = await createClient(connection, debug);

    if (fetchAll) {
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

    return {
      data,
    };
  },
  examplePerform: async () => getFilesFromDriveFolderWithPaginationExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDriveFolderFilesOutputSchema,
  }),
  examplePayload: getFilesFromDriveFolderWithPaginationExamplePayload,
});
