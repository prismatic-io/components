import type { FileProperties } from "jsforce/lib/api/metadata";

export const genericCreateUpdateExamplePayload = {
  data: {
    id: "06Q606ExampleId",
    success: true as const,
    errors: [] as never[],
  },
};

export const genericCreateUpdateFullNameExamplePayload = {
  data: {
    success: true,
    errors: undefined,
    fullName: "TestObject1__c",
  },
};

export const genericUpsertExamplePayload = {
  data: [
    {
      id: "00190000001pPvHAAU",
      errors: [],
      success: true,
      created: true,
    },
  ],
};

const describeCustomerSObjectData = {
  actionOverrides: [],
  activateable: false,
  associateEntityType: null,
  associateParentEntity: null,
  childRelationships: [
    {
      cascadeDelete: true,
      childSObject: "AIInsightValue",
      deprecatedAndHidden: false,
      field: "SobjectLookupValueId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: null,
      restrictedDelete: false,
    },
    {
      cascadeDelete: true,
      childSObject: "AIRecordInsight",
      deprecatedAndHidden: false,
      field: "TargetId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: null,
      restrictedDelete: false,
    },
    {
      cascadeDelete: false,
      childSObject: "CommSubscriptionConsent",
      deprecatedAndHidden: false,
      field: "PartyRoleId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: "CommSubsConsents",
      restrictedDelete: true,
    },
    {
      cascadeDelete: false,
      childSObject: "CommSubscriptionConsentChangeEvent",
      deprecatedAndHidden: false,
      field: "PartyRoleId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: null,
      restrictedDelete: false,
    },
    {
      cascadeDelete: false,
      childSObject: "ContactPointConsent",
      deprecatedAndHidden: false,
      field: "PartyRoleId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: "ContactPointConsents",
      restrictedDelete: true,
    },
    {
      cascadeDelete: false,
      childSObject: "ContactPointConsentChangeEvent",
      deprecatedAndHidden: false,
      field: "PartyRoleId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: null,
      restrictedDelete: false,
    },
    {
      cascadeDelete: false,
      childSObject: "ContactPointTypeConsent",
      deprecatedAndHidden: false,
      field: "PartyRoleId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: "ContactPointTypeConsents",
      restrictedDelete: true,
    },
    {
      cascadeDelete: false,
      childSObject: "ContactPointTypeConsentChangeEvent",
      deprecatedAndHidden: false,
      field: "PartyRoleId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: null,
      restrictedDelete: false,
    },
    {
      cascadeDelete: true,
      childSObject: "CustomerShare",
      deprecatedAndHidden: false,
      field: "ParentId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: "Shares",
      restrictedDelete: false,
    },
    {
      cascadeDelete: false,
      childSObject: "FlowExecutionErrorEvent",
      deprecatedAndHidden: false,
      field: "ContextRecordId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: null,
      restrictedDelete: false,
    },
    {
      cascadeDelete: false,
      childSObject: "FlowRecordRelation",
      deprecatedAndHidden: false,
      field: "RelatedRecordId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: null,
      restrictedDelete: false,
    },
    {
      cascadeDelete: false,
      childSObject: "PartyConsent",
      deprecatedAndHidden: false,
      field: "PartyRoleId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: "PartyConsents",
      restrictedDelete: true,
    },
    {
      cascadeDelete: false,
      childSObject: "PartyConsentChangeEvent",
      deprecatedAndHidden: false,
      field: "PartyRoleId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: null,
      restrictedDelete: false,
    },
    {
      cascadeDelete: true,
      childSObject: "PendingServiceRoutingInteractionInfo",
      deprecatedAndHidden: false,
      field: "TargetObjectId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: null,
      restrictedDelete: false,
    },
    {
      cascadeDelete: true,
      childSObject: "ProcessInstance",
      deprecatedAndHidden: false,
      field: "TargetObjectId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: "ProcessInstances",
      restrictedDelete: false,
    },
    {
      cascadeDelete: false,
      childSObject: "ProcessInstanceHistory",
      deprecatedAndHidden: false,
      field: "TargetObjectId",
      junctionIdListNames: [],
      junctionReferenceTo: [],
      relationshipName: "ProcessSteps",
      restrictedDelete: false,
    },
  ],
  compactLayoutable: true,
  createable: true,
  custom: false,
  customSetting: false,
  deepCloneable: false,
  defaultImplementation: null,
  deletable: true,
  deprecatedAndHidden: false,
  extendedBy: null,
  extendsInterfaces: null,
  feedEnabled: false,
  fields: [],
  hasSubtypes: false,
  implementedBy: null,
  implementsInterfaces: null,
  isInterface: false,
  isSubtype: false,
  keyPrefix: "0o6",
  label: "Customer",
  labelPlural: "Customers",
  layoutable: true,
  listviewable: null,
  lookupLayoutable: null,
  mergeable: false,
  mruEnabled: true,
  name: "Customer",
  namedLayoutInfos: [],
  networkScopeFieldName: null,
  queryable: true,
  recordTypeInfos: [
    {
      active: true,
      available: true,
      defaultRecordTypeMapping: true,
      developerName: "Master",
      master: true,
      name: "Master",
      recordTypeId: "012964000000000AAA",
      urls: {
        layout: "/services/data/v53.0/sobjects/Customer/describe/layouts/012964000000000AAA",
      },
    },
  ],
  replicateable: true,
  retrieveable: true,
  searchLayoutable: true,
  searchable: true,
  sobjectDescribeOption: "FULL",
  supportedScopes: [],
  triggerable: true,
  undeletable: true,
  updateable: true,
  urls: {
    compactLayouts: "/services/data/v53.0/sobjects/Customer/describe/compactLayouts",
    rowTemplate: "/services/data/v53.0/sobjects/Customer/{ID}",
    approvalLayouts: "/services/data/v53.0/sobjects/Customer/describe/approvalLayouts",
    uiDetailTemplate: "https://dummy-uri.my.salesforce.com/{ID}",
    uiEditTemplate: "https://dummy-uri.my.salesforce.com/{ID}/e",
    describe: "/services/data/v53.0/sobjects/Customer/describe",
    uiNewRecord: "https://dummy-uri.my.salesforce.com/0o6/e",
    layouts: "/services/data/v53.0/sobjects/Customer/describe/layouts",
    sobject: "/services/data/v53.0/sobjects/Customer",
  },
};

export const describeCustomerSObjectExamplePayload = {
  data: describeCustomerSObjectData,
};

export const getCustomerExamplePayload = {
  data: {
    attributes: {
      type: "Customer",
      url: "/services/data/v53.0/sobjects/Customer/0o68c000000wk3lAAA",
    },
    Id: "0o68c000000wk3lAAA",
    OwnerId: "0064c00859AJGN6KPA",
    IsDeleted: false,
    Name: "Customer Name",
    CreatedDate: "2023-12-14T20:54:21.000+0000",
    CreatedById: "0064c00859AJGN6KPA",
    LastModifiedDate: "2023-12-14T20:54:21.000+0000",
    LastModifiedById: "0064c00859AJGN6KPA",
    SystemModstamp: "2023-12-14T20:54:21.000+0000",
    LastViewedDate: "2023-12-21T22:23:30.000+0000",
    LastReferencedDate: "2023-12-21T22:23:30.000+0000",
    PartyId: "0PK8c000963oLkUGAU",
    TotalLifeTimeValue: null,
    CustomerStatusType: "Active",
  },
};

export const listCustomersExamplePayload = {
  data: {
    records: [
      {
        attributes: {
          type: "Customer",
          url: "/services/data/v53.0/sobjects/Customer/0o79c690000wk3qBCD",
        },
        Id: "0o79c690000wk3qBCD",
        OwnerId: "0064c00859AJGN6KPA",
        IsDeleted: false,
        Name: "New Name For Customer",
        CreatedDate: "2023-12-14T20:54:50.000+0000",
        CreatedById: "0064c00859AJGN6KPA",
        LastModifiedDate: "2023-12-14T20:54:50.000+0000",
        LastModifiedById: "0064c00859AJGN6KPA",
        SystemModstamp: "2023-12-14T20:54:50.000+0000",
        LastViewedDate: "2023-12-14T20:54:50.000+0000",
        LastReferencedDate: "2023-12-14T20:54:50.000+0000",
        PartyId: "0PK8c000963oLkUGAU",
        TotalLifeTimeValue: null,
        CustomerStatusType: "Active",
      },
    ],
    done: true,
    totalSize: 2,
  },
};

export const getCurrentUserExamplePayload = {
  data: {
    id: "https://login.salesforce.com/id/00Z8d000694w9weEAQ/0064c00859AJGN6KPA",
    asserted_user: true,
    user_id: "0064c00859AJGN6KPA",
    organization_id: "00Z8d000694w9weEAQ",
    username: "jhon@doe.com",
    nick_name: "dev",
    display_name: "Dev Env",
    email: "jhon@doe.com",
    email_verified: true,
    first_name: "Dev",
    last_name: "Dev",
    timezone: "America/Los_Angeles",
    photos: {
      picture: "https://dummy-uri.file.force.com/profilephoto/005/F",
      thumbnail: "https://dummy-uri.file.force.com/profilephoto/005/T",
    },
    addr_street: null,
    addr_city: null,
    addr_state: null,
    addr_country: "US",
    addr_zip: null,
    mobile_phone: null,
    mobile_phone_verified: false,
    is_lightning_login_user: false,
    status: {
      created_date: null,
      body: null,
    },
    urls: {
      enterprise: "https://dummy-uri.my.salesforce.com/services/Soap/c/{version}/00Z8d000694w9we",
      metadata: "https://dummy-uri.my.salesforce.com/services/Soap/m/{version}/00Z8d000694w9we",
      partner: "https://dummy-uri.my.salesforce.com/services/Soap/u/{version}/00Z8d000694w9we",
      rest: "https://dummy-uri.my.salesforce.com/services/data/v{version}/",
      sobjects: "https://dummy-uri.my.salesforce.com/services/data/v{version}/sobjects/",
      search: "https://dummy-uri.my.salesforce.com/services/data/v{version}/search/",
      query: "https://dummy-uri.my.salesforce.com/services/data/v{version}/query/",
      recent: "https://dummy-uri.my.salesforce.com/services/data/v{version}/recent/",
      tooling_soap: "https://dummy-uri.my.salesforce.com/services/Soap/T/{version}/00Z8d000694w9we",
      tooling_rest: "https://dummy-uri.my.salesforce.com/services/data/v{version}/tooling/",
      profile: "https://dummy-uri.my.salesforce.com/0064c00859AJGN6KPA",
      feeds: "https://dummy-uri.my.salesforce.com/services/data/v{version}/chatter/feeds",
      groups: "https://dummy-uri.my.salesforce.com/services/data/v{version}/chatter/groups",
      users: "https://dummy-uri.my.salesforce.com/services/data/v{version}/chatter/users",
      feed_items: "https://dummy-uri.my.salesforce.com/services/data/v{version}/chatter/feed-items",
      feed_elements:
        "https://dummy-uri.my.salesforce.com/services/data/v{version}/chatter/feed-elements",
      custom_domain: "https://dummy-uri.my.salesforce.com",
    },
    active: true,
    user_type: "STANDARD",
    language: "en_US",
    locale: "en_US",
    utcOffset: -28800000,
    last_modified_date: "2023-10-06T18:48:33Z",
    is_app_installed: true,
  },
};

const getObjectMetadataData = {
  createdById: "0064c00859AJGN6KPA",
  createdByName: "Dev Env",
  createdDate: "1970-01-01T00:00:00.000Z",
  fileName: "objects/Campaign.object",
  fullName: "Campaign",
  id: "",
  lastModifiedById: "0064c00859AJGN6KPA",
  lastModifiedByName: "Dev Env",
  lastModifiedDate: "1970-01-01T00:00:00.000Z",
  namespacePrefix: "",
  type: "CustomObject",
};

export const getObjectMetadataExamplePayload = {
  data: getObjectMetadataData,
};

export const listObjectMetadataExamplePayload = {
  data: [
    getObjectMetadataData,
    {
      createdById: "0064c00859AJGN6KPA",
      createdByName: "Dev Env",
      createdDate: "2023-01-15T09:22:00.000Z",
      fileName: "objects/Account.object",
      fullName: "Account",
      id: "016R0000000ABCDEF",
      lastModifiedById: "0064c00859AJGN6KPA",
      lastModifiedByName: "Dev Env",
      lastModifiedDate: "2023-06-10T14:30:00.000Z",
      namespacePrefix: "",
      type: "CustomObject",
    },
  ],
};

const getWorkflowRuleData = {
  createdById: "0064c00859AJGN6KPA",
  createdByName: "Dev Env",
  createdDate: "2023-04-28T16:39:49.000Z",
  fileName: "workflows/Account.workflow",
  fullName: "Account.Vendia-Demo-Hook-0064c00859AJGN6KPA",
  id: "01Q8c000001QiFoEAK",
  lastModifiedById: "0064c00859AJGN6KPA",
  lastModifiedByName: "Dev Env",
  lastModifiedDate: "2023-04-28T16:39:49.000Z",
  manageableState: "unmanaged",
  namespacePrefix: "",
  type: "WorkflowRule",
};

export const getWorkflowRuleExamplePayload = {
  data: getWorkflowRuleData,
};

export const listWorkflowRulesExamplePayload = {
  data: [
    getWorkflowRuleData,
    {
      createdById: "0058c00000AJGN6KPO",
      createdByName: "Integration Admin",
      createdDate: "2023-05-12T10:15:00.000Z",
      fileName: "workflows/Contact.workflow",
      fullName: "Contact.Send-Welcome-Email",
      id: "01Q8c000002RjGhEAK",
      lastModifiedById: "0064c00859AJGN6KPA",
      lastModifiedByName: "Dev Env",
      lastModifiedDate: "2023-05-12T10:15:00.000Z",
      manageableState: "unmanaged",
      namespacePrefix: "",
      type: "WorkflowRule",
    },
  ],
};

const getWorkflowOutboundMessageData = {
  createdById: "0064c00859AJGN6KPA",
  createdByName: "Dev Env",
  createdDate: "2023-04-28T06:06:49.000Z",
  fileName: "workflows/Account.workflow",
  fullName: "Account.accountfa5a4674cec24002be479be8a8e346qw",
  id: "04k8c000000wkXAAZS",
  lastModifiedById: "0064c00859AJGN6KPA",
  lastModifiedByName: "Dev Env",
  lastModifiedDate: "2023-04-28T06:06:49.000Z",
  manageableState: "unmanaged",
  type: "WorkflowOutboundMessage",
};

export const getWorkflowOutboundMessageExamplePayload = {
  data: getWorkflowOutboundMessageData,
};

export const listWorkflowOutboundMessagesExamplePayload = {
  data: [
    getWorkflowOutboundMessageData,
    {
      createdById: "0064c00859AJGN6KPA",
      createdByName: "Dev Env",
      createdDate: "2023-05-03T14:22:31.000Z",
      fileName: "workflows/Contact.workflow",
      fullName: "Contact.contactb7e2f914abc34012cd890ef1a2b345rs",
      id: "04k8c000001xmYBBAZ",
      lastModifiedById: "0064c00859AJGN6KPA",
      lastModifiedByName: "Dev Env",
      lastModifiedDate: "2023-05-03T14:22:31.000Z",
      manageableState: "unmanaged",
      type: "WorkflowOutboundMessage",
    },
  ],
};

export const subscribeRecordChangeExamplePayload = {
  data: {
    WorkflowRule: {
      errors: [],
      success: true,
      fullName: "Account.TestRule",
    },
    WorkflowOutboundMessage: {
      errors: [],
      success: true,
      fullName: "Account.TestRule",
    },
  },
};

export const createBulkQueryJobExamplePayload = {
  data: {
    id: "750R0000000zlh9IAA",
    operation: "query",
    object: "Account",
    createdById: "005R0000000GiwjIAC",
    createdDate: "2018-12-10T17:50:19.000+0000",
    systemModstamp: "2018-12-10T17:50:19.000+0000",
    state: "UploadComplete",
    concurrencyMode: "Parallel",
    contentType: "CSV",
    apiVersion: 46.0,
    lineEnding: "LF",
    columnDelimiter: "COMMA",
  },
};

export const getQueryJobInformationExamplePayload = {
  data: {
    id: "750R0000000zlh9IAA",
    operation: "query",
    object: "Account",
    createdById: "005R0000000GiwjIAC",
    createdDate: "2018-12-10T17:50:19.000+0000",
    systemModstamp: "2018-12-10T17:51:27.000+0000",
    state: "JobComplete",
    concurrencyMode: "Parallel",
    contentType: "CSV",
    apiVersion: 46.0,
    jobType: "V2Query",
    lineEnding: "LF",
    columnDelimiter: "COMMA",
    numberRecordsProcessed: 500,
    retries: 0,
    totalProcessingTime: 334,
    isPkChunkingSupported: true,
  },
};

export const getAllQueryJobInformationExamplePayload = {
  data: {
    done: false,
    records: [
      {
        id: "750R0000000zhfdIAA",
        operation: "query",
        object: "Account",
        createdById: "005R0000000GiwjIAC",
        createdDate: "2018-12-07T19:58:09.000+0000",
        systemModstamp: "2018-12-07T19:59:14.000+0000",
        state: "JobComplete",
        concurrencyMode: "Parallel",
        contentType: "CSV",
        apiVersion: 60.0,
        jobType: "V2Query",
        lineEnding: "LF",
        columnDelimiter: "COMMA",
      },
      {
        id: "750R0000000zhjzIAA",
        operation: "query",
        object: "Account",
        createdById: "005R0000000GiwjIAC",
        createdDate: "2018-12-07T20:52:28.000+0000",
        systemModstamp: "2018-12-07T20:53:15.000+0000",
        state: "JobComplete",
        concurrencyMode: "Parallel",
        contentType: "CSV",
        apiVersion: 60.0,
        jobType: "V2Query",
        lineEnding: "LF",
        columnDelimiter: "COMMA",
      },
    ],
    nextRecordsUrl: "/services/data/v60.0/jobs/ingest?queryLocator=01gR0000000opRTIAY-2000",
  },
};

export const getQueryJobResultsExamplePayload = {
  data: `
  "Id","Name"
"005R0000000UyrWIAS","Jane Dunn"
"005R0000000GiwjIAC","George Wright"
"005R0000000GiwoIAC","Pat Wilson"
`,
};

export const abortBulkQueryJobExamplePayload = {
  data: {
    id: "750R000000146UvIAI",
    operation: "query",
    object: "Account",
    createdById: "005R0000000GiwjIAC",
    createdDate: "2018-12-18T16:15:31.000+0000",
    systemModstamp: "2018-12-18T16:15:32.000+0000",
    state: "Aborted",
    concurrencyMode: "Parallel",
    contentType: "CSV",
    apiVersion: 46.0,
  },
};

const getBulkJobData = {
  id: "7506g00000DhRA2AAN",
  operation: "insert",
  object: "Account",
  createdById: "0056g000005HQPyAAO",
  createdDate: "2018-12-18T22:51:36.000+0000",
  systemModstamp: "2018-12-18T22:51:58.000+0000",
  state: "Open",
  concurrencyMode: "Parallel",
  contentType: "CSV",
  apiVersion: 60.0,
  jobType: "V2Ingest",
  contentUrl: "services/data/v60.0/jobs/ingest/7506g00000DhRA2AAN/batches",
  lineEnding: "LF",
  columnDelimiter: "COMMA",
  retries: 0,
  totalProcessingTime: 0,
  apiActiveProcessingTime: 0,
  apexProcessingTime: 0,
};

export const getBulkJobExamplePayload = {
  data: getBulkJobData,
};

export const listBulkQueryJobsExamplePayload = {
  data: {
    done: true,
    nextRecordsUrl: "/services/data/v60.0/jobs/ingest?queryLocator=01gR0000000opRTIAY-2000",
    records: [getBulkJobData, getBulkJobData],
  },
};

export const listContactsExamplePayload = {
  data: [
    {
      attributes: {
        type: "Contact",
        url: "/services/data/v53.0/sobjects/Contact/0034c00000AbCdEFAZ",
      },
      Id: "0034c00000AbCdEFAZ",
      IsDeleted: false,
      MasterRecordId: null,
      AccountId: null,
      LastName: "Smith",
      Name: "Jane Smith",
      OwnerId: "0054c00000GhIjKLAZ",
      CreatedDate: "2024-10-10T19:13:07.000+0000",
      CreatedById: "0054c00000GhIjKLAZ",
      LastModifiedDate: "2024-10-10T19:13:07.000+0000",
      LastModifiedById: "0054c00000GhIjKLAZ",
      SystemModstamp: "2024-10-10T19:13:07.000+0000",
    },
  ],
};

export const listLeadsExamplePayload = {
  data: [
    {
      attributes: {
        type: "Lead",
        url: "/services/data/v53.0/sobjects/Lead/00Q4c00001MnOpQRAZ",
      },
      Id: "00Q4c00001MnOpQRAZ",
      IsDeleted: false,
      MasterRecordId: null,
      LastName: "Johnson",
      FirstName: "Michael",
      Salutation: null,
      Name: "Michael Johnson",
      Title: "CTO",
      Company: "Acme Corporation",
      Street: null,
      City: "Tampa",
      State: "Florida",
      Address: {
        city: "Tampa",
        country: null,
        geocodeAccuracy: null,
        latitude: null,
        longitude: null,
        postalCode: null,
        state: "Florida",
        street: null,
      },
      PhotoUrl: "/services/images/photo/00Q4c00001MnOpQRAZ",
      Status: "Open - Not Contacted",
      OwnerId: "0054c00000GhIjKLAZ",
      CreatedDate: "2023-10-05T15:39:28.000+0000",
      CreatedById: "0054c00000GhIjKLAZ",
      LastModifiedDate: "2023-10-05T15:39:28.000+0000",
      LastModifiedById: "0054c00000GhIjKLAZ",
      CleanStatus: "Pending",
    },
  ],
};

export const listOpportunitiesExamplePayload = {
  data: [
    {
      attributes: {
        type: "Opportunity",
        url: "/services/data/v53.0/sobjects/Opportunity/0064c00000RsOpQRAZ",
      },
      Id: "0064c00000RsOpQRAZ",
      IsDeleted: false,
      AccountId: "0014c00000AbCdEFAZ",
      IsPrivate: false,
      Name: "Acme Corp Renewal 2022",
      Description: null,
      StageName: "Prospecting",
      OwnerId: "0054c00000GhIjKLAZ",
      CreatedDate: "2022-07-27T21:25:04.000+0000",
      CreatedById: "0054c00000GhIjKLAZ",
      LastModifiedDate: "2022-07-28T12:49:16.000+0000",
      LastModifiedById: "0054c00000GhIjKLAZ",
      SystemModstamp: "2022-07-28T12:49:16.000+0000",
      LastActivityDate: null,
      PushCount: 0,
      LastStageChangeDate: null,
      FiscalQuarter: 4,
      FiscalYear: 2022,
      Fiscal: "2022 4",
    },
  ],
};

export const listProfilesExamplePayload = {
  data: [
    {
      attributes: {
        type: "Profile",
        url: "/services/data/v53.0/sobjects/Profile/00e4c000000kLmNAAU",
      },
      Id: "00e4c000000kLmNAAU",
      Name: "Minimum Access - API Only Integrations",
      UserLicenseId: "1004c000000kOpQAAU",
      UserType: "Standard",
      CreatedDate: "2024-02-10T07:08:00.000+0000",
      CreatedById: "0054c00000GhIjKLAZ",
      LastModifiedDate: "2024-10-29T18:23:13.000+0000",
      LastModifiedById: "0054c00000MnPqRSAZ",
      SystemModstamp: "2024-10-29T18:23:13.000+0000",
      Description: null,
      LastViewedDate: null,
      LastReferencedDate: null,
    },
  ],
};

export const listUsersExamplePayload = {
  data: [
    {
      attributes: {
        type: "User",
        url: "/services/data/v53.0/sobjects/User/0054c00000GhIjKLAZ",
      },
      Id: "0054c00000GhIjKLAZ",
      Username: "jane.doe@example.com",
      LastName: "Doe",
      FirstName: "Jane",
      Name: "Jane Doe",
      LastLoginDate: "2024-08-13T14:56:59.000+0000",
      LastPasswordChangeDate: "2024-08-13T14:45:59.000+0000",
      CreatedDate: "2023-06-28T13:02:36.000+0000",
      CreatedById: "0054c00000MnPqRSAZ",
      LastModifiedDate: "2023-06-28T14:36:13.000+0000",
      LastModifiedById: "0054c00000MnPqRSAZ",
      SystemModstamp: "2024-08-14T06:00:01.000+0000",
      FullPhotoUrl: "https://example-dev-ed.my.salesforce.com/profilephoto/005/F",
      SmallPhotoUrl: "https://example-dev-ed.my.salesforce.com/profilephoto/005/T",
      IsExtIndicatorVisible: false,
      OutOfOfficeMessage: "",
      MediumPhotoUrl: "https://example-dev-ed.my.salesforce.com/profilephoto/005/M",
      DigestFrequency: "D",
      DefaultGroupNotificationFrequency: "N",
      JigsawImportLimitOverride: 300,
      LastViewedDate: null,
      LastReferencedDate: null,
      BannerPhotoUrl: "/profilephoto/005/B",
      SmallBannerPhotoUrl: "/profilephoto/005/D",
      MediumBannerPhotoUrl: "/profilephoto/005/E",
      IsProfilePhotoActive: false,
      IndividualId: null,
    },
  ],
};

export const activateFlowExamplePayload = {
  data: {
    fullName: "My_Flow",
    success: true,
    errors: [],
  },
};

export const deactivateFlowExamplePayload = {
  data: {
    fullName: "My_Flow",
    success: true,
    errors: [],
  },
};

export const deleteFlowExamplePayload = {
  data: {
    fullName: "My_Flow",
    success: true,
    errors: [],
  },
};

export const createFlowExamplePayload = {
  data: {
    fullName: "My_Flow",
    success: true,
    errors: [],
  },
};

export const subscribeToRecordChangesExamplePayload = {
  data: {
    outboundMessageFullName: "My_Flow",
    flowFullName: "My_Flow",
    success: true,
    errors: [],
  },
};

export const updateFlowExamplePayload = {
  data: {
    fullName: "My_Flow",
    success: true,
    errors: [],
  },
};

export const getFlowExamplePayload = {
  data: {
    fullName: "Example_Flow_01",
    actionCalls: [
      {
        name: "Send_Example_Action",
        label: "Send Example Action",
        locationX: 176,
        locationY: 158,
        actionName: "Account.Example_Action",
        actionType: "outboundMessage",
        flowTransactionModel: "CurrentTransaction",
        nameSegment: "Account.Example_Action",
        processMetadataValues: [],
        inputParameters: [],
        outputParameters: [],
      },
    ],
    apiVersion: "49.0",
    areMetricsLoggedToDataCloud: "false",
    description: "Example description",
    environments: "Default",
    formulas: [
      {
        name: "TriggerCondition",
        dataType: "Boolean",
        expression: "true",
        processMetadataValues: [],
      },
    ],
    label: "Example Label",
    processType: "AutoLaunchedFlow",
    runInMode: "DefaultMode",
    start: {
      locationX: 50,
      locationY: 0,
      connector: {
        targetReference: "Send_Example_Action",
        processMetadataValues: [],
      },
      object: "Account",
      recordTriggerType: "CreateAndUpdate",
      triggerType: "RecordAfterSave",
      processMetadataValues: [],
      filters: [],
    },
    status: "Draft",
    variables: [
      {
        name: "TriggeringRecord",
        dataType: "SObject",
        isCollection: false,
        isInput: true,
        isOutput: false,
        objectType: "Account",
        processMetadataValues: [],
      },
    ],
    apexPluginCalls: [],
    assignments: [],
    choices: [],
    constants: [],
    decisions: [],
    dynamicChoiceSets: [],
    loops: [],
    processMetadataValues: [],
    recordCreates: [],
    recordDeletes: [],
    recordLookups: [],
    recordUpdates: [],
    screens: [],
    stages: [],
    steps: [],
    subflows: [],
    textTemplates: [],
    waits: [],
  },
};

export const listFlowsExamplePayload: { data: FileProperties[] } = {
  data: [
    {
      fullName: "My_Flow",
      type: "Flow",
      namespacePrefix: null,
      createdById: "005000000000000",
      createdByName: "Admin User",
      createdDate: "2023-01-01T00:00:00.000Z",
      fileName: "flows/My_Flow.flow",
      id: "30100000000000",
      lastModifiedById: "005000000000000",
      lastModifiedByName: "Admin User",
      lastModifiedDate: "2023-01-01T00:00:00.000Z",
      manageableState: "unmanaged",
    },
  ],
};

export const deleteInstancedFlowsAndOutboundMessagesExamplePayload = {
  data: { deletedFlows: ["My_Flow"], deletedOutboundMessages: ["My_Outbound_Message"] },
};

export const getRecordExamplePayload = {
  data: {
    Id: "003RM000006pL5gQAE",
    Name: "Acme",
    Phone: "123-456-7890",
    BillingCity: "San Francisco",
    BillingState: "CA",
  },
};

export const findRecordsExamplePayload = {
  data: [
    {
      Id: "003RM000006pL5gQAE",
      Name: "Acme",
      Phone: "123-456-7890",
      BillingCity: "San Francisco",
      BillingState: "CA",
    },
  ],
};

export const compositeRequestExamplePayload = {
  data: {
    hasErrors: false,
    results: [
      {
        statusCode: 204,
        result: null,
      },
      {
        statusCode: 200,
        result: {
          attributes: {
            type: "Account",
            url: "/services/data/v60.0/sobjects/Account/001D000000K0fXOIAZ",
          },
          Name: "NewName",
          BillingPostalCode: "94105",
          Id: "001D000000K0fXOIAZ",
        },
      },
    ],
  },
};

export const listCompositeResourcesExamplePayload = {
  data: {
    hasErrors: false,
    results: [
      {
        tree: "/services/data/v54.0/composite/tree",
        batch: "/services/data/v54.0/composite/batch",
        sobjects: "/services/data/v54.0/composite/sobjects",
        graph: "/services/data/v54.0/composite/graph",
      },
    ],
  },
};

export const addAttachmentExamplePayload = {
  data: {
    id: "015D0000000N3ZZIA0",
    errors: [],
    success: true,
  },
};

export const getAttachmentExamplePayload = {
  data: Buffer.from("SGVsbG8gV29ybGQ="),
  contentType: "image/png",
};

export const getFileExamplePayload = {
  data: Buffer.from("SGVsbG8gV29ybGQ="),
  contentType: "image/png",
};

export const bulkInsertRecordsExamplePayload = {
  data: [
    {
      id: "015D0000000N3ZZIA0",
      errors: [],
      success: true,
    },
  ] as unknown,
};

export const bulkUpsertRecordsExamplePayload = {
  data: [
    {
      id: "015D0000000N3ZZIA0",
      errors: [],
      success: true,
    },
  ] as unknown,
};

export const deleteBulkJobExamplePayload = {
  data: {},
};

export const deleteBulkQueryJobExamplePayload = {
  data: {},
};

export const updateMetadataExamplePayload = {
  data: null,
};

export const deleteMetadataExamplePayload = {
  data: null,
};
