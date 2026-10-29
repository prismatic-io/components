import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectEmployeeExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

export const selectEmployee = dataSource({
  display: {
    label: "Select Employee",
    description: "Select an employee from your Sage HR account.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const allEmployees: {
      id: number;
      first_name: string;
      last_name: string;
    }[] = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      const { data } = await client.get("/employees", {
        params: { page: currentPage },
      });
      if (data.data) {
        allEmployees.push(...data.data);
      }
      if (data.meta) {
        totalPages = data.meta.total_pages || 1;
      }
      currentPage++;
    } while (currentPage <= totalPages);

    return {
      result: allEmployees
        .map<Element>((item) => ({
          label: `${item.first_name} ${item.last_name}`,
          key: item.id.toString(),
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectEmployeeExamplePayload,
});
