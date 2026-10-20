import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createGitlabClient } from "../client";
import { KEYSET_ORDER_BY_ID } from "../constants";
import { selectProjectExamplePayload } from "../examplePayloads";
import { selectProjectInputs } from "../inputs";
import type { Project } from "../types";
import { fetchAllKeysetPages } from "../utils";
export const selectProject = dataSource({
  display: {
    label: "Select Project",
    description: "Select a project the connection's user is a member of.",
  },
  inputs: selectProjectInputs,
  perform: async (_context, { connection }) => {
    const client = createGitlabClient(connection, false);
    const projects = await fetchAllKeysetPages<Project>(
      client,
      "/projects",
      KEYSET_ORDER_BY_ID,
      { membership: true, simple: true },
    );
    const result: Element[] = projects
      .map((item) => ({
        label: item.path_with_namespace,
        key: util.types.toString(item.id),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectProjectExamplePayload,
});
