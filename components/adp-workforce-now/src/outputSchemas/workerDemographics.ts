import {
  addressSchema,
  codeTypeSchema,
  communicationSchema,
  confirmMessageSchema,
  idTypeSchema,
  linksSchema,
  metaSchema,
  openObjectArraySchema,
  openObjectSchema,
  personNameSchema,
  statusReasonTypeSchema,
  statusTypeSchema,
} from "./common";
import { workAssignmentSchema } from "./workers";

const demographicPersonSchema = {
  type: "object" as const,
  properties: {
    legalName: personNameSchema,
    preferredName: personNameSchema,
    birthName: personNameSchema,
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

const workerDemographicSchema = {
  type: "object" as const,
  properties: {
    associateOID: { type: "string" },
    workerID: idTypeSchema,
    person: demographicPersonSchema,
    associateProfile: openObjectSchema,
    workerDates: openObjectSchema,
    workerStatus: statusReasonTypeSchema,
    photos: openObjectArraySchema,
    businessCommunication: communicationSchema,
    workAssignments: { type: "array", items: workAssignmentSchema },
    customFieldGroup: openObjectSchema,
    links: linksSchema,
  },
};

const workerDemographicsResponseSchema = {
  type: "object" as const,
  properties: {
    workers: { type: "array", items: workerDemographicSchema },
    meta: metaSchema,
    confirmMessage: confirmMessageSchema,
  },
};

export const getWorkerDemographicsOutputSchema = {
  type: "object" as const,
  properties: { ...workerDemographicsResponseSchema.properties },
};
