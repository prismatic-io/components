import { dataSource } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../client";
import { selectLocationExamplePayload } from "../examplePayloads";
import { selectLocationInputs } from "../inputs";
import type { Location } from "../types";
import { fetchAllPages, toPicklistResult } from "../util";








export const selectLocation = dataSource({
  display: {
    label: "Select Location",
    description: "Select a work location from the available locations in UKG Pro.",
  },
  inputs: selectLocationInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection, companyId }) => {
    const client = createBasicAuthClient(connection);
    const locations = await fetchAllPages<Location>(client, "/configuration/v1/locations", {
      params: { company: companyId },
    });
    const result = toPicklistResult(locations, {
      getLabel: (location) =>
        `${location.city}/${location.state} - ${location.countryCode} (${location.zipOrPostalCode})`,
      getKey: (location) => location.locationCode,
    });
    return { result };
  },
  examplePayload: selectLocationExamplePayload,
});
