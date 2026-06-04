import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listFoldersExamplePayload } from "../../examplePayloads";
import { listFoldersInputs } from "../../inputs";
import { warnDeprecatedInputs } from "../../util/deprecation";
import { CHILD_TYPE } from "../../util/mergeChildren";
import { paginateByToken } from "../../util/pagination";

export const listFolders = action({
  display: {
    label: "List Folders",
    description: "Lists folders, subfolders, or workspace folders.",
  },
  perform: async (
    context,
    { connection, folderId, workspaceId, includeAll },
  ) => {
    warnDeprecatedInputs(context, "listFolders", includeAll);
    const client = createClient(connection, context.debug.enabled);

    if (workspaceId) {
      const items = await paginateByToken<Record<string, unknown>>(
        client,
        `/workspaces/${workspaceId}/children`,
      );
      return { data: items.filter((c) => c.type === CHILD_TYPE.FOLDER) };
    }

    if (folderId) {
      const items = await paginateByToken<Record<string, unknown>>(
        client,
        `/folders/${folderId}/children`,
      );
      return { data: items.filter((c) => c.type === CHILD_TYPE.FOLDER) };
    }

    
    const { data } = await client.get("/home/folders");
    return { data };
  },
  inputs: listFoldersInputs,
  examplePayload: listFoldersExamplePayload,
});
