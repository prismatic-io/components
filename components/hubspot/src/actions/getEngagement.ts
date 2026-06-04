import { URLSearchParams } from "node:url";
import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { getEngagementPayload } from "../examplePayloads";
import {
  archived,
  associations,
  connectionInput,
  engagementId,
  engagementObject,
  idProperty,
  propertiesToReturn,
  timeout,
} from "../inputs";
import { addUrlSearchParamsFromStringArray } from "../util";

export const getEngagement = action({
  display: {
    label: "Get Engagement",
    description:
      "Get a communication, email, call, meeting, note, postal mail or task engagement object from HubSpot CRM.",
  },
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
      addUrlSearchParamsFromStringArray(urlSearchParams, propertiesToReturn, "properties");

    if (propertiesWithHistoryToReturn)
      addUrlSearchParamsFromStringArray(
        urlSearchParams,
        propertiesWithHistoryToReturn,
        "propertiesWithHistory",
      );

    if (associations)
      addUrlSearchParamsFromStringArray(urlSearchParams, associations, "associations");

    if (idProperty) urlSearchParams.append("idProperty", idProperty);

    urlSearchParams.append("archived", archived.toString());
    if (debugRequest) context.logger.debug(`Params: ${urlSearchParams.toString()}`);

    const { data } = await client.get(`/crm/v3/objects/${engagementObject}/${engagementId}`, {
      params: urlSearchParams,
    });

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    engagementObject,
    engagementId,
    propertiesToReturn,
    propertiesWithHistoryToReturn: {
      ...propertiesToReturn,
      label: "Property With History To Return",
      comments:
        "A property to be returned along with it's history of previous values. If the specified property is not present on the requested object, it will be ignored.",
    },
    associations,
    archived,
    idProperty,
    timeout,
  },
  examplePayload: getEngagementPayload,
});
