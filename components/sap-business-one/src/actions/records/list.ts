import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { fetchAllData } from "../../util";
import { recordType } from "../../inputs/records/general";
import { defaultPaginationInputs, connection } from "../../inputs/general";

export const listRecords = action({
  display: {
    label: "List Records",
    description: "Retrieve a list of records from SAP Business One.",
  },
  inputs: {
    connection,
    recordType,
    ...defaultPaginationInputs,
  },
  perform: async (
    context,
    {
      connection,
      customQueryParams,
      $filter,
      $orderby,
      $select,
      $skip,
      $top,
      fetchAll,
      recordType,
    },
  ) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const data = await fetchAllData(
      client,
      recordType,
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
});
