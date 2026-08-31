export const paymentMethodOutputSchema = {
  type: "object" as const,
  properties: {
    acss_debit: {
      type: "object" as const,
      properties: {
        bank_name: {
          type: ["string", "null"],
        },
        fingerprint: {
          type: ["string", "null"],
        },
        institution_number: {
          type: ["string", "null"],
        },
        last4: {
          type: ["string", "null"],
        },
        transit_number: {
          type: ["string", "null"],
        },
      },
    },
    affirm: {
      type: "object" as const,
    },
    afterpay_clearpay: {
      type: "object" as const,
    },
    alipay: {
      type: "object" as const,
    },
    allow_redisplay: {
      type: "string",
      enum: ["always", "limited", "unspecified"],
    },
    alma: {
      type: "object" as const,
    },
    amazon_pay: {
      type: "object" as const,
    },
    au_becs_debit: {
      type: "object" as const,
      properties: {
        bsb_number: {
          type: ["string", "null"],
        },
        fingerprint: {
          type: ["string", "null"],
        },
        last4: {
          type: ["string", "null"],
        },
      },
    },
    bacs_debit: {
      type: "object" as const,
      properties: {
        fingerprint: {
          type: ["string", "null"],
        },
        last4: {
          type: ["string", "null"],
        },
        sort_code: {
          type: ["string", "null"],
        },
      },
    },
    bancontact: {
      type: "object" as const,
    },
    billie: {
      type: "object" as const,
    },
    billing_details: {
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
        email: {
          type: ["string", "null"],
        },
        name: {
          type: ["string", "null"],
        },
        phone: {
          type: ["string", "null"],
        },
        tax_id: {
          type: ["string", "null"],
        },
      },
    },
    blik: {
      type: "object" as const,
    },
    boleto: {
      type: "object" as const,
      properties: {
        tax_id: {
          type: "string",
        },
      },
      required: ["tax_id"],
    },
    card: {
      type: "object" as const,
      properties: {
        brand: {
          type: "string",
        },
        checks: {
          type: ["object", "null"],
          properties: {
            address_line1_check: {
              type: ["string", "null"],
            },
            address_postal_code_check: {
              type: ["string", "null"],
            },
            cvc_check: {
              type: ["string", "null"],
            },
          },
        },
        country: {
          type: ["string", "null"],
        },
        display_brand: {
          type: ["string", "null"],
        },
        exp_month: {
          type: "integer",
        },
        exp_year: {
          type: "integer",
        },
        fingerprint: {
          type: ["string", "null"],
        },
        funding: {
          type: "string",
        },
        generated_from: {
          type: ["object", "null"],
          properties: {
            charge: {
              type: ["string", "null"],
            },
            payment_method_details: {
              type: ["object", "null"],
              properties: {
                card_present: {
                  type: "object" as const,
                  properties: {
                    amount_authorized: {
                      type: ["integer", "null"],
                    },
                    brand: {
                      type: ["string", "null"],
                    },
                    brand_product: {
                      type: ["string", "null"],
                    },
                    capture_before: {
                      type: "integer",
                      format: "unix-time",
                    },
                    cardholder_name: {
                      type: ["string", "null"],
                    },
                    country: {
                      type: ["string", "null"],
                    },
                    description: {
                      type: ["string", "null"],
                    },
                    emv_auth_data: {
                      type: ["string", "null"],
                    },
                    exp_month: {
                      type: "integer",
                    },
                    exp_year: {
                      type: "integer",
                    },
                    fingerprint: {
                      type: ["string", "null"],
                    },
                    funding: {
                      type: ["string", "null"],
                    },
                    generated_card: {
                      type: ["string", "null"],
                    },
                    incremental_authorization_supported: {
                      type: "boolean",
                    },
                    issuer: {
                      type: ["string", "null"],
                    },
                    last4: {
                      type: ["string", "null"],
                    },
                    network: {
                      type: ["string", "null"],
                    },
                    network_transaction_id: {
                      type: ["string", "null"],
                    },
                    offline: {
                      type: ["object", "null"],
                      properties: {
                        stored_at: {
                          type: ["integer", "null"],
                          format: "unix-time",
                        },
                        type: {
                          type: ["string", "null"],
                          enum: ["deferred"],
                        },
                      },
                    },
                    overcapture_supported: {
                      type: "boolean",
                    },
                    preferred_locales: {
                      type: ["array", "null"],
                      items: {
                        type: "string",
                      },
                    },
                    read_method: {
                      type: ["string", "null"],
                      enum: [
                        "contact_emv",
                        "contactless_emv",
                        "contactless_magstripe_mode",
                        "magnetic_stripe_fallback",
                        "magnetic_stripe_track2",
                      ],
                    },
                    receipt: {
                      type: ["object", "null"],
                      properties: {
                        account_type: {
                          type: "string",
                          enum: ["checking", "credit", "prepaid", "unknown"],
                        },
                        application_cryptogram: {
                          type: ["string", "null"],
                        },
                        application_preferred_name: {
                          type: ["string", "null"],
                        },
                        authorization_code: {
                          type: ["string", "null"],
                        },
                        authorization_response_code: {
                          type: ["string", "null"],
                        },
                        cardholder_verification_method: {
                          type: ["string", "null"],
                        },
                        dedicated_file_name: {
                          type: ["string", "null"],
                        },
                        terminal_verification_results: {
                          type: ["string", "null"],
                        },
                        transaction_status_information: {
                          type: ["string", "null"],
                        },
                      },
                    },
                    wallet: {
                      type: "object" as const,
                      properties: {
                        type: {
                          type: "string",
                          enum: [
                            "apple_pay",
                            "google_pay",
                            "samsung_pay",
                            "unknown",
                          ],
                        },
                      },
                      required: ["type"],
                    },
                  },
                  required: [
                    "exp_month",
                    "exp_year",
                    "incremental_authorization_supported",
                    "overcapture_supported",
                  ],
                },
                type: {
                  type: "string",
                },
              },
              required: ["type"],
            },
            setup_attempt: {
              type: ["string", "null"],
            },
          },
        },
        last4: {
          type: "string",
        },
        networks: {
          type: ["object", "null"],
          properties: {
            available: {
              type: "array",
              items: {
                type: "string",
              },
            },
            preferred: {
              type: ["string", "null"],
            },
          },
          required: ["available"],
        },
        regulated_status: {
          type: ["string", "null"],
          enum: ["regulated", "unregulated"],
        },
        three_d_secure_usage: {
          type: ["object", "null"],
          properties: {
            supported: {
              type: "boolean",
            },
          },
          required: ["supported"],
        },
        wallet: {
          type: ["object", "null"],
          properties: {
            amex_express_checkout: {
              type: "object" as const,
            },
            apple_pay: {
              type: "object" as const,
            },
            dynamic_last4: {
              type: ["string", "null"],
            },
            google_pay: {
              type: "object" as const,
            },
            link: {
              type: "object" as const,
            },
            masterpass: {
              type: "object" as const,
              properties: {
                billing_address: {
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
            samsung_pay: {
              type: "object" as const,
            },
            type: {
              type: "string",
              enum: [
                "amex_express_checkout",
                "apple_pay",
                "google_pay",
                "link",
                "masterpass",
                "samsung_pay",
                "visa_checkout",
              ],
            },
            visa_checkout: {
              type: "object" as const,
              properties: {
                billing_address: {
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
          },
          required: ["type"],
        },
      },
      required: ["brand", "exp_month", "exp_year", "funding", "last4"],
    },
    card_present: {
      type: "object" as const,
      properties: {
        brand: {
          type: ["string", "null"],
        },
        brand_product: {
          type: ["string", "null"],
        },
        cardholder_name: {
          type: ["string", "null"],
        },
        country: {
          type: ["string", "null"],
        },
        description: {
          type: ["string", "null"],
        },
        exp_month: {
          type: "integer",
        },
        exp_year: {
          type: "integer",
        },
        fingerprint: {
          type: ["string", "null"],
        },
        funding: {
          type: ["string", "null"],
        },
        issuer: {
          type: ["string", "null"],
        },
        last4: {
          type: ["string", "null"],
        },
        networks: {
          type: ["object", "null"],
          properties: {
            available: {
              type: "array",
              items: {
                type: "string",
              },
            },
            preferred: {
              type: ["string", "null"],
            },
          },
          required: ["available"],
        },
        offline: {
          type: ["object", "null"],
          properties: {
            stored_at: {
              type: ["integer", "null"],
              format: "unix-time",
            },
            type: {
              type: ["string", "null"],
              enum: ["deferred"],
            },
          },
        },
        preferred_locales: {
          type: ["array", "null"],
          items: {
            type: "string",
          },
        },
        read_method: {
          type: ["string", "null"],
          enum: [
            "contact_emv",
            "contactless_emv",
            "contactless_magstripe_mode",
            "magnetic_stripe_fallback",
            "magnetic_stripe_track2",
          ],
        },
        wallet: {
          type: "object" as const,
          properties: {
            type: {
              type: "string",
              enum: ["apple_pay", "google_pay", "samsung_pay", "unknown"],
            },
          },
          required: ["type"],
        },
      },
      required: ["exp_month", "exp_year"],
    },
    cashapp: {
      type: "object" as const,
      properties: {
        buyer_id: {
          type: ["string", "null"],
        },
        cashtag: {
          type: ["string", "null"],
        },
      },
    },
    created: {
      type: "integer",
      format: "unix-time",
    },
    customer: {
      type: ["string", "null"],
    },
    customer_balance: {
      type: "object" as const,
    },
    eps: {
      type: "object" as const,
      properties: {
        bank: {
          type: ["string", "null"],
          enum: [
            "arzte_und_apotheker_bank",
            "austrian_anadi_bank_ag",
            "bank_austria",
            "bankhaus_carl_spangler",
            "bankhaus_schelhammer_und_schattera_ag",
            "bawag_psk_ag",
            "bks_bank_ag",
            "brull_kallmus_bank_ag",
            "btv_vier_lander_bank",
            "capital_bank_grawe_gruppe_ag",
            "deutsche_bank_ag",
            "dolomitenbank",
            "easybank_ag",
            "erste_bank_und_sparkassen",
            "hypo_alpeadriabank_international_ag",
            "hypo_bank_burgenland_aktiengesellschaft",
            "hypo_noe_lb_fur_niederosterreich_u_wien",
            "hypo_oberosterreich_salzburg_steiermark",
            "hypo_tirol_bank_ag",
            "hypo_vorarlberg_bank_ag",
            "marchfelder_bank",
            "oberbank_ag",
            "raiffeisen_bankengruppe_osterreich",
            "schoellerbank_ag",
            "sparda_bank_wien",
            "volksbank_gruppe",
            "volkskreditbank_ag",
            "vr_bank_braunau",
          ],
        },
      },
    },
    fpx: {
      type: "object" as const,
      properties: {
        bank: {
          type: "string",
          enum: [
            "affin_bank",
            "agrobank",
            "alliance_bank",
            "ambank",
            "bank_islam",
            "bank_muamalat",
            "bank_of_china",
            "bank_rakyat",
            "bsn",
            "cimb",
            "deutsche_bank",
            "hong_leong_bank",
            "hsbc",
            "kfh",
            "maybank2e",
            "maybank2u",
            "ocbc",
            "pb_enterprise",
            "public_bank",
            "rhb",
            "standard_chartered",
            "uob",
          ],
        },
      },
      required: ["bank"],
    },
    giropay: {
      type: "object" as const,
    },
    grabpay: {
      type: "object" as const,
    },
    id: {
      type: "string",
    },
    ideal: {
      type: "object" as const,
      properties: {
        bank: {
          type: ["string", "null"],
          enum: [
            "abn_amro",
            "asn_bank",
            "bunq",
            "handelsbanken",
            "ing",
            "knab",
            "moneyou",
            "n26",
            "nn",
            "rabobank",
            "regiobank",
            "revolut",
            "sns_bank",
            "triodos_bank",
            "van_lanschot",
            "yoursafe",
          ],
        },
        bic: {
          type: ["string", "null"],
          enum: [
            "ABNANL2A",
            "ASNBNL21",
            "BITSNL2A",
            "BUNQNL2A",
            "FVLBNL22",
            "HANDNL2A",
            "INGBNL2A",
            "KNABNL2H",
            "MOYONL21",
            "NNBANL2G",
            "NTSBDEB1",
            "RABONL2U",
            "RBRBNL21",
            "REVOIE23",
            "REVOLT21",
            "SNSBNL2A",
            "TRIONL2U",
          ],
        },
      },
    },
    interac_present: {
      type: "object" as const,
      properties: {
        brand: {
          type: ["string", "null"],
        },
        cardholder_name: {
          type: ["string", "null"],
        },
        country: {
          type: ["string", "null"],
        },
        description: {
          type: ["string", "null"],
        },
        exp_month: {
          type: "integer",
        },
        exp_year: {
          type: "integer",
        },
        fingerprint: {
          type: ["string", "null"],
        },
        funding: {
          type: ["string", "null"],
        },
        issuer: {
          type: ["string", "null"],
        },
        last4: {
          type: ["string", "null"],
        },
        networks: {
          type: ["object", "null"],
          properties: {
            available: {
              type: "array",
              items: {
                type: "string",
              },
            },
            preferred: {
              type: ["string", "null"],
            },
          },
          required: ["available"],
        },
        preferred_locales: {
          type: ["array", "null"],
          items: {
            type: "string",
          },
        },
        read_method: {
          type: ["string", "null"],
          enum: [
            "contact_emv",
            "contactless_emv",
            "contactless_magstripe_mode",
            "magnetic_stripe_fallback",
            "magnetic_stripe_track2",
          ],
        },
      },
      required: ["exp_month", "exp_year"],
    },
    kakao_pay: {
      type: "object" as const,
    },
    klarna: {
      type: "object" as const,
      properties: {
        dob: {
          type: ["object", "null"],
          properties: {
            day: {
              type: ["integer", "null"],
            },
            month: {
              type: ["integer", "null"],
            },
            year: {
              type: ["integer", "null"],
            },
          },
        },
      },
    },
    konbini: {
      type: "object" as const,
    },
    kr_card: {
      type: "object" as const,
      properties: {
        brand: {
          type: ["string", "null"],
          enum: [
            "bc",
            "citi",
            "hana",
            "hyundai",
            "jeju",
            "jeonbuk",
            "kakaobank",
            "kbank",
            "kdbbank",
            "kookmin",
            "kwangju",
            "lotte",
            "mg",
            "nh",
            "post",
            "samsung",
            "savingsbank",
            "shinhan",
            "shinhyup",
            "suhyup",
            "tossbank",
            "woori",
          ],
        },
        last4: {
          type: ["string", "null"],
        },
      },
    },
    link: {
      type: "object" as const,
      properties: {
        email: {
          type: ["string", "null"],
        },
      },
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
    mobilepay: {
      type: "object" as const,
    },
    multibanco: {
      type: "object" as const,
    },
    naver_pay: {
      type: "object" as const,
      properties: {
        buyer_id: {
          type: ["string", "null"],
        },
        funding: {
          type: "string",
          enum: ["card", "points"],
        },
      },
      required: ["funding"],
    },
    nz_bank_account: {
      type: "object" as const,
      properties: {
        account_holder_name: {
          type: ["string", "null"],
        },
        bank_code: {
          type: "string",
        },
        bank_name: {
          type: "string",
        },
        branch_code: {
          type: "string",
        },
        last4: {
          type: "string",
        },
        suffix: {
          type: ["string", "null"],
        },
      },
      required: ["bank_code", "bank_name", "branch_code", "last4"],
    },
    object: {
      type: "string",
      enum: ["payment_method"],
    },
    oxxo: {
      type: "object" as const,
    },
    p24: {
      type: "object" as const,
      properties: {
        bank: {
          type: ["string", "null"],
          enum: [
            "alior_bank",
            "bank_millennium",
            "bank_nowy_bfg_sa",
            "bank_pekao_sa",
            "banki_spbdzielcze",
            "blik",
            "bnp_paribas",
            "boz",
            "citi_handlowy",
            "credit_agricole",
            "envelobank",
            "etransfer_pocztowy24",
            "getin_bank",
            "ideabank",
            "ing",
            "inteligo",
            "mbank_mtransfer",
            "nest_przelew",
            "noble_pay",
            "pbac_z_ipko",
            "plus_bank",
            "santander_przelew24",
            "tmobile_usbugi_bankowe",
            "toyota_bank",
            "velobank",
            "volkswagen_bank",
          ],
        },
      },
    },
    pay_by_bank: {
      type: "object" as const,
    },
    payco: {
      type: "object" as const,
    },
    paynow: {
      type: "object" as const,
    },
    paypal: {
      type: "object" as const,
      properties: {
        country: {
          type: ["string", "null"],
        },
        payer_email: {
          type: ["string", "null"],
        },
        payer_id: {
          type: ["string", "null"],
        },
      },
    },
    pix: {
      type: "object" as const,
    },
    promptpay: {
      type: "object" as const,
    },
    radar_options: {
      type: "object" as const,
      properties: {
        session: {
          type: "string",
        },
      },
    },
    revolut_pay: {
      type: "object" as const,
    },
    samsung_pay: {
      type: "object" as const,
    },
    satispay: {
      type: "object" as const,
    },
    sepa_debit: {
      type: "object" as const,
      properties: {
        bank_code: {
          type: ["string", "null"],
        },
        branch_code: {
          type: ["string", "null"],
        },
        country: {
          type: ["string", "null"],
        },
        fingerprint: {
          type: ["string", "null"],
        },
        generated_from: {
          type: ["object", "null"],
          properties: {
            charge: {
              type: ["string", "null"],
            },
            setup_attempt: {
              type: ["string", "null"],
            },
          },
        },
        last4: {
          type: ["string", "null"],
        },
      },
    },
    sofort: {
      type: "object" as const,
      properties: {
        country: {
          type: ["string", "null"],
        },
      },
    },
    swish: {
      type: "object" as const,
    },
    twint: {
      type: "object" as const,
    },
    type: {
      type: "string",
      enum: [
        "acss_debit",
        "affirm",
        "afterpay_clearpay",
        "alipay",
        "alma",
        "amazon_pay",
        "au_becs_debit",
        "bacs_debit",
        "bancontact",
        "billie",
        "blik",
        "boleto",
        "card",
        "card_present",
        "cashapp",
        "customer_balance",
        "eps",
        "fpx",
        "giropay",
        "grabpay",
        "ideal",
        "interac_present",
        "kakao_pay",
        "klarna",
        "konbini",
        "kr_card",
        "link",
        "mobilepay",
        "multibanco",
        "naver_pay",
        "nz_bank_account",
        "oxxo",
        "p24",
        "pay_by_bank",
        "payco",
        "paynow",
        "paypal",
        "pix",
        "promptpay",
        "revolut_pay",
        "samsung_pay",
        "satispay",
        "sepa_debit",
        "sofort",
        "swish",
        "twint",
        "us_bank_account",
        "wechat_pay",
        "zip",
      ],
    },
    us_bank_account: {
      type: "object" as const,
      properties: {
        account_holder_type: {
          type: ["string", "null"],
          enum: ["company", "individual"],
        },
        account_type: {
          type: ["string", "null"],
          enum: ["checking", "savings"],
        },
        bank_name: {
          type: ["string", "null"],
        },
        financial_connections_account: {
          type: ["string", "null"],
        },
        fingerprint: {
          type: ["string", "null"],
        },
        last4: {
          type: ["string", "null"],
        },
        networks: {
          type: ["object", "null"],
          properties: {
            preferred: {
              type: ["string", "null"],
            },
            supported: {
              type: "array",
              items: {
                type: "string",
                enum: ["ach", "us_domestic_wire"],
              },
            },
          },
          required: ["supported"],
        },
        routing_number: {
          type: ["string", "null"],
        },
        status_details: {
          type: ["object", "null"],
          properties: {
            blocked: {
              type: "object" as const,
              properties: {
                network_code: {
                  type: ["string", "null"],
                  enum: [
                    "R02",
                    "R03",
                    "R04",
                    "R05",
                    "R07",
                    "R08",
                    "R10",
                    "R11",
                    "R16",
                    "R20",
                    "R29",
                    "R31",
                  ],
                },
                reason: {
                  type: ["string", "null"],
                  enum: [
                    "bank_account_closed",
                    "bank_account_frozen",
                    "bank_account_invalid_details",
                    "bank_account_restricted",
                    "bank_account_unusable",
                    "debit_not_authorized",
                  ],
                },
              },
            },
          },
        },
      },
    },
    wechat_pay: {
      type: "object" as const,
    },
    zip: {
      type: "object" as const,
    },
  },
  required: ["billing_details", "created", "id", "livemode", "object", "type"],
};
export const listCardsOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: paymentMethodOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
