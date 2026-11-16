import { vi } from "vitest";
import { oauth } from "../../connections/oauth";
import component from "../..";
import { createConnection, createHarness } from "@prismatic-io/spectral/testing";
import { createClient } from "../../client";
import { listSites } from "./listSites";

vi.mock("../../client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../client")>();
  return { ...actual, createClient: vi.fn(actual.createClient) };
});

describe("listSites", () => {
  test("reads the page size and page token from the pagination group", async () => {
    const getMock = vi.fn().mockResolvedValue({ data: { value: [] } });
    vi.mocked(createClient).mockResolvedValueOnce({ get: getMock } as never);

    await listSites.perform(
      { debug: { enabled: false } } as never,
      {
        connection: { key: "oauth", fields: {}, token: { access_token: "t" } },
        fetchAll: false,
        pagination: { pageLimit: 10, pageToken: "token-1" },
      } as never,
    );

    expect(getMock).toHaveBeenCalledWith("/sites", {
      params: { search: "", $top: 10, $skipToken: "token-1" },
    });
  });
});

const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("sites", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it("should list sites", async () => {
    const result = await harness.action("listSites", {
      connection,
    });
    expect(result).toBeDefined();
  });
});
