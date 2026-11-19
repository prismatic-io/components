import type { ActionContext, Connection } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";
import type { Mock } from "vitest";

vi.mock("../../client", () => ({
  createClient: vi.fn(),
}));

import { createClient } from "../../client";
import { SANDBOX_AUTHORIZE_URL } from "../../constants";
import { createEmployee } from "./createEmployee";

const mockPost = vi.fn() as Mock;

(createClient as Mock).mockReturnValue({
  post: mockPost,
} as unknown as HttpClient);

const fakeConnection = {
  fields: { authorizeUrl: SANDBOX_AUTHORIZE_URL },
  token: { access_token: "test-token" },
} as unknown as Connection;

const fakeContext = {
  debug: { enabled: false },
} as unknown as ActionContext;

describe("createEmployee", () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it("throws when selfOnboarding is true but email is missing", async () => {
    await expect(
      createEmployee.perform(fakeContext, {
        connection: fakeConnection,
        companyId: "company-1",
        firstName: "John",
        middleInitial: undefined,
        lastName: "Doe",
        dateOfBirth: undefined,
        email: "",
        ssn: undefined,
        selfOnboarding: true,
        additionalFields: {},
      }),
    ).rejects.toThrow(
      "Email Address is required when Self Onboarding is enabled.",
    );

    expect(mockPost).not.toHaveBeenCalled();
  });

  it("posts employee data when inputs are valid", async () => {
    mockPost.mockResolvedValueOnce({
      data: { uuid: "new-emp", first_name: "John" },
      headers: {},
    });

    const result = await createEmployee.perform(fakeContext, {
      connection: fakeConnection,
      companyId: "company-1",
      firstName: "John",
      middleInitial: "A",
      lastName: "Doe",
      dateOfBirth: "1990-01-01",
      email: "john@example.com",
      ssn: undefined,
      selfOnboarding: true,
      additionalFields: {},
    });

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(result.data.data).toEqual({ uuid: "new-emp", first_name: "John" });
  });
});
