import { action, util } from "@prismatic-io/spectral";
import { getNewRelicClient } from "../client";
import { sendEventDataExamplePayload } from "../examplePayloads";
import {
  eventType,
  additionalAttributes,
  accountId,
  connectionInput,
} from "../inputs";

export const sendEventData = action({
  display: {
    label: "Send Event Data",
    description: "Use the Event API to send custom event data to New Relic",
  },
  perform: async (context, params) => {
    const client = getNewRelicClient(
      params.newRelicConnection,
      context.debug.enabled,
    );

    const { data } = await client.post(
      `https://insights-collector.newrelic.com/v1/accounts/${params.accountId}/events`,
      [
        {
          ...(util.types.keyValPairListToObject(params.additionalAttributes) ||
            undefined),
          eventType: params.eventType,
        },
      ],
    );

    return {
      data,
    };
  },
  examplePayload: sendEventDataExamplePayload,
  inputs: {
    eventType,
    additionalAttributes,
    accountId,
    newRelicConnection: connectionInput,
  },
});

export default sendEventData;
