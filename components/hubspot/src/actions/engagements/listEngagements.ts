import { URLSearchParams } from "node:url";
import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectArraySchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listEngagementsExamplePayload } from "../../examplePayloads";
import { listEngagementsInputs } from "../../inputs";
import {
  addUrlSearchParamsFromStringArray,
  getAllPaginatedData,
} from "../../util";
export const listEngagements = action({
  display: {
    label: "List Engagements",
    description:
      "List engagement objects from HubSpot CRM, including communications, emails, calls, meetings, notes, postal mail, and tasks.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { timeout, hubspotConnection, engagementObject, propertiesToReturn },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const engagementsList = await getAllPaginatedData(
      client,
      `/crm/v3/objects/${engagementObject}`,
      true,
      true,
      {
        params: propertiesToReturn
          ? addUrlSearchParamsFromStringArray(
              new URLSearchParams(),
              propertiesToReturn,
              "properties",
            )
          : undefined,
      },
    );
    return {
      data: engagementsList,
    };
  },
  inputs: listEngagementsInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listEngagementsExamplePayload.data,
  }),
  examplePayload: listEngagementsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: crmObjectArraySchema,
  }),
});
