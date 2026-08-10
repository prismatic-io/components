import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DATASOURCE_PAGE_SIZE } from "../constants";
import { selectLocationExamplePayload } from "../examplePayloads";
import { selectLocationInputs } from "../inputs";
import type { Location } from "../types";
import { mapToElements } from "../util";
export const selectLocation = dataSource({
  display: {
    label: "Select Location",
    description: "Select a work location from Oracle Fusion Cloud HCM.",
  },
  dataSourceType: "picklist",
  inputs: selectLocationInputs,
  perform: async (_context, { connection, effectiveDate }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<{
      items: Location[];
    }>("/locationsV2", {
      params: { limit: DATASOURCE_PAGE_SIZE, onlyData: "true", effectiveDate },
    });
    const result = mapToElements(
      data.items,
      (l) => `${l.LocationCode} - ${l.LocationName}`,
      (l) => l.LocationId,
    );
    return { result };
  },
  examplePayload: selectLocationExamplePayload,
});
