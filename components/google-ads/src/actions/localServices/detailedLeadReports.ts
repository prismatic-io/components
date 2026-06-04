import { action } from "@prismatic-io/spectral";
import { createLocalServicesClient } from "../../client";
import { detailedLeadReportsExamplePayload } from "../../examplePayloads";
import { detailedLeadReportsInputs } from "../../inputs";

export const detailedLeadReports = action({
  display: {
    label: "Get Detailed Lead Reports",
    description:
      "Retrieve detailed lead reports providing an in-depth view of leads for Local Services accounts linked to a Manager account.",
  },
  inputs: detailedLeadReportsInputs,
  perform: async (
    context,
    {
      connection,
      customerIds,
      managerCustomerIdInput,
      pageSizeInput,
      pageTokenInput,
      endDateInput,
      startDateInput,
    },
  ) => {
    const client = createLocalServicesClient(connection, context.debug.enabled);
    const startDate = new Date(startDateInput ?? "");
    const endDate = new Date(endDateInput ?? "");
    const startDateDay = startDate.getDate();
    const startDateMonth = startDate.getMonth() + 1;
    const startDateYear = startDate.getFullYear();
    const endDateDay = endDate.getDate();
    const endDateMonth = endDate.getMonth() + 1;
    const endDateYear = endDate.getFullYear();
    const query = `manager_customer_id:${managerCustomerIdInput}${
      customerIds && customerIds !== "" ? `;${customerIds}` : ""
    }`;
    const { data } = await client.get("/detailedLeadReports:search", {
      params: {
        query,
        pageSize: pageSizeInput || undefined,
        pageToken: pageTokenInput || undefined,
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
  examplePayload: detailedLeadReportsExamplePayload,
});
