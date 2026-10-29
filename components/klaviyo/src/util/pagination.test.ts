import { describe, expect, it } from "vitest";
import type { CampaignsApi } from "klaviyo-api";
import { fetchCampaigns, getIncludeParams } from "./pagination";

describe("getIncludeParams", () => {
  it("returns empty array when no fields are provided", () => {
    expect(getIncludeParams(undefined, undefined)).toEqual([]);
  });

  it("returns empty array for empty field arrays", () => {
    expect(getIncludeParams([], [])).toEqual([]);
  });

  it("includes 'profile' when fieldsProfile is non-empty", () => {
    expect(getIncludeParams(["email"], undefined)).toEqual(["profile"]);
  });

  it("includes 'metric' when fieldsMetric is non-empty", () => {
    expect(getIncludeParams(undefined, ["name"])).toEqual(["metric"]);
  });

  it("includes both when both are non-empty", () => {
    const result = getIncludeParams(["email"], ["name"]);
    expect(result).toContain("profile");
    expect(result).toContain("metric");
    expect(result).toHaveLength(2);
  });
});

describe("fetchCampaigns", () => {
  const campaign = (id: string) => ({
    type: "campaign",
    id,
    attributes: { name: id },
    links: { self: id },
  });

  it("stops when the response carries no links object", async () => {
    const campaignsApi = {
      getCampaigns: async () => ({ body: { data: [campaign("1")] } }),
    } as unknown as CampaignsApi;

    const result = await fetchCampaigns(campaignsApi, undefined, "filter");
    expect(result.data.map((item) => item.id)).toEqual(["1"]);
  });

  it("follows links.next until it is absent", async () => {
    const calls: (string | undefined)[] = [];
    const campaignsApi = {
      getCampaigns: async (
        _filter: string,
        options: { pageCursor?: string },
      ) => {
        calls.push(options.pageCursor);
        return options.pageCursor
          ? { body: { data: [campaign("2")], links: { self: "s" } } }
          : {
              body: {
                data: [campaign("1")],
                links: { self: "s", next: "cursor-2" },
              },
            };
      },
    } as unknown as CampaignsApi;

    const result = await fetchCampaigns(campaignsApi, ["name"], "filter");
    expect(calls).toEqual([undefined, "cursor-2"]);
    expect(result.data.map((item) => item.id)).toEqual(["1", "2"]);
  });
});
