import * as http from "node:http";
import axios from "axios";
import {
  toOptionalBoolean,
  toOptionalNumber,
  toOptionalString,
} from "../util/cleanHelpers";
describe("toOptionalBoolean", () => {
  it("maps the two explicit choices to booleans", () => {
    expect(toOptionalBoolean("true")).toBe(true);
    expect(toOptionalBoolean("false")).toBe(false);
  });
  it("maps 'na' to undefined so the filter is omitted", () => {
    expect(toOptionalBoolean("na")).toBeUndefined();
  });
  it("maps blank and nullish values to undefined", () => {
    expect(toOptionalBoolean("")).toBeUndefined();
    expect(toOptionalBoolean(undefined)).toBeUndefined();
    expect(toOptionalBoolean(null)).toBeUndefined();
  });
});
describe("optional string and number cleaning", () => {
  it("drops blank values so they are never sent as empty params", () => {
    expect(toOptionalString("")).toBeUndefined();
    expect(toOptionalNumber("")).toBeUndefined();
  });
  it("preserves a deliberate zero", () => {
    expect(toOptionalNumber("0")).toBe(0);
  });
});
describe("query param serialization", () => {
  let server: http.Server;
  let serverPort: number;
  let receivedUrl: string;
  beforeAll(async () => {
    server = http.createServer((req, res) => {
      receivedUrl = req.url ?? "";
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end("{}");
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
  it("omits undefined and null while keeping zero and false", async () => {
    await axios.get(`http://127.0.0.1:${serverPort}/items`, {
      params: {
        name: "widget",
        description: undefined,
        categoryGuid: null,
        offset: 0,
        limit: 50,
        modifiedBom: false,
      },
    });
    expect(receivedUrl).toBe(
      "/items?name=widget&offset=0&limit=50&modifiedBom=false",
    );
  });
});
