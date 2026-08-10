import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DATASOURCE_PAGE_SIZE } from "../constants";
import { selectGradeExamplePayload } from "../examplePayloads";
import { selectGradeInputs } from "../inputs";
import type { Grade } from "../types";
import { mapToElements } from "../util";
export const selectGrade = dataSource({
  display: {
    label: "Select Grade",
    description: "Select a compensation grade from Oracle Fusion Cloud HCM.",
  },
  dataSourceType: "picklist",
  inputs: selectGradeInputs,
  perform: async (_context, { connection, effectiveDate }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<{
      items: Grade[];
    }>("/grades", {
      params: { limit: DATASOURCE_PAGE_SIZE, onlyData: "true", effectiveDate },
    });
    const result = mapToElements(
      data.items,
      (g) => `${g.GradeCode} - ${g.GradeName}`,
      (g) => g.GradeId,
    );
    return { result };
  },
  examplePayload: selectGradeExamplePayload,
});
