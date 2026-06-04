import { myTrigger } from "./triggers";
import {
  invokeTrigger,
  defaultTriggerPayload,
} from "@prismatic-io/spectral/dist/testing";
const EVENT_GRID_SAMPLE_PAYLOAD = [
  {
    id: "2d1781af-3a4c-4d7c-bd0c-e34b19da4e66",
    topic: "/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    subject: "",
    data: {
      validationCode: "512d38b6-c7b8-40c8-89fe-f46f9e9622b6",
      validationUrl:
        "https://rp-eastus2.eventgrid.azure.net:553/eventsubscriptions/myeventsub/validate?id=0000000000-0000-0000-0000-00000000000000&t=2022-10-28T04:23:35.1981776Z&apiVersion=2018-05-01-preview&token=1A1A1A1A",
    },
    eventType: "Microsoft.EventGrid.SubscriptionValidationEvent",
    eventTime: "2022-10-28T04:23:35.1981776Z",
    metadataVersion: "1",
    dataVersion: "1",
  },
];
describe("test my trigger", () => {
  test("verify the return value of my trigger", async () => {
    
    const events = ["Microsoft.Storage.BlobCreate"];
    const { result } = await invokeTrigger(
      myTrigger,
      {},
      {
        ...defaultTriggerPayload(),
        body: { data: EVENT_GRID_SAMPLE_PAYLOAD },
        headers: { "WebHook-Request-Origin": "eventemitter.example.com" },
      },
      { eventTopics: events },
    );
    console.log(
      "Prismatic Custom Trigger Response: ",
      JSON.stringify(result.response, undefined, 2),
    );
  });
});
