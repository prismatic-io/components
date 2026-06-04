import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listRecordsInputs } from "../../inputs/records";
import { paginateData } from "../../util";

export const listRecords = action({
  display: {
    label: "List Records",
    description: "Retrieve a list of records from component",
  },
  inputs: listRecordsInputs,
  perform: async (
    context,
    {
      connection,
      customQueryParams,
      fetchAll,
      $count,
      $filter,
      $orderby,
      $search,
      $select,
      $skip,
      $top,
      $expand,
      recordType,
    },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateData(client, `/${recordType}`, fetchAll, {
      $count,
      $filter,
      $orderby,
      $search,
      $select,
      $skip,
      $top,
      $expand,
      ...customQueryParams,
    });
    return {
      data,
    };
  },
});
