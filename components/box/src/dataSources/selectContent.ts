import { dataSource, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { FILE_TYPE, FOLDER_TYPE } from "../constants";
import { selectContentExamplePayload } from "../examplePayloads";
import { selectContentInputs } from "../inputs";
import { getFolderEntries, getPathEntries } from "../util";
export const selectContent = dataSource({
  display: {
    label: "Select File or Folder",
    description: "Select file or folder from Box account base path.",
  },
  dataSourceType: "picklist",
  perform: async (context, params) => {
    const client = createAuthorizedClient({
      boxConnection: params.boxConnection,
    });
    const pathEntries = await getPathEntries(client, "/");
    const { id, type, name } = pathEntries.slice(-1)[0];
    if (type !== FOLDER_TYPE) {
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
      case FILE_TYPE:
        allEntries = allEntries.filter((entry) => entry.type === FILE_TYPE);
        break;
      case FOLDER_TYPE:
        allEntries = allEntries.filter((entry) => entry.type === FOLDER_TYPE);
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
        label: `${util.types.toString(entry.name)} (${util.types.toString(entry.type)})`,
        key: util.types.toString(entry.id),
      })),
    };
  },
  inputs: selectContentInputs,
  examplePayload: selectContentExamplePayload,
});
