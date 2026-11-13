import { RENEWAL_EXPIRATION_MINUTES } from "../constants";
import { getScheduleInputs, listCalendarsInputs } from "./calendars";
import { createEventInputs, updateEventInputs } from "./events";
import { sendMessageInputs } from "./messages";
import { createMailFolderSubscriptionInputs, createSubscriptionInputs } from "./subscriptions";

const NOW = new Date("2026-11-11T12:00:00.000Z");

describe("pagination.pageLimit.clean", () => {
  const clean = listCalendarsInputs.pagination.inputs.pageLimit.clean;

  test("parses a numeric string", () => {
    expect(clean("25")).toBe(25);
  });

  test("returns undefined for an empty value", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });

  test("keeps an explicit zero as 0", () => {
    expect(clean("0")).toBe(0);
  });

  test("treats a numeric zero like the string zero", () => {
    expect(clean(0)).toBe(0);
  });

  test("treats null as blank", () => {
    expect(clean(null)).toBeUndefined();
  });

  test("throws for a value that is not a number", () => {
    expect(() => clean("abc")).toThrow("cannot be coerced to a number");
  });
});

describe("pagination.pageSkip.clean", () => {
  const clean = listCalendarsInputs.pagination.inputs.pageSkip.clean;

  test("parses a numeric string to a number", () => {
    expect(clean("100")).toBe(100);
  });

  test("returns undefined for an empty value", () => {
    expect(clean("")).toBeUndefined();
  });

  test("throws for a value that is not a number", () => {
    expect(() => clean("abc")).toThrow("cannot be coerced to a number");
  });
});

describe("changeType.clean", () => {
  const clean = createMailFolderSubscriptionInputs.changeType.clean;

  test("joins a list of change types with commas", () => {
    expect(clean(["created", "updated"])).toBe("created,updated");
  });

  test("passes a single string through", () => {
    expect(clean("deleted")).toBe("deleted");
  });
});

describe("expirationDateTime.clean", () => {
  const clean = createSubscriptionInputs.expirationDateTime.clean;

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
  });
  afterEach(() => vi.useRealTimers());

  test("defaults an empty value to the maximum subscription lifetime from now", () => {
    expect(clean("")).toBe(
      new Date(NOW.getTime() + RENEWAL_EXPIRATION_MINUTES * 60 * 1000).toISOString(),
    );
  });

  test("passes an explicit timestamp through", () => {
    expect(clean("2026-12-31T23:59:59.999Z")).toBe("2026-12-31T23:59:59.999Z");
  });

  test("serializes a Date to ISO 8601", () => {
    expect(clean(new Date("2026-12-31T00:00:00.000Z"))).toBe("2026-12-31T00:00:00.000Z");
  });
});

describe("attendees.clean", () => {
  const clean = createEventInputs.attendees.clean;

  test("maps each email/type pair to a Graph attendee", () => {
    expect(
      clean([
        { key: "john.doe@example.com", value: "required" },
        { key: "room@example.com", value: "resource" },
      ]),
    ).toEqual([
      { emailAddress: { address: "john.doe@example.com" }, type: "required" },
      { emailAddress: { address: "room@example.com" }, type: "resource" },
    ]);
  });

  test("throws when the value is not a list", () => {
    expect(() => clean("john.doe@example.com")).toThrow(
      "Unexpected format of attendees collection.",
    );
  });

  test("returns no attendees for an empty value on Update Event", () => {
    expect(updateEventInputs.attendees.clean(undefined)).toEqual([]);
    expect(updateEventInputs.attendees.clean([])).toEqual([]);
  });

  test("still maps attendees on Update Event", () => {
    expect(
      updateEventInputs.attendees.clean([{ key: "john.doe@example.com", value: "optional" }]),
    ).toEqual([{ emailAddress: { address: "john.doe@example.com" }, type: "optional" }]);
  });
});

describe("availabilityViewInterval.clean", () => {
  const clean = getScheduleInputs.availabilityViewInterval.clean;

  test("converts a numeric string to a number", () => {
    expect(clean("60")).toBe(60);
  });

  test("returns undefined for a cleared field", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });

  test("throws for a value that is not a number", () => {
    expect(() => clean("abc")).toThrow("cannot be coerced to a number");
  });
});

describe("schedules.clean", () => {
  const clean = getScheduleInputs.schedules.clean;

  test("stringifies each address in a list", () => {
    expect(clean(["adele.vance@example.com", 42])).toEqual(["adele.vance@example.com", "42"]);
  });

  test("passes a non-list value through unchanged", () => {
    expect(clean("adele.vance@example.com")).toBe("adele.vance@example.com");
  });
});

describe("bodyContentType.clean", () => {
  const clean = sendMessageInputs.bodyContentType.clean;

  test("accepts html and text", () => {
    expect(clean("html")).toBe("html");
    expect(clean("text")).toBe("text");
  });

  test("throws for any other content type", () => {
    expect(() => clean("markdown")).toThrow("Invalid body content type. Must be 'text' or 'html'");
  });
});

describe.each([
  ["attachments", sendMessageInputs.attachments.clean, "Attachments"],
  ["dynamicAttachments", sendMessageInputs.dynamicAttachments.clean, "Dynamic Attachments"],
] as const)("%s.clean", (_name, clean, label) => {
  test("maps each file to a base64 Graph fileAttachment", () => {
    expect(clean([{ key: "notes.txt", value: Buffer.from("hello") }])).toEqual([
      {
        "@odata.type": "#microsoft.graph.fileAttachment",
        name: "notes.txt",
        contentBytes: Buffer.from("hello").toString("base64"),
        contentType: expect.any(String),
      },
    ]);
  });

  test("returns an empty list for an empty value or an empty list", () => {
    expect(clean(undefined)).toEqual([]);
    expect(clean([])).toEqual([]);
  });

  test("throws when the value is not a list of files", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => clean({ key: "notes.txt" })).toThrow(`${label} must be an array of files`);
    expect(() => clean(["notes.txt"])).toThrow(`${label} must be an array of files`);
    consoleError.mockRestore();
  });
});

describe.each([
  ["to", sendMessageInputs.to.clean],
  ["cc", sendMessageInputs.cc.clean],
  ["bcc", sendMessageInputs.bcc.clean],
] as const)("%s.clean", (_name, clean) => {
  test("splits comma-separated entries and drops empty ones", () => {
    expect(clean(["john.doe@example.com,jane.smith@example.com", "", "cc@example.com"])).toEqual([
      "john.doe@example.com",
      "jane.smith@example.com",
      "cc@example.com",
    ]);
  });

  test("trims whitespace around each comma-separated address", () => {
    expect(clean(["john.doe@example.com, jane.smith@example.com"])).toEqual([
      "john.doe@example.com",
      "jane.smith@example.com",
    ]);
  });

  test("drops the empty entry a trailing comma leaves", () => {
    expect(clean(["john.doe@example.com,"])).toEqual(["john.doe@example.com"]);
  });
});

describe.each([
  ["cc", sendMessageInputs.cc.clean],
  ["bcc", sendMessageInputs.bcc.clean],
] as const)("%s.clean (optional)", (_name, clean) => {
  test("returns an empty list for an empty value", () => {
    expect(clean(undefined)).toEqual([]);
    expect(clean([""])).toEqual([]);
  });
});

describe("to.clean (required)", () => {
  const clean = sendMessageInputs.to.clean;

  test("throws a named error when no address remains", () => {
    const message = "To must contain at least one email address.";
    expect(() => clean(undefined)).toThrow(message);
    expect(() => clean([""])).toThrow(message);
    expect(() => clean([" , "])).toThrow(message);
  });
});
