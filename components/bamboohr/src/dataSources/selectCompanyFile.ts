import { dataSource, type Element } from "@prismatic-io/spectral";
import { createBambooClient } from "../client";
import { connectionInput } from "../inputs";

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
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createBambooClient(connection, false);
    const {
      data: { categories },
    } = await client.get<{ categories: CompanyFileCategory[] }>(
      "/v1/files/view",
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
  examplePayload: {
    result: [
      {
        label: "BambooHR - 4 Ways the BambooHR ATS Improves the Hiring Process",
        key: "220",
      },
      {
        label: "New Hire Forms - Australia Standard Choice Form.pdf",
        key: "164",
      },
    ],
  },
});
