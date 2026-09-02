import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { exportCRMDataExamplePayload } from "../../examplePayloads";
import { exportCRMDataInputs } from "../../inputs";
export const exportCRMData = action({
  display: {
    label: "Export CRM Data",
    description:
      "Begins exporting CRM data for the portal as specified in the request body.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      timeout,
      hubspotConnection,
      schemaType,
      format,
      exportName,
      objectProperties,
      associatedObjectType,
      objectType,
      language,
      listId,
      publicCrmSearchRequest,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: { "Content-Type": "application/json" },
    });
    if (schemaType === "PublicExportListRequest" && !listId) {
      throw new Error(
        "List Id is required for Schema Type PublicExportListRequest",
      );
    }
    const payload = {
      exportType: schemaType,
      format,
      exportName,
      objectProperties,
      ...(associatedObjectType && { associatedObjectType }),
      objectType,
      language,
      ...(publicCrmSearchRequest && { publicCrmSearchRequest }),
      ...(listId && { listId }),
    };
    const data = (await client.post("/crm/v3/exports/export/async", payload))
      .data;
    return {
      data,
    };
  },
  inputs: exportCRMDataInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: exportCRMDataExamplePayload.data,
  }),
  examplePayload: exportCRMDataExamplePayload,
});
