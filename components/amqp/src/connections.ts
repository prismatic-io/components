import { connection } from "@prismatic-io/spectral";

export const amqpConnection = connection({
  key: "amqp",
  display: {
    label: "AMQP Connection",
    description: "Authenticate requests to an amqp server",
  },
  inputs: {
    host: {
      label: "Host",
      placeholder: "Host",
      type: "string",
      required: true,
      shown: true,
      comments: "The IP address or endpoint of the AMQP server",
      default: "192.168.0.1",
    },
    port: {
      label: "Port",
      placeholder: "Port",
      type: "string",
      required: true,
      shown: true,
      comments: "The port of the AMQP server",
      default: "5672",
    },
    protocol: {
      label: "Protocol",
      model: [
        {
          label: "AMQP",
          value: "amqp",
        },
        {
          label: "AMQPS",
          value: "amqps",
        },
      ],
      type: "string",
      required: true,
      default: "amqp",
      comments: "Provide the desired protocol in which you want to interact with the queue. ",
    },
    vhost: {
      label: "Vhost",
      placeholder: "Vhost",
      type: "string",
      required: false,
      comments: 'The "example/vhost" portion of amqps://amqp.example.com:5672/example/vhost',
      default: "",
    },
    username: {
      label: "Username",
      placeholder: "Username",
      type: "string",
      required: false,
      shown: true,
      comments: "This can be omitted if the AMQP server allows anonymous authentication",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "string",
      required: false,
      shown: true,
      comments: "This can be omitted if the AMQP server allows anonymous authentication",
    },
  },
});

export default [amqpConnection];
