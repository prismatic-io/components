import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectMobileAppAssignmentExamplePayload } from "../examplePayloads";
import { selectMobileAppAssignmentInputs } from "../inputs";
import { paginateResults } from "../util";
export const selectMobileAppAssignment = dataSource({
  display: {
    label: "Select Mobile App Assignment",
    description:
      "Select a mobile app assignment from the list of mobile app assignments.",
  },
  inputs: selectMobileAppAssignmentInputs,
  perform: async (_context, { connection, mobileAppId }) => {
    const client = createClient(connection, false, true);
    const params = {
      $filter:
        "(microsoft.graph.managedApp/appAvailability eq null or microsoft.graph.managedApp/appAvailability eq 'lineOfBusiness' or isAssigned eq true)",
    };
    const data = await paginateResults(
      client,
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}/assignments`,
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
  examplePayload: selectMobileAppAssignmentExamplePayload,
});
