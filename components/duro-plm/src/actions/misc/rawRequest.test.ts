import { invoke } from "@prismatic-io/spectral/dist/testing";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { TEST_API_KEY, useGraphqlServer } from "../../testHelpers";
import { rawRequest } from "./rawRequest";

const server = useGraphqlServer();
const query =
  "query ComponentsByIds($ids: [ID]) { componentsByIds(ids: $ids) { id name } }";

describe("rawRequest", () => {
  test("forwards the query with merged variables and returns the data untouched", async () => {
    server.reply({ data: rawRequestExamplePayload.data });

    const { result } = await invoke(rawRequest, {
      connection: server.connection(),
      query,
      variables: { ids: ["from-variables"], limit: "10" },
      variablesObject: { ids: ["abcdef1234567890abcdef12"] },
    });

    expect(result).toEqual(rawRequestExamplePayload);
    const [request] = server.requests;
    expect(request.method).toBe("POST");
    expect(request.path).toBe("/graphql");
    expect(request.headers.apitoken).toBe(TEST_API_KEY);
    expect(request.body.query).toBe(query);
    expect(request.body.variables).toEqual({
      ids: ["abcdef1234567890abcdef12"],
      limit: "10",
    });
  });

  test.each([
    ["invalid JSON", "{not json"],
    ["a JSON array", [1, 2]],
  ])("rejects %s in Variables Object without sending a request", async (_label, variablesObject) => {
    await expect(
      invoke(rawRequest, {
        connection: server.connection(),
        query,
        variables: undefined,
        variablesObject: variablesObject as unknown as object,
      }),
    ).rejects.toThrow("Variables Object must be a valid JSON object");
    expect(server.requests).toHaveLength(0);
  });
});
