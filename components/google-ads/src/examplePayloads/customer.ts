export const confirmClientLinkExamplePayload = {
  data: {
    results: [
      {
        resourceName:
          "customers/2222222222/customerManagerLinks/1111111111~3333333333",
      },
    ],
  },
};

export const getCustomerExamplePayload = {
  data: {
    results: [
      {
        customer: {
          resourceName: "customers/1234567890",
          id: "1234567890",
          descriptiveName: "Example Customer Account",
          status: "ENABLED",
          testAccount: false,
          manager: false,
        },
      },
    ],
    fieldMask:
      "customer.id,customer.descriptiveName,customer.status,customer.testAccount,customer.manager",
    queryResourceConsumption: "80",
  },
};

export const getConversionActionExamplePayload = {
  data: {
    results: [
      {
        conversionAction: {
          resourceName: "customers/1234567890/conversionActions/987654321",
          id: "987654321",
          name: "Purchase Conversion",
        },
      },
    ],
    fieldMask:
      "conversionAction.id,conversionAction.name,conversionAction.resourceName",
    queryResourceConsumption: "702",
  },
};

export const listAccessibleCustomersExamplePayload = {
  data: {
    resourceNames: ["customers/1234567890", "customers/5555555555"],
  },
};

export const listCustomersExamplePayload: { data: unknown } = {
  data: {
    results: [
      {
        customerClient: {
          resourceName: "customers/1234567890/customerClients/1234567890",
          clientCustomer: "customers/1234567890",
          id: "1234567890",
          hidden: false,
          level: "1",
        },
      },
      {
        customerClient: {
          resourceName: "customers/1234567890/customerClients/5555555555",
          clientCustomer: "customers/5555555555",
          id: "5555555555",
          hidden: false,
          level: "2",
        },
      },
    ],
    nextPageToken: "CJL5XLT2PWDmIpGNGciABRnu",
    fieldMask:
      "customerClient.resourceName,customerClient.clientCustomer,customerClient.id,customerClient.level,customerClient.hidden,customerClient.level",
  },
};

export const createClientLinkExamplePayload = {
  data: {
    resourceName:
      "customers/1111111111/customerClientLinks/2222222222~3333333333",
    managerCustomerId: "1111111111",
    clientCustomerId: "2222222222",
    managerLinkId: "3333333333",
  },
};

export const listAccessibleCustomersDataSourceExamplePayload = {
  result: [{ label: "Example Account - 123-456-7890", key: "1234567890" }],
};

export const listAccessibleSubAccountsExamplePayload = {
  result: [{ label: "Example Account - 123-456-7890", key: "1234567890" }],
};
