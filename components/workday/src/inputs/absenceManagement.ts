import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { SERVICES, WORKDAY_API_DOCS_URL } from "../constants";
import { cleanArrayCodeInput, cleanStringInput } from "../util";
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
const days = input({
  label: "Days",
  comments: `The days for which the time off request is being made. An array of objects. See [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.absenceManagement.slice(1)}/post-/workers/-ID-/requestTimeOff) for more information.`,
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        date: "2024-06-08T07:00:00.000Z",
        start: "2024-06-08T07:00:00.000Z",
        position: {
          id: "9f3f3b7329154567b202c469209c4773",
          descriptor: "Senior Software Engineer",
        },
        end: "2024-06-08T07:00:00.000Z",
        reason: {
          id: "7715acc1ec5c4cab881cf161eedecea7",
        },
      },
    ],
    null,
    2,
  ),
  placeholder: "Enter time off days as a JSON array",
  required: true,
  clean: (value: unknown) => cleanArrayCodeInput(value, "Days"),
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
        comments: "Doctor's note for medical leave.",
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
export const getTimeOffBalanceByIdInputs = { connection, balanceId };
export const getTimeOffDetailsInputs = {
  connection,
  workerId,
  ...paginationQueryStringInputs,
  extraParameters: {
    ...extraParameters,
    comments: `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.absenceManagement.slice(1)}/get-/workers/-ID-/timeOffDetails).`,
  },
};
export const postTimeOffRequestInputs = {
  connection,
  workerId,
  days,
  businessProcessParameters,
};
