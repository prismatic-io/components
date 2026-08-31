export const subscriptionOutputSchema = {
  type: "object" as const,
  properties: {
    application: {
      type: ["string", "null"],
    },
    application_fee_percent: {
      type: ["number", "null"],
    },
    automatic_tax: {
      type: "object" as const,
      properties: {
        disabled_reason: {
          type: ["string", "null"],
          enum: ["requires_location_inputs"],
        },
        enabled: {
          type: "boolean",
        },
        liability: {
          type: ["object", "null"],
          properties: {
            account: {
              type: "string",
            },
            type: {
              type: "string",
              enum: ["account", "self"],
            },
          },
          required: ["type"],
        },
      },
      required: ["enabled"],
    },
    billing_cycle_anchor: {
      type: "integer",
      format: "unix-time",
    },
    billing_cycle_anchor_config: {
      type: ["object", "null"],
      properties: {
        day_of_month: {
          type: "integer",
        },
        hour: {
          type: ["integer", "null"],
        },
        minute: {
          type: ["integer", "null"],
        },
        month: {
          type: ["integer", "null"],
        },
        second: {
          type: ["integer", "null"],
        },
      },
      required: ["day_of_month"],
    },
    cancel_at: {
      type: ["integer", "null"],
      format: "unix-time",
    },
    cancel_at_period_end: {
      type: "boolean",
    },
    canceled_at: {
      type: ["integer", "null"],
      format: "unix-time",
    },
    cancellation_details: {
      type: ["object", "null"],
      properties: {
        comment: {
          type: ["string", "null"],
        },
        feedback: {
          type: ["string", "null"],
          enum: [
            "customer_service",
            "low_quality",
            "missing_features",
            "other",
            "switched_service",
            "too_complex",
            "too_expensive",
            "unused",
          ],
        },
        reason: {
          type: ["string", "null"],
          enum: [
            "cancellation_requested",
            "payment_disputed",
            "payment_failed",
          ],
        },
      },
    },
    collection_method: {
      type: "string",
      enum: ["charge_automatically", "send_invoice"],
    },
    created: {
      type: "integer",
      format: "unix-time",
    },
    currency: {
      type: "string",
      format: "currency",
    },
    customer: {
      type: "string",
    },
    days_until_due: {
      type: ["integer", "null"],
    },
    default_payment_method: {
      type: ["string", "null"],
    },
    default_source: {
      type: ["string", "null"],
    },
    default_tax_rates: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          active: {
            type: "boolean",
          },
          country: {
            type: ["string", "null"],
          },
          created: {
            type: "integer",
            format: "unix-time",
          },
          description: {
            type: ["string", "null"],
          },
          display_name: {
            type: "string",
          },
          effective_percentage: {
            type: ["number", "null"],
          },
          flat_amount: {
            type: ["object", "null"],
            properties: {
              amount: {
                type: "integer",
              },
              currency: {
                type: "string",
              },
            },
            required: ["amount", "currency"],
          },
          id: {
            type: "string",
          },
          inclusive: {
            type: "boolean",
          },
          jurisdiction: {
            type: ["string", "null"],
          },
          jurisdiction_level: {
            type: ["string", "null"],
            enum: [
              "city",
              "country",
              "county",
              "district",
              "multiple",
              "state",
            ],
          },
          livemode: {
            type: "boolean",
          },
          metadata: {
            type: ["object", "null"],
            additionalProperties: {
              type: "string",
            },
          },
          object: {
            type: "string",
            enum: ["tax_rate"],
          },
          percentage: {
            type: "number",
          },
          rate_type: {
            type: ["string", "null"],
            enum: ["flat_amount", "percentage"],
          },
          state: {
            type: ["string", "null"],
          },
          tax_type: {
            type: ["string", "null"],
            enum: [
              "amusement_tax",
              "communications_tax",
              "gst",
              "hst",
              "igst",
              "jct",
              "lease_tax",
              "pst",
              "qst",
              "retail_delivery_fee",
              "rst",
              "sales_tax",
              "service_tax",
              "vat",
            ],
          },
        },
        required: [
          "active",
          "created",
          "display_name",
          "id",
          "inclusive",
          "livemode",
          "object",
          "percentage",
        ],
      },
    },
    description: {
      type: ["string", "null"],
    },
    discounts: {
      type: "array",
      items: {
        type: "string",
      },
    },
    ended_at: {
      type: ["integer", "null"],
      format: "unix-time",
    },
    id: {
      type: "string",
    },
    invoice_settings: {
      type: "object" as const,
      properties: {
        account_tax_ids: {
          type: ["array", "null"],
          items: {
            type: "string",
          },
        },
        issuer: {
          type: "object" as const,
          properties: {
            account: {
              type: "string",
            },
            type: {
              type: "string",
              enum: ["account", "self"],
            },
          },
          required: ["type"],
        },
      },
      required: ["issuer"],
    },
    items: {
      type: "object" as const,
      properties: {
        data: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              created: {
                type: "integer",
              },
              current_period_end: {
                type: "integer",
                format: "unix-time",
              },
              current_period_start: {
                type: "integer",
                format: "unix-time",
              },
              discounts: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              id: {
                type: "string",
              },
              metadata: {
                type: "object" as const,
                additionalProperties: {
                  type: "string",
                },
              },
              object: {
                type: "string",
                enum: ["subscription_item"],
              },
              price: {
                type: "object" as const,
                properties: {
                  active: {
                    type: "boolean",
                  },
                  billing_scheme: {
                    type: "string",
                    enum: ["per_unit", "tiered"],
                  },
                  created: {
                    type: "integer",
                    format: "unix-time",
                  },
                  currency: {
                    type: "string",
                    format: "currency",
                  },
                  currency_options: {
                    type: "object" as const,
                    additionalProperties: {
                      type: "object" as const,
                      properties: {
                        custom_unit_amount: {
                          type: ["object", "null"],
                          properties: {
                            maximum: {
                              type: ["integer", "null"],
                            },
                            minimum: {
                              type: ["integer", "null"],
                            },
                            preset: {
                              type: ["integer", "null"],
                            },
                          },
                        },
                        tax_behavior: {
                          type: ["string", "null"],
                          enum: ["exclusive", "inclusive", "unspecified"],
                        },
                        tiers: {
                          type: "array",
                          items: {
                            type: "object" as const,
                            properties: {
                              flat_amount: {
                                type: ["integer", "null"],
                              },
                              flat_amount_decimal: {
                                type: ["string", "null"],
                                format: "decimal",
                              },
                              unit_amount: {
                                type: ["integer", "null"],
                              },
                              unit_amount_decimal: {
                                type: ["string", "null"],
                                format: "decimal",
                              },
                              up_to: {
                                type: ["integer", "null"],
                              },
                            },
                          },
                        },
                        unit_amount: {
                          type: ["integer", "null"],
                        },
                        unit_amount_decimal: {
                          type: ["string", "null"],
                          format: "decimal",
                        },
                      },
                    },
                  },
                  custom_unit_amount: {
                    type: ["object", "null"],
                    properties: {
                      maximum: {
                        type: ["integer", "null"],
                      },
                      minimum: {
                        type: ["integer", "null"],
                      },
                      preset: {
                        type: ["integer", "null"],
                      },
                    },
                  },
                  id: {
                    type: "string",
                  },
                  livemode: {
                    type: "boolean",
                  },
                  lookup_key: {
                    type: ["string", "null"],
                  },
                  metadata: {
                    type: "object" as const,
                    additionalProperties: {
                      type: "string",
                    },
                  },
                  nickname: {
                    type: ["string", "null"],
                  },
                  object: {
                    type: "string",
                    enum: ["price"],
                  },
                  product: {
                    type: "string",
                  },
                  recurring: {
                    type: ["object", "null"],
                    properties: {
                      interval: {
                        type: "string",
                        enum: ["day", "month", "week", "year"],
                      },
                      interval_count: {
                        type: "integer",
                      },
                      meter: {
                        type: ["string", "null"],
                      },
                      usage_type: {
                        type: "string",
                        enum: ["licensed", "metered"],
                      },
                    },
                    required: ["interval", "interval_count", "usage_type"],
                  },
                  tax_behavior: {
                    type: ["string", "null"],
                    enum: ["exclusive", "inclusive", "unspecified"],
                  },
                  tiers: {
                    type: "array",
                    items: {
                      type: "object" as const,
                      properties: {
                        flat_amount: {
                          type: ["integer", "null"],
                        },
                        flat_amount_decimal: {
                          type: ["string", "null"],
                          format: "decimal",
                        },
                        unit_amount: {
                          type: ["integer", "null"],
                        },
                        unit_amount_decimal: {
                          type: ["string", "null"],
                          format: "decimal",
                        },
                        up_to: {
                          type: ["integer", "null"],
                        },
                      },
                    },
                  },
                  tiers_mode: {
                    type: ["string", "null"],
                    enum: ["graduated", "volume"],
                  },
                  transform_quantity: {
                    type: ["object", "null"],
                    properties: {
                      divide_by: {
                        type: "integer",
                      },
                      round: {
                        type: "string",
                        enum: ["down", "up"],
                      },
                    },
                    required: ["divide_by", "round"],
                  },
                  type: {
                    type: "string",
                    enum: ["one_time", "recurring"],
                  },
                  unit_amount: {
                    type: ["integer", "null"],
                  },
                  unit_amount_decimal: {
                    type: ["string", "null"],
                    format: "decimal",
                  },
                },
                required: [
                  "active",
                  "billing_scheme",
                  "created",
                  "currency",
                  "id",
                  "livemode",
                  "metadata",
                  "object",
                  "product",
                  "type",
                ],
              },
              quantity: {
                type: "integer",
              },
              subscription: {
                type: "string",
              },
              tax_rates: {
                type: ["array", "null"],
                items: {
                  type: "object" as const,
                  properties: {
                    active: {
                      type: "boolean",
                    },
                    country: {
                      type: ["string", "null"],
                    },
                    created: {
                      type: "integer",
                      format: "unix-time",
                    },
                    description: {
                      type: ["string", "null"],
                    },
                    display_name: {
                      type: "string",
                    },
                    effective_percentage: {
                      type: ["number", "null"],
                    },
                    flat_amount: {
                      type: ["object", "null"],
                      properties: {
                        amount: {
                          type: "integer",
                        },
                        currency: {
                          type: "string",
                        },
                      },
                      required: ["amount", "currency"],
                    },
                    id: {
                      type: "string",
                    },
                    inclusive: {
                      type: "boolean",
                    },
                    jurisdiction: {
                      type: ["string", "null"],
                    },
                    jurisdiction_level: {
                      type: ["string", "null"],
                      enum: [
                        "city",
                        "country",
                        "county",
                        "district",
                        "multiple",
                        "state",
                      ],
                    },
                    livemode: {
                      type: "boolean",
                    },
                    metadata: {
                      type: ["object", "null"],
                      additionalProperties: {
                        type: "string",
                      },
                    },
                    object: {
                      type: "string",
                      enum: ["tax_rate"],
                    },
                    percentage: {
                      type: "number",
                    },
                    rate_type: {
                      type: ["string", "null"],
                      enum: ["flat_amount", "percentage"],
                    },
                    state: {
                      type: ["string", "null"],
                    },
                    tax_type: {
                      type: ["string", "null"],
                      enum: [
                        "amusement_tax",
                        "communications_tax",
                        "gst",
                        "hst",
                        "igst",
                        "jct",
                        "lease_tax",
                        "pst",
                        "qst",
                        "retail_delivery_fee",
                        "rst",
                        "sales_tax",
                        "service_tax",
                        "vat",
                      ],
                    },
                  },
                  required: [
                    "active",
                    "created",
                    "display_name",
                    "id",
                    "inclusive",
                    "livemode",
                    "object",
                    "percentage",
                  ],
                },
              },
            },
            required: [
              "created",
              "current_period_end",
              "current_period_start",
              "discounts",
              "id",
              "metadata",
              "object",
              "price",
              "subscription",
            ],
          },
        },
        has_more: {
          type: "boolean",
        },
        object: {
          type: "string",
          enum: ["list"],
        },
        url: {
          type: "string",
        },
      },
      required: ["data", "has_more", "object", "url"],
    },
    latest_invoice: {
      type: ["string", "null"],
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
    next_pending_invoice_item_invoice: {
      type: ["integer", "null"],
      format: "unix-time",
    },
    object: {
      type: "string",
      enum: ["subscription"],
    },
    on_behalf_of: {
      type: ["string", "null"],
    },
    pause_collection: {
      type: ["object", "null"],
      properties: {
        behavior: {
          type: "string",
          enum: ["keep_as_draft", "mark_uncollectible", "void"],
        },
        resumes_at: {
          type: ["integer", "null"],
          format: "unix-time",
        },
      },
      required: ["behavior"],
    },
    payment_settings: {
      type: ["object", "null"],
      properties: {
        payment_method_options: {
          type: ["object", "null"],
          properties: {
            acss_debit: {
              type: ["object", "null"],
              properties: {
                mandate_options: {
                  type: "object" as const,
                  properties: {
                    transaction_type: {
                      type: ["string", "null"],
                      enum: ["business", "personal"],
                    },
                  },
                },
                verification_method: {
                  type: "string",
                  enum: ["automatic", "instant", "microdeposits"],
                },
              },
            },
            bancontact: {
              type: ["object", "null"],
              properties: {
                preferred_language: {
                  type: "string",
                  enum: ["de", "en", "fr", "nl"],
                },
              },
              required: ["preferred_language"],
            },
            card: {
              type: ["object", "null"],
              properties: {
                mandate_options: {
                  type: "object" as const,
                  properties: {
                    amount: {
                      type: ["integer", "null"],
                    },
                    amount_type: {
                      type: ["string", "null"],
                      enum: ["fixed", "maximum"],
                    },
                    description: {
                      type: ["string", "null"],
                    },
                  },
                },
                network: {
                  type: ["string", "null"],
                  enum: [
                    "amex",
                    "cartes_bancaires",
                    "diners",
                    "discover",
                    "eftpos_au",
                    "girocard",
                    "interac",
                    "jcb",
                    "link",
                    "mastercard",
                    "unionpay",
                    "unknown",
                    "visa",
                  ],
                },
                request_three_d_secure: {
                  type: ["string", "null"],
                  enum: ["any", "automatic", "challenge"],
                },
              },
            },
            customer_balance: {
              type: ["object", "null"],
              properties: {
                bank_transfer: {
                  type: "object" as const,
                  properties: {
                    eu_bank_transfer: {
                      type: "object" as const,
                      properties: {
                        country: {
                          type: "string",
                          enum: ["BE", "DE", "ES", "FR", "IE", "NL"],
                        },
                      },
                      required: ["country"],
                    },
                    type: {
                      type: ["string", "null"],
                    },
                  },
                },
                funding_type: {
                  type: ["string", "null"],
                  enum: ["bank_transfer"],
                },
              },
            },
            konbini: {
              type: ["object", "null"],
            },
            sepa_debit: {
              type: ["object", "null"],
            },
            us_bank_account: {
              type: ["object", "null"],
              properties: {
                financial_connections: {
                  type: "object" as const,
                  properties: {
                    filters: {
                      type: "object" as const,
                      properties: {
                        account_subcategories: {
                          type: "array",
                          items: {
                            type: "string",
                            enum: ["checking", "savings"],
                          },
                        },
                      },
                    },
                    permissions: {
                      type: "array",
                      items: {
                        type: "string",
                        enum: [
                          "balances",
                          "ownership",
                          "payment_method",
                          "transactions",
                        ],
                      },
                    },
                    prefetch: {
                      type: ["array", "null"],
                      items: {
                        type: "string",
                        enum: ["balances", "ownership", "transactions"],
                      },
                    },
                  },
                },
                verification_method: {
                  type: "string",
                  enum: ["automatic", "instant", "microdeposits"],
                },
              },
            },
          },
        },
        payment_method_types: {
          type: ["array", "null"],
          items: {
            type: "string",
            enum: [
              "ach_credit_transfer",
              "ach_debit",
              "acss_debit",
              "affirm",
              "amazon_pay",
              "au_becs_debit",
              "bacs_debit",
              "bancontact",
              "boleto",
              "card",
              "cashapp",
              "customer_balance",
              "eps",
              "fpx",
              "giropay",
              "grabpay",
              "ideal",
              "jp_credit_transfer",
              "kakao_pay",
              "klarna",
              "konbini",
              "kr_card",
              "link",
              "multibanco",
              "naver_pay",
              "nz_bank_account",
              "p24",
              "payco",
              "paynow",
              "paypal",
              "promptpay",
              "revolut_pay",
              "sepa_credit_transfer",
              "sepa_debit",
              "sofort",
              "swish",
              "us_bank_account",
              "wechat_pay",
            ],
          },
        },
        save_default_payment_method: {
          type: ["string", "null"],
          enum: ["off", "on_subscription"],
        },
      },
    },
    pending_invoice_item_interval: {
      type: ["object", "null"],
      properties: {
        interval: {
          type: "string",
          enum: ["day", "month", "week", "year"],
        },
        interval_count: {
          type: "integer",
        },
      },
      required: ["interval", "interval_count"],
    },
    pending_setup_intent: {
      type: ["string", "null"],
    },
    pending_update: {
      type: ["object", "null"],
      properties: {
        billing_cycle_anchor: {
          type: ["integer", "null"],
          format: "unix-time",
        },
        expires_at: {
          type: "integer",
          format: "unix-time",
        },
        subscription_items: {
          type: ["array", "null"],
          items: {
            type: "object" as const,
            properties: {
              created: {
                type: "integer",
              },
              current_period_end: {
                type: "integer",
                format: "unix-time",
              },
              current_period_start: {
                type: "integer",
                format: "unix-time",
              },
              discounts: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              id: {
                type: "string",
              },
              metadata: {
                type: "object" as const,
                additionalProperties: {
                  type: "string",
                },
              },
              object: {
                type: "string",
                enum: ["subscription_item"],
              },
              price: {
                type: "object" as const,
                properties: {
                  active: {
                    type: "boolean",
                  },
                  billing_scheme: {
                    type: "string",
                    enum: ["per_unit", "tiered"],
                  },
                  created: {
                    type: "integer",
                    format: "unix-time",
                  },
                  currency: {
                    type: "string",
                    format: "currency",
                  },
                  currency_options: {
                    type: "object" as const,
                    additionalProperties: {
                      type: "object" as const,
                      properties: {
                        custom_unit_amount: {
                          type: ["object", "null"],
                          properties: {
                            maximum: {
                              type: ["integer", "null"],
                            },
                            minimum: {
                              type: ["integer", "null"],
                            },
                            preset: {
                              type: ["integer", "null"],
                            },
                          },
                        },
                        tax_behavior: {
                          type: ["string", "null"],
                          enum: ["exclusive", "inclusive", "unspecified"],
                        },
                        tiers: {
                          type: "array",
                          items: {
                            type: "object" as const,
                            properties: {
                              flat_amount: {
                                type: ["integer", "null"],
                              },
                              flat_amount_decimal: {
                                type: ["string", "null"],
                                format: "decimal",
                              },
                              unit_amount: {
                                type: ["integer", "null"],
                              },
                              unit_amount_decimal: {
                                type: ["string", "null"],
                                format: "decimal",
                              },
                              up_to: {
                                type: ["integer", "null"],
                              },
                            },
                          },
                        },
                        unit_amount: {
                          type: ["integer", "null"],
                        },
                        unit_amount_decimal: {
                          type: ["string", "null"],
                          format: "decimal",
                        },
                      },
                    },
                  },
                  custom_unit_amount: {
                    type: ["object", "null"],
                    properties: {
                      maximum: {
                        type: ["integer", "null"],
                      },
                      minimum: {
                        type: ["integer", "null"],
                      },
                      preset: {
                        type: ["integer", "null"],
                      },
                    },
                  },
                  id: {
                    type: "string",
                  },
                  livemode: {
                    type: "boolean",
                  },
                  lookup_key: {
                    type: ["string", "null"],
                  },
                  metadata: {
                    type: "object" as const,
                    additionalProperties: {
                      type: "string",
                    },
                  },
                  nickname: {
                    type: ["string", "null"],
                  },
                  object: {
                    type: "string",
                    enum: ["price"],
                  },
                  product: {
                    type: "string",
                  },
                  recurring: {
                    type: ["object", "null"],
                    properties: {
                      interval: {
                        type: "string",
                        enum: ["day", "month", "week", "year"],
                      },
                      interval_count: {
                        type: "integer",
                      },
                      meter: {
                        type: ["string", "null"],
                      },
                      usage_type: {
                        type: "string",
                        enum: ["licensed", "metered"],
                      },
                    },
                    required: ["interval", "interval_count", "usage_type"],
                  },
                  tax_behavior: {
                    type: ["string", "null"],
                    enum: ["exclusive", "inclusive", "unspecified"],
                  },
                  tiers: {
                    type: "array",
                    items: {
                      type: "object" as const,
                      properties: {
                        flat_amount: {
                          type: ["integer", "null"],
                        },
                        flat_amount_decimal: {
                          type: ["string", "null"],
                          format: "decimal",
                        },
                        unit_amount: {
                          type: ["integer", "null"],
                        },
                        unit_amount_decimal: {
                          type: ["string", "null"],
                          format: "decimal",
                        },
                        up_to: {
                          type: ["integer", "null"],
                        },
                      },
                    },
                  },
                  tiers_mode: {
                    type: ["string", "null"],
                    enum: ["graduated", "volume"],
                  },
                  transform_quantity: {
                    type: ["object", "null"],
                    properties: {
                      divide_by: {
                        type: "integer",
                      },
                      round: {
                        type: "string",
                        enum: ["down", "up"],
                      },
                    },
                    required: ["divide_by", "round"],
                  },
                  type: {
                    type: "string",
                    enum: ["one_time", "recurring"],
                  },
                  unit_amount: {
                    type: ["integer", "null"],
                  },
                  unit_amount_decimal: {
                    type: ["string", "null"],
                    format: "decimal",
                  },
                },
                required: [
                  "active",
                  "billing_scheme",
                  "created",
                  "currency",
                  "id",
                  "livemode",
                  "metadata",
                  "object",
                  "product",
                  "type",
                ],
              },
              quantity: {
                type: "integer",
              },
              subscription: {
                type: "string",
              },
              tax_rates: {
                type: ["array", "null"],
                items: {
                  type: "object" as const,
                  properties: {
                    active: {
                      type: "boolean",
                    },
                    country: {
                      type: ["string", "null"],
                    },
                    created: {
                      type: "integer",
                      format: "unix-time",
                    },
                    description: {
                      type: ["string", "null"],
                    },
                    display_name: {
                      type: "string",
                    },
                    effective_percentage: {
                      type: ["number", "null"],
                    },
                    flat_amount: {
                      type: ["object", "null"],
                      properties: {
                        amount: {
                          type: "integer",
                        },
                        currency: {
                          type: "string",
                        },
                      },
                      required: ["amount", "currency"],
                    },
                    id: {
                      type: "string",
                    },
                    inclusive: {
                      type: "boolean",
                    },
                    jurisdiction: {
                      type: ["string", "null"],
                    },
                    jurisdiction_level: {
                      type: ["string", "null"],
                      enum: [
                        "city",
                        "country",
                        "county",
                        "district",
                        "multiple",
                        "state",
                      ],
                    },
                    livemode: {
                      type: "boolean",
                    },
                    metadata: {
                      type: ["object", "null"],
                      additionalProperties: {
                        type: "string",
                      },
                    },
                    object: {
                      type: "string",
                      enum: ["tax_rate"],
                    },
                    percentage: {
                      type: "number",
                    },
                    rate_type: {
                      type: ["string", "null"],
                      enum: ["flat_amount", "percentage"],
                    },
                    state: {
                      type: ["string", "null"],
                    },
                    tax_type: {
                      type: ["string", "null"],
                      enum: [
                        "amusement_tax",
                        "communications_tax",
                        "gst",
                        "hst",
                        "igst",
                        "jct",
                        "lease_tax",
                        "pst",
                        "qst",
                        "retail_delivery_fee",
                        "rst",
                        "sales_tax",
                        "service_tax",
                        "vat",
                      ],
                    },
                  },
                  required: [
                    "active",
                    "created",
                    "display_name",
                    "id",
                    "inclusive",
                    "livemode",
                    "object",
                    "percentage",
                  ],
                },
              },
            },
            required: [
              "created",
              "current_period_end",
              "current_period_start",
              "discounts",
              "id",
              "metadata",
              "object",
              "price",
              "subscription",
            ],
          },
        },
        trial_end: {
          type: ["integer", "null"],
          format: "unix-time",
        },
        trial_from_plan: {
          type: ["boolean", "null"],
        },
      },
      required: ["expires_at"],
    },
    schedule: {
      type: ["string", "null"],
    },
    start_date: {
      type: "integer",
      format: "unix-time",
    },
    status: {
      type: "string",
      enum: [
        "active",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "paused",
        "trialing",
        "unpaid",
      ],
    },
    test_clock: {
      type: ["string", "null"],
    },
    transfer_data: {
      type: ["object", "null"],
      properties: {
        amount_percent: {
          type: ["number", "null"],
        },
        destination: {
          type: "string",
        },
      },
      required: ["destination"],
    },
    trial_end: {
      type: ["integer", "null"],
      format: "unix-time",
    },
    trial_settings: {
      type: ["object", "null"],
      properties: {
        end_behavior: {
          type: "object" as const,
          properties: {
            missing_payment_method: {
              type: "string",
              enum: ["cancel", "create_invoice", "pause"],
            },
          },
          required: ["missing_payment_method"],
        },
      },
      required: ["end_behavior"],
    },
    trial_start: {
      type: ["integer", "null"],
      format: "unix-time",
    },
  },
  required: [
    "automatic_tax",
    "billing_cycle_anchor",
    "cancel_at_period_end",
    "collection_method",
    "created",
    "currency",
    "customer",
    "discounts",
    "id",
    "invoice_settings",
    "items",
    "livemode",
    "metadata",
    "object",
    "start_date",
    "status",
  ],
};
export const listSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: subscriptionOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
