import type { Connection } from "@prismatic-io/spectral";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import Odoo from "odoo-await";
import { odooBasicAuth } from "../../connections/odooBasicAuth";
import { type Mock, vi } from "vitest";
import { rawRequest } from "./rawRequest";
vi.mock("odoo-await");
nock.disableNetConnect();
const MockedOdoo = Odoo as unknown as Mock;
const legacyConnection = createConnection(odooBasicAuth, {
  baseUrl: "https://odoo.example.com",
  db: "odoo_db",
  username: "john.doe@example.com",
  password: "test-password",
}) as unknown as Connection;
describe("rawRequest", () => {
  let connect: Mock;
  let executeKw: Mock;
  beforeEach(() => {
    connect = vi.fn().mockResolvedValue(undefined);
    executeKw = vi.fn();
    MockedOdoo.mockReset();
    // biome-ignore lint/complexity/useArrowFunction: the code under test calls `new Odoo(...)`, and vitest only allows `new` on a constructible mock implementation.
    MockedOdoo.mockImplementation(function () {
      return { connect, execute_kw: executeKw };
    });
  });
  afterEach(() => nock.cleanAll());
  test("forwards the model, method, and positional arguments to execute_kw and returns the result untouched", async () => {
    const passthroughResult = [{ id: 7, name: "Acme Corporation" }];
    executeKw.mockResolvedValue(passthroughResult);
    const { result } = await invoke(rawRequest, {
      connection: legacyConnection,
      model: "res.partner",
      method: "search_read",
      parameters: [[["id", "=", 7]], ["id", "name"]],
    });
    expect(MockedOdoo).toHaveBeenCalledWith({
      baseUrl: "https://odoo.example.com",
      port: undefined,
      db: "odoo_db",
      username: "john.doe@example.com",
      password: "test-password",
    });
    expect(connect).toHaveBeenCalledTimes(1);
    expect(executeKw).toHaveBeenCalledWith("res.partner", "search_read", [
      [["id", "=", 7]],
      ["id", "name"],
    ]);
    expect(result.data).toEqual(passthroughResult);
  });
});
