import { dataSource, type Element } from "@prismatic-io/spectral";
import { getXeroClient } from "../client";
import { connectionInput } from "../inputs";
import { fetchAllData } from "../util";
import { type Payment } from "../interfaces/Payment";

export const selectPayment = dataSource({
  display: {
    label: "Select Payment",
    description: "Select a payment from the list",
  },
  inputs: { xeroConnection: connectionInput },
  dataSourceType: "picklist",
  perform: async (context, { xeroConnection }) => {
    const client = await getXeroClient(xeroConnection, false);
    const data = await fetchAllData<Payment, "Payments">({
      client,
      path: "/payments",
      key: "Payments",
      queryParams: {},
      headers: {},
      fetchAll: true,
    });

    const result = (data.Payments || []).map<Element>((payment) => ({
      label: payment.Invoice.InvoiceNumber,
      key: payment.PaymentID,
    }));
    return { result };
  },
});
