import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWorkspaceExamplePayload } from "../../examplePayloads";
import { getWorkspaceInputs } from "../../inputs";
import { mergeMetadataChildren } from "../../util/mergeChildren";
import { paginateByToken } from "../../util/pagination";




export const getWorkspace = action({
  display: {
    label: "Get Workspace",
    description: "Retrieves a workspace by its ID.",
  },
  perform: async (context, { connection, workspaceId }) => {
    const client = createClient(connection, context.debug.enabled);

    
    const [metadataRes, children] = await Promise.all([
      client.get<Record<string, unknown>>(
        `/workspaces/${workspaceId}/metadata`,
        { params: { include: "source" } },
      ),
      paginateByToken<Record<string, unknown>>(
        client,
        `/workspaces/${workspaceId}/children`,
      ),
    ]);

    const data = mergeMetadataChildren(metadataRes.data ?? {}, children);
    return { data };
  },
  inputs: getWorkspaceInputs,
  examplePayload: getWorkspaceExamplePayload,
});
