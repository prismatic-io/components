import { input, util } from "@prismatic-io/spectral";
import { connection } from "./general";

export const topicHostName = input({
  label: "Topic Host Name",
  type: "string",
  comments: "The host name of the topic.",
  example: "topic1.westus2-1.eventgrid.azure.net",
  placeholder: "topic1.westus2-1.eventgrid.azure.net",
  required: true,
  clean: util.types.toString,
});

export const topicAccessKey = input({
  label: "Topic Access Key",
  type: "password",
  comments: "The access key of the topic.",
  required: true,
  example:
    "AzVWk42YmQlshLB7o5pxJqBTBYmkS1SAEGldtYeLcWAu5gzk5YKpJQQJ99AKACYesed1SSsd1s",
  placeholder:
    "AzVWk42YmQlshLB7o5pxJqBTBYmkS1SAEGldtYeLcWAu5gzk5YKpJQQJ99AKACYesed1SSsd1s",
  clean: util.types.toString,
});

export const events = input({
  label: "Events",
  type: "code",
  language: "json",
  comments:
    "The events to publish. The events must match the schema of the topic.",
  example: JSON.stringify(
    [
      {
        id: "b3ccc7e3-c1cb-49bf-b7c8-0d4e60980616",
        source: "/microsoft/autorest/examples/eventgrid/cloud-events/publish",
        specversion: "1.0",
        data: {
          Property1: "Value1",
          Property2: "Value2",
        },
        type: "Microsoft.Contoso.TestEvent",
        time: "2017-12-04T22:06:09.147165Z",
      },
    ],
    null,
    2,
  ),
  required: true,
  clean: util.types.toObject,
});

export const publishEventsInputs = {
  connection,
  topicHostName,
  topicAccessKey,
  events,
};
