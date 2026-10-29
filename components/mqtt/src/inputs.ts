import { input, util } from "@prismatic-io/spectral";

export const message = input({
  label: "Message",
  example: "Message to Queue",
  placeholder: "Message",
  type: "string",
  required: true,
  comments: "Provide a string value to be sent to the MQTT topic.",
  clean: util.types.toString,
});

export const topicName = input({
  label: "Topic Name",
  example: "myTopic",
  type: "string",
  required: true,
  comments: "Provide a string value for the name of the MQTT topic.",
  clean: util.types.toString,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});
