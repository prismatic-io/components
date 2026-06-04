import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectApplicationInputs as inputs } from "../inputs/dataSources";
import { getValues } from "../util";

export const selectApplication = dataSource({
  display: {
    label: "Select Application",
    description: "Select an application from a picklist.",
  },
  inputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await getValues(true, client, `/applications`, {
      params: { $select: "id,displayName" },
    });
    return {
      result: data.value.map(
        (application: { id: string; displayName: string }) => {
          return {
            key: application.id,
            label: application.displayName,
          };
        },
      ),
    };
  },
  dataSourceType: "picklist",
});
