export const sprintBeanSchema = {
  type: "object" as const,
  properties: {
    completeDate: {
      type: "string",
    },
    createdDate: {
      type: "string",
    },
    endDate: {
      type: "string",
    },
    goal: {
      type: "string",
    },
    id: {
      type: "integer",
      format: "int64",
    },
    name: {
      type: "string",
    },
    originBoardId: {
      type: "integer",
      format: "int64",
    },
    self: {
      type: "string",
      format: "uri",
    },
    startDate: {
      type: "string",
    },
    state: {
      type: "string",
    },
  },
};

export const avatarUrlsBeanSchema = {
  type: "object" as const,
  properties: {
    "16x16": {
      type: "string",
      format: "uri",
    },
    "24x24": {
      type: "string",
      format: "uri",
    },
    "32x32": {
      type: "string",
      format: "uri",
    },
    "48x48": {
      type: "string",
      format: "uri",
    },
  },
};

export const userDetailsSchema = {
  type: "object" as const,
  properties: {
    accountId: {
      type: "string",
    },
    accountType: {
      type: "string",
    },
    active: {
      type: "boolean",
    },
    avatarUrls: avatarUrlsBeanSchema,
    displayName: {
      type: "string",
    },
    emailAddress: {
      type: "string",
    },
    key: {
      type: "string",
    },
    name: {
      type: "string",
    },
    self: {
      type: "string",
    },
    timeZone: {
      type: "string",
    },
  },
};

export const entityPropertySchema = {
  type: "object" as const,
  properties: {
    key: {
      type: "string",
    },
    value: {},
  },
};

export const visibilitySchema = {
  type: "object" as const,
  properties: {
    identifier: {
      type: ["string", "null"],
    },
    type: {
      type: "string",
      enum: ["group", "role"],
    },
    value: {
      type: "string",
    },
  },
};

export const commentSchema = {
  type: "object" as const,
  properties: {
    author: userDetailsSchema,
    body: {
      type: ["object", "string"],
    },
    created: {
      type: "string",
      format: "date-time",
    },
    id: {
      type: "string",
    },
    jsdAuthorCanSeeRequest: {
      type: "boolean",
    },
    jsdPublic: {
      type: "boolean",
    },
    properties: {
      type: "array",
      items: entityPropertySchema,
    },
    renderedBody: {
      type: "string",
    },
    self: {
      type: "string",
    },
    updateAuthor: userDetailsSchema,
    updated: {
      type: "string",
      format: "date-time",
    },
    visibility: visibilitySchema,
  },
};

export const pageOfCommentsSchema = {
  type: "object" as const,
  properties: {
    comments: {
      type: "array",
      items: commentSchema,
    },
    maxResults: {
      type: "integer",
      format: "int32",
    },
    startAt: {
      type: "integer",
      format: "int64",
    },
    total: {
      type: "integer",
      format: "int64",
    },
  },
};

export const attachmentSchema = {
  type: "object" as const,
  properties: {
    author: userDetailsSchema,
    content: {
      type: "string",
    },
    created: {
      type: "string",
      format: "date-time",
    },
    filename: {
      type: "string",
    },
    id: {
      type: "string",
    },
    mimeType: {
      type: "string",
    },
    self: {
      type: "string",
    },
    size: {
      type: "integer",
      format: "int64",
    },
    thumbnail: {
      type: "string",
    },
  },
};

export const errorCollectionSchema = {
  type: "object" as const,
  properties: {
    errorMessages: {
      type: "array",
      items: {
        type: "string",
      },
    },
    errors: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    status: {
      type: "integer",
      format: "int32",
    },
  },
};

export const warningCollectionSchema = {
  type: "object" as const,
  properties: {
    warnings: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
};

export const nestedResponseSchema = {
  type: "object" as const,
  properties: {
    errorCollection: errorCollectionSchema,
    status: {
      type: "integer",
      format: "int32",
    },
    warningCollection: warningCollectionSchema,
  },
};

export const createdIssueSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
    key: {
      type: "string",
    },
    self: {
      type: "string",
    },
    transition: nestedResponseSchema,
    watchers: nestedResponseSchema,
  },
};

export const historyMetadataParticipantSchema = {
  type: "object" as const,
  properties: {
    avatarUrl: {
      type: "string",
    },
    displayName: {
      type: "string",
    },
    displayNameKey: {
      type: "string",
    },
    id: {
      type: "string",
    },
    type: {
      type: "string",
    },
    url: {
      type: "string",
    },
  },
};

export const historyMetadataSchema = {
  type: "object" as const,
  properties: {
    activityDescription: {
      type: "string",
    },
    activityDescriptionKey: {
      type: "string",
    },
    actor: historyMetadataParticipantSchema,
    cause: historyMetadataParticipantSchema,
    description: {
      type: "string",
    },
    descriptionKey: {
      type: "string",
    },
    emailDescription: {
      type: "string",
    },
    emailDescriptionKey: {
      type: "string",
    },
    extraData: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    generator: historyMetadataParticipantSchema,
    type: {
      type: "string",
    },
  },
};

export const changeDetailsSchema = {
  type: "object" as const,
  properties: {
    field: {
      type: "string",
    },
    fieldId: {
      type: "string",
    },
    fieldtype: {
      type: "string",
    },
    from: {
      type: "string",
    },
    fromString: {
      type: "string",
    },
    to: {
      type: "string",
    },
    toString: {
      type: "string",
    },
  },
};

export const changelogSchema = {
  type: "object" as const,
  properties: {
    author: userDetailsSchema,
    created: {
      type: "string",
      format: "date-time",
    },
    historyMetadata: historyMetadataSchema,
    id: {
      type: "string",
    },
    items: {
      type: "array",
      items: changeDetailsSchema,
    },
  },
};

export const pageOfChangelogsSchema = {
  type: "object" as const,
  properties: {
    histories: {
      type: "array",
      items: changelogSchema,
    },
    maxResults: {
      type: "integer",
      format: "int32",
    },
    startAt: {
      type: "integer",
      format: "int32",
    },
    total: {
      type: "integer",
      format: "int32",
    },
  },
};

export const jsonTypeBeanSchema = {
  type: "object" as const,
  properties: {
    configuration: {
      type: "object" as const,
      additionalProperties: true,
    },
    custom: {
      type: "string",
    },
    customId: {
      type: "integer",
      format: "int64",
    },
    items: {
      type: "string",
    },
    system: {
      type: "string",
    },
    type: {
      type: "string",
    },
  },
  required: ["type"],
};

export const fieldMetadataSchema = {
  type: "object" as const,
  properties: {
    allowedValues: {
      type: "array",
      items: {},
    },
    autoCompleteUrl: {
      type: "string",
    },
    configuration: {
      type: "object" as const,
      additionalProperties: true,
    },
    defaultValue: {},
    hasDefaultValue: {
      type: "boolean",
    },
    key: {
      type: "string",
    },
    name: {
      type: "string",
    },
    operations: {
      type: "array",
      items: {
        type: "string",
      },
    },
    required: {
      type: "boolean",
    },
    schema: jsonTypeBeanSchema,
  },
  required: ["key", "name", "operations", "required", "schema"],
};

export const issueUpdateMetadataSchema = {
  type: "object" as const,
  properties: {
    fields: {
      type: "object" as const,
      additionalProperties: fieldMetadataSchema,
    },
  },
};

export const includedFieldsSchema = {
  type: "object" as const,
  properties: {
    actuallyIncluded: {
      type: "array",
      items: {
        type: "string",
      },
    },
    excluded: {
      type: "array",
      items: {
        type: "string",
      },
    },
    included: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
};

export const simpleLinkSchema = {
  type: "object" as const,
  properties: {
    href: {
      type: "string",
    },
    iconClass: {
      type: "string",
    },
    id: {
      type: "string",
    },
    label: {
      type: "string",
    },
    styleClass: {
      type: "string",
    },
    title: {
      type: "string",
    },
    weight: {
      type: "integer",
      format: "int32",
    },
  },
};

export const linkGroupSchema = {
  type: "object" as const,
  properties: {
    groups: {
      type: "array",
      items: {
        type: "object" as const,
      },
    },
    header: simpleLinkSchema,
    id: {
      type: "string",
    },
    links: {
      type: "array",
      items: simpleLinkSchema,
    },
    styleClass: {
      type: "string",
    },
    weight: {
      type: "integer",
      format: "int32",
    },
  },
};

export const operationsSchema = {
  type: "object" as const,
  properties: {
    linkGroups: {
      type: "array",
      items: linkGroupSchema,
    },
  },
};

export const updatedProjectCategorySchema = {
  type: "object" as const,
  properties: {
    description: {
      type: "string",
    },
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    self: {
      type: "string",
    },
  },
};

export const projectDetailsSchema = {
  type: "object" as const,
  properties: {
    avatarUrls: avatarUrlsBeanSchema,
    id: {
      type: "string",
    },
    key: {
      type: "string",
    },
    name: {
      type: "string",
    },
    projectCategory: updatedProjectCategorySchema,
    projectTypeKey: {
      type: "string",
      enum: ["software", "service_desk", "business", "product_discovery"],
    },
    self: {
      type: "string",
    },
    simplified: {
      type: "boolean",
    },
  },
};

export const scopeSchema = {
  type: "object" as const,
  properties: {
    project: projectDetailsSchema,
    type: {
      type: "string",
      enum: ["PROJECT", "TEMPLATE"],
    },
  },
};

export const statusCategorySchema = {
  type: "object" as const,
  properties: {
    colorName: {
      type: "string",
    },
    id: {
      type: "integer",
      format: "int64",
    },
    key: {
      type: "string",
    },
    name: {
      type: "string",
    },
    self: {
      type: "string",
    },
  },
};

export const statusDetailsSchema = {
  type: "object" as const,
  properties: {
    description: {
      type: "string",
    },
    iconUrl: {
      type: "string",
    },
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    scope: scopeSchema,
    self: {
      type: "string",
    },
    statusCategory: statusCategorySchema,
  },
};

export const issueTransitionSchema = {
  type: "object" as const,
  properties: {
    expand: {
      type: "string",
    },
    fields: {
      type: "object" as const,
      additionalProperties: fieldMetadataSchema,
    },
    hasScreen: {
      type: "boolean",
    },
    id: {
      type: "string",
    },
    isAvailable: {
      type: "boolean",
    },
    isConditional: {
      type: "boolean",
    },
    isGlobal: {
      type: "boolean",
    },
    isInitial: {
      type: "boolean",
    },
    looped: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    to: statusDetailsSchema,
  },
};

export const issueBeanSchema = {
  type: "object" as const,
  properties: {
    changelog: pageOfChangelogsSchema,
    editmeta: issueUpdateMetadataSchema,
    expand: {
      type: "string",
    },
    fields: {
      type: "object" as const,
      additionalProperties: true,
    },
    fieldsToInclude: includedFieldsSchema,
    id: {
      type: "string",
    },
    key: {
      type: "string",
    },
    names: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    operations: operationsSchema,
    properties: {
      type: "object" as const,
      additionalProperties: true,
    },
    renderedFields: {
      type: "object" as const,
      additionalProperties: true,
    },
    schema: {
      type: "object" as const,
      additionalProperties: jsonTypeBeanSchema,
    },
    self: {
      type: "string",
      format: "uri",
    },
    transitions: {
      type: "array",
      items: issueTransitionSchema,
    },
    versionedRepresentations: {
      type: "object" as const,
      additionalProperties: {
        type: "object" as const,
        additionalProperties: true,
      },
    },
  },
};

export const transitionsSchema = {
  type: "object" as const,
  properties: {
    expand: {
      type: "string",
    },
    transitions: {
      type: "array",
      items: issueTransitionSchema,
    },
  },
};

export const worklogSchema = {
  type: "object" as const,
  properties: {
    author: userDetailsSchema,
    comment: {
      type: ["object", "string"],
    },
    created: {
      type: "string",
      format: "date-time",
    },
    id: {
      type: "string",
    },
    issueId: {
      type: "string",
    },
    properties: {
      type: "array",
      items: entityPropertySchema,
    },
    self: {
      type: "string",
      format: "uri",
    },
    started: {
      type: "string",
      format: "date-time",
    },
    timeSpent: {
      type: "string",
    },
    timeSpentSeconds: {
      type: "integer",
      format: "int64",
    },
    updateAuthor: userDetailsSchema,
    updated: {
      type: "string",
      format: "date-time",
    },
    visibility: visibilitySchema,
  },
};

export const pageOfWorklogsSchema = {
  type: "object" as const,
  properties: {
    maxResults: {
      type: "integer",
      format: "int32",
    },
    startAt: {
      type: "integer",
      format: "int32",
    },
    total: {
      type: "integer",
      format: "int32",
    },
    worklogs: {
      type: "array",
      items: worklogSchema,
    },
  },
};

export const expandPrioritySchemePageSchema = {
  type: "object" as const,
  properties: {
    maxResults: {
      type: "integer",
      format: "int32",
    },
    startAt: {
      type: "integer",
      format: "int64",
    },
    total: {
      type: "integer",
      format: "int64",
    },
  },
};

export const prioritySchema = {
  type: "object" as const,
  properties: {
    avatarId: {
      type: "integer",
      format: "int64",
    },
    description: {
      type: "string",
    },
    iconUrl: {
      type: "string",
    },
    id: {
      type: "string",
    },
    isDefault: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    schemes: expandPrioritySchemePageSchema,
    self: {
      type: "string",
    },
    statusColor: {
      type: "string",
    },
  },
};

export const issueTypeDetailsSchema = {
  type: "object" as const,
  properties: {
    avatarId: {
      type: "integer",
      format: "int64",
    },
    description: {
      type: "string",
    },
    entityId: {
      type: "string",
      format: "uuid",
    },
    hierarchyLevel: {
      type: "integer",
      format: "int32",
    },
    iconUrl: {
      type: "string",
    },
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    scope: scopeSchema,
    self: {
      type: "string",
    },
    subtask: {
      type: "boolean",
    },
  },
};

export const searchWarningLimitDetailsSchema = {
  type: "object" as const,
  properties: {
    actual: {
      type: "integer",
      format: "int64",
    },
    arguments: {
      type: "string",
    },
    clause: {
      type: "string",
    },
    limit: {
      type: "integer",
      format: "int64",
    },
  },
};

export const searchWarningSchema = {
  type: "object" as const,
  properties: {
    details: searchWarningLimitDetailsSchema,
    message: {
      type: "string",
    },
    type: {
      type: "string",
    },
  },
};

export const issueSearchResultsPartialSchema = {
  type: "object" as const,
  properties: {
    isLast: {
      type: "boolean",
    },
    issues: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          changelog: pageOfChangelogsSchema,
          editmeta: issueUpdateMetadataSchema,
          expand: {
            type: "string",
          },
          fields: {
            type: "object" as const,
            properties: {
              summary: {
                type: "string",
              },
              status: statusDetailsSchema,
              assignee: { ...userDetailsSchema, type: ["object", "null"] },
              priority: { ...prioritySchema, type: ["object", "null"] },
              issuetype: issueTypeDetailsSchema,
            },
            required: [],
            additionalProperties: true,
          },
          fieldsToInclude: includedFieldsSchema,
          id: {
            type: "string",
          },
          key: {
            type: "string",
          },
          names: {
            type: "object" as const,
            additionalProperties: {
              type: "string",
            },
          },
          operations: operationsSchema,
          properties: {
            type: "object" as const,
            additionalProperties: true,
          },
          renderedFields: {
            type: "object" as const,
            additionalProperties: true,
          },
          schema: {
            type: "object" as const,
            additionalProperties: jsonTypeBeanSchema,
          },
          self: {
            type: "string",
            format: "uri",
          },
          transitions: {
            type: "array",
            items: issueTransitionSchema,
          },
          versionedRepresentations: {
            type: "object" as const,
            additionalProperties: {
              type: "object" as const,
              additionalProperties: true,
            },
          },
        },
      },
    },
    names: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    nextPageToken: {
      type: "string",
    },
    schema: {
      type: "object" as const,
      additionalProperties: jsonTypeBeanSchema,
    },
    warnings: {
      type: "array",
      items: searchWarningSchema,
    },
  },
};

export const searchAndReconcileResultsSchema = {
  type: "object" as const,
  properties: {
    isLast: {
      type: "boolean",
    },
    issues: {
      type: "array",
      items: issueBeanSchema,
    },
    names: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    nextPageToken: {
      type: "string",
    },
    schema: {
      type: "object" as const,
      additionalProperties: jsonTypeBeanSchema,
    },
    warnings: {
      type: "array",
      items: searchWarningSchema,
    },
  },
};

export const groupNameSchema = {
  type: "object" as const,
  properties: {
    groupId: {
      type: ["string", "null"],
    },
    name: {
      type: "string",
    },
    self: {
      type: "string",
      format: "uri",
    },
  },
};

export const applicationRoleSchema = {
  type: "object" as const,
  properties: {
    defaultGroups: {
      type: "array",
      items: {
        type: "string",
      },
    },
    defaultGroupsDetails: {
      type: "array",
      items: groupNameSchema,
    },
    defined: {
      type: "boolean",
    },
    groupDetails: {
      type: "array",
      items: groupNameSchema,
    },
    groups: {
      type: "array",
      items: {
        type: "string",
      },
    },
    hasUnlimitedSeats: {
      type: "boolean",
    },
    key: {
      type: "string",
    },
    name: {
      type: "string",
    },
    numberOfSeats: {
      type: "integer",
      format: "int32",
    },
    platform: {
      type: "boolean",
    },
    remainingSeats: {
      type: "integer",
      format: "int32",
    },
    selectedByDefault: {
      type: "boolean",
    },
    userCount: {
      type: "integer",
      format: "int32",
    },
    userCountDescription: {
      type: "string",
    },
  },
};

export const simpleListWrapperApplicationRoleSchema = {
  type: "object" as const,
  properties: {
    callback: {
      type: "object" as const,
    },
    items: {
      type: "array",
      items: applicationRoleSchema,
    },
    "max-results": {
      type: "integer",
      format: "int32",
    },
    pagingCallback: {
      type: "object" as const,
    },
    size: {
      type: "integer",
      format: "int32",
    },
  },
};

export const simpleListWrapperGroupNameSchema = {
  type: "object" as const,
  properties: {
    callback: {
      type: "object" as const,
    },
    items: {
      type: "array",
      items: groupNameSchema,
    },
    "max-results": {
      type: "integer",
      format: "int32",
    },
    pagingCallback: {
      type: "object" as const,
    },
    size: {
      type: "integer",
      format: "int32",
    },
  },
};

export const userSchema = {
  type: "object" as const,
  properties: {
    accountId: {
      type: "string",
    },
    accountType: {
      type: "string",
      enum: ["atlassian", "app", "customer", "unknown"],
    },
    active: {
      type: "boolean",
    },
    appType: {
      type: "string",
    },
    applicationRoles: simpleListWrapperApplicationRoleSchema,
    avatarUrls: avatarUrlsBeanSchema,
    displayName: {
      type: "string",
    },
    emailAddress: {
      type: "string",
    },
    expand: {
      type: "string",
    },
    groups: simpleListWrapperGroupNameSchema,
    guest: {
      type: "boolean",
    },
    key: {
      type: "string",
    },
    locale: {
      type: "string",
    },
    name: {
      type: "string",
    },
    self: {
      type: "string",
      format: "uri",
    },
    timeZone: {
      type: "string",
    },
  },
};

export const projectComponentSchema = {
  type: "object" as const,
  properties: {
    ari: {
      type: "string",
    },
    assignee: userSchema,
    assigneeType: {
      type: "string",
      enum: ["PROJECT_DEFAULT", "COMPONENT_LEAD", "PROJECT_LEAD", "UNASSIGNED"],
    },
    description: {
      type: "string",
    },
    id: {
      type: "string",
    },
    isAssigneeTypeValid: {
      type: "boolean",
    },
    lead: userSchema,
    leadAccountId: {
      type: "string",
    },
    leadUserName: {
      type: "string",
    },
    metadata: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    name: {
      type: "string",
    },
    project: {
      type: "string",
    },
    projectId: {
      type: "integer",
      format: "int64",
    },
    realAssignee: userSchema,
    realAssigneeType: {
      type: "string",
      enum: ["PROJECT_DEFAULT", "COMPONENT_LEAD", "PROJECT_LEAD", "UNASSIGNED"],
    },
    self: {
      type: "string",
      format: "uri",
    },
  },
};

export const projectInsightSchema = {
  type: "object" as const,
  properties: {
    lastIssueUpdateTime: {
      type: "string",
      format: "date-time",
    },
    totalIssueCount: {
      type: "integer",
      format: "int64",
    },
  },
};

export const simplifiedHierarchyLevelSchema = {
  type: "object" as const,
  properties: {
    aboveLevelId: {
      type: "integer",
      format: "int64",
    },
    belowLevelId: {
      type: "integer",
      format: "int64",
    },
    externalUuid: {
      type: "string",
      format: "uuid",
    },
    hierarchyLevelNumber: {
      type: "integer",
      format: "int32",
    },
    id: {
      type: "integer",
      format: "int64",
    },
    issueTypeIds: {
      type: "array",
      items: {
        type: "integer",
        format: "int64",
      },
    },
    level: {
      type: "integer",
      format: "int32",
    },
    name: {
      type: "string",
    },
    projectConfigurationId: {
      type: "integer",
      format: "int64",
    },
  },
};

export const hierarchySchema = {
  type: "object" as const,
  properties: {
    baseLevelId: {
      type: "integer",
      format: "int64",
    },
    levels: {
      type: "array",
      items: simplifiedHierarchyLevelSchema,
    },
  },
};

export const projectLandingPageInfoSchema = {
  type: "object" as const,
  properties: {
    attributes: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    boardId: {
      type: "integer",
      format: "int64",
    },
    boardName: {
      type: "string",
    },
    projectKey: {
      type: "string",
    },
    projectType: {
      type: "string",
    },
    queueCategory: {
      type: "string",
    },
    queueId: {
      type: "integer",
      format: "int64",
    },
    queueName: {
      type: "string",
    },
    simpleBoard: {
      type: "boolean",
    },
    simplified: {
      type: "boolean",
    },
    url: {
      type: "string",
    },
  },
};

export const projectPermissionsSchema = {
  type: "object" as const,
  properties: {
    canEdit: {
      type: "boolean",
    },
  },
};

export const projectCategorySchema = {
  type: "object" as const,
  properties: {
    description: {
      type: "string",
    },
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    self: {
      type: "string",
      format: "uri",
    },
  },
};

export const versionApproverSchema = {
  type: "object" as const,
  properties: {
    accountId: {
      type: "string",
    },
    declineReason: {
      type: "string",
    },
    description: {
      type: "string",
    },
    status: {
      type: "string",
    },
  },
};

export const versionIssuesStatusSchema = {
  type: "object" as const,
  properties: {
    done: {
      type: "integer",
      format: "int64",
    },
    inProgress: {
      type: "integer",
      format: "int64",
    },
    toDo: {
      type: "integer",
      format: "int64",
    },
    unmapped: {
      type: "integer",
      format: "int64",
    },
  },
};

export const versionSchema = {
  type: "object" as const,
  properties: {
    approvers: {
      type: "array",
      items: versionApproverSchema,
    },
    archived: {
      type: "boolean",
    },
    description: {
      type: "string",
    },
    driver: {
      type: "string",
    },
    expand: {
      type: "string",
    },
    id: {
      type: "string",
    },
    issuesStatusForFixVersion: versionIssuesStatusSchema,
    moveUnfixedIssuesTo: {
      type: "string",
      format: "uri",
    },
    name: {
      type: "string",
    },
    operations: {
      type: "array",
      items: simpleLinkSchema,
    },
    overdue: {
      type: "boolean",
    },
    project: {
      type: "string",
    },
    projectId: {
      type: "integer",
      format: "int64",
    },
    releaseDate: {
      type: "string",
      format: "date",
    },
    released: {
      type: "boolean",
    },
    self: {
      type: "string",
      format: "uri",
    },
    startDate: {
      type: "string",
      format: "date",
    },
    userReleaseDate: {
      type: "string",
    },
    userStartDate: {
      type: "string",
    },
  },
};

export const projectSchema = {
  type: "object" as const,
  properties: {
    archived: {
      type: "boolean",
    },
    archivedBy: userSchema,
    archivedDate: {
      type: "string",
      format: "date-time",
    },
    assigneeType: {
      type: "string",
      enum: ["PROJECT_LEAD", "UNASSIGNED"],
    },
    avatarUrls: avatarUrlsBeanSchema,
    components: {
      type: "array",
      items: projectComponentSchema,
    },
    deleted: {
      type: "boolean",
    },
    deletedBy: userSchema,
    deletedDate: {
      type: "string",
      format: "date-time",
    },
    description: {
      type: "string",
    },
    email: {
      type: "string",
    },
    expand: {
      type: "string",
    },
    favourite: {
      type: "boolean",
    },
    id: {
      type: "string",
    },
    insight: projectInsightSchema,
    isPrivate: {
      type: "boolean",
    },
    issueTypeHierarchy: hierarchySchema,
    issueTypes: {
      type: "array",
      items: issueTypeDetailsSchema,
    },
    key: {
      type: "string",
    },
    landingPageInfo: projectLandingPageInfoSchema,
    lead: userSchema,
    name: {
      type: "string",
    },
    permissions: projectPermissionsSchema,
    projectCategory: projectCategorySchema,
    projectTypeKey: {
      type: "string",
      enum: ["software", "service_desk", "business", "product_discovery"],
    },
    properties: {
      type: "object" as const,
      additionalProperties: true,
    },
    retentionTillDate: {
      type: "string",
      format: "date-time",
    },
    roles: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
        format: "uri",
      },
    },
    self: {
      type: "string",
      format: "uri",
    },
    simplified: {
      type: "boolean",
    },
    style: {
      type: "string",
      enum: ["classic", "next-gen"],
    },
    url: {
      type: "string",
    },
    uuid: {
      type: "string",
      format: "uuid",
    },
    versions: {
      type: "array",
      items: versionSchema,
    },
  },
};

export const projectIdSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
  },
  required: ["id"],
};

export const statusScopeSchema = {
  type: "object" as const,
  properties: {
    project: { ...projectIdSchema, type: ["object", "null"] },
    type: {
      type: "string",
      enum: ["PROJECT", "GLOBAL"],
    },
  },
  required: ["type"],
};

export const jiraStatusSchema = {
  type: "object" as const,
  properties: {
    description: {
      type: "string",
    },
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    scope: statusScopeSchema,
    statusCategory: {
      type: "string",
      enum: ["TODO", "IN_PROGRESS", "DONE"],
    },
  },
};

export const pageOfStatusesSchema = {
  type: "object" as const,
  properties: {
    isLast: {
      type: "boolean",
    },
    maxResults: {
      type: "integer",
      format: "int32",
    },
    nextPage: {
      type: "string",
    },
    self: {
      type: "string",
    },
    startAt: {
      type: "integer",
      format: "int64",
    },
    total: {
      type: "integer",
      format: "int64",
    },
    values: {
      type: "array",
      items: jiraStatusSchema,
    },
  },
};

export const fieldDetailsSchema = {
  type: "object" as const,
  properties: {
    clauseNames: {
      type: "array",
      items: {
        type: "string",
      },
    },
    custom: {
      type: "boolean",
    },
    id: {
      type: "string",
    },
    key: {
      type: "string",
    },
    name: {
      type: "string",
    },
    navigable: {
      type: "boolean",
    },
    orderable: {
      type: "boolean",
    },
    schema: jsonTypeBeanSchema,
    scope: scopeSchema,
    searchable: {
      type: "boolean",
    },
  },
};

export const issueLinkTypeSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
    inward: {
      type: "string",
    },
    name: {
      type: "string",
    },
    outward: {
      type: "string",
    },
    self: {
      type: "string",
      format: "uri",
    },
  },
};

export const issueLinkTypesSchema = {
  type: "object" as const,
  properties: {
    issueLinkTypes: {
      type: "array",
      items: issueLinkTypeSchema,
    },
  },
};

export const pageBeanPrioritySchema = {
  type: "object" as const,
  properties: {
    isLast: {
      type: "boolean",
    },
    maxResults: {
      type: "integer",
      format: "int32",
    },
    nextPage: {
      type: "string",
      format: "uri",
    },
    self: {
      type: "string",
      format: "uri",
    },
    startAt: {
      type: "integer",
      format: "int64",
    },
    total: {
      type: "integer",
      format: "int64",
    },
    values: {
      type: "array",
      items: prioritySchema,
    },
  },
};

export const pageBeanVersionSchema = {
  type: "object" as const,
  properties: {
    isLast: {
      type: "boolean",
    },
    maxResults: {
      type: "integer",
      format: "int32",
    },
    nextPage: {
      type: "string",
      format: "uri",
    },
    self: {
      type: "string",
      format: "uri",
    },
    startAt: {
      type: "integer",
      format: "int64",
    },
    total: {
      type: "integer",
      format: "int64",
    },
    values: {
      type: "array",
      items: versionSchema,
    },
  },
};

export const webhooksExpirationDateSchema = {
  type: "object" as const,
  properties: {
    expirationDate: {
      type: ["integer", "string"],
    },
  },
  required: ["expirationDate"],
};

export const registeredWebhookSchema = {
  type: "object" as const,
  properties: {
    createdWebhookId: {
      type: "integer",
      format: "int64",
    },
    errors: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
};

export const webhookSchema = {
  type: "object" as const,
  properties: {
    events: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "jira:issue_created",
          "jira:issue_updated",
          "jira:issue_deleted",
          "comment_created",
          "comment_updated",
          "comment_deleted",
          "issue_property_set",
          "issue_property_deleted",
          "sprint_created",
          "sprint_updated",
          "sprint_closed",
          "sprint_deleted",
          "sprint_started",
          "jira:version_released",
          "jira:version_unreleased",
          "jira:version_created",
          "jira:version_moved",
          "jira:version_updated",
          "jira:version_merged",
          "jira:version_deleted",
        ],
      },
    },
    expirationDate: {
      type: ["integer", "string"],
    },
    fieldIdsFilter: {
      type: "array",
      items: {
        type: "string",
      },
    },
    id: {
      type: "integer",
      format: "int64",
    },
    issuePropertyKeysFilter: {
      type: "array",
      items: {
        type: "string",
      },
    },
    jqlFilter: {
      type: "string",
    },
    url: {
      type: "string",
    },
  },
  required: ["events", "id", "jqlFilter", "url"],
};
