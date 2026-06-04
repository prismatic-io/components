





import type { TriggerPayload } from "@prismatic-io/spectral";
import { SUCCESS_RESPONSE } from "./constants";









export const listServiceDesksExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
      context: "context",
    },
    values: [
      {
        id: "10001",
        projectId: "11001",
        projectName: "IT Help Desk",
        projectKey: "ITH",
        _links: {
          self: "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/10001",
        },
      },
    ],
  },
};







export const getServiceDeskExamplePayload = {
  data: {
    id: "10001",
    projectId: "11001",
    projectName: "IT Help Desk",
    projectKey: "ITH",
    _links: {
      self: "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/10001",
    },
  },
};









export const listRequestsExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
      context: "context",
    },
    values: [
      {
        issueId: "107001",
        issueKey: "HELPDESK-1",
        summary: "Request JSD help via REST",
        requestTypeId: "25",
        serviceDeskId: "10",
        createdDate: {
          epochMillis: 1444290120000,
          friendly: "Monday 14:42 PM",
          iso8601: "2015-10-08T14:42:00+0700",
          jira: "2015-10-08T14:42:00.000+0700",
        },
        currentStatus: {
          status: "Waiting for Support",
          statusCategory: "NEW",
        },
      },
    ],
  },
};







export const createRequestExamplePayload = {
  data: {
    issueId: "107001",
    issueKey: "HELPDESK-1",
    summary: "Request JSD help via REST",
    requestTypeId: "25",
    serviceDeskId: "10",
    createdDate: {
      epochMillis: 1444290120000,
      friendly: "Monday 14:42 PM",
      iso8601: "2015-10-08T14:42:00+0700",
    },
    reporter: {
      accountId:
        "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
      displayName: "Fred F. User",
      emailAddress: "fred@example.com",
    },
    currentStatus: {
      status: "Waiting for Support",
      statusCategory: "NEW",
    },
  },
};







export const getRequestExamplePayload = {
  data: {
    issueId: "107001",
    issueKey: "HELPDESK-1",
    summary: "Request JSD help via REST",
    requestTypeId: "25",
    serviceDeskId: "10",
    createdDate: {
      epochMillis: 1444290120000,
      friendly: "Monday 14:42 PM",
      iso8601: "2015-10-08T14:42:00+0700",
      jira: "2015-10-08T14:42:00.000+0700",
    },
    reporter: {
      accountId:
        "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
      displayName: "Fred F. User",
      emailAddress: "fred@example.com",
      active: true,
      timeZone: "Australia/Sydney",
    },
    currentStatus: {
      status: "Waiting for Support",
      statusCategory: "NEW",
    },
    _links: {
      jiraRest: "https://your-domain.atlassian.net/rest/api/2/issue/107001",
      web: "https://your-domain.atlassian.net/servicedesk/customer/portal/10/HELPDESK-1",
      self: "https://your-domain.atlassian.net/rest/servicedeskapi/request/107001",
    },
  },
};







export const addCommentExamplePayload = {
  data: {
    _expands: ["attachment", "renderedBody"],
    id: "1000",
    body: "Hello there",
    public: true,
    author: {
      accountId:
        "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
      emailAddress: "fred@example.com",
      displayName: "Fred F. User",
      active: true,
      timeZone: "Australia/Sydney",
    },
    created: {
      epochMillis: 1444360920000,
      friendly: "Today 10:22 AM",
      iso8601: "2015-10-09T10:22:00+0700",
      jira: "2015-10-09T10:22:00.000+0700",
    },
    _links: {
      self: "https://your-domain.atlassian.net/rest/servicedeskapi/request/2000/comment/1000",
    },
  },
};







export const listCommentsExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
    },
    values: [
      {
        _expands: ["attachment", "renderedBody"],
        id: "1000",
        body: "Hello there",
        public: true,
        author: {
          accountId:
            "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
          displayName: "Fred F. User",
          emailAddress: "fred@example.com",
          active: true,
          timeZone: "Australia/Sydney",
        },
        created: {
          epochMillis: 1444360920000,
          friendly: "Today 10:22 AM",
          iso8601: "2015-10-09T10:22:00+0700",
        },
        _links: {
          self: "https://your-domain.atlassian.net/rest/servicedeskapi/request/2000/comment/1000",
        },
      },
    ],
  },
};







export const addAttachmentExamplePayload = {
  data: {
    comment: {
      _expands: ["attachment", "renderedBody"],
      id: "1000",
      body: "Please find the screenshot attached.",
      public: true,
      author: {
        accountId:
          "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
        displayName: "Fred F. User",
        emailAddress: "fred@example.com",
      },
      created: {
        epochMillis: 1444360920000,
        friendly: "Today 10:22 AM",
        iso8601: "2015-10-09T10:22:00+0700",
      },
      _links: {
        self: "https://your-domain.atlassian.net/rest/servicedeskapi/request/2000/comment/1000",
      },
    },
    attachments: {
      _expands: [],
      size: 1,
      start: 0,
      limit: 50,
      isLastPage: true,
      values: [
        {
          filename: "screenshot.png",
          author: {
            accountId:
              "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
            displayName: "Fred F. User",
          },
          created: {
            epochMillis: 1444360920000,
            friendly: "Today 10:22 AM",
            iso8601: "2015-10-09T10:22:00+0700",
          },
          size: 23123,
          mimeType: "image/png",
          _links: {
            content:
              "https://your-domain.atlassian.net/servicedesk/customershim/secure/attachment/10000/screenshot.png",
            thumbnail:
              "https://your-domain.atlassian.net/servicedesk/customershim/secure/thumbnail/10000/_thumb_10000.png",
          },
        },
      ],
    },
  },
};







export const uploadTemporaryFileExamplePayload = {
  data: {
    temporaryAttachmentId: "temp8186986881700442965",
    fileName: "atlassian.png",
  },
};







export const listApprovalsExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
      context: "context",
    },
    values: [
      {
        id: "1",
        name: "Please approve this request",
        finalDecision: "pending",
        canAnswerApproval: true,
        approvers: [
          {
            approver: {
              accountId:
                "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
              displayName: "Fred F. User",
              emailAddress: "fred@example.com",
            },
            approverDecision: "pending",
          },
        ],
        createdDate: {
          epochMillis: 1475046060000,
          iso8601: "2016-09-28T14:01:00+0700",
        },
      },
    ],
  },
};







export const approveRequestExamplePayload = {
  data: {
    id: "1",
    name: "Please approve this request",
    finalDecision: "approved",
    canAnswerApproval: false,
    approvers: [
      {
        approver: {
          accountId:
            "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
          displayName: "Fred F. User",
          emailAddress: "fred@example.com",
        },
        approverDecision: "approved",
      },
    ],
    completedDate: {
      epochMillis: 1475134200000,
      iso8601: "2016-09-29T14:30:00+0700",
    },
  },
};







export const listSlaExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
    },
    values: [
      {
        id: "1",
        name: "Time to first response",
        completedCycles: [],
        ongoingCycle: {
          startTime: {
            epochMillis: 1444290120000,
            iso8601: "2015-10-08T14:42:00+0700",
          },
          breached: false,
          goalDuration: { millis: 28800000 },
          elapsedTime: { millis: 3600000 },
        },
      },
    ],
  },
};







export const listTransitionsExamplePayload = {
  data: {
    _expands: [],
    size: 2,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
    },
    values: [
      { id: "5", name: "In Progress" },
      { id: "31", name: "Resolved" },
    ],
  },
};







export const transitionRequestExamplePayload = {
  data: SUCCESS_RESPONSE,
};









export const listOrganizationsExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
      context: "context",
    },
    values: [
      {
        _links: {
          self: "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1",
        },
        id: "1",
        name: "Charlie Cakes Franchises",
        scimManaged: false,
      },
    ],
  },
};







export const createOrganizationExamplePayload = {
  data: {
    _links: {
      self: "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1",
    },
    id: "1",
    name: "Charlie Cakes Franchises",
    scimManaged: false,
  },
};







export const getOrganizationExamplePayload = {
  data: {
    _links: {
      self: "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1",
    },
    id: "1",
    name: "Charlie Cakes Franchises",
    scimManaged: false,
  },
};







export const deleteOrganizationExamplePayload = {
  data: SUCCESS_RESPONSE,
};







export const listOrganizationUsersExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
      context: "context",
    },
    values: [
      {
        accountId:
          "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
        name: "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
        key: "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
        emailAddress: "fred@example.com",
        displayName: "Fred F. User",
        active: true,
        timeZone: "Australia/Sydney",
      },
    ],
  },
};







export const addOrganizationUsersExamplePayload = {
  data: SUCCESS_RESPONSE,
};







export const removeOrganizationUsersExamplePayload = {
  data: SUCCESS_RESPONSE,
};







export const listServiceDeskOrganizationsExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
      context: "context",
    },
    values: [
      {
        id: "1",
        name: "Charlie Cakes Franchises",
        _links: {
          self: "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1",
        },
      },
    ],
  },
};







export const addServiceDeskOrganizationExamplePayload = {
  data: SUCCESS_RESPONSE,
};







export const removeServiceDeskOrganizationExamplePayload = {
  data: SUCCESS_RESPONSE,
};







export const listOrganizationPropertiesExamplePayload = {
  data: {
    keys: [
      {
        self: "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1/property/tier",
        key: "tier",
      },
    ],
  },
};







export const getOrganizationPropertyExamplePayload = {
  data: {
    key: "tier",
    value: {
      level: "enterprise",
      region: "us-east",
    },
  },
};







export const setOrganizationPropertyExamplePayload = {
  data: SUCCESS_RESPONSE,
};







export const deleteOrganizationPropertyExamplePayload = {
  data: SUCCESS_RESPONSE,
};









export const createCustomerExamplePayload = {
  data: {
    accountId:
      "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
    name: "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
    key: "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
    emailAddress: "fred@example.com",
    displayName: "Fred F. User",
    active: true,
    timeZone: "Australia/Sydney",
  },
};







export const createPortalOnlyCustomerExamplePayload = {
  data: {
    accountId: "5b10ac8d82e05b22cc7d4ef5",
    name: "fred@example.com",
    emailAddress: "fred@example.com",
    displayName: "Fred F. User",
    active: true,
    timeZone: "Australia/Sydney",
    _links: {
      jiraRest:
        "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
      self: "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
    },
  },
};







export const listCustomersExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
      context: "context",
    },
    values: [
      {
        accountId: "5b10ac8d82e05b22cc7d4ef5",
        emailAddress: "fred@example.com",
        displayName: "Fred F. User",
        active: true,
        timeZone: "Australia/Sydney",
        _links: {
          jiraRest:
            "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
          self: "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
        },
      },
    ],
  },
};







export const addCustomersExamplePayload = {
  data: SUCCESS_RESPONSE,
};







export const removeCustomersExamplePayload = {
  data: SUCCESS_RESPONSE,
};







export const revokePortalAccessExamplePayload = {
  data: SUCCESS_RESPONSE,
};









export const listRequestTypesExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
      context: "context",
    },
    values: [
      {
        _expands: [],
        id: "11001",
        _links: {
          self: "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001",
        },
        name: "Get IT Help",
        description: "Get IT Help",
        helpText:
          "Please tell us clearly the problem you have within 100 words.",
        issueTypeId: "12345",
        serviceDeskId: "28",
        portalId: "2",
        groupIds: ["12"],
        icon: {
          id: "12345",
          _links: {
            iconUrls: {
              "48x48":
                "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001/icon",
              "24x24":
                "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001/icon",
              "16x16":
                "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001/icon",
              "32x32":
                "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001/icon",
            },
          },
        },
      },
    ],
  },
};







export const getRequestTypeExamplePayload = {
  data: {
    _expands: [],
    id: "11001",
    _links: {
      self: "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001",
    },
    name: "Get IT Help",
    description: "Get IT Help",
    helpText: "Please tell us clearly the problem you have within 100 words.",
    issueTypeId: "12345",
    serviceDeskId: "28",
    portalId: "2",
    groupIds: ["12"],
    icon: {
      id: "12345",
      _links: {
        iconUrls: {
          "48x48":
            "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001/icon",
          "24x24":
            "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001/icon",
          "16x16":
            "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001/icon",
          "32x32":
            "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001/icon",
        },
      },
    },
  },
};









export const listQueuesExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
      context: "context",
    },
    values: [
      {
        id: "10",
        name: "Unassigned issues",
        jql: 'project = SD AND assignee is EMPTY AND resolution = Unresolved ORDER BY "Time to resolution" ASC',
        fields: [
          "issuetype",
          "issuekey",
          "summary",
          "created",
          "reporter",
          "duedate",
        ],
        issueCount: 10,
        _links: {
          self: "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/1/queue/10",
        },
      },
    ],
  },
};







export const listQueueIssuesExamplePayload = {
  data: {
    _expands: [],
    size: 1,
    start: 0,
    limit: 50,
    isLastPage: true,
    _links: {
      base: "https://your-domain.atlassian.net/rest/servicedeskapi",
      context: "context",
    },
    values: [
      {
        fields: {
          summary: "My keyboard is broken",
          issuetype: {
            avatarId: 10002,
            description: "For general IT problems and questions",
            iconUrl:
              "https://your-domain.atlassian.net/servicedesk/issue-type-icons?icon=it-help",
            id: "13",
            name: "IT Help",
            self: "https://your-domain.atlassian.net/rest/api/2/issuetype/13",
            subtask: false,
          },
          duedate: "2015-11-11T14:17:13.000+0700",
          created: "2015-11-09T14:17:13.000+0700",
          reporter: {
            accountId:
              "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
            name: "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
            emailAddress: "fred@example.com",
            displayName: "Fred F. User",
            active: true,
            timeZone: "Australia/Sydney",
          },
        },
        id: "10001",
        key: "SD-1",
        self: "https://your-domain.atlassian.net/rest/servicedeskapi/rest/api/2/issue/10001",
      },
    ],
  },
};








const dataSourcePicklistExamplePayload = {
  result: [
    { key: "10001", label: "IT Help Desk" },
    { key: "10002", label: "Customer Service" },
  ],
};

export const selectServiceDeskExamplePayload = dataSourcePicklistExamplePayload;
export const selectOrganizationExamplePayload =
  dataSourcePicklistExamplePayload;
export const selectQueueExamplePayload = dataSourcePicklistExamplePayload;
export const selectRequestExamplePayload = dataSourcePicklistExamplePayload;
export const selectRequestTypeExamplePayload = dataSourcePicklistExamplePayload;
export const selectTransitionExamplePayload = dataSourcePicklistExamplePayload;
export const selectApprovalExamplePayload = dataSourcePicklistExamplePayload;
export const selectAssetSchemaExamplePayload = {
  result: [
    { key: "1", label: "ITSM" },
    { key: "2", label: "People & Roles" },
  ],
};
export const selectAssetObjectTypeExamplePayload = {
  result: [
    { key: "23", label: "Computer" },
    { key: "24", label: "Server" },
  ],
};
export const selectOpsScheduleExamplePayload = {
  result: [
    { key: "55a1ec02-92b6-4c95-9f0a-44213c8c5fb6", label: "Primary Rotation" },
    {
      key: "9f8d3a4e-1234-4abc-9def-0123456789ab",
      label: "Secondary Rotation",
    },
  ],
};









export const createIntegrationAlertExamplePayload = {
  data: {
    result: "Request will be processed",
    took: 0.302,
    requestId: "43a29c5c-3dbf-4fa4-9c26-f4f71023e120",
  },
};







export const acknowledgeIntegrationAlertExamplePayload = {
  data: {
    result: "Request will be processed",
    took: 0.107,
    requestId: "8eb01b62-04a5-4d57-a4a8-602e6ef5deaf",
  },
};







export const closeIntegrationAlertExamplePayload = {
  data: {
    result: "Request will be processed",
    took: 0.214,
    requestId: "2b0b8a2a-9ca6-4b5d-a3b1-3b1f0ce15de0",
  },
};







export const addIntegrationAlertNoteExamplePayload = {
  data: {
    result: "Request will be processed",
    took: 0.165,
    requestId: "a93e4881-0c2e-4f2a-9f3a-0e2bdc9a6d11",
  },
};







export const getIntegrationAlertRequestExamplePayload = {
  data: {
    data: {
      success: true,
      action: "Create",
      processedAt: "2026-05-04T12:00:00.000Z",
      integrationId: "9b1d8e12-4567-4cba-bc1f-1b2a3c4d5e6f",
      isSuccess: true,
      status: "Created alert",
      alertId: "70413a06-38d6-4c85-92b8-5ebc900d42e2",
      alias: "disk-usage-web-prod-01",
    },
    took: 0.001,
    requestId: "43a29c5c-3dbf-4fa4-9c26-f4f71023e120",
  },
};









export const listOpsAlertsExamplePayload = {
  data: {
    values: [
      {
        id: "70413a06-38d6-4c85-92b8-5ebc900d42e2",
        tinyId: "1791",
        alias: "disk-usage-web-prod-01",
        message: "Disk usage at 95% on web-prod-01",
        status: "open",
        acknowledged: false,
        seen: true,
        tags: ["production", "disk"],
        snoozed: false,
        count: 79,
        lastOccuredAt: "2026-05-04T11:55:00.000Z",
        createdAt: "2026-05-04T08:00:00.000Z",
        updatedAt: "2026-05-04T11:55:00.000Z",
        source: "Datadog",
        owner: "monica@example.com",
        priority: "P2",
        responders: [{ type: "team", id: "team-1" }],
        entity: "",
        integrationType: "Datadog",
        integrationName: "Datadog Production",
        actions: [],
      },
    ],
    links: {
      next: "/v1/alerts?offset=20&size=20&sort=createdAt&order=desc",
    },
    count: 79,
  },
};







export const getOpsAlertExamplePayload = {
  data: {
    data: {
      id: "70413a06-38d6-4c85-92b8-5ebc900d42e2",
      tinyId: "1791",
      alias: "disk-usage-web-prod-01",
      message: "Disk usage at 95% on web-prod-01",
      description:
        "Disk /var has crossed the 95% threshold and continues to grow.",
      status: "open",
      acknowledged: false,
      isSeen: true,
      tags: ["production", "disk"],
      snoozed: false,
      count: 79,
      lastOccurredAt: "2026-05-04T11:55:00.000Z",
      createdAt: "2026-05-04T08:00:00.000Z",
      updatedAt: "2026-05-04T11:55:00.000Z",
      source: "Datadog",
      owner: "monica@example.com",
      priority: "P2",
      responders: [{ type: "team", id: "team-1" }],
      details: { region: "us-east-1", host: "web-prod-01" },
    },
    took: 0.005,
    requestId: "0a2b8c39-1ad7-46a9-9b43-6f5a13d4f7c0",
  },
};







export const deleteOpsAlertExamplePayload = { data: SUCCESS_RESPONSE };







export const createOpsAlertExamplePayload = {
  data: {
    result: "Request will be processed",
    took: 0.092,
    requestId: "8b7f1f8d-9b4c-4e2c-8e1d-2b5a7c9d0f1a",
  },
};







export const acknowledgeOpsAlertExamplePayload = {
  data: {
    result: "Request will be processed",
    took: 0.107,
    requestId: "8eb01b62-04a5-4d57-a4a8-602e6ef5deaf",
  },
};







export const closeOpsAlertExamplePayload = {
  data: {
    result: "Request will be processed",
    took: 0.214,
    requestId: "2b0b8a2a-9ca6-4b5d-a3b1-3b1f0ce15de0",
  },
};







export const snoozeOpsAlertExamplePayload = {
  data: {
    result: "Request will be processed",
    took: 0.083,
    requestId: "1de1f7a8-9e0e-4b13-a4a6-b7f5e4ed3f70",
  },
};









export const listOpsSchedulesExamplePayload = {
  data: {
    values: [
      {
        id: "55a1ec02-92b6-4c95-9f0a-44213c8c5fb6",
        name: "Primary Rotation",
        description: "Primary on-call rotation for the Platform team",
        timezone: "America/Los_Angeles",
        enabled: true,
        teamId: "cd68207b-c55d-4611-ab25-72fd0c439e9f",
      },
    ],
    links: {},
    _expands: [],
  },
};







export const getOpsScheduleExamplePayload = {
  data: {
    id: "55a1ec02-92b6-4c95-9f0a-44213c8c5fb6",
    name: "Primary Rotation",
    description: "Primary on-call rotation for the Platform team",
    timezone: "America/Los_Angeles",
    enabled: true,
    teamId: "cd68207b-c55d-4611-ab25-72fd0c439e9f",
    rotations: [
      {
        id: "rot-1",
        name: "Weekly",
        startDate: "2026-05-04T00:00:00Z",
        type: "weekly",
        length: 1,
        participants: [
          { type: "user", id: "5b2b0e011b3a756623f4e25e" },
          { type: "user", id: "c5646941-3f05-404d-8594-825fa73af99f" },
        ],
      },
    ],
  },
};







export const getOpsOnCallExamplePayload = {
  data: {
    onCallParticipants: [
      {
        id: "bc667897-cb21-496f-a46e-7c05ff0419dd",
        type: "team",
      },
      {
        id: "5b2b0e011b3a756623f4e25e",
        type: "user",
      },
      {
        id: "7a24e9d7-7a4f-4f86-a1df-21ca9c3112ac",
        type: "escalation",
        onCallParticipants: [
          {
            id: "5b2b0e011b3a756623f4e25e",
            type: "user",
            forwardedFrom: {
              id: "c5646941-3f05-404d-8594-825fa73af99f",
              type: "user",
            },
          },
        ],
      },
    ],
  },
};









export const getAssetObjectExamplePayload = {
  data: {
    workspaceId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a",
    globalId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a:425",
    id: "425",
    label: "web-prod-01",
    objectKey: "ITAM-425",
    avatar: {
      workspaceId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a",
      globalId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a:avatar-425",
      url16: "https://your-domain.atlassian.net/.../avatar/16",
      url48: "https://your-domain.atlassian.net/.../avatar/48",
      url72: "https://your-domain.atlassian.net/.../avatar/72",
      url144: "https://your-domain.atlassian.net/.../avatar/144",
      url288: "https://your-domain.atlassian.net/.../avatar/288",
      objectId: "425",
    },
    objectType: {
      workspaceId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a",
      globalId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a:23",
      id: "23",
      name: "Computer",
      type: 0,
      icon: {
        id: "1",
        name: "Computer",
        url16: "https://.../icon/16",
        url48: "https://.../icon/48",
      },
      position: 0,
      created: "2026-04-01T00:00:00.000Z",
      updated: "2026-05-04T11:55:00.000Z",
      objectCount: 87,
      objectSchemaId: "1",
      inherited: false,
      abstractObjectType: false,
      parentObjectTypeInherited: false,
    },
    created: "2026-05-04T08:00:00.000Z",
    updated: "2026-05-04T11:55:00.000Z",
    hasAvatar: false,
    timestamp: 1746355200000,
    attributes: [
      {
        workspaceId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a",
        globalId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a:9000",
        id: "9000",
        objectTypeAttributeId: "135",
        objectAttributeValues: [
          {
            value: "web-prod-01",
            displayValue: "web-prod-01",
            searchValue: "web-prod-01",
            referencedType: false,
          },
        ],
        objectId: "425",
      },
    ],
    _links: {
      self: "https://your-domain.atlassian.net/jira/servicedesk/assets/object/ITAM-425",
    },
  },
};







export const createAssetObjectExamplePayload = getAssetObjectExamplePayload;







export const updateAssetObjectExamplePayload = getAssetObjectExamplePayload;







export const deleteAssetObjectExamplePayload = { data: SUCCESS_RESPONSE };







export const searchAssetObjectsExamplePayload = {
  data: {
    startAt: 0,
    maxResults: 25,
    total: 1,
    values: [getAssetObjectExamplePayload.data],
    objectTypeAttributes: [
      {
        workspaceId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a",
        globalId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a:135",
        id: "135",
        name: "Name",
        type: 0,
        defaultType: { id: 0, name: "Text" },
        editable: true,
        system: false,
        sortable: true,
        summable: false,
        minimumCardinality: 1,
        maximumCardinality: 1,
        removable: true,
        hidden: false,
        includeChildObjectTypes: false,
        uniqueAttribute: true,
        regexValidation: "",
      },
    ],
    last: true,
    isLast: true,
  },
};









export const listAssetSchemasExamplePayload = {
  data: {
    startAt: 0,
    maxResults: 50,
    total: 1,
    isLast: true,
    values: [
      {
        workspaceId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a",
        globalId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a:1",
        id: "1",
        name: "ITSM",
        objectSchemaKey: "ITSM",
        status: "Ok",
        description: "IT service management assets",
        created: "2026-04-01T00:00:00.000Z",
        updated: "2026-05-01T00:00:00.000Z",
        objectCount: 425,
        objectTypeCount: 18,
        canManage: true,
        idAsInt: 1,
      },
    ],
  },
};







export const getAssetSchemaExamplePayload = {
  data: listAssetSchemasExamplePayload.data.values[0],
};







export const listSchemaObjectTypesExamplePayload = {
  data: {
    entries: [
      {
        workspaceId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a",
        globalId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a:23",
        id: "23",
        name: "Computer",
        type: 0,
        icon: { id: "1", name: "Computer", url16: "https://.../icon/16" },
        position: 0,
        created: "2026-04-01T00:00:00.000Z",
        updated: "2026-04-01T00:00:00.000Z",
        objectCount: 87,
        objectSchemaId: "1",
        inherited: false,
        abstractObjectType: false,
        parentObjectTypeInherited: false,
      },
      {
        workspaceId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a",
        globalId: "f1668d0c-828c-470c-b7d1-8c4f48cd345a:24",
        id: "24",
        name: "Server",
        type: 0,
        icon: { id: "2", name: "Server", url16: "https://.../icon/16" },
        position: 1,
        created: "2026-04-01T00:00:00.000Z",
        updated: "2026-04-01T00:00:00.000Z",
        objectCount: 42,
        objectSchemaId: "1",
        inherited: false,
        abstractObjectType: false,
        parentObjectTypeInherited: false,
      },
    ],
  },
};



export const onNewRequestExamplePayload: {
  payload: TriggerPayload;
  polledNoChanges?: boolean;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: undefined, contentType: undefined },
    body: {
      data: [
        {
          issueId: "107001",
          issueKey: "HELPDESK-1",
          summary: "Request JSD help via REST",
          requestTypeId: "25",
          serviceDeskId: "10",
          createdDate: {
            epochMillis: 1444290120000,
            friendly: "Monday 14:42 PM",
            iso8601: "2015-10-08T14:42:00+0700",
            jira: "2015-10-08T14:42:00.000+0700",
          },
          currentStatus: {
            status: "Waiting for Support",
            statusCategory: "NEW",
          },
          reporter: {
            accountId:
              "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
            displayName: "Fred F. User",
            emailAddress: "fred@example.com",
          },
        },
      ],
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "",
    customer: { id: "", name: "", externalId: "" },
    instance: { id: "", name: "" },
    user: { id: "", name: "", email: "", externalId: "" },
    integration: {
      id: "",
      name: "",
      versionSequenceId: "",
      externalVersion: "",
    },
    flow: { id: "", name: "" },
    startedAt: "2026-05-12T00:00:00.000Z",
    globalDebug: false,
  },
  polledNoChanges: false,
};

export const onNewOpsAlertExamplePayload: {
  payload: TriggerPayload;
  polledNoChanges?: boolean;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: undefined, contentType: undefined },
    body: {
      data: [
        {
          id: "70413a06-38d6-4c85-92b8-5ebc900d42e2",
          tinyId: "1791",
          alias: "disk-usage-web-prod-01",
          message: "Disk usage at 95% on web-prod-01",
          status: "open",
          createdAt: 1746345600000,
          acknowledged: false,
          seen: true,
          tags: ["production", "disk"],
          priority: "P2",
          source: "Datadog",
          owner: "monica@example.com",
        },
      ],
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "",
    customer: { id: "", name: "", externalId: "" },
    instance: { id: "", name: "" },
    user: { id: "", name: "", email: "", externalId: "" },
    integration: {
      id: "",
      name: "",
      versionSequenceId: "",
      externalVersion: "",
    },
    flow: { id: "", name: "" },
    startedAt: "2026-05-12T00:00:00.000Z",
    globalDebug: false,
  },
  polledNoChanges: false,
};
