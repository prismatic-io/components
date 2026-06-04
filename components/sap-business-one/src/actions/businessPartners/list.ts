import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { fetchAllData } from "../../util";
import { defaultPaginationInputs, connection } from "../../inputs/general";
import { listBusinessPartnersExample } from "../../examplePayloads/businessPartners";

export const listBusinessPartners = action({
  display: {
    label: "List Business Partners",
    description: "Retrieve a collection of Business Partners with all or some selected properties ",
  },
  inputs: {
    connection,
    ...defaultPaginationInputs,
  },
  perform: async (
    context,
    { connection, customQueryParams, $filter, $orderby, $select, $skip, $top, fetchAll },
  ) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const data = await fetchAllData(
      client,
      "BusinessPartners",
      {
        ...customQueryParams,
        $filter,
        $orderby,
        $select,
        $skip,
        $top,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: listBusinessPartnersExample,
});
