import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { listDeletedSitesExamplePayload } from "../../examplePayloads/sites";
import { listDeletedSitesInputs } from "../../inputs";
import { fetchPaginatedResults } from "../../util";






export const listDeletedSites = action({
  display: {
    label: "List Deleted Sites",
    description: "Retrieve a list of deleted sites.",
  },
  inputs: listDeletedSitesInputs,
  perform: async (
    context,
    { ssvConnection, fetchAll, pageNumber, pageSize },
  ) => {
    const client = await createSsvClient(ssvConnection, context);

    const data = await fetchPaginatedResults(client, "/v3/deleted_sites", {
      fetchAll,
      pageNumber,
      pageSize,
    });

    return { data };
  },
  examplePayload: listDeletedSitesExamplePayload,
});
