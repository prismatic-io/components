






export const getMessageExamplePayload = {
  data: {
    fields: {
      deliveryTag: 1,
      redelivered: true,
      exchange: "",
      routingKey: "orders.processing",
      messageCount: 10,
    },
    properties: {
      contentType: "application/json",
      contentEncoding: "utf-8",
      headers: {},
      deliveryMode: 2,
      priority: 0,
      correlationId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      replyTo: "amq.rabbitmq.reply-to",
      expiration: "60000",
      messageId: "msg-20260402-001",
      timestamp: 1743580800,
      type: "order.created",
      userId: "guest",
      appId: "order-service",
      clusterId: "",
    },
    // biome-ignore lint/suspicious/noExplicitAny: amqplib returns Buffer<ArrayBufferLike> but example payload type constraint expects Buffer<ArrayBuffer>
    content: Buffer.from('{"orderId":"ORD-2026-1234","status":"pending"}') as any,
    message: '{"orderId":"ORD-2026-1234","status":"pending"}',
  },
};

export const publishMessageExamplePayload = { data: true };

export const rejectMessageExamplePayload = {
  data: { consumerTag: "amq.ctag-9f8e7d6c5b4a3210" },
};

export const acknowledgeMessageExamplePayload = { data: undefined };

export const checkConnectionExamplePayload = {
  data: {
    host: "rabbitmq.example.com",
    copyright: "Copyright (c) 2007-2024 Broadcom Inc and/or its subsidiaries.",
    information: "Licensed under the MPL 2.0. Website: https://rabbitmq.com",
    platform: "Erlang/OTP 26.2.1",
    product: "RabbitMQ",
    version: "3.13.1",
    connection: {
      host: "rabbitmq.example.com",
      port: "5672",
      vhost: "/",
      password: "**********",
      protocol: "amqp",
      username: "app-service",
    },
  },
};
