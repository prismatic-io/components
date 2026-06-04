import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listRequestersExamplePayload as examplePayload } from "../../examplePayloads";
import { listRequestersInputs as inputs } from "../../inputs/requesters";
import { getListData } from "../../util";

export const listRequesters = action({
  display: {
    label: "List Requesters",
    description: "Returns a list of all requesters.",
  },
  perform: async (
    context,
    { connection, fetchAll, perPage, page, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await getListData(
      client,
      `/requesters`,
      "requesters",
      fetchAll,
      {
        ...additionalQueryParams,
        per_page: perPage,
        page,
      },
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
