import { action, outputSchema } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listDriveItemsExamplePayload } from "../../examplePayloads";
import { listDriveItemsInputs } from "../../inputs";
import { listDriveItemsOutputSchema } from "../../outputSchemas";
import { resolvePagination } from "../../util";

export const listDriveItems = action({
  display: {
    label: "List Items In Directory",
    description: "Returns a list of all items in the given directory.",
  },
  inputs: listDriveItemsInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, dir, fetchAll, ...paging }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    const path =
      dir === "/"
        ? "/me/drive/root/children"
        : `/me/drive/root:${dir}:/children`;
    return await paginateResults<
      (typeof listDriveItemsExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: path,
      fetchAll,
      ...resolvePagination(paging),
    });
  },
  examplePerform: async () => listDriveItemsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDriveItemsOutputSchema,
  }),
  examplePayload: listDriveItemsExamplePayload,
});
