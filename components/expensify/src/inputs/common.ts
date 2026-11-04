import { input, util } from "@prismatic-io/spectral";
import { INPUT_SETTINGS_TYPES } from "../constants";
import { toOptionalObject, valueListInputClean } from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const type = input({
  label: "Type",
  type: "string",
  required: true,
  comments: "Specifies to the job that it has to get a policy summary list.",
  placeholder: "Enter job type",
  default: INPUT_SETTINGS_TYPES.POLICY_LIST,
  clean: util.types.toString,
});

export const employeeEmail = input({
  label: "Employee Email",
  type: "string",
  required: true,
  comments:
    "The email address of the Expensify user whose account the job runs against.",
  placeholder: "Enter employee email address",
  example: "employee@domain.com",
  clean: util.types.toString,
});

export const policyId = input({
  label: "Policy ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the policy (workspace) the job runs against. The policy must be owned or shared by the user.",
  placeholder: "Enter policy ID",
  example: "E40D9B8DF456E233",
  clean: util.types.toString,
});

export const domain = input({
  label: "Domain",
  type: "string",
  required: true,
  comments: "The name of the domain to get the cards for.",
  placeholder: "Enter domain name",
  example: "domain.com",
  clean: util.types.toString,
});

export const policyIDList = input({
  label: "Policy ID List",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "The IDs of the policies to get information for.",
  placeholder: "Enter policy ID",
  example: "E40D9B8DF456E233",
  clean: valueListInputClean,
});

export const onFinish = input({
  label: "On Finish",
  type: "code",
  language: "json",
  comments:
    "The actions Expensify runs when the job finishes, such as emailing a summary of the changes to a list of recipients.",
  placeholder: "Enter on-finish actions as JSON",
  example: JSON.stringify(
    [
      {
        actionName: "email",
        recipients: "admin1@domain.com,admin2@domain.com",
      },
    ],
    null,
    2,
  ),
  clean: toOptionalObject,
  required: false,
});
