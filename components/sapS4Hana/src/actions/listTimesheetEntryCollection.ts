import { action, input, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { connectionInput, top, skip, filter, inlinecount } from "../inputs";

const orderByOptions = ["TimeSheetDataFields", "TimeSheetDataFields desc"].map((option) => ({
  label: option,
  value: option,
}));

const selectOptions = [
  "TimeSheetDataFields",
  "PersonWorkAgreementExternalID",
  "CompanyCode",
  "TimeSheetRecord",
  "PersonWorkAgreement",
  "TimeSheetDate",
  "TimeSheetIsReleasedOnSave",
  "TimeSheetPredecessorRecord",
  "TimeSheetStatus",
  "TimeSheetIsExecutedInTestRun",
  "TimeSheetOperation",
].map((option) => ({ label: option, value: option }));

export const listTimesheetEntryCollectionOrderBy = input({
  label: "Order By",
  placeholder: "Order By",
  type: "string",
  required: false,
  comments: "Order by property",
  collection: "valuelist",
  model: orderByOptions,
  clean: util.types.toString,
});

export const listTimesheetEntryCollectionSelect = input({
  label: "Select",
  placeholder: "Select",
  type: "string",
  required: false,
  comments: "Select property to be returned",
  collection: "valuelist",
  model: selectOptions,
  clean: util.types.toString,
});

export const listTimesheetEntryCollection = action({
  display: {
    label: "List Timesheet Entry Collection",
    description:
      "Reads data for all workforce’s timesheet entries. It retrieves information about the time recording made by each workforce’s on a particular task and on a particular day.",
  },
  perform: async (
    _context,
    { connectionInput, top, skip, filter, inlinecount, orderBy, select },
  ) => {
    const headers = {
      Accept: "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.get(
        `/sap/opu/odata/sap/API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection?${
          top.length ? `$top=${top}&` : ""
        }${skip.length ? `$skip=${skip}&` : ""}${
          filter.length ? `$filter=${filter}&` : ""
        }${inlinecount.length ? `$inlinecount=${inlinecount}&` : ""}${
          orderBy.length ? `$orderby=${orderBy}&` : ""
        }${select.length ? `$select=${select}&` : ""}`,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connectionInput,
    top,
    skip,
    filter,
    inlinecount,
    orderBy: listTimesheetEntryCollectionOrderBy,
    select: listTimesheetEntryCollectionSelect,
  },
});
