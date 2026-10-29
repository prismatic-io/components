import type {
  GetAccountResponse,
  GetAccountResponseCollection,
} from "klaviyo-api";

export const getAccountExamplePayload: { data: GetAccountResponse } = {
  data: {
    data: {
      type: "account",
      id: "string",
      attributes: {
        testAccount: true,
        contactInformation: {
          defaultSenderName: "Klaviyo Demo",
          defaultSenderEmail: "contact@klaviyo-demo.com",
          websiteUrl: "https://www.klaviyo.com",
          organizationName: "Klaviyo Demo",
          streetAddress: {
            address1: "125 Summer Street",
            address2: "5th Floor",
            city: "Boston",
            region: "MA",
            country: "US",
            zip: "04323",
          },
        },
        industry: "Software / SaaS",
        timezone: "US/Eastern",
        preferredCurrency: "USD",
        publicApiKey: "AbC123",
        locale: "en-US",
      },
      links: {
        self: "string",
      },
    },
  },
};

export const listAccountsExamplePayload: {
  data: GetAccountResponseCollection;
} = {
  data: {
    data: [
      {
        type: "account",
        id: "string",
        attributes: {
          testAccount: true,
          contactInformation: {
            defaultSenderName: "Klaviyo Demo",
            defaultSenderEmail: "contact@klaviyo-demo.com",
            websiteUrl: "https://www.klaviyo.com",
            organizationName: "Klaviyo Demo",
            streetAddress: {
              address1: "125 Summer Street",
              address2: "5th Floor",
              city: "Boston",
              region: "MA",
              country: "US",
              zip: "04323",
            },
          },
          industry: "Software / SaaS",
          timezone: "US/Eastern",
          preferredCurrency: "USD",
          publicApiKey: "AbC123",
          locale: "en-US",
        },
        links: {
          self: "string",
        },
      },
    ],
    links: {
      self: "string",
      prev: "string",
      next: "string",
    },
  },
};

export const selectAccountExamplePayload = {
  result: [{ label: "Klaviyo Demo", key: "01HABCDEF0123456789ABCDEF" }],
};
