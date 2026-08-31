export const accountOutputSchema = {
  type: "object" as const,
  properties: {
    business_profile: {
      type: ["object", "null"],
      properties: {
        annual_revenue: {
          type: ["object", "null"],
          properties: {
            amount: {
              type: ["integer", "null"],
            },
            currency: {
              type: ["string", "null"],
              format: "currency",
            },
            fiscal_year_end: {
              type: ["string", "null"],
            },
          },
        },
        estimated_worker_count: {
          type: ["integer", "null"],
        },
        mcc: {
          type: ["string", "null"],
        },
        minority_owned_business_designation: {
          type: ["array", "null"],
          items: {
            type: "string",
            enum: [
              "lgbtqi_owned_business",
              "minority_owned_business",
              "none_of_these_apply",
              "prefer_not_to_answer",
              "women_owned_business",
            ],
          },
        },
        monthly_estimated_revenue: {
          type: "object" as const,
          properties: {
            amount: {
              type: "integer",
            },
            currency: {
              type: "string",
              format: "currency",
            },
          },
          required: ["amount", "currency"],
        },
        name: {
          type: ["string", "null"],
        },
        product_description: {
          type: ["string", "null"],
        },
        support_address: {
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
        support_email: {
          type: ["string", "null"],
        },
        support_phone: {
          type: ["string", "null"],
        },
        support_url: {
          type: ["string", "null"],
        },
        url: {
          type: ["string", "null"],
        },
      },
    },
    business_type: {
      type: ["string", "null"],
      enum: ["company", "government_entity", "individual", "non_profit"],
    },
    capabilities: {
      type: "object" as const,
      properties: {
        acss_debit_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        affirm_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        afterpay_clearpay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        alma_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        amazon_pay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        au_becs_debit_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        bacs_debit_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        bancontact_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        bank_transfer_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        billie_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        blik_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        boleto_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        card_issuing: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        card_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        cartes_bancaires_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        cashapp_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        eps_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        fpx_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        gb_bank_transfer_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        giropay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        grabpay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        ideal_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        india_international_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        jcb_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        jp_bank_transfer_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        kakao_pay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        klarna_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        konbini_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        kr_card_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        legacy_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        link_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        mobilepay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        multibanco_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        mx_bank_transfer_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        naver_pay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        nz_bank_account_becs_debit_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        oxxo_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        p24_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        pay_by_bank_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        payco_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        paynow_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        promptpay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        revolut_pay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        samsung_pay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        satispay_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        sepa_bank_transfer_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        sepa_debit_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        sofort_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        swish_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        tax_reporting_us_1099_k: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        tax_reporting_us_1099_misc: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        transfers: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        treasury: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        twint_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        us_bank_account_ach_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        us_bank_transfer_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
        zip_payments: {
          type: "string",
          enum: ["active", "inactive", "pending"],
        },
      },
    },
    charges_enabled: {
      type: "boolean",
    },
    company: {
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
        address_kana: {
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
            town: {
              type: ["string", "null"],
            },
          },
        },
        address_kanji: {
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
            town: {
              type: ["string", "null"],
            },
          },
        },
        directors_provided: {
          type: "boolean",
        },
        directorship_declaration: {
          type: ["object", "null"],
          properties: {
            date: {
              type: ["integer", "null"],
              format: "unix-time",
            },
            ip: {
              type: ["string", "null"],
            },
            user_agent: {
              type: ["string", "null"],
            },
          },
        },
        executives_provided: {
          type: "boolean",
        },
        export_license_id: {
          type: "string",
        },
        export_purpose_code: {
          type: "string",
        },
        name: {
          type: ["string", "null"],
        },
        name_kana: {
          type: ["string", "null"],
        },
        name_kanji: {
          type: ["string", "null"],
        },
        owners_provided: {
          type: "boolean",
        },
        ownership_declaration: {
          type: ["object", "null"],
          properties: {
            date: {
              type: ["integer", "null"],
              format: "unix-time",
            },
            ip: {
              type: ["string", "null"],
            },
            user_agent: {
              type: ["string", "null"],
            },
          },
        },
        ownership_exemption_reason: {
          type: "string",
          enum: [
            "qualified_entity_exceeds_ownership_threshold",
            "qualifies_as_financial_institution",
          ],
        },
        phone: {
          type: ["string", "null"],
        },
        registration_date: {
          type: "object" as const,
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
        structure: {
          type: "string",
          enum: [
            "free_zone_establishment",
            "free_zone_llc",
            "government_instrumentality",
            "governmental_unit",
            "incorporated_non_profit",
            "incorporated_partnership",
            "limited_liability_partnership",
            "llc",
            "multi_member_llc",
            "private_company",
            "private_corporation",
            "private_partnership",
            "public_company",
            "public_corporation",
            "public_partnership",
            "registered_charity",
            "single_member_llc",
            "sole_establishment",
            "sole_proprietorship",
            "tax_exempt_government_instrumentality",
            "unincorporated_association",
            "unincorporated_non_profit",
            "unincorporated_partnership",
          ],
        },
        tax_id_provided: {
          type: "boolean",
        },
        tax_id_registrar: {
          type: "string",
        },
        vat_id_provided: {
          type: "boolean",
        },
        verification: {
          type: ["object", "null"],
          properties: {
            document: {
              type: "object" as const,
              properties: {
                back: {
                  type: ["string", "null"],
                },
                details: {
                  type: ["string", "null"],
                },
                details_code: {
                  type: ["string", "null"],
                },
                front: {
                  type: ["string", "null"],
                },
              },
            },
          },
          required: ["document"],
        },
      },
    },
    controller: {
      type: "object" as const,
      properties: {
        fees: {
          type: "object" as const,
          properties: {
            payer: {
              type: "string",
              enum: [
                "account",
                "application",
                "application_custom",
                "application_express",
              ],
            },
          },
          required: ["payer"],
        },
        is_controller: {
          type: "boolean",
        },
        losses: {
          type: "object" as const,
          properties: {
            payments: {
              type: "string",
              enum: ["application", "stripe"],
            },
          },
          required: ["payments"],
        },
        requirement_collection: {
          type: "string",
          enum: ["application", "stripe"],
        },
        stripe_dashboard: {
          type: "object" as const,
          properties: {
            type: {
              type: "string",
              enum: ["express", "full", "none"],
            },
          },
          required: ["type"],
        },
        type: {
          type: "string",
          enum: ["account", "application"],
        },
      },
      required: ["type"],
    },
    country: {
      type: "string",
    },
    created: {
      type: "integer",
      format: "unix-time",
    },
    default_currency: {
      type: "string",
    },
    details_submitted: {
      type: "boolean",
    },
    email: {
      type: ["string", "null"],
    },
    external_accounts: {
      type: "object" as const,
      properties: {
        data: {
          type: "array",
          items: {
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
                enum: ["bank_account", "card"],
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
            },
            required: ["id", "last4", "object"],
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
    future_requirements: {
      type: "object" as const,
      properties: {
        alternatives: {
          type: ["array", "null"],
          items: {
            type: "object" as const,
            properties: {
              alternative_fields_due: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              original_fields_due: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["alternative_fields_due", "original_fields_due"],
          },
        },
        current_deadline: {
          type: ["integer", "null"],
          format: "unix-time",
        },
        currently_due: {
          type: ["array", "null"],
          items: {
            type: "string",
          },
        },
        disabled_reason: {
          type: ["string", "null"],
          enum: [
            "action_required.requested_capabilities",
            "listed",
            "other",
            "platform_paused",
            "rejected.fraud",
            "rejected.incomplete_verification",
            "rejected.listed",
            "rejected.other",
            "rejected.platform_fraud",
            "rejected.platform_other",
            "rejected.platform_terms_of_service",
            "rejected.terms_of_service",
            "requirements.past_due",
            "requirements.pending_verification",
            "under_review",
          ],
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
        eventually_due: {
          type: ["array", "null"],
          items: {
            type: "string",
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
    groups: {
      type: ["object", "null"],
      properties: {
        payments_pricing: {
          type: ["string", "null"],
        },
      },
    },
    id: {
      type: "string",
    },
    individual: {
      type: "object" as const,
      properties: {
        account: {
          type: "string",
        },
        additional_tos_acceptances: {
          type: "object" as const,
          properties: {
            account: {
              type: ["object", "null"],
              properties: {
                date: {
                  type: ["integer", "null"],
                  format: "unix-time",
                },
                ip: {
                  type: ["string", "null"],
                },
                user_agent: {
                  type: ["string", "null"],
                },
              },
            },
          },
        },
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
        address_kana: {
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
            town: {
              type: ["string", "null"],
            },
          },
        },
        address_kanji: {
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
            town: {
              type: ["string", "null"],
            },
          },
        },
        created: {
          type: "integer",
          format: "unix-time",
        },
        dob: {
          type: "object" as const,
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
        email: {
          type: ["string", "null"],
        },
        first_name: {
          type: ["string", "null"],
        },
        first_name_kana: {
          type: ["string", "null"],
        },
        first_name_kanji: {
          type: ["string", "null"],
        },
        full_name_aliases: {
          type: "array",
          items: {
            type: "string",
          },
        },
        future_requirements: {
          type: ["object", "null"],
          properties: {
            alternatives: {
              type: ["array", "null"],
              items: {
                type: "object" as const,
                properties: {
                  alternative_fields_due: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  original_fields_due: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["alternative_fields_due", "original_fields_due"],
              },
            },
            currently_due: {
              type: "array",
              items: {
                type: "string",
              },
            },
            errors: {
              type: "array",
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
            eventually_due: {
              type: "array",
              items: {
                type: "string",
              },
            },
            past_due: {
              type: "array",
              items: {
                type: "string",
              },
            },
            pending_verification: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          required: [
            "currently_due",
            "errors",
            "eventually_due",
            "past_due",
            "pending_verification",
          ],
        },
        gender: {
          type: ["string", "null"],
        },
        id: {
          type: "string",
        },
        id_number_provided: {
          type: "boolean",
        },
        id_number_secondary_provided: {
          type: "boolean",
        },
        last_name: {
          type: ["string", "null"],
        },
        last_name_kana: {
          type: ["string", "null"],
        },
        last_name_kanji: {
          type: ["string", "null"],
        },
        maiden_name: {
          type: ["string", "null"],
        },
        metadata: {
          type: "object" as const,
          additionalProperties: {
            type: "string",
          },
        },
        nationality: {
          type: ["string", "null"],
        },
        object: {
          type: "string",
          enum: ["person"],
        },
        phone: {
          type: ["string", "null"],
        },
        political_exposure: {
          type: "string",
          enum: ["existing", "none"],
        },
        registered_address: {
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
        relationship: {
          type: "object" as const,
          properties: {
            authorizer: {
              type: ["boolean", "null"],
            },
            director: {
              type: ["boolean", "null"],
            },
            executive: {
              type: ["boolean", "null"],
            },
            legal_guardian: {
              type: ["boolean", "null"],
            },
            owner: {
              type: ["boolean", "null"],
            },
            percent_ownership: {
              type: ["number", "null"],
            },
            representative: {
              type: ["boolean", "null"],
            },
            title: {
              type: ["string", "null"],
            },
          },
        },
        requirements: {
          type: ["object", "null"],
          properties: {
            alternatives: {
              type: ["array", "null"],
              items: {
                type: "object" as const,
                properties: {
                  alternative_fields_due: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  original_fields_due: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["alternative_fields_due", "original_fields_due"],
              },
            },
            currently_due: {
              type: "array",
              items: {
                type: "string",
              },
            },
            errors: {
              type: "array",
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
            eventually_due: {
              type: "array",
              items: {
                type: "string",
              },
            },
            past_due: {
              type: "array",
              items: {
                type: "string",
              },
            },
            pending_verification: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          required: [
            "currently_due",
            "errors",
            "eventually_due",
            "past_due",
            "pending_verification",
          ],
        },
        ssn_last_4_provided: {
          type: "boolean",
        },
        us_cfpb_data: {
          type: ["object", "null"],
          properties: {
            ethnicity_details: {
              type: ["object", "null"],
              properties: {
                ethnicity: {
                  type: ["array", "null"],
                  items: {
                    type: "string",
                    enum: [
                      "cuban",
                      "hispanic_or_latino",
                      "mexican",
                      "not_hispanic_or_latino",
                      "other_hispanic_or_latino",
                      "prefer_not_to_answer",
                      "puerto_rican",
                    ],
                  },
                },
                ethnicity_other: {
                  type: ["string", "null"],
                },
              },
            },
            race_details: {
              type: ["object", "null"],
              properties: {
                race: {
                  type: ["array", "null"],
                  items: {
                    type: "string",
                    enum: [
                      "african_american",
                      "american_indian_or_alaska_native",
                      "asian",
                      "asian_indian",
                      "black_or_african_american",
                      "chinese",
                      "ethiopian",
                      "filipino",
                      "guamanian_or_chamorro",
                      "haitian",
                      "jamaican",
                      "japanese",
                      "korean",
                      "native_hawaiian",
                      "native_hawaiian_or_other_pacific_islander",
                      "nigerian",
                      "other_asian",
                      "other_black_or_african_american",
                      "other_pacific_islander",
                      "prefer_not_to_answer",
                      "samoan",
                      "somali",
                      "vietnamese",
                      "white",
                    ],
                  },
                },
                race_other: {
                  type: ["string", "null"],
                },
              },
            },
            self_identified_gender: {
              type: ["string", "null"],
            },
          },
        },
        verification: {
          type: "object" as const,
          properties: {
            additional_document: {
              type: ["object", "null"],
              properties: {
                back: {
                  type: ["string", "null"],
                },
                details: {
                  type: ["string", "null"],
                },
                details_code: {
                  type: ["string", "null"],
                },
                front: {
                  type: ["string", "null"],
                },
              },
            },
            details: {
              type: ["string", "null"],
            },
            details_code: {
              type: ["string", "null"],
            },
            document: {
              type: "object" as const,
              properties: {
                back: {
                  type: ["string", "null"],
                },
                details: {
                  type: ["string", "null"],
                },
                details_code: {
                  type: ["string", "null"],
                },
                front: {
                  type: ["string", "null"],
                },
              },
            },
            status: {
              type: "string",
            },
          },
          required: ["status"],
        },
      },
      required: ["account", "created", "id", "object"],
    },
    metadata: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    object: {
      type: "string",
      enum: ["account"],
    },
    payouts_enabled: {
      type: "boolean",
    },
    requirements: {
      type: "object" as const,
      properties: {
        alternatives: {
          type: ["array", "null"],
          items: {
            type: "object" as const,
            properties: {
              alternative_fields_due: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              original_fields_due: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["alternative_fields_due", "original_fields_due"],
          },
        },
        current_deadline: {
          type: ["integer", "null"],
          format: "unix-time",
        },
        currently_due: {
          type: ["array", "null"],
          items: {
            type: "string",
          },
        },
        disabled_reason: {
          type: ["string", "null"],
          enum: [
            "action_required.requested_capabilities",
            "listed",
            "other",
            "platform_paused",
            "rejected.fraud",
            "rejected.incomplete_verification",
            "rejected.listed",
            "rejected.other",
            "rejected.platform_fraud",
            "rejected.platform_other",
            "rejected.platform_terms_of_service",
            "rejected.terms_of_service",
            "requirements.past_due",
            "requirements.pending_verification",
            "under_review",
          ],
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
        eventually_due: {
          type: ["array", "null"],
          items: {
            type: "string",
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
    settings: {
      type: ["object", "null"],
      properties: {
        bacs_debit_payments: {
          type: "object" as const,
          properties: {
            display_name: {
              type: ["string", "null"],
            },
            service_user_number: {
              type: ["string", "null"],
            },
          },
        },
        branding: {
          type: "object" as const,
          properties: {
            icon: {
              type: ["string", "null"],
            },
            logo: {
              type: ["string", "null"],
            },
            primary_color: {
              type: ["string", "null"],
            },
            secondary_color: {
              type: ["string", "null"],
            },
          },
        },
        card_issuing: {
          type: "object" as const,
          properties: {
            tos_acceptance: {
              type: "object" as const,
              properties: {
                date: {
                  type: ["integer", "null"],
                },
                ip: {
                  type: ["string", "null"],
                },
                user_agent: {
                  type: "string",
                },
              },
            },
          },
        },
        card_payments: {
          type: "object" as const,
          properties: {
            decline_on: {
              type: "object" as const,
              properties: {
                avs_failure: {
                  type: "boolean",
                },
                cvc_failure: {
                  type: "boolean",
                },
              },
              required: ["avs_failure", "cvc_failure"],
            },
            statement_descriptor_prefix: {
              type: ["string", "null"],
            },
            statement_descriptor_prefix_kana: {
              type: ["string", "null"],
            },
            statement_descriptor_prefix_kanji: {
              type: ["string", "null"],
            },
          },
        },
        dashboard: {
          type: "object" as const,
          properties: {
            display_name: {
              type: ["string", "null"],
            },
            timezone: {
              type: ["string", "null"],
            },
          },
        },
        invoices: {
          type: "object" as const,
          properties: {
            default_account_tax_ids: {
              type: ["array", "null"],
              items: {
                type: "string",
              },
            },
            hosted_payment_method_save: {
              type: ["string", "null"],
              enum: ["always", "never", "offer"],
            },
          },
        },
        payments: {
          type: "object" as const,
          properties: {
            statement_descriptor: {
              type: ["string", "null"],
            },
            statement_descriptor_kana: {
              type: ["string", "null"],
            },
            statement_descriptor_kanji: {
              type: ["string", "null"],
            },
          },
        },
        payouts: {
          type: "object" as const,
          properties: {
            debit_negative_balances: {
              type: "boolean",
            },
            schedule: {
              type: "object" as const,
              properties: {
                delay_days: {
                  type: "integer",
                },
                interval: {
                  type: "string",
                },
                monthly_anchor: {
                  type: "integer",
                },
                weekly_anchor: {
                  type: "string",
                },
              },
              required: ["delay_days", "interval"],
            },
            statement_descriptor: {
              type: ["string", "null"],
            },
          },
          required: ["debit_negative_balances", "schedule"],
        },
        sepa_debit_payments: {
          type: "object" as const,
          properties: {
            creditor_id: {
              type: "string",
            },
          },
        },
        treasury: {
          type: "object" as const,
          properties: {
            tos_acceptance: {
              type: "object" as const,
              properties: {
                date: {
                  type: ["integer", "null"],
                },
                ip: {
                  type: ["string", "null"],
                },
                user_agent: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      required: ["branding", "card_payments", "dashboard", "payments"],
    },
    tos_acceptance: {
      type: "object" as const,
      properties: {
        date: {
          type: ["integer", "null"],
          format: "unix-time",
        },
        ip: {
          type: ["string", "null"],
        },
        service_agreement: {
          type: "string",
        },
        user_agent: {
          type: ["string", "null"],
        },
      },
    },
    type: {
      type: "string",
      enum: ["custom", "express", "none", "standard"],
    },
  },
  required: ["id", "object"],
};
export const listAccountsOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: accountOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
