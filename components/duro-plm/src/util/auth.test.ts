import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { getCredentials } from "./auth";

const connection = (fields: Record<string, unknown>) =>
  ({ key: "duroApiKey", fields }) as unknown as Connection;

describe("getCredentials", () => {
  test("throws a ConnectionError when the API key is empty", () => {
    const run = () =>
      getCredentials(
        connection({
          username: "",
          duroEnvironment: "https://mfg.duro.app/graphql",
        }),
      );

    expect(run).toThrow(ConnectionError);
    expect(run).toThrow(
      "The Duro connection is missing its API Key or GraphQL endpoint.",
    );
  });
});
