import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { connectionInput } from "../inputs";

export const selectPurchaseRequisition = dataSource({
  display: {
    label: "Select Purchase Requisition",
    description: "A picklist of purchase requisitions in the SAP S/4HANA system.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const headers = {
      Accept: "application/json",
    };
    const client = getSapClient(connection, headers);

    try {
      const { data } = await client.get(
        "/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader?$select=PurchaseRequisition,PurReqnDescription",
      );

      const results = (data?.d?.results ?? data?.value ?? []) as Record<string, string>[];

      const result: Element[] = results
        .map((req) => ({
          label: req.PurReqnDescription
            ? `${req.PurchaseRequisition} - ${req.PurReqnDescription}`
            : req.PurchaseRequisition,
          key: req.PurchaseRequisition?.toString() ?? "",
        }))
        .filter((item) => item.key)
        .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));

      return { result };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "0010000001 - Office Supplies",
        key: "0010000001",
      },
    ],
  },
});
