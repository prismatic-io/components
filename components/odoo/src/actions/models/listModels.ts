import { action, outputSchema } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { DEFAULT_MODEL_FIELDS, IR_MODEL } from "../../constants";
import { listModelsExamplePayload } from "../../examplePayloads";
import { listModelsInputs } from "../../inputs";
import {
  createOdooAwaitClient,
  isLegacyConnection,
  paginateSearchLegacy,
} from "../../legacy";
import { listModelsOutputSchema } from "../../outputSchemas";
import type { Model } from "../../types";
import { getFilters, paginateSearch } from "../../util";
export const listModels = action({
  display: {
    label: "List Models",
    description: "Fetch a list of models installed in the Odoo database.",
  },
  inputs: listModelsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listModelsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const filters = getFilters(params);
    if (isLegacyConnection(params.connection)) {
      const legacyClient = await createOdooAwaitClient(params.connection);
      const data = await paginateSearchLegacy<Model>({
        client: legacyClient,
        model: IR_MODEL,
        params: {
          limit: params.pagination.limit,
          offset: params.pagination.offset,
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
      model: IR_MODEL,
      params: {
        limit: params.pagination.limit,
        offset: params.pagination.offset,
      },
      fetchAll: params.fetchAll,
      filter: filters,
      fields: DEFAULT_MODEL_FIELDS,
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { nameSearch, modelSearch },
  ): Promise<{
    data: unknown;
  }> => {
    if (!nameSearch && !modelSearch) {
      return listModelsExamplePayload;
    }
    const data = listModelsExamplePayload.data.slice(0, 1).map((row) => ({
      ...row,
      ...(nameSearch ? { name: nameSearch, display_name: nameSearch } : {}),
      ...(modelSearch ? { model: modelSearch } : {}),
    }));
    return { data };
  },
  examplePayload: listModelsExamplePayload,
});
