export const rawRequestGETExamplePayload = {
  data: {
    data: {
      id: "12345",
      entityid: "CUST-001",
      companyname: "Acme Corporation",
      email: "contact@acmecorp.example.com",
      subsidiary: { id: "1", refName: "Parent Company" },
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/customer/12345",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};
