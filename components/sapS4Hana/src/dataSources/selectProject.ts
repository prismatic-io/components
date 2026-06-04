import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { connectionInput } from "../inputs";

export const selectProject = dataSource({
  display: {
    label: "Select Project",
    description: "A picklist of projects in the SAP S/4HANA system.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const headers = {
      Accept: "application/json",
    };
    const client = getSapClient(connection, headers);

    try {
      const { data } = await client.get(
        "/sap/opu/odata/CPD/SC_PROJ_ENGMT_CREATE_UPD_SRV/ProjectSet?$select=ProjectID,ProjectName",
      );

      const results = (data?.d?.results ?? data?.value ?? []) as Record<string, string>[];

      const result: Element[] = results
        .map((project) => ({
          label: project.ProjectName
            ? `${project.ProjectID} - ${project.ProjectName}`
            : project.ProjectID,
          key: project.ProjectID?.toString() ?? "",
        }))
        .filter((item) => item.key)
        .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));

      return { result };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "PRJ-001 - Customer Implementation",
        key: "PRJ-001",
      },
    ],
  },
});
