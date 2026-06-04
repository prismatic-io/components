












import type { TriggerPayload } from "@prismatic-io/spectral";
import { API_BASE } from "./constants";




const exampleAccount = {
  "@odata.context": `${API_BASE}/$metadata#accounts/$entity`,
  "@odata.etag": 'W/"123456789"',
  accountid: "f1a2b3c4-d5e6-4789-a012-3456789abcde",
  name: "Contoso Ltd.",
  accountnumber: "ACC-0001",
  telephone1: "+1-555-010-2025",
  emailaddress1: "info@contoso.example.com",
  websiteurl: "https://contoso.example.com",
  revenue: 5_250_000,
  numberofemployees: 120,
  industrycode: 7,
  statecode: 0,
  statuscode: 1,
  createdon: "2026-04-01T14:22:11Z",
  modifiedon: "2026-04-01T14:22:11Z",
  _createdby_value: "9b2f3c4d-1e2f-4a5b-8c9d-0e1f2a3b4c5d",
  _modifiedby_value: "9b2f3c4d-1e2f-4a5b-8c9d-0e1f2a3b4c5d",
  _ownerid_value: "9b2f3c4d-1e2f-4a5b-8c9d-0e1f2a3b4c5d",
  _owningbusinessunit_value: "0a1b2c3d-4e5f-6789-abcd-ef0123456789",
};











export const getCurrentUserExamplePayload = {
  data: {
    "@odata.context": `${API_BASE}/$metadata#Microsoft.Dynamics.CRM.WhoAmIResponse`,
    BusinessUnitId: "0a1b2c3d-4e5f-6789-abcd-ef0123456789",
    UserId: "9b2f3c4d-1e2f-4a5b-8c9d-0e1f2a3b4c5d",
    OrganizationId: "fedcba98-7654-3210-fedc-ba9876543210",
  },
};






export const listEntitiesExamplePayload = {
  data: {
    entities: [
      { name: "accounts", kind: "EntitySet", url: "accounts" },
      { name: "contacts", kind: "EntitySet", url: "contacts" },
      { name: "leads", kind: "EntitySet", url: "leads" },
      { name: "opportunities", kind: "EntitySet", url: "opportunities" },
    ],
    totalCount: 4,
    nextLink: `${API_BASE}/?$skiptoken=cookie%3D%253ccookie%2520pagenumber%253d%25222%2522`,
    hasMore: true,
  },
};











export const queryEntitiesExamplePayload = {
  data: {
    value: [
      exampleAccount,
      {
        ...exampleAccount,
        accountid: "a2b3c4d5-e6f7-4890-b123-4567890bcdef",
        name: "Fabrikam, Inc.",
        accountnumber: "ACC-0002",
        emailaddress1: "info@fabrikam.example.com",
        websiteurl: "https://fabrikam.example.com",
        revenue: 12_750_000,
        numberofemployees: 340,
        createdon: "2026-04-03T09:14:55Z",
        modifiedon: "2026-04-22T11:08:42Z",
      },
    ],
    "@odata.nextLink": `${API_BASE}/accounts?$skiptoken=%3Ccookie%20pagenumber%3D%222%22%2F%3E`,
    oDataNextLink: `${API_BASE}/accounts?$skiptoken=%3Ccookie%20pagenumber%3D%222%22%2F%3E`,
  },
};







export const getEntityExamplePayload = {
  data: exampleAccount,
};







export const createEntityExamplePayload = {
  data: {
    ...exampleAccount,
    createdon: "2026-05-08T10:00:00Z",
    modifiedon: "2026-05-08T10:00:00Z",
  },
};







export const updateEntityExamplePayload = {
  data: {
    ...exampleAccount,
    name: "Contoso Ltd. (Updated)",
    telephone1: "+1-555-010-9999",
    modifiedon: "2026-05-08T11:30:00Z",
  },
};







export const deleteEntityExamplePayload = {
  data: {},
};







export const upsertEntityExamplePayload = {
  data: {
    ...exampleAccount,
    createdon: "2026-05-08T10:00:00Z",
    modifiedon: "2026-05-08T10:00:00Z",
  },
};







export const batchEntityActionsExamplePayload = {
  data: [
    {
      ...exampleAccount,
      accountid: "11111111-2222-4333-8444-555555555555",
      name: "Batch Created Account",
      createdon: "2026-05-08T12:00:00Z",
      modifiedon: "2026-05-08T12:00:00Z",
    },
    {
      ...exampleAccount,
      accountid: "22222222-3333-4444-8555-666666666666",
      name: "Batch Updated Account",
      modifiedon: "2026-05-08T12:00:01Z",
    },
    {},
  ],
};






export const listEntitiesActionExamplePayload = {
  data: {
    entities: [
      {
        entityId: "3a4b5c6d-7e8f-4901-b234-56789abcdef0",
        logicalName: "account",
        schemaName: "Account",
        displayName: "Account",
        pluralDisplayName: "Accounts",
        isCustomEntity: false,
        isChildEntity: false,
      },
      {
        entityId: "4b5c6d7e-8f90-4123-b345-6789abcdef01",
        logicalName: "contact",
        schemaName: "Contact",
        displayName: "Contact",
        pluralDisplayName: "Contacts",
        isCustomEntity: false,
        isChildEntity: false,
      },
      {
        entityId: "5c6d7e8f-9012-4345-b456-789abcdef012",
        logicalName: "new_invoice",
        schemaName: "new_Invoice",
        displayName: "Invoice",
        pluralDisplayName: "Invoices",
        isCustomEntity: true,
        isChildEntity: false,
      },
    ],
    totalCount: 3,
    customEntitiesCount: 1,
    systemEntitiesCount: 2,
  },
};






export const getEntitiesMetaDataExamplePayload = {
  data: [
    {
      object: { key: "3a4b5c6d-7e8f-4901-b234-56789abcdef0", label: "Account" },
      defaultSelected: true,
      fields: [
        { key: "accountid", label: "Account" },
        { key: "name", label: "Account Name" },
        { key: "telephone1", label: "Main Phone" },
        { key: "emailaddress1", label: "Email" },
      ],
    },
    {
      object: { key: "4b5c6d7e-8f90-4123-b345-6789abcdef01", label: "Contact" },
      defaultSelected: false,
      fields: [
        { key: "contactid", label: "Contact" },
        { key: "fullname", label: "Full Name" },
        { key: "emailaddress1", label: "Email" },
      ],
    },
  ],
};







export const getEntityMetaDataExamplePayload = {
  data: {
    result: {
      "@odata.context": `${API_BASE}/$metadata#EntityDefinitions/$entity`,
      MetadataId: "3a4b5c6d-7e8f-4901-b234-56789abcdef0",
      LogicalName: "account",
      SchemaName: "Account",
      EntitySetName: "accounts",
      PrimaryIdAttribute: "accountid",
      PrimaryNameAttribute: "name",
      OwnershipType: "UserOwned",
      IsCustomEntity: false,
      IsChildEntity: false,
      IsActivity: false,
      IsBusinessProcessEnabled: true,
      IsValidForAdvancedFind: true,
      IsValidForQueue: false,
      DisplayName: {
        UserLocalizedLabel: { Label: "Account", LanguageCode: 1033 },
        LocalizedLabels: [{ Label: "Account", LanguageCode: 1033 }],
      },
      DisplayCollectionName: {
        UserLocalizedLabel: { Label: "Accounts", LanguageCode: 1033 },
        LocalizedLabels: [{ Label: "Accounts", LanguageCode: 1033 }],
      },
      Description: {
        UserLocalizedLabel: {
          Label: "Business that represents a customer or potential customer.",
          LanguageCode: 1033,
        },
        LocalizedLabels: [],
      },
    },
  },
};





const exampleAttribute = {
  "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata",
  MetadataId: "6d7e8f90-1234-4567-b890-123456789abc",
  LogicalName: "name",
  SchemaName: "Name",
  AttributeType: "String",
  AttributeTypeName: { Value: "StringType" },
  IsCustomAttribute: false,
  IsPrimaryId: false,
  IsPrimaryName: true,
  IsValidForRead: true,
  IsValidForCreate: true,
  IsValidForUpdate: true,
  RequiredLevel: { Value: "ApplicationRequired", CanBeChanged: true },
  DisplayName: {
    UserLocalizedLabel: { Label: "Account Name", LanguageCode: 1033 },
    LocalizedLabels: [{ Label: "Account Name", LanguageCode: 1033 }],
  },
  Description: {
    UserLocalizedLabel: { Label: "Type the company or business name.", LanguageCode: 1033 },
    LocalizedLabels: [],
  },
  MaxLength: 160,
};







export const queryAttributesExamplePayload = {
  data: {
    value: [
      exampleAttribute,
      {
        ...exampleAttribute,
        MetadataId: "7e8f9012-3456-4789-bcde-23456789abcd",
        LogicalName: "telephone1",
        SchemaName: "Telephone1",
        IsPrimaryName: false,
        DisplayName: {
          UserLocalizedLabel: { Label: "Main Phone", LanguageCode: 1033 },
          LocalizedLabels: [],
        },
        Description: {
          UserLocalizedLabel: { Label: "Type the main phone number.", LanguageCode: 1033 },
          LocalizedLabels: [],
        },
        MaxLength: 50,
      },
    ],
  },
};







export const getAttributeExamplePayload = {
  data: exampleAttribute,
};







export const createAttributeExamplePayload = {
  data: {
    ...exampleAttribute,
    MetadataId: "8f901234-5678-49ab-bcde-3456789abcde",
    LogicalName: "new_customfield",
    SchemaName: "new_CustomField",
    IsCustomAttribute: true,
    IsPrimaryName: false,
    DisplayName: {
      UserLocalizedLabel: { Label: "Custom Field", LanguageCode: 1033 },
      LocalizedLabels: [{ Label: "Custom Field", LanguageCode: 1033 }],
    },
    Description: {
      UserLocalizedLabel: { Label: "Custom field added via API.", LanguageCode: 1033 },
      LocalizedLabels: [],
    },
    MaxLength: 100,
  },
};







export const updateAttributeExamplePayload = {
  data: {},
};






export const listAttributesActionExamplePayload = {
  data: {
    entityId: "3a4b5c6d-7e8f-4901-b234-56789abcdef0",
    attributes: [
      {
        logicalName: "accountid",
        displayName: "Account",
        attributeType: "Uniqueidentifier",
        description: "Unique identifier of the account.",
        isCustomAttribute: false,
        isPrimaryId: true,
        isPrimaryName: false,
        requiredLevel: "SystemRequired",
        isValidForRead: true,
        isValidForCreate: true,
        isValidForUpdate: false,
      },
      {
        logicalName: "name",
        displayName: "Account Name",
        attributeType: "String",
        description: "Type the company or business name.",
        isCustomAttribute: false,
        isPrimaryId: false,
        isPrimaryName: true,
        requiredLevel: "ApplicationRequired",
        isValidForRead: true,
        isValidForCreate: true,
        isValidForUpdate: true,
      },
      {
        logicalName: "telephone1",
        displayName: "Main Phone",
        attributeType: "String",
        description: "Type the main phone number.",
        isCustomAttribute: false,
        isPrimaryId: false,
        isPrimaryName: false,
        requiredLevel: "None",
        isValidForRead: true,
        isValidForCreate: true,
        isValidForUpdate: true,
      },
    ],
    totalCount: 3,
    customAttributesCount: 0,
    systemAttributesCount: 3,
    attributesByType: {
      Uniqueidentifier: 1,
      String: 2,
    },
    primaryIdAttribute: "accountid",
    primaryNameAttribute: "name",
  },
};











export const fetchXmlExamplePayload = {
  data: {
    value: [
      {
        "@odata.etag": 'W/"123456789"',
        accountid: exampleAccount.accountid,
        name: exampleAccount.name,
        revenue: exampleAccount.revenue,
      },
      {
        "@odata.etag": 'W/"234567890"',
        accountid: "a2b3c4d5-e6f7-4890-b123-4567890bcdef",
        name: "Fabrikam, Inc.",
        revenue: 12_750_000,
      },
    ],
  },
};










export const rawRequestExamplePayload = {
  data: {
    "@odata.context": `${API_BASE}/$metadata#accounts/$entity`,
    accountid: exampleAccount.accountid,
    name: exampleAccount.name,
  },
};






export const rawRequestV2ExamplePayload = {
  data: {
    "@odata.context": `${API_BASE}/$metadata#accounts/$entity`,
    accountid: exampleAccount.accountid,
    name: exampleAccount.name,
  },
};











const dynamicsBodyData = {
  SchemaName: "AccountCreate",
  OperationType: 0,
  MessageName: "Create",
  PrimaryEntityName: "account",
  PrimaryEntityId: exampleAccount.accountid,
  RequestId: "f0e9d8c7-b6a5-4321-9876-543210fedcba",
  UserId: "9b2f3c4d-1e2f-4a5b-8c9d-0e1f2a3b4c5d",
  InitiatingUserId: "9b2f3c4d-1e2f-4a5b-8c9d-0e1f2a3b4c5d",
  CorrelationId: "12345678-1234-4abc-9def-1234567890ab",
  InputParameters: [
    {
      key: "Target",
      value: {
        __type: "Entity:http://schemas.microsoft.com/xrm/2011/Contracts",
        LogicalName: "account",
        Id: exampleAccount.accountid,
        Attributes: [
          { key: "name", value: exampleAccount.name },
          { key: "telephone1", value: exampleAccount.telephone1 },
          { key: "emailaddress1", value: exampleAccount.emailaddress1 },
        ],
      },
    },
  ],
  OutputParameters: [],
};

const dynamicsInputParameters = dynamicsBodyData.InputParameters;







export const pollChangesExamplePayload = {
  payload: {
    body: {
      data: {
        created: [
          {
            "@odata.etag": 'W/"345678901"',
            accountid: "b3c4d5e6-f7a8-4901-c234-5678901cdef0",
            name: "Adventure Works Cycles",
            accountnumber: "ACC-0003",
            telephone1: "+1-555-010-3030",
            emailaddress1: "info@adventureworks.example.com",
            createdon: "2026-05-22T14:30:00Z",
            modifiedon: "2026-05-22T14:30:00Z",
            _createdby_value: "9b2f3c4d-1e2f-4a5b-8c9d-0e1f2a3b4c5d",
            _modifiedby_value: "9b2f3c4d-1e2f-4a5b-8c9d-0e1f2a3b4c5d",
            _ownerid_value: "9b2f3c4d-1e2f-4a5b-8c9d-0e1f2a3b4c5d",
          },
        ],
        updated: [
          {
            ...exampleAccount,
            name: "Contoso Ltd. (Updated)",
            telephone1: "+1-555-010-9999",
            modifiedon: "2026-05-22T14:35:00Z",
          },
        ],
      },
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false,
};

export const dynamicsWebhookTriggerExamplePayload = {
  payload: {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-request-id": "f0e9d8c7-b6a5-4321-9876-543210fedcba",
      "x-ms-dynamics-organization": "my-org",
      "x-ms-dynamics-entity-name": "account",
      "x-ms-dynamics-request-name": "Create",
      "x-ms-correlation-request-id": "12345678-1234-4abc-9def-1234567890ab",
    },
    queryParameters: {},
    rawBody: {
      data: JSON.stringify(dynamicsBodyData),
      contentType: "application/json; charset=utf-8",
    },
    body: {
      data: JSON.stringify(dynamicsBodyData),
      contentType: "application/json; charset=utf-8",
    },
    pathFragment: "",
    webhookUrls: {
      "URL Validation / Heartbeat": "https://hooks.example.com/trigger/abc123==",
      Event: "https://hooks.example.com/trigger/abc123==",
    },
    webhookApiKeys: {
      "URL Validation / Heartbeat": [],
      Event: [],
    },
    invokeUrl: "https://hooks.example.com/trigger/abc123==",
    executionId: "RXhlY3V0aW9uOmFiYzEyMy00NTY3LTg5YWItY2RlZjAxMjM0NTY3",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU2NzgtMTIzNC00NTY3LTg5YWItY2RlZjAxMjM0NTY3",
      name: "Example Customer",
      externalId: "ext-cust-001",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU2NzgtMTIzNC00NTY3LTg5YWItY2RlZjAxMjM0NTY3",
      name: "Microsoft Dynamics 365 - Production",
    },
    user: {
      id: "VXNlcjoxMjM0NTY3OC0xMjM0LTQ1NjctODlhYi1jZGVmMDEyMzQ1Njc=",
      email: "user@example.com",
      name: "Example User",
      externalId: "ext-user-001",
    },
    integration: {
      id: "SW50ZWdyYXRpb246MTIzNDU2NzgtMTIzNC00NTY3LTg5YWItY2RlZjAxMjM0NTY3",
      name: "Microsoft Dynamics 365 - Webhook Integration",
      versionSequenceId: "VmVyc2lvbjoxMjM0NTY3OC0xMjM0LTQ1Njc=",
      externalVersion: "1.0.0",
    },
    flow: {
      id: "Rmxvdzo4NzY1NDMyMS0xMjM0LTQ1NjctODlhYi1jZGVmMDEyMzQ1Njc=",
      name: "Account Created Webhook",
    },
    startedAt: "2026-05-08T10:00:00Z",
    globalDebug: false,
    bodyData: dynamicsBodyData,
    requestId: "f0e9d8c7-b6a5-4321-9876-543210fedcba",
    organization: "my-org",
    entityName: "account",
    inputParameters: dynamicsInputParameters,
    initiatingUserId: "9b2f3c4d-1e2f-4a5b-8c9d-0e1f2a3b4c5d",
    messageName: "Create",
  } as unknown as TriggerPayload,
  response: { statusCode: 200, contentType: "text/plain" },
  branch: "Event",
};










export const attributeBodyExample = {
  AttributeType: "Money",
  AttributeTypeName: {
    Value: "MoneyType",
  },
  Description: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
        Label: "Enter the balance amount",
        LanguageCode: 1033,
      },
    ],
  },
  DisplayName: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
        Label: "Balance",
        LanguageCode: 1033,
      },
    ],
  },
  RequiredLevel: {
    Value: "None",
    CanBeChanged: true,
    ManagedPropertyLogicalName: "canmodifyrequirementlevelsettings",
  },
  SchemaName: "new_Balance",
  "@odata.type": "Microsoft.Dynamics.CRM.MoneyAttributeMetadata",
  PrecisionSource: 2,
};





export const batchActionsExample = [
  {
    collection: "msevtmgt_events",
    action: "update",
    key: "00000000-0000-0000-0000-000000000002",
    returnRepresentation: true,
    data: {
      msevtmgt_name: "Test Event 2",
      msevtmgt_eventtype: "100000002",
    },
  },
];





export const batchActionsDefault = [
  {
    collection: "msevtmgt_events",
    action: "create",
    returnRepresentation: true,
    data: {
      msevtmgt_name: "Test Event 1",
      msevtmgt_eventtype: "100000002",
    },
  },
  {
    collection: "msevtmgt_events",
    action: "update",
    key: "00000000-0000-0000-0000-000000000002",
    returnRepresentation: true,
    data: {
      msevtmgt_name: "Test Event 2",
      msevtmgt_eventtype: "100000002",
    },
  },
  {
    collection: "msevtmgt_events",
    action: "delete",
    key: "00000000-0000-0000-0000-000000000002",
  },
];
