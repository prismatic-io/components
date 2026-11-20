import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { SERVICE_VERSIONS, WORKDAY_API_DOCS_URL } from "../constants";
import {
  cleanArrayCodeInput,
  cleanDateOnlyInput,
  cleanNumberInput,
  cleanStringInput,
} from "../util";
import {
  connection,
  paginationQueryStringInputs,
  extraParameters,
  workerId,
} from "./common";

const actionId = input({
  label: "Action ID",
  comments: "Identifies the action to take on the business process.",
  type: "string",
  placeholder: "Enter action ID",
  example: "d9e41a8c440b4c5f9b1c6d1f1e2a3b4c",
  required: false,
  clean: cleanStringInput,
});

const overallBusinessProcessId = input({
  label: "Overall Business Process ID",
  comments: "Identifies the parent business process instance.",
  type: "string",
  placeholder: "Enter overall business process ID",
  example: "44a457fd7f6e428a9395dd4989a03fe5",
  required: false,
  clean: cleanStringInput,
});

const balanceId = input({
  label: "Balance ID",
  comments: "Identifies the time-off balance to retrieve.",
  type: "string",
  placeholder: "Enter balance ID",
  example: "f27c2f31526e49688d2631e98d63e56c",
  required: true,
  clean: util.types.toString,
});

const days = structuredObjectInput({
  label: "Days",
  comments: `The days to request off; each row is one day. Each row needs a Date and a Time Off Type ID. See [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICE_VERSIONS.absenceManagement}/post-/workers/-ID-/requestTimeOff) for more information.`,
  collection: "valuelist",
  required: true,
  inputs: {
    date: input({
      label: "Date",
      comments: "The date of the time off entry, in ISO 8601 format.",
      type: "string",
      required: false,
      example: "2024-06-08",
      placeholder: "Enter date (YYYY-MM-DD)",
      clean: cleanStringInput,
    }),
    start: input({
      label: "Start",
      comments:
        "The start time of the time off entry, as an ISO 8601 date-time.",
      type: "string",
      required: false,
      example: "2024-06-08T09:00:00.000Z",
      placeholder: "Enter start date-time",
      clean: cleanStringInput,
    }),
    end: input({
      label: "End",
      comments: "The end time of the time off entry, as an ISO 8601 date-time.",
      type: "string",
      required: false,
      example: "2024-06-08T17:00:00.000Z",
      placeholder: "Enter end date-time",
      clean: cleanStringInput,
    }),
    dailyQuantity: input({
      label: "Daily Quantity",
      comments:
        "The number of days or hours for this time off entry, as a number.",
      type: "string",
      required: false,
      example: "8",
      placeholder: "Enter daily quantity",
      clean: cleanNumberInput,
    }),
    comment: input({
      label: "Comment",
      comments: "The comment on the time off entry.",
      type: "string",
      required: false,
      example: "Family vacation",
      placeholder: "Enter comment",
      clean: cleanStringInput,
    }),
    timeOffTypeId: input({
      label: "Time Off Type ID",
      comments: "Identifies the time off type, such as vacation or sick time.",
      type: "string",
      required: false,
      example: "b35340ce4321102030f8b5a848bc0000",
      placeholder: "Enter time off type ID",
      clean: cleanStringInput,
    }),
    reasonId: input({
      label: "Reason ID",
      comments: "Identifies the reason for the time off entry.",
      type: "string",
      required: false,
      example: "7715acc1ec5c4cab881cf161eedecea7",
      placeholder: "Enter reason ID",
      clean: cleanStringInput,
    }),
    positionId: input({
      label: "Position ID",
      comments: "Identifies the worker position the time off entry applies to.",
      type: "string",
      required: false,
      example: "9f3f3b7329154567b202c469209c4773",
      placeholder: "Enter position ID",
      clean: cleanStringInput,
    }),
  },
});

const timeOffComment = input({
  label: "Time Off Comment",
  comments: "Free-text comment attached to the time-off entry.",
  type: "string",
  example: "Family vacation",
  placeholder: "Enter time off comment",
  required: false,
  clean: cleanStringInput,
});

const transactionStatusId = input({
  label: "Transaction Status ID",
  comments: "Identifies the current status of the transaction.",
  type: "string",
  example: "b874d19d83d0403ba46e9ba5d66611f0",
  placeholder: "Enter transaction status ID",
  required: false,
  clean: cleanStringInput,
});

const timeOffAttachments = input({
  label: "Time Off Attachments",
  comments:
    "Supporting files for the time off request, such as a doctor's note. A JSON array of attachment objects with file name, content type, and category.",
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        description: "Doctor's note for medical leave.",
        contentType: {
          id: "32168fad8bd144a78fc6289eddfca75e",
        },
        fileLength: "208232",
        fileName: "doctors-note.pdf",
        uploadedBy: {
          id: "d419dbe200c7408cbddde973087dfe92",
        },
        category: {
          id: "5096347c4f524efba051b48ffa880a70",
        },
        id: "d10be2bf1b8e498995bb1e501a499d98",
      },
    ],
    null,
    2,
  ),
  placeholder: "Enter attachments as a JSON array",
  required: false,
  clean: (value: unknown) => cleanArrayCodeInput(value, "Time Off Attachments"),
});

const timeOffForId = input({
  label: "Time Off For ID",
  comments:
    "Target instance the time-off entry applies to; may be another business process ID when used as a sub-process.",
  type: "string",
  example: "aa7e2f5643da4566a1dd8cb9483d22c5",
  placeholder: "Enter time off for ID",
  required: false,
  clean: cleanStringInput,
});

const businessProcessParameters = structuredObjectInput({
  label: "Business Process Parameters",
  required: false,
  comments:
    "Action, parent process, transaction status, comment, attachments, and target instance for the business process.",
  inputs: {
    actionId,
    overallBusinessProcessId,
    timeOffComment,
    transactionStatusId,
    timeOffAttachments,
    timeOffForId,
  },
});

const balanceCategoryId = input({
  label: "Category ID",
  comments:
    "Workday ID of a time off type, leave of absence type, or absence table that limits the balances returned. Returns every category when empty.",
  type: "string",
  placeholder: "Enter category ID",
  example: "7bd6531c90c100016d4b06f2b8a07ce",
  required: false,
  clean: cleanStringInput,
});

const balanceEffectiveDate = input({
  label: "Effective Date",
  comments:
    "Returns balances as of this date. Accepts an ISO 8601 date (YYYY-MM-DD) or date-time; only the date is sent. Defaults to today in Workday.",
  type: "string",
  placeholder: "Enter effective date (YYYY-MM-DD)",
  example: "2026-11-17",
  required: false,
  clean: cleanDateOnlyInput("Effective Date"),
});

export const listTimeOffBalancesInputs = {
  connection,
  workerId: {
    ...workerId,
    comments: "Identifies the worker whose time off balances to list.",
  },
  ...paginationQueryStringInputs,
  balanceCategoryId,
  balanceEffectiveDate,
};

export const getTimeOffBalanceByIdInputs = { connection, balanceId };

export const getTimeOffDetailsInputs = {
  connection,
  workerId,
  ...paginationQueryStringInputs,
  extraParameters: {
    ...extraParameters,
    comments: `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICE_VERSIONS.absenceManagement}/get-/workers/-ID-/timeOffDetails).`,
  },
};

export const postTimeOffRequestInputs = {
  connection,
  workerId,
  days,
  businessProcessParameters,
};
