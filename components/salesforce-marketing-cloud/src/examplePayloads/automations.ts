import type { PaginatedResponse } from "../types";

export const getAutomationExamplePayload = {
  data: {
    id: "6b6ec44f-aaf1-4d3d-9f05-074a0328a9ee",
    name: "Example-Automation-24",
    description:
      "This automation processes data for analysis and scoring purposes.",
    key: "example-automation-24",
    typeId: 1,
    type: "scheduled",
    statusId: 6,
    status: "Scheduled",
    categoryId: 305349,
    lastRunTime: "2026-02-16T21:14:03.26",
    lastRunInstanceId: "684531f1-a97b-42bd-b252-ffbeb1c633ab",
    schedule: {
      id: "ef2a92b6-28d2-4fae-a2ee-c750154116fe",
      typeId: 2,
      startDate: "2022-11-22T21:14:08.603",
      endDate: "2052-11-20T21:14:08",
      scheduledTime: "2026-02-17T21:14:00",
      rangeTypeId: 0,
      occurrences: 10957,
      pattern:
        "<Pattern><PatternType>0</PatternType><HourInterval>24</HourInterval></Pattern>",
      icalRecur: "FREQ=HOURLY;COUNT=10957;INTERVAL=24",
      timezoneName: "Central Standard Time (no DST)",
      scheduleStatus: "active",
      timezoneId: 1,
    },
    steps: [
      {
        id: "9e3db705-cd20-42f1-8b57-4955198e2a4f",
        name: "Automation Task for DFU ELT Activities",
        description: "Auto generated step task",
        step: 1,
        activities: [
          {
            id: "5826c92e-6a12-410e-b9dc-b90379d20809",
            name: "Extract-Upload Example_Predictive_Scores into S3",
            activityObjectId: "53963411-9619-41a8-a958-d33b785f6a89",
            objectTypeId: 425,
            displayOrder: 1,
          },
          {
            id: "879cf9f8-3810-4467-801a-f4a5b2bb6793",
            name: "Extract-Upload Example_DataExtension into S3",
            activityObjectId: "21e6bf87-f552-43ff-ac1e-88e58cf8a72f",
            objectTypeId: 425,
            displayOrder: 2,
          },
        ],
      },
    ],
  },
};

export const listAutomationsExamplePayload: { data: PaginatedResponse } = {
  data: {
    page: 1,
    pageSize: 1,
    count: 53,
    items: [
      {
        id: "6b6ec44f-aaf1-4d3d-9f05-074a0328a9ee",
        name: "Example-Automation-24",
        description:
          "This automation sends CURRENT data to the Data Scientists for scoring and is an important componentof the Einstein Engagement Scoring application.",
        key: "example-automation-24",
        typeId: 1,
        type: "scheduled",
        statusId: 6,
        status: "Scheduled",
        categoryId: 305349,
        lastRunTime: "2026-02-16T21:14:03.26",
        lastRunInstanceId: "684531f1-a97b-42bd-b252-ffbeb1c633ab",
        schedule: {
          id: "ef2a92b6-28d2-4fae-a2ee-c750154116fe",
          typeId: 2,
          startDate: "2022-11-22T21:14:08.603",
          endDate: "2052-11-20T21:14:08",
          scheduledTime: "2026-02-17T21:14:00",
          rangeTypeId: 0,
          occurrences: 10957,
          pattern:
            "<Pattern><PatternType>0</PatternType><HourInterval>24</HourInterval></Pattern>",
          icalRecur: "FREQ=HOURLY;COUNT=10957;INTERVAL=24",
          timezoneName: "Central Standard Time (no DST)",
          scheduleStatus: "active",
          timezoneId: 1,
        },
      },
    ],
  },
};

export const createAutomationExamplePayload = getAutomationExamplePayload;

export const updateAutomationExamplePayload = getAutomationExamplePayload;

export const executeAutomationActivitiesExamplePayload = {
  data: "Automation Started Successfully",
};
