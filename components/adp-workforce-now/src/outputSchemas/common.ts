export const codeTypeSchema = {
  type: "object" as const,
  properties: {
    codeValue: { type: "string" },
    shortName: { type: "string" },
    longName: { type: "string" },
  },
};
export const statusTypeSchema = {
  type: "object" as const,
  properties: {
    codeValue: { type: "string" },
    shortName: { type: "string" },
    longName: { type: "string" },
    effectiveDate: { type: "string", format: "date" },
  },
};
export const statusReasonTypeSchema = {
  type: "object" as const,
  properties: {
    statusCode: codeTypeSchema,
    reasonCode: codeTypeSchema,
    effectiveDate: { type: "string", format: "date" },
  },
};
export const idTypeSchema = {
  type: "object" as const,
  properties: {
    idValue: { type: "string" },
    schemeCode: codeTypeSchema,
  },
};
export const idTypeV1Schema = {
  type: "object" as const,
  properties: {
    idValue: { type: "string" },
    schemeName: { type: "string" },
    schemeAgencyName: { type: "string" },
  },
};
export const linkSchema = {
  type: "object" as const,
  properties: {
    linkID: { type: "string" },
    href: { type: "string" },
    rel: { type: "string" },
    canonicalUri: { type: "string" },
    title: { type: "string" },
    targetSchema: { type: "string" },
    mediaType: { type: "string" },
    method: { type: "string" },
    encType: { type: "string" },
    schema: { type: "string" },
    payLoadArguments: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          argumentPath: { type: "string" },
          argumentValue: { type: "string" },
        },
      },
    },
  },
};
export const linksSchema = { type: "array", items: linkSchema };
export const openObjectSchema = {
  type: "object" as const,
  additionalProperties: true,
};
export const openObjectArraySchema = { type: "array", items: openObjectSchema };
export const personNameSchema = {
  type: "object" as const,
  properties: {
    givenName: { type: "string" },
    middleName: { type: "string" },
    familyName1: { type: "string" },
    familyName2: { type: "string" },
    formattedName: { type: "string" },
    nickName: { type: "string" },
    initials: { type: "string" },
    familyName1Prefix: { type: "string" },
    familyName2Prefix: { type: "string" },
    nameCode: codeTypeSchema,
    scriptCode: codeTypeSchema,
    generationAffixCode: codeTypeSchema,
    qualificationAffixCode: codeTypeSchema,
    preferredSalutations: openObjectArraySchema,
    titlePrefixCodes: openObjectArraySchema,
    titleAffixCodes: openObjectArraySchema,
  },
  additionalProperties: true,
};
export const addressSchema = {
  type: "object" as const,
  properties: {
    nameCode: codeTypeSchema,
    typeCode: codeTypeSchema,
    lineOne: { type: "string" },
    lineTwo: { type: "string" },
    lineThree: { type: "string" },
    cityName: { type: "string" },
    countrySubdivisionLevel1: openObjectSchema,
    countrySubdivisionLevel2: openObjectSchema,
    countryCode: { type: "string" },
    postalCode: { type: "string" },
  },
  additionalProperties: true,
};
export const communicationSchema = {
  type: "object" as const,
  properties: {
    landlines: openObjectArraySchema,
    mobiles: openObjectArraySchema,
    emails: openObjectArraySchema,
    socialNetworks: openObjectArraySchema,
    faxes: openObjectArraySchema,
    pagers: openObjectArraySchema,
    internetAddresses: openObjectArraySchema,
    instantMessages: openObjectArraySchema,
  },
};
export const metaSchema = {
  type: "object" as const,
  properties: {
    startSequence: { type: "integer" },
    completeIndicator: { type: "boolean" },
    number: { type: "integer" },
    totalNumber: { type: "integer" },
    resourceSetID: { type: "string" },
    links: linksSchema,
  },
  additionalProperties: true,
};
const messageSchema = {
  type: "object" as const,
  properties: {
    codeValue: { type: "string" },
    title: { type: "string" },
    messageTxt: { type: "string" },
    messageArguments: openObjectArraySchema,
    links: linksSchema,
    messageTypeCode: codeTypeSchema,
  },
};
export const confirmMessageSchema = {
  type: "object" as const,
  properties: {
    confirmMessageID: idTypeV1Schema,
    createDateTime: { type: "string", format: "date-time" },
    requestReceiptDateTime: { type: "string", format: "date-time" },
    protocolStatusCode: codeTypeSchema,
    protocolCode: codeTypeSchema,
    requestID: idTypeV1Schema,
    requestStatusCode: codeTypeSchema,
    requestMethodCode: codeTypeSchema,
    sessionID: idTypeV1Schema,
    requestETag: { type: "string" },
    requestLink: linkSchema,
    processingStatusCode: codeTypeSchema,
    processMessages: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          processMessageID: idTypeV1Schema,
          messageTypeCode: codeTypeSchema,
          sourceLocationExpression: { type: "string" },
          expressionLanguageCode: codeTypeSchema,
          links: linksSchema,
          userMessage: messageSchema,
          developerMessage: messageSchema,
        },
      },
    },
    resourceMessages: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          resourceMessageID: idTypeV1Schema,
          resourceStatusCode: codeTypeSchema,
          resourceLink: linkSchema,
          processMessages: openObjectArraySchema,
        },
      },
    },
  },
};
export const underscoreConfirmMessageSchema = {
  type: "object" as const,
  properties: {
    processingStatus: { type: "string" },
    requestStatus: { type: "string" },
    applicationID: { type: "string" },
    messageID: { type: "string" },
    messageDateTime: { type: "string", format: "date-time" },
    requestID: { type: "string" },
    messages: openObjectArraySchema,
    resourceMessages: openObjectArraySchema,
    links: linksSchema,
  },
};
const eventPartySchema = {
  type: "object" as const,
  properties: {
    applicationID: idTypeSchema,
    associateOID: { type: "string" },
    personOID: { type: "string" },
    formattedName: { type: "string" },
    deviceID: { type: "string" },
  },
  additionalProperties: true,
};
export const eventTransformBaseProperties = {
  eventReasonCode: codeTypeSchema,
  eventStatusCode: codeTypeSchema,
  effectiveDateTime: { type: "string", format: "date-time" },
  notificationIndicator: { type: "boolean" },
};
export const eventItemBaseSchema = {
  type: "object" as const,
  properties: {
    eventID: { type: "string" },
    serviceCategoryCode: codeTypeSchema,
    eventNameCode: codeTypeSchema,
    eventTitle: { type: "string" },
    eventSubTitle: { type: "string" },
    eventReasonCode: codeTypeSchema,
    eventStatusCode: codeTypeSchema,
    priorityCode: codeTypeSchema,
    recordDateTime: { type: "string", format: "date-time" },
    creationDateTime: { type: "string", format: "date-time" },
    effectiveDateTime: { type: "string", format: "date-time" },
    expirationDateTime: { type: "string", format: "date-time" },
    dueDateTime: { type: "string", format: "date-time" },
    notificationIndicator: { type: "boolean" },
    originator: eventPartySchema,
    actor: eventPartySchema,
    actAsParty: eventPartySchema,
    onBehalfOfParty: eventPartySchema,
    eTag: { type: "string" },
    links: linksSchema,
  },
};
const queryCriterionSchema = {
  type: "object" as const,
  properties: {
    itemID: { type: "string" },
    queryOptionCode: { type: "string" },
    obligationCode: { type: "string" },
    queryOptionTypeCode: { type: "string" },
    defaultNumberValue: { type: "number" },
    defaultStringValue: { type: "string" },
    resourcePathMax: { type: "integer" },
    pattern: { type: "string" },
    resourcePaths: { type: "array", items: { type: "string" } },
    excludedResourcePaths: { type: "array", items: { type: "string" } },
    queryValueCodeList: openObjectSchema,
    logicalOperators: openObjectArraySchema,
  },
};
export const queryCriteriaSchema = {
  type: "array",
  items: queryCriterionSchema,
};
export const fieldMetaSchema = {
  type: "object" as const,
  properties: {
    readOnly: { type: "boolean" },
    optional: { type: "boolean" },
    hidden: { type: "boolean" },
    sequence: { type: "integer" },
    shortLabelName: { type: "string" },
    longLabelName: { type: "string" },
    minLength: { type: "integer" },
    maxLength: { type: "integer" },
    default: { type: "string" },
    pattern: { type: "string" },
    dataType: { type: "string" },
    codeList: {
      type: "object" as const,
      properties: {
        codeListTitle: { type: "string" },
        links: linksSchema,
      },
      additionalProperties: true,
    },
  },
  additionalProperties: true,
};
export const resourceMetaResponseSchema = {
  type: "object" as const,
  properties: {
    meta: {
      type: "object" as const,
      properties: {
        queryCriteria: queryCriteriaSchema,
      },
      additionalProperties: true,
    },
  },
};
