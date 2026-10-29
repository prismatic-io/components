import {
  createConnection,
  invoke,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import type { GetCampaignResponseCollectionCompoundDocument } from "klaviyo-api";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getApi } from "../../api";
import { klaviyoApiKeyConnection } from "../../connections/klaviyoApiKeyConnection";
import { listCampaignsExamplePayload } from "../../examplePayloads";
import { listCampaigns } from "./listCampaigns";

vi.mock("../../api", () => ({ getApi: vi.fn() }));

const connection = createConnection(klaviyoApiKeyConnection, {
  apiKey: "pk_test",
});

type Params = Parameters<typeof listCampaigns.perform>[1];

const FILTER = "equals(messages.channel,'email')";
const SELF_LINK = "https://a.klaviyo.com/api/campaigns";
const NEXT_CURSOR = "https://a.klaviyo.com/api/campaigns?page[cursor]=abc";

describe("listCampaigns", () => {
  afterEach(() => vi.clearAllMocks());

  it("aggregates every page, forwarding the filter, mapped fields and cursor", async () => {
    const firstPage = structuredClone(listCampaignsExamplePayload.data);
    firstPage.links = { self: SELF_LINK, next: NEXT_CURSOR };
    const secondPage = structuredClone(listCampaignsExamplePayload.data);
    secondPage.data = secondPage.data.map((campaign) => ({
      ...campaign,
      id: `${campaign.id}-page2`,
    }));
    secondPage.links = { self: NEXT_CURSOR };
    const expectedIds = [
      ...firstPage.data.map((campaign) => campaign.id),
      ...secondPage.data.map((campaign) => campaign.id),
    ];

    const getCampaignsMock = vi
      .fn()
      .mockResolvedValueOnce({ body: firstPage })
      .mockResolvedValueOnce({ body: secondPage });
    vi.mocked(getApi).mockReturnValue({
      getCampaigns: getCampaignsMock,
    } as unknown as ReturnType<typeof getApi>);

    const { result } = await invoke(
      listCampaigns,
      {
        connection,
        filterCampaigns: FILTER,
        fieldsCampaign: ["name", "send_strategy.options_sto"],
      } as unknown as Params,
      { logger: loggerMock() },
    );

    const expectedFields = [
      "name",
      "send_strategy.date",
      "send_strategy.method",
    ];
    expect(getCampaignsMock).toHaveBeenCalledTimes(2);
    expect(getCampaignsMock).toHaveBeenNthCalledWith(1, FILTER, {
      fieldsCampaign: expectedFields,
      pageCursor: undefined,
    });
    expect(getCampaignsMock).toHaveBeenNthCalledWith(2, FILTER, {
      fieldsCampaign: expectedFields,
      pageCursor: NEXT_CURSOR,
    });
    const document =
      result.data as GetCampaignResponseCollectionCompoundDocument;
    expect(document.data.map((campaign) => campaign.id)).toEqual(expectedIds);
    expect(document.links?.next).toBeUndefined();
  });
});
