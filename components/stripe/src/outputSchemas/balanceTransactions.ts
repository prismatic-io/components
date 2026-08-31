export const balanceTransactionOutputSchema = {
  type: "object" as const,
  properties: {
    amount: {
      type: "integer",
    },
    available_on: {
      type: "integer",
      format: "unix-time",
    },
    created: {
      type: "integer",
      format: "unix-time",
    },
    currency: {
      type: "string",
      format: "currency",
    },
    description: {
      type: ["string", "null"],
    },
    exchange_rate: {
      type: ["number", "null"],
    },
    fee: {
      type: "integer",
    },
    fee_details: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          amount: {
            type: "integer",
          },
          application: {
            type: ["string", "null"],
          },
          currency: {
            type: "string",
            format: "currency",
          },
          description: {
            type: ["string", "null"],
          },
          type: {
            type: "string",
          },
        },
        required: ["amount", "currency", "type"],
      },
    },
    id: {
      type: "string",
    },
    net: {
      type: "integer",
    },
    object: {
      type: "string",
      enum: ["balance_transaction"],
    },
    reporting_category: {
      type: "string",
    },
    source: {
      type: ["string", "null"],
    },
    status: {
      type: "string",
    },
    type: {
      type: "string",
      enum: [
        "adjustment",
        "advance",
        "advance_funding",
        "anticipation_repayment",
        "application_fee",
        "application_fee_refund",
        "charge",
        "climate_order_purchase",
        "climate_order_refund",
        "connect_collection_transfer",
        "contribution",
        "issuing_authorization_hold",
        "issuing_authorization_release",
        "issuing_dispute",
        "issuing_transaction",
        "obligation_outbound",
        "obligation_reversal_inbound",
        "payment",
        "payment_failure_refund",
        "payment_network_reserve_hold",
        "payment_network_reserve_release",
        "payment_refund",
        "payment_reversal",
        "payment_unreconciled",
        "payout",
        "payout_cancel",
        "payout_failure",
        "payout_minimum_balance_hold",
        "payout_minimum_balance_release",
        "refund",
        "refund_failure",
        "reserve_transaction",
        "reserved_funds",
        "stripe_balance_payment_debit",
        "stripe_balance_payment_debit_reversal",
        "stripe_fee",
        "stripe_fx_fee",
        "tax_fee",
        "topup",
        "topup_reversal",
        "transfer",
        "transfer_cancel",
        "transfer_failure",
        "transfer_refund",
      ],
    },
  },
  required: [
    "amount",
    "available_on",
    "created",
    "currency",
    "fee",
    "fee_details",
    "id",
    "net",
    "object",
    "reporting_category",
    "status",
    "type",
  ],
};
export const listBalanceTransactionsOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: balanceTransactionOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
