import { handleWorkdayErrors } from "./errors";

const httpError = (status: number, data: unknown) => ({
  isAxiosError: true,
  message: `Request failed with status code ${status}`,
  response: { status, data, headers: { "set-cookie": "secret" } },
});

describe("handleWorkdayErrors", () => {
  it("puts Workday's error in the message and leaves out the headers", () => {
    expect(
      handleWorkdayErrors(httpError(404, { error: "not found: none" })),
    ).toEqual({
      message: "Request failed with status code 404: not found: none",
      status: 404,
      data: { error: "not found: none" },
    });
  });

  it("joins each entry of a validation errors array", () => {
    const result = handleWorkdayErrors(
      httpError(400, {
        error: "invalid request",
        errors: [{ error: "Lines required" }, { error: "Bad date" }],
      }),
    ) as { message: string };
    expect(result.message).toBe(
      "Request failed with status code 400: invalid request; Lines required; Bad date",
    );
  });

  it("decodes a binary error body", () => {
    const body = Buffer.from(JSON.stringify({ error: "invalid PDF ID" }));
    expect(handleWorkdayErrors(httpError(404, body))).toEqual({
      message: "Request failed with status code 404: invalid PDF ID",
      status: 404,
      data: { error: "invalid PDF ID" },
    });
  });

  it("keeps the axios message when the body has no error text", () => {
    expect(handleWorkdayErrors(httpError(502, undefined))).toEqual({
      message: "Request failed with status code 502",
      status: 502,
      data: undefined,
    });
  });

  it("passes other errors through", () => {
    const error = new Error("boom");
    expect(handleWorkdayErrors(error)).toBe(error);
  });
});

describe("handleWorkdayErrors binary bodies", () => {
  it("returns non-JSON bytes as text", () => {
    expect(
      handleWorkdayErrors(httpError(502, Buffer.from("Bad Gateway"))),
    ).toEqual({
      message: "Request failed with status code 502: Bad Gateway",
      status: 502,
      data: "Bad Gateway",
    });
  });

  it("decodes an ArrayBuffer", () => {
    const bytes = new TextEncoder().encode('{"error":"x"}');
    expect(handleWorkdayErrors(httpError(404, bytes.buffer))).toMatchObject({
      data: { error: "x" },
    });
  });
});
