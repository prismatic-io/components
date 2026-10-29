import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { companyIdInput, connectionInput } from "../inputs";

interface Employee {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const selectEmployee = dataSource({
  display: {
    label: "Select Employee",
    description: "A picklist of employees for the selected company.",
  },
  dataSourceType: "picklist",
  inputs: {
    connection: connectionInput,
    companyId: { ...companyIdInput, dataSource: undefined },
  },
  perform: async (_context, { connection, companyId }) => {
    const client = createClient(connection);

    let page = 1;
    let hasMorePages = true;
    const employees: Employee[] = [];

    do {
      const { data, headers } = await client.get<Employee[]>(
        `/companies/${companyId}/employees`,
        { params: { page } },
      );
      employees.push(...data);
      hasMorePages = headers["x-total-pages"] > headers["x-page"];
      page += 1;
    } while (hasMorePages);

    const result = employees
      .map<Element>((employee) => ({
        label: `${employee.first_name} ${employee.last_name}`,
        key: employee.uuid.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  examplePayload: {
    result: [
      {
        label: "Nicole Boehm",
        key: "9779767c-6044-48e0-bf68-aeb370b9a2e7",
      },
    ],
  },
});
