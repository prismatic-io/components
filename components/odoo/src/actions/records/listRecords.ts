import { action } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { listRecordsExamplePayload } from "../../examplePayloads";
import { listRecordsInputs } from "../../inputs";
import {
  createOdooAwaitClient,
  isLegacyConnection,
  paginateSearchLegacy,
} from "../../legacy";
import { paginateSearch } from "../../util";

export const listRecords = action({
  display: {
    label: "List Records",
    description: "Fetch a list of records of a given type.",
  },
  inputs: listRecordsInputs,
  perform: async (context, params) => {
    if (isLegacyConnection(params.connection)) {
      const legacyClient = await createOdooAwaitClient(params.connection);
      const data = await paginateSearchLegacy({
        client: legacyClient,
        model: params.model,
        params: {
          limit: params.limit,
          offset: params.offset,
        },
        fetchAll: params.fetchAll,
        filter: undefined,
        fields: undefined,
      });
      return { data };
    }
    const odooClient = createOdooClient(
      params.connection,
      context.debug.enabled,
    );
    const data = await paginateSearch({
      client: odooClient,
      model: params.model,
      params: {
        limit: params.limit,
        offset: params.offset,
      },
      fetchAll: params.fetchAll,
      filter: undefined,
      fields: undefined,
    });
    return { data };
  },
  examplePayload: listRecordsExamplePayload,
});
