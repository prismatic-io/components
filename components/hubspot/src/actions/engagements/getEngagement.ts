import { URLSearchParams } from "node:url";
import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { getEngagementExamplePayload } from "../../examplePayloads";
import { getEngagementInputs } from "../../inputs";
import { addUrlSearchParamsFromStringArray } from "../../util";
export const getEngagement = action({
  display: {
    label: "Get Engagement",
    description:
      "Get a communication, email, call, meeting, note, postal mail or task engagement object from HubSpot CRM.",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      timeout,
      hubspotConnection,
      engagementObject,
      propertiesToReturn,
      engagementId,
      propertiesWithHistoryToReturn,
      associations,
      archived,
      idProperty,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const urlSearchParams = new URLSearchParams();
    if (propertiesToReturn)
      addUrlSearchParamsFromStringArray(
        urlSearchParams,
        propertiesToReturn,
        "properties",
      );
    if (propertiesWithHistoryToReturn)
      addUrlSearchParamsFromStringArray(
        urlSearchParams,
        propertiesWithHistoryToReturn,
        "propertiesWithHistory",
      );
    if (associations)
      addUrlSearchParamsFromStringArray(
        urlSearchParams,
        associations,
        "associations",
      );
    if (idProperty) urlSearchParams.append("idProperty", idProperty);
    urlSearchParams.append("archived", archived.toString());
    if (debugRequest)
      context.logger.debug(`Params: ${urlSearchParams.toString()}`);
    const { data } = await client.get(
      `/crm/v3/objects/${engagementObject}/${engagementId}`,
      {
        params: urlSearchParams,
      },
    );
    return {
      data,
    };
  },
  inputs: getEngagementInputs,
  examplePayload: getEngagementExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
