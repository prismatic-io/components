const pageInfo = {
  hasNextPage: false,
  endCursor: "YXJyYXljb25uZWN0aW9uOjA=",
};

const examplePaginationMapRest = {
  pagination: {
    next: {
      page_info: "YXJyYXljb25uZWN0aW9uOjA=",
      rel: "next",
    },
  },
  pageInfo: "YXJyYXljb25uZWN0aW9uOjA=",
  rel: 'rel="next"',
};
export const listCurrenciesExamplePayload = {
  data: {
    currencies: [
      {
        currencyCode: "CAD",
        rateUpdatedAt: "2018-01-24T00:01:01Z",
        enabled: false,
      },
    ],
    pageInfo,
  },
};

export const countCustomersExamplePayload = {
  data: {
    count: 20,
  },
};

export const createAccountActivationURLExamplePayload = {
  data: {
    accountActivationUrl: "https://activation.example.com",
    userErrors: [],
  },
};

const exampleCustomer = {
  id: "gid://shopify/Customer/8000000000000",
  email: "example@example.com",
  createdAt: "2025-01-07T09:32:23Z",
  updatedAt: "2025-01-07T09:32:23Z",
  firstName: "John",
  lastName: "Doe",
  state: "DISABLED",
  lastOrder: null,
  note: null,
  verifiedEmail: true,
  multipassIdentifier: null,
  taxExempt: false,
  tags: [],
  phone: "+18000000000",
  addresses: [
    {
      id: "gid://shopify/MailingAddress/9000000000000?model_name=CustomerAddress",
      firstName: "Jane",
      lastName: "Smith",
      company: "Example Corp",
      address1: "456 Oak Avenue",
      address2: "Suite 12",
      city: "Metropolis",
      province: "California",
      country: "United States",
      zip: "90210",
      phone: "555-000-0000",
      name: "Jane Smith",
      provinceCode: "CA",
      countryCodeV2: "US",
    },
  ],
  taxExemptions: [],
  emailMarketingConsent: {
    marketingState: "NOT_SUBSCRIBED",
    marketingOptInLevel: "SINGLE_OPT_IN",
    consentUpdatedAt: null,
  },
  smsMarketingConsent: {
    marketingState: "NOT_SUBSCRIBED",
    marketingOptInLevel: "SINGLE_OPT_IN",
    consentUpdatedAt: null,
    consentCollectedFrom: "OTHER",
  },
  defaultAddress: {
    id: "gid://shopify/MailingAddress/9000000000000?model_name=CustomerAddress",
    firstName: "Jane",
    lastName: "Smith",
    company: "Example Corp",
    address1: "456 Oak Avenue",
    address2: "Suite 12",
    city: "Metropolis",
    province: "California",
    country: "United States",
    zip: "90210",
    phone: "555-000-0000",
    name: "Jane Smith",
    provinceCode: "CA",
    countryCodeV2: "US",
  },
};

const exampleCustomerMapRest = {
  id: 8000000000000,
  email: "example@example.com",
  created_at: "2025-01-07T09:32:23Z",
  updated_at: "2025-01-07T09:32:23Z",
  first_name: "John",
  last_name: "Doe",
  state: "DISABLED",
  last_order_id: null,
  note: null,
  verified_email: true,
  multipass_identifier: null,
  tax_exempt: false,
  tags: "",
  last_order_name: null,
  phone: "+18000000000",
  addresses: [
    {
      id: null,
      customer_id: 8000000000000,
      first_name: "Jane",
      last_name: "Smith",
      company: "Example Corp",
      address1: "456 Oak Avenue",
      address2: "Suite 12",
      city: "Metropolis",
      province: "California",
      country: "United States",
      zip: "90210",
      phone: "555-000-0000",
      name: "Jane Smith",
      province_code: "CA",
      country_code: "US",
      country_name: "United States",
    },
  ],
  tax_exemptions: [],
  email_marketing_consent: {
    state: "NOT_SUBSCRIBED",
    opt_in_level: "SINGLE_OPT_IN",
    consent_updated_at: null,
  },
  sms_marketing_consent: {
    state: "NOT_SUBSCRIBED",
    opt_in_level: "SINGLE_OPT_IN",
    consent_updated_at: null,
    consent_collected_from: "OTHER",
  },
  admin_graphql_api_id: "gid://shopify/Customer/8000000000000",
  default_address: {
    id: null,
    customer_id: 8000000000000,
    first_name: "Jane",
    last_name: "Smith",
    company: "Example Corp",
    address1: "456 Oak Avenue",
    address2: "Suite 12",
    city: "Metropolis",
    province: "California",
    country: "United States",
    zip: "90210",
    phone: "555-000-0000",
    name: "Jane Smith",
    province_code: "CA",
    country_code: "US",
    country_name: "United States",
  },
};

export const createCustomerExamplePayload = {
  graphql: {
    data: {
      userErrors: [],
      customer: exampleCustomer,
    },
  },
  restMap: {
    data: {
      customer: exampleCustomerMapRest,
    },
  },
};

export const getCustomerExamplePayload = {
  graphql: {
    data: {
      customer: exampleCustomer,
    },
  },
  restMap: {
    data: {
      customer: exampleCustomerMapRest,
    },
  },
};

export const deleteCustomerExamplePayload = {
  graphql: {
    data: {
      userErrors: [],
      deletedCustomerId: "gid://shopify/Customer/105906728",
    },
  },
  restMap: {
    data: {},
  },
};

export const listCustomersExamplePayload = {
  graphql: {
    data: {
      customers: [exampleCustomer],
      pageInfo,
    },
  },
  restMap: {
    data: {
      data: { customers: [exampleCustomerMapRest] },
      ...examplePaginationMapRest,
    },
  },
};

export const updateCustomerExamplePayload = {
  data: {
    userErrors: [],
    customer: exampleCustomer,
  },
};

const exampleDraftOrder = {
  id: "gid://shopify/DraftOrder/1234567890123",
  note2: "Sample Note",
  email: "example@email.com",
  taxesIncluded: false,
  currencyCode: "USD",
  invoiceSentAt: null,
  createdAt: "2024-12-31T07:30:32Z",
  updatedAt: "2024-12-31T07:30:33Z",
  taxExempt: true,
  completedAt: "2024-12-31T07:30:33Z",
  name: "#D123",
  status: "COMPLETED",
  lineItems: {
    nodes: [
      {
        id: "gid://shopify/DraftOrderLineItem/9876543210987",
        variant: null,
        product: null,
        title: "Example Product",
        variantTitle: null,
        sku: null,
        vendor: null,
        quantity: 3,
        requiresShipping: false,
        taxable: true,
        isGiftCard: false,
        fulfillmentService: {
          type: "MANUAL",
        },
        weight: {
          unit: "KILOGRAMS",
          value: 2,
        },
        taxLines: [
          {
            channelLiable: null,
            priceSet: {
              shopMoney: {
                amount: "0.0",
                currencyCode: "USD",
              },
            },
            rate: 0.05,
            ratePercentage: 5,
            source: "Shopify",
            title: "Example State Tax",
          },
        ],
        appliedDiscount: {
          title: "Promo",
          value: 10,
          valueType: "PERCENTAGE",
          description: "Seasonal Discount",
          amountSet: {
            shopMoney: {
              amount: "5.00",
              currencyCode: "USD",
            },
          },
        },
        name: "Example Product",
        custom: true,
        originalUnitPriceSet: {
          shopMoney: {
            currencyCode: "USD",
            amount: "20.00",
          },
        },
      },
    ],
  },
  shippingAddress: {
    firstName: "John",
    address1: "123 Example St",
    phone: "123-456-7890",
    city: "Example City",
    zip: "12345",
    province: "California",
    country: "United States",
    lastName: "Doe",
    address2: "Apt 101",
    company: "Example Corp",
    latitude: null,
    longitude: null,
    name: "John Doe",
    countryCodeV2: "US",
    provinceCode: "CA",
  },
  billingAddress: {
    firstName: "John",
    address1: "123 Example St",
    phone: "123-456-7890",
    city: "Example City",
    zip: "12345",
    province: "California",
    country: "United States",
    lastName: "Doe",
    address2: "Apt 101",
    company: "Example Corp",
    latitude: null,
    longitude: null,
    name: "John Doe",
    countryCodeV2: "US",
    provinceCode: "CA",
  },
  invoiceUrl: "https://example-store.myshopify.com/123456/invoices/abcdef123456",
  appliedDiscount: null,
  order: {
    id: "gid://shopify/Order/8765432109876",
  },
  shippingLine: null,
  taxLines: [],
  tags: [],
  totalPriceSet: {
    shopMoney: {
      amount: "60.00",
      currencyCode: "USD",
    },
  },
  subtotalPriceSet: {
    shopMoney: {
      amount: "60.00",
      currencyCode: "USD",
    },
  },
  totalTaxSet: {
    shopMoney: {
      amount: "0.0",
      currencyCode: "USD",
    },
  },
  paymentTerms: null,
  customer: {
    id: "gid://shopify/Customer/1234567890123",
    email: "example@email.com",
    createdAt: "2022-01-01T10:00:00Z",
    updatedAt: "2024-12-31T07:30:33Z",
    firstName: "John",
    lastName: "Doe",
    numberOfOrders: "5",
    state: "ENABLED",
    amountSpent: {
      amount: "500.00",
      currencyCode: "USD",
    },
    lastOrder: {
      id: "gid://shopify/Order/8765432109876",
      name: "#5678",
    },
    note: null,
    verifiedEmail: true,
    multipassIdentifier: null,
    taxExempt: false,
    tags: [],
    phone: "123-456-7890",
    taxExemptions: [],
    emailMarketingConsent: {
      marketingState: "SUBSCRIBED",
      consentUpdatedAt: null,
    },
    smsMarketingConsent: null,
    defaultAddress: {
      id: "gid://shopify/MailingAddress/9876543210987",
      firstName: "John",
      lastName: "Doe",
      company: "Example Corp",
      address1: "123 Example St",
      address2: "Apt 101",
      city: "Example City",
      province: "California",
      country: "United States",
      zip: "12345",
      phone: "123-456-7890",
      name: "John Doe",
      provinceCode: "CA",
      countryCodeV2: "US",
    },
  },
};

const exampleDraftOrderMapRest = {
  id: 1234567890,
  note: null,
  email: "example@example.com",
  taxes_included: false,
  currency: "USD",
  invoice_sent_at: null,
  created_at: "2022-02-16T18:49:34Z",
  updated_at: "2022-02-16T18:49:34Z",
  tax_exempt: false,
  completed_at: null,
  name: "#D1",
  status: "OPEN",
  line_items: [
    {
      id: 9876543210,
      variant_id: null,
      product_id: null,
      title: "Example Product",
      variant_title: null,
      sku: "EXAMPLE-SKU",
      vendor: "Example Vendor",
      quantity: 1,
      requires_shipping: true,
      taxable: true,
      gift_card: false,
      fulfillment_service: "MANUAL",
      tax_lines: [
        {
          channel_liable: null,
          rate: 0.045,
          title: "Example State Tax",
          price_set: {
            shop_money: {
              amount: "0.54",
              currency_code: "USD",
            },
          },
          price: "0.54",
        },
      ],
      applied_discount: null,
      name: "Example Line Item",
      custom: true,
      original_unit_price: "12.0",
      admin_graphql_api_id: "gid://shopify/DraftOrderLineItem/9876543210",
    },
  ],
  shipping_address: {
    first_name: "John",
    last_name: "Doe",
    address1: "123 Example St",
    address2: null,
    city: "Example City",
    province: "Example Province",
    country: "Example Country",
    zip: "12345",
    phone: "123-456-7890",
  },
  billing_address: {
    first_name: "Jane",
    last_name: "Smith",
    address1: "456 Example Ave",
    address2: null,
    city: "Example City",
    province: "Example Province",
    country: "Example Country",
    zip: "67890",
    phone: "987-654-3210",
  },
  invoice_url: "https://example-store.myshopify.com/invoices/exampleInvoiceId",
  applied_discount: null,
  order_id: null,
  shipping_line: null,
  tax_lines: [
    {
      rate: 0.045,
      rate_percentage: 4.5,
      source: null,
      price_set: {
        shop_money: {
          amount: "0.54",
          currency_code: "USD",
        },
      },
      price: "0.54",
      channel_liable: null,
      title: "Example State Tax",
    },
  ],
  tags: "",
  total_price: "12.78",
  subtotal_price: "12.0",
  total_tax: "0.78",
  payment_terms: null,
  customer: {
    id: 1122334455,
    email: "customer@example.com",
    first_name: "Alice",
    last_name: "Johnson",
    phone: "111-222-3333",
  },
  admin_graphql_api_id: "gid://shopify/DraftOrder/1234567890",
};

export const completeDraftOrderExamplePayload = {
  data: {
    draftOrder: exampleDraftOrder,
    userErrors: [],
  },
};

export const createDraftOrderExamplePayload = {
  data: {
    userErrors: [],
    draftOrder: exampleDraftOrder,
  },
};

export const deleteDraftOrderExamplePayload = {
  data: {
    deletedId: "gid://shopify/DraftOrder/276395349",
    userErrors: [],
  },
};

export const getDraftOrderExamplePayload = {
  data: {
    draftOrder: exampleDraftOrder,
  },
};

export const listDraftOrdersExamplePayload = {
  graphql: {
    data: {
      draftOrders: [exampleDraftOrder],
      pageInfo,
    },
  },
  restMap: {
    data: {
      data: { draft_orders: [exampleDraftOrderMapRest] },
      ...examplePaginationMapRest,
    },
  },
};

const exampleFulfillment = {
  id: "gid://shopify/Fulfillment/1234567890",
  order: {
    id: "gid://shopify/Order/9876543210",
  },
  status: "SUCCESS",
  createdAt: "2024-12-30T12:00:00Z",
  updatedAt: "2024-12-31T08:00:00Z",
  service: {
    type: "MANUAL",
  },
  trackingInfo: [
    {
      company: "FedEx",
      number: "987654321012",
      url: "https://www.fedex.com/fedextrack/?tracknumbers=987654321012",
    },
  ],
  location: {
    id: "gid://shopify/Location/1122334455",
  },
  originAddress: {
    address1: "500 Example Blvd",
    address2: "Suite 400",
    city: "Example City",
    countryCode: "US",
    provinceCode: "CA",
    zip: "90001",
  },
  fulfillmentLineItems: {
    nodes: [
      {
        id: "gid://shopify/FulfillmentLineItem/5432109876",
        lineItem: {
          title: "Example Product A",
          quantity: 1,
          originalUnitPriceSet: {
            shopMoney: {
              amount: "50.00",
              currencyCode: "USD",
            },
            presentmentMoney: {
              amount: "50.00",
              currencyCode: "USD",
            },
          },
          totalDiscountSet: {
            shopMoney: {
              amount: "5.00",
              currencyCode: "USD",
            },
            presentmentMoney: {
              amount: "5.00",
              currencyCode: "USD",
            },
          },
          discountAllocations: [
            {
              allocatedAmountSet: {
                shopMoney: {
                  amount: "5.00",
                  currencyCode: "USD",
                },
              },
              discountApplication: {
                index: 1,
              },
            },
          ],
          duties: [],
          discountedTotalSet: {
            shopMoney: {
              amount: "45.00",
            },
          },
          variant: {
            title: "Variant A",
            id: "gid://shopify/ProductVariant/11223344",
            price: "50.00",
            product: {
              id: "gid://shopify/Product/55667788",
            },
          },
          requiresShipping: true,
          vendor: "Example Vendor",
          sku: "EXM-001",
          taxable: true,
          isGiftCard: false,
          name: "Example Product A",
        },
      },
      {
        id: "gid://shopify/FulfillmentLineItem/6543210987",
        lineItem: {
          title: "Example Product B",
          quantity: 2,
          originalUnitPriceSet: {
            shopMoney: {
              amount: "30.00",
              currencyCode: "USD",
            },
            presentmentMoney: {
              amount: "30.00",
              currencyCode: "USD",
            },
          },
          totalDiscountSet: {
            shopMoney: {
              amount: "3.00",
              currencyCode: "USD",
            },
            presentmentMoney: {
              amount: "3.00",
              currencyCode: "USD",
            },
          },
          discountAllocations: [
            {
              allocatedAmountSet: {
                shopMoney: {
                  amount: "3.00",
                  currencyCode: "USD",
                },
              },
              discountApplication: {
                index: 2,
              },
            },
          ],
          duties: [],
          discountedTotalSet: {
            shopMoney: {
              amount: "57.00",
            },
          },
          variant: {
            title: "Variant B",
            id: "gid://shopify/ProductVariant/22334455",
            price: "30.00",
            product: {
              id: "gid://shopify/Product/66778899",
            },
          },
          requiresShipping: true,
          vendor: "Example Vendor",
          sku: "EXM-002",
          taxable: true,
          isGiftCard: false,
          name: "Example Product B",
        },
      },
    ],
  },
  name: "F-1001",
};

export const getFulfillmentExamplePayload = {
  data: {
    fulfillment: exampleFulfillment,
  },
};

const exampleFulfillmentMapRest = {
  id: 1234567890123,
  order_id: 9876543210987,
  status: "SUCCESS",
  created_at: "2025-01-14T22:03:11Z",
  service: "MANUAL",
  updated_at: "2025-01-14T22:03:11Z",
  tracking_company: null,
  location_id: 123456789012,
  origin_address: null,
  line_items: [
    {
      id: 2345678901234,
      variant_id: null,
      title: "Sample product",
      quantity: 2,
      sku: null,
      variant_title: null,
      vendor: "",
      product_id: null,
      requires_shipping: false,
      taxable: true,
      gift_card: false,
      name: "Sample product",
      price: {
        amount: "19.99",
        currencyCode: "USD",
      },
      total_discount: {
        amount: "5.00",
        currencyCode: "USD",
      },
      fulfillment_status: "fulfilled",
      price_set: {
        shop_money: {
          amount: "19.99",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "19.99",
          currency_code: "USD",
        },
      },
      total_discount_set: {
        shop_money: {
          amount: "5.00",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "5.00",
          currency_code: "USD",
        },
      },
      discount_allocations: [
        {
          amount: "5.00",
          discount_application_index: 0,
          amount_set: {
            shop_money: {
              amount: "5.00",
              currency_code: "USD",
            },
            presentment_money: {
              amount: "5.00",
              currency_code: "USD",
            },
          },
        },
      ],
      duties: [],
      admin_graphql_api_id: "gid://shopify/FulfillmentLineItem/2345678901234",
    },
  ],
  tracking_number: null,
  tracking_numbers: [],
  tracking_url: null,
  tracking_urls: [],
  name: "#9999-F1",
  admin_graphql_api_id: "gid://shopify/Fulfillment/1234567890123",
};

export const listFulfillmentsExamplePayload = {
  graphql: {
    data: {
      fulfillments: [exampleFulfillment],
    },
  },
  restMap: {
    data: {
      data: {
        fulfillments: [exampleFulfillmentMapRest],
      },
    },
  },
};

const exampleFulfillmentOrder = {
  id: "gid://shopify/FulfillmentOrder/1234567890123",
  orderId: "gid://shopify/Order/1234567890123",
  requestStatus: "UNSUBMITTED",
  status: "OPEN",
  supportedActions: [{ action: "HOLD" }, { action: "SPLIT" }],
  destination: {
    id: "gid://shopify/FulfillmentOrderDestination/1234567890123",
    address1: null,
    address2: null,
    city: null,
    company: null,
    countryCode: null,
    email: "test@example.com",
    firstName: null,
    lastName: null,
    phone: null,
    province: null,
    zip: null,
  },
  lineItems: {
    nodes: [
      {
        id: "gid://shopify/FulfillmentOrderLineItem/1234567890123",
        totalQuantity: 1,
        lineItem: { id: "gid://shopify/LineItem/1234567890123" },
        inventoryItemId: "gid://shopify/InventoryItem/1234567890123",
        variant: { id: "gid://shopify/ProductVariant/1234567890123" },
      },
    ],
  },
  internationalDuties: null,
  fulfillAt: "2024-11-13T16:00:00Z",
  fulfillBy: null,
  fulfillmentHolds: [],
  createdAt: "2024-11-13T16:57:40Z",
  updatedAt: "2024-11-13T16:57:40Z",
  deliveryMethod: {
    id: "gid://shopify/DeliveryMethod/1234567890123",
    methodType: "SHIPPING",
    serviceCode: "custom",
    presentedName: "Shipping",
    brandedPromise: null,
    sourceReference: null,
    maxDeliveryDateTime: null,
    minDeliveryDateTime: null,
    additionalInformation: {
      instructions: null,
      phone: null,
    },
  },
  assignedLocation: {
    address1: "REDACTED",
    address2: null,
    city: "Sioux Falls",
    countryCode: "US",
    location: {
      id: "gid://shopify/Location/1234567890123",
    },
    name: "REDACTED",
    phone: "",
    province: "South Dakota",
    zip: "57108",
  },
  merchantRequests: {
    nodes: [],
  },
};

const exampleFulfillmentOrderMapRest = {
  id: 1234567890123,
  order_id: 1234567890123,
  request_status: "UNSUBMITTED",
  status: "OPEN",
  supported_actions: ["HOLD", "SPLIT"],
  destination: {
    id: 1234567890123,
    address1: null,
    address2: null,
    city: null,
    company: null,
    country: null,
    email: "test@example.com",
    first_name: null,
    last_name: null,
    phone: null,
    province: null,
    zip: null,
  },
  line_items: [
    {
      id: 1234567890123,
      quantity: 1,
      line_item_id: 1234567890123,
      inventory_item_id: 1234567890123,
      variant_id: 1234567890123,
    },
  ],
  international_duties: null,
  fulfill_at: "2024-11-13T16:00:00Z",
  fulfill_by: null,
  fulfillment_holds: [],
  created_at: "2024-11-13T16:57:40Z",
  updated_at: "2024-11-13T16:57:40Z",
  delivery_method: {
    id: 1234567890123,
    method_type: "SHIPPING",
    min_delivery_date_time: null,
    max_delivery_date_time: null,
    additional_information: {
      instructions: null,
      phone: null,
    },
    service_code: "custom",
    source_reference: null,
    branded_promise: null,
    presented_name: "Shipping",
  },
  assigned_location: {
    address1: "REDACTED",
    address2: null,
    city: "Sioux Falls",
    country_code: "US",
    location_id: 1234567890123,
    name: "REDACTED",
    phone: "",
    province: "South Dakota",
    zip: "57108",
  },
  merchant_requests: [],
};

export const getFulfillmentOrderExamplePayload = {
  graphql: {
    data: {
      fulfillmentOrder: exampleFulfillmentOrder,
    },
  },
  restMap: {
    data: {
      data: {
        fulfillment_order: exampleFulfillmentOrderMapRest,
      },
    },
  },
};

export const listFulfillmentOrdersExamplePayload = {
  graphql: {
    data: {
      fulfillmentOrders: [exampleFulfillmentOrder],
      pageInfo,
    },
  },
  restMap: {
    data: {
      data: {
        fulfillment_orders: [exampleFulfillmentOrderMapRest],
      },
      ...examplePaginationMapRest,
    },
  },
};

const exampleFulfillmentService = {
  id: "gid://shopify/FulfillmentService/1234567890?id=true",
  serviceName: "ExampleFulfillmentService",
  handle: "examplefulfillmentservice",
  location: {
    id: "gid://shopify/Location/0987654321",
  },
  callbackUrl: "https://example.com/",
  trackingSupport: false,
  inventoryManagement: false,
  permitsSkuSharing: false,
};

export const createFulfillmentServiceExamplePayload = {
  data: {
    fulfillmentService: exampleFulfillmentService,
    userErrors: [],
  },
};

export const deleteFulfillmentServiceExamplePayload = {
  data: {
    deletedId: "gid://shopify/FulfillmentService/198258461",
    userErrors: [],
  },
};

export const getFulfillmentServiceExamplePayload = {
  data: {
    fulfillmentService: exampleFulfillmentService,
  },
};

export const listFulfillmentServicesExamplePayload = {
  data: {
    fulfillmentServices: [exampleFulfillmentService],
  },
};

export const updateFulfillmentServiceExamplePayload = {
  data: {
    fulfillmentService: exampleFulfillmentService,
    userErrors: [],
  },
};

const exampleInventoryItem = {
  id: "gid://shopify/InventoryItem/12345678901234",
  sku: "EXAMPLE-SKU",
  createdAt: "2022-01-01T12:00:00Z",
  updatedAt: "2024-12-01T15:30:00Z",
  requiresShipping: true,
  unitCost: {
    amount: "10.0",
    currencyCode: "USD",
  },
  countryCodeOfOrigin: null,
  provinceCodeOfOrigin: null,
  harmonizedSystemCode: null,
  tracked: false,
  countryHarmonizedSystemCodes: {
    nodes: [],
  },
};

export const getInventoryItemsExamplePayload = {
  data: {
    inventoryItem: exampleInventoryItem,
  },
};

export const listInventoryItemsExamplePayload = {
  data: {
    inventoryItems: [exampleInventoryItem],
    pageInfo,
  },
};

export const updateInventoryItemsExamplePayload = {
  data: {
    inventoryItem: exampleInventoryItem,
    userErrors: [],
  },
};

const exampleInventoryLevel = {
  id: "gid://shopify/InventoryLevel/523463154?inventory_item_id=43729076",

  item: {
    id: "gid://shopify/InventoryItem/43729076",
  },
  location: {
    id: "gid://shopify/Location/346779380",
  },
  quantities: [
    {
      name: "available",
      quantity: 0,
    },
  ],
  updatedAt: "2024-11-07T20:59:45Z",
};

export const connectInventoryLevelExamplePayload = {
  data: {
    inventoryLevel: exampleInventoryLevel,
    userErrors: [],
  },
};

export const deleteInventoryLevelsExamplePayload = {
  data: {
    userErrors: [],
  },
};

export const getInventoryLevelsExamplePayload = {
  data: {
    inventoryLevel: exampleInventoryLevel,
  },
};

export const listInventoryLevelsExamplePayload = {
  data: {
    inventoryLevels: [exampleInventoryLevel],
    pageInfo,
  },
};

export const countLocationsExamplePayload = {
  data: {
    count: 10,
  },
};

const exampleLocation = {
  id: "gid://shopify/Location/12345678901",
  name: "123 Example St Suite 100",
  address: {
    address1: "123 Example St Suite 100",
    address2: null,
    city: "Example City",
    zip: "12345",
    province: "Example State",
    country: "Example Country",
    phone: "",
    countryCode: "EX",
    provinceCode: "ES",
  },
  createdAt: "2022-01-01T10:00:00Z",
  updatedAt: "2022-01-01T10:00:00Z",
  isActive: true,
};

export const getLocationsExamplePayload = {
  data: {
    location: exampleLocation,
  },
};

export const listLocationsExamplePayload = {
  data: {
    locations: [exampleLocation],
    pageInfo,
  },
};

export const cancelOrderExamplePayload = {
  data: {
    job: {
      id: "gid://shopify/Job/d3dcd8af-2cb6-4995-ab04-634a21891234",
      done: false,
    },
    orderCancelUserErrors: [],
    userErrors: [],
  },
};

const exampleOrder = {
  id: "gid://shopify/Order/1234567890123",
  name: "#1234",
  app: {
    id: "gid://shopify/App/9876543210987",
  },
  clientIp: "0.0.0.0",
  customerAcceptsMarketing: false,
  cancelReason: null,
  cancelledAt: null,
  closedAt: null,
  confirmationNumber: "ABC123XYZ",
  confirmed: true,
  createdAt: "2024-12-08T11:29:38Z",
  currencyCode: "USD",
  currentSubtotalPriceSet: {
    shopMoney: {
      amount: "50.00",
      currencyCode: "USD",
    },
    presentmentMoney: {
      amount: "50.00",
      currencyCode: "USD",
    },
  },
  currentTotalAdditionalFeesSet: null,
  currentTotalDiscountsSet: {
    shopMoney: {
      amount: "5.00",
      currencyCode: "USD",
    },
    presentmentMoney: {
      amount: "5.00",
      currencyCode: "USD",
    },
  },
  currentTotalDutiesSet: null,
  currentTotalPriceSet: {
    shopMoney: {
      amount: "50.00",
      currencyCode: "USD",
    },
    presentmentMoney: {
      amount: "50.00",
      currencyCode: "USD",
    },
  },
  currentTotalTaxSet: {
    shopMoney: {
      amount: "0.00",
      currencyCode: "USD",
    },
    presentmentMoney: {
      amount: "0.00",
      currencyCode: "USD",
    },
  },
  customerLocale: "en",
  discountCodes: [],
  dutiesIncluded: false,
  email: "example@example.com",
  estimatedTaxes: false,
  displayFinancialStatus: "PAID",
  displayFulfillmentStatus: "UNFULFILLED",
  retailLocation: null,
  merchantBusinessEntity: {
    id: "gid://shopify/BusinessEntity/1122334455667",
  },
  merchantOfRecordApp: null,
  note: "Example note",
  originalTotalAdditionalFeesSet: null,
  originalTotalDutiesSet: null,
  paymentGatewayNames: ["manual"],
  phone: null,
  poNumber: null,
  presentmentCurrencyCode: "USD",
  processedAt: "2024-12-08T11:29:38Z",
  sourceIdentifier: "example-source-id",
  sourceName: "9876543210987",
  registeredSourceUrl: null,
  subtotalPriceSet: {
    shopMoney: {
      amount: "50.00",
      currencyCode: "USD",
    },
    presentmentMoney: {
      amount: "50.00",
      currencyCode: "USD",
    },
  },
  tags: [],
  taxExempt: true,
  taxLines: [],
  taxesIncluded: false,
  test: false,
  totalCashRoundingAdjustment: {
    paymentSet: {
      shopMoney: {
        amount: "0.00",
        currencyCode: "USD",
      },
      presentmentMoney: {
        amount: "0.00",
        currencyCode: "USD",
      },
    },
    refundSet: {
      shopMoney: {
        amount: "0.00",
        currencyCode: "USD",
      },
      presentmentMoney: {
        amount: "0.00",
        currencyCode: "USD",
      },
    },
  },
  totalDiscountsSet: {
    shopMoney: {
      amount: "5.00",
      currencyCode: "USD",
    },
    presentmentMoney: {
      amount: "5.00",
      currencyCode: "USD",
    },
  },
  totalOutstandingSet: {
    shopMoney: {
      amount: "0.00",
      currencyCode: "USD",
    },
  },
  totalPriceSet: {
    shopMoney: {
      amount: "50.00",
      currencyCode: "USD",
    },
    presentmentMoney: {
      amount: "50.00",
      currencyCode: "USD",
    },
  },
  totalShippingPriceSet: {
    shopMoney: {
      amount: "0.00",
      currencyCode: "USD",
    },
    presentmentMoney: {
      amount: "0.00",
      currencyCode: "USD",
    },
  },
  totalTaxSet: {
    shopMoney: {
      amount: "0.00",
      currencyCode: "USD",
    },
    presentmentMoney: {
      amount: "0.00",
      currencyCode: "USD",
    },
  },
  totalTipReceivedSet: {
    shopMoney: {
      amount: "0.00",
      currencyCode: "USD",
    },
  },
  totalWeight: "5000",
  updatedAt: "2024-12-08T11:29:39Z",
  billingAddress: {
    address1: "123 Example St",
    address2: null,
    name: "John Doe",
    lastName: "Doe",
    company: null,
    phone: null,
    zip: "12345",
    country: "United States",
    countryCodeV2: "US",
    province: "California",
    provinceCode: "CA",
  },
  customer: {
    id: "gid://shopify/Customer/4567890123456",
    displayName: "John Doe",
    firstName: "John",
    lastName: "Doe",
    phone: null,
  },
  lineItems: {
    nodes: [
      {
        id: "gid://shopify/LineItem/2345678901234",
        currentQuantity: 3,
        unfulfilledQuantity: 3,
        isGiftCard: false,
        name: "Sample Product",
        originalUnitPriceSet: {
          shopMoney: {
            amount: "16.67",
            currencyCode: "USD",
          },
          presentmentMoney: {
            amount: "16.67",
            currencyCode: "USD",
          },
        },
        product: null,
        quantity: 3,
        requiresShipping: true,
        sku: "EX123",
        taxable: true,
        title: "Sample Product",
        totalDiscountSet: {
          shopMoney: {
            amount: "5.00",
            currencyCode: "USD",
          },
          presentmentMoney: {
            amount: "5.00",
            currencyCode: "USD",
          },
        },
        variant: null,
        vendor: "Example Vendor",
        taxLines: [
          {
            channelLiable: false,
            priceSet: {
              shopMoney: {
                amount: "0.00",
                currencyCode: "USD",
              },
              presentmentMoney: {
                amount: "0.00",
                currencyCode: "USD",
              },
            },
            rate: 0.05,
            title: "Example Tax",
          },
        ],
        duties: [],
        discountAllocations: [
          {
            allocatedAmountSet: {
              shopMoney: {
                amount: "5.00",
                currencyCode: "USD",
              },
              presentmentMoney: {
                amount: "5.00",
                currencyCode: "USD",
              },
            },
            discountApplication: {
              index: 0,
            },
          },
        ],
      },
    ],
  },
  paymentTerms: null,
  refunds: [],
  shippingAddress: {
    firstName: "John",
    address1: "123 Example St",
    phone: null,
    city: "Example City",
    zip: "12345",
    province: "California",
    country: "United States",
    lastName: "Doe",
    address2: null,
    company: null,
    latitude: null,
    longitude: null,
    name: "John Doe",
    countryCodeV2: "US",
    provinceCode: "CA",
  },
};

export const closeOrderExamplePayload = {
  data: {
    order: exampleOrder,
    userErrors: [],
  },
};

export const countOrdersExamplePayload = {
  data: {
    count: 58,
  },
};

export const createOrderExamplePayload = {
  data: {
    order: exampleOrder,
    userErrors: [],
  },
};

export const deleteOrderExamplePayload = {
  data: {
    deletedId: "gid://shopify/Order/776341364",
    userErrors: [],
  },
};

export const getOrderExamplePayload = {
  data: {
    order: exampleOrder,
  },
};

export const listOrdersExamplePayload = {
  data: {
    orders: [exampleOrder],
    pageInfo,
  },
};

export const countProductImagesExamplePayload = {
  data: {
    count: 5,
  },
};

const exampleProductGql = {
  id: "gid://shopify/Product/1234567890123",
  title: "Example Product",
  descriptionHtml: "<p>This is an example product.</p>",
  vendor: "Example Vendor",
  productType: "Example Category",
  createdAt: "2025-01-07T00:00:00Z",
  handle: "example-product-1",
  updatedAt: "2025-01-07T00:00:01Z",
  publishedAt: null,
  templateSuffix: null,
  tags: ["example-tag"],
  status: "ACTIVE",
  variants: {
    nodes: [
      {
        id: "gid://shopify/ProductVariant/9876543210987",
        product: {
          id: "gid://shopify/Product/1234567890123",
        },
        title: "Example Variant",
        price: "10.00",
        sku: "EX-001",
        position: 1,
        inventoryPolicy: "DENY",
        compareAtPrice: null,
        createdAt: "2025-01-07T00:00:01Z",
        updatedAt: "2025-01-07T00:00:01Z",
        taxable: true,
        barcode: "123456789012",
        inventoryItem: {
          id: "gid://shopify/InventoryItem/11223344556677",
          measurement: {
            weight: {
              value: 1,
              unit: "POUNDS",
            },
          },
          requiresShipping: true,
        },
        inventoryQuantity: 100,
      },
    ],
  },
  options: [
    {
      id: "gid://shopify/ProductOption/99887766554433",
      name: "Size",
      position: 1,
      values: ["Small", "Medium", "Large"],
    },
  ],
  media: {
    nodes: [
      {
        id: "gid://shopify/MediaImage/66554433221100",
        alt: "Example Image",
        createdAt: "2025-01-07T00:00:00Z",
        updatedAt: "2025-01-07T00:00:01Z",
        image: null,
      },
    ],
  },
};

const exampleProductMapRest = {
  id: 1234567890123,
  title: "Example Product",
  body_html: "<p>This is an example product.</p>",
  vendor: "Example Vendor",
  product_type: "Example Category",
  created_at: "2025-01-07T00:00:00Z",
  handle: "example-product-1",
  updated_at: "2025-01-07T00:00:01Z",
  published_at: null,
  template_suffix: null,
  tags: "example-tag",
  status: "active",
  admin_graphql_api_id: "gid://shopify/Product/1234567890123",
  variants: [
    {
      id: 9876543210987,
      product_id: 1234567890123,
      title: "Example Variant",
      price: "10.00",
      position: 1,
      inventory_policy: "DENY",
      compare_at_price: null,
      created_at: "2025-01-07T00:00:01Z",
      updated_at: "2025-01-07T00:00:01Z",
      taxable: true,
      barcode: "123456789012",
      requires_shipping: true,
      sku: "EX-001",
      weight: 1,
      weight_unit: "POUNDS",
      inventory_item_id: 11223344556677,
      inventory_quantity: 100,
      admin_graphql_api_id: "gid://shopify/ProductVariant/9876543210987",
    },
  ],
  options: [
    {
      id: 99887766554433,
      product_id: 1234567890123,
      name: "Size",
      position: 1,
      values: ["Small", "Medium", "Large"],
    },
  ],
  images: [
    {
      id: 66554433221100,
      alt: "Example Image",
      position: 1,
      product_id: 1234567890123,
      created_at: "2025-01-07T00:00:00Z",
      updated_at: "2025-01-07T00:00:01Z",
      admin_graphql_api_id: "gid://shopify/MediaImage/66554433221100",
      width: null,
      height: null,
      src: null,
    },
  ],
  image: {
    id: 66554433221100,
    alt: "Example Image",
    product_id: 1234567890123,
    created_at: "2025-01-07T00:00:00Z",
    updated_at: "2025-01-07T00:00:01Z",
    admin_graphql_api_id: "gid://shopify/MediaImage/66554433221100",
    width: null,
    height: null,
    src: null,
  },
};

export const createProductExamplePayload = {
  graphql: {
    data: {
      product: exampleProductGql,
      userErrors: [],
    },
  },
  restMap: {
    data: {
      product: exampleProductMapRest,
    },
  },
};

export const countProductsExamplePayload = {
  data: {
    data: { count: 58 },
  },
};

export const deleteProductExamplePayload = {
  data: {
    productDelete: {
      deletedProductId: "gid://shopify/Product/108828309",
      userErrors: [],
    },
  },
};

export const getProductExamplePayload = {
  graphql: {
    data: {
      product: exampleProductGql,
    },
  },
  restMap: {
    data: {
      product: exampleProductMapRest,
    },
  },
};

export const listProductsExamplePayload = {
  graphql: {
    data: {
      products: [exampleProductGql],
      pageInfo,
    },
  },
  restMap: {
    data: {
      data: { products: [exampleProductMapRest] },
      ...examplePaginationMapRest,
    },
  },
};

export const deleteInstanceWebhooksExamplePayload = {
  graphql: {
    data: [
      {
        webhookSubscriptionDelete: {
          userErrors: [],
          deletedWebhookSubscriptionId: "gid://shopify/WebhookSubscription/1320479850649",
        },
      },
    ],
  },
  restMap: {
    data: {},
  },
};

const exampleWebhookSubscription = {
  id: "gid://shopify/WebhookSubscription/1234567890123",
  endpoint: {
    callbackUrl: "https://example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmV4YW1wbGVfaWQ=",
  },
  topic: "CARTS_CREATE",
  createdAt: "2025-01-12T22:00:35Z",
  updatedAt: "2025-01-12T22:00:35Z",
  format: "JSON",
  includeFields: [],
  metafieldNamespaces: [],
  apiVersion: {
    displayName: "2023-04 (Unsupported)",
  },
};

const exampleWebhookSubscriptionMapRest = {
  id: 1234567890123,
  address: "https://example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmV4YW1wbGVfaWQ=",
  topic: "carts/create",
  created_at: "2025-01-12T22:00:35Z",
  updated_at: "2025-01-12T22:00:35Z",
  format: "json",
  fields: [],
  metafield_namespaces: [],
  api_version: "2023-04",
  private_metafield_namespaces: [],
};

export const createWebhookSubscriptionExamplePayload = {
  graphql: {
    data: {
      userErrors: [],
      webhookSubscription: exampleWebhookSubscription,
    },
  },
  restMap: {
    data: {
      webhook: exampleWebhookSubscriptionMapRest,
    },
  },
};

export const listWebhooksExamplePayload = {
  graphql: {
    data: {
      webhookSubscriptions: [exampleWebhookSubscription],
      pageInfo,
    },
  },
  restMap: {
    data: [exampleWebhookSubscriptionMapRest],
  },
};

export const deleteWebhookExamplePayload = {
  graphql: {
    data: {
      userErrors: [],
      deletedWebhookSubscriptionId: "gid://shopify/WebhookSubscription/525699895",
    },
  },
  restMap: {
    data: {},
  },
};

export const getShopConfigExamplePayload = {
  graphql: {
    data: {
      shop: {
        id: "gid://shopify/Shop/123456789",
        name: "Example Test Store",
        email: "example@example.com",
        myshopifyDomain: "example-test-store.myshopify.com",
        billingAddress: {
          province: "Example Province",
          countryCodeV2: "EX",
          address1: "123 Example St Suite 456",
          zip: "12345",
          city: "Example City",
          phone: "123-456-7890",
          latitude: 12.345678,
          longitude: -98.765432,
          address2: null,
          country: "Example Country",
          provinceCode: "EP",
        },
        createdAt: "2022-02-16T15:40:05Z",
        updatedAt: "2024-08-31T00:26:54Z",
        currencyCode: "EXD",
        timezoneOffset: "-0500",
        ianaTimezone: "America/Example",
        shopOwnerName: "Example Owner",
        currencyFormats: {
          moneyFormat: "${{amount}}",
          moneyWithCurrencyFormat: "${{amount}} EXD",
          moneyInEmailsFormat: "${{amount}}",
          moneyWithCurrencyInEmailsFormat: "${{amount}} EXD",
        },
        weightUnit: "KILOGRAMS",
        taxesIncluded: false,
        taxShipping: false,
        plan: {
          displayName: "Example Plan",
        },
        checkoutApiSupported: false,
        setupRequired: false,
        enabledPresentmentCurrencies: ["EXD"],
        marketingSmsConsentEnabledAtCheckout: false,
        transactionalSmsDisabled: false,
      },
    },
  },
  restMap: {
    data: {
      data: {
        shop: {
          id: 123456789,
          name: "Example Test Store",
          email: "example@example.com",
          domain: "example-test-store.myshopify.com",
          province: "Example Province",
          country: "Example Country",
          address1: "123 Example St Suite 456",
          zip: "12345",
          city: "Example City",
          phone: "123-456-7890",
          latitude: 12.345678,
          longitude: -98.765432,
          address2: null,
          created_at: "2022-02-16T15:40:05Z",
          updated_at: "2024-08-31T00:26:54Z",
          country_code: "EX",
          country_name: "Example Country",
          currency: "EXD",
          timezone: "(GMT-05:00) America/Example",
          iana_timezone: "America/Example",
          shop_owner: "Example Owner",
          money_format: "${{amount}}",
          money_with_currency_format: "${{amount}} EXD",
          weight_unit: "KILOGRAMS",
          province_code: "EP",
          taxes_included: false,
          tax_shipping: false,
          plan_display_name: "Example Plan",
          myshopify_domain: "example-test-store.myshopify.com",
          money_in_emails_format: "${{amount}}",
          money_with_currency_in_emails_format: "${{amount}} EXD",
          checkout_api_supported: false,
          setup_required: false,
          enabled_presentment_currencies: ["EXD"],
          marketing_sms_consent_enabled_at_checkout: false,
          transactional_sms_disabled: false,
        },
      },
    },
  },
};

const exampleProductImage = {
  id: "gid://shopify/MediaImage/12345678901234",
  alt: "sample alt text",
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:01Z",
  image: {
    width: 100,
    height: 150,
    url: "https://example.com/images/sample.jpg",
  },
};

const exampleProductImageMapRest = {
  id: 12345678901234,
  alt: "sample alt text",
  position: 0,
  product_id: 9876543210987,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:01Z",
  admin_graphql_api_id: "gid://shopify/MediaImage/12345678901234",
  width: 100,
  height: 150,
  src: "https://example.com/images/sample.jpg",
};

export const listProductImagesExamplePayload = {
  graphql: {
    data: {
      images: [exampleProductImage],
      pageInfo,
    },
  },
  restMap: {
    data: {
      data: {
        images: [exampleProductImageMapRest],
      },
    },
  },
};

export const createProductImageExamplePayload = {
  data: {
    media: [
      {
        id: "gid://shopify/MediaImage/1072273196",
        alt: "Alt text.",
        status: "UPLOADED",
        image: null,
      },
    ],
    mediaUserErrors: [],
  },
};

export const deleteProductImageExamplePayload = {
  data: {
    deletedMediaIds: ["gid://shopify/MediaImage/730211239"],
    deletedProductImageIds: ["gid://shopify/ProductImage/916933471"],
    mediaUserErrors: [],
  },
};

export const getProductImageExamplePayload = {
  data: {
    image: {
      alt: "image",
      id: "gid://shopify/MediaImage/32285801283737",
      mediaContentType: "IMAGE",
      status: "READY",
      preview: {
        image: {
          altText: "image",
          height: 300,
          id: "gid://shopify/ImageSource/32307802603673",
          originalSrc: "https://cdn.shopify.com/s/files/1/0606/2820/5721/files/300.jpg?v=123456",
          url: "https://cdn.shopify.com/s/files/1/0606/2820/5721/files/300.jpg?v=123456",
          width: 200,
          src: "https://cdn.shopify.com/s/files/1/0606/2820/5721/files/300.jpg?v=123456",
        },
        status: "READY",
      },
    },
  },
};

export const updateProductExamplePayload = {
  data: {
    product: {
      id: "gid://shopify/Product/912855135",
      title: "Helmet Nova",
      media: {
        nodes: [
          {
            alt: "Gray helmet for bikers",
            mediaContentType: "IMAGE",
            preview: {
              status: "UPLOADED",
            },
          },
        ],
      },
    },
    userErrors: [],
  },
};

export const countVariantsExamplePayload = {
  data: {
    count: 12,
  },
};

export const createVariantExamplePayload = {
  data: {
    productVariants: [
      {
        id: "gid://shopify/ProductVariant/1070325177",
        title: "Golden",
        selectedOptions: [
          {
            name: "Title",
            value: "Golden",
          },
        ],
      },
    ],
    userErrors: [],
  },
};

export const deleteVariantExamplePayload = {
  data: {
    product: {
      id: "gid://shopify/Product/20995642",
      title: "Element",
    },
    userErrors: [],
  },
};

export const getVariantExamplePayload = {
  data: {
    productVariant: {
      id: "gid://shopify/ProductVariant/43729076",
      title: "151cm",
      availableForSale: true,
      barcode: "12345678",
      compareAtPrice: "20.00",
      createdAt: "2024-11-12T15:54:57Z",
    },
  },
};

export const listVariantsExamplePayload = {
  data: {
    productVariants: [
      {
        id: "gid://shopify/ProductVariant/30322695",
        title: "151cm",
      },
    ],
    pageInfo: {
      hasNextPage: false,
      endCursor: "YXJyYXljb25uZWN0aW9uOjA=",
    },
  },
};

export const updateVariantExamplePayload = {
  data: {
    product: {
      id: "gid://shopify/Product/20995642",
    },
    productVariants: null,
    userErrors: [
      {
        field: ["variants", "0", "id"],
        message: "Product variant does not exist",
      },
    ],
  },
};

const exampleCollection = {
  id: "gid://shopify/Collection/123456789012",
  description: "Example description",
  descriptionHtml: "<p>Example description in HTML</p>",
  handle: "example-collection-handle",
  products: {
    nodes: [
      {
        descriptionHtml: "<p>Example product description</p>",
        category: "Example Category",
        createdAt: "2023-01-01T12:00:00Z",
        description: "Example product description",
        featuredMedia: {
          alt: "Example alt text",
          id: "gid://shopify/MediaImage/987654321098",
          preview: {
            image: {
              url: "https://cdn.example.com/images/example.jpg",
              width: 200,
              height: 300,
              id: "gid://shopify/ImageSource/654321987654",
            },
          },
          status: "READY",
        },
        handle: "example-product-handle",
        id: "gid://shopify/Product/1234567890123",
        priceRangeV2: {
          maxVariantPrice: {
            amount: "50.0",
            currencyCode: "USD",
          },
          minVariantPrice: {
            amount: "10.0",
            currencyCode: "USD",
          },
        },
        productType: "Example Type",
        publishedAt: "2023-01-01T12:00:00Z",
        status: "ACTIVE",
        tags: ["Example Tag 1", "Example Tag 2"],
        title: "Example Product Title",
        totalInventory: 100,
        vendor: "Example Vendor Name",
      },
    ],
  },
  productsCount: {
    count: 10,
  },
  sortOrder: "MANUAL",
  title: "Example Collection Title",
};

export const listCollectionsExamplePayload = {
  data: {
    collections: [exampleCollection],
    pageInfo,
  },
};

export const getCollectionExamplePayload = {
  data: {
    collection: exampleCollection,
  },
};

export const countCollectionsExamplePayload = {
  data: {
    count: 5,
  },
};

export const deleteCollectionExamplePayload = {
  data: {
    deletedCollectionId: "gid://shopify/Collection/123456789012",
    userErrors: [],
  },
};

const exampleMetafield = {
  key: "myKey",
  value: "myValue",
  type: "single_line_text_field",
  namespace: "app--1234567",
  productId: "gid://shopify/Product/20995642",
  description: null,
  jsonValue: "myValue",
  createdAt: "2025-01-28T20:52:51Z",
  updatedAt: "2025-01-28T20:52:51Z",
};

export const listMetafieldsExamplePayload = {
  data: {
    metafields: [exampleMetafield],
    pageInfo,
  },
};

export const setMetafieldExamplePayload = {
  data: {
    metafields: [exampleMetafield],
    userErrors: [],
  },
};

export const deleteMetafieldExamplePayload = {
  data: {
    deletedMetafields: [
      {
        key: "today",
        namespace: "inventory",
        ownerId: "gid://shopify/Product/20995642",
      },
    ],
    userErrors: [],
  },
};

export const countDraftOrdersExamplePayload = {
  data: {
    count: 5,
  },
};
