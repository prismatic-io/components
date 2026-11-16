import { dataSource, type Element } from "@prismatic-io/spectral";
import { createBambooClient } from "../client";
import { selectEmployeeFileExamplePayload } from "../examplePayloads";
import { selectEmployeeFileInputs } from "../inputs";

interface EmployeeFile {
  id: number;
  name: string;
}

interface EmployeeFileCategory {
  id: number;
  name: string;
  files: EmployeeFile[];
}

export const selectEmployeeFile = dataSource({
  display: {
    label: "Select Employee File",
    description:
      "Select an employee file from a list of files for the specified employee.",
  },
  inputs: selectEmployeeFileInputs,
  perform: async (_context, { connection, employeeId }) => {
    const client = createBambooClient(connection, false);
    const {
      data: { categories },
    } = await client.get<{ categories: EmployeeFileCategory[] }>(
      `/v1/employees/${employeeId}/files/view`,
    );

    const result: Element[] = categories
      .flatMap((category) =>
        category.files.map((file) => ({
          label: `${category.name} - ${file.name}`,
          key: file.id.toString(),
        })),
      )
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectEmployeeFileExamplePayload,
});
