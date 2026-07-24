export const getAccountExamplePayload: {
  data: unknown;
} = {
  data: {
    kind: "content#account",
    id: "123456789",
    name: "Example Merchant Store",
    websiteUrl: "https://example.com",
    adultContent: false,
    businessInformation: {
      address: {
        country: "US",
        locality: "Mountain View",
        region: "CA",
        streetAddress: "1600 Amphitheatre Parkway",
        postalCode: "94043",
      },
      phoneNumber: "+1-650-253-0000",
      customerService: {
        email: "support@example.com",
        phoneNumber: "+1-650-253-0001",
        url: "https://example.com/support",
      },
    },
    users: [
      {
        emailAddress: "admin@example.com",
        admin: true,
      },
      {
        emailAddress: "manager@example.com",
        admin: false,
      },
    ],
    youtubeChannelLinks: [
      {
        channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
        status: "active",
      },
    ],
    googleMyBusinessLink: {
      gmbAccountId: "1234567890",
      gmbEmail: "business@example.com",
      status: "active",
    },
    automaticImprovements: {
      imageImprovements: {
        effectiveAllowAutomaticImprovements: true,
      },
      itemUpdates: {
        effectiveAllowAutomaticItemUpdates: true,
      },
      shippingImprovements: {
        effectiveAllowShippingImprovements: true,
      },
    },
    adsLinks: [
      {
        adsId: "1234567890",
        status: "active",
      },
    ],
    cssId: "9876543210",
    labelIds: ["10521234", "10525678", "10529012"],
    accountManagement: "manual",
    automaticLabelIds: ["auto_123", "auto_456"],
    sellerId: "SELLER_001",
  },
};
export const createAccountExamplePayload = getAccountExamplePayload;
export const updateAccountExamplePayload: {
  data: unknown;
} = {
  data: {
    ...(getAccountExamplePayload.data as object),
    name: "Example Merchant Store - Updated",
    websiteUrl: "https://shop.example.com",
  },
};
export const deleteAccountExamplePayload: {
  data: unknown;
} = {
  data: {},
};
export const listAccountsExamplePayload: {
  data: unknown;
} = {
  data: {
    kind: "content#accountsListResponse",
    resources: [
      getAccountExamplePayload.data,
      {
        kind: "content#account",
        id: "987654321",
        name: "Sub-Account Store",
        websiteUrl: "https://sub.example.com",
        adultContent: false,
      },
    ],
    nextPageToken: "CgwI5MSB3QYQ",
  },
};
