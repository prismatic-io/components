



export const describeCompanyExamplePayload = {
  data: {
    success: true,
    requestId: "5847#14d44113ad7",
    result: [
      {
        name: "Company",
        description: "Company object",
        createdAt: "2015-05-11T17:11:32Z",
        updatedAt: "2015-05-11T17:11:32Z",
        idField: "id",
        dedupeFields: ["externalCompanyId"],
        searchableFields: [["externalCompanyId"], ["id"], ["company"]],
        fields: [
          {
            name: "createdAt",
            displayName: "Created At",
            dataType: "datetime",
            updateable: false,
          },
          {
            name: "externalCompanyId",
            displayName: "External Company Id",
            dataType: "string",
            length: 100,
            updateable: false,
          },
          {
            name: "id",
            displayName: "Id",
            dataType: "integer",
            updateable: false,
          },
          {
            name: "updatedAt",
            displayName: "Updated At",
            dataType: "datetime",
            updateable: false,
          },
          {
            name: "annualRevenue",
            displayName: "Annual Revenue",
            dataType: "currency",
            updateable: true,
          },
          {
            name: "company",
            displayName: "Company Name",
            dataType: "string",
            length: 255,
            updateable: true,
          },
        ],
      },
    ],
  },
};

export const getCompaniesByFilterExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        id: 3433,
        externalCompanyId: "19UYA31581L000000",
        company: "Google",
      },
      {
        seq: 1,
        id: 5345,
        externalCompanyId: "29UYA31581L000000",
        company: "Yahoo",
      },
    ],
  },
};

export const syncCompaniesExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        status: "updated",
        id: 1232,
      },
      {
        seq: 1,
        status: "created",
        id: 1323,
      },
    ],
  },
};

export const deleteCompaniesExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        id: 1234,
        status: "deleted",
      },
      {
        seq: 1,
        id: 56456,
        status: "deleted",
      },
      {
        seq: 2,
        status: "skipped",
        reasons: [
          {
            code: "1013",
            message: "Record not found",
          },
        ],
      },
    ],
  },
};
