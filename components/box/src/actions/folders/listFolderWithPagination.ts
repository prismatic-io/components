import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { FOLDER_TYPE, MAX_PAGE_SIZE } from "../../constants";
import { listFolderWithPaginationExamplePayload } from "../../examplePayloads";
import { listFolderWithPaginationInputs } from "../../inputs";
import { listFolderWithPaginationOutputSchema } from "../../outputSchemas";
import { getFolderEntries, getPathEntries } from "../../util";
export const listFolderWithPagination = action({
  display: {
    label: "List Folder",
    description: "List Folder contents at the specified path. ",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createAuthorizedClient({
      boxConnection: params.boxConnection,
    });
    const pathEntries = await getPathEntries(
      client,
      util.types.toString(params.path),
    );
    const { id, type, name } = pathEntries.slice(-1)[0];
    if (type !== FOLDER_TYPE) {
      throw Error(`'${name}' is not a folder`);
    }
    if (params.fetchAll) {
      const allEntries = await getFolderEntries({
        client,
        id,
        limit: MAX_PAGE_SIZE,
        marker: undefined,
        offset: 0,
        fields: params.fields ? util.types.toString(params.fields) : undefined,
      });
      return {
        data: {
          entries: allEntries,
          pagination: MAX_PAGE_SIZE,
        },
      };
    }
    const result = await client.folders.getFolderItems(
      util.types.toString(id),
      {
        queryParams: {
          usemarker: true,
          marker: util.types.toString(params.pagination.marker) || undefined,
          limit: util.types.toInt(params.pagination.limit) || undefined,
          offset: util.types.toInt(params.pagination.offset) || undefined,
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
  examplePerform: async (
    _context,
    params,
  ): Promise<{
    data: unknown;
  }> => {
    const { entries } = listFolderWithPaginationExamplePayload.data;
    if (params.fetchAll) {
      return { data: { entries, pagination: MAX_PAGE_SIZE } };
    }
    return {
      data: {
        entries,
        pagination: {
          ...listFolderWithPaginationExamplePayload.data.pagination,
          limit:
            util.types.toInt(params.pagination.limit) ||
            listFolderWithPaginationExamplePayload.data.pagination.limit,
        },
      },
    };
  },
  inputs: listFolderWithPaginationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFolderWithPaginationOutputSchema,
  }),
  examplePayload: listFolderWithPaginationExamplePayload,
});
