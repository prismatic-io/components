


















export const getCurrentUserExamplePayload = {
  data: {
    imsUserId: "1B2A3C4D5E6F7A8B9C0D1E2F@AdobeID",
    imsOrgs: [
      {
        imsOrgId: "EA1234567890ABCDEF1234@AdobeOrg",
        companies: [
          {
            globalCompanyId: "testco0",
            companyName: "Test Company",
            apiRateLimitPolicy: "aa_api_tier10_tp",
          },
          {
            globalCompanyId: "anothe0",
            companyName: "Another Test Company",
            apiRateLimitPolicy: "aa_api_tier10_tp",
          },
        ],
      },
    ],
  },
};






export const listCompaniesExamplePayload = {
  data: [
    {
      globalCompanyId: "testco0",
      companyName: "Test Company",
      apiRateLimitPolicy: "aa_api_tier10_tp",
    },
    {
      globalCompanyId: "anothe0",
      companyName: "Another Test Company",
      apiRateLimitPolicy: "aa_api_tier10_tp",
    },
  ],
};






export const getReportSuiteExamplePayload = {
  data: {
    collectionItemType: "reportsuite",
    id: "examplersid",
    rsid: "examplersid",
    name: "Example Suite",
  },
};






export const listReportSuitesExamplePayload = {
  data: [
    {
      collectionItemType: "reportsuite",
      id: "examplersid",
      rsid: "examplersid",
      name: "Example Suite",
    },
  ],
};






export const listVirtualReportSuitesExamplePayload = {
  data: [
    {
      collectionItemType: "reportsuite",
      id: "vrs_example01",
      rsid: "vrs_example01",
      name: "Example Virtual Report Suite",
    },
  ],
};






export const listReportSuiteMetricsExamplePayload = {
  data: [
    {
      id: "metrics/campaigninstances",
      title: "Campaign Click-throughs",
      name: "Campaign Click-throughs",
      type: "int",
      category: "Traffic Sources",
      support: ["oberon", "dataWarehouse"],
      allocation: true,
      precision: 0,
      calculated: false,
      segmentable: true,
      supportsDataGovernance: false,
      polarity: "positive",
      standardComponent: true,
    },
  ],
};






export const listReportSuiteDimensionsExamplePayload = {
  data: [
    {
      id: "variables/campaign",
      title: "Tracking Code",
      name: "Tracking Code",
      type: "string",
      category: "Traffic Sources",
      support: ["dataWarehouse", "oberon"],
      pathable: false,
      segmentable: true,
      reportable: ["oberon"],
      supportsDataGovernance: true,
      description:
        "Displays the Tracking Codes that are generated from Campaign tracking on the site.",
      multiValued: false,
      standardComponent: true,
    },
  ],
};






export const runReportExamplePayload = {
  data: {
    totalPages: 1,
    firstPage: true,
    lastPage: true,
    numberOfElements: 3,
    number: 0,
    totalElements: 3,
    columns: {
      dimension: {
        id: "variables/evar2",
        type: "string",
      },
      columnIds: ["0"],
    },
    rows: [
      {
        itemId: "1132341824",
        value: "red t-shirt",
        data: [1515.0],
      },
      {
        itemId: "2400044733",
        value: "digital watches",
        data: [1.0],
      },
      {
        itemId: "3614317595",
        value: "running shoes",
        data: [16.0],
      },
    ],
    summaryData: {
      totals: [1532.0],
    },
  },
};





// biome-ignore lint/suspicious/noExplicitAny: Raw request returns dynamic response data
export const rawRequestExamplePayload: { data: { data: any; headers: any } } = {
  data: {
    data: {},
    headers: {},
  },
};
