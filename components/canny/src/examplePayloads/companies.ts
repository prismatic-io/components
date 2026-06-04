export const listCompaniesExamplePayload = {
  data: {
    hasNextPage: true,
    cursor:
      "NTUzYzNlZjhiOGNkY2QxNTAxYmExMjNhXzIwMjUtMDItMDRUMTY6NDA6MDcuNTQxWl8x",
    companies: [
      {
        id: "company1",
        created: "2022-06-17T12:44:38.797Z",
        customFields: {
          number: 1,
          bool: true,
          string: "test",
        },
        domain: "example.com",
        memberCount: 5,
        monthlySpend: 100.23,
        name: "company 1",
      },
    ],
  },
};

export const updateCompanyExamplePayload = {
  data: { id: "553c3ef8b8cdcd1501ba1111" },
};

export const deleteCompanyExamplePayload = { data: "success" };
