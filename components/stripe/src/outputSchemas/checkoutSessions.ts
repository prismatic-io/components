export const checkoutSessionOutputSchema = {
  type: "object" as const,
  properties: {
    adaptive_pricing: {
      type: ["object", "null"],
      properties: {
        enabled: {
          type: "boolean",
        },
      },
      required: ["enabled"],
    },
    after_expiration: {
      type: ["object", "null"],
      properties: {
        recovery: {
          type: ["object", "null"],
          properties: {
            allow_promotion_codes: {
              type: "boolean",
            },
            enabled: {
              type: "boolean",
            },
            expires_at: {
              type: ["integer", "null"],
              format: "unix-time",
            },
            url: {
              type: ["string", "null"],
            },
          },
          required: ["allow_promotion_codes", "enabled"],
        },
      },
    },
    allow_promotion_codes: {
      type: ["boolean", "null"],
    },
    amount_subtotal: {
      type: ["integer", "null"],
    },
    amount_total: {
      type: ["integer", "null"],
    },
    automatic_tax: {
      type: "object" as const,
      properties: {
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
        provider: {
          type: ["string", "null"],
        },
        status: {
          type: ["string", "null"],
          enum: ["complete", "failed", "requires_location_inputs"],
        },
      },
      required: ["enabled"],
    },
    billing_address_collection: {
      type: ["string", "null"],
      enum: ["auto", "required"],
    },
    cancel_url: {
      type: ["string", "null"],
    },
    client_reference_id: {
      type: ["string", "null"],
    },
    client_secret: {
      type: ["string", "null"],
    },
    collected_information: {
      type: ["object", "null"],
      properties: {
        shipping_details: {
          type: ["object", "null"],
          properties: {
            address: {
              type: "object" as const,
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
            name: {
              type: "string",
            },
          },
          required: ["address", "name"],
        },
      },
    },
    consent: {
      type: ["object", "null"],
      properties: {
        promotions: {
          type: ["string", "null"],
          enum: ["opt_in", "opt_out"],
        },
        terms_of_service: {
          type: ["string", "null"],
          enum: ["accepted"],
        },
      },
    },
    consent_collection: {
      type: ["object", "null"],
      properties: {
        payment_method_reuse_agreement: {
          type: ["object", "null"],
          properties: {
            position: {
              type: "string",
              enum: ["auto", "hidden"],
            },
          },
          required: ["position"],
        },
        promotions: {
          type: ["string", "null"],
          enum: ["auto", "none"],
        },
        terms_of_service: {
          type: ["string", "null"],
          enum: ["none", "required"],
        },
      },
    },
    created: {
      type: "integer",
      format: "unix-time",
    },
    currency: {
      type: ["string", "null"],
      format: "currency",
    },
    currency_conversion: {
      type: ["object", "null"],
      properties: {
        amount_subtotal: {
          type: "integer",
        },
        amount_total: {
          type: "integer",
        },
        fx_rate: {
          type: "string",
          format: "decimal",
        },
        source_currency: {
          type: "string",
        },
      },
      required: [
        "amount_subtotal",
        "amount_total",
        "fx_rate",
        "source_currency",
      ],
    },
    custom_fields: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          dropdown: {
            type: "object" as const,
            properties: {
              default_value: {
                type: ["string", "null"],
              },
              options: {
                type: "array",
                items: {
                  type: "object" as const,
                  properties: {
                    label: {
                      type: "string",
                    },
                    value: {
                      type: "string",
                    },
                  },
                  required: ["label", "value"],
                },
              },
              value: {
                type: ["string", "null"],
              },
            },
            required: ["options"],
          },
          key: {
            type: "string",
          },
          label: {
            type: "object" as const,
            properties: {
              custom: {
                type: ["string", "null"],
              },
              type: {
                type: "string",
                enum: ["custom"],
              },
            },
            required: ["type"],
          },
          numeric: {
            type: "object" as const,
            properties: {
              default_value: {
                type: ["string", "null"],
              },
              maximum_length: {
                type: ["integer", "null"],
              },
              minimum_length: {
                type: ["integer", "null"],
              },
              value: {
                type: ["string", "null"],
              },
            },
          },
          optional: {
            type: "boolean",
          },
          text: {
            type: "object" as const,
            properties: {
              default_value: {
                type: ["string", "null"],
              },
              maximum_length: {
                type: ["integer", "null"],
              },
              minimum_length: {
                type: ["integer", "null"],
              },
              value: {
                type: ["string", "null"],
              },
            },
          },
          type: {
            type: "string",
            enum: ["dropdown", "numeric", "text"],
          },
        },
        required: ["key", "label", "optional", "type"],
      },
    },
    custom_text: {
      type: "object" as const,
      properties: {
        after_submit: {
          type: ["object", "null"],
          properties: {
            message: {
              type: "string",
            },
          },
          required: ["message"],
        },
        shipping_address: {
          type: ["object", "null"],
          properties: {
            message: {
              type: "string",
            },
          },
          required: ["message"],
        },
        submit: {
          type: ["object", "null"],
          properties: {
            message: {
              type: "string",
            },
          },
          required: ["message"],
        },
        terms_of_service_acceptance: {
          type: ["object", "null"],
          properties: {
            message: {
              type: "string",
            },
          },
          required: ["message"],
        },
      },
    },
    customer: {
      type: ["string", "null"],
    },
    customer_creation: {
      type: ["string", "null"],
      enum: ["always", "if_required"],
    },
    customer_details: {
      type: ["object", "null"],
      properties: {
        address: {
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
        email: {
          type: ["string", "null"],
        },
        name: {
          type: ["string", "null"],
        },
        phone: {
          type: ["string", "null"],
        },
        tax_exempt: {
          type: ["string", "null"],
          enum: ["exempt", "none", "reverse"],
        },
        tax_ids: {
          type: ["array", "null"],
          items: {
            type: "object" as const,
            properties: {
              type: {
                type: "string",
                enum: [
                  "ad_nrt",
                  "ae_trn",
                  "al_tin",
                  "am_tin",
                  "ao_tin",
                  "ar_cuit",
                  "au_abn",
                  "au_arn",
                  "aw_tin",
                  "az_tin",
                  "ba_tin",
                  "bb_tin",
                  "bd_bin",
                  "bf_ifu",
                  "bg_uic",
                  "bh_vat",
                  "bj_ifu",
                  "bo_tin",
                  "br_cnpj",
                  "br_cpf",
                  "bs_tin",
                  "by_tin",
                  "ca_bn",
                  "ca_gst_hst",
                  "ca_pst_bc",
                  "ca_pst_mb",
                  "ca_pst_sk",
                  "ca_qst",
                  "cd_nif",
                  "ch_uid",
                  "ch_vat",
                  "cl_tin",
                  "cm_niu",
                  "cn_tin",
                  "co_nit",
                  "cr_tin",
                  "cv_nif",
                  "de_stn",
                  "do_rcn",
                  "ec_ruc",
                  "eg_tin",
                  "es_cif",
                  "et_tin",
                  "eu_oss_vat",
                  "eu_vat",
                  "gb_vat",
                  "ge_vat",
                  "gn_nif",
                  "hk_br",
                  "hr_oib",
                  "hu_tin",
                  "id_npwp",
                  "il_vat",
                  "in_gst",
                  "is_vat",
                  "jp_cn",
                  "jp_rn",
                  "jp_trn",
                  "ke_pin",
                  "kg_tin",
                  "kh_tin",
                  "kr_brn",
                  "kz_bin",
                  "la_tin",
                  "li_uid",
                  "li_vat",
                  "ma_vat",
                  "md_vat",
                  "me_pib",
                  "mk_vat",
                  "mr_nif",
                  "mx_rfc",
                  "my_frp",
                  "my_itn",
                  "my_sst",
                  "ng_tin",
                  "no_vat",
                  "no_voec",
                  "np_pan",
                  "nz_gst",
                  "om_vat",
                  "pe_ruc",
                  "ph_tin",
                  "ro_tin",
                  "rs_pib",
                  "ru_inn",
                  "ru_kpp",
                  "sa_vat",
                  "sg_gst",
                  "sg_uen",
                  "si_tin",
                  "sn_ninea",
                  "sr_fin",
                  "sv_nit",
                  "th_vat",
                  "tj_tin",
                  "tr_tin",
                  "tw_vat",
                  "tz_vat",
                  "ua_vat",
                  "ug_tin",
                  "unknown",
                  "us_ein",
                  "uy_ruc",
                  "uz_tin",
                  "uz_vat",
                  "ve_rif",
                  "vn_tin",
                  "za_vat",
                  "zm_tin",
                  "zw_tin",
                ],
              },
              value: {
                type: ["string", "null"],
              },
            },
            required: ["type"],
          },
        },
      },
    },
    customer_email: {
      type: ["string", "null"],
    },
    discounts: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          coupon: {
            type: ["string", "null"],
          },
          promotion_code: {
            type: ["string", "null"],
          },
        },
      },
    },
    expires_at: {
      type: "integer",
      format: "unix-time",
    },
    id: {
      type: "string",
    },
    invoice: {
      type: ["string", "null"],
    },
    invoice_creation: {
      type: ["object", "null"],
      properties: {
        enabled: {
          type: "boolean",
        },
        invoice_data: {
          type: "object" as const,
          properties: {
            account_tax_ids: {
              type: ["array", "null"],
              items: {
                type: "string",
              },
            },
            custom_fields: {
              type: ["array", "null"],
              items: {
                type: "object" as const,
                properties: {
                  name: {
                    type: "string",
                  },
                  value: {
                    type: "string",
                  },
                },
                required: ["name", "value"],
              },
            },
            description: {
              type: ["string", "null"],
            },
            footer: {
              type: ["string", "null"],
            },
            issuer: {
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
            metadata: {
              type: ["object", "null"],
              additionalProperties: {
                type: "string",
              },
            },
            rendering_options: {
              type: ["object", "null"],
              properties: {
                amount_tax_display: {
                  type: ["string", "null"],
                },
              },
            },
          },
        },
      },
      required: ["enabled", "invoice_data"],
    },
    line_items: {
      type: "object" as const,
      properties: {
        data: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              amount_discount: {
                type: "integer",
              },
              amount_subtotal: {
                type: "integer",
              },
              amount_tax: {
                type: "integer",
              },
              amount_total: {
                type: "integer",
              },
              currency: {
                type: "string",
                format: "currency",
              },
              description: {
                type: ["string", "null"],
              },
              discounts: {
                type: "array",
                items: {
                  type: "object" as const,
                  properties: {
                    amount: {
                      type: "integer",
                    },
                    discount: {
                      type: "object" as const,
                      properties: {
                        checkout_session: {
                          type: ["string", "null"],
                        },
                        coupon: {
                          type: "object" as const,
                          properties: {
                            amount_off: {
                              type: ["integer", "null"],
                            },
                            applies_to: {
                              type: "object" as const,
                              properties: {
                                products: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                              },
                              required: ["products"],
                            },
                            created: {
                              type: "integer",
                              format: "unix-time",
                            },
                            currency: {
                              type: ["string", "null"],
                              format: "currency",
                            },
                            currency_options: {
                              type: "object" as const,
                              additionalProperties: {
                                type: "object" as const,
                                properties: {
                                  amount_off: {
                                    type: "integer",
                                  },
                                },
                                required: ["amount_off"],
                              },
                            },
                            duration: {
                              type: "string",
                              enum: ["forever", "once", "repeating"],
                            },
                            duration_in_months: {
                              type: ["integer", "null"],
                            },
                            id: {
                              type: "string",
                            },
                            livemode: {
                              type: "boolean",
                            },
                            max_redemptions: {
                              type: ["integer", "null"],
                            },
                            metadata: {
                              type: ["object", "null"],
                              additionalProperties: {
                                type: "string",
                              },
                            },
                            name: {
                              type: ["string", "null"],
                            },
                            object: {
                              type: "string",
                              enum: ["coupon"],
                            },
                            percent_off: {
                              type: ["number", "null"],
                            },
                            redeem_by: {
                              type: ["integer", "null"],
                              format: "unix-time",
                            },
                            times_redeemed: {
                              type: "integer",
                            },
                            valid: {
                              type: "boolean",
                            },
                          },
                          required: [
                            "created",
                            "duration",
                            "id",
                            "livemode",
                            "object",
                            "times_redeemed",
                            "valid",
                          ],
                        },
                        customer: {
                          type: ["string", "null"],
                        },
                        end: {
                          type: ["integer", "null"],
                          format: "unix-time",
                        },
                        id: {
                          type: "string",
                        },
                        invoice: {
                          type: ["string", "null"],
                        },
                        invoice_item: {
                          type: ["string", "null"],
                        },
                        object: {
                          type: "string",
                          enum: ["discount"],
                        },
                        promotion_code: {
                          type: ["string", "null"],
                        },
                        start: {
                          type: "integer",
                          format: "unix-time",
                        },
                        subscription: {
                          type: ["string", "null"],
                        },
                        subscription_item: {
                          type: ["string", "null"],
                        },
                      },
                      required: ["coupon", "id", "object", "start"],
                    },
                  },
                  required: ["amount", "discount"],
                },
              },
              id: {
                type: "string",
              },
              object: {
                type: "string",
                enum: ["item"],
              },
              price: {
                type: ["object", "null"],
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
                type: ["integer", "null"],
              },
              taxes: {
                type: "array",
                items: {
                  type: "object" as const,
                  properties: {
                    amount: {
                      type: "integer",
                    },
                    rate: {
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
                    taxability_reason: {
                      type: ["string", "null"],
                      enum: [
                        "customer_exempt",
                        "not_collecting",
                        "not_subject_to_tax",
                        "not_supported",
                        "portion_product_exempt",
                        "portion_reduced_rated",
                        "portion_standard_rated",
                        "product_exempt",
                        "product_exempt_holiday",
                        "proportionally_rated",
                        "reduced_rated",
                        "reverse_charge",
                        "standard_rated",
                        "taxable_basis_reduced",
                        "zero_rated",
                      ],
                    },
                    taxable_amount: {
                      type: ["integer", "null"],
                    },
                  },
                  required: ["amount", "rate"],
                },
              },
            },
            required: [
              "amount_discount",
              "amount_subtotal",
              "amount_tax",
              "amount_total",
              "currency",
              "id",
              "object",
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
    livemode: {
      type: "boolean",
    },
    locale: {
      type: ["string", "null"],
      enum: [
        "auto",
        "bg",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "en-GB",
        "es",
        "es-419",
        "et",
        "fi",
        "fil",
        "fr",
        "fr-CA",
        "hr",
        "hu",
        "id",
        "it",
        "ja",
        "ko",
        "lt",
        "lv",
        "ms",
        "mt",
        "nb",
        "nl",
        "pl",
        "pt",
        "pt-BR",
        "ro",
        "ru",
        "sk",
        "sl",
        "sv",
        "th",
        "tr",
        "vi",
        "zh",
        "zh-HK",
        "zh-TW",
      ],
    },
    metadata: {
      type: ["object", "null"],
      additionalProperties: {
        type: "string",
      },
    },
    mode: {
      type: "string",
      enum: ["payment", "setup", "subscription"],
    },
    object: {
      type: "string",
      enum: ["checkout.session"],
    },
    optional_items: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          adjustable_quantity: {
            type: ["object", "null"],
            properties: {
              enabled: {
                type: "boolean",
              },
              maximum: {
                type: ["integer", "null"],
              },
              minimum: {
                type: ["integer", "null"],
              },
            },
            required: ["enabled"],
          },
          price: {
            type: "string",
          },
          quantity: {
            type: "integer",
          },
        },
        required: ["price", "quantity"],
      },
    },
    payment_intent: {
      type: ["string", "null"],
    },
    payment_link: {
      type: ["string", "null"],
    },
    payment_method_collection: {
      type: ["string", "null"],
      enum: ["always", "if_required"],
    },
    payment_method_configuration_details: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "string",
        },
        parent: {
          type: ["string", "null"],
        },
      },
      required: ["id"],
    },
    payment_method_options: {
      type: ["object", "null"],
      properties: {
        acss_debit: {
          type: "object" as const,
          properties: {
            currency: {
              type: "string",
              enum: ["cad", "usd"],
            },
            mandate_options: {
              type: "object" as const,
              properties: {
                custom_mandate_url: {
                  type: "string",
                },
                default_for: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: ["invoice", "subscription"],
                  },
                },
                interval_description: {
                  type: ["string", "null"],
                },
                payment_schedule: {
                  type: ["string", "null"],
                  enum: ["combined", "interval", "sporadic"],
                },
                transaction_type: {
                  type: ["string", "null"],
                  enum: ["business", "personal"],
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            target_date: {
              type: "string",
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        affirm: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        afterpay_clearpay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        alipay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        amazon_pay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session"],
            },
          },
        },
        au_becs_debit: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
            target_date: {
              type: "string",
            },
          },
        },
        bacs_debit: {
          type: "object" as const,
          properties: {
            mandate_options: {
              type: "object" as const,
              properties: {
                reference_prefix: {
                  type: "string",
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            target_date: {
              type: "string",
            },
          },
        },
        bancontact: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        boleto: {
          type: "object" as const,
          properties: {
            expires_after_days: {
              type: "integer",
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
          },
          required: ["expires_after_days"],
        },
        card: {
          type: "object" as const,
          properties: {
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
              },
            },
            request_extended_authorization: {
              type: "string",
              enum: ["if_available", "never"],
            },
            request_incremental_authorization: {
              type: "string",
              enum: ["if_available", "never"],
            },
            request_multicapture: {
              type: "string",
              enum: ["if_available", "never"],
            },
            request_overcapture: {
              type: "string",
              enum: ["if_available", "never"],
            },
            request_three_d_secure: {
              type: "string",
              enum: ["any", "automatic", "challenge"],
            },
            restrictions: {
              type: "object" as const,
              properties: {
                brands_blocked: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: [
                      "american_express",
                      "discover_global_network",
                      "mastercard",
                      "visa",
                    ],
                  },
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            statement_descriptor_suffix_kana: {
              type: "string",
            },
            statement_descriptor_suffix_kanji: {
              type: "string",
            },
          },
          required: ["request_three_d_secure"],
        },
        cashapp: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        customer_balance: {
          type: "object" as const,
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
                requested_address_types: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: [
                      "aba",
                      "iban",
                      "sepa",
                      "sort_code",
                      "spei",
                      "swift",
                      "zengin",
                    ],
                  },
                },
                type: {
                  type: ["string", "null"],
                  enum: [
                    "eu_bank_transfer",
                    "gb_bank_transfer",
                    "jp_bank_transfer",
                    "mx_bank_transfer",
                    "us_bank_transfer",
                  ],
                },
              },
            },
            funding_type: {
              type: ["string", "null"],
              enum: ["bank_transfer"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        eps: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        fpx: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        giropay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        grabpay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        ideal: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        kakao_pay: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session"],
            },
          },
        },
        klarna: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
          },
        },
        konbini: {
          type: "object" as const,
          properties: {
            expires_after_days: {
              type: ["integer", "null"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        kr_card: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session"],
            },
          },
        },
        link: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session"],
            },
          },
        },
        mobilepay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        multibanco: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        naver_pay: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual"],
            },
          },
        },
        oxxo: {
          type: "object" as const,
          properties: {
            expires_after_days: {
              type: "integer",
            },
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
          required: ["expires_after_days"],
        },
        p24: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        payco: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual"],
            },
          },
        },
        paynow: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        paypal: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual"],
            },
            preferred_locale: {
              type: ["string", "null"],
            },
            reference: {
              type: ["string", "null"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session"],
            },
          },
        },
        pix: {
          type: "object" as const,
          properties: {
            expires_after_seconds: {
              type: ["integer", "null"],
            },
          },
        },
        revolut_pay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session"],
            },
          },
        },
        samsung_pay: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual"],
            },
          },
        },
        sepa_debit: {
          type: "object" as const,
          properties: {
            mandate_options: {
              type: "object" as const,
              properties: {
                reference_prefix: {
                  type: "string",
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            target_date: {
              type: "string",
            },
          },
        },
        sofort: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none"],
            },
          },
        },
        swish: {
          type: "object" as const,
          properties: {
            reference: {
              type: ["string", "null"],
            },
          },
        },
        us_bank_account: {
          type: "object" as const,
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
                return_url: {
                  type: "string",
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            target_date: {
              type: "string",
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant"],
            },
          },
        },
      },
    },
    payment_method_types: {
      type: "array",
      items: {
        type: "string",
      },
    },
    payment_status: {
      type: "string",
      enum: ["no_payment_required", "paid", "unpaid"],
    },
    permissions: {
      type: ["object", "null"],
      properties: {
        update_shipping_details: {
          type: ["string", "null"],
          enum: ["client_only", "server_only"],
        },
      },
    },
    phone_number_collection: {
      type: "object" as const,
      properties: {
        enabled: {
          type: "boolean",
        },
      },
      required: ["enabled"],
    },
    presentment_details: {
      type: "object" as const,
      properties: {
        presentment_amount: {
          type: "integer",
        },
        presentment_currency: {
          type: "string",
        },
      },
      required: ["presentment_amount", "presentment_currency"],
    },
    recovered_from: {
      type: ["string", "null"],
    },
    redirect_on_completion: {
      type: "string",
      enum: ["always", "if_required", "never"],
    },
    return_url: {
      type: "string",
    },
    saved_payment_method_options: {
      type: ["object", "null"],
      properties: {
        allow_redisplay_filters: {
          type: ["array", "null"],
          items: {
            type: "string",
            enum: ["always", "limited", "unspecified"],
          },
        },
        payment_method_remove: {
          type: ["string", "null"],
          enum: ["disabled", "enabled"],
        },
        payment_method_save: {
          type: ["string", "null"],
          enum: ["disabled", "enabled"],
        },
      },
    },
    setup_intent: {
      type: ["string", "null"],
    },
    shipping_address_collection: {
      type: ["object", "null"],
      properties: {
        allowed_countries: {
          type: "array",
          items: {
            type: "string",
            enum: [
              "AC",
              "AD",
              "AE",
              "AF",
              "AG",
              "AI",
              "AL",
              "AM",
              "AO",
              "AQ",
              "AR",
              "AT",
              "AU",
              "AW",
              "AX",
              "AZ",
              "BA",
              "BB",
              "BD",
              "BE",
              "BF",
              "BG",
              "BH",
              "BI",
              "BJ",
              "BL",
              "BM",
              "BN",
              "BO",
              "BQ",
              "BR",
              "BS",
              "BT",
              "BV",
              "BW",
              "BY",
              "BZ",
              "CA",
              "CD",
              "CF",
              "CG",
              "CH",
              "CI",
              "CK",
              "CL",
              "CM",
              "CN",
              "CO",
              "CR",
              "CV",
              "CW",
              "CY",
              "CZ",
              "DE",
              "DJ",
              "DK",
              "DM",
              "DO",
              "DZ",
              "EC",
              "EE",
              "EG",
              "EH",
              "ER",
              "ES",
              "ET",
              "FI",
              "FJ",
              "FK",
              "FO",
              "FR",
              "GA",
              "GB",
              "GD",
              "GE",
              "GF",
              "GG",
              "GH",
              "GI",
              "GL",
              "GM",
              "GN",
              "GP",
              "GQ",
              "GR",
              "GS",
              "GT",
              "GU",
              "GW",
              "GY",
              "HK",
              "HN",
              "HR",
              "HT",
              "HU",
              "ID",
              "IE",
              "IL",
              "IM",
              "IN",
              "IO",
              "IQ",
              "IS",
              "IT",
              "JE",
              "JM",
              "JO",
              "JP",
              "KE",
              "KG",
              "KH",
              "KI",
              "KM",
              "KN",
              "KR",
              "KW",
              "KY",
              "KZ",
              "LA",
              "LB",
              "LC",
              "LI",
              "LK",
              "LR",
              "LS",
              "LT",
              "LU",
              "LV",
              "LY",
              "MA",
              "MC",
              "MD",
              "ME",
              "MF",
              "MG",
              "MK",
              "ML",
              "MM",
              "MN",
              "MO",
              "MQ",
              "MR",
              "MS",
              "MT",
              "MU",
              "MV",
              "MW",
              "MX",
              "MY",
              "MZ",
              "NA",
              "NC",
              "NE",
              "NG",
              "NI",
              "NL",
              "NO",
              "NP",
              "NR",
              "NU",
              "NZ",
              "OM",
              "PA",
              "PE",
              "PF",
              "PG",
              "PH",
              "PK",
              "PL",
              "PM",
              "PN",
              "PR",
              "PS",
              "PT",
              "PY",
              "QA",
              "RE",
              "RO",
              "RS",
              "RU",
              "RW",
              "SA",
              "SB",
              "SC",
              "SD",
              "SE",
              "SG",
              "SH",
              "SI",
              "SJ",
              "SK",
              "SL",
              "SM",
              "SN",
              "SO",
              "SR",
              "SS",
              "ST",
              "SV",
              "SX",
              "SZ",
              "TA",
              "TC",
              "TD",
              "TF",
              "TG",
              "TH",
              "TJ",
              "TK",
              "TL",
              "TM",
              "TN",
              "TO",
              "TR",
              "TT",
              "TV",
              "TW",
              "TZ",
              "UA",
              "UG",
              "US",
              "UY",
              "UZ",
              "VA",
              "VC",
              "VE",
              "VG",
              "VN",
              "VU",
              "WF",
              "WS",
              "XK",
              "YE",
              "YT",
              "ZA",
              "ZM",
              "ZW",
              "ZZ",
            ],
          },
        },
      },
      required: ["allowed_countries"],
    },
    shipping_cost: {
      type: ["object", "null"],
      properties: {
        amount_subtotal: {
          type: "integer",
        },
        amount_tax: {
          type: "integer",
        },
        amount_total: {
          type: "integer",
        },
        shipping_rate: {
          type: ["string", "null"],
        },
        taxes: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              amount: {
                type: "integer",
              },
              rate: {
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
              taxability_reason: {
                type: ["string", "null"],
                enum: [
                  "customer_exempt",
                  "not_collecting",
                  "not_subject_to_tax",
                  "not_supported",
                  "portion_product_exempt",
                  "portion_reduced_rated",
                  "portion_standard_rated",
                  "product_exempt",
                  "product_exempt_holiday",
                  "proportionally_rated",
                  "reduced_rated",
                  "reverse_charge",
                  "standard_rated",
                  "taxable_basis_reduced",
                  "zero_rated",
                ],
              },
              taxable_amount: {
                type: ["integer", "null"],
              },
            },
            required: ["amount", "rate"],
          },
        },
      },
      required: ["amount_subtotal", "amount_tax", "amount_total"],
    },
    shipping_options: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          shipping_amount: {
            type: "integer",
          },
          shipping_rate: {
            type: "string",
          },
        },
        required: ["shipping_amount", "shipping_rate"],
      },
    },
    status: {
      type: ["string", "null"],
      enum: ["complete", "expired", "open"],
    },
    submit_type: {
      type: ["string", "null"],
      enum: ["auto", "book", "donate", "pay", "subscribe"],
    },
    subscription: {
      type: ["string", "null"],
    },
    success_url: {
      type: ["string", "null"],
    },
    tax_id_collection: {
      type: "object" as const,
      properties: {
        enabled: {
          type: "boolean",
        },
        required: {
          type: "string",
          enum: ["if_supported", "never"],
        },
      },
      required: ["enabled", "required"],
    },
    total_details: {
      type: ["object", "null"],
      properties: {
        amount_discount: {
          type: "integer",
        },
        amount_shipping: {
          type: ["integer", "null"],
        },
        amount_tax: {
          type: "integer",
        },
        breakdown: {
          type: "object" as const,
          properties: {
            discounts: {
              type: "array",
              items: {
                type: "object" as const,
                properties: {
                  amount: {
                    type: "integer",
                  },
                  discount: {
                    type: "object" as const,
                    properties: {
                      checkout_session: {
                        type: ["string", "null"],
                      },
                      coupon: {
                        type: "object" as const,
                        properties: {
                          amount_off: {
                            type: ["integer", "null"],
                          },
                          applies_to: {
                            type: "object" as const,
                            properties: {
                              products: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                            required: ["products"],
                          },
                          created: {
                            type: "integer",
                            format: "unix-time",
                          },
                          currency: {
                            type: ["string", "null"],
                            format: "currency",
                          },
                          currency_options: {
                            type: "object" as const,
                            additionalProperties: {
                              type: "object" as const,
                              properties: {
                                amount_off: {
                                  type: "integer",
                                },
                              },
                              required: ["amount_off"],
                            },
                          },
                          duration: {
                            type: "string",
                            enum: ["forever", "once", "repeating"],
                          },
                          duration_in_months: {
                            type: ["integer", "null"],
                          },
                          id: {
                            type: "string",
                          },
                          livemode: {
                            type: "boolean",
                          },
                          max_redemptions: {
                            type: ["integer", "null"],
                          },
                          metadata: {
                            type: ["object", "null"],
                            additionalProperties: {
                              type: "string",
                            },
                          },
                          name: {
                            type: ["string", "null"],
                          },
                          object: {
                            type: "string",
                            enum: ["coupon"],
                          },
                          percent_off: {
                            type: ["number", "null"],
                          },
                          redeem_by: {
                            type: ["integer", "null"],
                            format: "unix-time",
                          },
                          times_redeemed: {
                            type: "integer",
                          },
                          valid: {
                            type: "boolean",
                          },
                        },
                        required: [
                          "created",
                          "duration",
                          "id",
                          "livemode",
                          "object",
                          "times_redeemed",
                          "valid",
                        ],
                      },
                      customer: {
                        type: ["string", "null"],
                      },
                      end: {
                        type: ["integer", "null"],
                        format: "unix-time",
                      },
                      id: {
                        type: "string",
                      },
                      invoice: {
                        type: ["string", "null"],
                      },
                      invoice_item: {
                        type: ["string", "null"],
                      },
                      object: {
                        type: "string",
                        enum: ["discount"],
                      },
                      promotion_code: {
                        type: ["string", "null"],
                      },
                      start: {
                        type: "integer",
                        format: "unix-time",
                      },
                      subscription: {
                        type: ["string", "null"],
                      },
                      subscription_item: {
                        type: ["string", "null"],
                      },
                    },
                    required: ["coupon", "id", "object", "start"],
                  },
                },
                required: ["amount", "discount"],
              },
            },
            taxes: {
              type: "array",
              items: {
                type: "object" as const,
                properties: {
                  amount: {
                    type: "integer",
                  },
                  rate: {
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
                  taxability_reason: {
                    type: ["string", "null"],
                    enum: [
                      "customer_exempt",
                      "not_collecting",
                      "not_subject_to_tax",
                      "not_supported",
                      "portion_product_exempt",
                      "portion_reduced_rated",
                      "portion_standard_rated",
                      "product_exempt",
                      "product_exempt_holiday",
                      "proportionally_rated",
                      "reduced_rated",
                      "reverse_charge",
                      "standard_rated",
                      "taxable_basis_reduced",
                      "zero_rated",
                    ],
                  },
                  taxable_amount: {
                    type: ["integer", "null"],
                  },
                },
                required: ["amount", "rate"],
              },
            },
          },
          required: ["discounts", "taxes"],
        },
      },
      required: ["amount_discount", "amount_tax"],
    },
    ui_mode: {
      type: ["string", "null"],
      enum: ["custom", "embedded", "hosted"],
    },
    url: {
      type: ["string", "null"],
    },
    wallet_options: {
      type: ["object", "null"],
      properties: {
        link: {
          type: "object" as const,
          properties: {
            display: {
              type: "string",
              enum: ["auto", "never"],
            },
          },
        },
      },
    },
  },
  required: [
    "automatic_tax",
    "created",
    "custom_fields",
    "custom_text",
    "expires_at",
    "id",
    "livemode",
    "mode",
    "object",
    "payment_method_types",
    "payment_status",
    "shipping_options",
  ],
};
export const listCheckoutSessionsOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: checkoutSessionOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
export const lineItemOutputSchema = {
  type: "object" as const,
  properties: {
    amount_discount: {
      type: "integer",
    },
    amount_subtotal: {
      type: "integer",
    },
    amount_tax: {
      type: "integer",
    },
    amount_total: {
      type: "integer",
    },
    currency: {
      type: "string",
      format: "currency",
    },
    description: {
      type: ["string", "null"],
    },
    discounts: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          amount: {
            type: "integer",
          },
          discount: {
            type: "object" as const,
            properties: {
              checkout_session: {
                type: ["string", "null"],
              },
              coupon: {
                type: "object" as const,
                properties: {
                  amount_off: {
                    type: ["integer", "null"],
                  },
                  applies_to: {
                    type: "object" as const,
                    properties: {
                      products: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                    required: ["products"],
                  },
                  created: {
                    type: "integer",
                    format: "unix-time",
                  },
                  currency: {
                    type: ["string", "null"],
                    format: "currency",
                  },
                  currency_options: {
                    type: "object" as const,
                    additionalProperties: {
                      type: "object" as const,
                      properties: {
                        amount_off: {
                          type: "integer",
                        },
                      },
                      required: ["amount_off"],
                    },
                  },
                  duration: {
                    type: "string",
                    enum: ["forever", "once", "repeating"],
                  },
                  duration_in_months: {
                    type: ["integer", "null"],
                  },
                  id: {
                    type: "string",
                  },
                  livemode: {
                    type: "boolean",
                  },
                  max_redemptions: {
                    type: ["integer", "null"],
                  },
                  metadata: {
                    type: ["object", "null"],
                    additionalProperties: {
                      type: "string",
                    },
                  },
                  name: {
                    type: ["string", "null"],
                  },
                  object: {
                    type: "string",
                    enum: ["coupon"],
                  },
                  percent_off: {
                    type: ["number", "null"],
                  },
                  redeem_by: {
                    type: ["integer", "null"],
                    format: "unix-time",
                  },
                  times_redeemed: {
                    type: "integer",
                  },
                  valid: {
                    type: "boolean",
                  },
                },
                required: [
                  "created",
                  "duration",
                  "id",
                  "livemode",
                  "object",
                  "times_redeemed",
                  "valid",
                ],
              },
              customer: {
                type: ["string", "null"],
              },
              end: {
                type: ["integer", "null"],
                format: "unix-time",
              },
              id: {
                type: "string",
              },
              invoice: {
                type: ["string", "null"],
              },
              invoice_item: {
                type: ["string", "null"],
              },
              object: {
                type: "string",
                enum: ["discount"],
              },
              promotion_code: {
                type: ["string", "null"],
              },
              start: {
                type: "integer",
                format: "unix-time",
              },
              subscription: {
                type: ["string", "null"],
              },
              subscription_item: {
                type: ["string", "null"],
              },
            },
            required: ["coupon", "id", "object", "start"],
          },
        },
        required: ["amount", "discount"],
      },
    },
    id: {
      type: "string",
    },
    object: {
      type: "string",
      enum: ["item"],
    },
    price: {
      type: ["object", "null"],
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
      type: ["integer", "null"],
    },
    taxes: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          amount: {
            type: "integer",
          },
          rate: {
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
          taxability_reason: {
            type: ["string", "null"],
            enum: [
              "customer_exempt",
              "not_collecting",
              "not_subject_to_tax",
              "not_supported",
              "portion_product_exempt",
              "portion_reduced_rated",
              "portion_standard_rated",
              "product_exempt",
              "product_exempt_holiday",
              "proportionally_rated",
              "reduced_rated",
              "reverse_charge",
              "standard_rated",
              "taxable_basis_reduced",
              "zero_rated",
            ],
          },
          taxable_amount: {
            type: ["integer", "null"],
          },
        },
        required: ["amount", "rate"],
      },
    },
  },
  required: [
    "amount_discount",
    "amount_subtotal",
    "amount_tax",
    "amount_total",
    "currency",
    "id",
    "object",
  ],
};
export const listCheckoutSessionLineItemsOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: lineItemOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
