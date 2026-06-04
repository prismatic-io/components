



export const listCustomObjectsExamplePayload = {
  data: {
    requestId: "185d6#14b51985ff0",
    success: true,
    result: [
      {
        name: "Car",
        displayName: "Car",
        description: "Car owner",
        createdAt: "2015-02-03T22:36:23Z",
        updatedAt: "2015-02-03T22:36:24Z",
        idField: "marketoGUID",
        dedupeFields: ["vin"],
        searchableFields: [["vin"], ["marketoGUID"], ["siebelId"]],
        relationships: [
          {
            field: "siebelId",
            type: "parent",
            relatedTo: {
              name: "Lead",
              field: "siebelId",
            },
          },
        ],
      },
    ],
  },
};

export const describeCustomObjectExamplePayload = {
  data: {
    requestId: "185d6#14b51985ff0",
    success: true,
    result: [
      {
        name: "Car",
        displayName: "Car",
        description: "Car owner",
        createdAt: "2015-02-03T22:36:23Z",
        updatedAt: "2015-02-03T22:36:24Z",
        idField: "marketoGUID",
        dedupeFields: ["vin"],
        searchableFields: [["vin"], ["marketoGUID"], ["siebelId"]],
        relationships: [
          {
            field: "siebelId",
            type: "parent",
            object: {
              name: "Lead",
              field: "siebelId",
            },
          },
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
            name: "vin",
            displayName: "VIN",
            description: "Vehicle Identification Number",
            dataType: "string",
            length: 36,
            updateable: false,
          },
          {
            name: "siebelId",
            displayName: "External Id",
            description: "External Id",
            dataType: "string",
            length: 36,
            updateable: true,
          },
          {
            name: "make",
            displayName: "Make",
            dataType: "string",
            length: 36,
            updateable: true,
          },
          {
            name: "model",
            displayName: "Model",
            description: "Vehicle Model",
            dataType: "string",
            length: 255,
            updateable: true,
          },
          {
            name: "year",
            displayName: "Year",
            dataType: "integer",
            updateable: true,
          },
          {
            name: "color",
            displayName: "Color",
            description: "Vehicle color",
            dataType: "String",
            length: 255,
            updateable: true,
          },
        ],
      },
    ],
  },
};

export const getCustomObjectsByFilterExamplePayload = {
  data: {
    requestId: "12951#15699db5c97",
    result: [
      {
        id: 318581,
        updatedAt: "2016-05-17T22:11:45Z",
        lastName: "Lincoln",
        email: "abe@usa.gov",
        createdAt: "2015-03-17T00:18:40Z",
        firstName: "Abraham",
      },
      {
        id: 318592,
        updatedAt: "2016-05-17T22:20:51Z",
        lastName: "Washington",
        email: "george@usa.gov",
        createdAt: "2015-04-06T16:29:21Z",
        firstName: "George",
      },
    ],
    success: true,
  },
};

export const syncCustomObjectsExamplePayload = {
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
        marketoGUID: "cff23271-f996-47d7-984f-f2676861b5fb",
      },
      {
        seq: 2,
        status: "skipped",
        reasons: [
          {
            code: "1004",
            message: "Lead not found",
          },
        ],
      },
    ],
  },
};

export const deleteCustomObjectsExamplePayload = {
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
        marketoGUID: "da42707c-4dc4-4fc1-9fef-f30a3017240a",
        status: "deleted",
      },
      {
        seq: 2,
        status: "skipped",
        reasons: [
          {
            code: "1013",
            message: "Object not found",
          },
        ],
      },
    ],
  },
};
