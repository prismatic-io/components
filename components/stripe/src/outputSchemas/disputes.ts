export const disputeOutputSchema = {
  type: "object" as const,
  properties: {
    amount: {
      type: "integer",
    },
    balance_transactions: {
      type: "array",
      items: {
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
      },
    },
    charge: {
      type: "string",
    },
    created: {
      type: "integer",
      format: "unix-time",
    },
    currency: {
      type: "string",
      format: "currency",
    },
    enhanced_eligibility_types: {
      type: "array",
      items: {
        type: "string",
        enum: ["visa_compelling_evidence_3"],
      },
    },
    evidence: {
      type: "object" as const,
      properties: {
        access_activity_log: {
          type: ["string", "null"],
        },
        billing_address: {
          type: ["string", "null"],
        },
        cancellation_policy: {
          type: ["string", "null"],
        },
        cancellation_policy_disclosure: {
          type: ["string", "null"],
        },
        cancellation_rebuttal: {
          type: ["string", "null"],
        },
        customer_communication: {
          type: ["string", "null"],
        },
        customer_email_address: {
          type: ["string", "null"],
        },
        customer_name: {
          type: ["string", "null"],
        },
        customer_purchase_ip: {
          type: ["string", "null"],
        },
        customer_signature: {
          type: ["string", "null"],
        },
        duplicate_charge_documentation: {
          type: ["string", "null"],
        },
        duplicate_charge_explanation: {
          type: ["string", "null"],
        },
        duplicate_charge_id: {
          type: ["string", "null"],
        },
        enhanced_evidence: {
          type: "object" as const,
          properties: {
            visa_compelling_evidence_3: {
              type: "object" as const,
              properties: {
                disputed_transaction: {
                  type: ["object", "null"],
                  properties: {
                    customer_account_id: {
                      type: ["string", "null"],
                    },
                    customer_device_fingerprint: {
                      type: ["string", "null"],
                    },
                    customer_device_id: {
                      type: ["string", "null"],
                    },
                    customer_email_address: {
                      type: ["string", "null"],
                    },
                    customer_purchase_ip: {
                      type: ["string", "null"],
                    },
                    merchandise_or_services: {
                      type: ["string", "null"],
                      enum: ["merchandise", "services"],
                    },
                    product_description: {
                      type: ["string", "null"],
                    },
                    shipping_address: {
                      type: ["object", "null"],
                      properties: {
                        city: {
                          type: ["string", "null"],
                        },
                        country: {
                          type: ["string", "null"],
                        },
                        line1: {
                          type: ["string", "null"],
                        },
                        line2: {
                          type: ["string", "null"],
                        },
                        postal_code: {
                          type: ["string", "null"],
                        },
                        state: {
                          type: ["string", "null"],
                        },
                      },
                    },
                  },
                },
                prior_undisputed_transactions: {
                  type: "array",
                  items: {
                    type: "object" as const,
                    properties: {
                      charge: {
                        type: "string",
                      },
                      customer_account_id: {
                        type: ["string", "null"],
                      },
                      customer_device_fingerprint: {
                        type: ["string", "null"],
                      },
                      customer_device_id: {
                        type: ["string", "null"],
                      },
                      customer_email_address: {
                        type: ["string", "null"],
                      },
                      customer_purchase_ip: {
                        type: ["string", "null"],
                      },
                      product_description: {
                        type: ["string", "null"],
                      },
                      shipping_address: {
                        type: ["object", "null"],
                        properties: {
                          city: {
                            type: ["string", "null"],
                          },
                          country: {
                            type: ["string", "null"],
                          },
                          line1: {
                            type: ["string", "null"],
                          },
                          line2: {
                            type: ["string", "null"],
                          },
                          postal_code: {
                            type: ["string", "null"],
                          },
                          state: {
                            type: ["string", "null"],
                          },
                        },
                      },
                    },
                    required: ["charge"],
                  },
                },
              },
              required: ["prior_undisputed_transactions"],
            },
            visa_compliance: {
              type: "object" as const,
              properties: {
                fee_acknowledged: {
                  type: "boolean",
                },
              },
              required: ["fee_acknowledged"],
            },
          },
        },
        product_description: {
          type: ["string", "null"],
        },
        receipt: {
          type: ["string", "null"],
        },
        refund_policy: {
          type: ["string", "null"],
        },
        refund_policy_disclosure: {
          type: ["string", "null"],
        },
        refund_refusal_explanation: {
          type: ["string", "null"],
        },
        service_date: {
          type: ["string", "null"],
        },
        service_documentation: {
          type: ["string", "null"],
        },
        shipping_address: {
          type: ["string", "null"],
        },
        shipping_carrier: {
          type: ["string", "null"],
        },
        shipping_date: {
          type: ["string", "null"],
        },
        shipping_documentation: {
          type: ["string", "null"],
        },
        shipping_tracking_number: {
          type: ["string", "null"],
        },
        uncategorized_file: {
          type: ["string", "null"],
        },
        uncategorized_text: {
          type: ["string", "null"],
        },
      },
      required: ["enhanced_evidence"],
    },
    evidence_details: {
      type: "object" as const,
      properties: {
        due_by: {
          type: ["integer", "null"],
          format: "unix-time",
        },
        enhanced_eligibility: {
          type: "object" as const,
          properties: {
            visa_compelling_evidence_3: {
              type: "object" as const,
              properties: {
                required_actions: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: [
                      "missing_customer_identifiers",
                      "missing_disputed_transaction_description",
                      "missing_merchandise_or_services",
                      "missing_prior_undisputed_transaction_description",
                      "missing_prior_undisputed_transactions",
                    ],
                  },
                },
                status: {
                  type: "string",
                  enum: ["not_qualified", "qualified", "requires_action"],
                },
              },
              required: ["required_actions", "status"],
            },
            visa_compliance: {
              type: "object" as const,
              properties: {
                status: {
                  type: "string",
                  enum: ["fee_acknowledged", "requires_fee_acknowledgement"],
                },
              },
              required: ["status"],
            },
          },
        },
        has_evidence: {
          type: "boolean",
        },
        past_due: {
          type: "boolean",
        },
        submission_count: {
          type: "integer",
        },
      },
      required: [
        "enhanced_eligibility",
        "has_evidence",
        "past_due",
        "submission_count",
      ],
    },
    id: {
      type: "string",
    },
    is_charge_refundable: {
      type: "boolean",
    },
    livemode: {
      type: "boolean",
    },
    metadata: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    object: {
      type: "string",
      enum: ["dispute"],
    },
    payment_intent: {
      type: ["string", "null"],
    },
    payment_method_details: {
      type: "object" as const,
      properties: {
        amazon_pay: {
          type: "object" as const,
          properties: {
            dispute_type: {
              type: ["string", "null"],
              enum: ["chargeback", "claim"],
            },
          },
        },
        card: {
          type: "object" as const,
          properties: {
            brand: {
              type: "string",
            },
            case_type: {
              type: "string",
              enum: ["chargeback", "inquiry"],
            },
            network_reason_code: {
              type: ["string", "null"],
            },
          },
          required: ["brand", "case_type"],
        },
        klarna: {
          type: "object" as const,
          properties: {
            reason_code: {
              type: ["string", "null"],
            },
          },
        },
        paypal: {
          type: "object" as const,
          properties: {
            case_id: {
              type: ["string", "null"],
            },
            reason_code: {
              type: ["string", "null"],
            },
          },
        },
        type: {
          type: "string",
          enum: ["amazon_pay", "card", "klarna", "paypal"],
        },
      },
      required: ["type"],
    },
    reason: {
      type: "string",
    },
    status: {
      type: "string",
      enum: [
        "lost",
        "needs_response",
        "under_review",
        "warning_closed",
        "warning_needs_response",
        "warning_under_review",
        "won",
      ],
    },
  },
  required: [
    "amount",
    "balance_transactions",
    "charge",
    "created",
    "currency",
    "enhanced_eligibility_types",
    "evidence",
    "evidence_details",
    "id",
    "is_charge_refundable",
    "livemode",
    "metadata",
    "object",
    "reason",
    "status",
  ],
};
export const listDisputesOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: disputeOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
