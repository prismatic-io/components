import type { ActionLogger } from "@prismatic-io/spectral";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  describeTransportError,
  logRequest,
  normalizeGitlabUrl,
  retryDelay,
} from "./transport";
describe("normalizeGitlabUrl", () => {
  test.each([
    ["", "https://gitlab.com"],
    ["https://gitlab.com/", "https://gitlab.com"],
    ["gitlab.example.com", "https://gitlab.example.com"],
    ["https://gitlab.example.com/api/v4/", "https://gitlab.example.com"],
    ["https://example.com/gitlab/", "https://example.com/gitlab"],
    ["http://10.0.0.5:8080", "http://10.0.0.5:8080"],
  ])("%s -> %s", (input, expected) => {
    expect(normalizeGitlabUrl(input)).toBe(expected);
  });
  test("rejects a non-http scheme", () => {
    expect(() => normalizeGitlabUrl("ftp://gitlab.example.com")).toThrow(
      /http or https/,
    );
  });
});
describe("retryDelay", () => {
  const withRetryAfter = (value: string | undefined) =>
    ({
      response: {
        headers: value === undefined ? {} : { "retry-after": value },
      },
    }) as unknown as Parameters<typeof retryDelay>[1];
  test("honors a numeric Retry-After", () => {
    expect(retryDelay(1, withRetryAfter("2"))).toBe(2000);
  });
  test("falls back to backoff for an HTTP-date Retry-After", () => {
    expect(retryDelay(1, withRetryAfter("Wed, 21 Oct 2026 07:28:00 GMT"))).toBe(
      1000,
    );
  });
});
describe("describeTransportError", () => {
  test("appends the hint once when the same error is described again", () => {
    const error = {
      message: "Request failed with status code 403",
      response: { status: 403 },
    } as unknown as AxiosError;
    describeTransportError(error, false);
    describeTransportError(error, false);
    expect(error.message.match(/Maintainer or Owner/g)).toHaveLength(1);
  });
});
describe("logRequest", () => {
  const logger = (debug: (message: string) => void) =>
    ({ debug }) as unknown as ActionLogger;
  test("logs a circular body without throwing", () => {
    const debug = vi.fn();
    const data: Record<string, unknown> = { title: "Loop", count: BigInt(7) };
    data.self = data;
    const request = {
      method: "post",
      url: "/projects/1/issues",
      headers: {},
      data,
    } as unknown as InternalAxiosRequestConfig;
    expect(() => logRequest(logger(debug))(request)).not.toThrow();
    expect(debug.mock.calls[0][0]).toContain("Loop");
  });
  test("logs a BigInt body without throwing", () => {
    const debug = vi.fn();
    const request = {
      method: "post",
      url: "/projects/1/issues",
      headers: {},
      data: { count: BigInt(7) },
    } as unknown as InternalAxiosRequestConfig;
    expect(() => logRequest(logger(debug))(request)).not.toThrow();
    expect(debug.mock.calls[0][0]).toContain("7");
  });
});
