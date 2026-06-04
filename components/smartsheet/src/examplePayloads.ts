








import type { TriggerPayload } from "@prismatic-io/spectral";











export const listWorkspacesExamplePayload = {
  data: [
    {
      id: 3776173869164420,
      name: "My Test Workspace",
      accessLevel: "OWNER",
      permalink:
        "https://app.smartsheet.com/workspaces/M5hwX6XMQxfvRr9xHh77XgRWGhW8VWMXrX54mhw1",
    },
  ],
};







export const createWorkspaceExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      accessLevel: "OWNER",
      id: 7960873114331012,
      name: "New workspace",
      permalink: "https://app.smartsheet.com/b/home?lx=rBU8QqUVPCJ3geRgl7L8yQ",
    },
  },
};







export const getWorkspaceExamplePayload = {
  data: {
    sheets: [
      {
        id: 4583173393803140,
        name: "sheet 1",
        accessLevel: "OWNER",
        permalink:
          "https://app.smartsheet.com/b/home?lx=8Z0XuFUEAkxmHCSsMw4Zg1",
        createdAt: "2015-06-05T20:05:29Z",
        modifiedAt: "2015-06-05T20:05:43Z",
      },
    ],
    accessLevel: "OWNER",
    id: 7116448184199044,
    name: "New workspace",
    permalink: "https://app.smartsheet.com/b/home?lx=8Z0XuFUEAkxmHCSsMw4Zgg",
  },
};







export const deleteWorkspaceExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
  },
};







export const updateWorkspaceExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      accessLevel: "OWNER",
      id: 7960873114331012,
      name: "Updated workspace",
      permalink: "https://app.smartsheet.com/b/home?lx=rBU8QqUVPCJ3geRgl7L8yQ",
    },
  },
};











export const copyRowsExamplePayload = {
  data: {
    destinationSheetId: 6166656104851332,
    rowMappings: [
      { from: 1490138716891012, to: 8616643133106052 },
      { from: 5993738344261508, to: 453868808497028 },
    ],
  },
};







export const moveRowsExamplePayload = {
  data: {
    destinationSheetId: 2258256056870788,
    rowMappings: [
      {
        from: 145417762563972,
        to: 4508365800925060,
      },
      {
        from: 8026717110462340,
        to: 2256565987239812,
      },
    ],
  },
};







export const rowGetExamplePayload = {
  data: {
    id: 1490138716891012,
    sheetId: 285065612683140,
    rowNumber: 2,
    parentId: 7119638251104132,
    version: 49,
    permalink:
      "https://app.smartsheet.com/sheets/jVm6gg56FHw65FFPGfQrHjhMCJ9R42jqMxMvHvP1?rowId=1490138716891012",
    filteredOut: false,
    expanded: true,
    accessLevel: "OWNER",
    createdAt: "2022-06-23T20:05:05Z",
    createdBy: { email: "example@company.com" },
    modifiedAt: "2022-06-23T20:05:07Z",
    modifiedBy: { email: "example@company.com" },
    cells: [
      {
        columnId: 4275832638203780,
        columnType: "TEXT_NUMBER",
        value: "My Subtask 1",
        objectValue: "My Subtask 1",
        displayValue: "My Subtask 1",
        format: ",,,,,,,,,,,,,,,1,",
      },
      {
        columnId: 8779432265574276,
        columnType: "CONTACT_LIST",
        value: "example@company.com",
        objectValue: {
          objectType: "CONTACT",
          email: "example@company.com",
          name: "example@company.com",
        },
        displayValue: "example@company.com",
      },
      {
        columnId: 194445475899268,
        columnType: "DATE",
        value: "2022-06-23",
        objectValue: { objectType: "DATE", value: "2022-06-23" },
      },
    ],
  },
};







export const deleteRowExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: [207098194749316],
  },
};







export const rowsAddToSheetExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: [
      {
        id: 3987537850460036,
        rowNumber: 1,
        expanded: true,
        createdAt: "2022-07-01T19:02:57Z",
        modifiedAt: "2022-07-01T19:02:58Z",
        cells: [
          { columnId: 4902035581626244, value: false },
          {
            columnId: 2650235767940996,
            value: "New Value",
            displayValue: "New Value",
          },
        ],
      },
    ],
    version: 3,
  },
};







export const attachmentsListOnRowExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 2,
    data: [
      {
        name: "att3.png",
        attachmentType: "FILE",
        mimeType: "image/png",
        id: 4583173393803140,
        parentType: "ROW",
        parentId: 341847495283,
      },
      {
        name: "att4.png",
        attachmentType: "FILE",
        mimeType: "image/png",
        id: 7993173393803140,
        parentType: "COMMENT",
        parentId: 684956754834557,
      },
    ],
  },
};











export const getFolderExamplePayload = {
  data: {
    id: 4739830128109444,
    name: "My Folder",
    permalink:
      "https://app.smartsheet.com/folders/V9rx6x5JXXxR28GHfw9vCW8RcWR44HHJrjWPfHr1",
    sheets: [
      {
        id: 5577163253540740,
        name: "My Test Sheet",
        accessLevel: "OWNER",
        permalink:
          "https://app.smartsheet.com/sheets/ppG8788PjXmQFh4PjpvfMrRfQFvjC3cG6fM4G231",
        source: { id: 4503604829677444, type: "sheet" },
        createdAt: "2022-06-27T15:03:02Z",
        modifiedAt: "2022-06-27T15:03:02Z",
        owner: "example@example.com",
        ownerId: 789168465962884,
        version: 0,
      },
      {
        id: 6913677619160964,
        name: "My Task List",
        accessLevel: "OWNER",
        permalink:
          "https://app.smartsheet.com/sheets/P88MWxqggQxpCH3cJq3PfwXj98Wcg2pxGfcPMH51",
        source: { id: 2251805015992196, type: "sheet" },
        createdAt: "2022-06-27T15:03:07Z",
        modifiedAt: "2022-06-27T15:03:07Z",
        owner: "example@example.com",
        ownerId: 789168465962884,
        version: 0,
      },
    ],
  },
};







export const deleteFolderExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
  },
};







export const updateFolderExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      id: 5220505688008580,
      name: "New Folder Name",
      permalink:
        "https://app.smartsheet.com/folders/7QpC5vFJP3JXwgq7qqCgfCjP4cGmvj5GHh7G2wc1",
    },
  },
};







export const listFoldersExamplePayload = {
  data: [
    {
      id: 4739830128109444,
      name: "Folder 1",
      permalink:
        "https://app.smartsheet.com/folders/V9rx6x5JXXxR28GHfw9vCW8RcWR44HHJrjWPfHr1",
    },
    {
      id: 7836054871926660,
      name: "Folder 2",
      permalink:
        "https://app.smartsheet.com/folders/CQmHFFGXWC67CqxjFJJQv9q4GXqpRx2m9gHg7Rx1",
    },
  ],
};







export const createFolderExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      id: 3989276003198852,
      name: "My New Folder",
      permalink:
        "https://app.smartsheet.com/folders/jrWJMrFqfFf82WjGfX4rHW755FCrWfvJ4Mc3G5f1",
    },
  },
};







export const moveFolderExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      id: 7324970943571844,
      name: "New Folder Name",
      permalink:
        "https://app.smartsheet.com/folders/CqwF74MP2VF73F4jV9XWHVgPvJp7jJmw9h2CrF81",
    },
  },
};











export const listWebhooksExamplePayload = {
  data: [
    {
      id: 4503604829677444,
      name: "Webhook #5",
      scope: "sheet",
      scopeObjectId: 6761855684241284,
      events: ["*.*"],
      callbackUrl: "http://www.myApp.com/webhooks",
      sharedSecret: "216ejjzfoo17mq1q8xs7d4hu8b",
      enabled: true,
      status: "ENABLED",
      version: 1,
      subscope: {
        columnIds: [7318427511613316, 7318427511613123],
      },
      createdAt: "2020-01-03T14:52:21Z",
      modifiedAt: "2020-01-04T19:05:40Z",
    },
  ],
};







export const createWebhookExamplePayload = {
  data: {
    message: "UNCHANGED",
    resultCode: 0,
    result: {
      id: 8951687911106436,
      name: "Example Webhook",
      apiClientId: "ixubfhznhzs4qmmurvm",
      apiClientName: "Example Test App",
      scope: "sheet",
      scopeObjectId: 285065612683140,
      subscope: { columnIds: [] },
      events: ["*.*"],
      callbackUrl: "https://hooks.example.com/trigger/EXAMPLE",
      sharedSecret: "289c4s9hnfp4b368x4p4wu9gea",
      enabled: true,
      status: "ENABLED",
      version: 1,
      createdAt: "2022-06-27T21:34:21Z",
      modifiedAt: "2022-06-27T21:34:24Z",
    },
  },
};







export const getWebhookExamplePayload = {
  data: {
    id: 8951687911106436,
    name: "Example Webhook",
    apiClientId: "ixubfhznhzs4qmmurvm",
    apiClientName: "Example Test App",
    scope: "sheet",
    scopeObjectId: 285065612683140,
    subscope: { columnIds: [] },
    events: ["*.*"],
    callbackUrl: "https://hooks.example.com/trigger/EXAMPLE",
    sharedSecret: "289c4s9hnfp4b368x4p4wu9gea",
    enabled: true,
    status: "ENABLED",
    version: 1,
    createdAt: "2022-06-27T21:34:21Z",
    modifiedAt: "2022-06-27T21:34:24Z",
  },
};







export const deleteWebhookExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
  },
};







export const deleteInstanceWebhooksExamplePayload = {
  data: null,
};













export const searchSheetExamplePayload = {
  data: {
    results: [
      {
        contextData: ["Row 1"],
        objectId: 1888207043356548,
        objectType: "discussion",
        parentObjectId: 7141187195824004,
        parentObjectName: "Sheet 1",
        parentObjectType: "sheet",
        text: "discussion stuff goes here",
      },
      {
        contextData: ["Row 1"],
        objectId: 2711817823774596,
        objectType: "row",
        parentObjectId: 2583735121012612,
        parentObjectName: "Sheet 2",
        parentObjectType: "sheet",
        text: "row stuff goes here",
      },
    ],
    totalCount: 2,
  },
};











export const getReportsExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 3,
    data: [
      {
        id: 2536865426368388,
        name: "2. Task Summary Report",
        accessLevel: "OWNER",
        permalink:
          "https://app.smartsheet.com/reports/3qmCpFWQ3MVqwF5hCHmxjVrPw8cW9CQR8H2pcVr1",
        isSummaryReport: false,
      },
    ],
  },
};







export const getReportExamplePayload = {
  data: {
    id: 2536865426368388,
    name: "2. Task Summary Report",
    accessLevel: "OWNER",
    permalink:
      "https://app.smartsheet.com/reports/3qmCpFWQ3MVqwF5hCHmxjVrPw8cW9CQR8H2pcVr1",
    sourceSheets: [
      {
        id: 4583173393803140,
        name: "sheet 1",
        accessLevel: "OWNER",
        permalink:
          "https://app.smartsheet.com/b/home?lx=xUefSOIYmn07iJJesvSHCQ",
        createdAt: "2015-06-05T20:05:29Z",
        modifiedAt: "2015-06-05T20:05:43Z",
      },
    ],
    columns: [
      {
        id: 7960873114331012,
        index: 0,
        title: "Task Name",
        type: "TEXT_NUMBER",
        primary: true,
        sheetNameColumn: false,
        virtual: false,
      },
      {
        id: 642523719853956,
        index: 1,
        title: "Status",
        type: "PICKLIST",
        sheetNameColumn: false,
        virtual: false,
      },
    ],
    rows: [
      {
        id: 1490138716891012,
        sheetId: 4583173393803140,
        rowNumber: 1,
        permalink:
          "https://app.smartsheet.com/sheets/jVm6gg56FHw65FFPGfQrHjhMCJ9R42jqMxMvHvP1?rowId=1490138716891012",
        createdAt: "2022-06-23T20:05:05Z",
        modifiedAt: "2022-06-23T20:05:07Z",
        cells: [
          {
            columnId: 7960873114331012,
            value: "Launch website",
            displayValue: "Launch website",
            virtualColumnId: 7960873114331012,
          },
          {
            columnId: 642523719853956,
            value: "In Progress",
            displayValue: "In Progress",
            virtualColumnId: 642523719853956,
          },
        ],
      },
    ],
    totalRowCount: 1,
    totalSummaryRowCount: 0,
    effectiveAttachmentOptions: ["FILE", "GOOGLE_DRIVE", "ONEDRIVE", "DROPBOX"],
  },
};











export const getFavoritesExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 2,
    data: [
      {
        type: "sheet",
        objectId: 5897312590423940,
      },
      {
        type: "folder",
        objectId: 1493728255862660,
      },
    ],
  },
};











export const templatesListExamplePayload = {
  data: [
    {
      id: 7116448184199044,
      name: "Project Tracking",
      type: "sheet",
      accessLevel: "OWNER",
      description: "Track project tasks, milestones, and deadlines",
    },
    {
      id: 4864648370513796,
      name: "Sales Pipeline",
      type: "sheet",
      accessLevel: "VIEWER",
      description: "Manage sales opportunities and pipeline stages",
    },
  ],
};







export const templatesListPublicExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 2,
    data: [
      {
        id: 5993738344261508,
        name: "Basic Project with Gantt & Dependencies",
        type: "sheet",
        accessLevel: "VIEWER",
        description:
          "Manage a simple project with tasks, durations, and dependencies using a Gantt chart",
        globalTemplate: "PROJECT_SHEET",
      },
      {
        id: 3741938530576260,
        name: "Task List",
        type: "sheet",
        accessLevel: "VIEWER",
        description:
          "Track to-do items with status, priority, and due date columns",
        globalTemplate: "TASK_LIST",
      },
    ],
  },
};











export const listGroupsExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 1,
    data: [
      {
        id: 4583173393803140,
        name: "Group 1",
        description: "My group",
        owner: "john.doe@smartsheet.com",
        ownerId: 2331373580117892,
        createdAt: "2014-05-29T14:41:35-07:00",
        modifiedAt: "2014-05-29T14:41:35-07:00",
      },
    ],
  },
};







export const getGroupExamplePayload = {
  data: {
    id: 2295323772118916,
    name: "Example Group",
    owner: "example@example.com",
    ownerId: 789168465962884,
    members: [{ id: 789168465962884, email: "example@example.com" }],
    createdAt: "2022-06-27T18:31:44Z",
    modifiedAt: "2022-06-27T18:31:44Z",
  },
};











export const listEventsExamplePayload = {
  data: {
    nextStreamPosition: "XyzAb1234cdefghijklmnofpq",
    moreAvailable: "false",
    data: [
      {
        eventId: "4b12345abc444def333g149he2b15b3j",
        objectType: "SHEET",
        action: "LOAD",
        objectId: "345678901234",
        eventTimestamp: "2019-04-29T08:28:33Z",
        userId: "123457654321",
        requestUserId: "133445566778",
        source: "WEB_APP",
        additionalDetails: {},
      },
    ],
  },
};











export const listUsersExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 1,
    data: [
      {
        id: 94094820842,
        email: "john.doe@smartsheet.com",
        name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        profileImage: {
          imageId: "u!1!8ljad7w9-aY!AsDeH0wWv1Y!y9VvAgUOFdg",
          height: 1050,
          width: 1050,
        },
        status: "ACTIVE",
        admin: true,
        licensedSheetCreator: true,
        groupAdmin: true,
        resourceViewer: true,
        sheetCount: 3,
        lastLogin: "2016-08-15T18:32:47Z",
        customWelcomeScreenViewed: "2016-08-12T12:15:47Z",
      },
    ],
  },
};







export const getUserExamplePayload = {
  data: {
    id: 48569348493401200,
    email: "john.doe@smartsheet.com",
    firstName: "John",
    lastName: "Doe",
    locale: "en_US",
    timeZone: "US/Pacific",
    account: {
      name: "Team Smartsheet",
      id: 942513719853956,
    },
    admin: true,
    licensedSheetCreator: true,
    groupAdmin: true,
    resourceViewer: true,
    jiraAdmin: false,
    salesforceAdmin: false,
    salesforceUser: false,
    alternateEmails: [
      {
        id: 8026717110462340,
        email: "altEmail1@smartsheet.com",
        confirmed: true,
      },
    ],
    title: "Senior Sales Representative",
    department: "Marketing",
    company: "Smartsheet",
    workPhone: "",
    mobilePhone: "206 123-4567",
    role: "Sales",
    profileImage: {
      imageId: "u!1!8ljad7w9-aY!AsDeH0wWv1Y!y9VvAgUOFdg",
      height: 1050,
      width: 1050,
    },
    sheetCount: 3,
    lastLogin: "2016-08-15T18:32:47Z",
    customWelcomeScreenViewed: "2016-08-12T12:15:47Z",
    groups: [
      {
        id: 2295323772118916,
        name: "Team dev",
        description: "Development team group",
      },
    ],
  },
};











export const listSheetsExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 2,
    data: [
      {
        accessLevel: "OWNER",
        id: 4583173393803140,
        name: "sheet 1",
        version: 5,
        permalink:
          "https://app.smartsheet.com/b/home?lx=xUefSOIYmn07iJJesvSHCQ",
        createdAt: "2015-06-05T20:05:29Z",
        modifiedAt: "2015-06-05T20:05:43Z",
      },
      {
        accessLevel: "OWNER",
        id: 2331373580117892,
        name: "sheet 2",
        version: 86,
        permalink:
          "https://app.smartsheet.com/b/home?lx=xUefSOIYmn07iJJrthEFTG",
        createdAt: "2015-06-05T20:05:29Z",
        modifiedAt: "2015-06-05T20:05:43Z",
      },
    ],
  },
};







export const createSheetExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      id: 4153158256617348,
      name: "My Sheet",
      accessLevel: "OWNER",
      permalink:
        "https://app.smartsheet.com/sheets/wC88GhRM32m4jwvjcgvGrW82Qcm4Q7Rpp3XQQGc1",
      columns: [
        {
          id: 7935520919578500,
          version: 0,
          index: 0,
          title: "Favorite",
          type: "CHECKBOX",
          symbol: "STAR",
          validation: false,
          width: 150,
        },
        {
          id: 617171525101444,
          version: 0,
          index: 1,
          title: "Primary Column",
          type: "TEXT_NUMBER",
          primary: true,
          validation: false,
          width: 150,
        },
      ],
    },
  },
};







export const getSheetExamplePayload = {
  data: {
    id: 4583173393803140,
    name: "sheet 1",
    version: 6,
    totalRowCount: 240,
    accessLevel: "OWNER",
    effectiveAttachmentOptions: [
      "EVERNOTE",
      "GOOGLE_DRIVE",
      "EGNYTE",
      "FILE",
      "ONEDRIVE",
      "DROPBOX",
      "BOX_COM",
    ],
    readOnly: true,
    ganttEnabled: true,
    dependenciesEnabled: true,
    resourceManagementEnabled: true,
    cellImageUploadEnabled: true,
    userSettings: {
      criticalPathEnabled: false,
      displaySummaryTasks: true,
    },
    userPermissions: {
      summaryPermissions: "ADMIN",
    },
    workspace: {
      id: 825898975642500,
      name: "New Workspace",
    },
    projectSettings: {
      workingDays: ["MONDAY", "TUESDAY", "WEDNESDAY"],
      nonWorkingDays: [],
      lengthOfDay: 8,
    },
    hasSummaryFields: false,
    permalink: "https://app.smartsheet.com/b/home?lx=pWNSDH9itjBXxBzFmyf-5w",
    createdAt: "2018-09-24T20:27:57Z",
    modifiedAt: "2018-09-26T20:45:08Z",
    columns: [
      {
        id: 4583173393803140,
        version: 1,
        index: 0,
        primary: true,
        title: "Primary Column",
        type: "TEXT_NUMBER",
        validation: false,
      },
      {
        id: 603843458295684,
        version: 2,
        index: 5,
        title: "New Dropdown Multi Select",
        type: "MULTI_PICKLIST",
        options: [
          "Template",
          "Blog",
          "Newsletter",
          "Email",
          "Press Release",
          "Advertisement",
        ],
        validation: false,
        width: 150,
      },
    ],
    rows: [],
  },
};







export const deleteSheetExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
  },
};







export const updateSheetExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      id: 7960873114331012,
      name: "New Sheet Name",
      accessLevel: "OWNER",
      userSettings: {
        criticalPathEnabled: true,
      },
      projectSettings: {
        workingDays: ["MONDAY", "TUESDAY", "WEDNESDAY"],
        nonWorkingDays: ["2018-01-01"],
        lengthOfDay: 6,
      },
      permalink: "https://app.smartsheet.com/b/home?lx=RE8LkzA48kPRWTzcgEYOga",
    },
  },
};







export const attachmentsListOnSheetExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 2,
    data: [
      {
        name: "att3.png",
        attachmentType: "FILE",
        mimeType: "image/png",
        id: 4583173393803140,
        parentType: "SHEET",
        parentId: 341847495283,
      },
      {
        name: "att4.png",
        attachmentType: "FILE",
        mimeType: "image/png",
        id: 7993173393803140,
        parentType: "ROW",
        parentId: 684956754834557,
      },
    ],
  },
};







export const attachmentsGetExamplePayload = {
  data: {
    name: "expense_report_sample.png",
    url: "https://api.smartsheet.com/download/aa402974cdb74cb58d9",
    attachmentType: "FILE",
    mimeType: "image/png",
    id: 4583173393803140,
    urlExpiresInMillis: 120000,
  },
};







export const columnsListOnSheetExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 3,
    data: [
      {
        id: 7960873114331012,
        index: 0,
        symbol: "STAR",
        title: "Favorite",
        type: "CHECKBOX",
        validation: false,
      },
      {
        id: 642523719853956,
        index: 1,
        primary: true,
        title: "Primary Column",
        type: "TEXT_NUMBER",
        validation: false,
      },
      {
        id: 5146123347224452,
        index: 2,
        title: "Status",
        type: "PICKLIST",
        validation: false,
      },
    ],
  },
};







export const columnsAddToSheetExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: [
      {
        id: 9007194052434043,
        index: 4,
        title: "New Picklist Column 1",
        type: "PICKLIST",
        options: ["First", "Second", "Third"],
        validation: false,
        width: 150,
      },
    ],
  },
};







export const columnGetExamplePayload = {
  data: {
    id: 7960873114331012,
    index: 2,
    symbol: "STAR",
    title: "Favorite",
    type: "CHECKBOX",
    validation: false,
  },
};







export const columnDeleteExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
  },
};







export const commentGetExamplePayload = {
  data: {
    text: "This is a comment",
    createdBy: { name: "John Doe", email: "john.doe@smartsheet.com" },
    createdAt: "2013-06-24T21:07:45Z",
    modifiedAt: "2013-06-24T21:07:45Z",
    discussionId: 4503677744506756,
    id: 48569348493401200,
  },
};







export const commentEditExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      id: 7144101943502724,
      discussionId: 4503677744506756,
      text: "This is the updated comment text.",
      createdBy: {
        name: "John Doe",
        email: "john.doe@smartsheet.com",
      },
      createdAt: "2013-01-10T13:43:26Z",
      modifiedAt: "2013-01-12T19:00:26Z",
    },
    version: 18,
  },
};







export const commentDeleteExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    version: 12,
  },
};







export const copySheetExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      id: 4366633289443204,
      name: "New Sheet Name",
      accessLevel: "OWNER",
      permalink: "https://app.smartsheet.com/b/home?lx=lB0JaOh6AX1wGwqxsQIMaA",
    },
  },
};







export const discussionsListExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 1,
    data: [
      {
        id: 3138415114905476,
        title: "Lincoln",
        comments: [
          {
            id: 7320407591151492,
            text: "16th President",
            createdBy: {
              name: "Test User",
              email: "tester@smartsheet.com",
            },
            createdAt: "2015-01-12T18:23:02-08:00",
            modifiedAt: "2015-01-12T18:23:02-08:00",
          },
        ],
        commentCount: 1,
        accessLevel: "OWNER",
        parentType: "ROW",
        parentId: 4508369022150532,
        lastCommentedUser: {
          name: "Test User",
          email: "tester@smartsheet.com",
        },
        createdBy: {
          name: "Test User",
          email: "tester@smartsheet.com",
        },
        readOnly: false,
        lastCommentedAt: "2015-01-12T18:23:02-08:00",
      },
    ],
  },
};







export const discussionsCreateExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      id: 4345865909364612,
      title: "My Comment",
      comments: [
        {
          id: 8565339061544836,
          text: "My Comment",
          createdBy: { email: "example@example.com" },
          createdAt: "2022-06-30T22:08:09Z",
          modifiedAt: "2022-06-30T22:08:09Z",
        },
      ],
      commentCount: 1,
      lastCommentedAt: "2022-06-30T22:08:09Z",
      lastCommentedUser: { email: "example@example.com" },
      createdBy: { email: "example@example.com" },
    },
    version: 24,
  },
};







export const discussionGetExamplePayload = {
  data: {
    id: 1587586573592452,
    title: "My Comment",
    comments: [
      {
        id: 4718943518648196,
        text: "My Comment",
        createdBy: { email: "example@example.com" },
        createdAt: "2022-06-30T22:06:15Z",
        modifiedAt: "2022-06-30T22:06:15Z",
      },
    ],
    commentCount: 1,
    accessLevel: "OWNER",
    parentType: "ROW",
    parentId: 7119638251104132,
    lastCommentedAt: "2022-06-30T22:06:15Z",
    lastCommentedUser: { email: "example@example.com" },
    createdBy: { email: "example@example.com" },
  },
};







export const discussionDeleteExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
  },
};







export const discussionListAttachmentsExamplePayload = {
  data: {
    pageNumber: 1,
    pageSize: 100,
    totalPages: 1,
    totalCount: 2,
    data: [
      {
        name: "att3.png",
        attachmentType: "FILE",
        mimeType: "image/png",
        id: 4583173393803140,
        parentType: "COMMENT",
        parentId: 341847495283,
      },
      {
        name: "att4.png",
        attachmentType: "FILE",
        mimeType: "image/png",
        id: 7993173393803140,
        parentType: "COMMENT",
        parentId: 684956754834557,
      },
    ],
  },
};







export const commentsCreateExamplePayload = {
  data: {
    message: "SUCCESS",
    result: {
      createdAt: "2013-02-28T22:58:30-08:00",
      createdBy: {
        email: "john.doe@smartsheet.com",
        name: "John Doe",
      },
      id: 6834973207488388,
      modifiedAt: "2013-02-28T22:58:30-08:00",
      text: "This is a new comment.",
    },
    resultCode: 0,
  },
};







export const sheetSendExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
  },
};







export const moveSheetExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      id: 4366633289443204,
      name: "New Sheet Name",
      accessLevel: "OWNER",
      permalink: "https://app.smartsheet.com/b/home?lx=lB0JaOh6AX1wGwqxsQIMaA",
    },
  },
};







export const getSheetPublishExamplePayload = {
  data: {
    readOnlyLiteEnabled: false,
    readOnlyFullEnabled: true,
    readWriteEnabled: false,
    icalEnabled: false,
    readOnlyFullAccessibleBy: "ALL",
    readOnlyFullUrl:
      "https://publish.smartsheet.com/6d35fa6c99334d4892f9591cf6065",
  },
};







export const setSheetPublishExamplePayload = {
  data: {
    message: "SUCCESS",
    resultCode: 0,
    result: {
      icalEnabled: false,
      readOnlyFullEnabled: false,
      readOnlyLiteEnabled: true,
      readOnlyLiteUrl:
        "http://publish.smartsheet.com/9862638d9c444014b5d7a114d436e99d",
      readWriteEnabled: false,
    },
  },
};







export const getSheetVersionExamplePayload = {
  data: {
    version: 4,
  },
};











export const listHomeContentsExamplePayload = {
  data: {
    sheets: [
      {
        id: 1514484968777604,
        name: "My Sheet",
        accessLevel: "OWNER",
        permalink:
          "https://app.smartsheet.com/sheets/28wxmmfHhc7c92JRgx8qwp3MjJ338XXgWVP5QqR1",
        createdAt: "2022-06-27T17:18:56Z",
        modifiedAt: "2022-06-27T17:18:56Z",
      },
    ],
    folders: [
      {
        id: 1115290047145860,
        name: "My Folder",
        permalink:
          "https://app.smartsheet.com/folders/VRmCXx7VvJXchgPMxcR88Vq5RVH5QPW2JwVpXjF1",
        sheets: [
          {
            id: 6166656104851332,
            name: "My Sheet",
            accessLevel: "OWNER",
            permalink:
              "https://app.smartsheet.com/sheets/pqFGc5cVvVw6hpfQ32Pw2hMFcPpVWWMhQ686QVW1",
            createdAt: "2022-06-27T17:26:20Z",
            modifiedAt: "2022-06-27T17:26:20Z",
          },
        ],
        folders: [
          {
            id: 4739830128109444,
            name: "Subfolder 1",
            permalink:
              "https://app.smartsheet.com/folders/V9rx6x5JXXxR28GHfw9vCW8RcWR44HHJrjWPfHr1",
            sheets: [
              {
                id: 6913677619160964,
                name: "My Task List",
                accessLevel: "OWNER",
                permalink:
                  "https://app.smartsheet.com/sheets/P88MWxqggQxpCH3cJq3PfwXj98Wcg2pxGfcPMH51",
                createdAt: "2022-06-27T15:03:07Z",
                modifiedAt: "2022-06-27T15:03:07Z",
              },
              {
                id: 5577163253540740,
                name: "My Test Sheet",
                accessLevel: "OWNER",
                permalink:
                  "https://app.smartsheet.com/sheets/ppG8788PjXmQFh4PjpvfMrRfQFvjC3cG6fM4G231",
                createdAt: "2022-06-27T15:03:02Z",
                modifiedAt: "2022-06-27T15:03:02Z",
              },
            ],
          },
        ],
      },
    ],
    workspaces: [
      {
        id: 3776173869164420,
        name: "My Test",
        accessLevel: "OWNER",
        permalink:
          "https://app.smartsheet.com/workspaces/M5hwX6XMQxfvRr9xHh77XgRWGhW8VWMXrX54mhw1",
        sheets: [
          {
            id: 285065612683140,
            name: "1. Task Sheet",
            accessLevel: "OWNER",
            favorite: true,
            permalink:
              "https://app.smartsheet.com/sheets/jVm6gg56FHw65FFPGfQrHjhMCJ9R42jqMxMvHvP1",
            createdAt: "2022-06-23T20:05:05Z",
            modifiedAt: "2022-06-24T16:55:36Z",
          },
        ],
        folders: [
          {
            id: 5659485705398148,
            name: "Workspace Folder 1",
            permalink:
              "https://app.smartsheet.com/folders/5GgFJ2Rr38FjjxVP7gfR39WpC6CMPgrHM3m7rF41",
          },
        ],
        reports: [
          {
            id: 2536865426368388,
            name: "2. Task Summary Report",
            accessLevel: "OWNER",
            permalink:
              "https://app.smartsheet.com/reports/3qmCpFWQ3MVqwF5hCHmxjVrPw8cW9CQR8H2pcVr1",
            createdAt: "2022-06-23T20:05:06Z",
            modifiedAt: "2022-06-23T20:05:07Z",
          },
        ],
        sights: [
          {
            id: 2689058288756612,
            name: "4. Project Dashboard",
            accessLevel: "OWNER",
            permalink:
              "https://app.smartsheet.com/dashboards/jH9Q2r3P3gjPmQgX93CvvCFjHVgGq6W894Mx67W1",
            createdAt: "2022-06-23T20:05:06Z",
            modifiedAt: "2022-06-23T20:05:07Z",
          },
        ],
      },
      {
        id: 7240855267370884,
        name: "Team dev",
        accessLevel: "OWNER",
        permalink:
          "https://app.smartsheet.com/workspaces/69g47w4FxcFXMRfFprpwqw26qH4cvw287WW7F9R1",
        sheets: [
          {
            id: 923909785708420,
            name: "Project Launch Plan",
            accessLevel: "OWNER",
            permalink:
              "https://app.smartsheet.com/sheets/5MXR3wMRhpmVjgPqGj2JFWfw398RhPVXfqg7Vrf1",
            createdAt: "2022-06-27T18:31:29Z",
            modifiedAt: "2022-06-27T18:31:29Z",
          },
        ],
      },
    ],
  },
};











export const listContactsExamplePayload = {
  data: {
    pageNumber: 1,
    totalPages: 1,
    totalCount: 1,
    data: [
      {
        id: "AAeDyHYU54QAB4PIdhTnhA",
        name: "John Doe",
        email: "john.doe@example.com",
      },
    ],
  },
};







export const getContactExamplePayload = {
  data: {
    id: "AAeDyHYU54QAB4PIdhTnhA",
    name: "John Doe",
    email: "john.doe@example.com",
  },
};
















export const smartsheetWebhookExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "Smartsheet-Hook-Id": "8951687911106436",
    },
    queryParameters: {},
    rawBody: {
      data: Buffer.from(""),
      contentType: "application/json",
    },
    body: {
      data: {
        nonce: "1739a3a7-e2fb-43e6-8488-90ca2fcaa3b8",
        timestamp: "2022-06-27T21:34:24.000+00:00",
        webhookId: 8951687911106436,
        scope: "sheet",
        scopeObjectId: 285065612683140,
        events: [
          {
            objectType: "row",
            eventType: "created",
            id: 3987537850460036,
            userId: 789168465962884,
            timestamp: "2022-06-27T21:34:23.000+00:00",
          },
          {
            objectType: "cell",
            eventType: "updated",
            rowId: 3987537850460036,
            columnId: 2650235767940996,
            userId: 789168465962884,
            timestamp: "2022-06-27T21:34:23.000+00:00",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "",
    customer: { id: "", name: "", externalId: "" },
    instance: { id: "", name: "" },
    user: { id: "", email: "", name: "", externalId: "" },
    integration: {
      id: "",
      name: "",
      versionSequenceId: "",
      externalVersion: "",
    },
    flow: { id: "", name: "", stableId: "" },
    startedAt: "2022-06-27T21:34:24.000Z",
    globalDebug: false,
  } as unknown as TriggerPayload,
  branch: "Event",
};










export const pollChangesExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: undefined, contentType: undefined },
    body: {
      data: {
        created: [
          {
            accessLevel: "OWNER",
            id: 4583173393803140,
            name: "Q3 Marketing Plan",
            version: 1,
            permalink:
              "https://app.smartsheet.com/b/home?lx=xUefSOIYmn07iJJesvSHCQ",
            createdAt: "2026-05-20T14:20:00Z",
            modifiedAt: "2026-05-20T14:20:00Z",
          },
        ],
        updated: [
          {
            accessLevel: "OWNER",
            id: 2331373580117892,
            name: "Sales Pipeline Tracker",
            version: 86,
            permalink:
              "https://app.smartsheet.com/b/home?lx=xUefSOIYmn07iJJrthEFTG",
            createdAt: "2026-05-12T09:00:00Z",
            modifiedAt: "2026-05-20T13:15:00Z",
          },
        ],
      },
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false as boolean | undefined,
};
