import outlookComponent from "../..";
import { createHarness } from "@prismatic-io/spectral/dist/testing";

const harness = createHarness(outlookComponent);

if (!process.env.PRISMATIC_CONNECTION_VALUE) {
  throw new Error("You must run this command with prism components:dev:run");
}

const connection = {
  key: "oauth",
  ...JSON.parse(process.env.PRISMATIC_CONNECTION_VALUE),
};

describe("Test sending an email", () => {
  test("Send a test email", async () => {
    await harness.action("sendMessage", {
      connection,
      to: ["sgnbcegkekozgnxgfg@ytnhy.com"],
      subject: "Test email from unit test",
      body: "This is a test from a unit test",
    });
  });
});
