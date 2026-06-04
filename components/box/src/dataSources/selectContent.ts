import { dataSource, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { connectionInput, contentType, limit, marker, offset } from "../inputs";
import { getFolderEntries, getPathEntries } from "../utils";

export const selectContent = dataSource({
  display: {
    label: "Select File or Folder",
    description: "Select file or folder from Box account base path",
  },
  dataSourceType: "picklist",
  perform: async (context, params) => {
    const client = createAuthorizedClient({
      boxConnection: params.boxConnection,
    });
    const pathEntries = await getPathEntries(client, "/");

    
    const { id, type, name } = pathEntries.slice(-1)[0];

    if (type !== "folder") {
      throw Error(`'${name}' is not a folder`);
    }

    let allEntries = await getFolderEntries({
      client,
      id,
      limit: util.types.toInt(params.limit) || undefined,
      marker: util.types.toString(params.marker) || undefined,
      offset: util.types.toInt(params.offset) || undefined,
    });

    switch (params.contentType) {
      case "file":
        allEntries = allEntries.filter((entry) => entry.type === "file");
        break;
      case "folder":
        allEntries = allEntries.filter((entry) => entry.type === "folder");
        break;
      case "all":
        
        break;
      default:
        throw new Error(
          `Invalid content type specified: ${params.contentType}`,
        );
    }
    return {
      result: allEntries.map((entry) => ({
        label: `${entry.name} (${entry.type})`,
        key: entry.id,
      })),
    };
  },
  inputs: {
    boxConnection: connectionInput,
    contentType,
    limit,
    marker,
    offset,
  },
});
