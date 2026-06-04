const paginationExtraPayloadData = {
  pagination: {
    previous: {
      limit: "2",
      page_info:
        "eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6NTMyNjQwNDQ4NTI3MywibGFzdF92YWx1ZSI6IjIwMjQtMDMtMDYgMjE6MzE6MTQuNDMxO123456",
      rel: "previous",
      url: "https://test-store.myshopify.com/admin/api/2023-04/resource?limit=2&page_info=eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6NTMyNjQwNDQ4NTI3MywibGFzdF92YWx1ZSI6IjIwMjQtMDMtMDYgMjE6MzE6MTQuNDMxO123456",
    },
    next: {
      limit: "2",
      page_info:
        "eyJkaXJlY3Rpb24iOiJuZXh0IiwibGFzdF9pZCI6NTMyNjQwNDMyMTQzMywibGFzdF92YWx1ZSI6IjIwMjQtMDMtMDYgMjE6MzA6NTYuOTY1NDYabcd",
      rel: "next",
      url: "https://test-store.myshopify.com/admin/api/2023-04/resource?limit=2&page_info=eyJkaXJlY3Rpb24iOiJuZXh0IiwibGFzdF9pZCI6NTMyNjQwNDMyMTQzMywibGFzdF92YWx1ZSI6IjIwMjQtMDMtMDYgMjE6MzA6NTYuOTY1NDYabcd",
    },
  },
  pageInfo:
    "eyJkaXJlY3Rpb24iOiJuZXh0IiwibGFzdF9pZCI6NTMyNjQwNDMyMTQzMywibGFzdF92YWx1ZSI6IjIwMjQtMDMtMDYgMjE6MzA6NTYuOTY1NDYabcd",
  rel: 'rel="next"',
  headers: {
    date: "Tue, 26 Mar 2024 23:31:56 GMT",
    "content-type": "application/json; charset=utf-8",
    "transfer-encoding": "chunked",
    connection: "close",
    "x-sorting-hat-podid": "152",
    "x-sorting-hat-shopid": "60628201234",
    vary: "Accept-Encoding, Accept",
    "referrer-policy": "origin-when-cross-origin",
    "x-frame-options": "DENY",
    "x-shopid": "60628201234",
    "x-shardid": "152",
    "x-stats-userid": "",
    "x-stats-apiclientid": "6511233",
    "x-stats-apipermissionid": "429538012345",
    "x-shopify-api-version": "2023-04",
    "x-shopify-api-version-warning": "https://shopify.dev/concepts/about-apis/versioning",
    http_x_shopify_shop_api_call_limit: "1/40",
    "x-shopify-shop-api-call-limit": "1/40",
    link: '<https://test-store.myshopify.com/admin/api/2023-04/resource?limit=2&page_info=eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6NTMyNjQwNDQ4NTI3MywibGFzdF92YWx1ZSI6IjIwMjQtMDMtMDYgMjE6MzE6MTQuNDMxO123456>; rel="previous", <https://test-store.myshopify.com/admin/api/2023-04/resource?limit=2&page_info=eyJkaXJlY3Rpb24iOiJuZXh0IiwibGFzdF9pZCI6NTMyNjQwNDMyMTQzMywibGFzdF92YWx1ZSI6IjIwMjQtMDMtMDYgMjE6MzA6NTYuOTY1NDYabcd>; rel="next"',
    "strict-transport-security": "max-age=7889238",
    "x-request-id": "da004e10-b646-4c9a-b340-74537e4a066b-12346",
    "server-timing": "processing;dur=78, cfRequestDuration;dur=137.999773",
    "x-shopify-stage": "production",
    "content-security-policy":
      "default-src 'self' data: blob: 'unsafe-inline' 'unsafe-eval' https://* shopify-pos://*; block-all-mixed-content; child-src 'self' https://* shopify-pos://*; connect-src 'self' wss://* https://*; frame-ancestors 'none'; img-src 'self' data: blob: https:; script-src https://cdn.shopify.com https://cdn.shopifycdn.net https://checkout.shopifycs.com https://api.stripe.com https://mpsnare.iesnare.com https://appcenter.intuit.com https://www.paypal.com https://js.braintreegateway.com https://c.paypal.com https://maps.googleapis.com https://www.google-analytics.com https://v.shopify.com 'self' 'unsafe-inline' 'unsafe-eval'; upgrade-insecure-requests; report-uri /csp-report?source%5Baction%5D=index&source%5Bapp%5D=Shopify&source%5Bcontroller%5D=admin%2Forders&source%5Bsection%5D=admin_api&source%5Buuid%5D=da004e10-b646-4c9a-b340-74537e4a066b-12346",
    "x-content-type-options": "nosniff",
    "x-download-options": "noopen",
    "x-permitted-cross-domain-policies": "none",
    "x-xss-protection":
      "1; mode=block; report=/xss-report?source%5Baction%5D=index&source%5Bapp%5D=Shopify&source%5Bcontroller%5D=admin%2Forders&source%5Bsection%5D=admin_api&source%5Buuid%5D=da004e10-b646-4c9a-b340-74537e4a066b-12346",
    "x-envoy-upstream-service-time": "81",
    "x-dc": "gcp-us-central1,gcp-us-central1",
    "cf-cache-status": "DYNAMIC",
    "report-to":
      '{"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report\\/v4?s=uu1FyX%2B%2BP%2FEeJ6ZHU0JrkwDut31f4GbXULyxPQ8i1mdykz%2BFk%2FwIDraEoru0w7h173cXMiZLoz3pdLbFSkF0j5TnUkEXI94jinI0gmj3dMjX9LzrXPnEJ%2Bb1HqTUMc41db0xG72h%2FmGe%2F3W8OPrtdVF7"}],"group":"cf-nel","max_age":604800}',
    nel: '{"success_fraction":0.01,"report_to":"cf-nel","max_age":604800}',
    server: "cloudflare",
    "cf-ray": "86aaefe76d1710b6-ORD",
    "alt-svc": 'h3=":443"; ma=86400',
  },
};

const genericHeaders = {
  headers: {
    date: "Wed, 27 Mar 2024 00:52:16 GMT",
    "content-type": "application/json; charset=utf-8",
    "transfer-encoding": "chunked",
    connection: "close",
    "x-sorting-hat-podid": "152",
    "x-sorting-hat-shopid": "12345678912",
    vary: "Accept-Encoding, Accept",
    "referrer-policy": "origin-when-cross-origin",
    "x-frame-options": "DENY",
    "x-shopid": "12345678912",
    "x-shardid": "152",
    "x-stats-userid": "",
    "x-stats-apiclientid": "6511123",
    "x-stats-apipermissionid": "429538082969",
    "x-shopify-api-version": "2023-04",
    "x-shopify-api-version-warning": "https://shopify.dev/concepts/about-apis/versioning",
    http_x_shopify_shop_api_call_limit: "3/40",
    "x-shopify-shop-api-call-limit": "3/40",
    "strict-transport-security": "max-age=7889238",
    "x-request-id": "4c63b1a7-fdc1-4113-a2d5-46f6c883c1d9-123456",
    "server-timing": "processing;dur=57, cfRequestDuration;dur=134.000063",
    "x-shopify-stage": "production",
    "content-security-policy":
      "default-src 'self' data: blob: 'unsafe-inline' 'unsafe-eval' https://* shopify-pos://*; block-all-mixed-content; child-src 'self' https://* shopify-pos://*; connect-src 'self' wss://* https://*; frame-ancestors 'none'; img-src 'self' data: blob: https:; script-src https://cdn.shopify.com https://cdn.shopifycdn.net https://checkout.shopifycs.com https://api.stripe.com https://mpsnare.iesnare.com https://appcenter.intuit.com https://www.paypal.com https://js.braintreegateway.com https://c.paypal.com https://maps.googleapis.com https://www.google-analytics.com https://v.shopify.com 'self' 'unsafe-inline' 'unsafe-eval'; upgrade-insecure-requests; report-uri /csp-report?source%5Baction%5D=show&source%5Bapp%5D=Shopify&source%5Bcontroller%5D=admin%2Fcollects&source%5Bsection%5D=admin_api&source%5Buuid%5D=4c63b1a7-fdc1-4113-a2d5-46f6c883c1d9-123456",
    "x-content-type-options": "nosniff",
    "x-download-options": "noopen",
    "x-permitted-cross-domain-policies": "none",
    "x-xss-protection":
      "1; mode=block; report=/xss-report?source%5Baction%5D=show&source%5Bapp%5D=Shopify&source%5Bcontroller%5D=admin%2Fcollects&source%5Bsection%5D=admin_api&source%5Buuid%5D=4c63b1a7-fdc1-4113-a2d5-46f6c883c1d9-123456",
    "x-envoy-upstream-service-time": "59",
    "x-dc": "gcp-northamerica-northeast2,gcp-us-central1",
    "cf-cache-status": "DYNAMIC",
    "report-to":
      '{"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report\\/v4?s=bSI8sLfHnRK2xdtpDsJLmjZsjNiEF9jW2sYK9naPjTlyeKLJ8DBSsj00CktG5DIPBht7esrQCCPe61VrMCWdM6dW3uCwmngxHy8iJi8Caumvx65uVDdkSQIZOZGV5hvWmbubfOW9xyg7HkPcf8sAQcv3"}],"group":"cf-nel","max_age":604800}',
    nel: '{"success_fraction":0.01,"report_to":"cf-nel","max_age":604800}',
    server: "cloudflare",
    "cf-ray": "86ab65927cbbe283-ORD",
    "alt-svc": 'h3=":443"; ma=86400',
  },
};

export const orderExamplePayload = {
  order: {
    orders: [
      {
        id: 450789469,
        admin_graphql_api_id: "gid://shopify/Order/450789469",
        app_id: null,
        browser_ip: "0.0.0.0",
        buyer_accepts_marketing: false,
        cancel_reason: null,
        cancelled_at: null,
        cart_token: "68778783ad298f1c80c3bafcddeea02f",
        checkout_id: 901414060,
        checkout_token: "bd5a8aa1ecd019dd3520ff791ee3a24c",
        client_details: {
          accept_language: null,
          browser_height: null,
          browser_ip: "0.0.0.0",
          browser_width: null,
          session_hash: null,
          user_agent: null,
        },
        closed_at: null,
        confirmation_number: null,
        confirmed: true,
        contact_email: "bob.norman@mail.example.com",
        created_at: "2008-01-10T11:00:00-05:00",
        currency: "USD",
        current_subtotal_price: "195.67",
        current_subtotal_price_set: {
          shop_money: {
            amount: "195.67",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "195.67",
            currency_code: "USD",
          },
        },
        current_total_additional_fees_set: null,
        current_total_discounts: "3.33",
        current_total_discounts_set: {
          shop_money: {
            amount: "3.33",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "3.33",
            currency_code: "USD",
          },
        },
        current_total_duties_set: null,
        current_total_price: "199.65",
        current_total_price_set: {
          shop_money: {
            amount: "199.65",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "199.65",
            currency_code: "USD",
          },
        },
        current_total_tax: "3.98",
        current_total_tax_set: {
          shop_money: {
            amount: "3.98",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "3.98",
            currency_code: "USD",
          },
        },
        customer_locale: null,
        device_id: null,
        discount_codes: [
          {
            code: "TENOFF",
            amount: "10.00",
            type: "fixed_amount",
          },
        ],
        duties_included: false,
        email: "bob.norman@mail.example.com",
        estimated_taxes: false,
        financial_status: "partially_refunded",
        fulfillment_status: null,
        landing_site: "http://www.example.com?source=abc",
        landing_site_ref: "abc",
        location_id: null,
        merchant_business_entity_id: "MTU0ODM4MDAwOQ",
        merchant_of_record_app_id: null,
        name: "#1001",
        note: null,
        note_attributes: [
          {
            name: "custom engraving",
            value: "Happy Birthday",
          },
          {
            name: "colour",
            value: "green",
          },
        ],
        number: 1,
        order_number: 1001,
        order_status_url:
          "https://jsmith.myshopify.com/548380009/orders/b1946ac92492d2347c6235b4d2611184/authenticate?key=imasecretipod",
        original_total_additional_fees_set: null,
        original_total_duties_set: null,
        payment_gateway_names: ["bogus"],
        phone: "+557734881234",
        po_number: "ABC123",
        presentment_currency: "USD",
        processed_at: "2008-01-10T11:00:00-05:00",
        reference: "fhwdgads",
        referring_site: "http://www.otherexample.com",
        source_identifier: "fhwdgads",
        source_name: "web",
        source_url: null,
        subtotal_price: "597.00",
        subtotal_price_set: {
          shop_money: {
            amount: "597.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "597.00",
            currency_code: "USD",
          },
        },
        tags: "",
        tax_exempt: false,
        tax_lines: [
          {
            price: "11.94",
            rate: 0.06,
            title: "State Tax",
            price_set: {
              shop_money: {
                amount: "11.94",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "11.94",
                currency_code: "USD",
              },
            },
            channel_liable: null,
          },
        ],
        taxes_included: false,
        test: false,
        token: "b1946ac92492d2347c6235b4d2611184",
        total_cash_rounding_payment_adjustment_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        total_cash_rounding_refund_adjustment_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        total_discounts: "10.00",
        total_discounts_set: {
          shop_money: {
            amount: "10.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "10.00",
            currency_code: "USD",
          },
        },
        total_line_items_price: "597.00",
        total_line_items_price_set: {
          shop_money: {
            amount: "597.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "597.00",
            currency_code: "USD",
          },
        },
        total_outstanding: "0.00",
        total_price: "598.94",
        total_price_set: {
          shop_money: {
            amount: "598.94",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "598.94",
            currency_code: "USD",
          },
        },
        total_shipping_price_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        total_tax: "11.94",
        total_tax_set: {
          shop_money: {
            amount: "11.94",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "11.94",
            currency_code: "USD",
          },
        },
        total_tip_received: "0.00",
        total_weight: 0,
        updated_at: "2008-01-10T11:00:00-05:00",
        user_id: null,
        billing_address: {
          first_name: "Bob",
          address1: "Chestnut Street 92",
          phone: "+1(502)-459-2181",
          city: "Louisville",
          zip: "40202",
          province: "Kentucky",
          country: "United States",
          last_name: "Norman",
          address2: "",
          company: null,
          latitude: 45.41634,
          longitude: -75.6868,
          name: "Bob Norman",
          country_code: "US",
          province_code: "KY",
        },
        customer: {
          id: 207119551,
          email: "bob.norman@mail.example.com",
          created_at: "2025-01-02T11:29:59-05:00",
          updated_at: "2025-01-02T11:29:59-05:00",
          first_name: "Bob",
          last_name: "Norman",
          state: "disabled",
          note: null,
          verified_email: true,
          multipass_identifier: null,
          tax_exempt: false,
          phone: "+16136120707",
          email_marketing_consent: {
            state: "not_subscribed",
            opt_in_level: null,
            consent_updated_at: "2004-06-13T11:57:11-04:00",
          },
          sms_marketing_consent: {
            state: "not_subscribed",
            opt_in_level: "single_opt_in",
            consent_updated_at: "2024-01-01T07:00:00-05:00",
            consent_collected_from: "OTHER",
          },
          tags: "Léon, Noël",
          currency: "USD",
          tax_exemptions: [],
          admin_graphql_api_id: "gid://shopify/Customer/207119551",
          default_address: {
            id: 207119551,
            customer_id: 207119551,
            first_name: null,
            last_name: null,
            company: null,
            address1: "Chestnut Street 92",
            address2: "",
            city: "Louisville",
            province: "Kentucky",
            country: "United States",
            zip: "40202",
            phone: "555-625-1199",
            name: "",
            province_code: "KY",
            country_code: "US",
            country_name: "United States",
            default: true,
          },
        },
        discount_applications: [
          {
            target_type: "line_item",
            type: "discount_code",
            value: "10.0",
            value_type: "fixed_amount",
            allocation_method: "across",
            target_selection: "all",
            code: "TENOFF",
          },
        ],
        fulfillments: [
          {
            id: 255858046,
            admin_graphql_api_id: "gid://shopify/Fulfillment/255858046",
            created_at: "2025-01-02T11:29:59-05:00",
            location_id: 655441491,
            name: "#1001.0",
            order_id: 450789469,
            origin_address: {},
            receipt: {
              testcase: true,
              authorization: "123456",
            },
            service: "manual",
            shipment_status: null,
            status: "failure",
            tracking_company: "USPS",
            tracking_number: "1Z1234512345123456",
            tracking_numbers: ["1Z1234512345123456"],
            tracking_url:
              "https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=1Z1234512345123456",
            tracking_urls: [
              "https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=1Z1234512345123456",
            ],
            updated_at: "2025-01-02T11:29:59-05:00",
            line_items: [
              {
                id: 466157049,
                admin_graphql_api_id: "gid://shopify/LineItem/466157049",
                attributed_staffs: [],
                current_quantity: 0,
                fulfillable_quantity: 0,
                fulfillment_service: "manual",
                fulfillment_status: null,
                gift_card: false,
                grams: 200,
                name: "IPod Nano - 8gb - green",
                price: "199.00",
                price_set: {
                  shop_money: {
                    amount: "199.00",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "199.00",
                    currency_code: "USD",
                  },
                },
                product_exists: true,
                product_id: 632910392,
                properties: [
                  {
                    name: "Custom Engraving Front",
                    value: "Happy Birthday",
                  },
                  {
                    name: "Custom Engraving Back",
                    value: "Merry Christmas",
                  },
                ],
                quantity: 1,
                requires_shipping: true,
                sku: "IPOD2008GREEN",
                taxable: true,
                title: "IPod Nano - 8gb",
                total_discount: "0.00",
                total_discount_set: {
                  shop_money: {
                    amount: "0.00",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "0.00",
                    currency_code: "USD",
                  },
                },
                variant_id: 39072856,
                variant_inventory_management: "shopify",
                variant_title: "green",
                vendor: null,
                tax_lines: [
                  {
                    channel_liable: null,
                    price: "3.98",
                    price_set: {
                      shop_money: {
                        amount: "3.98",
                        currency_code: "USD",
                      },
                      presentment_money: {
                        amount: "3.98",
                        currency_code: "USD",
                      },
                    },
                    rate: 0.06,
                    title: "State Tax",
                  },
                ],
                duties: [],
                discount_allocations: [
                  {
                    amount: "3.34",
                    amount_set: {
                      shop_money: {
                        amount: "3.34",
                        currency_code: "USD",
                      },
                      presentment_money: {
                        amount: "3.34",
                        currency_code: "USD",
                      },
                    },
                    discount_application_index: 0,
                  },
                ],
              },
            ],
          },
        ],
        line_items: [
          {
            id: 466157049,
            admin_graphql_api_id: "gid://shopify/LineItem/466157049",
            attributed_staffs: [],
            current_quantity: 0,
            fulfillable_quantity: 0,
            fulfillment_service: "manual",
            fulfillment_status: null,
            gift_card: false,
            grams: 200,
            name: "IPod Nano - 8gb - green",
            price: "199.00",
            price_set: {
              shop_money: {
                amount: "199.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "199.00",
                currency_code: "USD",
              },
            },
            product_exists: true,
            product_id: 632910392,
            properties: [
              {
                name: "Custom Engraving Front",
                value: "Happy Birthday",
              },
              {
                name: "Custom Engraving Back",
                value: "Merry Christmas",
              },
            ],
            quantity: 1,
            requires_shipping: true,
            sku: "IPOD2008GREEN",
            taxable: true,
            title: "IPod Nano - 8gb",
            total_discount: "0.00",
            total_discount_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            variant_id: 39072856,
            variant_inventory_management: "shopify",
            variant_title: "green",
            vendor: null,
            tax_lines: [
              {
                channel_liable: null,
                price: "3.98",
                price_set: {
                  shop_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                },
                rate: 0.06,
                title: "State Tax",
              },
            ],
            duties: [],
            discount_allocations: [
              {
                amount: "3.34",
                amount_set: {
                  shop_money: {
                    amount: "3.34",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "3.34",
                    currency_code: "USD",
                  },
                },
                discount_application_index: 0,
              },
            ],
          },
          {
            id: 518995019,
            admin_graphql_api_id: "gid://shopify/LineItem/518995019",
            attributed_staffs: [],
            current_quantity: 1,
            fulfillable_quantity: 1,
            fulfillment_service: "manual",
            fulfillment_status: null,
            gift_card: false,
            grams: 200,
            name: "IPod Nano - 8gb - red",
            price: "199.00",
            price_set: {
              shop_money: {
                amount: "199.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "199.00",
                currency_code: "USD",
              },
            },
            product_exists: true,
            product_id: 632910392,
            properties: [],
            quantity: 1,
            requires_shipping: true,
            sku: "IPOD2008RED",
            taxable: true,
            title: "IPod Nano - 8gb",
            total_discount: "0.00",
            total_discount_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            variant_id: 49148385,
            variant_inventory_management: "shopify",
            variant_title: "red",
            vendor: null,
            tax_lines: [
              {
                channel_liable: null,
                price: "3.98",
                price_set: {
                  shop_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                },
                rate: 0.06,
                title: "State Tax",
              },
            ],
            duties: [],
            discount_allocations: [
              {
                amount: "3.33",
                amount_set: {
                  shop_money: {
                    amount: "3.33",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "3.33",
                    currency_code: "USD",
                  },
                },
                discount_application_index: 0,
              },
            ],
          },
          {
            id: 703073504,
            admin_graphql_api_id: "gid://shopify/LineItem/703073504",
            attributed_staffs: [],
            current_quantity: 0,
            fulfillable_quantity: 0,
            fulfillment_service: "manual",
            fulfillment_status: null,
            gift_card: false,
            grams: 200,
            name: "IPod Nano - 8gb - black",
            price: "199.00",
            price_set: {
              shop_money: {
                amount: "199.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "199.00",
                currency_code: "USD",
              },
            },
            product_exists: true,
            product_id: 632910392,
            properties: [],
            quantity: 1,
            requires_shipping: true,
            sku: "IPOD2008BLACK",
            taxable: true,
            title: "IPod Nano - 8gb",
            total_discount: "0.00",
            total_discount_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            variant_id: 457924702,
            variant_inventory_management: "shopify",
            variant_title: "black",
            vendor: null,
            tax_lines: [
              {
                channel_liable: null,
                price: "3.98",
                price_set: {
                  shop_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                },
                rate: 0.06,
                title: "State Tax",
              },
            ],
            duties: [],
            discount_allocations: [
              {
                amount: "3.33",
                amount_set: {
                  shop_money: {
                    amount: "3.33",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "3.33",
                    currency_code: "USD",
                  },
                },
                discount_application_index: 0,
              },
            ],
          },
        ],
        payment_terms: null,
        refunds: [
          {
            id: 509562969,
            admin_graphql_api_id: "gid://shopify/Refund/509562969",
            created_at: "2025-01-02T11:29:59-05:00",
            note: "it broke during shipping",
            order_id: 450789469,
            processed_at: "2025-01-02T11:29:59-05:00",
            restock: true,
            total_additional_fees_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            total_duties_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            user_id: 548380009,
            order_adjustments: [],
            transactions: [
              {
                id: 179259969,
                admin_graphql_api_id: "gid://shopify/OrderTransaction/179259969",
                amount: "209.00",
                authorization: "authorization-key",
                created_at: "2005-08-05T12:59:12-04:00",
                currency: "USD",
                device_id: null,
                error_code: null,
                gateway: "bogus",
                kind: "refund",
                location_id: null,
                message: null,
                order_id: 450789469,
                parent_id: 801038806,
                payment_id: "#1001.3",
                processed_at: "2005-08-05T12:59:12-04:00",
                receipt: {},
                source_name: "web",
                status: "success",
                test: false,
                user_id: null,
              },
            ],
            refund_line_items: [
              {
                id: 104689539,
                line_item_id: 703073504,
                location_id: 487838322,
                quantity: 1,
                restock_type: "legacy_restock",
                subtotal: 195.66,
                subtotal_set: {
                  shop_money: {
                    amount: "195.66",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "195.66",
                    currency_code: "USD",
                  },
                },
                total_tax: 3.98,
                total_tax_set: {
                  shop_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                },
                line_item: {
                  id: 703073504,
                  admin_graphql_api_id: "gid://shopify/LineItem/703073504",
                  attributed_staffs: [],
                  current_quantity: 0,
                  fulfillable_quantity: 0,
                  fulfillment_service: "manual",
                  fulfillment_status: null,
                  gift_card: false,
                  grams: 200,
                  name: "IPod Nano - 8gb - black",
                  price: "199.00",
                  price_set: {
                    shop_money: {
                      amount: "199.00",
                      currency_code: "USD",
                    },
                    presentment_money: {
                      amount: "199.00",
                      currency_code: "USD",
                    },
                  },
                  product_exists: true,
                  product_id: 632910392,
                  properties: [],
                  quantity: 1,
                  requires_shipping: true,
                  sku: "IPOD2008BLACK",
                  taxable: true,
                  title: "IPod Nano - 8gb",
                  total_discount: "0.00",
                  total_discount_set: {
                    shop_money: {
                      amount: "0.00",
                      currency_code: "USD",
                    },
                    presentment_money: {
                      amount: "0.00",
                      currency_code: "USD",
                    },
                  },
                  variant_id: 457924702,
                  variant_inventory_management: "shopify",
                  variant_title: "black",
                  vendor: null,
                  tax_lines: [
                    {
                      channel_liable: null,
                      price: "3.98",
                      price_set: {
                        shop_money: {
                          amount: "3.98",
                          currency_code: "USD",
                        },
                        presentment_money: {
                          amount: "3.98",
                          currency_code: "USD",
                        },
                      },
                      rate: 0.06,
                      title: "State Tax",
                    },
                  ],
                  duties: [],
                  discount_allocations: [
                    {
                      amount: "3.33",
                      amount_set: {
                        shop_money: {
                          amount: "3.33",
                          currency_code: "USD",
                        },
                        presentment_money: {
                          amount: "3.33",
                          currency_code: "USD",
                        },
                      },
                      discount_application_index: 0,
                    },
                  ],
                },
              },
              {
                id: 709875399,
                line_item_id: 466157049,
                location_id: 487838322,
                quantity: 1,
                restock_type: "legacy_restock",
                subtotal: 195.67,
                subtotal_set: {
                  shop_money: {
                    amount: "195.67",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "195.67",
                    currency_code: "USD",
                  },
                },
                total_tax: 3.98,
                total_tax_set: {
                  shop_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                },
                line_item: {
                  id: 466157049,
                  admin_graphql_api_id: "gid://shopify/LineItem/466157049",
                  attributed_staffs: [],
                  current_quantity: 0,
                  fulfillable_quantity: 0,
                  fulfillment_service: "manual",
                  fulfillment_status: null,
                  gift_card: false,
                  grams: 200,
                  name: "IPod Nano - 8gb - green",
                  price: "199.00",
                  price_set: {
                    shop_money: {
                      amount: "199.00",
                      currency_code: "USD",
                    },
                    presentment_money: {
                      amount: "199.00",
                      currency_code: "USD",
                    },
                  },
                  product_exists: true,
                  product_id: 632910392,
                  properties: [
                    {
                      name: "Custom Engraving Front",
                      value: "Happy Birthday",
                    },
                    {
                      name: "Custom Engraving Back",
                      value: "Merry Christmas",
                    },
                  ],
                  quantity: 1,
                  requires_shipping: true,
                  sku: "IPOD2008GREEN",
                  taxable: true,
                  title: "IPod Nano - 8gb",
                  total_discount: "0.00",
                  total_discount_set: {
                    shop_money: {
                      amount: "0.00",
                      currency_code: "USD",
                    },
                    presentment_money: {
                      amount: "0.00",
                      currency_code: "USD",
                    },
                  },
                  variant_id: 39072856,
                  variant_inventory_management: "shopify",
                  variant_title: "green",
                  vendor: null,
                  tax_lines: [
                    {
                      channel_liable: null,
                      price: "3.98",
                      price_set: {
                        shop_money: {
                          amount: "3.98",
                          currency_code: "USD",
                        },
                        presentment_money: {
                          amount: "3.98",
                          currency_code: "USD",
                        },
                      },
                      rate: 0.06,
                      title: "State Tax",
                    },
                  ],
                  duties: [],
                  discount_allocations: [
                    {
                      amount: "3.34",
                      amount_set: {
                        shop_money: {
                          amount: "3.34",
                          currency_code: "USD",
                        },
                        presentment_money: {
                          amount: "3.34",
                          currency_code: "USD",
                        },
                      },
                      discount_application_index: 0,
                    },
                  ],
                },
              },
            ],
            duties: [],
            additional_fees: [],
          },
        ],
        shipping_address: {
          first_name: "Bob",
          address1: "Chestnut Street 92",
          phone: "+1(502)-459-2181",
          city: "Louisville",
          zip: "40202",
          province: "Kentucky",
          country: "United States",
          last_name: "Norman",
          address2: "",
          company: null,
          latitude: 45.41634,
          longitude: -75.6868,
          name: "Bob Norman",
          country_code: "US",
          province_code: "KY",
        },
        shipping_lines: [
          {
            id: 369256396,
            carrier_identifier: null,
            code: "Free Shipping",
            discounted_price: "0.00",
            discounted_price_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            is_removed: false,
            phone: null,
            price: "0.00",
            price_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            requested_fulfillment_service_id: null,
            source: "shopify",
            title: "Free Shipping",
            tax_lines: [],
            discount_allocations: [],
          },
        ],
      },
    ],
  },
};

export const cancelOrderExamplePayload = {
  order: orderExamplePayload.order,
  notice: "Order has been cancelled",
};

export const countCustomersExamplePayload = {
  count: 1,
};

export const countVariantsExamplePayload = countCustomersExamplePayload;

export const countOrdersExamplePayload = countCustomersExamplePayload;

export const customerExamplePayload = {
  customer: {
    id: 207119551,
    email: "bob.norman@mail.example.com",
    accepts_marketing: false,
    created_at: "2023-07-11T18:25:37-04:00",
    updated_at: "2023-07-11T18:25:37-04:00",
    first_name: "Bob",
    last_name: "Norman",
    orders_count: 1,
    state: "disabled",
    total_spent: "199.65",
    last_order_id: 450789469,
    note: null,
    verified_email: true,
    multipass_identifier: null,
    tax_exempt: false,
    tags: "Léon, Noël",
    last_order_name: "#1001",
    currency: "USD",
    phone: "+16136120707",
    addresses: [
      {
        id: 207119551,
        customer_id: 207119551,
        first_name: null,
        last_name: null,
        company: null,
        address1: "Chestnut Street 92",
        address2: "",
        city: "Louisville",
        province: "Kentucky",
        country: "United States",
        zip: "40202",
        phone: "555-625-1199",
        name: "",
        province_code: "KY",
        country_code: "US",
        country_name: "United States",
        default: true,
      },
    ],
    accepts_marketing_updated_at: "2005-06-12T11:57:11-04:00",
    marketing_opt_in_level: null,
    tax_exemptions: [],
    email_marketing_consent: {
      state: "not_subscribed",
      opt_in_level: null,
      consent_updated_at: "2004-06-13T11:57:11-04:00",
    },
    sms_marketing_consent: {
      state: "not_subscribed",
      opt_in_level: "single_opt_in",
      consent_updated_at: "2023-07-11T18:25:37-04:00",
      consent_collected_from: "OTHER",
    },
    admin_graphql_api_id: "gid://shopify/Customer/207119551",
    default_address: {
      id: 207119551,
      customer_id: 207119551,
      first_name: null,
      last_name: null,
      company: null,
      address1: "Chestnut Street 92",
      address2: "",
      city: "Louisville",
      province: "Kentucky",
      country: "United States",
      zip: "40202",
      phone: "555-625-1199",
      name: "",
      province_code: "KY",
      country_code: "US",
      country_name: "United States",
      default: true,
    },
  },
};

export const createAccountActivationUrlExamplePayload = {
  account_activation_url:
    "https://jsmith.myshopify.com/account/activate/207119551/b2b567478ce4eeec0e8caeb7e472c543-1689114132",
};

export const listCustomersExamplePayload = {
  data: { customers: [customerExamplePayload] },
  ...paginationExtraPayloadData,
};

export const getDraftOrderExamplePayload = {
  data: {
    draft_order: {
      id: 994118539,
      note: "rush order",
      email: "bob.norman@mail.example.com",
      taxes_included: false,
      currency: "USD",
      invoice_sent_at: null,
      created_at: "2023-05-09T10:02:22-04:00",
      updated_at: "2023-05-09T10:02:22-04:00",
      tax_exempt: false,
      completed_at: null,
      name: "#D2",
      status: "open",
      line_items: [
        {
          id: 994118539,
          variant_id: 39072856,
          product_id: 632910392,
          title: "IPod Nano - 8gb",
          variant_title: "green",
          sku: "IPOD2008GREEN",
          vendor: null,
          quantity: 1,
          requires_shipping: false,
          taxable: true,
          gift_card: false,
          fulfillment_service: "manual",
          grams: 567,
          tax_lines: [],
          applied_discount: null,
          name: "IPod Nano - 8gb - green",
          properties: [],
          custom: false,
          price: "199.00",
          admin_graphql_api_id: "gid://shopify/DraftOrderLineItem/994118539",
        },
      ],
      shipping_address: {
        first_name: "Bob",
        address1: "Chestnut Street 92",
        phone: "+1(502)-459-2181",
        city: "Louisville",
        zip: "40202",
        province: "Kentucky",
        country: "United States",
        last_name: "Norman",
        address2: "",
        company: null,
        latitude: 45.41634,
        longitude: -75.6868,
        name: "Bob Norman",
        country_code: "US",
        province_code: "KY",
      },
      billing_address: {
        first_name: "Bob",
        address1: "Chestnut Street 92",
        phone: "+1(502)-459-2181",
        city: "Louisville",
        zip: "40202",
        province: "Kentucky",
        country: "United States",
        last_name: "Norman",
        address2: "",
        company: null,
        latitude: 45.41634,
        longitude: -75.6868,
        name: "Bob Norman",
        country_code: "US",
        province_code: "KY",
      },
      invoice_url:
        "https://jsmith.myshopify.com/548380009/invoices/ba8dcf6c022ccad3d47e3909e378e33f",
      applied_discount: {
        description: "$5promo",
        value: "5.0",
        title: null,
        amount: "5.00",
        value_type: "fixed_amount",
      },
      order_id: null,
      shipping_line: {
        title: "UPS Ground",
        custom: false,
        handle: "ups-3-12.25",
        price: "12.25",
      },
      tax_lines: [],
      tags: "Wholesale",
      note_attributes: [],
      total_price: "206.25",
      subtotal_price: "194.00",
      total_tax: "0.00",
      payment_terms: null,
      admin_graphql_api_id: "gid://shopify/DraftOrder/994118539",
      customer: {
        id: 207119551,
        email: "bob.norman@mail.example.com",
        accepts_marketing: false,
        created_at: "2023-05-09T10:02:22-04:00",
        updated_at: "2023-05-09T10:02:22-04:00",
        first_name: "Bob",
        last_name: "Norman",
        orders_count: 1,
        state: "disabled",
        total_spent: "199.65",
        last_order_id: 450789469,
        note: null,
        verified_email: true,
        multipass_identifier: null,
        tax_exempt: false,
        tags: "Léon, Noël",
        last_order_name: "#1001",
        currency: "USD",
        phone: "+16136120707",
        accepts_marketing_updated_at: "2005-06-12T11:57:11-04:00",
        marketing_opt_in_level: null,
        tax_exemptions: [],
        email_marketing_consent: {
          state: "not_subscribed",
          opt_in_level: null,
          consent_updated_at: "2004-06-13T11:57:11-04:00",
        },
        sms_marketing_consent: {
          state: "not_subscribed",
          opt_in_level: "single_opt_in",
          consent_updated_at: "2023-05-09T10:02:22-04:00",
          consent_collected_from: "OTHER",
        },
        admin_graphql_api_id: "gid://shopify/Customer/207119551",
        default_address: {
          id: 207119551,
          customer_id: 207119551,
          first_name: null,
          last_name: null,
          company: null,
          address1: "Chestnut Street 92",
          address2: "",
          city: "Louisville",
          province: "Kentucky",
          country: "United States",
          zip: "40202",
          phone: "555-625-1199",
          name: "",
          province_code: "KY",
          country_code: "US",
          country_name: "United States",
          default: true,
        },
      },
    },
  },
  ...genericHeaders,
};

export const createDraftOrderExamplePayload = getDraftOrderExamplePayload;

export const completeDraftOrderExamplePayload = getDraftOrderExamplePayload;

export const deleteDraftOrderExamplePayload = {
  data: {},
  ...genericHeaders,
};

export const deleteProductImageExamplePayload = deleteDraftOrderExamplePayload;

export const deleteMetafieldExamplePayload = deleteDraftOrderExamplePayload;

export const countDraftOrdersExamplePayload = {
  data: {
    count: 5,
  },
  ...genericHeaders,
};

export const countProductImagesExamplePayload = countDraftOrdersExamplePayload;

export const listDraftOrdersExamplePayload = {
  data: {
    draft_orders: [getDraftOrderExamplePayload.data.draft_order],
  },
  ...paginationExtraPayloadData,
};

export const getProductExamplePayload = {
  product: {
    id: 632910392,
    title: "IPod Nano - 8GB",
    body_html:
      "<p>It's the small iPod with one very big idea: Video. Now the world's most popular music player, available in 4GB and 8GB models, lets you enjoy TV shows, movies, video podcasts, and more. The larger, brighter display means amazing picture quality. In six eye-catching colors, iPod nano is stunning all around. And with models starting at just $149, little speaks volumes.</p>",
    vendor: "Apple",
    product_type: "Cult Products",
    created_at: "2023-07-11T17:47:36-04:00",
    handle: "ipod-nano",
    updated_at: "2023-07-11T17:47:36-04:00",
    published_at: "2007-12-31T19:00:00-05:00",
    template_suffix: null,
    status: "active",
    published_scope: "web",
    tags: "Emotive, Flash Memory, MP3, Music",
    admin_graphql_api_id: "gid://shopify/Product/632910392",
    variants: [
      {
        id: 808950810,
        product_id: 632910392,
        title: "Pink",
        price: "199.00",
        sku: "IPOD2008PINK",
        position: 1,
        inventory_policy: "continue",
        compare_at_price: null,
        fulfillment_service: "manual",
        inventory_management: "shopify",
        option1: "Pink",
        option2: null,
        option3: null,
        created_at: "2023-07-11T17:47:36-04:00",
        updated_at: "2023-07-11T17:47:36-04:00",
        taxable: true,
        barcode: "1234_pink",
        grams: 567,
        image_id: 562641783,
        weight: 1.25,
        weight_unit: "lb",
        inventory_item_id: 808950810,
        inventory_quantity: 10,
        old_inventory_quantity: 10,
        presentment_prices: [
          {
            price: {
              amount: "199.00",
              currency_code: "USD",
            },
            compare_at_price: null,
          },
        ],
        requires_shipping: true,
        admin_graphql_api_id: "gid://shopify/ProductVariant/808950810",
      },
    ],
    options: [
      {
        id: 594680422,
        product_id: 632910392,
        name: "Color",
        position: 1,
        values: ["Pink", "Red", "Green", "Black"],
      },
    ],
    images: [
      {
        id: 850703190,
        product_id: 632910392,
        position: 1,
        created_at: "2023-07-11T17:47:36-04:00",
        updated_at: "2023-07-11T17:47:36-04:00",
        alt: null,
        width: 123,
        height: 456,
        src: "https://cdn.shopify.com/s/files/1/0005/4838/0009/products/ipod-nano.png?v=1689112056",
        variant_ids: [],
        admin_graphql_api_id: "gid://shopify/ProductImage/850703190",
      },
    ],
    image: {
      id: 850703190,
      product_id: 632910392,
      position: 1,
      created_at: "2023-07-11T17:47:36-04:00",
      updated_at: "2023-07-11T17:47:36-04:00",
      alt: null,
      width: 123,
      height: 456,
      src: "https://cdn.shopify.com/s/files/1/0005/4838/0009/products/ipod-nano.png?v=1689112056",
      variant_ids: [],
      admin_graphql_api_id: "gid://shopify/ProductImage/850703190",
    },
  },
};

export const createProductExamplePayload = {
  product: {
    id: 1072481093,
    title: "Burton Custom Freestyle 151",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    created_at: "2024-03-21T10:52:29-04:00",
    handle: "burton-custom-freestyle-151",
    updated_at: "2024-03-21T10:52:29-04:00",
    published_at: null,
    template_suffix: null,
    published_scope: "web",
    tags: "",
    status: "draft",
    admin_graphql_api_id: "gid://shopify/Product/1072481093",
    variants: [
      {
        id: 1070325095,
        product_id: 1072481093,
        title: "Default Title",
        price: "0.00",
        sku: "",
        position: 1,
        inventory_policy: "deny",
        compare_at_price: null,
        fulfillment_service: "manual",
        inventory_management: null,
        option1: "Default Title",
        option2: null,
        option3: null,
        created_at: "2024-03-21T10:52:29-04:00",
        updated_at: "2024-03-21T10:52:29-04:00",
        taxable: true,
        barcode: null,
        grams: 0,
        weight: 0,
        weight_unit: "lb",
        inventory_item_id: 1070325095,
        inventory_quantity: 0,
        old_inventory_quantity: 0,
        presentment_prices: [
          {
            price: {
              amount: "0.00",
              currency_code: "USD",
            },
            compare_at_price: null,
          },
        ],
        requires_shipping: true,
        admin_graphql_api_id: "gid://shopify/ProductVariant/1070325095",
        image_id: null,
      },
    ],
    options: [
      {
        id: 1064576574,
        product_id: 1072481093,
        name: "Title",
        position: 1,
        values: ["Default Title"],
      },
    ],
    images: [],
    image: null,
  },
};

export const updateProductExamplePayload = {
  product: {
    id: 632910392,
    title: "IPod Nano - 8GB",
    body_html:
      "<p>It's the small iPod with one very big idea: Video. Now the world's most popular music player, available in 4GB and 8GB models, lets you enjoy TV shows, movies, video podcasts, and more. The larger, brighter display means amazing picture quality. In six eye-catching colors, iPod nano is stunning all around. And with models starting at just $149, little speaks volumes.</p>",
    vendor: "Apple",
    product_type: "Cult Products",
    created_at: "2024-03-21T10:50:49-04:00",
    handle: "ipod-nano",
    updated_at: "2024-03-21T10:53:13-04:00",
    published_at: "2007-12-31T19:00:00-05:00",
    template_suffix: null,
    published_scope: "web",
    tags: "Emotive, Flash Memory, MP3, Music",
    status: "active",
    admin_graphql_api_id: "gid://shopify/Product/632910392",
    variants: [
      {
        id: 808950810,
        product_id: 632910392,
        title: "Pink",
        price: "199.00",
        sku: "IPOD2008PINK",
        position: 1,
        inventory_policy: "continue",
        compare_at_price: null,
        fulfillment_service: "manual",
        inventory_management: "shopify",
        option1: "Pink",
        option2: null,
        option3: null,
        created_at: "2024-03-21T10:50:49-04:00",
        updated_at: "2024-03-21T10:50:49-04:00",
        taxable: true,
        barcode: "1234_pink",
        grams: 567,
        weight: 1.25,
        weight_unit: "lb",
        inventory_item_id: 808950810,
        inventory_quantity: 10,
        old_inventory_quantity: 10,
        presentment_prices: [
          {
            price: {
              amount: "199.00",
              currency_code: "USD",
            },
            compare_at_price: null,
          },
        ],
        requires_shipping: true,
        admin_graphql_api_id: "gid://shopify/ProductVariant/808950810",
        image_id: 562641783,
      },
    ],
    options: [
      {
        id: 594680422,
        product_id: 632910392,
        name: "Color",
        position: 1,
        values: ["Pink", "Red", "Green", "Black"],
      },
    ],
    images: [
      {
        id: 850703190,
        alt: null,
        position: 1,
        product_id: 632910392,
        created_at: "2024-03-21T10:50:49-04:00",
        updated_at: "2024-03-21T10:50:49-04:00",
        admin_graphql_api_id: "gid://shopify/ProductImage/850703190",
        width: 123,
        height: 456,
        src: "https://cdn.shopify.com/s/files/1/0005/4838/0009/products/ipod-nano.png?v=1711032649",
        variant_ids: [],
      },
    ],
    image: {
      id: 850703190,
      alt: null,
      position: 1,
      product_id: 632910392,
      created_at: "2024-03-21T10:50:49-04:00",
      updated_at: "2024-03-21T10:50:49-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/850703190",
      width: 123,
      height: 456,
      src: "https://cdn.shopify.com/s/files/1/0005/4838/0009/products/ipod-nano.png?v=1711032649",
      variant_ids: [],
    },
  },
};

export const listProductsExamplePayload = {
  data: {
    products: [getProductExamplePayload.product],
  },
  ...paginationExtraPayloadData,
};

export const getLocationExamplePayload = {
  data: {
    location: {
      id: 487838322,
      name: "Fifth Avenue AppleStore",
      address1: null,
      address2: null,
      city: null,
      zip: null,
      province: null,
      country: "US",
      phone: null,
      created_at: "2023-07-11T18:32:46-04:00",
      updated_at: "2023-07-11T18:32:46-04:00",
      country_code: "US",
      country_name: "United States",
      province_code: null,
      legacy: false,
      active: true,
      admin_graphql_api_id: "gid://shopify/Location/487838322",
    },
  },
  ...genericHeaders,
};

export const countLocationsExamplePayload = {
  data: {
    count: 5,
  },
  ...genericHeaders,
};

export const countProductsExamplePayload = countLocationsExamplePayload;

export const listLocationsExamplePayload = {
  data: {
    locations: [getLocationExamplePayload.data.location],
  },
  ...paginationExtraPayloadData,
};

export const getProductImagesExamplePayload = {
  data: {
    image: {
      id: 850703190,
      product_id: 632910392,
      position: 1,
      created_at: "2023-07-11T17:47:36-04:00",
      updated_at: "2023-07-11T17:47:36-04:00",
      alt: null,
      width: 123,
      height: 456,
      src: "https://cdn.shopify.com/s/files/1/0005/4838/0009/products/ipod-nano.png?v=1689112056",
      variant_ids: [],
      admin_graphql_api_id: "gid://shopify/ProductImage/850703190",
    },
  },
  ...genericHeaders,
};

export const createProductImageExamplePayload = getProductImagesExamplePayload;

export const listProductImagesExamplePayload = {
  data: {
    images: [getProductImagesExamplePayload.data.image],
  },
  ...genericHeaders,
};

export const getInventoryLevelsExamplePayload = {
  data: {
    inventory_level: {
      inventory_item_id: 457924702,
      location_id: 844681632,
      available: 0,
      updated_at: "2023-07-11T18:02:41-04:00",
      admin_graphql_api_id: "gid://shopify/InventoryLevel/844681632?inventory_item_id=457924702",
    },
  },
  ...genericHeaders,
};

export const deleteInventoryLevelsExamplePayload = {
  data: {},
  ...genericHeaders,
};

export const listInventoryLevelsExamplePayload = {
  data: {
    inventory_levels: [getInventoryLevelsExamplePayload.data.inventory_level],
  },
  ...paginationExtraPayloadData,
};

export const connectInventoryLevelsExamplePayload = {
  data: {
    inventory_level: {
      inventory_item_id: 457924702,
      location_id: 844681632,
      available: 0,
      updated_at: "2024-01-02T08:57:20-05:00",
      admin_graphql_api_id: "gid://shopify/InventoryLevel/844681632?inventory_item_id=457924702",
    },
  },
  ...genericHeaders,
};

export const listCollectsExamplePayload = {
  data: {
    collects: [
      {
        id: 358268117,
        collection_id: 482865238,
        product_id: 632910392,
        created_at: null,
        updated_at: null,
        position: 1,
        sort_value: "0000000001",
      },
    ],
  },
  ...paginationExtraPayloadData,
};

export const getCollectExamplePayload = {
  data: {
    collect: {
      id: 455204334,
      collection_id: 841564295,
      product_id: 632910392,
      created_at: null,
      updated_at: null,
      position: 1,
      sort_value: "0000000001",
    },
  },
  ...genericHeaders,
};

export const countCollectExamplePayload = {
  data: {
    count: 2,
  },
  ...genericHeaders,
};

export const deleteCollectExamplePayload = {
  data: {},
  ...genericHeaders,
};

export const listCurrenciesExamplePayload = {
  data: {
    currencies: [
      {
        currency: "CAD",
        rate_updated_at: "2018-01-23T19:01:01-05:00",
        enabled: true,
      },
      {
        currency: "EUR",
        rate_updated_at: "2018-01-23T19:01:01-05:00",
        enabled: true,
      },
      {
        currency: "JPY",
        rate_updated_at: "2018-01-23T19:01:01-05:00",
        enabled: true,
      },
    ],
  },
};

export const listFulfillmentsExamplePayload = {
  data: {
    fulfillments: [
      {
        id: 255858046,
        order_id: 450789469,
        status: "failure",
        created_at: "2024-01-02T08:59:11-05:00",
        service: "manual",
        updated_at: "2024-01-02T08:59:11-05:00",
        tracking_company: "USPS",
        shipment_status: null,
        location_id: 655441491,
        origin_address: null,
        line_items: [
          {
            id: 466157049,
            variant_id: 39072856,
            title: "IPod Nano - 8gb",
            quantity: 1,
            sku: "IPOD2008GREEN",
            variant_title: "green",
            vendor: null,
            fulfillment_service: "manual",
            product_id: 632910392,
            requires_shipping: true,
            taxable: true,
            gift_card: false,
            name: "IPod Nano - 8gb - green",
            variant_inventory_management: "shopify",
            properties: [
              {
                name: "Custom Engraving Front",
                value: "Happy Birthday",
              },
              {
                name: "Custom Engraving Back",
                value: "Merry Christmas",
              },
            ],
            product_exists: true,
            fulfillable_quantity: 0,
            grams: 200,
            price: "199.00",
            total_discount: "0.00",
            fulfillment_status: null,
            price_set: {
              shop_money: {
                amount: "199.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "199.00",
                currency_code: "USD",
              },
            },
            total_discount_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            discount_allocations: [
              {
                amount: "3.34",
                discount_application_index: 0,
                amount_set: {
                  shop_money: {
                    amount: "3.34",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "3.34",
                    currency_code: "USD",
                  },
                },
              },
            ],
            admin_graphql_api_id: "gid://shopify/LineItem/466157049",
            duties: [],
            tax_lines: [
              {
                price: "3.98",
                rate: 0.06,
                title: "State Tax",
                price_set: {
                  shop_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                  presentment_money: {
                    amount: "3.98",
                    currency_code: "USD",
                  },
                },
                channel_liable: null,
              },
            ],
            fulfillment_line_item_id: 225088298,
          },
        ],
        tracking_number: "1Z2345",
        tracking_numbers: ["1Z2345"],
        tracking_url: "https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=1Z2345",
        tracking_urls: ["https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=1Z2345"],
        receipt: {
          testcase: true,
          authorization: "123456",
        },
        name: "#1001.0",
        admin_graphql_api_id: "gid://shopify/Fulfillment/255858046",
      },
    ],
  },
  ...paginationExtraPayloadData,
};

export const getFulfillmentExamplePayload = {
  data: {
    fulfillment: {
      id: 255858046,
      order_id: 450789469,
      status: "failure",
      created_at: "2024-01-02T08:59:11-05:00",
      service: "manual",
      updated_at: "2024-01-02T08:59:11-05:00",
      tracking_company: "USPS",
      shipment_status: null,
      location_id: 655441491,
      origin_address: null,
      line_items: [
        {
          id: 466157049,
          variant_id: 39072856,
          title: "IPod Nano - 8gb",
          quantity: 1,
          sku: "IPOD2008GREEN",
          variant_title: "green",
          vendor: null,
          fulfillment_service: "manual",
          product_id: 632910392,
          requires_shipping: true,
          taxable: true,
          gift_card: false,
          name: "IPod Nano - 8gb - green",
          variant_inventory_management: "shopify",
          properties: [
            {
              name: "Custom Engraving Front",
              value: "Happy Birthday",
            },
            {
              name: "Custom Engraving Back",
              value: "Merry Christmas",
            },
          ],
          product_exists: true,
          fulfillable_quantity: 0,
          grams: 200,
          price: "199.00",
          total_discount: "0.00",
          fulfillment_status: null,
          price_set: {
            shop_money: {
              amount: "199.00",
              currency_code: "USD",
            },
            presentment_money: {
              amount: "199.00",
              currency_code: "USD",
            },
          },
          total_discount_set: {
            shop_money: {
              amount: "0.00",
              currency_code: "USD",
            },
            presentment_money: {
              amount: "0.00",
              currency_code: "USD",
            },
          },
          discount_allocations: [
            {
              amount: "3.34",
              discount_application_index: 0,
              amount_set: {
                shop_money: {
                  amount: "3.34",
                  currency_code: "USD",
                },
                presentment_money: {
                  amount: "3.34",
                  currency_code: "USD",
                },
              },
            },
          ],
          admin_graphql_api_id: "gid://shopify/LineItem/466157049",
          duties: [],
          tax_lines: [
            {
              price: "3.98",
              rate: 0.06,
              title: "State Tax",
              price_set: {
                shop_money: {
                  amount: "3.98",
                  currency_code: "USD",
                },
                presentment_money: {
                  amount: "3.98",
                  currency_code: "USD",
                },
              },
              channel_liable: null,
            },
          ],
          fulfillment_line_item_id: 225088298,
        },
      ],
      tracking_number: "1Z2345",
      tracking_numbers: ["1Z2345"],
      tracking_url: "https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=1Z2345",
      tracking_urls: ["https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=1Z2345"],
      receipt: {
        testcase: true,
        authorization: "123456",
      },
      name: "#1001.0",
      admin_graphql_api_id: "gid://shopify/Fulfillment/255858046",
    },
  },
  ...genericHeaders,
};

export const listFulfillmentOrdersExamplePayload = {
  data: {
    fulfillment_orders: [
      {
        id: 1046000823,
        shop_id: 548380009,
        order_id: 450789469,
        assigned_location_id: 24826418,
        request_status: "submitted",
        status: "open",
        supported_actions: ["cancel_fulfillment_order"],
        destination: {
          id: 1046000807,
          address1: "Chestnut Street 92",
          address2: "",
          city: "Louisville",
          company: null,
          country: "United States",
          email: "bob.norman@mail.example.com",
          first_name: "Bob",
          last_name: "Norman",
          phone: "+1(502)-459-2181",
          province: "Kentucky",
          zip: "40202",
        },
        line_items: [
          {
            id: 1058737564,
            shop_id: 548380009,
            fulfillment_order_id: 1046000823,
            quantity: 1,
            line_item_id: 518995019,
            inventory_item_id: 49148385,
            fulfillable_quantity: 1,
            variant_id: 49148385,
          },
        ],
        international_duties: null,
        fulfill_at: null,
        fulfill_by: null,
        fulfillment_holds: [],
        created_at: "2024-01-02T09:11:25-05:00",
        updated_at: "2024-01-02T09:11:25-05:00",
        delivery_method: null,
        assigned_location: {
          address1: null,
          address2: null,
          city: null,
          country_code: "DE",
          location_id: 24826418,
          name: "Apple Api Shipwire",
          phone: null,
          province: null,
          zip: null,
        },
        merchant_requests: [],
      },
    ],
  },
};

export const getFulfillmentOrderExamplePayload = {
  data: {
    fulfillment_order: {
      id: 1046000819,
      shop_id: 548380009,
      order_id: 450789469,
      assigned_location_id: 24826418,
      request_status: "submitted",
      status: "open",
      supported_actions: ["cancel_fulfillment_order"],
      destination: {
        id: 1046000803,
        address1: "Chestnut Street 92",
        address2: "",
        city: "Louisville",
        company: null,
        country: "United States",
        email: "bob.norman@mail.example.com",
        first_name: "Bob",
        last_name: "Norman",
        phone: "+1(502)-459-2181",
        province: "Kentucky",
        zip: "40202",
      },
      line_items: [
        {
          id: 1058737560,
          shop_id: 548380009,
          fulfillment_order_id: 1046000819,
          quantity: 1,
          line_item_id: 518995019,
          inventory_item_id: 49148385,
          fulfillable_quantity: 1,
          variant_id: 49148385,
        },
      ],
      international_duties: null,
      fulfill_at: null,
      fulfill_by: null,
      fulfillment_holds: [],
      created_at: "2024-01-02T09:11:20-05:00",
      updated_at: "2024-01-02T09:11:20-05:00",
      delivery_method: null,
      assigned_location: {
        address1: null,
        address2: null,
        city: null,
        country_code: "DE",
        location_id: 24826418,
        name: "Apple Api Shipwire",
        phone: null,
        province: null,
        zip: null,
      },
      merchant_requests: [],
    },
  },
};

export const getInventoryItemExamplePayload = {
  data: {
    inventory_item: {
      id: 808950810,
      sku: "IPOD2008PINK",
      created_at: "2024-01-02T09:28:43-05:00",
      updated_at: "2024-01-02T09:28:43-05:00",
      requires_shipping: true,
      cost: "25.00",
      country_code_of_origin: null,
      province_code_of_origin: null,
      harmonized_system_code: null,
      tracked: true,
      country_harmonized_system_codes: [],
      admin_graphql_api_id: "gid://shopify/InventoryItem/808950810",
    },
  },
  ...genericHeaders,
};

export const listInventoryItemsExamplePayload = {
  data: {
    inventory_items: [
      {
        id: 39072856,
        created_at: "2024-01-02T09:28:43-05:00",
        updated_at: "2024-01-02T09:28:43-05:00",
        requires_shipping: true,
        cost: "25.00",
        country_code_of_origin: null,
        province_code_of_origin: null,
        harmonized_system_code: null,
        tracked: true,
        country_harmonized_system_codes: [],
        admin_graphql_api_id: "gid://shopify/InventoryItem/39072856",
      },
    ],
  },
  ...paginationExtraPayloadData,
};

export const updateInventoryItemsExamplePayload = {
  data: {
    inventory_item: {
      id: 808950810,
      sku: "new sku",
      created_at: "2024-01-02T09:28:43-05:00",
      updated_at: "2024-01-02T09:31:51-05:00",
      requires_shipping: true,
      cost: "25.00",
      country_code_of_origin: null,
      province_code_of_origin: null,
      harmonized_system_code: null,
      tracked: true,
      country_harmonized_system_codes: [],
      admin_graphql_api_id: "gid://shopify/InventoryItem/808950810",
    },
  },
  ...genericHeaders,
};

export const getMetafieldsExamplePayload = {
  data: {
    metafield: {
      id: 721389482,
      namespace: "affiliates",
      key: "app_key",
      value: "app_key",
      description: null,
      owner_id: 548380009,
      created_at: "2024-01-02T08:59:11-05:00",
      updated_at: "2024-01-02T08:59:11-05:00",
      owner_resource: "shop",
      type: "string",
      admin_graphql_api_id: "gid://shopify/Metafield/721389482",
    },
  },
  ...genericHeaders,
};

export const listMetafieldsExamplePayload = {
  data: {
    metafields: [
      {
        id: "example",
        namespace: "example",
        key: "example",
        value: "example",
        description: "This is an example description.",
        owner_id: "example",
        created_at: "2022-03-31T21:33:14-07:00",
        updated_at: "2022-03-31T21:33:14-07:00",
        owner_resource: "shop",
        type: "ingle_line_text_field",
      },
    ],
  },
  ...paginationExtraPayloadData,
};

export const createMetafieldExamplePayload = {
  data: {
    metafield: {
      id: 1069228982,
      namespace: "my_fields",
      key: "my_items",
      value: '{"items":["some item"]}',
      description: null,
      owner_id: 548380009,
      created_at: "2024-01-02T09:09:54-05:00",
      updated_at: "2024-01-02T09:09:54-05:00",
      owner_resource: "shop",
      type: "json",
      admin_graphql_api_id: "gid://shopify/Metafield/1069228982",
    },
  },
  ...genericHeaders,
};

export const updateMetafieldExamplePayload = {
  data: {
    metafield: {
      value: '["something new"]',
      owner_id: 548380009,
      namespace: "affiliates",
      key: "app_key",
      id: 721389482,
      description: null,
      created_at: "2024-01-02T08:59:11-05:00",
      updated_at: "2024-01-02T09:08:44-05:00",
      owner_resource: "shop",
      type: "list.single_line_text_field",
      admin_graphql_api_id: "gid://shopify/Metafield/721389482",
    },
  },
  ...genericHeaders,
};

export const listOrdersExamplePayload = {
  data: {
    orders: [
      {
        id: 12345678912345,
        admin_graphql_api_id: "gid://shopify/Order/12345678912345",
        app_id: 123456,
        browser_ip: "192.168.0.1",
        buyer_accepts_marketing: false,
        cancel_reason: null,
        cancelled_at: null,
        cart_token: null,
        checkout_id: 30873867714713,
        checkout_token: "c0a38ddd2c577019041f04b17fe53761",
        client_details: {
          accept_language: null,
          browser_height: null,
          browser_ip: "192.168.0.1",
          browser_width: null,
          session_hash: null,
          user_agent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        },
        closed_at: null,
        company: null,
        confirmed: true,
        contact_email: null,
        created_at: "2024-03-06T14:31:14-07:00",
        currency: "USD",
        current_subtotal_price: "0.00",
        current_subtotal_price_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        current_total_additional_fees_set: null,
        current_total_discounts: "0.00",
        current_total_discounts_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        current_total_duties_set: null,
        current_total_price: "0.00",
        current_total_price_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        current_total_tax: "0.00",
        current_total_tax_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        customer_locale: "en",
        device_id: null,
        discount_codes: [],
        email: "",
        estimated_taxes: false,
        financial_status: "paid",
        fulfillment_status: null,
        landing_site: null,
        landing_site_ref: null,
        location_id: 65947994123,
        merchant_of_record_app_id: null,
        name: "#1157",
        note: null,
        note_attributes: [],
        number: 157,
        order_number: 1157,
        order_status_url:
          "https://test-store.myshopify.com/60628201234/orders/abcdef12345/authenticate?key=e79e76cb7634bee51d1d70fd8fbf2840",
        original_total_additional_fees_set: null,
        original_total_duties_set: null,
        payment_gateway_names: [],
        phone: null,
        presentment_currency: "USD",
        processed_at: "2024-03-06T14:31:13-07:00",
        reference: "6b89108234e53714356e05091234567",
        referring_site: null,
        source_identifier: "6b89108234e53714356e05091234567",
        source_name: "shopify_draft_order",
        source_url: null,
        subtotal_price: "0.00",
        subtotal_price_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        tags: "",
        tax_lines: [],
        taxes_included: false,
        test: false,
        token: "abcdef12345",
        total_discounts: "0.00",
        total_discounts_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        total_line_items_price: "0.00",
        total_line_items_price_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        total_outstanding: "0.00",
        total_price: "0.00",
        total_price_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        total_shipping_price_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        total_tax: "0.00",
        total_tax_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD",
          },
        },
        total_tip_received: "0.00",
        total_weight: 0,
        updated_at: "2024-03-06T14:31:15-07:00",
        user_id: 987654321,
        billing_address: null,
        customer: null,
        discount_applications: [],
        fulfillments: [],
        line_items: [
          {
            id: 456789123,
            admin_graphql_api_id: "gid://shopify/LineItem/456789123",
            fulfillable_quantity: 1,
            fulfillment_service: "manual",
            fulfillment_status: null,
            gift_card: false,
            grams: 0,
            name: "Shirt - Blue / Small",
            price: "0.00",
            price_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            product_exists: true,
            product_id: 7733213712345,
            properties: [],
            quantity: 1,
            requires_shipping: true,
            sku: "",
            taxable: true,
            title: "Shirt",
            total_discount: "0.00",
            total_discount_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            variant_id: 43449939394713,
            variant_inventory_management: null,
            variant_title: "Blue / Small",
            vendor: "Acme",
            tax_lines: [],
            duties: [],
            discount_allocations: [],
          },
          {
            id: 13397695332505,
            admin_graphql_api_id: "gid://shopify/LineItem/13397695332505",
            fulfillable_quantity: 1,
            fulfillment_service: "manual",
            fulfillment_status: null,
            gift_card: false,
            grams: 0,
            name: "Shirt - Black / Small",
            price: "0.00",
            price_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            product_exists: true,
            product_id: 7733213712345,
            properties: [],
            quantity: 1,
            requires_shipping: true,
            sku: "",
            taxable: true,
            title: "Shirt",
            total_discount: "0.00",
            total_discount_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD",
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD",
              },
            },
            variant_id: 43449939427481,
            variant_inventory_management: null,
            variant_title: "Black / Small",
            vendor: "Acme",
            tax_lines: [],
            duties: [],
            discount_allocations: [],
          },
        ],
        payment_terms: null,
        refunds: [],
        shipping_address: null,
        shipping_lines: [],
      },
    ],
  },
  ...paginationExtraPayloadData,
};

export const getShopConfigExamplePayload = {
  data: {
    shop: {
      id: 548380009,
      name: "John Smith Test Store",
      email: "j.smith@example.com",
      domain: "shop.apple.com",
      province: "California",
      country: "US",
      address1: "1 Infinite Loop",
      zip: "95014",
      city: "Cupertino",
      source: null,
      phone: "1231231234",
      latitude: 45.45,
      longitude: -75.43,
      primary_locale: "en",
      address2: "Suite 100",
      created_at: "2007-12-31T19:00:00-05:00",
      updated_at: "2024-02-14T10:58:03-05:00",
      country_code: "US",
      country_name: "United States",
      currency: "USD",
      customer_email: "customers@apple.com",
      timezone: "(GMT-05:00) Eastern Time (US & Canada)",
      iana_timezone: "America/New_York",
      shop_owner: "John Smith",
      money_format: "${{amount}}",
      money_with_currency_format: "${{amount}} USD",
      weight_unit: "lb",
      province_code: "CA",
      taxes_included: null,
      auto_configure_tax_inclusivity: null,
      tax_shipping: null,
      county_taxes: true,
      plan_display_name: "Shopify Plus",
      plan_name: "enterprise",
      has_discounts: true,
      has_gift_cards: true,
      myshopify_domain: "jsmith.myshopify.com",
      google_apps_domain: null,
      google_apps_login_enabled: null,
      money_in_emails_format: "${{amount}}",
      money_with_currency_in_emails_format: "${{amount}} USD",
      eligible_for_payments: true,
      requires_extra_payments_agreement: false,
      password_enabled: false,
      has_storefront: true,
      finances: true,
      primary_location_id: 655441491,
      checkout_api_supported: true,
      multi_location_enabled: true,
      setup_required: false,
      pre_launch_enabled: false,
      enabled_presentment_currencies: ["USD"],
      transactional_sms_disabled: false,
      marketing_sms_consent_enabled_at_checkout: false,
    },
  },
};

export const listVariantsExamplePayload = {
  data: {
    variants: [
      {
        id: 39072856,
        product_id: 632910392,
        title: "Green",
        price: "199.00",
        sku: "IPOD2008GREEN",
        position: 3,
        inventory_policy: "continue",
        compare_at_price: null,
        fulfillment_service: "manual",
        inventory_management: "shopify",
        option1: "Green",
        option2: null,
        option3: null,
        created_at: "2024-01-02T08:59:11-05:00",
        updated_at: "2024-01-02T08:59:11-05:00",
        taxable: true,
        barcode: "1234_green",
        grams: 567,
        image_id: null,
        weight: 1.25,
        weight_unit: "lb",
        inventory_item_id: 39072856,
        inventory_quantity: 30,
        old_inventory_quantity: 30,
        presentment_prices: [
          {
            price: {
              amount: "199.00",
              currency_code: "USD",
            },
            compare_at_price: null,
          },
        ],
        requires_shipping: true,
        admin_graphql_api_id: "gid://shopify/ProductVariant/39072856",
      },
    ],
  },
  ...paginationExtraPayloadData,
};

export const getVariantExamplePayload = {
  variant: {
    id: 808950810,
    product_id: 632910392,
    title: "Pink",
    price: "199.00",
    sku: "IPOD2008PINK",
    position: 1,
    inventory_policy: "continue",
    compare_at_price: null,
    fulfillment_service: "manual",
    inventory_management: "shopify",
    option1: "Pink",
    option2: null,
    option3: null,
    created_at: "2024-01-02T08:59:11-05:00",
    updated_at: "2024-01-02T08:59:11-05:00",
    taxable: true,
    barcode: "1234_pink",
    grams: 567,
    image_id: 562641783,
    weight: 1.25,
    weight_unit: "lb",
    inventory_item_id: 808950810,
    inventory_quantity: 10,
    old_inventory_quantity: 10,
    presentment_prices: [
      {
        price: {
          amount: "199.00",
          currency_code: "USD",
        },
        compare_at_price: null,
      },
    ],
    tax_code: "DA040000",
    requires_shipping: true,
    admin_graphql_api_id: "gid://shopify/ProductVariant/808950810",
  },
};

export const updateVariantExamplePayload = {
  variant: {
    id: 808950810,
    product_id: 632910392,
    title: "Pink",
    price: "199.00",
    sku: "IPOD2008PINK",
    position: 1,
    inventory_policy: "continue",
    compare_at_price: null,
    fulfillment_service: "manual",
    inventory_management: "shopify",
    option1: "Pink",
    option2: null,
    option3: null,
    created_at: "2024-01-02T08:59:11-05:00",
    updated_at: "2024-01-02T08:59:11-05:00",
    taxable: true,
    barcode: "1234_pink",
    grams: 567,
    image_id: 562641783,
    weight: 1.25,
    weight_unit: "lb",
    inventory_item_id: 808950810,
    inventory_quantity: 10,
    old_inventory_quantity: 10,
    presentment_prices: [
      {
        price: {
          amount: "199.00",
          currency_code: "USD",
        },
        compare_at_price: null,
      },
    ],
    requires_shipping: true,
    admin_graphql_api_id: "gid://shopify/ProductVariant/808950810",
  },
};

export const createVariantExamplePayload = {
  variant: {
    id: 1070325039,
    product_id: 632910392,
    title: "Yellow",
    price: "1.00",
    sku: "",
    position: 5,
    inventory_policy: "deny",
    compare_at_price: null,
    fulfillment_service: "manual",
    inventory_management: "shopify",
    option1: "Yellow",
    option2: null,
    option3: null,
    created_at: "2024-01-02T09:12:05-05:00",
    updated_at: "2024-01-02T09:12:05-05:00",
    taxable: true,
    barcode: null,
    grams: 0,
    image_id: null,
    weight: 0,
    weight_unit: "lb",
    inventory_item_id: 1070325039,
    inventory_quantity: 0,
    old_inventory_quantity: 0,
    presentment_prices: [
      {
        price: {
          amount: "1.00",
          currency_code: "USD",
        },
        compare_at_price: null,
      },
    ],
    requires_shipping: true,
    admin_graphql_api_id: "gid://shopify/ProductVariant/1070325039",
  },
};

export const listWebhooksExamplePayload = [
  {
    id: 4759306,
    address: "https://apple.com",
    topic: "orders/create",
    created_at: "2024-03-14T13:44:21-04:00",
    updated_at: "2024-03-14T13:44:21-04:00",
    format: "json",
    fields: [],
    metafield_namespaces: [],
    api_version: "unstable",
    private_metafield_namespaces: [],
  },
];

export const createWebhookExamplePayload = {
  webhook: {
    id: 8099884584,
    address: "pubsub://projectName:topicName",
    topic: "customers/update",
    created_at: "2024-03-14T13:45:35-04:00",
    updated_at: "2024-03-14T13:45:35-04:00",
    format: "json",
    fields: [],
    metafield_namespaces: [],
    api_version: "unstable",
    private_metafield_namespaces: [],
  },
};

export const listFulfillmentServicesExamplePayload = {
  fulfillment_services: [
    {
      id: 611870435,
      name: "Venus Fulfillment",
      email: null,
      service_name: "Venus Fulfillment",
      handle: "venus-fulfillment",
      fulfillment_orders_opt_in: false,
      include_pending_stock: false,
      provider_id: null,
      location_id: 611870435,
      callback_url: null,
      tracking_support: true,
      inventory_management: true,
      admin_graphql_api_id: "gid://shopify/ApiFulfillmentService/611870435",
    },
  ],
};

export const getFulfillmentServiceExamplePayload = {
  fulfillment_service: {
    id: 755357713,
    name: "Mars Fulfillment",
    email: null,
    service_name: "Mars Fulfillment",
    handle: "mars-fulfillment",
    fulfillment_orders_opt_in: true,
    include_pending_stock: false,
    provider_id: null,
    location_id: 24826418,
    callback_url: "http://google.com/",
    tracking_support: true,
    inventory_management: true,
    admin_graphql_api_id: "gid://shopify/ApiFulfillmentService/755357713",
  },
};

export const updateFulfillmentServiceExamplePayload = getFulfillmentServiceExamplePayload;

export const createFulfillmentServiceExamplePayload = {
  fulfillment_service: {
    id: 1061774510,
    name: "Jupiter Fulfillment",
    email: null,
    service_name: "Jupiter Fulfillment",
    handle: "jupiter-fulfillment",
    fulfillment_orders_opt_in: true,
    include_pending_stock: false,
    provider_id: null,
    location_id: 1072404565,
    callback_url: "http://google.com/",
    tracking_support: true,
    inventory_management: true,
    admin_graphql_api_id: "gid://shopify/ApiFulfillmentService/1061774510",
    permits_sku_sharing: true,
  },
};

export const createOrderExamplePayload = {
  order: {
    id: 1073459963,
    admin_graphql_api_id: "gid://shopify/Order/1073459963",
    app_id: 755357713,
    browser_ip: null,
    buyer_accepts_marketing: false,
    cancel_reason: null,
    cancelled_at: null,
    cart_token: null,
    checkout_id: null,
    checkout_token: null,
    client_details: null,
    closed_at: null,
    confirmation_number: "Z5NDCZ8N0",
    confirmed: true,
    contact_email: null,
    created_at: "2024-01-09T13:56:01-05:00",
    currency: "EUR",
    current_subtotal_price: "224.97",
    current_subtotal_price_set: {
      shop_money: {
        amount: "224.97",
        currency_code: "EUR",
      },
      presentment_money: {
        amount: "224.97",
        currency_code: "EUR",
      },
    },
    current_total_additional_fees_set: null,
    current_total_discounts: "0.00",
    current_total_discounts_set: {
      shop_money: {
        amount: "0.00",
        currency_code: "EUR",
      },
      presentment_money: {
        amount: "0.00",
        currency_code: "EUR",
      },
    },
    current_total_duties_set: null,
    current_total_price: "238.47",
    current_total_price_set: {
      shop_money: {
        amount: "238.47",
        currency_code: "EUR",
      },
      presentment_money: {
        amount: "238.47",
        currency_code: "EUR",
      },
    },
    current_total_tax: "13.50",
    current_total_tax_set: {
      shop_money: {
        amount: "13.50",
        currency_code: "EUR",
      },
      presentment_money: {
        amount: "13.50",
        currency_code: "EUR",
      },
    },
    customer_locale: null,
    device_id: null,
    discount_codes: [],
    email: "",
    estimated_taxes: false,
    financial_status: "paid",
    fulfillment_status: null,
    landing_site: null,
    landing_site_ref: null,
    location_id: null,
    merchant_of_record_app_id: null,
    name: "#1002",
    note: null,
    note_attributes: [],
    number: 2,
    order_number: 1002,
    order_status_url:
      "https://jsmith.myshopify.com/548380009/orders/8800b154fc486b0c822b5002c3ed32cf/authenticate?key=4623f134ade1820ef93af9c280e6b4eb",
    original_total_additional_fees_set: null,
    original_total_duties_set: null,
    payment_gateway_names: [""],
    phone: null,
    po_number: null,
    presentment_currency: "EUR",
    processed_at: "2024-01-09T13:56:01-05:00",
    reference: null,
    referring_site: null,
    source_identifier: null,
    source_name: "755357713",
    source_url: null,
    subtotal_price: "224.97",
    subtotal_price_set: {
      shop_money: {
        amount: "224.97",
        currency_code: "EUR",
      },
      presentment_money: {
        amount: "224.97",
        currency_code: "EUR",
      },
    },
    tags: "",
    tax_exempt: false,
    tax_lines: [
      {
        price: "13.50",
        rate: 0.06,
        title: "State tax",
        price_set: {
          shop_money: {
            amount: "13.50",
            currency_code: "EUR",
          },
          presentment_money: {
            amount: "13.50",
            currency_code: "EUR",
          },
        },
        channel_liable: false,
      },
    ],
    taxes_included: false,
    test: false,
    token: "8800b154fc486b0c822b5002c3ed32cf",
    total_discounts: "0.00",
    total_discounts_set: {
      shop_money: {
        amount: "0.00",
        currency_code: "EUR",
      },
      presentment_money: {
        amount: "0.00",
        currency_code: "EUR",
      },
    },
    total_line_items_price: "224.97",
    total_line_items_price_set: {
      shop_money: {
        amount: "224.97",
        currency_code: "EUR",
      },
      presentment_money: {
        amount: "224.97",
        currency_code: "EUR",
      },
    },
    total_outstanding: "0.00",
    total_price: "238.47",
    total_price_set: {
      shop_money: {
        amount: "238.47",
        currency_code: "EUR",
      },
      presentment_money: {
        amount: "238.47",
        currency_code: "EUR",
      },
    },
    total_shipping_price_set: {
      shop_money: {
        amount: "0.00",
        currency_code: "EUR",
      },
      presentment_money: {
        amount: "0.00",
        currency_code: "EUR",
      },
    },
    total_tax: "13.50",
    total_tax_set: {
      shop_money: {
        amount: "13.50",
        currency_code: "EUR",
      },
      presentment_money: {
        amount: "13.50",
        currency_code: "EUR",
      },
    },
    total_tip_received: "0.00",
    total_weight: 0,
    updated_at: "2024-01-09T13:56:01-05:00",
    user_id: null,
    billing_address: null,
    customer: null,
    discount_applications: [],
    fulfillments: [],
    line_items: [
      {
        id: 1071823173,
        admin_graphql_api_id: "gid://shopify/LineItem/1071823173",
        current_quantity: 3,
        fulfillable_quantity: 3,
        fulfillment_service: "manual",
        fulfillment_status: null,
        gift_card: false,
        grams: 1300,
        name: "Big Brown Bear Boots",
        price: "74.99",
        price_set: {
          shop_money: {
            amount: "74.99",
            currency_code: "EUR",
          },
          presentment_money: {
            amount: "74.99",
            currency_code: "EUR",
          },
        },
        product_exists: false,
        product_id: null,
        properties: [],
        quantity: 3,
        requires_shipping: true,
        sku: null,
        taxable: true,
        title: "Big Brown Bear Boots",
        total_discount: "0.00",
        total_discount_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "EUR",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "EUR",
          },
        },
        variant_id: null,
        variant_inventory_management: null,
        variant_title: null,
        vendor: null,
        tax_lines: [
          {
            channel_liable: false,
            price: "13.50",
            price_set: {
              shop_money: {
                amount: "13.50",
                currency_code: "EUR",
              },
              presentment_money: {
                amount: "13.50",
                currency_code: "EUR",
              },
            },
            rate: 0.06,
            title: "State tax",
          },
        ],
        duties: [],
        discount_allocations: [],
      },
    ],
    payment_terms: null,
    refunds: [],
    shipping_address: null,
    shipping_lines: [],
  },
};
