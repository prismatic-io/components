import {
  createConnection,
  invoke,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getApi } from "../../api";
import { klaviyoApiKeyConnection } from "../../connections/klaviyoApiKeyConnection";
import { updateCampaignExamplePayload } from "../../examplePayloads";
import { updateCampaign } from "./updateCampaign";

vi.mock("../../api", () => ({ getApi: vi.fn() }));

const connection = createConnection(klaviyoApiKeyConnection, {
  apiKey: "pk_test",
});

const stubApi = (updateCampaignMock: ReturnType<typeof vi.fn>) => {
  vi.mocked(getApi).mockReturnValue({
    updateCampaign: updateCampaignMock,
  } as unknown as ReturnType<typeof getApi>);
};

type Params = Parameters<typeof updateCampaign.perform>[1];

const CAMPAIGN_ID = "01J2DNH88028WCAA2RK0BYBZVG";

describe("updateCampaign", () => {
  afterEach(() => vi.clearAllMocks());

  it("sends the campaign ID with converted legacy options and returns the body", async () => {
    const body = structuredClone(updateCampaignExamplePayload.data);
    const updateCampaignMock = vi.fn().mockResolvedValue({ body });
    stubApi(updateCampaignMock);

    const { result } = await invoke(
      updateCampaign,
      {
        connection,
        campaignId: CAMPAIGN_ID,
        campaignName: undefined,
        includedAudiences: undefined,
        excludedAudiences: undefined,
        campaignConfig: {
          sendStrategy: {
            method: "static",
            optionsStatic: {
              datetime: "2026-11-01T00:00:00+00:00",
              isLocal: false,
              sendPastRecipientsImmediately: false,
            },
          },
          sendOptions: undefined,
          trackingOptions: {
            isAddUtm: true,
            utmParams: [{ name: "utm_source", value: "klaviyo" }],
          },
        },
      } as unknown as Params,
      { logger: loggerMock() },
    );

    expect(updateCampaignMock).toHaveBeenCalledTimes(1);
    expect(updateCampaignMock).toHaveBeenCalledWith(CAMPAIGN_ID, {
      data: {
        type: "campaign",
        id: CAMPAIGN_ID,
        attributes: {
          name: undefined,
          sendStrategy: {
            method: "static",
            datetime: "2026-11-01T00:00:00+00:00",
            options: { isLocal: false },
          },
          sendOptions: undefined,
          trackingOptions: {
            addTrackingParams: true,
            customTrackingParams: [
              { type: "static", name: "utm_source", value: "klaviyo" },
            ],
          },
          audiences: { included: undefined, excluded: undefined },
        },
      },
    });
    const [, query] = updateCampaignMock.mock.calls[0];
    expect(query.data.attributes.name).toBeUndefined();
    expect(query.data.attributes.audiences.included).toBeUndefined();
    expect(result).toEqual({ data: body });
  });

  it("propagates an API error", async () => {
    const error = Object.assign(new Error("Bad Request"), {
      response: { status: 400 },
    });
    stubApi(vi.fn().mockRejectedValue(error));

    await expect(
      invoke(
        updateCampaign,
        {
          connection,
          campaignId: CAMPAIGN_ID,
          campaignName: "Renamed",
          includedAudiences: undefined,
          excludedAudiences: undefined,
          campaignConfig: {},
        } as unknown as Params,
        { logger: loggerMock() },
      ),
    ).rejects.toBe(error);
  });
});
