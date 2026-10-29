import type { MockedFunction } from "vitest";
import { getHubspotClient } from "../../client";
import { createCustomObject } from "./createCustomObject";

vi.mock("../../client");

const mockedGetHubspotClient = getHubspotClient as MockedFunction<
  typeof getHubspotClient
>;

const context = { debug: { enabled: false } } as never;

const baseParams = (overrides: Record<string, unknown> = {}) =>
  ({
    hubspotConnection: {
      key: "privateAppAccessToken",
      fields: { accessToken: "t" },
    },
    timeout: undefined,
    singularLabel: "Equipment",
    pluralLabel: "Equipments",
    requiredProperties: ["name"],
    searchableProperties: ["name"],
    secondaryDisplayProperties: [],
    properties: [
      { name: "name", label: "Name", type: "string", fieldType: "text" },
    ],
    associatedObjects: ["CONTACT"],
    name: "equipment",
    fieldValues: {},
    dynamicValues: {},
    ...overrides,
  }) as never;

const run = async (overrides: Record<string, unknown> = {}) => {
  const post = vi.fn().mockResolvedValue({ data: { id: "1" } });
  mockedGetHubspotClient.mockReturnValue({ post } as never);
  await createCustomObject.perform(context, baseParams(overrides));
  return post;
};

beforeEach(() => vi.clearAllMocks());

describe("createCustomObject", () => {
  test("posts to the dated schemas path and defaults allowsSensitiveProperties to false", async () => {
    const post = await run();

    expect(post).toHaveBeenCalledWith(
      "/crm-object-schemas/2026-09/schemas",
      expect.objectContaining({
        name: "equipment",
        allowsSensitiveProperties: false,
      }),
    );
  });

  test("lets a value supplied in fieldValues win over the default", async () => {
    const post = await run({
      fieldValues: { allowsSensitiveProperties: true },
    });

    expect(post.mock.calls[0][1].allowsSensitiveProperties).toBe(true);
  });

  test("lets a value supplied in dynamicValues win over the default", async () => {
    const post = await run({
      dynamicValues: { allowsSensitiveProperties: true },
    });

    expect(post.mock.calls[0][1].allowsSensitiveProperties).toBe(true);
  });
});
