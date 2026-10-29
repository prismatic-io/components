import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";
import { selectManagedDeviceDataSourceExamplePayload } from "../examplePayloads/dataSources";
import { paginateWithPaginationToken } from "../util";

export const selectManagedDevice = dataSource({
  display: {
    label: "Select Managed Device",
    description: "Select a managed device from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const data = await paginateWithPaginationToken(
      client,
      "/managed/devices",
      true,
    );
    const result = (data.resources as []).map<Element>(({ name, id }) => ({
      label: name,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectManagedDeviceDataSourceExamplePayload,
  },
});
