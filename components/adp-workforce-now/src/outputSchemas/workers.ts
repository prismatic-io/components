import {
  addressSchema,
  codeTypeSchema,
  communicationSchema,
  confirmMessageSchema,
  eventItemBaseSchema,
  eventTransformBaseProperties,
  idTypeSchema,
  linksSchema,
  metaSchema,
  openObjectArraySchema,
  openObjectSchema,
  personNameSchema,
  resourceMetaResponseSchema,
  statusReasonTypeSchema,
  statusTypeSchema,
} from "./common";
const workerDatesSchema = {
  type: "object" as const,
  properties: {
    firstHireDate: { type: "string", format: "date" },
    originalHireDate: { type: "string", format: "date" },
    rehireDate: { type: "string", format: "date" },
    adjustedServiceDate: { type: "string", format: "date" },
    creditedServiceDate: { type: "string", format: "date" },
    acquisitionDate: { type: "string", format: "date" },
    earlyRetirementDate: { type: "string", format: "date" },
    retirementDate: { type: "string", format: "date" },
    terminationDate: { type: "string", format: "date" },
    expectedTerminationDate: { type: "string", format: "date" },
    leaveOfAbsenceReturnDate: { type: "string", format: "date" },
    retirementPlanDates: openObjectSchema,
  },
};
export const workerPersonSchema = {
  type: "object" as const,
  properties: {
    governmentIDs: openObjectArraySchema,
    legalName: personNameSchema,
    preferredName: personNameSchema,
    birthName: personNameSchema,
    birthDate: { type: "string", format: "date" },
    legalAddress: addressSchema,
    otherPersonalAddresses: openObjectArraySchema,
    communication: communicationSchema,
    deceasedIndicator: { type: "boolean" },
    genderCode: codeTypeSchema,
    maritalStatusCode: statusTypeSchema,
    ethnicityCode: codeTypeSchema,
    raceCode: openObjectSchema,
    disabledIndicator: { type: "boolean" },
    tobaccoUserIndicator: { type: "boolean" },
    militaryStatusCode: statusTypeSchema,
    highestEducationLevelCode: codeTypeSchema,
    citizenshipCountryCodes: openObjectArraySchema,
    customFieldGroup: openObjectSchema,
    links: linksSchema,
  },
  additionalProperties: true,
};
export const workAssignmentSchema = {
  type: "object" as const,
  properties: {
    itemID: { type: "string" },
    primaryIndicator: { type: "boolean" },
    hireDate: { type: "string", format: "date" },
    actualStartDate: { type: "string", format: "date" },
    terminationDate: { type: "string", format: "date" },
    seniorityDate: { type: "string", format: "date" },
    assignmentStatus: statusReasonTypeSchema,
    workerTypeCode: codeTypeSchema,
    assignmentTermCode: codeTypeSchema,
    jobCode: statusTypeSchema,
    jobTitle: { type: "string" },
    positionID: { type: "string" },
    positionTitle: { type: "string" },
    managementPositionIndicator: { type: "boolean" },
    legalEntityID: { type: "string" },
    payrollGroupCode: { type: "string" },
    payrollFileNumber: { type: "string" },
    payrollRegionCode: { type: "string" },
    payCycleCode: codeTypeSchema,
    remunerationBasisCode: codeTypeSchema,
    baseRemuneration: openObjectSchema,
    standardHours: openObjectSchema,
    homeOrganizationalUnits: openObjectArraySchema,
    assignedOrganizationalUnits: openObjectArraySchema,
    homeWorkLocation: openObjectSchema,
    assignedWorkLocations: openObjectArraySchema,
    reportsTo: openObjectArraySchema,
    customFieldGroup: openObjectSchema,
    links: linksSchema,
  },
  additionalProperties: true,
};
export const workerSchema = {
  type: "object" as const,
  properties: {
    associateOID: { type: "string" },
    workerID: idTypeSchema,
    alternateIDs: openObjectArraySchema,
    person: workerPersonSchema,
    associateProfile: openObjectSchema,
    workerDates: workerDatesSchema,
    workerStatus: statusReasonTypeSchema,
    photos: openObjectArraySchema,
    businessCommunication: communicationSchema,
    workAssignments: { type: "array", items: workAssignmentSchema },
    organizationalRoles: openObjectArraySchema,
    workerMedia: openObjectArraySchema,
    customFieldGroup: openObjectSchema,
    links: linksSchema,
    _languageCode: codeTypeSchema,
  },
};
const workersResponseSchema = {
  type: "object" as const,
  properties: {
    workers: { type: "array", items: workerSchema },
    meta: metaSchema,
    confirmMessage: confirmMessageSchema,
  },
};
export const getWorkerOutputSchema = {
  type: "object" as const,
  properties: { ...workersResponseSchema.properties },
};
export const getWorkersMetadataOutputSchema = {
  type: "object" as const,
  properties: { ...resourceMetaResponseSchema.properties },
};
const teamTimeCardSchema = {
  type: "object" as const,
  properties: {
    associateOID: { type: "string" },
    workerID: idTypeSchema,
    personLegalName: personNameSchema,
    timeCards: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          timeCardID: { type: "string" },
          associateOID: { type: "string" },
          workerID: idTypeSchema,
          personLegalName: personNameSchema,
          workAssignmentID: { type: "string" },
          positionID: { type: "string" },
          positionTitle: { type: "string" },
          jobCode: codeTypeSchema,
          jobTitle: { type: "string" },
          submissionStatusCode: statusTypeSchema,
          reviewStatusCode: statusTypeSchema,
          processingStatusCode: codeTypeSchema,
          periodCode: codeTypeSchema,
          periodStatusCode: codeTypeSchema,
          timePeriod: {
            type: "object" as const,
            properties: {
              startDate: { type: "string", format: "date" },
              endDate: { type: "string", format: "date" },
            },
          },
          totalPeriodHourQuantity: { type: "number" },
          totalPeriodTimeDuration: { type: "string" },
          entryCommentIndicator: { type: "boolean" },
          exceptionsIndicator: { type: "boolean" },
          modifiedDateTime: { type: "string", format: "date-time" },
          timeCardApprovalTillDate: { type: "string", format: "date" },
          exceptionCounts: openObjectArraySchema,
          periodTotals: openObjectArraySchema,
          dailyTotals: openObjectArraySchema,
          homeLaborAllocations: openObjectArraySchema,
          dayEntries: openObjectArraySchema,
          messages: openObjectArraySchema,
          comments: openObjectArraySchema,
          actions: openObjectArraySchema,
          links: linksSchema,
        },
      },
    },
  },
};
export const getTimeCardsOutputSchema = {
  type: "object" as const,
  properties: {
    teamTimeCards: { type: "array", items: teamTimeCardSchema },
    meta: metaSchema,
    confirmMessage: confirmMessageSchema,
  },
};
const dataCollectionEntrySchema = {
  type: "object" as const,
  properties: {
    itemID: { type: "string" },
    terminalID: { type: "string" },
    terminalName: { type: "string" },
    sourceTypeCode: codeTypeSchema,
    workerDataCollectionEntries: openObjectArraySchema,
  },
};
const dataCollectionEntriesEventSchema = {
  type: "object" as const,
  properties: {
    ...eventItemBaseSchema.properties,
    data: {
      type: "object" as const,
      properties: {
        eventContext: {
          type: "object" as const,
          properties: { contextExpressionID: { type: "string" } },
        },
        transform: {
          type: "object" as const,
          properties: {
            ...eventTransformBaseProperties,
            dataCollectionEntries: {
              type: "array",
              items: dataCollectionEntrySchema,
            },
          },
        },
        output: {
          type: "object" as const,
          properties: {
            dataCollectionEntries: {
              type: "array",
              items: dataCollectionEntrySchema,
            },
          },
        },
        control: {
          type: "object" as const,
          properties: { clockPolicy: openObjectSchema },
        },
      },
    },
  },
};
const dataCollectionEntriesResponseSchema = {
  type: "object" as const,
  properties: {
    events: { type: "array", items: dataCollectionEntriesEventSchema },
    meta: metaSchema,
    confirmMessage: confirmMessageSchema,
  },
};
export const createScanPunchOutputSchema = {
  type: "object" as const,
  properties: { ...dataCollectionEntriesResponseSchema.properties },
};
export const getClockingTransactionOutputSchema = {
  type: "object" as const,
  properties: { ...dataCollectionEntriesResponseSchema.properties },
};
const timeEntrySchema = {
  type: "object" as const,
  properties: {
    entryID: { type: "string" },
    entryGroupID: { type: "string" },
    entryCode: codeTypeSchema,
    entryTypeCode: codeTypeSchema,
    entryDate: { type: "string", format: "date" },
    entryOverrideCodes: openObjectArraySchema,
    startPeriod: openObjectSchema,
    endPeriod: openObjectSchema,
    dayPeriodCode: codeTypeSchema,
    hourQuantity: { type: "number" },
    timeDuration: { type: "string" },
    unitQuantity: {
      type: "object" as const,
      properties: {
        quantityValue: { type: "number" },
        unitCode: codeTypeSchema,
      },
      additionalProperties: true,
    },
    amount: {
      type: "object" as const,
      properties: {
        amountValue: { type: "number" },
        currencyCode: { type: "string" },
      },
      additionalProperties: true,
    },
    laborAllocations: openObjectArraySchema,
    breaks: openObjectArraySchema,
    comments: openObjectArraySchema,
    entrySourceCode: codeTypeSchema,
    _changeCode: { type: "string" },
    entryTags: openObjectArraySchema,
    reviewRequest: openObjectSchema,
  },
};
const timeEntriesModifyEventSchema = {
  type: "object" as const,
  properties: {
    ...eventItemBaseSchema.properties,
    data: {
      type: "object" as const,
      properties: {
        eventContext: {
          type: "object" as const,
          properties: {
            contextExpressionID: { type: "string" },
            associateOID: { type: "string" },
            workAssignmentID: { type: "string" },
          },
        },
        transform: {
          type: "object" as const,
          properties: {
            ...eventTransformBaseProperties,
            timeEntries: { type: "array", items: timeEntrySchema },
          },
        },
        output: {
          type: "object" as const,
          properties: {
            timeEntries: { type: "array", items: timeEntrySchema },
          },
        },
        control: {
          type: "object" as const,
          properties: {
            workerTimeZoneCode: { type: "string" },
            homeLaborAllocations: openObjectArraySchema,
          },
        },
      },
    },
  },
};
export const modifyTimeEntriesOutputSchema = {
  type: "object" as const,
  properties: {
    events: { type: "array", items: timeEntriesModifyEventSchema },
    meta: metaSchema,
    confirmMessage: confirmMessageSchema,
  },
};
