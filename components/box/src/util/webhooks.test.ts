import type { BoxClient } from "box-node-sdk";
import { webhooksResponse } from "../../tests/boxSdkResponses";
import { getAllWebhookEntries } from "./webhooks";

const pageOne = {
  entries: [
    { id: "1234", type: "webhook", target: { id: "111", type: "folder" } },
  ],
  limit: 1,
  next_marker: "page-2",
};
const pageTwo = {
  entries: [
    { id: "5678", type: "webhook", target: { id: "222", type: "file" } },
  ],
  limit: 1,
};

const buildClient = () => {
  const getWebhooks = vi
    .fn()
    .mockImplementation(({ marker }: { marker?: string }) =>
      Promise.resolve(webhooksResponse(marker ? pageTwo : pageOne)),
    );
  return {
    client: { webhooks: { getWebhooks } } as unknown as BoxClient,
    getWebhooks,
  };
};

describe("getAllWebhookEntries", () => {
  test("returns the snake_case entries of every marker page", async () => {
    const { client, getWebhooks } = buildClient();

    const { entries } = await getAllWebhookEntries(client);

    expect(entries).toEqual([...pageOne.entries, ...pageTwo.entries]);
    expect(getWebhooks).toHaveBeenCalledTimes(2);
    expect(getWebhooks).toHaveBeenLastCalledWith(
      expect.objectContaining({ marker: "page-2" }),
    );
  });

  test("returns no entries when the account has no webhooks", async () => {
    const getWebhooks = vi
      .fn()
      .mockResolvedValue(webhooksResponse({ entries: [], limit: 100 }));
    const client = { webhooks: { getWebhooks } } as unknown as BoxClient;

    await expect(getAllWebhookEntries(client)).resolves.toEqual({
      entries: [],
    });
  });
});
