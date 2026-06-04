import { input } from "@prismatic-io/spectral";
import { recordsInputClean } from "../util";
import { connectionInput, version } from "./common";
import { allOrNone, collateSubrequests } from "./bulkJobs";

const compositeRequest = input({
  label: "Composite Request",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The JSON array of subrequests to execute in a single Composite API call. Each entry must include method, url, referenceId, and optionally body.",
  example: JSON.stringify(
    [
      {
        method: "POST",
        url: "/services/data/v59.0/sobjects/Account",
        referenceId: "refAccount",
        body: { Name: "Sample Account" },
      },
      {
        method: "GET",
        url: "/services/data/v59.0/sobjects/Account/@{refAccount.id}",
        referenceId: "NewAccountFields",
      },
      {
        method: "PATCH",
        url: "/services/data/v59.0/sobjects/Account/ExternalAcctId__c/ID12345",
        referenceID: "NewAccount",
        body: { Name: "Acme" },
      },
      {
        method: "POST",
        url: "/services/data/v59.0/sobjects/Account",
        referenceId: "refAccount",
        body: { Name: "Sample Account" },
      },
      {
        method: "POST",
        url: "/services/data/v59.0/sobjects/Contact",
        referenceId: "refContact",
        body: {
          LastName: "Sample Contact",
          AccountId: "@{refAccount.id}",
        },
      },
    ],
    null,
    2,
  ),
  clean: recordsInputClean,
});

export const compositeRequestInputs = {
  connection: connectionInput,
  version,
  allOrNone,
  collateSubrequests,
  compositeRequest,
};

export const listCompositeResourcesInputs = {
  connection: connectionInput,
  version,
};
