import { dataSource } from "@prismatic-io/spectral";
import { $filter, connection } from "../inputs/general";
import { createClient } from "../client";
import { fetchAllData, mapLabel, mapPicklistArray, validateArray } from "../util";
import { orderDataSourceExamplePayload as invoiceDataSourceExamplePayload } from "../examplePayloads/datasources";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "Select an Invoice from a dropdown menu.",
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
      "Invoices",
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

    return { result: mapLabel(objects, "Invoice #") };
  },
  dataSourceType: "picklist",
  examplePayload: invoiceDataSourceExamplePayload,
});
