import { dataSource } from "@prismatic-io/spectral";
import { connection } from "../inputs/general";
import { createClient } from "../client";
import { selectMobileAppExamplePayload } from "../examplePayloads";
import { paginateResults } from "../util";

export const selectMobileApp = dataSource({
  display: {
    label: "Select Mobile App",
    description: "Select a mobile app from the list of mobile apps",
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
    const data = await paginateResults(
      client,
      "/deviceAppManagement/mobileApps",
      true,
      params,
    );

    return data.value.map((mobileApp: { id: string; displayName: string }) => {
      return {
        label: mobileApp.displayName,
        key: mobileApp.id,
      };
    });
  },
  dataSourceType: "picklist",
  examplePayload: { result: selectMobileAppExamplePayload },
});
