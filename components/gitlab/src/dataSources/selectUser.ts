import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createGitlabClient } from "../client";
import { selectUserExamplePayload } from "../examplePayloads";
import { selectUserInputs } from "../inputs";
import type { Member } from "../types";
import { fetchAllPages } from "../utils";
export const selectUser = dataSource({
  display: {
    label: "Select User",
    description:
      "Select a member of a project, including members inherited from its groups.",
  },
  inputs: selectUserInputs,
  perform: async (_context, { connection, project }) => {
    const client = createGitlabClient(connection, false);
    const members = await fetchAllPages<Member>(
      client,
      `/projects/${project}/members/all`,
    );
    const result: Element[] = members.map((item) => ({
      label: `${item.name} (@${item.username})`,
      key: util.types.toString(item.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectUserExamplePayload,
});
