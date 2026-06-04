



export const describeSalesPersonExamplePayload = {
  data: {
    requestId: "185d6#14b51985ff0",
    success: true,
    result: [
      {
        name: "SalesPerson",
        createdAt: "2015-02-03T22:36:23Z",
        updatedAt: "2015-02-03T22:36:24Z",
        idField: "id",
        dedupeFields: ["externalSalesPersonId"],
        searchableFields: [["email"], ["id"], ["externalSalesPersonId"]],
        fields: [
          {
            name: "id",
            displayName: "Marketo Id",
            dataType: "integer",
            updateable: false,
          },
          {
            name: "createdAt",
            displayName: "Created At",
            dataType: "datetime",
            updateable: false,
          },
          {
            name: "updatedAt",
            displayName: "Updated At",
            dataType: "datetime",
            updateable: false,
          },
          {
            name: "email",
            displayName: "Email",
            dataType: "string",
            length: 255,
            updateable: false,
          },
          {
            name: "externalSalesPersonId",
            displayName: "External Sales Person Id",
            dataType: "string",
            length: 255,
            updateable: false,
          },
        ],
      },
    ],
  },
};

export const getSalesPersonsByFilterExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        id: 53453,
        externalSalesPersonId: "sam@test.com",
        createdAt: "2015-02-03T22:36:23Z",
        updatedAt: "2015-02-03T22:36:23Z",
      },
      {
        seq: 1,
        id: 53454,
        externalSalesPersonId: "david@test.com",
        createdAt: "2015-02-03T22:36:23Z",
        updatedAt: "2015-02-03T22:36:23Z",
      },
    ],
  },
};

export const syncSalesPersonsExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        status: "updated",
        id: 45232,
      },
      {
        seq: 1,
        status: "created",
        id: 45236,
      },
    ],
  },
};

export const deleteSalesPersonsExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        id: 56343,
        status: "deleted",
      },
      {
        seq: 1,
        id: 53453,
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
