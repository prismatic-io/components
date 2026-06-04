import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listRealmsExamplePayload } from "../../examplePayloads/general";
import { listRealmsInputs } from "../../inputs/general";
import type { Realm } from "../../interfaces/general";
import { paginateRecordsWithLink } from "../../util/util";

export const listRealms = action({
  display: {
    label: "List Realms",
    description: "Lists all realms in your org.",
  },
  inputs: listRealmsInputs,
  perform: async (context, { connection, limit, after, search, sortBy, sortOrder, fetchAll }) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await paginateRecordsWithLink<Realm>(client, "/realms", fetchAll, {
      limit,
      after,
      search,
      sortBy,
      sortOrder,
    });

    return {
      data,
    };
  },
  examplePayload: listRealmsExamplePayload,
});
