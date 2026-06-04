







import type { TriggerPayload } from "@prismatic-io/spectral";










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






export const listEmployeesExamplePayload = {
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
        id: 123,
        displayName: "John Doe",
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        jobTitle: "Customer Service Representative",
        workPhone: "555-555-5555",
        workPhoneExtension: null,
        skypeUsername: "JohnDoe",
        facebook: "JohnDoeFacebook",
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
};









export const addCompanyFileCategoryExamplePayload = {
  data: {},
};









export const uploadCompanyFileExamplePayload = {
  data: null,
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
};








export const addEmployeeFileCategoryExamplePayload = {
  data: {},
};









export const uploadEmployeeFileExamplePayload = {
  data: null,
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
    id: "15",
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
    id: 472,
    name: "Employee Updates",
    url: "https://hooks.example.com/trigger/EXAMPLE",
    format: "json",
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
      id: 472,
      name: "Employee Updates",
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
      id: 473,
      name: "Hire Date Updates",
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
  data: {},
};







export const deleteInstanceWebhooksExamplePayload = {
  data: null,
};













export const rawRequestExamplePayload = {
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
};



















export const bamboohrTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-BambooHR-Signature":
        "1d6207f8818f063890758a32d3833914754ba788cb2993b04ac8eb064fef0fcd",
      "X-BambooHR-Timestamp": "2026-05-21T14:00:00Z",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
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
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Webhook Flow": ["example-api-key"],
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






export const pollChangesExamplePayload = {
  body: pollChangesTriggerExamplePayload.payload.body,
};
