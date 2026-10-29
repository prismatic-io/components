import { dataSource, type Element } from "@prismatic-io/spectral";
import { createOdooClient } from "../client";
import { selectRecordExamplePayload } from "../examplePayloads";
import { selectRecordByIdInputs } from "../inputs";
import {
  createOdooAwaitClient,
  isLegacyConnection,
  paginateSearchLegacy,
} from "../legacy";
import type { CustomRecord } from "../types";
import { paginateSearch, sortByLabelASC } from "../util";

export const selectRecordById = dataSource({
  display: {
    label: "Select Record",
    description: "A picklist of records in the Odoo database.",
  },
  inputs: selectRecordByIdInputs,
  perform: async (_context, { connection, model }) => {
    const data = isLegacyConnection(connection)
      ? await paginateSearchLegacy<CustomRecord>({
          client: await createOdooAwaitClient(connection),
          model: model,
          params: {},
          fetchAll: true,
        })
      : await paginateSearch<CustomRecord>({
          client: createOdooClient(connection),
          model: model,
          params: {},
          fetchAll: true,
        });
    const result: Element[] = data
      .map((model) => ({
        key: model.id.toString(),
        label:
          (model?.name as string) ||
          (model?.display_name as string) ||
          "(record with no name field)",
      }))
      .sort(sortByLabelASC);
    return {
      result,
    };
  },
  examplePayload: selectRecordExamplePayload,
  dataSourceType: "picklist",
});
