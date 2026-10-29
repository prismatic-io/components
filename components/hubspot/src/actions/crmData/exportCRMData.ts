import { action, outputSchema } from "@prismatic-io/spectral";
import { exportCRMDataOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { exportCRMDataExamplePayload } from "../../examplePayloads";
import { exportCRMDataInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";

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

    const data = (
      await client.post(hubspotPaths.exports("/export/async"), payload)
    ).data;

    return {
      data,
    };
  },
  inputs: exportCRMDataInputs,
  examplePerform: async () => ({
    data: exportCRMDataExamplePayload.data,
  }),
  examplePayload: exportCRMDataExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: exportCRMDataOutputSchema,
  }),
});
