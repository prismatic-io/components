import { dataSource, type Element } from "@prismatic-io/spectral";
import { createOdooClient } from "../client";
import { DEFAULT_MODEL_FIELDS } from "../constants";
import { selectModelExamplePayload } from "../examplePayloads";
import { selectModelInputs } from "../inputs";
import {
  createOdooAwaitClient,
  isLegacyConnection,
  paginateSearchLegacy,
} from "../legacy";
import type { Model } from "../types";
import { getFilters, paginateSearch, sortByLabelASC } from "../util";

export const selectModel = dataSource({
  display: {
    label: "Select Model",
    description: "A picklist of models in the Odoo database.",
  },
  inputs: selectModelInputs,
  perform: async (_context, { connection, nameSearch, modelSearch }) => {
    const filters = getFilters({ nameSearch, modelSearch });
    const data = isLegacyConnection(connection)
      ? await paginateSearchLegacy<Model>({
          client: await createOdooAwaitClient(connection),
          model: "ir.model",
          params: {},
          fetchAll: true,
          filter: filters,
          fields: DEFAULT_MODEL_FIELDS,
        })
      : await paginateSearch<Model>({
          client: createOdooClient(connection),
          model: "ir.model",
          params: {},
          fetchAll: true,
          filter: filters,
          fields: DEFAULT_MODEL_FIELDS,
        });
    const result: Element[] = data
      .map((model) => ({
        key: model.model,
        label: `${model.name} (${model.model})`,
      }))
      .sort(sortByLabelASC);
    return {
      result,
    };
  },
  examplePayload: selectModelExamplePayload,
  dataSourceType: "picklist",
});
