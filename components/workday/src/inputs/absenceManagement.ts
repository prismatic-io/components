import { input, util } from "@prismatic-io/spectral";
import { SERVICES } from "../constants";
import { cleanArrayCodeInput, cleanStringInput } from "../util";
import {
  connection,
  paginationQueryStringInputs,
  params,
  workerId,
} from "./shared";

const actionId = input({
  label: "Action ID",
  comments: "Identifies the action to take on the business process.",
  type: "string",
  placeholder: "Enter action ID",
  example: "",
  required: false,
  clean: cleanStringInput,
});

const overallBusinessProcessId = input({
  label: "Overall Business Process ID",
  comments: "Identifies the parent business process instance.",
  type: "string",
  placeholder: "Enter overall business process ID",
  example: "",
  required: false,
  clean: cleanStringInput,
});

const balanceId = input({
  label: "Balance ID",
  comments: "Identifies the time-off balance to retrieve.",
  type: "string",
  placeholder: "Enter balance ID",
  example: "",
  required: true,
  clean: util.types.toString,
});

const days = input({
  label: "Days",
  comments: `The days for which the time off request is being made. An array of objects. See [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.absenceManagement.slice(1)}/post-/workers/-ID-/requestTimeOff) for more information.`,
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        date: "2024-06-08T07:00:00.000Z",
        start: "2024-06-08T07:00:00.000Z",
        position: {
          id: "string",
          descriptor: "Lorem ipsum dolor sit ame",
        },
        end: "2024-06-08T07:00:00.000Z",
        reason: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        },
      },
    ],
    null,
    2,
  ),
  required: true,
  clean: (value: unknown) => cleanArrayCodeInput(value, "Days"),
});

const timeOffComment = input({
  label: "Time Off Comment",
  comments: "Free-text comment attached to the time-off entry.",
  type: "string",
  example: "",
  placeholder: "Enter time off comment",
  required: false,
  clean: cleanStringInput,
});

const transactionStatusId = input({
  label: "Transaction Status ID",
  comments: "Identifies the current status of the transaction.",
  type: "string",
  example: "",
  placeholder: "Enter transaction status ID",
  required: false,
  clean: cleanStringInput,
});

const timeOffAttachments = input({
  label: "Time Off Attachments",
  comments: "The attachments for the time off request.",
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        comments:
          "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
        contentType: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        },
        fileLength: "208232717",
        fileName:
          "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
        uploadedBy: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        },
        category: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        },
        id: "string",
      },
    ],
    null,
    2,
  ),
  required: false,
  clean: (value: unknown) => cleanArrayCodeInput(value, "Time Off Attachments"),
});

const timeOffForId = input({
  label: "Time Off For ID",
  comments:
    "Target instance the time-off entry applies to; may be another business process ID when used as a sub-process.",
  type: "string",
  example: "",
  placeholder: "Enter time off for ID",
  required: false,
  clean: cleanStringInput,
});

export const getTimeOffBalanceByIdInputs = { connection, balanceId };

export const getTimeOffDetailsInputs = {
  connection,
  workerId,
  ...paginationQueryStringInputs,
  params: {
    ...params,
    comments: `${params.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.absenceManagement.slice(1)}/get-/workers/-ID-/timeOffDetails).`,
  },
};

export const postTimeOffRequestInputs = {
  connection,
  workerId,
  actionId,
  overallBusinessProcessId,
  days,
  timeOffComment,
  transactionStatusId,
  timeOffAttachments,
  timeOffForId,
};
