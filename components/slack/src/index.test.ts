jest.mock("@slack/webhook", () => {
  return {
    IncomingWebhook: jest.fn(() => ({
      send: jest.fn().mockResolvedValue("Mock message sent successfully."),
    })),
  };
});

import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { postSlackMessage } from "./actions/messages";
import { webhookUrlConnection } from "./connections";

describe("postSlackMessage", () => {
  test("calls webhook send", async () => {
    const { result } = await invoke(postSlackMessage, {
      message: "foo",
      connection: createConnection(webhookUrlConnection, {
        webhookUrl: "https://hooks.slack.com/services/TXXXX/BXXXXX/XXXXXXX",
      }),
    });
    expect(result.data).toStrictEqual("Mock message sent successfully.");
  });
});
