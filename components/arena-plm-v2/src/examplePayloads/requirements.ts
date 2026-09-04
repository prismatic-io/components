const sampleUser = {
  guid: "AR1BC2DE3FG4HI5JK6LM7NO8",
  fullName: "Alex Chen",
  email: "alex.chen@example.com",
};
const sampleUser2 = {
  guid: "PQ9RS0TU1VW2XY3ZA4BC5DE6",
  fullName: "Morgan Patel",
  email: "morgan.patel@example.com",
};
const sampleStatus = {
  guid: "ST7UV8WX9YZ0AB1CD2EF3GH4",
  value: "In Review",
  code: "IN_REVIEW",
};
const sampleTemplateRef = {
  guid: "TM5PL6AT7EM8PL9AT0EM1PL2",
  name: "Product Requirement",
};
const sampleRequirementFull = {
  guid: "RQ1AB2CD3EF4GH5IJ6KL7MN8",
  number: "REQ-000128",
  title: "System shall support single sign-on",
  description:
    "The system must allow users to authenticate via SAML 2.0 single sign-on.",
  priority: "High",
  status: sampleStatus,
  template: sampleTemplateRef,
  assignee: sampleUser,
  creator: sampleUser,
  modifier: sampleUser2,
  creationDateTime: "2026-05-02T14:30:00Z",
  modificationDateTime: "2026-05-10T09:15:00Z",
  additionalAttributes: [
    { guid: "AA1TR2IB3UT4EG5UI6DA7B08", value: "Security" },
  ],
};
const sampleRequirementFull2 = {
  guid: "RQ2NO3PQ4RS5TU6VW7XY8ZA9",
  number: "REQ-000129",
  title: "System shall enforce password complexity",
  description:
    "Passwords must contain at least 12 characters with mixed case, digits, and symbols.",
  priority: "Medium",
  status: {
    guid: "ST0DR1AF2TG3UI4DA5BC6DE7",
    value: "Draft",
    code: "DRAFT",
  },
  template: sampleTemplateRef,
  assignee: sampleUser2,
  creator: sampleUser,
  modifier: sampleUser,
  creationDateTime: "2026-05-03T10:05:00Z",
  modificationDateTime: "2026-05-03T10:05:00Z",
  additionalAttributes: [],
};
const sampleChildRequirement = {
  guid: "RC9HI0LD1RE2QU3IR4EM5NT6",
  number: "REQ-000131",
  title: "Support SAML metadata import",
  description:
    "Administrators must be able to import an identity provider's SAML metadata XML.",
  priority: "Medium",
  status: sampleStatus,
  template: sampleTemplateRef,
  assignee: sampleUser,
  creator: sampleUser,
  modifier: sampleUser,
  creationDateTime: "2026-05-04T11:20:00Z",
  modificationDateTime: "2026-05-06T16:40:00Z",
  additionalAttributes: [],
};
const sampleTraceToRequirement = {
  guid: "TR5AC6EL7IN8KG9UI0DL1MN2",
  level: 1,
  relationshipType: {
    guid: "RL3TY4PE5GU6ID7AB8CD9EF0",
    upstreamLabel: "Derived From",
    downstreamLabel: "Derives",
  },
  suspected: false,
  objectType: "REQUIREMENT",
  requirement: sampleChildRequirement,
};
const sampleTraceToItem = {
  guid: "TR7AC8EL9IN0KG1UI2DL3MN4",
  level: 1,
  relationshipType: {
    guid: "RL5TY6PE7GU8ID9AB0CD1EF2",
    upstreamLabel: "Verified By",
    downstreamLabel: "Verifies",
  },
  suspected: true,
  objectType: "ITEM",
  item: {
    guid: "IT1EM2GU3ID4AB5CD6EF7GH8",
    name: "Authentication Service Board",
    number: "PRT-002045",
    revisionNumber: "A",
    revisionStatus: "WORKING",
    url: {
      api: "https://api.arenasolutions.com/v1/items/IT1EM2GU3ID4AB5CD6EF7GH8",
      app: "https://app.bom.com/items/IT1EM2GU3ID4AB5CD6EF7GH8",
    },
  },
};
const sampleTemplate = {
  active: true,
  allowUserDefinedNumber: false,
  creationDateTime: "2026-01-15T10:00:00Z",
  creator: sampleUser,
  defaultAssignee: sampleUser,
  defaultNumberSequence: {
    guid: "NS3EQ4UE5NC6EG7UI8DL9MN0",
    name: "Requirement Sequence",
    prefixes: [{ guid: "NP1RE2FI3XG4UI5DA6BC7DE8", value: "REQ" }],
  },
  defaultTemplate: true,
  description: "Standard template for product requirements.",
  guid: "TM5PL6AT7EM8PL9AT0EM1PL2",
  name: "Product Requirement",
  numberSequences: [
    {
      guid: "NS3EQ4UE5NC6EG7UI8DL9MN0",
      name: "Requirement Sequence",
      prefixes: [{ guid: "NP1RE2FI3XG4UI5DA6BC7DE8", value: "REQ" }],
    },
  ],
};
const sampleRelationshipType = {
  guid: "RL3TY4PE5GU6ID7AB8CD9EF0",
  upstreamLabel: "Derived From",
  downstreamLabel: "Derives",
  description: "Indicates one requirement is derived from another.",
};
const sampleQualityAssoc = {
  guid: "QA1SS2OC3IA4TN5GU6ID7MN8",
  quality: {
    guid: "QP9RO0CE1SS2GU3ID4AB5CD6",
    number: "CAPA-000045",
    step: {
      guid: "QS7TE8PG9UI0DA1BC2DE3FG4",
      name: "Investigation",
    },
  },
};
const sampleTicketAssoc = {
  guid: "TA5SS6OC7IA8TN9GU0ID1MN2",
  ticket: {
    guid: "TK3IC4KE5TG6UI7DA8BC9DE0",
    number: "TKT-000318",
  },
};
const sampleFileAssoc = {
  guid: "FA1SS2OC3IA4TN5GU6ID7MN8",
  file: {
    guid: "FL9IE0GU1ID2AB3CD4EF5GH6",
    name: "sso-spec.pdf",
    number: "FILE-000915",
    title: "SSO Requirements Specification",
    edition: "A",
    format: "PDF",
    mimeType: "application/pdf",
    size: 194328,
    storageMethodName: "FILE",
    creationDateTime: "2026-05-05T13:00:00Z",
    lastModifiedDateTime: "2026-05-05T13:00:00Z",
    latest: true,
    private: false,
  },
};
const sampleTemplateAttribute = {
  guid: "TA3TR4IB5UT6EG7UI8DA9B00",
  active: true,
  apiName: "securityDomain",
  name: "Security Domain",
  fieldType: "FIXED_DROP_DOWN",
  required: false,
  editable: true,
  custom: true,
  description: "Security domain the requirement applies to.",
  possibleValues: ["Authentication", "Authorization", "Auditing"],
  multiSelect: false,
};
export const createRequirementExamplePayload = { data: sampleRequirementFull };
export const getRequirementExamplePayload = { data: sampleRequirementFull };
export const listRequirementsExamplePayload = {
  data: {
    results: [sampleRequirementFull, sampleRequirementFull2],
    count: 2,
  },
};
export const updateRequirementExamplePayload = {
  data: {
    ...sampleRequirementFull,
    title: "System shall support single sign-on (SAML 2.0 & OIDC)",
    modificationDateTime: "2026-05-12T15:45:00Z",
    modifier: sampleUser,
  },
};
export const deleteRequirementExamplePayload = {
  data: {
    success: true,
    message: "Requirement deleted successfully",
  },
};
export const changeRequirementStatusExamplePayload = {
  data: {
    guid: "SC1HA2NG3ES4TA5TU6SG7UI8",
    requirement: {
      guid: "RQ1AB2CD3EF4GH5IJ6KL7MN8",
      number: "REQ-000128",
    },
    status: sampleStatus,
    comment: "Moved to In Review after initial draft was completed.",
    changeDateTime: "2026-05-11T08:00:00Z",
    user: sampleUser,
  },
};
export const getRequirementTemplateExamplePayload = { data: sampleTemplate };
export const listRequirementTemplatesExamplePayload = {
  data: {
    results: [
      sampleTemplate,
      {
        ...sampleTemplate,
        guid: "TM3PL4AT5EM6PL7AT8EM9PL0",
        name: "Regulatory Requirement",
        description: "Template for regulatory and compliance requirements.",
        defaultTemplate: false,
      },
    ],
    count: 2,
  },
};
export const listRequirementTemplateAttributesExamplePayload = {
  data: {
    results: [sampleTemplateAttribute],
    count: 1,
  },
};
export const addRequirementChildExamplePayload = {
  data: {
    guid: "CA1SS2OC3IA4TN5GU6ID7MN8",
    requirement: sampleChildRequirement,
  },
};
export const removeRequirementChildExamplePayload = {
  data: {
    success: true,
    message: "Requirement child removed successfully",
  },
};
export const listRequirementChildrenExamplePayload = {
  data: {
    results: [
      {
        guid: "CA1SS2OC3IA4TN5GU6ID7MN8",
        requirement: sampleChildRequirement,
      },
    ],
    count: 1,
  },
};
export const getRequirementParentExamplePayload = {
  data: {
    guid: "PA7SS8OC9IA0TN1GU2ID3MN4",
    requirement: {
      ...sampleRequirementFull,
      guid: "RP7AR8EN9TR0EQ1UI2RE3MN4",
      number: "REQ-000100",
      title: "Users shall authenticate securely",
    },
  },
};
export const addRequirementTraceExamplePayload = {
  data: sampleTraceToRequirement,
};
export const getRequirementTraceExamplePayload = {
  data: sampleTraceToRequirement,
};
export const listRequirementTracesExamplePayload = {
  data: {
    results: [sampleTraceToRequirement, sampleTraceToItem],
    count: 2,
  },
};
export const updateRequirementTraceExamplePayload = {
  data: {
    ...sampleTraceToRequirement,
    suspected: true,
  },
};
export const deleteRequirementTraceExamplePayload = {
  data: {
    success: true,
    message: "Requirement trace deleted successfully",
  },
};
export const listRequirementRelationshipTypesExamplePayload = {
  data: {
    results: [
      sampleRelationshipType,
      {
        guid: "RL5TY6PE7GU8ID9AB0CD1EF2",
        upstreamLabel: "Verified By",
        downstreamLabel: "Verifies",
        description: "Indicates a requirement is verified by an item or test.",
      },
    ],
    count: 2,
  },
};
export const listRequirementQualityExamplePayload = {
  data: {
    results: [sampleQualityAssoc],
    count: 1,
  },
};
export const getRequirementQualityAssociationExamplePayload = {
  data: sampleQualityAssoc,
};
export const addRequirementQualityExamplePayload = {
  data: sampleQualityAssoc,
};
export const removeRequirementQualityAssociationExamplePayload = {
  data: {
    success: true,
    message: "Requirement quality association removed successfully",
  },
};
export const addRequirementFileExamplePayload = { data: sampleFileAssoc };
export const listRequirementFilesExamplePayload = {
  data: {
    results: [sampleFileAssoc],
    count: 1,
  },
};
export const getRequirementFileAssociationExamplePayload = {
  data: sampleFileAssoc,
};
export const removeRequirementFileAssociationExamplePayload = {
  data: {
    success: true,
    message: "Requirement file association removed successfully",
  },
};
export const addRequirementTicketExamplePayload = { data: sampleTicketAssoc };
export const listRequirementTicketsExamplePayload = {
  data: {
    results: [sampleTicketAssoc],
    count: 1,
  },
};
export const getRequirementTicketAssociationExamplePayload = {
  data: sampleTicketAssoc,
};
export const removeRequirementTicketAssociationExamplePayload = {
  data: {
    success: true,
    message: "Requirement ticket association removed successfully",
  },
};
export const listRequirementHistoryExamplePayload = {
  data: {
    results: [
      {
        guid: "HS7TO8RY9EN0TR1YG2UI3D04",
        action: "CREATED",
        user: sampleUser,
        dateTime: "2026-05-02T14:30:00Z",
      },
      {
        guid: "HI5ST6OR7YE8NT9RY0GU1ID2",
        action: "STATUS_CHANGE",
        fromStatus: "DRAFT",
        toStatus: "IN_REVIEW",
        user: sampleUser,
        dateTime: "2026-05-11T08:00:00Z",
      },
    ],
    count: 2,
  },
};
