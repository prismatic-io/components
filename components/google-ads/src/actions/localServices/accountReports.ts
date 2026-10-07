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
    const startDate = startDateInput ? new Date(startDateInput) : undefined;
    const endDate = endDateInput ? new Date(endDateInput) : undefined;
    const query = `manager_customer_id:${managerCustomerIdInput}${customerIds && customerIds !== "" ? `;${customerIds}` : ""}`;
    const { data } = await client.get("/accountReports:search", {
      params: {
        query,
        pageSize: pagination.pageSizeInput || undefined,
        pageToken: pagination.pageTokenInput || undefined,
        ...(startDate && {
          "startDate.day": startDate.getDate(),
          "startDate.month": startDate.getMonth() + 1,
          "startDate.year": startDate.getFullYear(),
        }),
        ...(endDate && {
          "endDate.day": endDate.getDate(),
          "endDate.month": endDate.getMonth() + 1,
          "endDate.year": endDate.getFullYear(),
        }),
      },
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => accountReportsExamplePayload,
  examplePayload: accountReportsExamplePayload,
});
