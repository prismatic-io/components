import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { createConversionsResponse } from "../examplePayloads";
import {
  actionSource,
  customData,
  eventName,
  eventSourceUrl,
  eventTime,
  moreData,
  myConnectionField,
  pixelId,
  userData,
  version,
} from "../inputs";
import { validateConversionsConnection } from "../util";

export const createConversion = action({
  display: {
    label: "Create Conversion",
    description:
      "Create a single conversion event for a pixel. Requires the Conversions API Access Token connection.",
  },
  perform: async (
    context,
    {
      pixelId,
      connection,
      version,
      actionSource,
      customData,
      eventName,
      eventSourceUrl,
      eventTime,
      moreData,
      userData,
    },
  ) => {
    validateConversionsConnection(connection);
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await client.post(`/${pixelId}/events`, {
      data: [
        {
          event_name: eventName,
          event_time: eventTime,
          user_data: userData,
          action_source: actionSource,
          event_source_url: eventSourceUrl,
          custom_data: customData,
          ...moreData,
        },
      ],
    });

    return {
      data,
    };
  },
  inputs: {
    connection: myConnectionField,
    pixelId,
    eventName,
    userData,
    actionSource,
    eventTime,
    eventSourceUrl,
    customData,
    moreData,
    version,
  },
  examplePayload: {
    data: createConversionsResponse,
  },
});
