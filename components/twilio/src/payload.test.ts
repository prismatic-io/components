import { createPayload } from "./payload";

describe("verifyPayload", () => {
  test("ensure payload is properly formatted", () => {
    const params = {
      to: "(605) 555-1212",
      from: "(605) 555-1212",
      message: "Test message",
    };
    const actualPayload = createPayload(params);
    const expectedPayload = {
      to: "+16055551212",
      from: "+16055551212",
      body: "Test message",
    };

    expect(actualPayload).toStrictEqual(expectedPayload);
  });

  test("ensure invalid recipient phone number throws error", () => {
    const params = {
      to: "12345",
      from: "(605) 555-1212",
      message: "Test message",
    };

    expect(() => {
      createPayload(params);
    }).toThrow(Error);
  });

  test("ensure invalid sender phone number throws error", () => {
    const params = {
      to: "(605) 555-1212",
      from: "12345",
      message: "Test message",
    };

    expect(() => {
      createPayload(params);
    }).toThrow(Error);
  });
});
