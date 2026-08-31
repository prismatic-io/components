export const chargeOutputSchema = {
  type: "object" as const,
  properties: {
    amount: {
      type: "integer",
    },
    amount_captured: {
      type: "integer",
    },
    amount_refunded: {
      type: "integer",
    },
    application: {
      type: ["string", "null"],
    },
    application_fee: {
      type: ["string", "null"],
    },
    application_fee_amount: {
      type: ["integer", "null"],
    },
    balance_transaction: {
      type: ["string", "null"],
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
    calculated_statement_descriptor: {
      type: ["string", "null"],
    },
    captured: {
      type: "boolean",
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
    disputed: {
      type: "boolean",
    },
    failure_balance_transaction: {
      type: ["string", "null"],
    },
    failure_code: {
      type: ["string", "null"],
    },
    failure_message: {
      type: ["string", "null"],
    },
    fraud_details: {
      type: ["object", "null"],
      properties: {
        stripe_report: {
          type: "string",
        },
        user_report: {
          type: "string",
        },
      },
    },
    id: {
      type: "string",
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
      enum: ["charge"],
    },
    on_behalf_of: {
      type: ["string", "null"],
    },
    outcome: {
      type: ["object", "null"],
      properties: {
        advice_code: {
          type: ["string", "null"],
          enum: ["confirm_card_data", "do_not_try_again", "try_again_later"],
        },
        network_advice_code: {
          type: ["string", "null"],
        },
        network_decline_code: {
          type: ["string", "null"],
        },
        network_status: {
          type: ["string", "null"],
        },
        reason: {
          type: ["string", "null"],
        },
        risk_level: {
          type: "string",
        },
        risk_score: {
          type: "integer",
        },
        rule: {
          type: "string",
        },
        seller_message: {
          type: ["string", "null"],
        },
        type: {
          type: "string",
        },
      },
      required: ["type"],
    },
    paid: {
      type: "boolean",
    },
    payment_intent: {
      type: ["string", "null"],
    },
    payment_method: {
      type: ["string", "null"],
    },
    payment_method_details: {
      type: ["object", "null"],
      properties: {
        ach_credit_transfer: {
          type: "object" as const,
          properties: {
            account_number: {
              type: ["string", "null"],
            },
            bank_name: {
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
            account_holder_type: {
              type: ["string", "null"],
              enum: ["company", "individual"],
            },
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
          },
        },
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
            mandate: {
              type: "string",
            },
            transit_number: {
              type: ["string", "null"],
            },
          },
        },
        affirm: {
          type: "object" as const,
          properties: {
            transaction_id: {
              type: ["string", "null"],
            },
          },
        },
        afterpay_clearpay: {
          type: "object" as const,
          properties: {
            order_id: {
              type: ["string", "null"],
            },
            reference: {
              type: ["string", "null"],
            },
          },
        },
        alipay: {
          type: "object" as const,
          properties: {
            buyer_id: {
              type: "string",
            },
            fingerprint: {
              type: ["string", "null"],
            },
            transaction_id: {
              type: ["string", "null"],
            },
          },
        },
        alma: {
          type: "object" as const,
        },
        amazon_pay: {
          type: "object" as const,
          properties: {
            funding: {
              type: "object" as const,
              properties: {
                card: {
                  type: "object" as const,
                  properties: {
                    brand: {
                      type: ["string", "null"],
                    },
                    country: {
                      type: ["string", "null"],
                    },
                    exp_month: {
                      type: ["integer", "null"],
                    },
                    exp_year: {
                      type: ["integer", "null"],
                    },
                    funding: {
                      type: ["string", "null"],
                    },
                    last4: {
                      type: ["string", "null"],
                    },
                  },
                },
                type: {
                  type: ["string", "null"],
                  enum: ["card"],
                },
              },
            },
          },
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
            mandate: {
              type: "string",
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
            mandate: {
              type: ["string", "null"],
            },
            sort_code: {
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
            generated_sepa_debit: {
              type: ["string", "null"],
            },
            generated_sepa_debit_mandate: {
              type: ["string", "null"],
            },
            iban_last4: {
              type: ["string", "null"],
            },
            preferred_language: {
              type: ["string", "null"],
              enum: ["de", "en", "fr", "nl"],
            },
            verified_name: {
              type: ["string", "null"],
            },
          },
        },
        billie: {
          type: "object" as const,
        },
        blik: {
          type: "object" as const,
          properties: {
            buyer_id: {
              type: ["string", "null"],
            },
          },
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
            amount_authorized: {
              type: ["integer", "null"],
            },
            authorization_code: {
              type: ["string", "null"],
            },
            brand: {
              type: ["string", "null"],
            },
            capture_before: {
              type: "integer",
              format: "unix-time",
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
            exp_month: {
              type: "integer",
            },
            exp_year: {
              type: "integer",
            },
            extended_authorization: {
              type: "object" as const,
              properties: {
                status: {
                  type: "string",
                  enum: ["disabled", "enabled"],
                },
              },
              required: ["status"],
            },
            fingerprint: {
              type: ["string", "null"],
            },
            funding: {
              type: ["string", "null"],
            },
            incremental_authorization: {
              type: "object" as const,
              properties: {
                status: {
                  type: "string",
                  enum: ["available", "unavailable"],
                },
              },
              required: ["status"],
            },
            installments: {
              type: ["object", "null"],
              properties: {
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
            },
            last4: {
              type: ["string", "null"],
            },
            mandate: {
              type: ["string", "null"],
            },
            multicapture: {
              type: "object" as const,
              properties: {
                status: {
                  type: "string",
                  enum: ["available", "unavailable"],
                },
              },
              required: ["status"],
            },
            network: {
              type: ["string", "null"],
            },
            network_token: {
              type: ["object", "null"],
              properties: {
                used: {
                  type: "boolean",
                },
              },
              required: ["used"],
            },
            network_transaction_id: {
              type: ["string", "null"],
            },
            overcapture: {
              type: "object" as const,
              properties: {
                maximum_amount_capturable: {
                  type: "integer",
                },
                status: {
                  type: "string",
                  enum: ["available", "unavailable"],
                },
              },
              required: ["maximum_amount_capturable", "status"],
            },
            regulated_status: {
              type: ["string", "null"],
              enum: ["regulated", "unregulated"],
            },
            three_d_secure: {
              type: ["object", "null"],
              properties: {
                authentication_flow: {
                  type: ["string", "null"],
                  enum: ["challenge", "frictionless"],
                },
                electronic_commerce_indicator: {
                  type: ["string", "null"],
                  enum: ["01", "02", "05", "06", "07"],
                },
                exemption_indicator: {
                  type: ["string", "null"],
                  enum: ["low_risk", "none"],
                },
                exemption_indicator_applied: {
                  type: "boolean",
                },
                result: {
                  type: ["string", "null"],
                  enum: [
                    "attempt_acknowledged",
                    "authenticated",
                    "exempted",
                    "failed",
                    "not_supported",
                    "processing_error",
                  ],
                },
                result_reason: {
                  type: ["string", "null"],
                  enum: [
                    "abandoned",
                    "bypassed",
                    "canceled",
                    "card_not_enrolled",
                    "network_not_supported",
                    "protocol_error",
                    "rejected",
                  ],
                },
                transaction_id: {
                  type: ["string", "null"],
                },
                version: {
                  type: ["string", "null"],
                  enum: ["1.0.2", "2.1.0", "2.2.0"],
                },
              },
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
          required: ["exp_month", "exp_year"],
        },
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
                  enum: ["apple_pay", "google_pay", "samsung_pay", "unknown"],
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
            verified_name: {
              type: ["string", "null"],
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
            transaction_id: {
              type: ["string", "null"],
            },
          },
          required: ["bank"],
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
            verified_name: {
              type: ["string", "null"],
            },
          },
        },
        grabpay: {
          type: "object" as const,
          properties: {
            transaction_id: {
              type: ["string", "null"],
            },
          },
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
            generated_sepa_debit: {
              type: ["string", "null"],
            },
            generated_sepa_debit_mandate: {
              type: ["string", "null"],
            },
            iban_last4: {
              type: ["string", "null"],
            },
            verified_name: {
              type: ["string", "null"],
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
                  enum: ["checking", "savings", "unknown"],
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
          },
          required: ["exp_month", "exp_year"],
        },
        kakao_pay: {
          type: "object" as const,
          properties: {
            buyer_id: {
              type: ["string", "null"],
            },
          },
        },
        klarna: {
          type: "object" as const,
          properties: {
            payer_details: {
              type: ["object", "null"],
              properties: {
                address: {
                  type: ["object", "null"],
                  properties: {
                    country: {
                      type: ["string", "null"],
                    },
                  },
                },
              },
            },
            payment_method_category: {
              type: ["string", "null"],
            },
            preferred_locale: {
              type: ["string", "null"],
            },
          },
        },
        konbini: {
          type: "object" as const,
          properties: {
            store: {
              type: ["object", "null"],
              properties: {
                chain: {
                  type: ["string", "null"],
                  enum: ["familymart", "lawson", "ministop", "seicomart"],
                },
              },
            },
          },
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
            buyer_id: {
              type: ["string", "null"],
            },
            last4: {
              type: ["string", "null"],
            },
          },
        },
        link: {
          type: "object" as const,
          properties: {
            country: {
              type: ["string", "null"],
            },
          },
        },
        mobilepay: {
          type: "object" as const,
          properties: {
            card: {
              type: ["object", "null"],
              properties: {
                brand: {
                  type: ["string", "null"],
                },
                country: {
                  type: ["string", "null"],
                },
                exp_month: {
                  type: ["integer", "null"],
                },
                exp_year: {
                  type: ["integer", "null"],
                },
                last4: {
                  type: ["string", "null"],
                },
              },
            },
          },
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
          },
        },
        naver_pay: {
          type: "object" as const,
          properties: {
            buyer_id: {
              type: ["string", "null"],
            },
          },
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
        oxxo: {
          type: "object" as const,
          properties: {
            number: {
              type: ["string", "null"],
            },
          },
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
            reference: {
              type: ["string", "null"],
            },
            verified_name: {
              type: ["string", "null"],
            },
          },
        },
        pay_by_bank: {
          type: "object" as const,
        },
        payco: {
          type: "object" as const,
          properties: {
            buyer_id: {
              type: ["string", "null"],
            },
          },
        },
        paynow: {
          type: "object" as const,
          properties: {
            reference: {
              type: ["string", "null"],
            },
          },
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
            payer_name: {
              type: ["string", "null"],
            },
            seller_protection: {
              type: ["object", "null"],
              properties: {
                dispute_categories: {
                  type: ["array", "null"],
                  items: {
                    type: "string",
                    enum: ["fraudulent", "product_not_received"],
                  },
                },
                status: {
                  type: "string",
                  enum: ["eligible", "not_eligible", "partially_eligible"],
                },
              },
              required: ["status"],
            },
            transaction_id: {
              type: ["string", "null"],
            },
          },
        },
        pix: {
          type: "object" as const,
          properties: {
            bank_transaction_id: {
              type: ["string", "null"],
            },
          },
        },
        promptpay: {
          type: "object" as const,
          properties: {
            reference: {
              type: ["string", "null"],
            },
          },
        },
        revolut_pay: {
          type: "object" as const,
          properties: {
            funding: {
              type: "object" as const,
              properties: {
                card: {
                  type: "object" as const,
                  properties: {
                    brand: {
                      type: ["string", "null"],
                    },
                    country: {
                      type: ["string", "null"],
                    },
                    exp_month: {
                      type: ["integer", "null"],
                    },
                    exp_year: {
                      type: ["integer", "null"],
                    },
                    funding: {
                      type: ["string", "null"],
                    },
                    last4: {
                      type: ["string", "null"],
                    },
                  },
                },
                type: {
                  type: ["string", "null"],
                  enum: ["card"],
                },
              },
            },
          },
        },
        samsung_pay: {
          type: "object" as const,
          properties: {
            buyer_id: {
              type: ["string", "null"],
            },
          },
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
            last4: {
              type: ["string", "null"],
            },
            mandate: {
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
            generated_sepa_debit: {
              type: ["string", "null"],
            },
            generated_sepa_debit_mandate: {
              type: ["string", "null"],
            },
            iban_last4: {
              type: ["string", "null"],
            },
            preferred_language: {
              type: ["string", "null"],
              enum: ["de", "en", "es", "fr", "it", "nl", "pl"],
            },
            verified_name: {
              type: ["string", "null"],
            },
          },
        },
        stripe_account: {
          type: "object" as const,
        },
        swish: {
          type: "object" as const,
          properties: {
            fingerprint: {
              type: ["string", "null"],
            },
            payment_reference: {
              type: ["string", "null"],
            },
            verified_phone_last4: {
              type: ["string", "null"],
            },
          },
        },
        twint: {
          type: "object" as const,
        },
        type: {
          type: "string",
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
            fingerprint: {
              type: ["string", "null"],
            },
            last4: {
              type: ["string", "null"],
            },
            mandate: {
              type: "string",
            },
            payment_reference: {
              type: ["string", "null"],
            },
            routing_number: {
              type: ["string", "null"],
            },
          },
        },
        wechat: {
          type: "object" as const,
        },
        wechat_pay: {
          type: "object" as const,
          properties: {
            fingerprint: {
              type: ["string", "null"],
            },
            transaction_id: {
              type: ["string", "null"],
            },
          },
        },
        zip: {
          type: "object" as const,
        },
      },
      required: ["type"],
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
    radar_options: {
      type: "object" as const,
      properties: {
        session: {
          type: "string",
        },
      },
    },
    receipt_email: {
      type: ["string", "null"],
    },
    receipt_number: {
      type: ["string", "null"],
    },
    receipt_url: {
      type: ["string", "null"],
    },
    refunded: {
      type: "boolean",
    },
    refunds: {
      type: ["object", "null"],
      properties: {
        data: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              amount: {
                type: "integer",
              },
              balance_transaction: {
                type: ["string", "null"],
              },
              charge: {
                type: ["string", "null"],
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
                type: "string",
              },
              destination_details: {
                type: "object" as const,
                properties: {
                  affirm: {
                    type: "object" as const,
                  },
                  afterpay_clearpay: {
                    type: "object" as const,
                  },
                  alipay: {
                    type: "object" as const,
                  },
                  alma: {
                    type: "object" as const,
                  },
                  amazon_pay: {
                    type: "object" as const,
                  },
                  au_bank_transfer: {
                    type: "object" as const,
                  },
                  blik: {
                    type: "object" as const,
                    properties: {
                      network_decline_code: {
                        type: ["string", "null"],
                      },
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  br_bank_transfer: {
                    type: "object" as const,
                    properties: {
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  card: {
                    type: "object" as const,
                    properties: {
                      reference: {
                        type: "string",
                      },
                      reference_status: {
                        type: "string",
                      },
                      reference_type: {
                        type: "string",
                      },
                      type: {
                        type: "string",
                        enum: ["pending", "refund", "reversal"],
                      },
                    },
                    required: ["type"],
                  },
                  cashapp: {
                    type: "object" as const,
                  },
                  customer_cash_balance: {
                    type: "object" as const,
                  },
                  eps: {
                    type: "object" as const,
                  },
                  eu_bank_transfer: {
                    type: "object" as const,
                    properties: {
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  gb_bank_transfer: {
                    type: "object" as const,
                    properties: {
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  giropay: {
                    type: "object" as const,
                  },
                  grabpay: {
                    type: "object" as const,
                  },
                  jp_bank_transfer: {
                    type: "object" as const,
                    properties: {
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  klarna: {
                    type: "object" as const,
                  },
                  multibanco: {
                    type: "object" as const,
                    properties: {
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  mx_bank_transfer: {
                    type: "object" as const,
                    properties: {
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  nz_bank_transfer: {
                    type: "object" as const,
                  },
                  p24: {
                    type: "object" as const,
                    properties: {
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  paynow: {
                    type: "object" as const,
                  },
                  paypal: {
                    type: "object" as const,
                  },
                  pix: {
                    type: "object" as const,
                  },
                  revolut: {
                    type: "object" as const,
                  },
                  sofort: {
                    type: "object" as const,
                  },
                  swish: {
                    type: "object" as const,
                    properties: {
                      network_decline_code: {
                        type: ["string", "null"],
                      },
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  th_bank_transfer: {
                    type: "object" as const,
                    properties: {
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  type: {
                    type: "string",
                  },
                  us_bank_transfer: {
                    type: "object" as const,
                    properties: {
                      reference: {
                        type: ["string", "null"],
                      },
                      reference_status: {
                        type: ["string", "null"],
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
                required: ["type"],
              },
              failure_balance_transaction: {
                type: "string",
              },
              failure_reason: {
                type: "string",
              },
              id: {
                type: "string",
              },
              instructions_email: {
                type: "string",
              },
              metadata: {
                type: ["object", "null"],
                additionalProperties: {
                  type: "string",
                },
              },
              next_action: {
                type: "object" as const,
                properties: {
                  display_details: {
                    type: "object" as const,
                    properties: {
                      email_sent: {
                        type: "object" as const,
                        properties: {
                          email_sent_at: {
                            type: "integer",
                            format: "unix-time",
                          },
                          email_sent_to: {
                            type: "string",
                          },
                        },
                        required: ["email_sent_at", "email_sent_to"],
                      },
                      expires_at: {
                        type: "integer",
                        format: "unix-time",
                      },
                    },
                    required: ["email_sent", "expires_at"],
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["type"],
              },
              object: {
                type: "string",
                enum: ["refund"],
              },
              payment_intent: {
                type: ["string", "null"],
              },
              pending_reason: {
                type: "string",
                enum: ["charge_pending", "insufficient_funds", "processing"],
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
              reason: {
                type: ["string", "null"],
                enum: [
                  "duplicate",
                  "expired_uncaptured_charge",
                  "fraudulent",
                  "requested_by_customer",
                ],
              },
              receipt_number: {
                type: ["string", "null"],
              },
              source_transfer_reversal: {
                type: ["string", "null"],
              },
              status: {
                type: ["string", "null"],
              },
              transfer_reversal: {
                type: ["string", "null"],
              },
            },
            required: ["amount", "created", "currency", "id", "object"],
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
    review: {
      type: ["string", "null"],
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
    source_transfer: {
      type: ["string", "null"],
    },
    statement_descriptor: {
      type: ["string", "null"],
    },
    statement_descriptor_suffix: {
      type: ["string", "null"],
    },
    status: {
      type: "string",
      enum: ["failed", "pending", "succeeded"],
    },
    transfer: {
      type: "string",
    },
    transfer_data: {
      type: ["object", "null"],
      properties: {
        amount: {
          type: ["integer", "null"],
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
    "amount_captured",
    "amount_refunded",
    "billing_details",
    "captured",
    "created",
    "currency",
    "disputed",
    "id",
    "livemode",
    "metadata",
    "object",
    "paid",
    "refunded",
    "status",
  ],
};
export const listChargesOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: chargeOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
export const searchChargesOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["search_result"] },
    data: { type: "array", items: chargeOutputSchema },
    has_more: { type: "boolean" },
    next_page: { type: ["string", "null"] },
    total_count: { type: "integer" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
