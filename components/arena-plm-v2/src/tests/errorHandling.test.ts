import * as http from "node:http";
import axios from "axios";
import { handleArenaError } from "../util/errorHandling";
import { createTestContext } from "./testContext";
jest.setTimeout(10000);
describe("handleArenaError", () => {
  let server: http.Server;
  let serverPort: number;
  beforeAll(async () => {
    server = http.createServer((_req, res) => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ errors: [{ message: "Item not found" }] }));
    });
    await new Promise<void>((resolve) =>
      server.listen(0, "127.0.0.1", resolve),
    );
    serverPort = (
      server.address() as {
        port: number;
      }
    ).port;
  });
  afterAll(async () => {
    await new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve())),
    );
  });
  const failingRequest = async () => {
    try {
      await axios.get(`http://127.0.0.1:${serverPort}/items/BAD-GUID`, {
        headers: {
          arena_session_id: "SESSION-SHOULD-NOT-BE-LOGGED",
          Authorization: "Bearer TOKEN-SHOULD-NOT-BE-LOGGED",
        },
      });
    } catch (error) {
      return error;
    }
    throw new Error("expected the request to fail");
  };
  it("never writes the session id or bearer token to the log", async () => {
    const error = await failingRequest();
    const context = createTestContext();
    expect(() => handleArenaError(error, context.logger, "Get Item")).toThrow();
    const logged = JSON.stringify(context.logs);
    expect(logged).not.toContain("SESSION-SHOULD-NOT-BE-LOGGED");
    expect(logged).not.toContain("TOKEN-SHOULD-NOT-BE-LOGGED");
    expect(logged).not.toContain("arena_session_id");
  });
  it("still logs what makes the failure diagnosable", async () => {
    const error = await failingRequest();
    const context = createTestContext();
    expect(() => handleArenaError(error, context.logger, "Get Item")).toThrow();
    const logged = JSON.stringify(context.logs);
    expect(logged).toContain("Get Item Error");
    expect(logged).toContain("404");
    expect(logged).toContain("Item not found");
  });
  it("throws rather than returning, so callers cannot fall through", async () => {
    const error = await failingRequest();
    const context = createTestContext();
    expect(() => handleArenaError(error, context.logger, "Get Item")).toThrow(
      /Failed to get item/i,
    );
  });
});
