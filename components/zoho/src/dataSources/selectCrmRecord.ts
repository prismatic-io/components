import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { DEFAULT_PER_PAGE } from "../constants";
import { selectCrmRecordExamplePayload } from "../examplePayloads/dataSources";
import { selectCrmRecordInputs } from "../inputs";
import type { CRMRecord } from "../types";
import { getCrmRecordLabel } from "../util/general";
import { fetchAllPages } from "../util/pagination";

export const selectCrmRecord = dataSource({
  display: {
    label: "Select CRM Record",
    description: "Select a CRM record from the specified module.",
  },
  inputs: selectCrmRecordInputs,
  perform: async (_context, { connection, recordType }) => {
    const client = createClient(connection, ClientType.CRM, false);

    const response = await fetchAllPages(
      client,
      `/${recordType}`,
      { per_page: DEFAULT_PER_PAGE, fields: "id,Name,Subject,Full_Name" },
      "data",
      true,
    );

    const records = response.data as CRMRecord[];

    if (records?.length) {
      const result = records.map<Element>((record) => ({
        label: getCrmRecordLabel(record),
        key: util.types.toString(record.id),
      }));
      return { result };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: selectCrmRecordExamplePayload,
});
