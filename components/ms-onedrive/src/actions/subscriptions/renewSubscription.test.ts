import { type Mock, vi } from "vitest";
import { renewSubscription } from "./renewSubscription";

const patchMock: Mock = vi.fn();

vi.mock("../../client", () => ({
  getOneDriveClient: vi.fn(() => ({ patch: patchMock })),
}));

const NOW = new Date("2026-11-09T12:00:00.000Z");
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const oneDriveConnection = {
  key: "oauth",
  fields: {},
  token: { access_token: "t" },
} as never;

const context = { debug: { enabled: false } } as never;

beforeEach(() => {
  vi.setSystemTime(NOW);
  patchMock.mockReset();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("renewSubscription", () => {
  test("extends the subscription by the requested number of days", async () => {
    patchMock.mockResolvedValue({ data: { id: "sub-1" } });
    const threeDaysOut = new Date(NOW.getTime() + 3 * MS_PER_DAY).toISOString();

    const result = await renewSubscription.perform(context, {
      oneDriveConnection,
      subscriptionId: "sub-1",
      expirationDays: 3,
    } as never);

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/sub-1", {
      expirationDateTime: threeDaysOut,
    });
    expect(result).toEqual({ data: { id: "sub-1" } });
  });

  test("caps the renewal 10 minutes under the Graph maximum for drive resources", async () => {
    patchMock.mockResolvedValue({ data: { id: "sub-1" } });
    const driveCeiling = new Date(
      NOW.getTime() + 42290 * 60 * 1000,
    ).toISOString();

    await renewSubscription.perform(context, {
      oneDriveConnection,
      subscriptionId: "sub-1",
      expirationDays: 30,
    } as never);

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/sub-1", {
      expirationDateTime: driveCeiling,
    });
  });

  test("rejects when the subscription no longer exists", async () => {
    patchMock.mockRejectedValue(
      Object.assign(new Error("Request failed with status code 404"), {
        response: {
          status: 404,
          data: { error: { code: "ResourceNotFound", message: "Not found" } },
        },
      }),
    );

    await expect(
      renewSubscription.perform(context, {
        oneDriveConnection,
        subscriptionId: "sub-1",
        expirationDays: 3,
      } as never),
    ).rejects.toThrow("Request failed with status code 404");
  });
});
