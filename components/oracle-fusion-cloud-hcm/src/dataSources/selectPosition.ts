import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DATASOURCE_PAGE_SIZE } from "../constants";
import { selectPositionExamplePayload } from "../examplePayloads";
import { selectPositionInputs } from "../inputs";
import type { Position } from "../types";
import { mapToElements } from "../util";
export const selectPosition = dataSource({
  display: {
    label: "Select Position",
    description:
      "Select an approved headcount position from Oracle Fusion Cloud HCM.",
  },
  dataSourceType: "picklist",
  inputs: selectPositionInputs,
  perform: async (_context, { connection, effectiveDate }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<{
      items: Position[];
    }>("/positions", {
      params: { limit: DATASOURCE_PAGE_SIZE, onlyData: "true", effectiveDate },
    });
    const result = mapToElements(
      data.items,
      (p) => `${p.PositionCode} - ${p.Name}`,
      (p) => p.PositionId,
    );
    return { result };
  },
  examplePayload: selectPositionExamplePayload,
});
