import { invoke } from "@prismatic-io/spectral/dist/testing";
import { ClientError } from "graphql-request";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { TEST_API_KEY, useGraphqlServer } from "../../testHelpers";
import { getCurrentUser } from "./getCurrentUser";

const server = useGraphqlServer();

describe("getCurrentUser", () => {
  test("returns the userById response and sends the API key", async () => {
    server.reply({ data: getCurrentUserExamplePayload.data });

    const { result } = await invoke(getCurrentUser, {
      connection: server.connection(),
    });

    expect(result).toEqual(getCurrentUserExamplePayload);
    expect(server.requests).toHaveLength(1);
    expect(server.requests[0].headers.apitoken).toBe(TEST_API_KEY);
    expect(server.requests[0].body.query).toContain("userById");
  });

  test("throws a ClientError carrying the status when Duro replies 401", async () => {
    server.reply({ message: "Unauthorized" }, 401);

    const error = await invoke(getCurrentUser, {
      connection: server.connection(),
    }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ClientError);
    expect((error as ClientError).response.status).toBe(401);
    expect((error as ClientError).message).toContain(
      "GraphQL Error (Code: 401)",
    );
  });
});
