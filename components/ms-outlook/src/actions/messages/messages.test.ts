import outlookComponent from "../..";
import { createHarness } from "@prismatic-io/spectral/dist/testing";
const harness = createHarness(outlookComponent);
const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE
  ? describe
  : describe.skip;
describeIntegrationTest("Test sending an email", () => {
  let connection: {
    key: string;
    [key: string]: unknown;
  };
  beforeAll(() => {
    connection = {
      key: "oauth",
      ...JSON.parse(process.env.PRISMATIC_CONNECTION_VALUE as string),
    };
  });
  test("Send a test email", async () => {
    await harness.action("sendMessage", {
      connection,
      to: ["sgnbcegkekozgnxgfg@ytnhy.com"],
      subject: "Test email from unit test",
      body: "This is a test from a unit test",
    });
  });
});
