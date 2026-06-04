import { baseUrl } from "../connections";
import { SUCCESS_MESSAGE } from "../constants";










export const createCustomObjectPayload = {
  data: {
    id: "2116144016",
    createdAt: "2024-01-15T18:07:11.390Z",
    updatedAt: "2024-01-15T18:09:07.555Z",
    properties: [
      {
        updatedAt: "2024-01-15T18:07:11.802Z",
        createdAt: "2024-01-15T18:07:11.802Z",
        name: "inventory_number",
        label: "Inventory Number",
        type: "string",
        fieldType: "text",
        groupName: "equipment_information",
        displayOrder: 1,
        calculated: false,
        externalOptions: false,
        archived: false,
        hasUniqueValue: true,
      },
      {
        updatedAt: "2024-01-15T18:07:11.802Z",
        createdAt: "2024-01-15T18:07:11.802Z",
        name: "purchase_date",
        label: "Purchase Date",
        type: "date",
        fieldType: "date",
        groupName: "equipment_information",
        displayOrder: 2,
        calculated: false,
        externalOptions: false,
        archived: false,
        hasUniqueValue: false,
      },
    ],
    associations: [
      {
        id: "789",
        fromObjectTypeId: "2-116144016",
        toObjectTypeId: "0-1",
        name: "equipment_to_contact",
      },
    ],
    labels: {
      singular: "Equipment",
      plural: "Equipment Items",
    },
    requiredProperties: ["inventory_number"],
    searchableProperties: ["inventory_number", "purchase_date"],
    primaryDisplayProperty: "inventory_number",
    metaType: "PORTAL_SPECIFIC",
    fullyQualifiedName: "p12345678_equipment",
    name: "equipment",
  },
};


export const deleteCustomObjectPayload = { data: {} };

export const getCustomObjectPayload = createCustomObjectPayload;

export const listCustomObjectsPayload = {
  data: {
    results: [
      createCustomObjectPayload.data,
      {
        id: "2117255127",
        createdAt: "2024-01-16T09:12:33.120Z",
        updatedAt: "2024-01-16T09:15:22.340Z",
        properties: [
          {
            updatedAt: "2024-01-16T09:12:33.450Z",
            createdAt: "2024-01-16T09:12:33.450Z",
            name: "service_contract_number",
            label: "Service Contract Number",
            type: "string",
            fieldType: "text",
            groupName: "contract_information",
            displayOrder: 1,
            calculated: false,
            externalOptions: false,
            archived: false,
            hasUniqueValue: true,
          },
        ],
        associations: [
          {
            id: "790",
            fromObjectTypeId: "2-117255127",
            toObjectTypeId: "0-2",
            name: "contract_to_company",
          },
        ],
        labels: {
          singular: "Service Contract",
          plural: "Service Contracts",
        },
        requiredProperties: ["service_contract_number"],
        searchableProperties: ["service_contract_number"],
        primaryDisplayProperty: "service_contract_number",
        metaType: "PORTAL_SPECIFIC",
        fullyQualifiedName: "p12345678_service_contract",
        name: "service_contract",
      },
    ],
  },
};

export const updateCustomObjectPayload = createCustomObjectPayload;





export const archiveBatchEngagementPayload = {
  data: {},
};

export const createBatchEngagementPayload = {
  data: {
    status: "COMPLETE",
    results: [
      {
        id: "47231018154",
        properties: {
          hs_body_preview: "Follow up with John Doe about the proposal",
          hs_body_preview_html:
            "<html>\n <head></head>\n <body>\n Follow up with John Doe about the proposal\n </body>\n</html>",
          hs_body_preview_is_truncated: "false",
          hs_createdate: "2024-01-15T14:09:49.695Z",
          hs_lastmodifieddate: "2024-01-15T14:09:49.695Z",
          hs_object_id: "47231018154",
          hs_object_source: "INTEGRATION",
          hs_object_source_id: "654321",
          hs_object_source_label: "INTEGRATION",
          hs_pipeline_stage: "dd5826e4-c976-4654-a527-b59ada512345",
          hs_task_body: "Follow up with John Doe about the proposal",
          hs_task_completion_count: "0",
          hs_task_family: "SALES",
          hs_task_for_object_type: "OWNER",
          hs_task_is_all_day: "false",
          hs_task_is_completed: "0",
          hs_task_is_completed_call: "0",
          hs_task_is_completed_email: "0",
          hs_task_is_completed_linked_in: "0",
          hs_task_is_completed_sequence: "0",
          hs_task_is_overdue: "false",
          hs_task_is_past_due_date: "false",
          hs_task_missed_due_date: "false",
          hs_task_missed_due_date_count: "0",
          hs_task_priority: "HIGH",
          hs_task_status: "WAITING",
          hs_task_subject: "Follow up: Q1 2024 Proposal",
          hs_task_type: "CALL",
          hs_timestamp: "2024-01-16T15:30:00.000Z",
        },
        createdAt: "2024-01-15T14:09:49.695Z",
        updatedAt: "2024-01-15T14:09:49.695Z",
        archived: false,
      },
    ],
    startedAt: "2024-01-15T14:09:49.666Z",
    completedAt: "2024-01-15T14:09:49.903Z",
  },
};

export const createEngagementPayload = {
  data: {
    id: "47231018317",
    properties: {
      hs_body_preview: "Schedule demo for new product features",
      hs_body_preview_html:
        "<html>\n <head></head>\n <body>\n Schedule demo for new product features\n </body>\n</html>",
      hs_body_preview_is_truncated: "false",
      hs_createdate: "2024-01-15T21:27:23.876Z",
      hs_lastmodifieddate: "2024-01-15T21:27:23.876Z",
      hs_object_id: "47231018317",
      hs_object_source: "INTEGRATION",
      hs_object_source_id: "789012",
      hs_object_source_label: "INTEGRATION",
      hs_task_body: "Schedule demo for new product features",
      hs_task_completion_count: "0",
      hs_task_family: "SALES",
      hs_task_for_object_type: "OWNER",
      hs_task_is_all_day: "false",
      hs_task_is_completed: "0",
      hs_task_is_completed_call: "0",
      hs_task_is_completed_email: "0",
      hs_task_is_completed_linked_in: "0",
      hs_task_is_completed_sequence: "0",
      hs_task_is_overdue: "false",
      hs_task_is_past_due_date: "false",
      hs_task_missed_due_date: "false",
      hs_task_missed_due_date_count: "0",
      hs_task_priority: "MEDIUM",
      hs_task_status: "NOT_STARTED",
      hs_task_subject: "Product Demo: Enterprise Plan",
      hs_task_type: "TODO",
      hs_timestamp: "2024-01-18T14:00:00.000Z",
    },
    createdAt: "2024-01-15T21:27:23.876Z",
    updatedAt: "2024-01-15T21:27:23.876Z",
    archived: false,
  },
};

export const deleteEngagementPayload = { data: {} };

export const getEngagementPayload = {
  data: {
    id: "47231018154",
    properties: {
      hs_createdate: "2024-01-15T01:42:51.758Z",
      hs_lastmodifieddate: "2024-01-15T01:42:51.950Z",
      hs_object_id: "47231018154",
      hs_task_body:
        '<div style="" dir="auto" data-top-level="true">Review contract terms and prepare questions for legal team.</div>',
      hs_task_subject: "Contract Review Meeting Prep",
      hs_task_type: "TODO",
      hs_task_status: "NOT_STARTED",
      hs_task_priority: "HIGH",
      hs_timestamp: "2024-01-16T14:00:00Z",
    },
    propertiesWithHistory: {
      hs_task_body: [
        {
          value:
            '<div style="" dir="auto" data-top-level="true">Review contract terms and prepare questions for legal team.</div>',
          timestamp: "2024-01-15T01:42:51.758Z",
          sourceType: "CRM_UI",
          sourceId: "userId:45678",
          updatedByUserId: 45678,
        },
      ],
    },
    createdAt: "2024-01-15T01:42:51.758Z",
    updatedAt: "2024-01-15T01:42:51.950Z",
    archived: false,
  },
};

export const listEngagementsPayload = {
  data: [
    {
      id: "47231018154",
      properties: {
        hs_createdate: "2024-01-15T01:42:51.758Z",
        hs_lastmodifieddate: "2024-01-15T01:42:51.950Z",
        hs_object_id: "47231018154",
        hs_task_subject: "Follow up call",
        hs_task_type: "CALL",
        hs_task_status: "COMPLETED",
      },
      createdAt: "2024-01-15T01:42:51.758Z",
      updatedAt: "2024-01-15T01:42:51.950Z",
      archived: false,
    },
    {
      id: "47231018317",
      properties: {
        hs_createdate: "2024-01-15T01:43:03.422Z",
        hs_lastmodifieddate: "2024-01-15T01:43:03.891Z",
        hs_object_id: "47231018317",
        hs_task_subject: "Send proposal",
        hs_task_type: "TODO",
        hs_task_status: "NOT_STARTED",
      },
      createdAt: "2024-01-15T01:43:03.422Z",
      updatedAt: "2024-01-15T01:43:03.891Z",
      archived: false,
    },
  ],
};

export const updateBatchEngagementPayload = {
  data: {
    status: "COMPLETE",
    results: [
      {
        id: "47231018154",
        properties: {
          hs_body_preview: "Updated task description",
          hs_body_preview_html:
            "<html>\n <head></head>\n <body>\n Updated task description\n </body>\n</html>",
          hs_body_preview_is_truncated: "false",
          hs_createdate: "2024-01-15T02:31:49.230Z",
          hs_lastmodifieddate: "2024-01-15T02:31:49.651Z",
          hs_object_id: "47231018154",
          hs_pipeline_stage: "dd5826e4-c976-4654-a527-b59ada512345",
          hs_task_body: "Updated task description",
          hs_task_status: "COMPLETED",
        },
        createdAt: "2024-01-15T02:31:49.230Z",
        updatedAt: "2024-01-15T02:31:49.651Z",
        archived: false,
      },
    ],
    startedAt: "2024-01-15T02:31:49.629Z",
    completedAt: "2024-01-15T02:31:49.703Z",
  },
};

export const updateEngagementPayload = {
  data: {
    id: "47231018317",
    properties: {
      hs_body_preview: "Task completed successfully",
      hs_body_preview_html:
        "<html>\n <head></head>\n <body>\n Task completed successfully\n </body>\n</html>",
      hs_body_preview_is_truncated: "false",
      hs_createdate: "2024-01-15T22:04:01.144Z",
      hs_lastmodifieddate: "2024-01-15T22:04:01.871Z",
      hs_object_id: "47231018317",
      hs_task_body: "Task completed successfully",
      hs_task_status: "COMPLETED",
    },
    createdAt: "2024-01-15T22:04:01.144Z",
    updatedAt: "2024-01-15T22:04:01.871Z",
    archived: false,
  },
};





export const listAssociationTypesPayload = {
  data: {
    results: [
      {
        name: "contact_to_company",
        id: "1",
      },
      {
        name: "company_to_deal",
        id: "341",
      },
      {
        name: "deal_to_line_item",
        id: "19",
      },
    ],
  },
};

export const createAssociationsPayload = {
  data: {
    completedAt: "2024-01-15T23:59:28.273Z",
    requestedAt: "2024-01-15T23:59:28.120Z",
    startedAt: "2024-01-15T23:59:28.150Z",
    links: {},
    results: [
      {
        from: {
          id: "65059681027",
        },
        to: {
          id: "98765432101",
        },
        type: "contact_to_company",
      },
    ],
    status: "COMPLETE",
  },
};

export const readAssociationsPayload = {
  data: {
    completedAt: "2024-01-15T23:59:28.283Z",
    requestedAt: "2024-01-15T23:59:28.120Z",
    startedAt: "2024-01-15T23:59:28.150Z",
    links: {},
    results: [
      {
        from: {
          id: "65059681027",
        },
        paging: {
          next: {
            link: `${baseUrl}/crm/v3/associations/contact/company/batch/read?after=98765432102`,
            after: "98765432102",
          },
        },
        to: [
          {
            id: "98765432101",
            type: "contact_to_company",
          },
          {
            id: "98765432102",
            type: "contact_to_company",
          },
        ],
      },
    ],
    status: "COMPLETE",
  },
};

export const archiveAssociationsPayload = {
  data: {},
};





export const listCompaniesPayload = {
  data: {
    results: [
      {
        id: "98765432101",
        properties: {
          createdate: "2024-01-10T10:36:45.123Z",
          domain: "acmecorp.com",
          hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
          hs_object_id: "98765432101",
          name: "Acme Corporation",
          industry: "Technology",
          city: "San Francisco",
          state: "California",
          country: "United States",
        },
        createdAt: "2024-01-10T10:36:45.123Z",
        updatedAt: "2024-01-15T14:22:10.456Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "98765432102",
        link: `${baseUrl}/crm/v3/objects/companies?limit=10&after=98765432102`,
      },
    },
  },
};

export const deleteCompanyPayload = { data: {} };

export const createCompanyPayload = {
  data: {
    createdAt: "2024-01-15T00:06:42.321Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      name: [
        {
          sourceId: "CRM_UI",
          sourceType: "CRM_UI",
          sourceLabel: "CRM UI",
          updatedByUserId: 45678,
          value: "TechStart Industries",
          timestamp: "2024-01-15T00:06:42.321Z",
        },
      ],
      domain: [
        {
          sourceId: "CRM_UI",
          sourceType: "CRM_UI",
          sourceLabel: "CRM UI",
          updatedByUserId: 45678,
          value: "techstart.com",
          timestamp: "2024-01-15T00:06:42.321Z",
        },
      ],
    },
    id: "98765432103",
    properties: {
      name: "TechStart Industries",
      domain: "techstart.com",
      industry: "Software Development",
      city: "Austin",
      state: "Texas",
      country: "United States",
      phone: "5125551234",
      numberofemployees: "50",
      annualrevenue: "5000000",
    },
    updatedAt: "2024-01-15T00:06:42.321Z",
  },
};

export const updateCompanyPayload = {
  data: {
    createdAt: "2024-01-15T00:06:42.336Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      name: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "TechStart Industries Inc.",
          timestamp: "2024-01-16T10:15:30.120Z",
        },
      ],
      numberofemployees: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "75",
          timestamp: "2024-01-16T10:15:30.120Z",
        },
      ],
    },
    id: "98765432103",
    properties: {
      name: "TechStart Industries Inc.",
      domain: "techstart.com",
      industry: "Software Development",
      city: "Austin",
      state: "Texas",
      country: "United States",
      phone: "5125551234",
      numberofemployees: "75",
      annualrevenue: "5000000",
    },
    updatedAt: "2024-01-16T10:15:30.120Z",
  },
};





export const listContactsPayload = {
  data: {
    results: [
      {
        id: "65059681027",
        properties: {
          createdate: "2024-01-10T08:30:15.234Z",
          email: "john.doe@example.com",
          firstname: "John",
          hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
          lastname: "Doe",
          hs_object_id: "65059681027",
          phone: "5551234567",
          company: "Acme Corporation",
          jobtitle: "Sales Manager",
        },
        createdAt: "2024-01-10T08:30:15.234Z",
        updatedAt: "2024-01-15T14:22:10.456Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "65059681028",
        link: `${baseUrl}/crm/v3/objects/contacts?limit=10&after=65059681028`,
      },
    },
  },
};

export const deleteContactPayload = { data: {} };

export const createContactPayload = {
  data: {
    createdAt: "2024-01-15T00:20:24.825Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      email: [
        {
          sourceId: "CRM_UI",
          sourceType: "CRM_UI",
          sourceLabel: "CRM UI",
          updatedByUserId: 45678,
          value: "jane.smith@example.com",
          timestamp: "2024-01-15T00:20:24.825Z",
        },
      ],
      firstname: [
        {
          sourceId: "CRM_UI",
          sourceType: "CRM_UI",
          sourceLabel: "CRM UI",
          updatedByUserId: 45678,
          value: "Jane",
          timestamp: "2024-01-15T00:20:24.825Z",
        },
      ],
      lastname: [
        {
          sourceId: "CRM_UI",
          sourceType: "CRM_UI",
          sourceLabel: "CRM UI",
          updatedByUserId: 45678,
          value: "Smith",
          timestamp: "2024-01-15T00:20:24.825Z",
        },
      ],
    },
    id: "65059681029",
    properties: {
      email: "jane.smith@example.com",
      firstname: "Jane",
      lastname: "Smith",
      phone: "5559876543",
      company: "TechStart Industries",
      jobtitle: "Marketing Director",
      lifecyclestage: "lead",
    },
    updatedAt: "2024-01-15T00:20:24.825Z",
  },
};

export const updateContactPayload = {
  data: {
    createdAt: "2024-01-15T00:20:24.840Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      jobtitle: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "VP of Marketing",
          timestamp: "2024-01-16T09:30:15.234Z",
        },
      ],
      phone: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "5559876544",
          timestamp: "2024-01-16T09:30:15.234Z",
        },
      ],
    },
    id: "65059681029",
    properties: {
      email: "jane.smith@example.com",
      firstname: "Jane",
      lastname: "Smith",
      phone: "5559876544",
      company: "TechStart Industries",
      jobtitle: "VP of Marketing",
      lifecyclestage: "opportunity",
    },
    updatedAt: "2024-01-16T09:30:15.234Z",
  },
};

export const archiveBatchContactsPayload = { data: {} };

export const createBatchContactsPayload = {
  data: {
    completedAt: "2024-01-15T08:27:09.446Z",
    requestedAt: "2024-01-15T08:27:09.120Z",
    startedAt: "2024-01-15T08:27:09.150Z",
    links: {},
    results: [
      {
        createdAt: "2024-01-15T08:27:09.446Z",
        archived: false,
        archivedAt: null,
        propertiesWithHistory: {
          email: [
            {
              sourceId: "API",
              sourceType: "API",
              sourceLabel: "API",
              updatedByUserId: 0,
              value: "alice.johnson@example.com",
              timestamp: "2024-01-15T08:27:09.446Z",
            },
          ],
        },
        id: "65059681030",
        properties: {
          email: "alice.johnson@example.com",
          firstname: "Alice",
          lastname: "Johnson",
          company: "Innovation Labs",
          jobtitle: "Product Manager",
        },
        updatedAt: "2024-01-15T08:27:09.446Z",
      },
    ],
    status: "COMPLETE",
  },
};

export const getBatchContactsPayload = {
  data: {
    completedAt: "2024-01-15T08:27:09.454Z",
    requestedAt: "2024-01-15T08:27:09.120Z",
    startedAt: "2024-01-15T08:27:09.150Z",
    links: {},
    results: [
      {
        createdAt: "2024-01-15T08:27:09.454Z",
        archived: false,
        archivedAt: null,
        propertiesWithHistory: {
          email: [
            {
              sourceId: "CRM_UI",
              sourceType: "CRM_UI",
              sourceLabel: "CRM UI",
              updatedByUserId: 45678,
              value: "bob.wilson@example.com",
              timestamp: "2024-01-15T08:27:09.454Z",
            },
          ],
        },
        id: "65059681031",
        properties: {
          email: "bob.wilson@example.com",
          firstname: "Bob",
          lastname: "Wilson",
          company: "Global Enterprises",
          jobtitle: "CTO",
        },
        updatedAt: "2024-01-15T08:27:09.454Z",
      },
    ],
    status: "COMPLETE",
  },
};

export const updateBatchContactsPayload = {
  data: {
    completedAt: "2024-01-15T08:27:09.462Z",
    requestedAt: "2024-01-15T08:27:09.120Z",
    startedAt: "2024-01-15T08:27:09.150Z",
    links: {},
    results: [
      {
        createdAt: "2024-01-15T08:27:09.462Z",
        archived: false,
        archivedAt: null,
        propertiesWithHistory: {
          lifecyclestage: [
            {
              sourceId: "API",
              sourceType: "API",
              sourceLabel: "API",
              updatedByUserId: 0,
              value: "customer",
              timestamp: "2024-01-16T10:30:22.150Z",
            },
          ],
        },
        id: "65059681030",
        properties: {
          email: "alice.johnson@example.com",
          firstname: "Alice",
          lastname: "Johnson",
          company: "Innovation Labs",
          jobtitle: "Product Manager",
          lifecyclestage: "customer",
        },
        updatedAt: "2024-01-16T10:30:22.150Z",
      },
    ],
    status: "COMPLETE",
  },
};





export const listDealsPayload = {
  data: {
    results: [
      {
        id: "87654321098",
        properties: {
          amount: "50000.00",
          closedate: "2024-03-31T00:00:00.000Z",
          createdate: "2024-01-10T09:15:30.234Z",
          dealname: "Q1 2024 Enterprise Contract",
          dealstage: "presentationscheduled",
          hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
          hs_object_id: "87654321098",
          pipeline: "default",
        },
        createdAt: "2024-01-10T09:15:30.234Z",
        updatedAt: "2024-01-15T14:22:10.456Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "87654321099",
        link: `${baseUrl}/crm/v3/objects/deals?limit=10&after=87654321099`,
      },
    },
  },
};

export const deleteDealPayload = { data: {} };

export const searchDealsPayload = {
  data: {
    total: 2,
    paging: {
      next: {
        link: "?after=NTI1Cg%3D%3D",
        after: "NTI1Cg%3D%3D",
      },
    },
    results: [
      {
        createdAt: "2024-01-15T00:24:54.571Z",
        archived: false,
        archivedAt: null,
        propertiesWithHistory: {
          dealname: [
            {
              sourceId: "CRM_UI",
              sourceType: "CRM_UI",
              sourceLabel: "CRM UI",
              updatedByUserId: 45678,
              value: "New Business Opportunity",
              timestamp: "2024-01-15T00:24:54.571Z",
            },
          ],
        },
        id: "87654321100",
        properties: {
          dealname: "New Business Opportunity",
          amount: "25000.00",
          closedate: "2024-02-28T00:00:00.000Z",
          dealstage: "qualifiedtobuy",
          pipeline: "default",
        },
        updatedAt: "2024-01-15T00:24:54.571Z",
      },
    ],
  },
};

export const createDealPayload = {
  data: {
    createdAt: "2024-01-15T00:24:54.526Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      dealname: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "Software License Renewal",
          timestamp: "2024-01-15T00:24:54.526Z",
        },
      ],
      amount: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "15000.00",
          timestamp: "2024-01-15T00:24:54.526Z",
        },
      ],
    },
    id: "87654321101",
    properties: {
      dealname: "Software License Renewal",
      amount: "15000.00",
      closedate: "2024-04-15T00:00:00.000Z",
      dealstage: "appointmentscheduled",
      pipeline: "default",
    },
    updatedAt: "2024-01-15T00:24:54.526Z",
  },
};

export const updateDealPayload = {
  data: {
    createdAt: "2024-01-15T00:24:54.543Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      dealstage: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "contractsent",
          timestamp: "2024-01-16T11:20:15.340Z",
        },
      ],
      amount: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "17500.00",
          timestamp: "2024-01-16T11:20:15.340Z",
        },
      ],
    },
    id: "87654321101",
    properties: {
      dealname: "Software License Renewal",
      amount: "17500.00",
      closedate: "2024-04-15T00:00:00.000Z",
      dealstage: "contractsent",
      pipeline: "default",
    },
    updatedAt: "2024-01-16T11:20:15.340Z",
  },
};





export const listLineItemsPayload = {
  data: {
    results: [
      {
        id: "54321098765",
        properties: {
          amount: "6000.00",
          createdate: "2024-01-10T10:20:30.456Z",
          hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
          hs_object_id: "54321098765",
          hs_product_id: "76543210987",
          name: "Professional Services Package",
          price: "6000.00",
          quantity: "1",
        },
        createdAt: "2024-01-10T10:20:30.456Z",
        updatedAt: "2024-01-15T14:22:10.456Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "54321098766",
        link: `${baseUrl}/crm/v3/objects/line_items?limit=10&after=54321098766`,
      },
    },
  },
};

export const deleteLineItemPayload = { data: {} };

export const createLineItemPayload = {
  data: {
    createdAt: "2024-01-15T00:31:42.469Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      name: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "1 Year Implementation Consultation",
          timestamp: "2024-01-15T00:31:42.469Z",
        },
      ],
    },
    id: "54321098767",
    properties: {
      name: "1 Year Implementation Consultation",
      price: "12000.00",
      quantity: "1",
      hs_product_id: "76543210988",
      recurringbillingfrequency: "annually",
      hs_recurring_billing_period: "P12M",
      amount: "12000.00",
    },
    updatedAt: "2024-01-15T00:31:42.469Z",
  },
};

export const updateLineItemPayload = {
  data: {
    createdAt: "2024-01-15T00:31:42.485Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      quantity: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "2",
          timestamp: "2024-01-16T11:45:30.250Z",
        },
      ],
      amount: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "24000.00",
          timestamp: "2024-01-16T11:45:30.250Z",
        },
      ],
    },
    id: "54321098767",
    properties: {
      name: "1 Year Implementation Consultation",
      price: "12000.00",
      quantity: "2",
      hs_product_id: "76543210988",
      recurringbillingfrequency: "annually",
      hs_recurring_billing_period: "P12M",
      amount: "24000.00",
    },
    updatedAt: "2024-01-16T11:45:30.250Z",
  },
};





export const listProductsPayload = {
  data: {
    results: [
      {
        id: "76543210987",
        properties: {
          createdate: "2024-01-05T08:15:20.123Z",
          hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
          hs_object_id: "76543210987",
          name: "Enterprise Software License",
          price: "25000.00",
          description: "Annual enterprise software license with premium support",
          hs_sku: "ENT-SW-001",
        },
        createdAt: "2024-01-05T08:15:20.123Z",
        updatedAt: "2024-01-15T14:22:10.456Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "76543210988",
        link: `${baseUrl}/crm/v3/objects/products?limit=10&after=76543210988`,
      },
    },
  },
};

export const deleteProductPayload = { data: {} };

export const createProductPayload = {
  data: {
    createdAt: "2024-01-15T00:35:05.442Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      name: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "Professional Services - Implementation",
          timestamp: "2024-01-15T00:35:05.442Z",
        },
      ],
    },
    id: "76543210989",
    properties: {
      name: "Professional Services - Implementation",
      price: "8500.00",
      hs_sku: "PS-IMP-002",
      description: "Full implementation service including data migration and training",
      hs_cost_of_goods_sold: "2500.00",
      hs_recurring_billing_period: "P0M",
    },
    updatedAt: "2024-01-15T00:35:05.442Z",
  },
};

export const updateProductPayload = {
  data: {
    createdAt: "2024-01-15T00:35:05.457Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      price: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "9000.00",
          timestamp: "2024-01-16T12:10:45.680Z",
        },
      ],
      description: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value:
            "Full implementation service including data migration, training, and 30-day support",
          timestamp: "2024-01-16T12:10:45.680Z",
        },
      ],
    },
    id: "76543210989",
    properties: {
      name: "Professional Services - Implementation",
      price: "9000.00",
      hs_sku: "PS-IMP-002",
      description:
        "Full implementation service including data migration, training, and 30-day support",
      hs_cost_of_goods_sold: "2500.00",
      hs_recurring_billing_period: "P0M",
    },
    updatedAt: "2024-01-16T12:10:45.680Z",
  },
};





export const listPropertiesPayload = {
  data: {
    results: [
      {
        createdUserId: "45678",
        hidden: false,
        modificationMetadata: {
          readOnlyOptions: false,
          readOnlyValue: false,
          readOnlyDefinition: false,
          archivable: true,
        },
        displayOrder: 2,
        description: "The contact's email address",
        showCurrencySymbol: false,
        label: "Email",
        type: "string",
        hubspotDefined: true,
        formField: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        archivedAt: null,
        archived: false,
        groupName: "contactinformation",
        referencedObjectType: null,
        name: "email",
        options: [],
        calculationFormula: null,
        hasUniqueValue: true,
        fieldType: "text",
        updatedUserId: "45678",
        calculated: false,
        externalOptions: false,
        updatedAt: "2024-01-15T10:30:00.000Z",
      },
      {
        createdUserId: "45678",
        hidden: false,
        modificationMetadata: {
          readOnlyOptions: true,
          readOnlyValue: false,
          readOnlyDefinition: false,
          archivable: true,
        },
        displayOrder: 5,
        description: "The contact's lifecycle stage",
        showCurrencySymbol: false,
        label: "Lifecycle Stage",
        type: "enumeration",
        hubspotDefined: true,
        formField: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        archivedAt: null,
        archived: false,
        groupName: "contactinformation",
        referencedObjectType: null,
        name: "lifecyclestage",
        options: [
          {
            hidden: false,
            displayOrder: 1,
            description: "Subscriber",
            label: "Subscriber",
            value: "subscriber",
          },
          {
            hidden: false,
            displayOrder: 2,
            description: "Lead",
            label: "Lead",
            value: "lead",
          },
          {
            hidden: false,
            displayOrder: 3,
            description: "Opportunity",
            label: "Opportunity",
            value: "opportunity",
          },
          {
            hidden: false,
            displayOrder: 4,
            description: "Customer",
            label: "Customer",
            value: "customer",
          },
        ],
        calculationFormula: null,
        hasUniqueValue: false,
        fieldType: "select",
        updatedUserId: "45678",
        calculated: false,
        externalOptions: false,
        updatedAt: "2024-01-15T10:30:00.000Z",
      },
    ],
  },
};





export const cancelImportPayload = {
  data: {
    completedAt: "2024-01-15T05:02:32.700Z",
    requestedAt: "2024-01-15T05:02:30.120Z",
    startedAt: "2024-01-15T05:02:30.450Z",
    links: {},
    status: "CANCELED",
  },
};

export const listActiveImportsPayload = {
  data: [
    {
      importTemplate: {
        templateType: "admin_defined",
        templateId: 12345,
      },
      createdAt: "2024-01-15T05:02:32.668Z",
      metadata: {
        counters: {
          TOTAL_ROWS: 250,
          CREATED_OBJECTS: 150,
          UPDATED_OBJECTS: 100,
          UNIQUE_OBJECTS_WRITTEN: 250,
          PROPERTY_VALUES_EMITTED: 1250,
        },
        fileIds: ["8765432"],
        objectLists: [
          {
            listId: "1234",
            objectType: "contacts",
          },
        ],
      },
      importRequestJson: {},
      importSource: "API",
      importName: "Q1 2024 Contact Import",
      state: "DONE",
      id: "9876543",
      optOutImport: false,
      updatedAt: "2024-01-15T05:15:45.890Z",
    },
  ],
};

export const importCRMDataPayload = {
  data: {
    importTemplate: {
      templateType: "admin_defined",
      templateId: 12345,
    },
    createdAt: "2024-01-15T05:02:32.679Z",
    metadata: {
      counters: {
        TOTAL_ROWS: 250,
        CREATED_OBJECTS: 150,
        UPDATED_OBJECTS: 100,
        UNIQUE_OBJECTS_WRITTEN: 250,
        PROPERTY_VALUES_EMITTED: 1250,
      },
      fileIds: ["8765432"],
      objectLists: [
        {
          listId: "1234",
          objectType: "contacts",
        },
      ],
    },
    importRequestJson: {},
    importSource: "API",
    importName: "Q1 2024 Contact Import",
    state: "PROCESSING",
    id: "9876543",
    optOutImport: false,
    updatedAt: "2024-01-15T05:02:32.679Z",
  },
};

export const getAnImportPayload = {
  data: {
    importTemplate: {
      templateType: "admin_defined",
      templateId: 12345,
    },
    createdAt: "2024-01-15T05:02:32.691Z",
    metadata: {
      counters: {
        TOTAL_ROWS: 250,
        CREATED_OBJECTS: 150,
        UPDATED_OBJECTS: 100,
        UNIQUE_OBJECTS_WRITTEN: 250,
        PROPERTY_VALUES_EMITTED: 1250,
      },
      fileIds: ["8765432"],
      objectLists: [
        {
          listId: "1234",
          objectType: "contacts",
        },
      ],
    },
    importRequestJson: {},
    importSource: "API",
    importName: "Q1 2024 Contact Import",
    state: "DONE",
    id: "9876543",
    optOutImport: false,
    updatedAt: "2024-01-15T05:15:45.890Z",
  },
};




export const exportCRMDataPayload = {
  data: {
    id: "12345678",
    exportName: "Q1 2024 Contact Export",
    exportType: "VIEW",
    objectType: "CONTACT",
    objectProperties: ["email", "firstname", "lastname"],
    exportState: "PROCESSING",
    createdAt: "2024-01-15T18:30:00.000Z",
    updatedAt: "2024-01-15T18:30:00.000Z",
    recordCount: 0,
  },
};





export const searchPayload = {
  data: {
    total: 2,
    results: [
      {
        id: "65059681027",
        properties: {
          createdate: "2024-01-10T16:37:23.758Z",
          email: "john.doe@example.com",
          firstname: "John",
          hs_object_id: "65059681027",
          lastmodifieddate: "2024-01-15T19:39:45.324Z",
          lastname: "Doe",
          company: "Acme Corporation",
        },
        createdAt: "2024-01-10T16:37:23.758Z",
        updatedAt: "2024-01-15T19:39:45.324Z",
        archived: false,
      },
      {
        id: "65059681028",
        properties: {
          createdate: "2024-01-11T09:22:15.340Z",
          email: "jane.smith@example.com",
          firstname: "Jane",
          hs_object_id: "65059681028",
          lastmodifieddate: "2024-01-16T10:15:20.120Z",
          lastname: "Smith",
          company: "TechStart Industries",
        },
        createdAt: "2024-01-11T09:22:15.340Z",
        updatedAt: "2024-01-16T10:15:20.120Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "2",
      },
    },
  },
};







export const getCurrentUserPayload = {
  data: {
    portalId: 12345678,
    timeZone: "US/Eastern",
    accountType: "PROFESSIONAL",
    currency: "USD",
    utcOffset: "-05:00",
    utcOffsetMilliseconds: -18000000,
    user_id: 98765432,
    user: "admin@example.com",
  },
};





export const validateConnectionPayload = { data: true };





export const listWebhooksPayload = {
  data: {
    results: [
      {
        createdAt: "2024-01-10T20:53:52.503Z",
        propertyName: "lifecyclestage",
        active: true,
        eventType: "contact.propertyChange",
        id: "webhook_98765",
        updatedAt: "2024-01-15T14:22:10.456Z",
      },
      {
        createdAt: "2024-01-12T15:30:20.120Z",
        propertyName: null,
        active: true,
        eventType: "contact.creation",
        id: "webhook_98766",
        updatedAt: "2024-01-15T14:22:10.456Z",
      },
    ],
  },
};

export const createWebhookPayload = {
  data: {
    createdAt: "2024-01-15T20:53:52.517Z",
    propertyName: "email",
    active: true,
    eventType: "contact.propertyChange",
    id: "webhook_98767",
    updatedAt: "2024-01-15T20:53:52.517Z",
  },
};

export const deleteWebhookPayload = { data: {} };

export const deleteAllWebhooksPayload = {
  data: {
    message: SUCCESS_MESSAGE,
  },
};

export const webhookPayload = {
  payload: {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Host: "hooks.example.com",
      "User-Agent":
        "HubSpot Connect 2.0 (http://dev.hubspot.com/) (namespace: webhooks-nio-http-client) - WebhooksExecutorDaemon-executor",
      "X-Amz-Cf-Id": "ABCDEFGHIJK1234567890",
      "X-Amzn-Trace-Id": "Root=1-65dd10e7-527c83667c3d96380250fd05",
      "X-Forwarded-For": "54.174.62.123, 15.158.50.45",
      "X-HubSpot-Request-Timestamp": "1708986599647",
      "X-HubSpot-Signature": "sha256=abc123def456",
      "X-HubSpot-Signature-v3": "sha256=xyz789",
      "X-HubSpot-Signature-Version": "v3",
      "X-HubSpot-Timeout-Millis": "10000",
      "X-Trace": "",
    },
    queryParameters: null,
    rawBody: { data: "" },
    body: {
      data: [
        {
          eventId: 567890123,
          subscriptionId: 234567,
          portalId: 12345678,
          appId: 987654,
          occurredAt: 1708986598741,
          subscriptionType: "contact.creation",
          attemptNumber: 0,
          objectId: 65059681032,
          changeFlag: "CREATED",
          changeSource: "CRM_UI",
          sourceId: "userId:45678",
        },
      ],
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      Webhook: "https://hooks.example.com/trigger/abc123==",
    },
    webhookApiKeys: {
      Webhook: ["sample-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/abc123==",
    executionId: "exec_789456",
    customer: {
      id: "cust_12345",
      name: "Example Customer",
      externalId: "ext_cust_98765",
    },
    instance: {
      id: "inst_54321",
      name: "HubSpot - Webhook Integration",
    },
    user: {
      id: "user_67890",
      email: "admin@example.com",
      name: "Admin User",
      externalId: "ext_user_12345",
    },
    integration: {
      id: "intg_98765",
      name: "HubSpot - Webhook Integration",
      versionSequenceId: "v1.0.0",
    },
    flow: {
      id: "flow_45678",
      name: "Contact Created Webhook",
    },
  },
};
