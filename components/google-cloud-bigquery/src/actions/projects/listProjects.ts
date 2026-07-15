import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listProjectsInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
export const listProjects = action({
  display: {
    description:
      "Lists projects to which the user has been granted any project role.",
    label: "List Projects",
  },
  inputs: listProjectsInputs,
  perform: async (_context, { connectionInput, pagination = {}, fetchAll }) => {
    const client = createClient(connectionInput);
    return await paginateResults(
      (params) => client.projects.list(params),
      {
        maxResults: pagination.maxResults || undefined,
        pageToken: pagination.pageToken || undefined,
      },
      fetchAll,
      "projects",
    );
  },
});
