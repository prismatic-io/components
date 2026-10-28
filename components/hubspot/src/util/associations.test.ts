import {
  mapAssociationTypes,
  mapCreatedAssociations,
  mapReadAssociations,
  resolveAssociationSpec,
} from "./associations";
const labels = {
  results: [
    { category: "HUBSPOT_DEFINED", typeId: 1, label: "Primary" },
    { category: "HUBSPOT_DEFINED", typeId: 279 },
    { category: "USER_DEFINED", typeId: 7, label: "Decision Maker" },
  ],
};
const clientWith = (data: unknown = labels) => {
  const get = vi.fn().mockResolvedValue({ data });
  return { client: { get } as never, get };
};
describe("resolveAssociationSpec", () => {
  test("numeric string matches typeId and reads the dated labels path", async () => {
    const { client, get } = clientWith();
    const spec = await resolveAssociationSpec(
      client,
      "contacts",
      "companies",
      "7",
    );
    expect(get).toHaveBeenCalledWith(
      "/crm/associations/2026-09/contacts/companies/labels",
    );
    expect(spec).toEqual({
      associationCategory: "USER_DEFINED",
      associationTypeId: 7,
    });
  });
  test("numeric string with surrounding whitespace still matches typeId", async () => {
    const { client } = clientWith();
    expect(
      await resolveAssociationSpec(client, "contacts", "companies", " 279 "),
    ).toEqual({
      associationCategory: "HUBSPOT_DEFINED",
      associationTypeId: 279,
    });
  });
  test("label matches case-insensitively after trimming", async () => {
    const { client } = clientWith();
    expect(
      await resolveAssociationSpec(
        client,
        "contacts",
        "companies",
        "  decision MAKER ",
      ),
    ).toEqual({ associationCategory: "USER_DEFINED", associationTypeId: 7 });
  });
  test("a numeric string matches typeId, never a label", async () => {
    const { client } = clientWith({
      results: [
        { category: "USER_DEFINED", typeId: 5, label: "7" },
        { category: "USER_DEFINED", typeId: 7, label: "Other" },
      ],
    });
    expect(await resolveAssociationSpec(client, "a", "b", "7")).toEqual({
      associationCategory: "USER_DEFINED",
      associationTypeId: 7,
    });
  });
  test("a miss throws naming the value and the object types", async () => {
    const { client } = clientWith();
    await expect(
      resolveAssociationSpec(
        client,
        "contacts",
        "companies",
        "contact_to_company",
      ),
    ).rejects.toThrow(
      /"contact_to_company"[\s\S]*contacts[\s\S]*companies[\s\S]*numeric association type ID[\s\S]*List Association Types/,
    );
  });
  test("an empty value throws instead of matching an unlabeled type", async () => {
    const { client } = clientWith();
    await expect(
      resolveAssociationSpec(client, "contacts", "companies", "  "),
    ).rejects.toThrow(/numeric association type ID/);
  });
});
describe("mapAssociationTypes", () => {
  test("adds id and name for every entry and keeps the dated keys", () => {
    expect(mapAssociationTypes(labels)).toEqual({
      results: [
        {
          id: "1",
          name: "Primary",
          category: "HUBSPOT_DEFINED",
          typeId: 1,
          label: "Primary",
        },
        {
          id: "279",
          name: "279",
          category: "HUBSPOT_DEFINED",
          typeId: 279,
          label: null,
        },
        {
          id: "7",
          name: "Decision Maker",
          category: "USER_DEFINED",
          typeId: 7,
          label: "Decision Maker",
        },
      ],
    });
  });
});
describe("mapReadAssociations", () => {
  const envelope = {
    status: "COMPLETE",
    startedAt: "s",
    completedAt: "c",
    results: [
      {
        from: { id: "1" },
        paging: { next: { after: "9" } },
        to: [
          {
            toObjectId: "10",
            associationTypes: [
              { category: "USER_DEFINED", typeId: 7, label: "Decision Maker" },
              { category: "HUBSPOT_DEFINED", typeId: 1 },
            ],
          },
          {
            toObjectId: "11",
            associationTypes: [{ category: "HUBSPOT_DEFINED", typeId: 279 }],
          },
          { toObjectId: "12", associationTypes: [] },
        ],
      },
    ],
  };
  test("emits one v3-style target per (record, association type) and preserves the envelope", () => {
    const out = mapReadAssociations(envelope) as typeof envelope;
    expect(out.status).toBe("COMPLETE");
    expect(out.results[0].from).toEqual({ id: "1" });
    expect(out.results[0].paging).toEqual({ next: { after: "9" } });
    expect(out.results[0].to).toEqual([
      {
        id: "10",
        type: "Decision Maker",
        toObjectId: "10",
        associationTypes: [
          { category: "USER_DEFINED", typeId: 7, label: "Decision Maker" },
        ],
      },
      {
        id: "10",
        type: "1",
        toObjectId: "10",
        associationTypes: [{ category: "HUBSPOT_DEFINED", typeId: 1 }],
      },
      {
        id: "11",
        type: "279",
        toObjectId: "11",
        associationTypes: [{ category: "HUBSPOT_DEFINED", typeId: 279 }],
      },
      { id: "12", toObjectId: "12", associationTypes: [] },
    ]);
  });
});
describe("mapCreatedAssociations", () => {
  test("adds v3 from/to/type next to the labeled pair fields and keeps the envelope", () => {
    const pair = {
      fromObjectId: "1",
      fromObjectTypeId: "0-1",
      toObjectId: "2",
      toObjectTypeId: "0-2",
      labels: ["Decision Maker"],
    };
    const out = mapCreatedAssociations(
      { status: "COMPLETE", startedAt: "s", completedAt: "c", results: [pair] },
      "decision maker",
    );
    expect(out).toEqual({
      status: "COMPLETE",
      startedAt: "s",
      completedAt: "c",
      results: [
        { from: { id: "1" }, to: { id: "2" }, type: "decision maker", ...pair },
      ],
    });
  });
});
