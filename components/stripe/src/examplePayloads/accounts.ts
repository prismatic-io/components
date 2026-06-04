









export const getAccountExamplePayload = {
  data: {
    id: "acct_1MtFQ12eZvKYlo2C",
    object: "account",
    business_profile: {
      mcc: null,
      name: "Acme Corporation",
      product_description: null,
      support_address: null,
      support_email: "support@example.com",
      support_phone: null,
      support_url: null,
      url: "https://example.com",
    },
    business_type: "company",
    capabilities: {
      card_payments: "active",
      transfers: "active",
    },
    charges_enabled: true,
    country: "US",
    created: 1716397800,
    default_currency: "usd",
    details_submitted: true,
    email: "owner@example.com",
    metadata: {},
    payouts_enabled: true,
    settings: {
      payouts: {
        schedule: {
          delay_days: 2,
          interval: "daily",
        },
      },
    },
    type: "standard",
  } as unknown,
};







export const listAccountsExamplePayload = {
  data: {
    object: "list",
    data: [getAccountExamplePayload.data],
    has_more: false,
    url: "/v1/accounts",
  } as unknown,
};
