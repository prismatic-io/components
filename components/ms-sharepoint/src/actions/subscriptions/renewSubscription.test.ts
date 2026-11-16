import { type Mock, vi } from "vitest";
import { renewSubscription } from "./renewSubscription";

const patchMock: Mock = vi.fn();

vi.mock("../../client", () => ({
  createClient: vi.fn(async () => ({ patch: patchMock })),
}));

const NOW = new Date("2026-11-09T12:00:00.000Z");
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_MINUTE = 60 * 1000;
const GRAPH_LIST_CEILING_MINUTES = 42300;

const connection = { key: "oauth", fields: {}, token: { access_token: "t" } } as never;
const context = { debug: { enabled: false } } as never;

beforeEach(() => {
  vi.setSystemTime(NOW);
  patchMock.mockReset();
  patchMock.mockResolvedValue({ data: { id: "sub-1" } });
});

afterEach(() => {
  vi.useRealTimers();
});

describe("renewSubscription", () => {
  test("extends the subscription by the requested number of days", async () => {
    const threeDaysOut = new Date(NOW.getTime() + 3 * MS_PER_DAY).toISOString();

    const result = await renewSubscription.perform(context, {
      connection,
      subscriptionId: "sub-1",
      expirationDays: 3,
    } as never);

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/sub-1", {
      expirationDateTime: threeDaysOut,
    });
    expect(result).toEqual({ data: { id: "sub-1" } });
  });

  test("caps the renewal at the Graph maximum for SharePoint resources", async () => {
    const ceiling = new Date(
      NOW.getTime() + GRAPH_LIST_CEILING_MINUTES * MS_PER_MINUTE,
    ).toISOString();

    await renewSubscription.perform(context, {
      connection,
      subscriptionId: "sub-1",
      expirationDays: 30,
    } as never);

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/sub-1", {
      expirationDateTime: ceiling,
    });
  });
});
