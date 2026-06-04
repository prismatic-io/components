import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  paginationLimitInput,
  paginationStartInput,
  personIdInput,
  sortInput,
} from "../../inputs";
import { cleanNumber } from "../../util";

export const getPersonFiles = action({
  display: {
    label: "Get Person Files",
    description: "Lists files attached to a person.",
  },
  perform: async (context, { connection, id, start, limit, includeDeletedFiles, sort }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/persons/${id}/files`, {
      params: {
        start,
        limit,
        include_deleted_files: includeDeletedFiles,
        sort,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
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
