import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectManagedAppExamplePayload } from "../examplePayloads";
import { selectManagedAppInputs } from "../inputs";
export const selectManagedApp = dataSource({
  display: {
    label: "Select Managed App",
    description: "Select a managed app from the list of managed apps.",
  },
  inputs: selectManagedAppInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false, true);
    const params = {
      $filter:
        "(microsoft.graph.managedApp/appAvailability eq null or microsoft.graph.managedApp/appAvailability eq 'lineOfBusiness' or isAssigned eq true)",
    };
    const {
      data: { value },
    } = await client.get(ENDPOINTS.MOBILE_APPS, {
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
  examplePayload: selectManagedAppExamplePayload,
});
