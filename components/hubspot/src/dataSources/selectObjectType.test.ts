import type { MockedFunction } from "vitest";
import { getHubspotClient } from "../client";
import { privateAppAccessToken } from "../connections";
import { hubspotPaths, STANDARD_OBJECT_TYPES } from "../constants";
import { selectObjectTypeExamplePayload } from "../examplePayloads";
import { selectObjectType } from "./selectObjectType";

vi.mock("../client");

const mockedGetHubspotClient = getHubspotClient as MockedFunction<
  typeof getHubspotClient
>;

const context = {} as never;
const connection = { key: privateAppAccessToken.key, fields: {} };
const SCHEMAS_PATH = "/crm-object-schemas/2026-09/schemas";

const STANDARD = [
  { label: "Contacts", key: "0-1" },
  { label: "Companies", key: "0-2" },
  { label: "Deals", key: "0-3" },
  { label: "Tickets", key: "0-5" },
  { label: "Calls", key: "0-48" },
  { label: "Quotes", key: "0-14" },
  { label: "Line Items", key: "0-8" },
  { label: "Meetings", key: "0-47" },
  { label: "Products", key: "0-7" },
  { label: "Feedback Submissions", key: "0-19" },
];

const mockGet = (data: unknown) => {
  const get = vi.fn().mockResolvedValue({ data });
  mockedGetHubspotClient.mockReturnValue({ get } as never);
  return get;
};

const run = () => selectObjectType.perform(context, { connection } as never);

beforeEach(() => vi.clearAllMocks());

describe("selectObjectType", () => {
  test("reads the dated schemas path exactly once", async () => {
    const get = mockGet({ results: [] });
    await run();
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(SCHEMAS_PATH);
    expect(SCHEMAS_PATH).toBe(hubspotPaths.schemas());
  });

  test("lists the 10 standard objects first, in fixed order, keyed by objectTypeId", async () => {
    mockGet({
      results: [
        {
          objectTypeId: "2-1",
          labels: { singular: "Aardvark", plural: "Aardvarks" },
        },
      ],
    });
    const { result } = await run();
    expect(
      STANDARD_OBJECT_TYPES.map(({ label, key }) => ({ label, key })),
    ).toEqual(STANDARD);
    expect(result.slice(0, 10)).toEqual(STANDARD);
    expect(result).toHaveLength(11);
  });

  test("custom objects follow, keyed by objectTypeId, label falls back plural to singular to name, sorted by label", async () => {
    mockGet({
      results: [
        {
          objectTypeId: "2-300",
          name: "zebra",
          labels: { singular: "Zebra", plural: "Zebras" },
        },
        {
          objectTypeId: "2-100",
          name: "machine",
          labels: { singular: "Machine" },
        },
        { objectTypeId: "2-200", name: "bicycle" },
        {
          objectTypeId: "2-400",
          name: "pet",
          labels: { singular: "", plural: "" },
        },
      ],
    });
    const { result } = await run();
    expect(result.slice(10)).toEqual([
      { label: "bicycle", key: "2-200" },
      { label: "Machine", key: "2-100" },
      { label: "pet", key: "2-400" },
      { label: "Zebras", key: "2-300" },
    ]);
  });

  test("a schema without objectTypeId is skipped", async () => {
    mockGet({
      results: [
        { name: "orphan", labels: { plural: "Orphans" } },
        { objectTypeId: "", name: "blank", labels: { plural: "Blanks" } },
        { objectTypeId: "2-5", name: "kept", labels: { plural: "Kept" } },
      ],
    });
    const { result } = await run();
    expect(result.slice(10)).toEqual([{ label: "Kept", key: "2-5" }]);
  });

  test("an empty results array returns only the standard objects", async () => {
    mockGet({ results: [] });
    expect(await run()).toEqual({ result: STANDARD });
  });

  test("a missing results field returns only the standard objects", async () => {
    mockGet({});
    expect(await run()).toEqual({ result: STANDARD });
  });

  test("a reply built from the example payload's custom entry yields that entry after the standard objects", async () => {
    const standardKeys = new Set(STANDARD.map(({ key }) => key));
    const customEntries = selectObjectTypeExamplePayload.result.filter(
      ({ key }) => !standardKeys.has(key),
    );
    expect(customEntries).toHaveLength(1);
    const [custom] = customEntries;
    mockGet({
      results: [
        {
          objectTypeId: custom.key,
          name: custom.label.toLowerCase(),
          labels: { singular: custom.label, plural: custom.label },
        },
      ],
    });
    const { result } = await run();
    expect(result).toEqual([...STANDARD, custom]);
    expect(
      selectObjectTypeExamplePayload.result.filter(({ key }) =>
        standardKeys.has(key),
      ),
    ).toEqual(STANDARD.slice(0, 3));
  });
});
