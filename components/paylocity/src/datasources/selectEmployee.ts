import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../client";
import { companyId, connectionInput } from "../inputs";
import { fetchEmployees } from "../util";

export const selectEmployee = dataSource({
  display: {
    label: "Select Employee",
    description:
      "Select an employee from a list of employees in the specified company.",
  },
  inputs: {
    connectionInput,
    companyId,
  },
  perform: async (_context, { connectionInput, companyId }) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, false);

    const employees = await fetchEmployees(client, companyId, 0, 0, false);

    if (Array.isArray(employees) && employees.length > 0) {
      return {
        result: employees
          .map<Element>((employee: Record<string, unknown>) => ({
            label: `${employee.firstName} ${employee.lastName}`,
            key: (employee.employeeId as string).toString(),
          }))
          .sort((a, b) => (a.label < b.label ? -1 : 1)),
      };
    }

    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "John Doe",
        key: "kjU72LCJexvrqL7G4TMHHN",
      },
    ],
  },
});
