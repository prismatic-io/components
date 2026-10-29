import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectSupplierInvoiceRequestExamplePayload } from "../examplePayloads";
import { selectSupplierInvoiceRequestInputs } from "../inputs";
import type { WorkdayInstanceSummary } from "../types";
import { toSortedPicklist } from "../util";

export const selectSupplierInvoiceRequest = dataSource({
  display: {
    label: "Select Supplier Invoice Request",
    description:
      "A picklist of supplier invoice requests in the Workday tenant.",
  },
  inputs: selectSupplierInvoiceRequestInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(
      `${SERVICES.accountsPayable}/supplierInvoiceRequests`,
    );

    return {
      result: toSortedPicklist(data.data, (item: WorkdayInstanceSummary) => ({
        key: item.id,
        label: item.descriptor,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectSupplierInvoiceRequestExamplePayload,
});
