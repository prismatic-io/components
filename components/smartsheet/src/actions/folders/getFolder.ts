import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFolderExamplePayload } from "../../examplePayloads";
import { getFolderInputs } from "../../inputs";
import { mergeMetadataChildren } from "../../util/mergeChildren";
import { paginateByToken } from "../../util/pagination";




export const getFolder = action({
  display: {
    label: "Get Folder",
    description: "Retrieves a folder by its ID.",
  },
  perform: async (context, { connection, folderId }) => {
    const client = createClient(connection, context.debug.enabled);

    
    const [metadataRes, children] = await Promise.all([
      client.get<Record<string, unknown>>(`/folders/${folderId}/metadata`, {
        params: { include: "source" },
      }),
      paginateByToken<Record<string, unknown>>(
        client,
        `/folders/${folderId}/children`,
      ),
    ]);

    const data = mergeMetadataChildren(metadataRes.data ?? {}, children);
    return { data };
  },
  inputs: getFolderInputs,
  examplePayload: getFolderExamplePayload,
});
