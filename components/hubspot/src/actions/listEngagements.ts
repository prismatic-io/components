import { URLSearchParams } from "node:url";
import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { listEngagementsPayload } from "../examplePayloads";
import { connectionInput, engagementObject, propertiesToReturn, timeout } from "../inputs";
import { addUrlSearchParamsFromStringArray, getAllPaginatedData } from "../util";

export const listEngagements = action({
  display: {
    label: "List Engagements",
    description:
      "List engagement objects from HubSpot CRM, including communications, emails, calls, meetings, notes, postal mail, and tasks.",
  },
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
  inputs: {
    hubspotConnection: connectionInput,
    engagementObject,
    propertiesToReturn,
    timeout,
  },
  examplePayload: listEngagementsPayload,
});
