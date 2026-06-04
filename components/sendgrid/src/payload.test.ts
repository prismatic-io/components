import { createPayload } from "./payload";

describe("verifyPayload", () => {
  test("ensure payload is properly formatted", () => {
    const params = {
      to: "to1@example.com, to2@example.com",
      cc: "to1@example.com, to2@example.com",
      bcc: "to1@example.com, to2@example.com",
      from: { email: "from@example.com", name: "John Doe" },
      replyTo: { email: "from@example.com", name: "John Doe" },
      subject: "subject",
      attachments: undefined,
      text: "text",
      trackingSettings: {},
    };
    const actualPayload = createPayload(params);
    const expectedPayload = {
      to: ["to1@example.com", "to2@example.com"],
      cc: ["to1@example.com", "to2@example.com"],
      bcc: ["to1@example.com", "to2@example.com"],
      from: { email: "from@example.com", name: "John Doe" },
      personalizations: undefined,
      attachments: undefined,
      replyTo: { email: "from@example.com", name: "John Doe" },
      subject: "subject",
      text: "text",
      trackingSettings: {},
      templateId: undefined,
    };

    expect(actualPayload).toStrictEqual(expectedPayload);
  });
});
