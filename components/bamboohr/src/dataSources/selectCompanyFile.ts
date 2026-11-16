import { dataSource, type Element } from "@prismatic-io/spectral";
import { createBambooClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectCompanyFileExamplePayload } from "../examplePayloads";
import { selectCompanyFileInputs } from "../inputs";

interface CompanyFile {
  id: number;
  name: string;
}

interface CompanyFileCategory {
  id: number;
  name: string;
  files: CompanyFile[];
}

export const selectCompanyFile = dataSource({
  display: {
    label: "Select Company File",
    description: "Select a company file from a list of company files.",
  },
  inputs: selectCompanyFileInputs,
  perform: async (_context, { connection }) => {
    const client = createBambooClient(connection, false);
    const {
      data: { categories },
    } = await client.get<{ categories: CompanyFileCategory[] }>(
      ENDPOINTS.FILES_VIEW,
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
  examplePayload: selectCompanyFileExamplePayload,
});
