import {
  DEFAULT_SUBSCRIPTION_EXPIRATION_MINUTES,
  GRAPH_SUBSCRIPTION_MAX_MINUTES,
  MAX_SUBSCRIPTION_EXPIRATION_MINUTES,
} from "../subscriptions/constants";
import {
  calculateExpirationDateTime,
  renewSubscriptionFN,
  scheduledRenewalFN,
} from "./webhooks";

const NOW = new Date("2026-11-09T12:00:00.000Z");
const MS_PER_MINUTE = 60 * 1000;
const WEBHOOK_URL = "https://hooks.example.prismatic-dev.io/trigger/abc";

const minutesFromNow = (minutes: number): string =>
  new Date(NOW.getTime() + minutes * MS_PER_MINUTE).toISOString();

const subscription = (id: string, notificationUrl = WEBHOOK_URL) => ({
  id,
  resource: "/drives/drive-1/root",
  changeType: "updated",
  notificationUrl,
  expirationDateTime: minutesFromNow(60),
});

describe("calculateExpirationDateTime", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(NOW);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("defaults to the conservative fleet-wide expiration", () => {
    expect(calculateExpirationDateTime()).toBe(
      minutesFromNow(DEFAULT_SUBSCRIPTION_EXPIRATION_MINUTES),
    );
  });

  it("caps at the conservative maximum when no resource maximum is given", () => {
    expect(calculateExpirationDateTime(20000)).toBe(
      minutesFromNow(MAX_SUBSCRIPTION_EXPIRATION_MINUTES),
    );
  });

  it("honors a resource maximum above the conservative one", () => {
    expect(
      calculateExpirationDateTime(
        30 * 24 * 60,
        GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM,
      ),
    ).toBe(minutesFromNow(GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM));
  });

  it("keeps a value under the resource maximum unchanged", () => {
    expect(
      calculateExpirationDateTime(
        3 * 24 * 60,
        GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM,
      ),
    ).toBe(minutesFromNow(3 * 24 * 60));
  });

  it("documents the Graph ceilings the components rely on", () => {
    expect(GRAPH_SUBSCRIPTION_MAX_MINUTES).toEqual({
      OUTLOOK: 10080,
      DRIVE_ITEM: 42300,
      SHAREPOINT_LIST: 42300,
      DIRECTORY: 41760,
      TEAMS: 4320,
      PRESENCE: 60,
    });
    expect(MAX_SUBSCRIPTION_EXPIRATION_MINUTES).toBeLessThan(
      GRAPH_SUBSCRIPTION_MAX_MINUTES.OUTLOOK,
    );
  });
});

describe("renewSubscriptionFN", () => {
  let patchMock: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(NOW);
    patchMock = jest.fn().mockResolvedValue({ data: subscription("s1") });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("caps the renewal at the conservative maximum by default", async () => {
    await renewSubscriptionFN(
      { patch: patchMock } as never,
      "s1",
      30 * 24 * 60,
    );

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/s1", {
      expirationDateTime: minutesFromNow(MAX_SUBSCRIPTION_EXPIRATION_MINUTES),
    });
  });

  it("caps the renewal at the resource maximum when one is given", async () => {
    await renewSubscriptionFN(
      { patch: patchMock } as never,
      "s1",
      30 * 24 * 60,
      GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM,
    );

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/s1", {
      expirationDateTime: minutesFromNow(
        GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM,
      ),
    });
  });
});

describe("scheduledRenewalFN", () => {
  let getMock: jest.Mock;
  let patchMock: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(NOW);
    getMock = jest.fn();
    patchMock = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("passes the resource maximum through to a stored-id renewal", async () => {
    patchMock.mockResolvedValue({ data: subscription("stored") });

    const result = await scheduledRenewalFN(
      { get: getMock, patch: patchMock } as never,
      "stored",
      WEBHOOK_URL,
      30 * 24 * 60,
      GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM,
    );

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/stored", {
      expirationDateTime: minutesFromNow(
        GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM,
      ),
    });
    expect(getMock).not.toHaveBeenCalled();
    expect(result).toEqual({
      newSubscriptionId: undefined,
      usedUrlFallback: false,
      renewedCount: 1,
    });
  });

  it("passes the resource maximum through to the URL fallback", async () => {
    getMock.mockResolvedValue({
      data: {
        value: [
          subscription("found"),
          subscription("other", "https://hooks.example/trigger/other"),
        ],
      },
    });
    patchMock.mockResolvedValue({ data: subscription("found") });

    const result = await scheduledRenewalFN(
      { get: getMock, patch: patchMock } as never,
      undefined,
      WEBHOOK_URL,
      30 * 24 * 60,
      GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM,
    );

    expect(patchMock).toHaveBeenCalledTimes(1);
    expect(patchMock).toHaveBeenCalledWith("/subscriptions/found", {
      expirationDateTime: minutesFromNow(
        GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM,
      ),
    });
    expect(result).toEqual({
      newSubscriptionId: "found",
      usedUrlFallback: true,
      renewedCount: 1,
    });
  });

  it("keeps the conservative cap when no resource maximum is given", async () => {
    patchMock.mockResolvedValue({ data: subscription("stored") });

    await scheduledRenewalFN(
      { get: getMock, patch: patchMock } as never,
      "stored",
      WEBHOOK_URL,
      30 * 24 * 60,
    );

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/stored", {
      expirationDateTime: minutesFromNow(MAX_SUBSCRIPTION_EXPIRATION_MINUTES),
    });
  });
});
