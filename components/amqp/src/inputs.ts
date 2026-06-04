import { input, util } from "@prismatic-io/spectral";

export const queueName = input({
  example: "myQueue",
  placeholder: "Queue Name",
  label: "Queue Name",
  type: "string",
  required: true,
  comments: "Provide the name of the queue you would like to interact with.",
  clean: (value) => util.types.toString(value) || "",
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const routeMessage = input({
  label: "Route Message",
  type: "boolean",
  required: true,
  comments: "If you would like to route this message, check this box.",
  clean: util.types.toBool,
});

export const exchange = input({
  label: "Exchange",
  type: "string",
  required: false,
  comments:
    "Provide the name of the exchange you would like to interact with. " +
    "(Note: this parameter is required when Route Messages is true.)",
  clean: util.types.toString,
  example: "account_events",
});

export const routingKey = input({
  label: "Routing Key",
  type: "string",
  required: false,
  comments:
    "Provide the routing key you would like to use. " +
    "(Note: this parameter is required when Route Messages is true.)",
  clean: util.types.toString,
  example: "account_key",
});
