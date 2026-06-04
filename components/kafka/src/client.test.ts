import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createClient } from "./client";
import { basic } from "./connections/basic";

describe("Test Kafka Component", () => {
  test("creates a client", async () => {
    const kafka = createClient({
      clientId: "my-app",
      brokers: ["localhost:9092"],
      connection: undefined,
    }, false);
    const producer = kafka.producer();

    await producer.connect();
    await producer.disconnect();
  });

  test("sends a message", async () => {
    const kafka = createClient({
      clientId: "my-app",
      brokers: ["localhost:9092"],
      connection: undefined,
    }, false);
    const producer = kafka.producer();
    await producer.connect();

    await producer.send({
      topic: "topic-name",
      messages: [
        { key: "key1", value: "hello world" },
        { key: "key2", value: "hey hey!" },
      ],
    });
    await producer.disconnect();
  });

  test("creates a client using plain auth mechanism", async () => {
    const connection = createConnection(basic, {
      username: "test",
      password: "test",
      authMechanism: "plain",
    });
    const kafka = createClient({
      clientId: "my-app",
      brokers: ["localhost:9092"],
      connection,
    }, false);

    const admin = kafka.admin();
    await admin.connect();
    const result = await admin.listTopics();
    await admin.disconnect();
    expect(result).toMatchInlineSnapshot();
  });
});
