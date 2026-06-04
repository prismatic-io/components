import { dataSource } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../client";
import { selectPositionExamplePayload } from "../examplePayloads";
import { selectPositionInputs } from "../inputs";
import type { EmployeePosition } from "../types";
import { fetchAllPages, toPicklistResult } from "../util";








export const selectPosition = dataSource({
  display: {
    label: "Select Position",
    description: "Select a position from the available positions in UKG Pro.",
  },
  inputs: selectPositionInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection, companyId }) => {
    const client = createBasicAuthClient(connection);
    const positions = await fetchAllPages<EmployeePosition>(client, "/configuration/v1/positions", {
      params: { company: companyId },
    });
    const result = toPicklistResult(positions, {
      getLabel: (position) => `${position.alternateTitle} (${position.positionCode})`,
      getKey: (position) => position.positionCode,
    });
    return { result };
  },
  examplePayload: selectPositionExamplePayload,
});
