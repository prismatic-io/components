import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS, MANAGED_APPS_FILTER } from "../constants";
import { selectMobileAppExamplePayload } from "../examplePayloads";
import { selectMobileAppInputs } from "../inputs";
import { paginateResults } from "../util";

export const selectMobileApp = dataSource({
  display: {
    label: "Select Mobile App",
    description: "Select a mobile app from the list of mobile apps.",
  },
  inputs: selectMobileAppInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false, true);
    const params = {
      $filter: MANAGED_APPS_FILTER,
    };
    const data = await paginateResults(
      client,
      ENDPOINTS.MOBILE_APPS,
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
  examplePayload: selectMobileAppExamplePayload,
});
