import type { MockedFunction } from "vitest";
import { getHubspotClient } from "../client";
import { privateAppAccessToken } from "../connections";
import { hubspotPaths } from "../constants";
import { selectAssociationTypeExamplePayload } from "../examplePayloads";
import { fromObjectType, toObjectType } from "../inputs/associations";
import { selectAssociationType } from "./selectAssociationType";
vi.mock("../client");
const mockedGetHubspotClient = getHubspotClient as MockedFunction<
  typeof getHubspotClient
>;
const context = {} as never;
const connection = { key: privateAppAccessToken.key, fields: {} };
const params = {
  connection,
  fromObjectType: "contacts",
  toObjectType: "companies",
};
const LABELS_PATH = "/crm/associations/2026-09/contacts/companies/labels";
const mockGet = (data: unknown) => {
  const get = vi.fn().mockResolvedValue({ data });
  mockedGetHubspotClient.mockReturnValue({ get } as never);
  return get;
};
const run = (overrides: Record<string, unknown> = {}) =>
  selectAssociationType.perform(context, { ...params, ...overrides } as never);
beforeEach(() => vi.clearAllMocks());
describe("selectAssociationType", () => {
  test("reads the dated labels path for the object pair and maps typeId and label", async () => {
    const get = mockGet({
      results: [
        { category: "USER_DEFINED", typeId: 8, label: "Decision Maker" },
      ],
    });
    const result = await run();
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(LABELS_PATH);
    expect(LABELS_PATH).toBe(
      hubspotPaths.associations("contacts", "companies", "/labels"),
    );
    expect(result).toEqual({ result: [{ label: "Decision Maker", key: "8" }] });
  });
  test("uses the given fromObjectType and toObjectType in the path", async () => {
    const get = mockGet({ results: [] });
    await run({ fromObjectType: "deals", toObjectType: "line_items" });
    expect(get).toHaveBeenCalledWith(
      "/crm/associations/2026-09/deals/line_items/labels",
    );
  });
  test("an unlabeled type gets the label Type <typeId>", async () => {
    mockGet({
      results: [
        { category: "HUBSPOT_DEFINED", typeId: 279, label: null },
        { category: "HUBSPOT_DEFINED", typeId: 280, label: "" },
        { category: "HUBSPOT_DEFINED", typeId: 281, label: "   " },
        { category: "HUBSPOT_DEFINED", typeId: 282 },
      ],
    });
    const result = await run();
    expect(result).toEqual({
      result: [
        { label: "Type 279", key: "279" },
        { label: "Type 280", key: "280" },
        { label: "Type 281", key: "281" },
        { label: "Type 282", key: "282" },
      ],
    });
  });
  test("sorts results by label", async () => {
    mockGet({
      results: [
        { category: "HUBSPOT_DEFINED", typeId: 279, label: null },
        { category: "USER_DEFINED", typeId: 8, label: "Decision Maker" },
        { category: "HUBSPOT_DEFINED", typeId: 1, label: "Primary" },
        { category: "USER_DEFINED", typeId: 9, label: "Billing Contact" },
      ],
    });
    const result = await run();
    expect(result.result).toEqual([
      { label: "Billing Contact", key: "9" },
      { label: "Decision Maker", key: "8" },
      { label: "Primary", key: "1" },
      { label: "Type 279", key: "279" },
    ]);
  });
  test("a response shaped like the example payload source produces the example payload", async () => {
    mockGet({
      results: [
        { category: "HUBSPOT_DEFINED", typeId: 279, label: null },
        { category: "USER_DEFINED", typeId: 8, label: "Decision Maker" },
      ],
    });
    expect(await run()).toEqual(selectAssociationTypeExamplePayload);
  });
  test("an empty results array returns an empty list", async () => {
    mockGet({ results: [] });
    expect(await run()).toEqual({ result: [] });
  });
});
describe("selectAssociationType inputs", () => {
  test("object type inputs drop the selectObjectType data source to avoid a circular reference", () => {
    expect(
      selectAssociationType.inputs.fromObjectType.dataSource,
    ).toBeUndefined();
    expect(
      selectAssociationType.inputs.toObjectType.dataSource,
    ).toBeUndefined();
    expect(fromObjectType.dataSource).toBe("selectObjectType");
    expect(toObjectType.dataSource).toBe("selectObjectType");
  });
});
