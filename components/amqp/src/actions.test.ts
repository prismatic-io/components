import { createConnection, ComponentTestHarness } from "@prismatic-io/spectral/dist/testing";
import component from ".";
import { amqpConnection } from "./connections";

const harness = new ComponentTestHarness(component);


const connection = createConnection(amqpConnection, {
  host: "demo-endpoint.prismatic-dev.io",
  port: "5672",
  protocol: "amqp",
  vhost: "",
  username: "prismaticdemo",
  password: "Asdfasdf1",
});

const message = "This is my message";

interface CheckConnectionResult {
  product: string;
}

interface GetMessageResult {
  message: string;
}

describe("Create client & establish connection", () => {
  it("attempts connection", async () => {
    const result = await harness.action("checkConnection", {
      amqpConnection: connection,
    });
    expect((result.data as CheckConnectionResult).product).toStrictEqual("RabbitMQ");
  });

  it("sends a message", async () => {
    const result = await harness.action("publishMessage", {
      queueName: "myQueue",
      message,
      amqpConnection: connection,
    });
    expect(result.data).toStrictEqual(true);
  }, 20000);

  it("gets and acks a message", async () => {
    const queue = "myQueue";
    const result = await harness.action("getMessage", {
      queueName: queue,
      amqpConnection: connection,
      acknowledgeMessage: true,
    });
    expect((result.data as GetMessageResult).message).toStrictEqual(message);
  }, 20000);
});
