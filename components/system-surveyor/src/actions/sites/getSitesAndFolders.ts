import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { getSitesAndFoldersExamplePayload } from "../../examplePayloads/sites";
import { getSitesAndFoldersInputs } from "../../inputs";
import { fetchPaginatedResults } from "../../util";







export const getSitesAndFolders = action({
  display: {
    label: "Get Sites and Folders",
    description: "Retrieve a list of sites and folders accessible to the user.",
  },
  inputs: getSitesAndFoldersInputs,
  perform: async (
    context,
    { ssvConnection, fetchAll, pageNumber, pageSize, modifiedAfter },
  ) => {
    const client = await createSsvClient(ssvConnection, context);

    const data = await fetchPaginatedResults(client, "/v3/sites", {
      fetchAll,
      pageNumber,
      pageSize,
      dataKey: "sites",
      additionalParams: {
        ...(modifiedAfter ? { "filter[modified_after]": modifiedAfter } : {}),
      },
    });

    return { data };
  },
  examplePayload: getSitesAndFoldersExamplePayload,
});
