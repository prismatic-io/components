import type { ActionContext, Connection } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";
import type { Mock } from "vitest";

vi.mock("../../client", () => ({
  createClient: vi.fn(),
}));

import { createClient } from "../../client";
import { SANDBOX_AUTHORIZE_URL } from "../../constants";
import employeeActions from ".";

const mockGet = vi.fn() as Mock;

(createClient as Mock).mockReturnValue({
  get: mockGet,
  post: vi.fn(),
} as unknown as HttpClient);

const fakeConnection = {
  fields: { authorizeUrl: SANDBOX_AUTHORIZE_URL },
  token: { access_token: "test-token" },
} as unknown as Connection;

const fakeContext = {
  debug: { enabled: false },
} as unknown as ActionContext;

describe("findEmployeeByEmail", () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it("finds employee on first page", async () => {
    mockGet.mockResolvedValueOnce({
      data: [
        { email: "alice@example.com", uuid: "aaa" },
        { email: "bob@example.com", uuid: "bbb" },
      ],
      headers: { "x-total-pages": "1", "x-page": "1" },
    });

    const result = await employeeActions.findEmployeeByEmail.perform(
      fakeContext,
      {
        connection: fakeConnection,
        companyId: "company-1",
        email: "bob@example.com",
      },
    );

    expect(result.data.data).toEqual({
      email: "bob@example.com",
      uuid: "bbb",
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it("paginates past 9 pages with string headers (regression)", async () => {
    for (let i = 1; i <= 10; i++) {
      const employees =
        i === 10
          ? [{ email: "target@example.com", uuid: "found" }]
          : [{ email: `page${i}@example.com`, uuid: `uuid-${i}` }];

      mockGet.mockResolvedValueOnce({
        data: employees,
        headers: { "x-total-pages": "10", "x-page": String(i) },
      });
    }

    const result = await employeeActions.findEmployeeByEmail.perform(
      fakeContext,
      {
        connection: fakeConnection,
        companyId: "company-1",
        email: "target@example.com",
      },
    );

    expect(mockGet).toHaveBeenCalledTimes(10);
    expect(result.data.data).toEqual({
      email: "target@example.com",
      uuid: "found",
    });
  });

  it("throws when employee is not found", async () => {
    mockGet.mockResolvedValueOnce({
      data: [{ email: "other@example.com", uuid: "xxx" }],
      headers: { "x-total-pages": "1", "x-page": "1" },
    });

    await expect(
      employeeActions.findEmployeeByEmail.perform(fakeContext, {
        connection: fakeConnection,
        companyId: "company-1",
        email: "missing@example.com",
      }),
    ).rejects.toThrow("Employee not found");
  });
});
