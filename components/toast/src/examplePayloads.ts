import type { TriggerPayload } from "@prismatic-io/spectral";

export const listDepositsExamplePayload = {
  data: [
    {
      guid: "string",
      entityType: "string",
      amount: 0,
      date: "2019-08-24T14:15:22Z",
      undoes: "string",
      employee: {
        guid: "string",
        entityType: "string",
        externalId: "string",
      },
      creator: {
        guid: "string",
        entityType: "string",
      },
    },
  ],
};

export const createEmployeeExamplePayload = {
  data: {
    guid: "string",
    entityType: "string",
    externalId: "string",
    createdDate: "2019-08-24T14:15:22Z",
    modifiedDate: "2019-08-24T14:15:22Z",
    deletedDate: "2019-08-24T14:15:22Z",
    firstName: "string",
    chosenName: "string",
    lastName: "string",
    email: "string",
    phoneNumber: "string",
    phoneNumberCountryCode: "string",
    passcode: "string",
    externalEmployeeId: "string",
    deleted: true,
    jobReferences: [
      {
        guid: "string",
        entityType: "string",
        externalId: "string",
      },
    ],
    wageOverrides: [
      {
        wage: 0,
        jobReference: {
          guid: "string",
          entityType: "string",
          externalId: "string",
        },
      },
    ],
    v2EmployeeGuid: "string",
  },
};

export const deleteEmployeeExamplePayload = createEmployeeExamplePayload;

export const getEmployeeExamplePayload = createEmployeeExamplePayload;

export const listEmployeesExamplePayload = {
  data: [createEmployeeExamplePayload.data],
};

export const updateEmployeeExamplePayload = createEmployeeExamplePayload;

export const getTimeEntryExamplePayload = {
  data: {
    guid: "string",
    entityType: "string",
    externalId: "string",
    createdDate: "2019-08-24T14:15:22Z",
    modifiedDate: "2019-08-24T14:15:22Z",
    deletedDate: "2019-08-24T14:15:22Z",
    deleted: true,
    jobReference: {
      guid: "string",
      entityType: "string",
      externalId: "string",
    },
    employeeReference: {
      guid: "string",
      entityType: "string",
      externalId: "string",
    },
    shiftReference: {
      guid: "string",
      entityType: "string",
      externalId: "string",
    },
    inDate: "2019-08-24T14:15:22Z",
    outDate: "2019-08-24T14:15:22Z",
    autoClockedOut: true,
    businessDate: "string",
    regularHours: 0,
    overtimeHours: 0,
    hourlyWage: 0,
    breaks: [
      {
        guid: "string",
        breakType: {
          guid: "string",
          entityType: "string",
        },
        paid: true,
        inDate: "2019-08-24T14:15:22Z",
        outDate: "2019-08-24T14:15:22Z",
        missed: true,
        auditResponse: true,
      },
    ],
    declaredCashTips: 0,
    nonCashTips: 0,
    cashGratuityServiceCharges: 0,
    nonCashGratuityServiceCharges: 0,
    tipsWithheld: 0,
    nonCashSales: 0,
    cashSales: 0,
  },
};

export const listCashEntriesExamplePayload = {
  data: [
    {
      guid: "string",
      entityType: "string",
      amount: 0,
      reason: "string",
      date: "2019-08-24T14:15:22Z",
      type: "CASH_IN",
      cashDrawer: {
        guid: "string",
        entityType: "string",
      },
      payoutReason: {
        guid: "string",
        entityType: "string",
      },
      noSaleReason: {
        guid: "string",
        entityType: "string",
      },
      undoes: "string",
      employee1: {
        guid: "string",
        entityType: "string",
        externalId: "string",
      },
      employee2: {
        guid: "string",
        entityType: "string",
        externalId: "string",
      },
      creatorOrShiftReviewSubject: {
        guid: "string",
        entityType: "string",
      },
      approverOrShiftReviewSubject: {
        guid: "string",
        entityType: "string",
      },
    },
  ],
};

export const listTimeEntriesExamplePayload = {
  data: [getTimeEntryExamplePayload.data],
};

export const pollChangesTriggerExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            ...getTimeEntryExamplePayload.data,
            guid: "b04c86fb-4a82-4ba3-ab0d-93bf5b2b5abc",
            createdDate: "2026-05-27T10:30:00.000Z",
            modifiedDate: "2026-05-27T10:30:00.000Z",
          },
        ],
        updated: [
          {
            ...getTimeEntryExamplePayload.data,
            guid: "e2b60d3a-1c4f-4d89-9f3e-7a2c1b9d4e5f",
            createdDate: "2026-05-20T09:00:00.000Z",
            modifiedDate: "2026-05-27T14:22:00.000Z",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Polling Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Polling Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false,
};

export const getOneJobExamplePayload = {
  data: {
    guid: "string",
    entityType: "string",
    externalId: "string",
    createdDate: "2019-08-24T14:15:22Z",
    modifiedDate: "2019-08-24T14:15:22Z",
    deletedDate: "2019-08-24T14:15:22Z",
    title: "string",
    deleted: true,
    wageFrequency: "HOURLY",
    defaultWage: 0,
    tipped: true,
    code: "string",
    excludeFromReporting: true,
  },
};

export const listJobsExamplePayload = {
  data: [getOneJobExamplePayload.data],
};

export const listAccessibleRestaurantsExamplePayload = {
  data: [
    {
      restaurantGuid: "e728cd53-2fa7-4e63-8f8f-93e78ea66b03",
      managementGroupGuid: "bdfda703-2a83-4e0f-9b8a-8ea0ee6cab79",
      deleted: true,
      restaurantName: "Main Street Cafe",
      locationName: "123 Main Street",
      createdByEmailAddress: "clefebvre@mainstreetcafe.com",
      externalGroupRef: "string",
      externalRestaurantRef: "string",
      modifiedDate: 1678846869551,
      createdDate: 1643858534451,
      isoModifiedDate: "2023-03-12T08:32:34.008Z",
      isoCreatedDate: "2022-05-17T10:21:38.008Z",
    },
  ],
};

export const listConnectedRestaurantsExamplePayload = {
  data: [
    {
      currentPageNum: 1,
      results: [
        {
          restaurantGuid: "7ab295f6-8dc8-4cb6-8cdb-072b83e84184",
          managementGroupGuid: "75063706-dd6e-4da6-8bb6-3a99e218e686",
          restaurantName: "Main Street Cafe",
          locationName: "123 Main Street",
          createdByEmailAddress: "clefebvre@mainstreetcafe.com",
          externalGroupRef: null,
          externalRestaurantRef: null,
          modifiedDate: 1678823073353,
          createdDate: 1678823073353,
          isoModifiedDate: "2023-03-14T19:44:33.353Z",
          isoCreatedDate: "2023-03-14T19:44:33.353Z",
        },
      ],
      totalResultCount: 3222,
      pageSize: 1,
      currentPageToken: "cDoxLHM6MQ==",
      nextPageToken: "cDoyLHM6MQ==",
      totalCount: 3222,
      nextPageNum: 2,
      lastPageNum: 3222,
      previousPageNum: null,
    },
  ],
};

export const createShiftExamplePayload = {
  data: {
    guid: "string",
    entityType: "string",
    externalId: "string",
    createdDate: "2019-08-24T14:15:22Z",
    modifiedDate: "2019-08-24T14:15:22Z",
    deletedDate: "2019-08-24T14:15:22Z",
    deleted: true,
    jobReference: {
      guid: "string",
      entityType: "string",
      externalId: "string",
    },
    employeeReference: {
      guid: "string",
      entityType: "string",
      externalId: "string",
    },
    inDate: "2019-08-24T14:15:22Z",
    outDate: "2019-08-24T14:15:22Z",
    scheduleConfig: {
      guid: "string",
      minBeforeClockIn: 0,
      minAfterClockIn: 0,
      minBeforeClockOut: 0,
      minAfterClockOut: 0,
    },
  },
};

export const deleteShiftExamplePayload = createShiftExamplePayload;

export const getShiftExamplePayload = createShiftExamplePayload;

export const listShiftsExamplePayload = {
  data: [createShiftExamplePayload.data],
};

export const updateShiftExamplePayload = createShiftExamplePayload;
