import { action, outputSchema } from "@prismatic-io/spectral";
import { createLocalServicesClient } from "../../client";
import { detailedLeadReportsExamplePayload } from "../../examplePayloads";
import { detailedLeadReportsInputs } from "../../inputs";
import { detailedLeadReportsOutputSchema } from "../../outputSchemas";
export const detailedLeadReports = action({
  display: {
    label: "Get Detailed Lead Reports",
    description:
      "Retrieves detailed lead reports providing an in-depth view of leads for Local Services accounts linked to a Manager account.",
  },
  inputs: detailedLeadReportsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: detailedLeadReportsOutputSchema,
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
    const { data } = await client.get("/detailedLeadReports:search", {
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
  }> => detailedLeadReportsExamplePayload,
  examplePayload: detailedLeadReportsExamplePayload,
});
