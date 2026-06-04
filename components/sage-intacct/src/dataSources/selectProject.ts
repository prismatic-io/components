import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection, returnIdInput } from "../inputs";
import { queryRecordsPaginated } from "../utils";

export const selectProject = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Project",
    description: "A picklist of projects in Sage Intacct.",
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
  inputs: { connection, returnIdInput },
});
