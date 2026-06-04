import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBusinessEntitiesResponse } from "../../examplePayloads/businessEntities";
import { defaultListInputs } from "../../inputs";
import type { BusinessEntity } from "../../interfaces/businessEntities";
import { fetchAllData } from "../../util";

export const listBusinessEntities = action({
  display: {
    label: "List Business Entities",
    description: "Retrieve a list of all business entities",
  },
  inputs: {
    ...defaultListInputs,
  },
  perform: async (context, { connection, customQueryParams, fetchAll, pageSize, start }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchAllData<BusinessEntity>(
      client,
      "entities",
      {
        ...customQueryParams,
        page_size: pageSize,
        start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listBusinessEntitiesResponse,
  },
});
