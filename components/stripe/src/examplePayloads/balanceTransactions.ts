





export const getBalanceTransactionExamplePayload = {
  data: {
    id: "txn_1MiN3gLkdIwHu7ixxapQrznl",
    object: "balance_transaction",
    amount: 2000,
    available_on: 1716470400,
    created: 1716397800,
    currency: "usd",
    description: "Payment for Invoice INV-001",
    exchange_rate: null,
    fee: 88,
    fee_details: [
      {
        amount: 88,
        application: null,
        currency: "usd",
        description: "Stripe processing fees",
        type: "stripe_fee",
      },
    ],
    net: 1912,
    reporting_category: "charge",
    source: "ch_3MmlLrLkdIwHu7ix0snN0B15",
    status: "available",
    type: "charge",
  } as unknown,
};







export const listBalanceTransactionsExamplePayload = {
  data: {
    object: "list",
    data: [getBalanceTransactionExamplePayload.data],
    has_more: false,
    url: "/v1/balance_transactions",
  } as unknown,
};
