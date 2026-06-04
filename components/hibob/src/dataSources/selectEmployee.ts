import { dataSource, type Element } from "@prismatic-io/spectral";

import { getClient } from "../client";
import { selectEmployeeInputs } from "../inputs";
import type { EmployeeSearchResponse } from "../types/employee";

export const selectEmployee = dataSource({
  display: {
    label: "Select Employee",
    description: "Select an employee.",
  },
  inputs: selectEmployeeInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);

    const { data } = await client.post<EmployeeSearchResponse>(
      `/people/search`,
      {
        showInactive: true,
        fields: ["root.fullName"],
      },
    );
    const result = data.employees.map<Element>(({ fullName, id }) => ({
      label: fullName,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
