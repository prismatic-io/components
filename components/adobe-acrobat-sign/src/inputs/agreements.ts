import { input, util } from "@prismatic-io/spectral";
import { cleanJsonArrayInput } from "../util";
import {
  MAX_AGREEMENTS_PAGE_SIZE,
  PARTICIPANT_SET_INFO_ROLES,
} from "../constants";
import type { AgreementState, SignatureType } from "../types";
import {
  connection,
  cursor,
  externalId,
  fetchAll,
  filterQuery,
  groupId,
  pageSize,
} from "./common";

const showHiddenAgreements = input({
  label: "Show Hidden Agreements",
  type: "boolean",
  comments:
    "When true, fetches all the hidden agreements along with the visible agreements. Default value is false.",
  clean: util.types.toBool,
});

const agreementId = input({
  label: "Agreement ID",
  type: "string",
  required: true,
  placeholder: "Enter Agreement ID",
  example: "3AAABLblqZhBf0aJb0XZqz5vXy8g3V9R3qQx6",
  clean: util.types.toString,
  dataSource: "selectAgreements",
  comments:
    "The agreement identifier, as returned by the agreement creation API or retrieved from the API to fetch agreements.",
});

const expirationDate = input({
  label: "Expiration Date",
  type: "string",
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-12-31T23:59:59+00:00",
  comments:
    "A range filter against the agreement expiration date. Format would be date-time with an offset from UTC/Greenwich in the ISO-8601 format, such as 2007-12-03T10:15:30+01:00. Range terms can be defined as less-than/greater-than or min/max.",
  clean: util.types.toString,
  required: false,
});

const transientDocumentId = input({
  label: "Transient Document ID",
  type: "string",
  required: false,
  placeholder: "Enter Transient Document ID",
  example: "3AAABLblqZhBf0aJb0XZqz5vXy8g3V9R3qQx6",
  clean: util.types.toString,
  comments: "ID for a transient document that will be added to the agreement.",
});

const agreementName = input({
  label: "Agreement Name",
  type: "string",
  required: true,
  placeholder: "Enter agreement name",
  example: "Service Agreement 2024",
  clean: util.types.toString,
  comments: "Name of the Agreement that will be used to identify it.",
});

const participantsSetInfoRole = input({
  label: "Participant Set Info Role",
  type: "string",
  required: true,
  placeholder: "Select role",
  model: PARTICIPANT_SET_INFO_ROLES.map((role) => {
    return {
      value: role,
      label: role,
    };
  }),
  clean: util.types.toString,
  comments:
    "Role assumed by all participants in this set (signer, approver, etc.).",
});

const signatureType = input({
  label: "Signature Type",
  type: "string",
  required: false,
  placeholder: "Select signature type",
  model: ["ESIGN", "WRITTEN"].map((type) => {
    return {
      value: type,
      label: type,
    };
  }),
  clean: (value: unknown) => {
    return util.types.toString(value) as SignatureType;
  },
  comments:
    "The type of signature you would like to request - written or e-signature.",
});

const agreementState = input({
  label: "Agreement State",
  type: "string",
  required: false,
  placeholder: "Select agreement state",
  model: ["IN_PROCESS", "CANCELLED", "COMPLETED", "EXPIRED"].map((state) => {
    return {
      value: state,
      label: state,
    };
  }),
  clean: (value: unknown) => {
    return util.types.toString(value) as AgreementState;
  },
  comments: "State of the agreement.",
});

const participantMemberInfoEmail = input({
  label: "Participant Member Info Email",
  type: "string",
  required: true,
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  clean: util.types.toString,
  comments: "Email address of the participant.",
});

const additionalAgreementParticipants = input({
  label: "Additional Agreement Participants",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional participant sets to include in the agreement. " +
    "Provide a JSON array of participantSetsInfo objects to support multiple signers or other roles.",
  placeholder: "Enter additional participants as a JSON array",
  example: JSON.stringify(
    [
      {
        memberInfos: [{ email: "signer2@example.com" }],
        order: 2,
        role: "SIGNER",
      },
    ],
    null,
    2,
  ),
  clean: cleanJsonArrayInput,
});

export const createAgreementInputs = {
  connection,
  transientDocumentId: {
    ...transientDocumentId,
    required: true,
  },
  agreementName,
  participantsSetInfoRole,
  participantMemberInfoEmail,
  signatureType,
  agreementState,
  additionalAgreementParticipants,
};

export const getAgreementInputs = {
  connection,
  agreementId,
};

export const listAgreementsInputs = {
  connection,
  fetchAll,
  cursor,
  pageSize: {
    ...pageSize,
    example: util.types.toString(MAX_AGREEMENTS_PAGE_SIZE),
    default: util.types.toString(MAX_AGREEMENTS_PAGE_SIZE),
  },
  externalId,
  groupId,
  showHiddenAgreements,
};

export const updateAgreementInputs = {
  connection,
  transientDocumentId,
  participantsSetInfoRole,
  agreementName: { ...agreementName, required: false },
  participantMemberInfoEmail: {
    ...participantMemberInfoEmail,
    required: false,
  },
  signatureType,
  agreementState,
  expirationDate,
  agreementId: {
    ...agreementId,
    required: true,
  },
};

export const deleteAgreementDocumentsInputs = {
  connection,
  agreementId,
};

export const downloadAgreementFileInputs = {
  connection,
  agreementId: {
    ...agreementId,
    required: true,
  },
};

export const selectAgreementsInputs = {
  connection,
  filterQuery,
  showHiddenAgreements: {
    ...showHiddenAgreements,
    default: "true",
    comments:
      "Fetch all the hidden agreements along with the visible agreements. Default value is true.",
  },
  externalId,
  groupId: { ...groupId, dataSource: undefined },
};
