import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { userFullResponse } from "../../../tests/boxSdkResponses";
import { apiKey } from "../../connections";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUser } from "./getCurrentUser";

const mockGetUserMe = vi.fn();

vi.mock("../../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({
    users: {
      getUserMe: (...args: unknown[]) => mockGetUserMe(...args),
    },
  }),
}));

const boxConnection = createConnection(apiKey, {
  apiKey: "test-token-for-unit-tests",
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getCurrentUser", () => {
  test("returns the snake_case user Box reports for the token", async () => {
    mockGetUserMe.mockResolvedValue(
      userFullResponse(getCurrentUserExamplePayload.data),
    );

    const { result } = await invoke(getCurrentUser, { boxConnection });

    expect(result).toEqual({ data: getCurrentUserExamplePayload.data });
  });

  test("surfaces a Box error from the user lookup", async () => {
    mockGetUserMe.mockRejectedValue(new Error("Box responded 404"));

    await expect(invoke(getCurrentUser, { boxConnection })).rejects.toThrow(
      "Box responded 404",
    );
  });
});
