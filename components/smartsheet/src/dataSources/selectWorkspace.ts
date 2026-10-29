import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectWorkspaceInputs } from "../inputs";
import { paginateByToken } from "../util/pagination";

export const selectWorkspace = dataSource({
  display: {
    label: "Select Workspace",
    description: "Select a workspace from the Smartsheet account.",
  },
  dataSourceType: "picklist",
  inputs: selectWorkspaceInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const workspaces = await paginateByToken<{ id: unknown; name: string }>(
      client,
      "/workspaces",
    );

    const result: Element[] = workspaces.map(({ name: label, id: key }) => ({
      label,
      key: util.types.toString(key),
    }));

    return { result };
  },
});
