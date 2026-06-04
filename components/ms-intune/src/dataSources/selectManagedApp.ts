import { dataSource } from "@prismatic-io/spectral";
import { connection } from "../inputs/general";
import { createClient } from "../client";
import { selectManagedAppExamplePayload } from "../examplePayloads";

export const selectManagedApp = dataSource({
  display: {
    label: "Select Managed App",
    description: "Select a managed app from the list of managed apps",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, false, true);
    const params = {
      $filter:
        "(microsoft.graph.managedApp/appAvailability eq null or microsoft.graph.managedApp/appAvailability eq 'lineOfBusiness' or isAssigned eq true)",
    };
    const {
      data: { value },
    } = await client.get("/deviceAppManagement/mobileApps", {
      params,
    });

    return value.map((managedApp: { id: string; displayName: string }) => {
      return {
        label: managedApp.displayName,
        key: managedApp.id,
      };
    });
  },
  dataSourceType: "picklist",
  examplePayload: { result: selectManagedAppExamplePayload },
});
