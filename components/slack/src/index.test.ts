import { vi } from "vitest";

vi.mock("@slack/webhook", () => {
  return {
    // biome-ignore lint/complexity/useArrowFunction: must stay constructible, see comment above
    IncomingWebhook: vi.fn(function () {
      return {
        send: vi.fn().mockResolvedValue("Mock message sent successfully."),
      };
    }),
  };
});

import { createConnection, invoke } from "@prismatic-io/spectral/testing";
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
