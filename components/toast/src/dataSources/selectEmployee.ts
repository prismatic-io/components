import { dataSource, type Element } from "@prismatic-io/spectral";
import { createToastClient } from "../client";
import { selectEmployeeInputs as inputs } from "../inputs/dataSources";

export const selectEmployee = dataSource({
  display: {
    label: "Select Employee",
    description: "Select an employee from a list of employees.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection, restaurantExternalId }) => {
    const client = await createToastClient(
      connection,
      false,
      restaurantExternalId,
    );

    const { data } = await client.get(`/labor/v1/employees`);

    const objects = (
      data as { guid: string; firstName: string; lastName: string }[]
    ).map<Element>((employee) => ({
      key: employee.guid,
      label: `${employee.firstName} ${employee.lastName}`,
    }));

    return { result: objects };
  },
});
