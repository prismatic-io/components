import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectEmployeeInputs } from "../inputs";
import { fetchAllPages } from "../util";

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
  inputs: selectEmployeeInputs,
  perform: async (_context, { connection, companyId }) => {
    const client = createClient(connection);

    const employees = await fetchAllPages<Employee>(
      client,
      `/companies/${companyId}/employees`,
    );

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
