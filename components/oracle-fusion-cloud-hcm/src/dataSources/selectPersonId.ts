import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DATASOURCE_PAGE_SIZE } from "../constants";
import { selectPersonIdExamplePayload } from "../examplePayloads";
import { selectPersonIdInputs } from "../inputs";
import type { Worker } from "../types";
import { mapToElements } from "../util";
export const selectPersonId = dataSource({
  display: {
    label: "Select Person ID",
    description: "Select a worker by Person ID from Oracle Fusion Cloud HCM.",
  },
  dataSourceType: "picklist",
  inputs: selectPersonIdInputs,
  perform: async (
    _context,
    { connection, usePublicWorkers, effectiveDate },
  ) => {
    const client = createClient(connection, false);
    const resource = usePublicWorkers ? "/publicWorkers" : "/workers";
    const { data } = await client.get<{
      items: Worker[];
    }>(resource, {
      params: { limit: DATASOURCE_PAGE_SIZE, onlyData: "true", effectiveDate },
    });
    const result = mapToElements(
      data.items,
      (w) =>
        w.DisplayName ? `${w.PersonNumber} - ${w.DisplayName}` : w.PersonNumber,
      (w) => w.PersonId,
    );
    return { result };
  },
  examplePayload: selectPersonIdExamplePayload,
});
