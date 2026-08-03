import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import {
  path,
  limit,
  marker,
  offset,
  connectionInput,
  fetchAll,
  fields,
} from "../inputs";
import { getPathEntries, getFolderEntries } from "../utils";
import {
  listFolderExamplePayload,
  listFolderWithPaginationExamplePayload,
} from "../examplePayloads";
export const listFolder = action({
  display: {
    label: "List Folder (Deprecated)",
    description:
      "List Folder contents at the specified path. This version of " +
      "the action is being deprecated. Please replace action with List Folder.",
  },
  perform: async (context, params) => {
    const client = createAuthorizedClient({
      boxConnection: params.boxConnection,
    });
    const pathEntries = await getPathEntries(
      client,
      util.types.toString(params.path),
    );
    const { id, type, name } = pathEntries.slice(-1)[0];
    if (type !== "folder") {
      throw Error(`'${name}' is not a folder`);
    }
    const allEntries = await getFolderEntries({
      client,
      id,
      limit: util.types.toInt(params.limit) || undefined,
      marker: util.types.toString(params.marker) || undefined,
      offset: util.types.toInt(params.offset) || undefined,
    });
    return {
      data: allEntries,
    };
  },
  inputs: { path, limit, marker, offset, boxConnection: connectionInput },
  examplePayload: listFolderExamplePayload,
});
export const listFolderWithPagination = action({
  display: {
    label: "List Folder",
    description: "List Folder contents at the specified path. ",
  },
  perform: async (context, params) => {
    const client = createAuthorizedClient({
      boxConnection: params.boxConnection,
    });
    const pathEntries = await getPathEntries(
      client,
      util.types.toString(params.path),
    );
    const { id, type, name } = pathEntries.slice(-1)[0];
    if (type !== "folder") {
      throw Error(`'${name}' is not a folder`);
    }
    if (params.fetchAll) {
      const allEntries = await getFolderEntries({
        client,
        id,
        limit: 1000,
        marker: undefined,
        offset: 0,
        fields: params.fields ? util.types.toString(params.fields) : undefined,
      });
      return {
        data: {
          entries: allEntries,
          pagination: 1000,
        },
      };
    }
    const result = await client.folders.getFolderItems(
      util.types.toString(id),
      {
        queryParams: {
          usemarker: true,
          marker: util.types.toString(params.marker) || undefined,
          limit: util.types.toInt(params.limit) || undefined,
          offset: util.types.toInt(params.offset) || undefined,
          fields: params.fields
            ? util.types.toString(params.fields).split(",")
            : undefined,
        },
      },
    );
    return {
      data: {
        entries: (result.entries ?? []).map((entry) => entry.rawData),
        pagination: {
          next_marker: result.nextMarker,
          limit: result.limit,
        },
      },
    };
  },
  inputs: {
    fetchAll,
    path,
    fields,
    limit,
    marker,
    offset,
    boxConnection: connectionInput,
  },
  examplePayload: listFolderWithPaginationExamplePayload,
});
