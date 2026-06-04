import { dataSource } from "@prismatic-io/spectral";
import { selectWebhookEventTypeExamplePayload } from "../examplePayloads";
import { WEBHOOK_EVENT_TYPES } from "../constants";














export const selectWebhookEventType = dataSource({
  display: {
    label: "Select Webhook Event Type",
    description: "A picklist of available SurveyMonkey webhook event types.",
  },
  inputs: {},
  perform: async () => {
    
    return { result: WEBHOOK_EVENT_TYPES };
  },
  examplePayload: selectWebhookEventTypeExamplePayload,
  dataSourceType: "picklist",
});
