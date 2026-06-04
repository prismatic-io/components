import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWorkspacesExamplePayload } from "../../examplePayloads";
import { listWorkspacesInputs } from "../../inputs";
import { warnDeprecatedInputs } from "../../util/deprecation";
import { paginateByToken } from "../../util/pagination";

export const listWorkspaces = action({
  display: {
    label: "List Workspaces",
    description: "Lists all workspaces accessible to the authenticated user.",
  },
  perform: async (context, { connection, includeAll }) => {
    warnDeprecatedInputs(context, "listWorkspaces", includeAll);
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateByToken(client, "/workspaces");
    return { data };
  },
  inputs: listWorkspacesInputs,
  examplePayload: listWorkspacesExamplePayload,
});
