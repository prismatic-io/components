import { action } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { DEFAULT_MODEL_FIELDS } from "../../constants";
import { listModelsExamplePayload } from "../../examplePayloads";
import { listModelsInputs } from "../../inputs";
import {
  createOdooAwaitClient,
  isLegacyConnection,
  paginateSearchLegacy,
} from "../../legacy";
import type { Model } from "../../types";
import { getFilters, paginateSearch } from "../../util";

export const listModels = action({
  display: {
    label: "List Models",
    description: "Fetch a list of models installed in the Odoo database.",
  },
  inputs: listModelsInputs,
  perform: async (context, params) => {
    const filters = getFilters(params);
    if (isLegacyConnection(params.connection)) {
      const legacyClient = await createOdooAwaitClient(params.connection);
      const data = await paginateSearchLegacy<Model>({
        client: legacyClient,
        model: "ir.model",
        params: {
          limit: params.limit,
          offset: params.offset,
        },
        fetchAll: params.fetchAll,
        filter: filters,
        fields: DEFAULT_MODEL_FIELDS,
      });
      return { data };
    }
    const odooClient = createOdooClient(
      params.connection,
      context.debug.enabled,
    );
    const data = await paginateSearch<Model>({
      client: odooClient,
      model: "ir.model",
      params: {
        limit: params.limit,
        offset: params.offset,
      },
      fetchAll: params.fetchAll,
      filter: filters,
      fields: DEFAULT_MODEL_FIELDS,
    });
    return { data };
  },
  examplePayload: listModelsExamplePayload,
});
