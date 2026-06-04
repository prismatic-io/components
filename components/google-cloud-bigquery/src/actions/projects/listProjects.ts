import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, fetchAll, maxResults, pageToken } from "../../inputs";
import { paginateResults } from "../../utils/pagination";

export const listProjects = action({
  display: {
    description:
      "Lists projects to which the user has been granted any project role.",
    label: "List Projects",
  },
  inputs: {
    connectionInput,
    pageToken,
    maxResults,
    fetchAll,
  },
  perform: async (
    _context,
    { connectionInput, pageToken, maxResults, fetchAll },
  ) => {
    const client = createClient(connectionInput);
    return paginateResults(
      (params) => client.projects.list(params),
      {
        maxResults: maxResults || undefined,
        pageToken: pageToken || undefined,
      },
      fetchAll,
      "projects",
    );
  },
});
