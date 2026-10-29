import { describe, expect, it } from "vitest";
import {
  toCampaignFields,
  toCampaignMessages,
  toSendStrategy,
  toTrackingOptions,
} from "./campaigns";

describe("toCampaignFields", () => {
  it("returns undefined when no fields are selected", () => {
    expect(toCampaignFields(undefined)).toBeUndefined();
  });

  it("passes current revision fields through unchanged", () => {
    expect(toCampaignFields(["name", "status", "send_strategy"])).toEqual([
      "name",
      "status",
      "send_strategy",
    ]);
  });

  it("adds send_strategy.method when a send strategy sub-field is selected", () => {
    expect(toCampaignFields(["name", "send_strategy.datetime"])).toEqual([
      "name",
      "send_strategy.datetime",
      "send_strategy.method",
    ]);
  });

  it("maps legacy send strategy fields to their current equivalents", () => {
    expect(
      toCampaignFields([
        "send_strategy.options_static",
        "send_strategy.options_throttled.throttle_percentage",
        "send_strategy.options_sto.date",
      ]),
    ).toEqual([
      "send_strategy.datetime",
      "send_strategy.options",
      "send_strategy.throttle_percentage",
      "send_strategy.date",
      "send_strategy.method",
    ]);
  });

  it("drops duplicates produced by the mapping", () => {
    expect(
      toCampaignFields([
        "send_strategy.options_static.datetime",
        "send_strategy.options_throttled.datetime",
        "send_strategy.datetime",
      ]),
    ).toEqual(["send_strategy.datetime", "send_strategy.method"]);
  });
});

describe("toSendStrategy", () => {
  it("returns undefined for a missing value", () => {
    expect(toSendStrategy(undefined)).toBeUndefined();
  });

  it("passes a current-shape strategy through unchanged", () => {
    const strategy = {
      method: "static",
      datetime: "2026-11-08T00:00:00+00:00",
      options: { isLocal: true },
    };
    expect(toSendStrategy(strategy)).toEqual(strategy);
  });

  it("flattens a legacy local static strategy", () => {
    expect(
      toSendStrategy({
        method: "static",
        optionsStatic: {
          datetime: "2026-11-08T00:00:00+00:00",
          isLocal: true,
          sendPastRecipientsImmediately: false,
        },
        optionsThrottled: null,
        optionsSto: null,
      }),
    ).toEqual({
      method: "static",
      datetime: "2026-11-08T00:00:00+00:00",
      options: { isLocal: true, sendPastRecipientsImmediately: false },
    });
  });

  it("drops sendPastRecipientsImmediately from a non-local static strategy", () => {
    expect(
      toSendStrategy({
        method: "static",
        optionsStatic: {
          datetime: "2026-11-08T00:00:00+00:00",
          isLocal: false,
          sendPastRecipientsImmediately: false,
        },
      }),
    ).toEqual({
      method: "static",
      datetime: "2026-11-08T00:00:00+00:00",
      options: { isLocal: false },
    });
  });

  it("omits static options when the legacy block only carries a datetime", () => {
    expect(
      toSendStrategy({
        method: "static",
        optionsStatic: {
          datetime: "2026-11-08T00:00:00+00:00",
          sendPastRecipientsImmediately: null,
        },
      }),
    ).toEqual({ method: "static", datetime: "2026-11-08T00:00:00+00:00" });
  });

  it("flattens a legacy throttled strategy", () => {
    expect(
      toSendStrategy({
        method: "throttled",
        optionsStatic: { datetime: "2026-01-01T00:00:00+00:00" },
        optionsThrottled: {
          datetime: "2026-11-08T00:00:00+00:00",
          throttlePercentage: 10,
        },
      }),
    ).toEqual({
      method: "throttled",
      datetime: "2026-11-08T00:00:00+00:00",
      throttlePercentage: 10,
    });
  });

  it("flattens a legacy smart send time strategy", () => {
    expect(
      toSendStrategy({
        method: "smart_send_time",
        optionsSto: { date: "2026-11-08" },
      }),
    ).toEqual({ method: "smart_send_time", date: "2026-11-08" });
  });

  it("drops unused legacy blocks for an immediate strategy", () => {
    expect(
      toSendStrategy({
        method: "immediate",
        optionsStatic: { datetime: "2026-11-08T00:00:00+00:00" },
      }),
    ).toEqual({ method: "immediate" });
  });
});

describe("toTrackingOptions", () => {
  it("returns undefined for a missing value", () => {
    expect(toTrackingOptions(undefined)).toBeUndefined();
  });

  it("passes current-shape tracking options through unchanged", () => {
    const tracking = {
      addTrackingParams: true,
      customTrackingParams: [
        { type: "dynamic", name: "utm_campaign", value: "campaign_name" },
      ],
      isTrackingClicks: true,
    };
    expect(toTrackingOptions(tracking)).toEqual(tracking);
  });

  it("converts legacy UTM fields to static custom tracking params", () => {
    expect(
      toTrackingOptions({
        isAddUtm: true,
        utmParams: [{ name: "utm_medium", value: "campaign" }],
        isTrackingClicks: true,
        isTrackingOpens: false,
      }),
    ).toEqual({
      addTrackingParams: true,
      customTrackingParams: [
        { type: "static", name: "utm_medium", value: "campaign" },
      ],
      isTrackingClicks: true,
      isTrackingOpens: false,
    });
  });

  it("converts isAddUtm alone and ignores a null utmParams", () => {
    expect(toTrackingOptions({ isAddUtm: false, utmParams: null })).toEqual({
      addTrackingParams: false,
    });
  });
});

describe("toCampaignMessages", () => {
  const content = { subject: "Buy our product!", fromEmail: "a@b.com" };

  it("returns undefined for a missing value", () => {
    expect(toCampaignMessages(undefined)).toBeUndefined();
  });

  it("passes current-shape messages through unchanged", () => {
    const messages = [
      {
        type: "campaign-message",
        attributes: { definition: { channel: "email", content } },
      },
    ];
    expect(toCampaignMessages(messages)).toEqual(messages);
  });

  it("nests legacy email attributes under definition and drops renderOptions", () => {
    expect(
      toCampaignMessages([
        {
          type: "campaign-message",
          attributes: {
            channel: "email",
            label: "My message",
            content,
            renderOptions: { shortenLinks: true },
          },
        },
      ]),
    ).toEqual([
      {
        type: "campaign-message",
        attributes: {
          definition: { channel: "email", label: "My message", content },
        },
      },
    ]);
  });

  it("nests legacy sms attributes under definition and drops label", () => {
    expect(
      toCampaignMessages([
        {
          type: "campaign-message",
          attributes: {
            channel: "sms",
            label: "My message",
            content: { body: "Hi" },
            renderOptions: { shortenLinks: true },
          },
        },
      ]),
    ).toEqual([
      {
        type: "campaign-message",
        attributes: {
          definition: {
            channel: "sms",
            content: { body: "Hi" },
            renderOptions: { shortenLinks: true },
          },
        },
      },
    ]);
  });

  it("keeps sibling keys such as relationships", () => {
    const relationships = { image: { data: { type: "image", id: "1" } } };
    expect(
      toCampaignMessages([
        {
          type: "campaign-message",
          attributes: { channel: "email", content },
          relationships,
        },
      ]),
    ).toEqual([
      {
        type: "campaign-message",
        attributes: { definition: { channel: "email", content } },
        relationships,
      },
    ]);
  });
});
