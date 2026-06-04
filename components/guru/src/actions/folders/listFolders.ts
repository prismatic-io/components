import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { listFoldersInputs } from "../../inputs";
import { fetchGuruResults } from "../../util";
import { listFoldersPayload } from "../../examplePayloads";

export const listFolders = action({
  display: {
    label: "List Folders",
    description: "Retrieve a list of all folders",
  },
  perform: async (context, { connection, q, search, fetchAll }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const queryParams = {
      q,
      search,
    };

    const data = await fetchGuruResults(
      client,
      "/folders",
      fetchAll,
      queryParams,
    );

    return { data };
  },
  inputs: listFoldersInputs,
  examplePayload: listFoldersPayload,
});
