import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { requestBodyCode, connectionInput } from "../inputs";

export const updateTimesheetEntryCollection = action({
  display: {
    label: "Update Timesheet Entry Collection",
    description:
      "Creates, updates, or deletes workforce timesheet entry based on the data provided in payload.",
  },
  perform: async (_context, { requestBodyCode, connectionInput }) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.post(
        "/sap/opu/odata/sap/API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection",
        requestBodyCode,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    requestBodyCode: {
      ...requestBodyCode,
      required: true,
      default: `{
        "TimeSheetDataFields": {
        "ControllingArea": "string",
        "SenderCostCenter": "string",
        "ReceiverCostCenter": "string",
        "InternalOrder": "string",
        "ActivityType": "string",
        "WBSElement": "string",
        "WorkItem": "string",
        "BillingControlCategory": "string",
        "PurchaseOrder": "string",
        "PurchaseOrderItem": "string",
        "TimeSheetTaskType": "string",
        "TimeSheetTaskLevel": "string",
        "TimeSheetTaskComponent": "string",
        "TimeSheetNote": "string",
        "RecordedHours": "0",
        "RecordedQuantity": "0",
        "HoursUnitOfMeasure": "string",
        "RejectionReason": "string",
        "TimeSheetWrkLocCode": "string",
        "TimeSheetOvertimeCategory": "string",
        "SenderPubSecFund": "string",
        "SendingPubSecFunctionalArea": "string",
        "SenderPubSecGrant": "string",
        "SenderPubSecBudgetPeriod": "string",
        "ReceiverPubSecFund": "string",
        "ReceiverPubSecFuncnlArea": "string",
        "ReceiverPubSecGrant": "string",
        "ReceiverPubSecBudgetPeriod": "string"
        },
        "PersonWorkAgreementExternalID": "string",
        "CompanyCode": "string",
        "TimeSheetRecord": "string",
        "PersonWorkAgreement": "string",
        "TimeSheetDate": "/Date(1492098664000)/",
        "TimeSheetIsReleasedOnSave": true,
        "TimeSheetPredecessorRecord": "string",
        "TimeSheetStatus": "string",
        "TimeSheetIsExecutedInTestRun": true,
        "TimeSheetOperation": "string"
        }`,
    },
    connectionInput,
  },
});
