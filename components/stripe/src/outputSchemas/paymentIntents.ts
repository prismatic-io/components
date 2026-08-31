export const paymentIntentOutputSchema = {
  type: "object" as const,
  properties: {
    amount: {
      type: "integer",
    },
    amount_capturable: {
      type: "integer",
    },
    amount_details: {
      type: "object" as const,
      properties: {
        tip: {
          type: "object" as const,
          properties: {
            amount: {
              type: "integer",
            },
          },
        },
      },
    },
    amount_received: {
      type: "integer",
    },
    application: {
      type: ["string", "null"],
    },
    application_fee_amount: {
      type: ["integer", "null"],
    },
    automatic_payment_methods: {
      type: ["object", "null"],
      properties: {
        allow_redirects: {
          type: "string",
          enum: ["always", "never"],
        },
        enabled: {
          type: "boolean",
        },
      },
      required: ["enabled"],
    },
    canceled_at: {
      type: ["integer", "null"],
      format: "unix-time",
    },
    cancellation_reason: {
      type: ["string", "null"],
      enum: [
        "abandoned",
        "automatic",
        "duplicate",
        "expired",
        "failed_invoice",
        "fraudulent",
        "requested_by_customer",
        "void_invoice",
      ],
    },
    capture_method: {
      type: "string",
      enum: ["automatic", "automatic_async", "manual"],
    },
    client_secret: {
      type: ["string", "null"],
    },
    confirmation_method: {
      type: "string",
      enum: ["automatic", "manual"],
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
      type: ["string", "null"],
    },
    description: {
      type: ["string", "null"],
    },
    id: {
      type: "string",
    },
    last_payment_error: {
      type: ["object", "null"],
      properties: {
        advice_code: {
          type: "string",
        },
        charge: {
          type: "string",
        },
        code: {
          type: "string",
        },
        decline_code: {
          type: "string",
        },
        doc_url: {
          type: "string",
        },
        message: {
          type: "string",
        },
        network_advice_code: {
          type: "string",
        },
        network_decline_code: {
          type: "string",
        },
        param: {
          type: "string",
        },
        payment_intent: {
          type: "object" as const,
        },
        payment_method: {
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
                                  enum: [
                                    "checking",
                                    "credit",
                                    "prepaid",
                                    "unknown",
                                  ],
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
          required: [
            "billing_details",
            "created",
            "id",
            "livemode",
            "object",
            "type",
          ],
        },
        payment_method_type: {
          type: "string",
        },
        request_log_url: {
          type: "string",
        },
        setup_intent: {
          type: "object" as const,
          properties: {
            application: {
              type: ["string", "null"],
            },
            attach_to_self: {
              type: "boolean",
            },
            automatic_payment_methods: {
              type: ["object", "null"],
              properties: {
                allow_redirects: {
                  type: "string",
                  enum: ["always", "never"],
                },
                enabled: {
                  type: ["boolean", "null"],
                },
              },
            },
            cancellation_reason: {
              type: ["string", "null"],
              enum: ["abandoned", "duplicate", "requested_by_customer"],
            },
            client_secret: {
              type: ["string", "null"],
            },
            created: {
              type: "integer",
              format: "unix-time",
            },
            customer: {
              type: ["string", "null"],
            },
            description: {
              type: ["string", "null"],
            },
            flow_directions: {
              type: ["array", "null"],
              items: {
                type: "string",
                enum: ["inbound", "outbound"],
              },
            },
            id: {
              type: "string",
            },
            last_setup_error: {
              type: ["object", "null"],
            },
            latest_attempt: {
              type: ["string", "null"],
            },
            livemode: {
              type: "boolean",
            },
            mandate: {
              type: ["string", "null"],
            },
            metadata: {
              type: ["object", "null"],
              additionalProperties: {
                type: "string",
              },
            },
            next_action: {
              type: ["object", "null"],
              properties: {
                cashapp_handle_redirect_or_display_qr_code: {
                  type: "object" as const,
                  properties: {
                    hosted_instructions_url: {
                      type: "string",
                    },
                    mobile_auth_url: {
                      type: "string",
                    },
                    qr_code: {
                      type: "object" as const,
                      properties: {
                        expires_at: {
                          type: "integer",
                          format: "unix-time",
                        },
                        image_url_png: {
                          type: "string",
                        },
                        image_url_svg: {
                          type: "string",
                        },
                      },
                      required: [
                        "expires_at",
                        "image_url_png",
                        "image_url_svg",
                      ],
                    },
                  },
                  required: [
                    "hosted_instructions_url",
                    "mobile_auth_url",
                    "qr_code",
                  ],
                },
                redirect_to_url: {
                  type: "object" as const,
                  properties: {
                    return_url: {
                      type: ["string", "null"],
                    },
                    url: {
                      type: ["string", "null"],
                    },
                  },
                },
                type: {
                  type: "string",
                },
                use_stripe_sdk: {
                  type: "object" as const,
                },
                verify_with_microdeposits: {
                  type: "object" as const,
                  properties: {
                    arrival_date: {
                      type: "integer",
                      format: "unix-time",
                    },
                    hosted_verification_url: {
                      type: "string",
                    },
                    microdeposit_type: {
                      type: ["string", "null"],
                      enum: ["amounts", "descriptor_code"],
                    },
                  },
                  required: ["arrival_date", "hosted_verification_url"],
                },
              },
              required: ["type"],
            },
            object: {
              type: "string",
              enum: ["setup_intent"],
            },
            on_behalf_of: {
              type: ["string", "null"],
            },
            payment_method: {
              type: ["string", "null"],
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
                      type: ["string", "null"],
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
                    verification_method: {
                      type: "string",
                      enum: ["automatic", "instant", "microdeposits"],
                    },
                  },
                },
                amazon_pay: {
                  type: "object" as const,
                  properties: {
                    verification_method: {
                      type: "string",
                      enum: ["automatic", "instant", "microdeposits"],
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
                    verification_method: {
                      type: "string",
                      enum: ["automatic", "instant", "microdeposits"],
                    },
                  },
                },
                card: {
                  type: "object" as const,
                  properties: {
                    mandate_options: {
                      type: ["object", "null"],
                      properties: {
                        amount: {
                          type: "integer",
                        },
                        amount_type: {
                          type: "string",
                          enum: ["fixed", "maximum"],
                        },
                        currency: {
                          type: "string",
                          format: "currency",
                        },
                        description: {
                          type: ["string", "null"],
                        },
                        end_date: {
                          type: ["integer", "null"],
                          format: "unix-time",
                        },
                        interval: {
                          type: "string",
                          enum: ["day", "month", "sporadic", "week", "year"],
                        },
                        interval_count: {
                          type: ["integer", "null"],
                        },
                        reference: {
                          type: "string",
                        },
                        start_date: {
                          type: "integer",
                          format: "unix-time",
                        },
                        supported_types: {
                          type: ["array", "null"],
                          items: {
                            type: "string",
                            enum: ["india"],
                          },
                        },
                      },
                      required: [
                        "amount",
                        "amount_type",
                        "currency",
                        "interval",
                        "reference",
                        "start_date",
                      ],
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
                    verification_method: {
                      type: "string",
                      enum: ["automatic", "instant", "microdeposits"],
                    },
                  },
                },
                card_present: {
                  type: "object" as const,
                  properties: {
                    verification_method: {
                      type: "string",
                      enum: ["automatic", "instant", "microdeposits"],
                    },
                  },
                },
                link: {
                  type: "object" as const,
                  properties: {
                    verification_method: {
                      type: "string",
                      enum: ["automatic", "instant", "microdeposits"],
                    },
                  },
                },
                paypal: {
                  type: "object" as const,
                  properties: {
                    billing_agreement_id: {
                      type: ["string", "null"],
                    },
                    verification_method: {
                      type: "string",
                      enum: ["automatic", "instant", "microdeposits"],
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
                    verification_method: {
                      type: "string",
                      enum: ["automatic", "instant", "microdeposits"],
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
                    mandate_options: {
                      type: "object" as const,
                      properties: {
                        collection_method: {
                          type: "string",
                          enum: ["paper"],
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
              type: "array",
              items: {
                type: "string",
              },
            },
            single_use_mandate: {
              type: ["string", "null"],
            },
            status: {
              type: "string",
              enum: [
                "canceled",
                "processing",
                "requires_action",
                "requires_confirmation",
                "requires_payment_method",
                "succeeded",
              ],
            },
            usage: {
              type: "string",
            },
          },
          required: [
            "created",
            "id",
            "livemode",
            "object",
            "payment_method_types",
            "status",
            "usage",
          ],
        },
        source: {
          type: "object" as const,
          properties: {
            account: {
              type: ["string", "null"],
            },
            account_holder_name: {
              type: ["string", "null"],
            },
            account_holder_type: {
              type: ["string", "null"],
            },
            account_type: {
              type: ["string", "null"],
            },
            available_payout_methods: {
              type: ["array", "null"],
              items: {
                type: "string",
                enum: ["instant", "standard"],
              },
            },
            bank_name: {
              type: ["string", "null"],
            },
            country: {
              type: "string",
            },
            currency: {
              type: "string",
              format: "currency",
            },
            customer: {
              type: ["string", "null"],
            },
            default_for_currency: {
              type: ["boolean", "null"],
            },
            fingerprint: {
              type: ["string", "null"],
            },
            future_requirements: {
              type: ["object", "null"],
              properties: {
                currently_due: {
                  type: ["array", "null"],
                  items: {
                    type: "string",
                  },
                },
                errors: {
                  type: ["array", "null"],
                  items: {
                    type: "object" as const,
                    properties: {
                      code: {
                        type: "string",
                        enum: [
                          "information_missing",
                          "invalid_address_city_state_postal_code",
                          "invalid_address_highway_contract_box",
                          "invalid_address_private_mailbox",
                          "invalid_business_profile_name",
                          "invalid_business_profile_name_denylisted",
                          "invalid_company_name_denylisted",
                          "invalid_dob_age_over_maximum",
                          "invalid_dob_age_under_18",
                          "invalid_dob_age_under_minimum",
                          "invalid_product_description_length",
                          "invalid_product_description_url_match",
                          "invalid_representative_country",
                          "invalid_signator",
                          "invalid_statement_descriptor_business_mismatch",
                          "invalid_statement_descriptor_denylisted",
                          "invalid_statement_descriptor_length",
                          "invalid_statement_descriptor_prefix_denylisted",
                          "invalid_statement_descriptor_prefix_mismatch",
                          "invalid_street_address",
                          "invalid_tax_id",
                          "invalid_tax_id_format",
                          "invalid_tos_acceptance",
                          "invalid_url_denylisted",
                          "invalid_url_format",
                          "invalid_url_web_presence_detected",
                          "invalid_url_website_business_information_mismatch",
                          "invalid_url_website_empty",
                          "invalid_url_website_inaccessible",
                          "invalid_url_website_inaccessible_geoblocked",
                          "invalid_url_website_inaccessible_password_protected",
                          "invalid_url_website_incomplete",
                          "invalid_url_website_incomplete_cancellation_policy",
                          "invalid_url_website_incomplete_customer_service_details",
                          "invalid_url_website_incomplete_legal_restrictions",
                          "invalid_url_website_incomplete_refund_policy",
                          "invalid_url_website_incomplete_return_policy",
                          "invalid_url_website_incomplete_terms_and_conditions",
                          "invalid_url_website_incomplete_under_construction",
                          "invalid_url_website_other",
                          "invalid_value_other",
                          "verification_directors_mismatch",
                          "verification_document_address_mismatch",
                          "verification_document_address_missing",
                          "verification_document_corrupt",
                          "verification_document_country_not_supported",
                          "verification_document_directors_mismatch",
                          "verification_document_dob_mismatch",
                          "verification_document_duplicate_type",
                          "verification_document_expired",
                          "verification_document_failed_copy",
                          "verification_document_failed_greyscale",
                          "verification_document_failed_other",
                          "verification_document_failed_test_mode",
                          "verification_document_fraudulent",
                          "verification_document_id_number_mismatch",
                          "verification_document_id_number_missing",
                          "verification_document_incomplete",
                          "verification_document_invalid",
                          "verification_document_issue_or_expiry_date_missing",
                          "verification_document_manipulated",
                          "verification_document_missing_back",
                          "verification_document_missing_front",
                          "verification_document_name_mismatch",
                          "verification_document_name_missing",
                          "verification_document_nationality_mismatch",
                          "verification_document_not_readable",
                          "verification_document_not_signed",
                          "verification_document_not_uploaded",
                          "verification_document_photo_mismatch",
                          "verification_document_too_large",
                          "verification_document_type_not_supported",
                          "verification_extraneous_directors",
                          "verification_failed_address_match",
                          "verification_failed_authorizer_authority",
                          "verification_failed_business_iec_number",
                          "verification_failed_document_match",
                          "verification_failed_id_number_match",
                          "verification_failed_keyed_identity",
                          "verification_failed_keyed_match",
                          "verification_failed_name_match",
                          "verification_failed_other",
                          "verification_failed_representative_authority",
                          "verification_failed_residential_address",
                          "verification_failed_tax_id_match",
                          "verification_failed_tax_id_not_issued",
                          "verification_legal_entity_structure_mismatch",
                          "verification_missing_directors",
                          "verification_missing_executives",
                          "verification_missing_owners",
                          "verification_rejected_ownership_exemption_reason",
                          "verification_requires_additional_memorandum_of_associations",
                          "verification_requires_additional_proof_of_registration",
                          "verification_supportability",
                        ],
                      },
                      reason: {
                        type: "string",
                      },
                      requirement: {
                        type: "string",
                      },
                    },
                    required: ["code", "reason", "requirement"],
                  },
                },
                past_due: {
                  type: ["array", "null"],
                  items: {
                    type: "string",
                  },
                },
                pending_verification: {
                  type: ["array", "null"],
                  items: {
                    type: "string",
                  },
                },
              },
            },
            id: {
              type: "string",
            },
            last4: {
              type: "string",
            },
            metadata: {
              type: ["object", "null"],
              additionalProperties: {
                type: "string",
              },
            },
            object: {
              type: "string",
              enum: ["bank_account", "card", "source"],
            },
            requirements: {
              type: ["object", "null"],
              properties: {
                currently_due: {
                  type: ["array", "null"],
                  items: {
                    type: "string",
                  },
                },
                errors: {
                  type: ["array", "null"],
                  items: {
                    type: "object" as const,
                    properties: {
                      code: {
                        type: "string",
                        enum: [
                          "information_missing",
                          "invalid_address_city_state_postal_code",
                          "invalid_address_highway_contract_box",
                          "invalid_address_private_mailbox",
                          "invalid_business_profile_name",
                          "invalid_business_profile_name_denylisted",
                          "invalid_company_name_denylisted",
                          "invalid_dob_age_over_maximum",
                          "invalid_dob_age_under_18",
                          "invalid_dob_age_under_minimum",
                          "invalid_product_description_length",
                          "invalid_product_description_url_match",
                          "invalid_representative_country",
                          "invalid_signator",
                          "invalid_statement_descriptor_business_mismatch",
                          "invalid_statement_descriptor_denylisted",
                          "invalid_statement_descriptor_length",
                          "invalid_statement_descriptor_prefix_denylisted",
                          "invalid_statement_descriptor_prefix_mismatch",
                          "invalid_street_address",
                          "invalid_tax_id",
                          "invalid_tax_id_format",
                          "invalid_tos_acceptance",
                          "invalid_url_denylisted",
                          "invalid_url_format",
                          "invalid_url_web_presence_detected",
                          "invalid_url_website_business_information_mismatch",
                          "invalid_url_website_empty",
                          "invalid_url_website_inaccessible",
                          "invalid_url_website_inaccessible_geoblocked",
                          "invalid_url_website_inaccessible_password_protected",
                          "invalid_url_website_incomplete",
                          "invalid_url_website_incomplete_cancellation_policy",
                          "invalid_url_website_incomplete_customer_service_details",
                          "invalid_url_website_incomplete_legal_restrictions",
                          "invalid_url_website_incomplete_refund_policy",
                          "invalid_url_website_incomplete_return_policy",
                          "invalid_url_website_incomplete_terms_and_conditions",
                          "invalid_url_website_incomplete_under_construction",
                          "invalid_url_website_other",
                          "invalid_value_other",
                          "verification_directors_mismatch",
                          "verification_document_address_mismatch",
                          "verification_document_address_missing",
                          "verification_document_corrupt",
                          "verification_document_country_not_supported",
                          "verification_document_directors_mismatch",
                          "verification_document_dob_mismatch",
                          "verification_document_duplicate_type",
                          "verification_document_expired",
                          "verification_document_failed_copy",
                          "verification_document_failed_greyscale",
                          "verification_document_failed_other",
                          "verification_document_failed_test_mode",
                          "verification_document_fraudulent",
                          "verification_document_id_number_mismatch",
                          "verification_document_id_number_missing",
                          "verification_document_incomplete",
                          "verification_document_invalid",
                          "verification_document_issue_or_expiry_date_missing",
                          "verification_document_manipulated",
                          "verification_document_missing_back",
                          "verification_document_missing_front",
                          "verification_document_name_mismatch",
                          "verification_document_name_missing",
                          "verification_document_nationality_mismatch",
                          "verification_document_not_readable",
                          "verification_document_not_signed",
                          "verification_document_not_uploaded",
                          "verification_document_photo_mismatch",
                          "verification_document_too_large",
                          "verification_document_type_not_supported",
                          "verification_extraneous_directors",
                          "verification_failed_address_match",
                          "verification_failed_authorizer_authority",
                          "verification_failed_business_iec_number",
                          "verification_failed_document_match",
                          "verification_failed_id_number_match",
                          "verification_failed_keyed_identity",
                          "verification_failed_keyed_match",
                          "verification_failed_name_match",
                          "verification_failed_other",
                          "verification_failed_representative_authority",
                          "verification_failed_residential_address",
                          "verification_failed_tax_id_match",
                          "verification_failed_tax_id_not_issued",
                          "verification_legal_entity_structure_mismatch",
                          "verification_missing_directors",
                          "verification_missing_executives",
                          "verification_missing_owners",
                          "verification_rejected_ownership_exemption_reason",
                          "verification_requires_additional_memorandum_of_associations",
                          "verification_requires_additional_proof_of_registration",
                          "verification_supportability",
                        ],
                      },
                      reason: {
                        type: "string",
                      },
                      requirement: {
                        type: "string",
                      },
                    },
                    required: ["code", "reason", "requirement"],
                  },
                },
                past_due: {
                  type: ["array", "null"],
                  items: {
                    type: "string",
                  },
                },
                pending_verification: {
                  type: ["array", "null"],
                  items: {
                    type: "string",
                  },
                },
              },
            },
            routing_number: {
              type: ["string", "null"],
            },
            status: {
              type: "string",
            },
            address_city: {
              type: ["string", "null"],
            },
            address_country: {
              type: ["string", "null"],
            },
            address_line1: {
              type: ["string", "null"],
            },
            address_line1_check: {
              type: ["string", "null"],
            },
            address_line2: {
              type: ["string", "null"],
            },
            address_state: {
              type: ["string", "null"],
            },
            address_zip: {
              type: ["string", "null"],
            },
            address_zip_check: {
              type: ["string", "null"],
            },
            allow_redisplay: {
              type: ["string", "null"],
              enum: ["always", "limited", "unspecified"],
            },
            brand: {
              type: "string",
            },
            cvc_check: {
              type: ["string", "null"],
            },
            dynamic_last4: {
              type: ["string", "null"],
            },
            exp_month: {
              type: "integer",
            },
            exp_year: {
              type: "integer",
            },
            funding: {
              type: "string",
            },
            iin: {
              type: "string",
            },
            name: {
              type: ["string", "null"],
            },
            networks: {
              type: "object" as const,
              properties: {
                preferred: {
                  type: ["string", "null"],
                },
              },
            },
            regulated_status: {
              type: ["string", "null"],
              enum: ["regulated", "unregulated"],
            },
            tokenization_method: {
              type: ["string", "null"],
            },
            ach_credit_transfer: {
              type: "object" as const,
              properties: {
                account_number: {
                  type: ["string", "null"],
                },
                bank_name: {
                  type: ["string", "null"],
                },
                fingerprint: {
                  type: ["string", "null"],
                },
                refund_account_holder_name: {
                  type: ["string", "null"],
                },
                refund_account_holder_type: {
                  type: ["string", "null"],
                },
                refund_routing_number: {
                  type: ["string", "null"],
                },
                routing_number: {
                  type: ["string", "null"],
                },
                swift_code: {
                  type: ["string", "null"],
                },
              },
            },
            ach_debit: {
              type: "object" as const,
              properties: {
                bank_name: {
                  type: ["string", "null"],
                },
                country: {
                  type: ["string", "null"],
                },
                fingerprint: {
                  type: ["string", "null"],
                },
                last4: {
                  type: ["string", "null"],
                },
                routing_number: {
                  type: ["string", "null"],
                },
                type: {
                  type: ["string", "null"],
                },
              },
            },
            acss_debit: {
              type: "object" as const,
              properties: {
                bank_address_city: {
                  type: ["string", "null"],
                },
                bank_address_line_1: {
                  type: ["string", "null"],
                },
                bank_address_line_2: {
                  type: ["string", "null"],
                },
                bank_address_postal_code: {
                  type: ["string", "null"],
                },
                bank_name: {
                  type: ["string", "null"],
                },
                category: {
                  type: ["string", "null"],
                },
                country: {
                  type: ["string", "null"],
                },
                fingerprint: {
                  type: ["string", "null"],
                },
                last4: {
                  type: ["string", "null"],
                },
                routing_number: {
                  type: ["string", "null"],
                },
              },
            },
            alipay: {
              type: "object" as const,
              properties: {
                data_string: {
                  type: ["string", "null"],
                },
                native_url: {
                  type: ["string", "null"],
                },
                statement_descriptor: {
                  type: ["string", "null"],
                },
              },
            },
            amount: {
              type: ["integer", "null"],
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
            bancontact: {
              type: "object" as const,
              properties: {
                bank_code: {
                  type: ["string", "null"],
                },
                bank_name: {
                  type: ["string", "null"],
                },
                bic: {
                  type: ["string", "null"],
                },
                iban_last4: {
                  type: ["string", "null"],
                },
                preferred_language: {
                  type: ["string", "null"],
                },
                statement_descriptor: {
                  type: ["string", "null"],
                },
              },
            },
            card: {
              type: "object" as const,
              properties: {
                address_line1_check: {
                  type: ["string", "null"],
                },
                address_zip_check: {
                  type: ["string", "null"],
                },
                brand: {
                  type: ["string", "null"],
                },
                country: {
                  type: ["string", "null"],
                },
                cvc_check: {
                  type: ["string", "null"],
                },
                dynamic_last4: {
                  type: ["string", "null"],
                },
                exp_month: {
                  type: ["integer", "null"],
                },
                exp_year: {
                  type: ["integer", "null"],
                },
                fingerprint: {
                  type: "string",
                },
                funding: {
                  type: ["string", "null"],
                },
                last4: {
                  type: ["string", "null"],
                },
                name: {
                  type: ["string", "null"],
                },
                three_d_secure: {
                  type: "string",
                },
                tokenization_method: {
                  type: ["string", "null"],
                },
              },
            },
            card_present: {
              type: "object" as const,
              properties: {
                application_cryptogram: {
                  type: "string",
                },
                application_preferred_name: {
                  type: "string",
                },
                authorization_code: {
                  type: ["string", "null"],
                },
                authorization_response_code: {
                  type: "string",
                },
                brand: {
                  type: ["string", "null"],
                },
                country: {
                  type: ["string", "null"],
                },
                cvm_type: {
                  type: "string",
                },
                data_type: {
                  type: ["string", "null"],
                },
                dedicated_file_name: {
                  type: "string",
                },
                emv_auth_data: {
                  type: "string",
                },
                evidence_customer_signature: {
                  type: ["string", "null"],
                },
                evidence_transaction_certificate: {
                  type: ["string", "null"],
                },
                exp_month: {
                  type: ["integer", "null"],
                },
                exp_year: {
                  type: ["integer", "null"],
                },
                fingerprint: {
                  type: "string",
                },
                funding: {
                  type: ["string", "null"],
                },
                last4: {
                  type: ["string", "null"],
                },
                pos_device_id: {
                  type: ["string", "null"],
                },
                pos_entry_mode: {
                  type: "string",
                },
                read_method: {
                  type: ["string", "null"],
                },
                reader: {
                  type: ["string", "null"],
                },
                terminal_verification_results: {
                  type: "string",
                },
                transaction_status_information: {
                  type: "string",
                },
              },
            },
            client_secret: {
              type: "string",
            },
            code_verification: {
              type: "object" as const,
              properties: {
                attempts_remaining: {
                  type: "integer",
                },
                status: {
                  type: "string",
                },
              },
              required: ["attempts_remaining", "status"],
            },
            created: {
              type: "integer",
              format: "unix-time",
            },
            eps: {
              type: "object" as const,
              properties: {
                reference: {
                  type: ["string", "null"],
                },
                statement_descriptor: {
                  type: ["string", "null"],
                },
              },
            },
            flow: {
              type: "string",
            },
            giropay: {
              type: "object" as const,
              properties: {
                bank_code: {
                  type: ["string", "null"],
                },
                bank_name: {
                  type: ["string", "null"],
                },
                bic: {
                  type: ["string", "null"],
                },
                statement_descriptor: {
                  type: ["string", "null"],
                },
              },
            },
            ideal: {
              type: "object" as const,
              properties: {
                bank: {
                  type: ["string", "null"],
                },
                bic: {
                  type: ["string", "null"],
                },
                iban_last4: {
                  type: ["string", "null"],
                },
                statement_descriptor: {
                  type: ["string", "null"],
                },
              },
            },
            klarna: {
              type: "object" as const,
              properties: {
                background_image_url: {
                  type: "string",
                },
                client_token: {
                  type: ["string", "null"],
                },
                first_name: {
                  type: "string",
                },
                last_name: {
                  type: "string",
                },
                locale: {
                  type: "string",
                },
                logo_url: {
                  type: "string",
                },
                page_title: {
                  type: "string",
                },
                pay_later_asset_urls_descriptive: {
                  type: "string",
                },
                pay_later_asset_urls_standard: {
                  type: "string",
                },
                pay_later_name: {
                  type: "string",
                },
                pay_later_redirect_url: {
                  type: "string",
                },
                pay_now_asset_urls_descriptive: {
                  type: "string",
                },
                pay_now_asset_urls_standard: {
                  type: "string",
                },
                pay_now_name: {
                  type: "string",
                },
                pay_now_redirect_url: {
                  type: "string",
                },
                pay_over_time_asset_urls_descriptive: {
                  type: "string",
                },
                pay_over_time_asset_urls_standard: {
                  type: "string",
                },
                pay_over_time_name: {
                  type: "string",
                },
                pay_over_time_redirect_url: {
                  type: "string",
                },
                payment_method_categories: {
                  type: "string",
                },
                purchase_country: {
                  type: "string",
                },
                purchase_type: {
                  type: "string",
                },
                redirect_url: {
                  type: "string",
                },
                shipping_delay: {
                  type: "integer",
                },
                shipping_first_name: {
                  type: "string",
                },
                shipping_last_name: {
                  type: "string",
                },
              },
            },
            livemode: {
              type: "boolean",
            },
            multibanco: {
              type: "object" as const,
              properties: {
                entity: {
                  type: ["string", "null"],
                },
                reference: {
                  type: ["string", "null"],
                },
                refund_account_holder_address_city: {
                  type: ["string", "null"],
                },
                refund_account_holder_address_country: {
                  type: ["string", "null"],
                },
                refund_account_holder_address_line1: {
                  type: ["string", "null"],
                },
                refund_account_holder_address_line2: {
                  type: ["string", "null"],
                },
                refund_account_holder_address_postal_code: {
                  type: ["string", "null"],
                },
                refund_account_holder_address_state: {
                  type: ["string", "null"],
                },
                refund_account_holder_name: {
                  type: ["string", "null"],
                },
                refund_iban: {
                  type: ["string", "null"],
                },
              },
            },
            owner: {
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
                verified_address: {
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
                verified_email: {
                  type: ["string", "null"],
                },
                verified_name: {
                  type: ["string", "null"],
                },
                verified_phone: {
                  type: ["string", "null"],
                },
              },
            },
            p24: {
              type: "object" as const,
              properties: {
                reference: {
                  type: ["string", "null"],
                },
              },
            },
            receiver: {
              type: "object" as const,
              properties: {
                address: {
                  type: ["string", "null"],
                },
                amount_charged: {
                  type: "integer",
                },
                amount_received: {
                  type: "integer",
                },
                amount_returned: {
                  type: "integer",
                },
                refund_attributes_method: {
                  type: "string",
                },
                refund_attributes_status: {
                  type: "string",
                },
              },
              required: [
                "amount_charged",
                "amount_received",
                "amount_returned",
                "refund_attributes_method",
                "refund_attributes_status",
              ],
            },
            redirect: {
              type: "object" as const,
              properties: {
                failure_reason: {
                  type: ["string", "null"],
                },
                return_url: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                url: {
                  type: "string",
                },
              },
              required: ["return_url", "status", "url"],
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
                last4: {
                  type: ["string", "null"],
                },
                mandate_reference: {
                  type: ["string", "null"],
                },
                mandate_url: {
                  type: ["string", "null"],
                },
              },
            },
            sofort: {
              type: "object" as const,
              properties: {
                bank_code: {
                  type: ["string", "null"],
                },
                bank_name: {
                  type: ["string", "null"],
                },
                bic: {
                  type: ["string", "null"],
                },
                country: {
                  type: ["string", "null"],
                },
                iban_last4: {
                  type: ["string", "null"],
                },
                preferred_language: {
                  type: ["string", "null"],
                },
                statement_descriptor: {
                  type: ["string", "null"],
                },
              },
            },
            source_order: {
              type: "object" as const,
              properties: {
                amount: {
                  type: "integer",
                },
                currency: {
                  type: "string",
                  format: "currency",
                },
                email: {
                  type: "string",
                },
                items: {
                  type: ["array", "null"],
                  items: {
                    type: "object" as const,
                    properties: {
                      amount: {
                        type: ["integer", "null"],
                      },
                      currency: {
                        type: ["string", "null"],
                      },
                      description: {
                        type: ["string", "null"],
                      },
                      parent: {
                        type: ["string", "null"],
                      },
                      quantity: {
                        type: "integer",
                      },
                      type: {
                        type: ["string", "null"],
                      },
                    },
                  },
                },
                shipping: {
                  type: "object" as const,
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
              },
              required: ["amount", "currency"],
            },
            statement_descriptor: {
              type: ["string", "null"],
            },
            three_d_secure: {
              type: "object" as const,
              properties: {
                address_line1_check: {
                  type: ["string", "null"],
                },
                address_zip_check: {
                  type: ["string", "null"],
                },
                authenticated: {
                  type: ["boolean", "null"],
                },
                brand: {
                  type: ["string", "null"],
                },
                card: {
                  type: ["string", "null"],
                },
                country: {
                  type: ["string", "null"],
                },
                customer: {
                  type: ["string", "null"],
                },
                cvc_check: {
                  type: ["string", "null"],
                },
                dynamic_last4: {
                  type: ["string", "null"],
                },
                exp_month: {
                  type: ["integer", "null"],
                },
                exp_year: {
                  type: ["integer", "null"],
                },
                fingerprint: {
                  type: "string",
                },
                funding: {
                  type: ["string", "null"],
                },
                last4: {
                  type: ["string", "null"],
                },
                name: {
                  type: ["string", "null"],
                },
                three_d_secure: {
                  type: "string",
                },
                tokenization_method: {
                  type: ["string", "null"],
                },
              },
            },
            type: {
              type: "string",
              enum: [
                "ach_credit_transfer",
                "ach_debit",
                "acss_debit",
                "alipay",
                "au_becs_debit",
                "bancontact",
                "card",
                "card_present",
                "eps",
                "giropay",
                "ideal",
                "klarna",
                "multibanco",
                "p24",
                "sepa_debit",
                "sofort",
                "three_d_secure",
                "wechat",
              ],
            },
            usage: {
              type: ["string", "null"],
            },
            wechat: {
              type: "object" as const,
              properties: {
                prepay_id: {
                  type: "string",
                },
                qr_code_url: {
                  type: ["string", "null"],
                },
                statement_descriptor: {
                  type: "string",
                },
              },
            },
          },
          required: ["id", "object"],
        },
        type: {
          type: "string",
          enum: [
            "api_error",
            "card_error",
            "idempotency_error",
            "invalid_request_error",
          ],
        },
      },
      required: ["type"],
    },
    latest_charge: {
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
    next_action: {
      type: ["object", "null"],
      properties: {
        alipay_handle_redirect: {
          type: "object" as const,
          properties: {
            native_data: {
              type: ["string", "null"],
            },
            native_url: {
              type: ["string", "null"],
            },
            return_url: {
              type: ["string", "null"],
            },
            url: {
              type: ["string", "null"],
            },
          },
        },
        boleto_display_details: {
          type: "object" as const,
          properties: {
            expires_at: {
              type: ["integer", "null"],
              format: "unix-time",
            },
            hosted_voucher_url: {
              type: ["string", "null"],
            },
            number: {
              type: ["string", "null"],
            },
            pdf: {
              type: ["string", "null"],
            },
          },
        },
        card_await_notification: {
          type: "object" as const,
          properties: {
            charge_attempt_at: {
              type: ["integer", "null"],
              format: "unix-time",
            },
            customer_approval_required: {
              type: ["boolean", "null"],
            },
          },
        },
        cashapp_handle_redirect_or_display_qr_code: {
          type: "object" as const,
          properties: {
            hosted_instructions_url: {
              type: "string",
            },
            mobile_auth_url: {
              type: "string",
            },
            qr_code: {
              type: "object" as const,
              properties: {
                expires_at: {
                  type: "integer",
                  format: "unix-time",
                },
                image_url_png: {
                  type: "string",
                },
                image_url_svg: {
                  type: "string",
                },
              },
              required: ["expires_at", "image_url_png", "image_url_svg"],
            },
          },
          required: ["hosted_instructions_url", "mobile_auth_url", "qr_code"],
        },
        display_bank_transfer_instructions: {
          type: "object" as const,
          properties: {
            amount_remaining: {
              type: ["integer", "null"],
            },
            currency: {
              type: ["string", "null"],
              format: "currency",
            },
            financial_addresses: {
              type: "array",
              items: {
                type: "object" as const,
                properties: {
                  aba: {
                    type: "object" as const,
                    properties: {
                      account_holder_address: {
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
                      account_holder_name: {
                        type: "string",
                      },
                      account_number: {
                        type: "string",
                      },
                      account_type: {
                        type: "string",
                      },
                      bank_address: {
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
                      bank_name: {
                        type: "string",
                      },
                      routing_number: {
                        type: "string",
                      },
                    },
                    required: [
                      "account_holder_address",
                      "account_holder_name",
                      "account_number",
                      "account_type",
                      "bank_address",
                      "bank_name",
                      "routing_number",
                    ],
                  },
                  iban: {
                    type: "object" as const,
                    properties: {
                      account_holder_address: {
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
                      account_holder_name: {
                        type: "string",
                      },
                      bank_address: {
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
                      bic: {
                        type: "string",
                      },
                      country: {
                        type: "string",
                      },
                      iban: {
                        type: "string",
                      },
                    },
                    required: [
                      "account_holder_address",
                      "account_holder_name",
                      "bank_address",
                      "bic",
                      "country",
                      "iban",
                    ],
                  },
                  sort_code: {
                    type: "object" as const,
                    properties: {
                      account_holder_address: {
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
                      account_holder_name: {
                        type: "string",
                      },
                      account_number: {
                        type: "string",
                      },
                      bank_address: {
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
                      sort_code: {
                        type: "string",
                      },
                    },
                    required: [
                      "account_holder_address",
                      "account_holder_name",
                      "account_number",
                      "bank_address",
                      "sort_code",
                    ],
                  },
                  spei: {
                    type: "object" as const,
                    properties: {
                      account_holder_address: {
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
                      account_holder_name: {
                        type: "string",
                      },
                      bank_address: {
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
                      bank_code: {
                        type: "string",
                      },
                      bank_name: {
                        type: "string",
                      },
                      clabe: {
                        type: "string",
                      },
                    },
                    required: [
                      "account_holder_address",
                      "account_holder_name",
                      "bank_address",
                      "bank_code",
                      "bank_name",
                      "clabe",
                    ],
                  },
                  supported_networks: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: [
                        "ach",
                        "bacs",
                        "domestic_wire_us",
                        "fps",
                        "sepa",
                        "spei",
                        "swift",
                        "zengin",
                      ],
                    },
                  },
                  swift: {
                    type: "object" as const,
                    properties: {
                      account_holder_address: {
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
                      account_holder_name: {
                        type: "string",
                      },
                      account_number: {
                        type: "string",
                      },
                      account_type: {
                        type: "string",
                      },
                      bank_address: {
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
                      bank_name: {
                        type: "string",
                      },
                      swift_code: {
                        type: "string",
                      },
                    },
                    required: [
                      "account_holder_address",
                      "account_holder_name",
                      "account_number",
                      "account_type",
                      "bank_address",
                      "bank_name",
                      "swift_code",
                    ],
                  },
                  type: {
                    type: "string",
                    enum: [
                      "aba",
                      "iban",
                      "sort_code",
                      "spei",
                      "swift",
                      "zengin",
                    ],
                  },
                  zengin: {
                    type: "object" as const,
                    properties: {
                      account_holder_address: {
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
                      account_holder_name: {
                        type: ["string", "null"],
                      },
                      account_number: {
                        type: ["string", "null"],
                      },
                      account_type: {
                        type: ["string", "null"],
                      },
                      bank_address: {
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
                      bank_code: {
                        type: ["string", "null"],
                      },
                      bank_name: {
                        type: ["string", "null"],
                      },
                      branch_code: {
                        type: ["string", "null"],
                      },
                      branch_name: {
                        type: ["string", "null"],
                      },
                    },
                    required: ["account_holder_address", "bank_address"],
                  },
                },
                required: ["type"],
              },
            },
            hosted_instructions_url: {
              type: ["string", "null"],
            },
            reference: {
              type: ["string", "null"],
            },
            type: {
              type: "string",
              enum: [
                "eu_bank_transfer",
                "gb_bank_transfer",
                "jp_bank_transfer",
                "mx_bank_transfer",
                "us_bank_transfer",
              ],
            },
          },
          required: ["type"],
        },
        konbini_display_details: {
          type: "object" as const,
          properties: {
            expires_at: {
              type: "integer",
              format: "unix-time",
            },
            hosted_voucher_url: {
              type: ["string", "null"],
            },
            stores: {
              type: "object" as const,
              properties: {
                familymart: {
                  type: ["object", "null"],
                  properties: {
                    confirmation_number: {
                      type: "string",
                    },
                    payment_code: {
                      type: "string",
                    },
                  },
                  required: ["payment_code"],
                },
                lawson: {
                  type: ["object", "null"],
                  properties: {
                    confirmation_number: {
                      type: "string",
                    },
                    payment_code: {
                      type: "string",
                    },
                  },
                  required: ["payment_code"],
                },
                ministop: {
                  type: ["object", "null"],
                  properties: {
                    confirmation_number: {
                      type: "string",
                    },
                    payment_code: {
                      type: "string",
                    },
                  },
                  required: ["payment_code"],
                },
                seicomart: {
                  type: ["object", "null"],
                  properties: {
                    confirmation_number: {
                      type: "string",
                    },
                    payment_code: {
                      type: "string",
                    },
                  },
                  required: ["payment_code"],
                },
              },
            },
          },
          required: ["expires_at", "stores"],
        },
        multibanco_display_details: {
          type: "object" as const,
          properties: {
            entity: {
              type: ["string", "null"],
            },
            expires_at: {
              type: ["integer", "null"],
              format: "unix-time",
            },
            hosted_voucher_url: {
              type: ["string", "null"],
            },
            reference: {
              type: ["string", "null"],
            },
          },
        },
        oxxo_display_details: {
          type: "object" as const,
          properties: {
            expires_after: {
              type: ["integer", "null"],
              format: "unix-time",
            },
            hosted_voucher_url: {
              type: ["string", "null"],
            },
            number: {
              type: ["string", "null"],
            },
          },
        },
        paynow_display_qr_code: {
          type: "object" as const,
          properties: {
            data: {
              type: "string",
            },
            hosted_instructions_url: {
              type: ["string", "null"],
            },
            image_url_png: {
              type: "string",
            },
            image_url_svg: {
              type: "string",
            },
          },
          required: ["data", "image_url_png", "image_url_svg"],
        },
        pix_display_qr_code: {
          type: "object" as const,
          properties: {
            data: {
              type: "string",
            },
            expires_at: {
              type: "integer",
            },
            hosted_instructions_url: {
              type: "string",
            },
            image_url_png: {
              type: "string",
            },
            image_url_svg: {
              type: "string",
            },
          },
        },
        promptpay_display_qr_code: {
          type: "object" as const,
          properties: {
            data: {
              type: "string",
            },
            hosted_instructions_url: {
              type: "string",
            },
            image_url_png: {
              type: "string",
            },
            image_url_svg: {
              type: "string",
            },
          },
          required: [
            "data",
            "hosted_instructions_url",
            "image_url_png",
            "image_url_svg",
          ],
        },
        redirect_to_url: {
          type: "object" as const,
          properties: {
            return_url: {
              type: ["string", "null"],
            },
            url: {
              type: ["string", "null"],
            },
          },
        },
        swish_handle_redirect_or_display_qr_code: {
          type: "object" as const,
          properties: {
            hosted_instructions_url: {
              type: "string",
            },
            qr_code: {
              type: "object" as const,
              properties: {
                data: {
                  type: "string",
                },
                image_url_png: {
                  type: "string",
                },
                image_url_svg: {
                  type: "string",
                },
              },
              required: ["data", "image_url_png", "image_url_svg"],
            },
          },
          required: ["hosted_instructions_url", "qr_code"],
        },
        type: {
          type: "string",
        },
        use_stripe_sdk: {
          type: "object" as const,
        },
        verify_with_microdeposits: {
          type: "object" as const,
          properties: {
            arrival_date: {
              type: "integer",
              format: "unix-time",
            },
            hosted_verification_url: {
              type: "string",
            },
            microdeposit_type: {
              type: ["string", "null"],
              enum: ["amounts", "descriptor_code"],
            },
          },
          required: ["arrival_date", "hosted_verification_url"],
        },
        wechat_pay_display_qr_code: {
          type: "object" as const,
          properties: {
            data: {
              type: "string",
            },
            hosted_instructions_url: {
              type: "string",
            },
            image_data_url: {
              type: "string",
            },
            image_url_png: {
              type: "string",
            },
            image_url_svg: {
              type: "string",
            },
          },
          required: [
            "data",
            "hosted_instructions_url",
            "image_data_url",
            "image_url_png",
            "image_url_svg",
          ],
        },
        wechat_pay_redirect_to_android_app: {
          type: "object" as const,
          properties: {
            app_id: {
              type: "string",
            },
            nonce_str: {
              type: "string",
            },
            package: {
              type: "string",
            },
            partner_id: {
              type: "string",
            },
            prepay_id: {
              type: "string",
            },
            sign: {
              type: "string",
            },
            timestamp: {
              type: "string",
            },
          },
          required: [
            "app_id",
            "nonce_str",
            "package",
            "partner_id",
            "prepay_id",
            "sign",
            "timestamp",
          ],
        },
        wechat_pay_redirect_to_ios_app: {
          type: "object" as const,
          properties: {
            native_url: {
              type: "string",
            },
          },
          required: ["native_url"],
        },
      },
      required: ["type"],
    },
    object: {
      type: "string",
      enum: ["payment_intent"],
    },
    on_behalf_of: {
      type: ["string", "null"],
    },
    payment_method: {
      type: ["string", "null"],
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
            mandate_options: {
              type: "object" as const,
              properties: {
                custom_mandate_url: {
                  type: "string",
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
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
          },
        },
        affirm: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            preferred_locale: {
              type: "string",
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        afterpay_clearpay: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            reference: {
              type: ["string", "null"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        alipay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        alma: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        amazon_pay: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        au_becs_debit: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            target_date: {
              type: "string",
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
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
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
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
          type: "object" as const,
          properties: {
            preferred_language: {
              type: "string",
              enum: ["de", "en", "fr", "nl"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        billie: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        blik: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
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
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        card: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: ["object", "null"],
              properties: {
                available_plans: {
                  type: ["array", "null"],
                  items: {
                    type: "object" as const,
                    properties: {
                      count: {
                        type: ["integer", "null"],
                      },
                      interval: {
                        type: ["string", "null"],
                        enum: ["month"],
                      },
                      type: {
                        type: "string",
                        enum: ["fixed_count"],
                      },
                    },
                    required: ["type"],
                  },
                },
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: ["object", "null"],
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            mandate_options: {
              type: ["object", "null"],
              properties: {
                amount: {
                  type: "integer",
                },
                amount_type: {
                  type: "string",
                  enum: ["fixed", "maximum"],
                },
                description: {
                  type: ["string", "null"],
                },
                end_date: {
                  type: ["integer", "null"],
                  format: "unix-time",
                },
                interval: {
                  type: "string",
                  enum: ["day", "month", "sporadic", "week", "year"],
                },
                interval_count: {
                  type: ["integer", "null"],
                },
                reference: {
                  type: "string",
                },
                start_date: {
                  type: "integer",
                  format: "unix-time",
                },
                supported_types: {
                  type: ["array", "null"],
                  items: {
                    type: "string",
                    enum: ["india"],
                  },
                },
              },
              required: [
                "amount",
                "amount_type",
                "interval",
                "reference",
                "start_date",
              ],
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
              type: ["string", "null"],
              enum: ["any", "automatic", "challenge"],
            },
            require_cvc_recollection: {
              type: "boolean",
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
            request_incremental_authorization_support: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        card_present: {
          type: "object" as const,
          properties: {
            request_extended_authorization: {
              type: ["boolean", "null"],
            },
            request_incremental_authorization_support: {
              type: ["boolean", "null"],
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        cashapp: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
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
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        eps: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        fpx: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        giropay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        grabpay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        ideal: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        interac_present: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        kakao_pay: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        klarna: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            preferred_locale: {
              type: ["string", "null"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        konbini: {
          type: "object" as const,
          properties: {
            confirmation_number: {
              type: ["string", "null"],
            },
            expires_after_days: {
              type: ["integer", "null"],
            },
            expires_at: {
              type: ["integer", "null"],
              format: "unix-time",
            },
            product_description: {
              type: ["string", "null"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        kr_card: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        link: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        mobilepay: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        multibanco: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        naver_pay: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        nz_bank_account: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            target_date: {
              type: "string",
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
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
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        p24: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        pay_by_bank: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        payco: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        paynow: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        paypal: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            preferred_locale: {
              type: ["string", "null"],
            },
            reference: {
              type: ["string", "null"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        pix: {
          type: "object" as const,
          properties: {
            expires_after_seconds: {
              type: ["integer", "null"],
            },
            expires_at: {
              type: ["integer", "null"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        promptpay: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        revolut_pay: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        samsung_pay: {
          type: "object" as const,
          properties: {
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
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
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        sofort: {
          type: "object" as const,
          properties: {
            preferred_language: {
              type: ["string", "null"],
              enum: ["de", "en", "es", "fr", "it", "nl", "pl"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        swish: {
          type: "object" as const,
          properties: {
            reference: {
              type: ["string", "null"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        twint: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
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
            mandate_options: {
              type: "object" as const,
              properties: {
                collection_method: {
                  type: "string",
                  enum: ["paper"],
                },
              },
            },
            preferred_settlement_speed: {
              type: "string",
              enum: ["fastest", "standard"],
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
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
          },
        },
        wechat_pay: {
          type: "object" as const,
          properties: {
            app_id: {
              type: ["string", "null"],
            },
            client: {
              type: ["string", "null"],
              enum: ["android", "ios", "web"],
            },
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
                },
              },
            },
            verification_method: {
              type: "string",
              enum: ["automatic", "instant", "microdeposits"],
            },
          },
        },
        zip: {
          type: "object" as const,
          properties: {
            setup_future_usage: {
              type: "string",
              enum: ["none", "off_session", "on_session"],
            },
            capture_method: {
              type: "string",
              enum: ["manual", "manual_preferred"],
            },
            installments: {
              type: "object" as const,
              properties: {
                enabled: {
                  type: "boolean",
                },
                plan: {
                  type: "object" as const,
                  properties: {
                    count: {
                      type: ["integer", "null"],
                    },
                    interval: {
                      type: ["string", "null"],
                      enum: ["month"],
                    },
                    type: {
                      type: "string",
                      enum: ["fixed_count"],
                    },
                  },
                  required: ["type"],
                },
              },
              required: ["enabled"],
            },
            request_incremental_authorization_support: {
              type: "boolean",
            },
            require_cvc_recollection: {
              type: "boolean",
            },
            routing: {
              type: "object" as const,
              properties: {
                requested_priority: {
                  type: ["string", "null"],
                  enum: ["domestic", "international"],
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
      type: "array",
      items: {
        type: "string",
      },
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
    processing: {
      type: ["object", "null"],
      properties: {
        card: {
          type: "object" as const,
          properties: {
            customer_notification: {
              type: "object" as const,
              properties: {
                approval_requested: {
                  type: ["boolean", "null"],
                },
                completes_at: {
                  type: ["integer", "null"],
                  format: "unix-time",
                },
              },
            },
          },
        },
        type: {
          type: "string",
          enum: ["card"],
        },
      },
      required: ["type"],
    },
    receipt_email: {
      type: ["string", "null"],
    },
    review: {
      type: ["string", "null"],
    },
    setup_future_usage: {
      type: ["string", "null"],
      enum: ["off_session", "on_session"],
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
    statement_descriptor: {
      type: ["string", "null"],
    },
    statement_descriptor_suffix: {
      type: ["string", "null"],
    },
    status: {
      type: "string",
      enum: [
        "canceled",
        "processing",
        "requires_action",
        "requires_capture",
        "requires_confirmation",
        "requires_payment_method",
        "succeeded",
      ],
    },
    transfer_data: {
      type: ["object", "null"],
      properties: {
        amount: {
          type: "integer",
        },
        destination: {
          type: "string",
        },
      },
      required: ["destination"],
    },
    transfer_group: {
      type: ["string", "null"],
    },
  },
  required: [
    "amount",
    "capture_method",
    "confirmation_method",
    "created",
    "currency",
    "id",
    "livemode",
    "object",
    "payment_method_types",
    "status",
  ],
};
export const listPaymentIntentsOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: paymentIntentOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
export const searchPaymentIntentsOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["search_result"] },
    data: { type: "array", items: paymentIntentOutputSchema },
    has_more: { type: "boolean" },
    next_page: { type: ["string", "null"] },
    total_count: { type: "integer" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
