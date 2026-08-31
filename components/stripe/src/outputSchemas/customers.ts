export const customerOutputSchema = {
  type: "object" as const,
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
    balance: {
      type: "integer",
    },
    cash_balance: {
      type: ["object", "null"],
      properties: {
        available: {
          type: ["object", "null"],
          additionalProperties: {
            type: "integer",
          },
        },
        customer: {
          type: "string",
        },
        livemode: {
          type: "boolean",
        },
        object: {
          type: "string",
          enum: ["cash_balance"],
        },
        settings: {
          type: "object" as const,
          properties: {
            reconciliation_mode: {
              type: "string",
              enum: ["automatic", "manual"],
            },
            using_merchant_default: {
              type: "boolean",
            },
          },
          required: ["reconciliation_mode", "using_merchant_default"],
        },
      },
      required: ["customer", "livemode", "object", "settings"],
    },
    created: {
      type: "integer",
      format: "unix-time",
    },
    currency: {
      type: ["string", "null"],
    },
    default_source: {
      type: ["string", "null"],
    },
    delinquent: {
      type: ["boolean", "null"],
    },
    description: {
      type: ["string", "null"],
    },
    discount: {
      type: ["object", "null"],
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
    email: {
      type: ["string", "null"],
    },
    id: {
      type: "string",
    },
    invoice_credit_balance: {
      type: "object" as const,
      additionalProperties: {
        type: "integer",
      },
    },
    invoice_prefix: {
      type: ["string", "null"],
    },
    invoice_settings: {
      type: "object" as const,
      properties: {
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
        default_payment_method: {
          type: ["string", "null"],
        },
        footer: {
          type: ["string", "null"],
        },
        rendering_options: {
          type: ["object", "null"],
          properties: {
            amount_tax_display: {
              type: ["string", "null"],
            },
            template: {
              type: ["string", "null"],
            },
          },
        },
      },
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
    name: {
      type: ["string", "null"],
    },
    next_invoice_sequence: {
      type: "integer",
    },
    object: {
      type: "string",
      enum: ["customer"],
    },
    phone: {
      type: ["string", "null"],
    },
    preferred_locales: {
      type: ["array", "null"],
      items: {
        type: "string",
      },
    },
    shipping: {
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
        carrier: {
          type: ["string", "null"],
        },
        name: {
          type: "string",
        },
        phone: {
          type: ["string", "null"],
        },
        tracking_number: {
          type: ["string", "null"],
        },
      },
    },
    tax: {
      type: "object" as const,
      properties: {
        automatic_tax: {
          type: "string",
          enum: [
            "failed",
            "not_collecting",
            "supported",
            "unrecognized_location",
          ],
        },
        ip_address: {
          type: ["string", "null"],
        },
        location: {
          type: ["object", "null"],
          properties: {
            country: {
              type: "string",
            },
            source: {
              type: "string",
              enum: [
                "billing_address",
                "ip_address",
                "payment_method",
                "shipping_destination",
              ],
            },
            state: {
              type: ["string", "null"],
            },
          },
          required: ["country", "source"],
        },
      },
      required: ["automatic_tax"],
    },
    tax_exempt: {
      type: ["string", "null"],
      enum: ["exempt", "none", "reverse"],
    },
    tax_ids: {
      type: "object" as const,
      properties: {
        data: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              country: {
                type: ["string", "null"],
              },
              created: {
                type: "integer",
                format: "unix-time",
              },
              customer: {
                type: ["string", "null"],
              },
              id: {
                type: "string",
              },
              livemode: {
                type: "boolean",
              },
              object: {
                type: "string",
                enum: ["tax_id"],
              },
              owner: {
                type: ["object", "null"],
                properties: {
                  account: {
                    type: "string",
                  },
                  application: {
                    type: "string",
                  },
                  customer: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                    enum: ["account", "application", "customer", "self"],
                  },
                },
                required: ["type"],
              },
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
                type: "string",
              },
              verification: {
                type: ["object", "null"],
                properties: {
                  status: {
                    type: "string",
                    enum: ["pending", "unavailable", "unverified", "verified"],
                  },
                  verified_address: {
                    type: ["string", "null"],
                  },
                  verified_name: {
                    type: ["string", "null"],
                  },
                },
                required: ["status"],
              },
            },
            required: ["created", "id", "livemode", "object", "type", "value"],
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
    test_clock: {
      type: ["string", "null"],
    },
  },
  required: ["created", "id", "livemode", "object"],
};
export const getCustomerOutputSchema = {
  ...customerOutputSchema,
  properties: {
    ...customerOutputSchema.properties,
    deleted: { type: "boolean", enum: [true] },
  },
  required: ["id", "object"],
};
export const listCustomersOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: customerOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
export const deleteCustomerOutputSchema = {
  type: "object" as const,
  properties: {
    deleted: {
      type: "boolean",
      enum: [true],
    },
    id: {
      type: "string",
    },
    object: {
      type: "string",
      enum: ["customer"],
    },
  },
  required: ["deleted", "id", "object"],
};
