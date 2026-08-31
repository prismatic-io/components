import { action, outputSchema } from "@prismatic-io/spectral";
import { createLocalServicesClient } from "../../client";
import { accountReportsExamplePayload } from "../../examplePayloads";
import { accountReportsInputs } from "../../inputs";
import { accountReportsOutputSchema } from "../../outputSchemas";
export const accountReports = action({
  display: {
    label: "Get Account Reports",
    description:
      "Retrieves account reports showing performance and metrics for Local Services accounts linked to a Manager account.",
  },
  inputs: accountReportsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: accountReportsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerIds,
      managerCustomerIdInput,
      pagination,
      endDateInput,
      startDateInput,
    },
  ) => {
    const client = createLocalServicesClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
    });
    const startDate = new Date(startDateInput ?? "");
    const endDate = new Date(endDateInput ?? "");
    const startDateDay = startDate.getDate();
    const startDateMonth = startDate.getMonth() + 1;
    const startDateYear = startDate.getFullYear();
    const endDateDay = endDate.getDate();
    const endDateMonth = endDate.getMonth() + 1;
    const endDateYear = endDate.getFullYear();
    const query = `manager_customer_id:${managerCustomerIdInput}${customerIds && customerIds !== "" ? `;${customerIds}` : ""}`;
    const { data } = await client.get("/accountReports:search", {
      params: {
        query,
        pageSize: pagination.pageSizeInput || undefined,
        pageToken: pagination.pageTokenInput || undefined,
        "startDate.day": startDateDay,
        "startDate.month": startDateMonth,
        "startDate.year": startDateYear,
        "endDate.day": endDateDay,
        "endDate.month": endDateMonth,
        "endDate.year": endDateYear,
      },
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => accountReportsExamplePayload,
  examplePayload: accountReportsExamplePayload,
});
