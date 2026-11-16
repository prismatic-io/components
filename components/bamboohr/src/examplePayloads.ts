import type { TriggerPayload } from "@prismatic-io/spectral";
import { MESSAGES } from "./constants";

export const getEmployeeExamplePayload = {
  data: {
    id: "5",
    address1: "335 S 560 W",
    address2: null,
    age: "41",
    bestEmail: "aadams@efficientoffice.com",
    birthday: "07-28",
    city: "Lindon",
    country: "United States",
    dateOfBirth: "1981-07-28",
    department: "Human Resources",
    division: "Europe",
    employeeNumber: "2",
    employmentHistoryStatus: "Full-Time",
    ethnicity: "Two or More Races",
    exempt: "Exempt",
    firstName: "Ashley",
    fullName1: "Ashley Adams",
    fullName2: "Adams, Ashley",
    fullName3: "Adams, Ashley",
    fullName4: "Adams, Ashley",
    fullName5: "Ashley Adams",
    displayName: "Ashley Adams",
    gender: "Female",
    hireDate: "2022-02-20",
    originalHireDate: "0000-00-00",
    jobTitle: "HR Administrator",
    lastChanged: "2022-08-17T20:35:30+00:00",
    lastName: "Adams",
    location: "London, UK",
    maritalStatus: "Married",
    middleName: null,
    mobilePhone: "+44 207 555 6671",
    payRate: "50000.00 GBP",
    payRateEffectiveDate: "2022-02-20",
    payType: "Salary",
    paidPer: "Year",
    paySchedule: "Twice a month",
    payFrequency: "Twice a month",
    ssn: "545-66-7890",
    state: "UT",
    stateCode: "UT",
    status: "Active",
    supervisor: "Caldwell, Jennifer",
    supervisorEmail: "jcaldwell@efficientoffice.com",
    terminationDate: "0000-00-00",
    workEmail: "aadams@efficientoffice.com",
    workPhone: "+44 207 555 4730",
    zipcode: "84042",
    nationality: null,
    payGroup: null,
    includeInPayroll: null,
    timeTrackingEnabled: null,
    sin: null,
    standardHoursPerWeek: null,
  },
};

export const addEmployeeExamplePayload = {
  data: {
    id: "234",
    location: "/v1/employees/234",
  },
};

export const updateEmployeeExamplePayload = {
  data: {},
};

export const getEmployeeDirectoryExamplePayload = {
  data: {
    fields: [
      { id: "displayName", type: "text", name: "Display Name" },
      { id: "firstName", type: "text", name: "First Name" },
      { id: "lastName", type: "text", name: "Last Name" },
      { id: "gender", type: "text", name: "Gender" },
      { id: "jobTitle", type: "list", name: "Job Title" },
      { id: "workPhone", type: "text", name: "Work Phone" },
      { id: "workPhoneExtension", type: "text", name: "Work Extension" },
      { id: "skypeUsername", type: "text", name: "Skype Username" },
      { id: "facebook", type: "text", name: "Facebook URL" },
    ],
    employees: [
      {
        id: "123",
        displayName: "John Doe",
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        jobTitle: "Customer Service Representative",
        workPhone: "555-555-5555",
        workPhoneExtension: null,
        skypeUsername: "JohnDoe",
        facebook: "JohnDoeFacebook",
        canUploadPhoto: 1,
      },
    ],
  },
};

export const listCompanyFilesExamplePayload = {
  data: {
    categories: [
      {
        id: 179,
        canUploadFiles: "yes",
        name: "BambooHR",
        files: [
          {
            id: 220,
            name: "4 Ways the BambooHR ATS Improves the Hiring Process",
            originalFileName:
              "4 Ways the BambooHR ATS Improves the Hiring Process.pdf",
            size: "855128",
            dateCreated: "2022-10-22T22:30:07+0000",
            createdBy: "Acme Developer",
            shareWithEmployees: "no",
            canRenameFile: "yes",
            canDeleteFile: "yes",
          },
          {
            id: 223,
            name: "5 Payroll Pain Points Solved by TRAXPayroll",
            originalFileName: "5 Payroll Pain Points.pdf",
            size: "523971",
            dateCreated: "2022-10-22T22:50:24+0000",
            createdBy: "Acme Developer",
            shareWithEmployees: "no",
            canRenameFile: "yes",
            canDeleteFile: "yes",
          },
        ],
      },
      {
        id: 175,
        canUploadFiles: "yes",
        name: "New Hire Forms",
        files: [
          {
            id: 164,
            name: "Australia Standard Choice Form.pdf",
            originalFileName: "Australia Standard Choice Form.pdf",
            size: "323487",
            dateCreated: "2022-07-01T15:15:33+0000",
            createdBy: null,
            shareWithEmployees: "no",
            canRenameFile: "yes",
            canDeleteFile: "yes",
          },
        ],
      },
    ],
  },
};

export const getCompanyFileExamplePayload = {
  data: Buffer.from("BambooHR file contents", "utf8"),
  contentType: "application/pdf",
  contentDisposition: 'attachment; filename="example.pdf"',
};

export const addCompanyFileCategoryExamplePayload = {
  data: {
    message: MESSAGES.CATEGORY_CREATED,
  },
};

export const uploadCompanyFileExamplePayload = {
  data: {
    location: "https://api.bamboohr.com/api/gateway.php/exampleco/v1/files/123",
  },
};

export const deleteCompanyFileExamplePayload = {
  data: {},
};

export const listEmployeeFilesExamplePayload = {
  data: {
    employee: { id: 4 },
    categories: [
      {
        id: 12,
        name: "Signed Documents",
        canRenameCategory: "yes",
        canDeleteCategory: "yes",
        canUploadFiles: "yes",
        displayIfEmpty: "yes",
        files: [
          {
            id: 4,
            name: "Company Handbook.pdf",
            originalFileName: "Company Handbook.pdf",
            size: 2807480,
            dateCreated: "2022-07-04T20:45:51+0000",
            createdBy: "Charlotte Abbott",
            shareWithEmployee: "yes",
            canRenameFile: "yes",
            canDeleteFile: "yes",
            canChangeShareWithEmployeeFieldValue: "yes",
          },
          {
            id: 10,
            name: "I-9 (2017).pdf",
            originalFileName: "I-9 (2017).pdf",
            size: 2750869,
            dateCreated: "2022-07-04T21:25:11+0000",
            createdBy: "Charlotte Abbott",
            shareWithEmployee: "yes",
            canRenameFile: "yes",
            canDeleteFile: "yes",
            canChangeShareWithEmployeeFieldValue: "yes",
          },
        ],
      },
      {
        id: 10,
        name: "Workflow Attachments",
        canRenameCategory: "yes",
        canDeleteCategory: "yes",
        canUploadFiles: "yes",
        displayIfEmpty: "yes",
        files: [],
      },
    ],
  },
};

export const getEmployeeFileExamplePayload = {
  data: Buffer.from("Employee file contents", "utf8"),
  contentType: "application/pdf",
  contentDisposition: 'attachment; filename="example.pdf"',
};

export const addEmployeeFileCategoryExamplePayload = {
  data: {
    message: MESSAGES.CATEGORY_CREATED,
  },
};

export const uploadEmployeeFileExamplePayload = {
  data: {
    location:
      "https://api.bamboohr.com/api/gateway.php/exampleco/v1/employees/5/files/123",
  },
};

export const deleteEmployeeFileExamplePayload = {
  data: {},
};

export const getEmployeeTableExamplePayload = {
  data: [
    {
      id: "1",
      employeeId: "42",
      date: "2022-01-15",
      location: "New York Office",
      department: "Engineering",
      jobTitle: "Senior Developer",
    },
  ],
};

export const getTabularFieldsExamplePayload = {
  data: [
    {
      alias: "jobInfo",
      fields: [
        {
          id: 4028,
          name: "Job Information: Date",
          alias: "date",
          type: "date",
        },
        { id: 18, name: "Location", alias: "location", type: "list" },
        { id: 4, name: "Department", alias: "department", type: "list" },
        { id: 1355, name: "Division", alias: "division", type: "list" },
        { id: 17, name: "Job Title", alias: "jobTitle", type: "list" },
        { id: 91, name: "Reporting to", alias: "reportsTo", type: "employee" },
      ],
    },
  ],
};

export const addEmployeeTableRowExamplePayload = {
  data: {
    message: MESSAGES.ROW_ADDED,
  },
};

export const updateEmployeeTableRowExamplePayload = {
  data: {
    id: "15",
    employeeId: "42",
  },
};

export const getTimeOffRequestsExamplePayload = {
  data: [
    {
      id: "1342",
      employeeId: "4",
      status: {
        lastChanged: "2022-04-10",
        lastChangedByUserId: "2369",
        status: "approved",
      },
      name: "Charlotte Abbott",
      start: "2021-12-26",
      end: "2021-12-28",
      created: "2022-04-09",
      type: { id: "78", name: "Vacation", icon: "palm-trees" },
      amount: { unit: "hours", amount: "24" },
      actions: {
        view: true,
        edit: true,
        cancel: false,
        approve: false,
        deny: false,
        bypass: false,
      },
      dates: { "2021-12-26": "24" },
      notes: { manager: "Home sick with the flu." },
    },
  ],
};

export const whosOutExamplePayload = {
  data: [
    {
      id: 1493,
      type: "timeOff",
      employeeId: 17,
      name: "Dorothy Chou",
      start: "2022-08-17",
      end: "2022-08-18",
    },
  ],
};

export const createWebhookExamplePayload = {
  data: {
    id: "472",
    name: "Employee Updates",
    created: "2026-05-21 14:32:10",
    lastSent: null,
    url: "https://hooks.example.com/trigger/EXAMPLE",
    format: "json",
    events: ["employee_with_fields.updated"],
    privateKey:
      "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    monitorFields: ["firstName", "lastName", "jobTitle", "department"],
    postFields: {
      firstName: "firstName",
      lastName: "lastName",
      jobTitle: "jobTitle",
      department: "department",
    },
    frequency: 60,
    limit: 100,
    includeCompanyDomain: false,
  },
};

export const listWebhooksExamplePayload = {
  data: [
    {
      id: "472",
      name: "Employee Updates",
      created: "2026-05-21 14:32:10",
      lastSent: "2026-05-22 09:15:42",
      url: "https://hooks.example.com/trigger/EXAMPLE",
      format: "json",
      monitorFields: ["firstName", "lastName", "jobTitle", "department"],
      postFields: {
        firstName: "firstName",
        lastName: "lastName",
      },
      frequency: 60,
      limit: 100,
      includeCompanyDomain: false,
    },
    {
      id: "473",
      name: "Hire Date Updates",
      created: "2026-05-21 14:40:03",
      lastSent: null,
      url: "https://hooks.example.com/trigger/ANOTHER",
      format: "json",
      monitorFields: ["hireDate"],
      postFields: {
        firstName: "firstName",
        lastName: "lastName",
        hireDate: "hireDate",
      },
      frequency: 60,
      limit: 100,
      includeCompanyDomain: false,
    },
  ],
};

export const deleteWebhookByIdExamplePayload = {
  data: "Web hook has been deleted.",
};

export const deleteInstanceWebhooksExamplePayload = {
  data: null,
};

export const rawRequestExamplePayload = {
  data: {
    data: {
      fields: [
        { id: "displayName", type: "text", name: "Display Name" },
        { id: "firstName", type: "text", name: "First Name" },
        { id: "lastName", type: "text", name: "Last Name" },
      ],
      employees: [
        {
          id: 123,
          displayName: "John Doe",
          firstName: "John",
          lastName: "Doe",
        },
      ],
    },
    headers: {},
  },
};

export const bamboohrTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-BambooHR-Signature":
        "1d6207f8818f063890758a32d3833914754ba788cb2993b04ac8eb064fef0fcd",
      "X-BambooHR-Timestamp": "2026-05-21T14:00:00Z",
    },
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        employees: [
          {
            id: 5,
            fields: {
              firstName: { value: "Ashley" },
              lastName: { value: "Adams" },
              jobTitle: { value: "Senior HR Administrator" },
            },
            changedFields: ["jobTitle"],
          },
        ],
        fields: {
          firstName: "First Name",
          lastName: "Last Name",
          jobTitle: "Job Title",
        },
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};

export const pollChangesTriggerExamplePayload: {
  payload: TriggerPayload;
  polledNoChanges: boolean;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [
          {
            id: "234",
            action: "Inserted",
            lastChanged: "2026-05-19T14:20:00+00:00",
          },
        ],
        updated: [
          {
            id: "5",
            action: "Updated",
            lastChanged: "2026-05-19T13:45:30+00:00",
          },
          {
            id: "42",
            action: "Deleted",
            lastChanged: "2026-05-19T12:30:00+00:00",
          },
        ],
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
  polledNoChanges: false,
};

export const selectCompanyFileExamplePayload = {
  result: [
    {
      label: "BambooHR - 4 Ways the BambooHR ATS Improves the Hiring Process",
      key: "220",
    },
    {
      label: "New Hire Forms - Australia Standard Choice Form.pdf",
      key: "164",
    },
  ],
};

export const selectEmployeeFileExamplePayload = {
  result: [
    {
      label: "Signed Documents - Company Handbook.pdf",
      key: "4",
    },
    {
      label: "Signed Documents - I-9 (2017).pdf",
      key: "10",
    },
  ],
};

export const selectEmployeeExamplePayload = {
  result: [{ label: "John Doe", key: "123" }],
};
