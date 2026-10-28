import type { MockedFunction } from "vitest";
import { getHubspotClient } from "../../client";
import { privateAppAccessToken } from "../../connections";
import { archiveAssociations } from "./archiveAssociations";
import { createAssociations } from "./createAssociations";
import { listAssociationTypes } from "./listAssociationTypes";
import { readAssociations } from "./readAssociations";
vi.mock("../../client");
const mockedGetHubspotClient = getHubspotClient as MockedFunction<
  typeof getHubspotClient
>;
const context = { debug: { enabled: false } } as never;
const hubspotConnection = { key: privateAppAccessToken.key, fields: {} };
const base = {
  hubspotConnection,
  timeout: undefined,
  fromObjectType: "contacts",
  toObjectType: "companies",
};
const labelsBody = {
  results: [
    { category: "HUBSPOT_DEFINED", typeId: 1, label: "Primary" },
    { category: "USER_DEFINED", typeId: 7, label: "Decision Maker" },
  ],
};
const LABELS_PATH = "/crm/associations/2026-09/contacts/companies/labels";
const mockClient = (responses: { get?: unknown; post?: unknown }) => {
  const get = vi.fn().mockResolvedValue({ data: responses.get });
  const post = vi.fn().mockResolvedValue({ data: responses.post });
  mockedGetHubspotClient.mockReturnValue({ get, post } as never);
  return { get, post };
};
beforeEach(() => vi.clearAllMocks());
describe("listAssociationTypes", () => {
  test("reads the dated labels path and returns v3 and dated keys", async () => {
    const { get } = mockClient({ get: labelsBody });
    const result = await listAssociationTypes.perform(context, base as never);
    expect(get).toHaveBeenCalledWith(LABELS_PATH);
    expect(result).toEqual({
      data: {
        results: [
          {
            id: "1",
            name: "Primary",
            category: "HUBSPOT_DEFINED",
            typeId: 1,
            label: "Primary",
          },
          {
            id: "7",
            name: "Decision Maker",
            category: "USER_DEFINED",
            typeId: 7,
            label: "Decision Maker",
          },
        ],
      },
    });
  });
});
describe("readAssociations", () => {
  test("posts to dated batch/read and maps each target", async () => {
    const { post } = mockClient({
      post: {
        status: "COMPLETE",
        results: [
          {
            from: { id: "1" },
            to: [
              {
                toObjectId: "10",
                associationTypes: [
                  {
                    category: "USER_DEFINED",
                    typeId: 7,
                    label: "Decision Maker",
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    const result = (await readAssociations.perform(context, {
      ...base,
      fromId: "1",
    } as never)) as {
      data: {
        status: string;
        results: {
          to: unknown[];
        }[];
      };
    };
    expect(post).toHaveBeenCalledWith(
      "/crm/associations/2026-09/contacts/companies/batch/read",
      {
        inputs: [{ id: "1" }],
      },
    );
    expect(result.data.status).toBe("COMPLETE");
    expect(result.data.results[0].to).toEqual([
      {
        id: "10",
        type: "Decision Maker",
        toObjectId: "10",
        associationTypes: [
          { category: "USER_DEFINED", typeId: 7, label: "Decision Maker" },
        ],
      },
    ]);
  });
});
describe("createAssociations", () => {
  const created = {
    status: "COMPLETE",
    startedAt: "s",
    completedAt: "c",
    results: [
      {
        fromObjectId: "1",
        fromObjectTypeId: "0-1",
        toObjectId: "2",
        toObjectTypeId: "0-2",
        labels: ["Decision Maker"],
      },
    ],
  };
  test("resolves a numeric type and posts the labeled batch/create body", async () => {
    const { get, post } = mockClient({ get: labelsBody, post: created });
    const result = (await createAssociations.perform(context, {
      ...base,
      fromId: "1",
      toId: "2",
      associateType: "7",
    } as never)) as {
      data: {
        results: Record<string, unknown>[];
      };
    };
    expect(get).toHaveBeenCalledWith(LABELS_PATH);
    expect(post).toHaveBeenCalledWith(
      "/crm/associations/2026-09/contacts/companies/batch/create",
      {
        inputs: [
          {
            from: { id: "1" },
            to: { id: "2" },
            types: [
              { associationCategory: "USER_DEFINED", associationTypeId: 7 },
            ],
          },
        ],
      },
    );
    expect(result.data.results[0]).toEqual({
      from: { id: "1" },
      to: { id: "2" },
      type: "7",
      ...created.results[0],
    });
  });
  test("a name returned by List Association Types resolves in Create", async () => {
    mockClient({ get: labelsBody });
    const listed = (await listAssociationTypes.perform(
      context,
      base as never,
    )) as {
      data: {
        results: {
          name: string;
        }[];
      };
    };
    const name = listed.data.results[1].name;
    const { post } = mockClient({ get: labelsBody, post: created });
    await createAssociations.perform(context, {
      ...base,
      fromId: "1",
      toId: "2",
      associateType: name,
    } as never);
    expect(post.mock.calls[0][1].inputs[0].types).toEqual([
      { associationCategory: "USER_DEFINED", associationTypeId: 7 },
    ]);
  });
  test("an unknown type throws before any write", async () => {
    const { post } = mockClient({ get: labelsBody });
    await expect(
      createAssociations.perform(context, {
        ...base,
        fromId: "1",
        toId: "2",
        associateType: "contact_to_company",
      } as never),
    ).rejects.toThrow(/contact_to_company/);
    expect(post).not.toHaveBeenCalled();
  });
});
describe("archiveAssociations", () => {
  test("resolves the type and posts to dated batch/labels/archive, returning the response", async () => {
    const envelope = {
      status: "COMPLETE",
      startedAt: "s",
      completedAt: "c",
      results: [],
    };
    const { post } = mockClient({ get: labelsBody, post: envelope });
    const result = await archiveAssociations.perform(context, {
      ...base,
      fromId: "1",
      toId: "2",
      associateType: "Primary",
    } as never);
    expect(post).toHaveBeenCalledWith(
      "/crm/associations/2026-09/contacts/companies/batch/labels/archive",
      {
        inputs: [
          {
            from: { id: "1" },
            to: { id: "2" },
            types: [
              { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 1 },
            ],
          },
        ],
      },
    );
    expect(result).toEqual({ data: envelope });
  });
});
