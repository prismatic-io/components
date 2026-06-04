import { connection } from "@prismatic-io/spectral";

export const mqttConnection = connection({
  key: "mqtt",
  display: {
    label: "MQTT Connection",
    description: "Authenticate requests to an MQTT server.",
  },
  inputs: {
    host: {
      label: "Host",
      placeholder: "Host",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide the string value for the host of the MQTT server.",
    },
    protocol: {
      label: "Protocol",
      type: "string",
      required: true,
      shown: true,
      comments: "The protocol used to connect to the MQTT server.",
      model: [
        {
          label: "TCP",
          value: "tcp",
        },
        {
          label: "MQTT",
          value: "mqtt",
        },
        {
          label: "MQTTS",
          value: "mqtts",
        },
      ],
    },
    port: {
      label: "Port",
      placeholder: "Port",
      type: "string",
      required: false,
      shown: true,
      comments: "The port of the MQTT server.",
    },
    username: {
      label: "Username",
      placeholder: "Username",
      type: "string",
      required: false,
      shown: true,
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      required: false,
      shown: true,
    },
  },
});

export default [mqttConnection];
