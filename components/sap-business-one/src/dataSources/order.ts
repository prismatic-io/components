import { dataSource } from "@prismatic-io/spectral";
import { $filter, connection } from "../inputs/general";
import { createClient } from "../client";
import { fetchAllData, mapLabel, mapPicklistArray, validateArray } from "../util";
import { orderDataSourceExamplePayload } from "../examplePayloads/datasources";

export const selectOrder = dataSource({
  display: {
    label: "Select Order",
    description: "Select an Order from a dropdown menu.",
  },
  inputs: {
    $filter,
    connection,
  },
  perform: async (context, { connection, $filter }) => {
    const DOC_ENTRY = "DocEntry";
    const client = await createClient(connection, context, true);

    const data = await fetchAllData(
      client,
      "Orders",
      {
        $select: DOC_ENTRY,
        $filter,
      },
      true,
      1000,
    );

    const array = validateArray(data);

    const objects = mapPicklistArray({
      data: array,
      keyName: DOC_ENTRY,
      keyLabel: DOC_ENTRY,
      orderKey: DOC_ENTRY,
    });

    return { result: mapLabel(objects, "Order #") };
  },
  dataSourceType: "picklist",
  examplePayload: orderDataSourceExamplePayload,
});
