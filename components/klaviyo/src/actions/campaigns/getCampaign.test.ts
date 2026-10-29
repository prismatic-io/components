import {
  createConnection,
  invoke,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getApi } from "../../api";
import { klaviyoApiKeyConnection } from "../../connections/klaviyoApiKeyConnection";
import { getCampaignExamplePayload } from "../../examplePayloads";
import { getCampaign } from "./getCampaign";

vi.mock("../../api", () => ({ getApi: vi.fn() }));

const connection = createConnection(klaviyoApiKeyConnection, {
  apiKey: "pk_test",
});

const stubApi = (getCampaignMock: ReturnType<typeof vi.fn>) => {
  vi.mocked(getApi).mockReturnValue({
    getCampaign: getCampaignMock,
  } as unknown as ReturnType<typeof getApi>);
};

type Params = Parameters<typeof getCampaign.perform>[1];

const CAMPAIGN_ID = "01J2DNH88028WCAA2RK0BYBZVG";

describe("getCampaign", () => {
  afterEach(() => vi.clearAllMocks());

  it("maps legacy sparse fields to the current revision and returns the body", async () => {
    const body = structuredClone(getCampaignExamplePayload.data);
    const getCampaignMock = vi.fn().mockResolvedValue({ body });
    stubApi(getCampaignMock);

    const { result } = await invoke(
      getCampaign,
      {
        connection,
        campaignId: CAMPAIGN_ID,
        fieldsCampaign: ["name", "send_strategy.options_static"],
      } as unknown as Params,
      { logger: loggerMock() },
    );

    expect(getCampaignMock).toHaveBeenCalledWith(CAMPAIGN_ID, {
      fieldsCampaign: [
        "name",
        "send_strategy.datetime",
        "send_strategy.options",
        "send_strategy.method",
      ],
    });
    expect(result).toEqual({ data: body });
  });

  it("sends undefined fields when none are selected", async () => {
    const body = structuredClone(getCampaignExamplePayload.data);
    const getCampaignMock = vi.fn().mockResolvedValue({ body });
    stubApi(getCampaignMock);

    await invoke(
      getCampaign,
      {
        connection,
        campaignId: CAMPAIGN_ID,
        fieldsCampaign: undefined,
      } as unknown as Params,
      { logger: loggerMock() },
    );

    expect(getCampaignMock).toHaveBeenCalledWith(CAMPAIGN_ID, {
      fieldsCampaign: undefined,
    });
  });
});
