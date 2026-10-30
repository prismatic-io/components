import { createWebhookInputs as i, deleteWebhookInputs } from "./webhooks";

type Row = [string, { clean?: unknown }, unknown, unknown, unknown?];

const run = (rows: Row[]) =>
  test.each(rows)("%s", (_name, input, value, expected, ...empty) => {
    const clean = input.clean as (raw: unknown) => unknown;
    expect(clean(value)).toEqual(expected);
    if (empty.length > 0) expect(clean("")).toEqual(empty[0]);
  });

describe("webhook input cleans", () => {
  run([
    [
      "webhookDetails",
      i.webhookDetails,
      '[{"events":["jira:issue_created"]}]',
      [{ events: ["jira:issue_created"] }],
    ],
    [
      "webhookUrl",
      i.webhookUrl,
      "https://hooks.example.com",
      "https://hooks.example.com",
      "",
    ],
    ["webhookId", deleteWebhookInputs.webhookId, 7, "7", ""],
  ]);
});
