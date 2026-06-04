import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectRefundInputs } from "../inputs";
import { fetchAllPages, sortByLabel } from "../util";

export const selectRefund = dataSource({
  display: {
    label: "Select Refund",
    description: "Lists payment refunds in the Square account.",
  },
  inputs: selectRefundInputs,
  perform: async (_context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection);

    const allRefunds = await fetchAllPages(client, "/v2/refunds", "refunds", {
      additionalParams: { limit: 100 },
    });

    const result = (allRefunds.refunds as Record<string, unknown>[])
      .map((refund: Record<string, unknown>) => {
        const amountMoney = refund.amount_money as Record<string, unknown> | undefined;
        const amount = amountMoney ? `$${((amountMoney.amount as number) / 100).toFixed(2)}` : "";
        const label = `${(refund.id as string).substring(0, 12)}... (${amount}) - ${refund.status as string}`;

        return {
          label,
          key: refund.id as string,
        };
      })
      .sort(sortByLabel);

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
