import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectPaymentInputs } from "../inputs";
import { fetchAllPages, sortByLabel } from "../util";

export const selectPayment = dataSource({
  display: {
    label: "Select Payment",
    description: "Lists payments in the Square account.",
  },
  inputs: selectPaymentInputs,
  perform: async (_context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection);

    const allPayments = await fetchAllPages(client, "/v2/payments", "payments", {
      additionalParams: { limit: 100 },
    });

    const result = (allPayments.payments as Record<string, unknown>[])
      .map((payment: Record<string, unknown>) => {
        const amountMoney = payment.amount_money as Record<string, unknown> | undefined;
        const amount = amountMoney ? `$${((amountMoney.amount as number) / 100).toFixed(2)}` : "";
        const label = payment.reference_id
          ? `${payment.reference_id as string} (${amount})`
          : `${(payment.id as string).substring(0, 12)}... (${amount})`;

        return {
          label,
          key: payment.id as string,
        };
      })
      .sort(sortByLabel);

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
