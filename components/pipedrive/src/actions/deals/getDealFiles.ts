import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  dealIdInput,
  paginationLimitInput,
  paginationStartInput,
  sortInput,
} from "../../inputs";
import { cleanNumber } from "../../util";

export const getDealFiles = action({
  display: {
    label: "Get Deal Files",
    description: "Lists files attached to a deal.",
  },
  perform: async (context, { connection, id, start, limit, includeDeletedFiles, sort, cursor }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/deals/${id}/files`, {
      params: {
        start,
        limit,
        include_deleted_files: includeDeletedFiles,
        sort,
        cursor,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
    cursor,
    includeDeletedFiles: input({
      label: "Include Deleted Files",
      type: "string",
      model: [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
      ],
      clean: cleanNumber,
      comments: "When enabled, the list of files will also include deleted files",
    }),
    sort: sortInput,
  },
});
