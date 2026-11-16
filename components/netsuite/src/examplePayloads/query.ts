export const suiteQLQueryCustomersExamplePayload = {
  data: {
    data: {
      count: 2,
      offset: 0,
      totalResults: 2,
      hasMore: false,
      items: [
        {
          id: "12345",
          entityid: "CUST-001",
          companyname: "Acme Corporation",
          email: "contact@acmecorp.example.com",
          datecreated: "2024-10-20",
        },
        {
          id: "12346",
          entityid: "CUST-002",
          companyname: "Global Industries Ltd",
          email: "contact@globalindustries.example.com",
          datecreated: "2024-10-15",
        },
      ],
      links: [
        {
          rel: "self",
          href: "/services/rest/query/v1/suiteql",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};

export const selectSuiteQlExamplePayload = {
  result: [
    { key: "12345", label: "contact@acmecorp.example.com" },
    { key: "12346", label: "contact@globalindustries.example.com" },
  ],
};
