export const listCardsExamplePayload = {
  data: {
    responseCode: 200,
    domainCardList: [
      {
        bank: "vcf",
        cardID: 5198273,
        cardName: "Visa - 4242",
        cardNumber: "XXXXXXXXXXXX4242",
        created: "2024-03-12 09:14:05",
        email: "jane.doe@acmecorp.com",
        externalEmployeeID: "EMP-1042",
        lastImport: "2026-10-28 02:00:11",
        lastImportResult: 200,
        reimbursable: false,
        scrapeMinDate: "2024-03-01",
      },
      {
        bank: "stripe",
        cardID: 5198304,
        cardName: "Corporate Card - 1881",
        cardNumber: "XXXXXXXXXXXX1881",
        created: "2025-01-20 16:42:37",
        email: "john.smith@acmecorp.com",
        externalEmployeeID: "EMP-2217",
        lastImport: "2026-10-28 02:00:14",
        lastImportResult: 200,
        reimbursable: true,
        scrapeMinDate: "2025-01-01",
      },
    ],
  },
};
