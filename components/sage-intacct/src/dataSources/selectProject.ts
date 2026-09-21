import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectProjectExamplePayload } from "../examplePayloads";
import { selectProjectInputs } from "../inputs";
import { queryRecordsPaginated } from "../util";
export const selectProject = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Project",
    description: "Lists projects in Sage Intacct.",
  },
  perform: async (_context, { connection, returnIdInput }) => {
    const projects = await queryRecordsPaginated(
      connection,
      "PROJECT",
      ["*"],
      "",
    );
    return {
      result: projects.map(
        (project: {
          RECORDNO: string;
          PROJECTID: string;
          NAME: string;
        }): Element => {
          const label = project.NAME;
          return {
            label,
            key: returnIdInput ? project.PROJECTID : project.RECORDNO,
          };
        },
      ),
    };
  },
  inputs: selectProjectInputs,
  examplePayload: selectProjectExamplePayload,
});
