import * as http from "node:http";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { deleteExtract } from "../actions/extracts/deleteExtract";
import { deleteRequirement } from "../actions/requirements/deleteRequirement";
import { deleteSupplier } from "../actions/suppliers/deleteSupplier";
import { arenaApiKey } from "../connections";
import * as examplePayloads from "../examplePayloads";
import { createTestContext } from "./testContext";
jest.setTimeout(15000);
const DELETE_PAYLOAD_PATTERN = /^(delete|remove)\w*ExamplePayload$/;
const deletePayloadEntries = Object.entries(
  examplePayloads as Record<string, unknown>,
).filter(([name]) => DELETE_PAYLOAD_PATTERN.test(name));
describe("delete example payloads follow one convention", () => {
  it("finds every delete and remove payload", () => {
    expect(deletePayloadEntries.length).toBeGreaterThanOrEqual(37);
  });
  it.each(
    deletePayloadEntries,
  )("%s declares success and a message", (_name, payload) => {
    const { data } = payload as {
      data?: unknown;
    };
    expect(data).toMatchObject({
      success: true,
      message: expect.stringMatching(/\S/),
    });
  });
});
describe("delete performs return what the convention promises", () => {
  let server: http.Server;
  let serverPort: number;
  beforeAll(async () => {
    server = http.createServer((_req, res) => {
      res.writeHead(204);
      res.end();
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
  const connection = () =>
    createConnection(arenaApiKey, {
      baseUrl: "custom",
      customBaseUrl: `http://127.0.0.1:${serverPort}`,
      apiKey: "fake-api-key",
      timeout: "3000",
    });
  it("deleteExtract builds the object rather than passing an empty body through", async () => {
    const { result } = await invoke(
      deleteExtract,
      { connection: connection(), extractGuid: "EXT123DEF456GHI789JKL012" },
      createTestContext(),
    );
    expect(result).toEqual(examplePayloads.deleteExtractExamplePayload);
  });
  it("deleteRequirement builds the object", async () => {
    const { result } = await invoke(
      deleteRequirement,
      { connection: connection(), requirementGuid: "RQ1AB2CD3EF4GH5IJ6KL7MN8" },
      createTestContext(),
    );
    expect(result).toEqual(examplePayloads.deleteRequirementExamplePayload);
  });
  it("deleteSupplier builds the object, replacing its bespoke { deleted } shape", async () => {
    const { result } = await invoke(
      deleteSupplier,
      { connection: connection(), supplierGuid: "ABC123DEF456GHI789JKL012" },
      createTestContext(),
    );
    expect(result).toEqual(examplePayloads.deleteSupplierExamplePayload);
  });
});
