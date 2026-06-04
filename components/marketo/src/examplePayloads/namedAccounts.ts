



export const describeNamedAccountExamplePayload = {
  data: {
    requestId: "d65e#156c27ac57d",
    result: [
      {
        name: "Named Account",
        description: "Marketo standard account attribute map",
        createdAt: "2016-08-18T20:16:41Z",
        updatedAt: "2016-08-18T20:16:41Z",
        idField: "marketoGUID",
        dedupeFields: ["name"],
        searchableFields: [
          ["marketoGUID"],
          ["annualRevenue"],
          ["city"],
          ["country"],
          ["domainName"],
          ["industry"],
          ["logoUrl"],
          ["membershipCount"],
          ["name"],
          ["numberOfEmployees"],
          ["opptyAmount"],
          ["opptyCount"],
          ["score1"],
          ["score2"],
          ["score3"],
          ["score4"],
          ["score5"],
          ["sicCode"],
          ["state"],
        ],
        fields: [
          {
            name: "marketoGUID",
            displayName: "Marketo GUID",
            dataType: "string",
            length: 36,
            updateable: false,
          },
          {
            name: "annualRevenue",
            displayName: "annualRevenue",
            dataType: "currency",
            updateable: true,
          },
          {
            name: "city",
            displayName: "city",
            dataType: "string",
            length: 255,
            updateable: true,
          },
          {
            name: "country",
            displayName: "country",
            dataType: "string",
            length: 255,
            updateable: true,
          },
        ],
      },
    ],
    success: true,
  },
};

export const getNamedAccountsByFilterExamplePayload = {
  data: {
    requestId: "6dac#157d4ddc9d7",
    result: [
      {
        seq: 0,
        marketoGUID: "16efafdd-0148-4ea7-8782-f451d7c6345d",
        createdAt: "2016-10-17T22:49:04Z",
        name: "Google",
        updatedAt: "2016-10-17T22:49:04Z",
      },
      {
        seq: 1,
        marketoGUID: "44d62353-7f9d-4d43-b9cc-7ef0f7a09137",
        createdAt: "2016-10-17T22:49:04Z",
        name: "Yahoo",
        updatedAt: "2016-10-17T22:49:04Z",
      },
    ],
    success: true,
  },
};

export const syncNamedAccountsExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        status: "updated",
        marketoGUID: "dff23271-f996-47d7-984f-f2676861b5fb",
      },
      {
        seq: 1,
        status: "created",
        marketoGUID: "dff23271-f996-47d7-984f-f2676861b5fc",
      },
    ],
  },
};

export const deleteNamedAccountsExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        marketoGUID: "dff23271-f996-47d7-984f-f2676861b5fb",
        status: "deleted",
      },
      {
        seq: 1,
        id: "dff23271-f996-47d7-984f-f2676861b5fc",
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
