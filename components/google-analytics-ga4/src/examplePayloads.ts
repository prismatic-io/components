














export const listAccountsExamplePayload: { data: Record<string, unknown> } = {
  data: {
    accounts: [
      {
        name: "accounts/000000000",
        createTime: "2012-11-20T15:12:07.864Z",
        updateTime: "2015-08-11T21:08:55.416Z",
        displayName: "Example Account",
        regionCode: "US",
      },
    ],
  },
};






export const listPropertiesExamplePayload: { data: Record<string, unknown> } = {
  data: {
    properties: [
      {
        name: "properties/111111111",
        parent: "accounts/000000000",
        createTime: "2022-02-02T04:40:59.611Z",
        updateTime: "2022-02-02T04:40:59.611Z",
        displayName: "www.example.com",
        industryCategory: "OTHER",
        timeZone: "America/Chicago",
        currencyCode: "USD",
        serviceLevel: "GOOGLE_ANALYTICS_STANDARD",
        account: "accounts/000000000",
        propertyType: "PROPERTY_TYPE_ORDINARY",
      },
    ],
  },
};






export const getPropertyExamplePayload = {
  data: {
    name: "properties/111111111",
    parent: "accounts/000000000",
    createTime: "2022-02-02T04:40:59.611Z",
    updateTime: "2022-02-02T04:40:59.611Z",
    displayName: "www.example.com",
    industryCategory: "OTHER",
    timeZone: "America/Chicago",
    currencyCode: "USD",
    serviceLevel: "GOOGLE_ANALYTICS_STANDARD",
    account: "accounts/000000000",
    propertyType: "PROPERTY_TYPE_ORDINARY",
  },
};






export const runReportExamplePayload = {
  data: {
    dimensionHeaders: [
      {
        name: "pageTitle",
      },
    ],
    metricHeaders: [
      {
        name: "sessions",
        type: "TYPE_INTEGER",
      },
    ],
    rows: [
      {
        dimensionValues: [
          {
            value: "My Example Page | My Website",
          },
        ],
        metricValues: [
          {
            value: "9",
          },
        ],
      },
      {
        dimensionValues: [
          {
            value: "A blog post | My Blog",
          },
        ],
        metricValues: [
          {
            value: "3",
          },
        ],
      },
    ],
    rowCount: 2,
    metadata: {
      currencyCode: "USD",
      timeZone: "America/Chicago",
    },
    kind: "analyticsData#runReport",
  },
};








export const sendMeasurementProtocolEventsExamplePayload = {
  data: {
    message: "Event Sent Successfully",
  },
};





export const listAccountsDataSourceExamplePayload = {
  result: [
    { key: "accounts/000000000", label: "My Account 1" },
    { key: "accounts/000000001", label: "My Account 2" },
  ],
};
