import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectFolderInputs } from "../inputs";
import { CHILD_TYPE } from "../util/mergeChildren";
import { paginateByToken } from "../util/pagination";

interface WorkspaceRef {
  id: unknown;
  name: string;
}

interface ChildItem {
  id: unknown;
  name: string;
  type: string;
}

export const selectFolder = dataSource({
  display: {
    label: "Select Folder",
    description: "Select a folder from the Smartsheet home or workspace.",
  },
  dataSourceType: "picklist",
  inputs: selectFolderInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    
    
    
    const [workspaces, homeRes] = await Promise.all([
      paginateByToken<WorkspaceRef>(client, "/workspaces"),
      client.get("/home", { params: { include: "folders" } }),
    ]);

    const folders: Element[] = [];

    for (const workspace of workspaces) {
      const children = await paginateByToken<ChildItem>(
        client,
        `/workspaces/${util.types.toString(workspace.id)}/children`,
      );
      for (const child of children) {
        if (child.type === CHILD_TYPE.FOLDER) {
          folders.push({
            label: `${child.name} (${workspace.name})`,
            key: util.types.toString(child.id),
          });
        }
      }
    }

    const home = homeRes.data?.data ?? homeRes.data;
    if (home?.folders) {
      for (const folder of home.folders) {
        folders.push({
          label: folder.name,
          key: util.types.toString(folder.id),
        });
      }
    }

    return { result: folders };
  },
});
