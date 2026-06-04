import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { listSitesExamplePayload } from "../../examplePayloads/sites";
import { getSitesInputs } from "../../inputs";
import { fetchPaginatedResults } from "../../util";






export const listSites = action({
  display: {
    label: "List Sites",
    description: "Retrieve a list of sites accessible to the user.",
  },
  inputs: getSitesInputs,
  perform: async (
    context,
    { ssvConnection, fetchAll, pageNumber, pageSize, modifiedAfter },
  ) => {
    const client = await createSsvClient(ssvConnection, context);

    const data = await fetchPaginatedResults(client, "/v3/sitelist", {
      fetchAll,
      pageNumber,
      pageSize,
      additionalParams: {
        ...(modifiedAfter ? { "filter[modified_after]": modifiedAfter } : {}),
      },
    });

    return { data };
  },
  examplePayload: listSitesExamplePayload,
});
