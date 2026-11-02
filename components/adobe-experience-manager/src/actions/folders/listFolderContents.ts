import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { FOLDERS_API_PATH, MAX_PAGE_LIMIT } from "../../constants";
import { listFolderContentsExamplePayload } from "../../examplePayloads";
import { listFolderContentsInputs } from "../../inputs";
import { listFolderContentsOutputSchema } from "../../outputSchemas";
import type { FolderListingItem, FolderListingResponse } from "../../types";

export const listFolderContents = action({
  display: {
    label: "List Folder Contents",
    description: "List the folders and assets directly inside a folder.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, path, fetchAll, pagination, types, orderBy },
  ) => {
    const client = createAemClient(connection, context.debug.enabled);
    const url = `${FOLDERS_API_PATH}/`;
    if (!fetchAll) {
      const { data } = await client.get<FolderListingResponse>(url, {
        params: {
          path,
          types,
          orderBy,
          cursor: pagination?.cursor,
          limit: pagination?.limit,
        },
      });
      return { data };
    }
    const children: FolderListingItem[] = [];
    let self: FolderListingItem | undefined;
    let next: string | undefined = pagination?.cursor;
    do {
      const { data } = await client.get<FolderListingResponse>(url, {
        params: { path, types, orderBy, cursor: next, limit: MAX_PAGE_LIMIT },
      });
      self = self ?? data.self;
      children.push(...(data.children ?? []));
      next = data.cursor;
    } while (next);
    return { data: { self, children } };
  },
  inputs: listFolderContentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFolderContentsOutputSchema,
  }),
  examplePerform: async () => listFolderContentsExamplePayload,
  examplePayload: listFolderContentsExamplePayload,
});
