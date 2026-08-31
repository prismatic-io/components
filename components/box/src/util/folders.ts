import { util } from "@prismatic-io/spectral";
import type { BoxClient } from "box-node-sdk";
import { FOLDER_TYPE } from "../constants";
import type { BoxRawEntry, GetFolderEntriesParams } from "../types";
export const getFolderEntries = async <T extends BoxRawEntry = BoxRawEntry>({
  client,
  id,
  limit,
  marker,
  offset,
  fields,
}: GetFolderEntriesParams): Promise<T[]> => {
  let initial = true;
  let allEntries: T[] = [];
  while (initial || marker) {
    const response = await client.folders.getFolderItems(id, {
      queryParams: {
        usemarker: true,
        marker,
        limit,
        offset,
        fields: fields ? fields.split(",") : undefined,
      },
    });
    initial = false;
    allEntries = allEntries.concat(
      (response.entries ?? []).map((entry) => entry.rawData as T),
    );
    marker = response.nextMarker;
  }
  return allEntries;
};
export const getPathEntries = async (
  client: BoxClient,
  path: string,
  lastShouldExist = true,
): Promise<
  {
    id?: string;
    type?: string;
    name?: string;
  }[]
> => {
  if (!path.startsWith("/")) {
    throw Error("Path must start with '/'");
  }
  if (path === "/") {
    path = "";
  }
  let allEntries: BoxRawEntry[] = [
    {
      id: "0",
      name: "",
      type: FOLDER_TYPE,
    },
  ];
  const pathEntries: {
    id?: string;
    type?: string;
    name?: string;
  }[] = [];
  const pathParts = path.split("/");
  for (const [i, part] of pathParts.entries()) {
    const isLastPart = i === pathParts.length - 1;
    const found = allEntries.find((entry) => entry.name === part) || {};
    const id =
      found.id !== undefined ? util.types.toString(found.id) : undefined;
    const type =
      found.type !== undefined ? util.types.toString(found.type) : undefined;
    const name =
      found.name !== undefined ? util.types.toString(found.name) : undefined;
    if (id) {
      if (isLastPart && !lastShouldExist) {
        throw Error(`Expected '${part}' to not exist`);
      }
      pathEntries.push({ id, type, name });
      if (type === FOLDER_TYPE && !isLastPart) {
        allEntries = await getFolderEntries({ client, id });
      }
    } else if (isLastPart && !lastShouldExist) {
      pathEntries.push({ name: part });
    } else {
      throw Error(`Expected '${part}' to exist in path '${path}'`);
    }
  }
  return pathEntries;
};
