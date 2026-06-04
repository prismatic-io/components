import { dataSource } from "@prismatic-io/spectral";
import { connection } from "../inputs/general";
import { createClient } from "../client";
import { selectMobileAppAssignmentExamplePayload } from "../examplePayloads";
import { paginateResults } from "../util";
import { mobileAppId } from "../inputs/mobileApps/general";

export const selectMobileAppAssignment = dataSource({
  display: {
    label: "Select Mobile App Assignment",
    description:
      "Select a mobile app assignment from the list of mobile apps assignments",
  },
  inputs: {
    mobileAppId: {
      ...mobileAppId,
      dataSource: undefined,
    },
    connection,
  },
  perform: async (context, { connection, mobileAppId }) => {
    const client = createClient(connection, false, true);
    const params = {
      $filter:
        "(microsoft.graph.managedApp/appAvailability eq null or microsoft.graph.managedApp/appAvailability eq 'lineOfBusiness' or isAssigned eq true)",
    };
    const data = await paginateResults(
      client,
      `/deviceAppManagement/mobileApps/${mobileAppId}/assignments`,
      true,
      params,
    );

    return data.value.map(
      (mobileAppAssignment: { id: string; intent: string }) => {
        return {
          label: mobileAppAssignment.intent,
          key: mobileAppAssignment.id,
        };
      },
    );
  },
  dataSourceType: "picklist",
  examplePayload: { result: selectMobileAppAssignmentExamplePayload },
});
