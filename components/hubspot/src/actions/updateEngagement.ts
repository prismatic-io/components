import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { updateEngagementPayload } from "../examplePayloads";
import {
  connectionInput,
  engagementId,
  engagementObject,
  idProperty,
  properties,
  timeout,
} from "../inputs";

export const updateEngagement = action({
  display: {
    label: "Update Engagement",
    description:
      "Update a communication, email, call, meeting, note, postal mail or task engagement in HubSpot CRM.",
  },
  perform: async (
    context,
    { timeout, hubspotConnection, engagementObject, properties, engagementId, idProperty },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: { "Content-Type": "application/json" },
    });

    const payload = { properties };

    const { data } = await client.patch(
      `/crm/v3/objects/${engagementObject}/${engagementId}`,
      payload,
      { params: { idProperty: idProperty || undefined } },
    );

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    engagementObject,
    engagementId,
    properties: {
      ...properties,
      comments:
        "A properties object to update, attributes depend on the engagement type. For possible properties for each engagement type refer to [HubSpot Engagements API](https://developers.hubspot.com/docs/api/crm/tasks).",
      example: JSON.stringify({
        property_date: "1572480000000",
        property_radio: "option_1",
        property_number: "17",
        property_string: "value",
        property_checkbox: "false",
        property_dropdown: "choice_b",
        property_multiple_checkboxes: "chocolate;strawberry",
      }),
    },
    idProperty,
    timeout,
  },
  examplePayload: updateEngagementPayload,
});
