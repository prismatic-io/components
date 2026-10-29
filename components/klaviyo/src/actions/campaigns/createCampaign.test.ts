import {
  createConnection,
  invoke,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getApi } from "../../api";
import { klaviyoApiKeyConnection } from "../../connections/klaviyoApiKeyConnection";
import { createCampaignExamplePayload } from "../../examplePayloads";
import { createCampaign } from "./createCampaign";
vi.mock("../../api", () => ({ getApi: vi.fn() }));
const connection = createConnection(klaviyoApiKeyConnection, {
  apiKey: "pk_test",
});
const stubApi = (createCampaignMock: ReturnType<typeof vi.fn>) => {
  vi.mocked(getApi).mockReturnValue({
    createCampaign: createCampaignMock,
  } as unknown as ReturnType<typeof getApi>);
};
type Params = Parameters<typeof createCampaign.perform>[1];
describe("createCampaign", () => {
  afterEach(() => vi.clearAllMocks());
  it("converts legacy inputs to the current revision and returns the body", async () => {
    const body = structuredClone(createCampaignExamplePayload.data);
    const createCampaignMock = vi.fn().mockResolvedValue({ body });
    stubApi(createCampaignMock);
    const { result } = await invoke(
      createCampaign,
      {
        connection,
        campaignName: "Legacy campaign",
        campaignMessages: [
          {
            type: "campaign-message",
            attributes: {
              channel: "email",
              label: "My message",
              content: { subject: "Hello" },
              renderOptions: { shortenLinks: true },
            },
          },
        ],
        includedAudiences: ["X7MYfE"],
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
          sendOptions: { useSmartSending: true },
          trackingOptions: {
            isAddUtm: true,
            utmParams: [{ name: "utm_source", value: "klaviyo" }],
          },
        },
      } as unknown as Params,
      { logger: loggerMock() },
    );
    expect(createCampaignMock).toHaveBeenCalledTimes(1);
    expect(createCampaignMock).toHaveBeenCalledWith({
      data: {
        type: "campaign",
        attributes: {
          name: "Legacy campaign",
          sendStrategy: {
            method: "static",
            datetime: "2026-11-01T00:00:00+00:00",
            options: { isLocal: false },
          },
          sendOptions: { useSmartSending: true },
          trackingOptions: {
            addTrackingParams: true,
            customTrackingParams: [
              { type: "static", name: "utm_source", value: "klaviyo" },
            ],
          },
          campaignMessages: {
            data: [
              {
                type: "campaign-message",
                attributes: {
                  definition: {
                    channel: "email",
                    label: "My message",
                    content: { subject: "Hello" },
                  },
                },
              },
            ],
          },
          audiences: { included: ["X7MYfE"], excluded: undefined },
        },
      },
    });
    expect(result).toEqual({ data: body });
  });
  it("passes current-revision inputs through unchanged", async () => {
    const body = structuredClone(createCampaignExamplePayload.data);
    const createCampaignMock = vi.fn().mockResolvedValue({ body });
    stubApi(createCampaignMock);
    const sendStrategy = {
      method: "static",
      datetime: "2026-11-01T00:00:00+00:00",
      options: { isLocal: true, sendPastRecipientsImmediately: false },
    };
    const trackingOptions = {
      addTrackingParams: true,
      customTrackingParams: [
        { type: "static", name: "utm_medium", value: "campaign" },
      ],
      isTrackingClicks: true,
    };
    const campaignMessages = [
      {
        type: "campaign-message",
        attributes: {
          definition: {
            channel: "email",
            label: "My message",
            content: { subject: "Hello" },
          },
        },
      },
    ];
    await invoke(
      createCampaign,
      {
        connection,
        campaignName: "Current campaign",
        campaignMessages: structuredClone(campaignMessages),
        includedAudiences: ["X7MYfE"],
        excludedAudiences: ["Y8NZgF"],
        campaignConfig: {
          sendStrategy: structuredClone(sendStrategy),
          sendOptions: undefined,
          trackingOptions: structuredClone(trackingOptions),
        },
      } as unknown as Params,
      { logger: loggerMock() },
    );
    const [query] = createCampaignMock.mock.calls[0];
    expect(query.data.attributes.sendStrategy).toEqual(sendStrategy);
    expect(query.data.attributes.trackingOptions).toEqual(trackingOptions);
    expect(query.data.attributes.campaignMessages).toEqual({
      data: campaignMessages,
    });
    expect(query.data.attributes.audiences).toEqual({
      included: ["X7MYfE"],
      excluded: ["Y8NZgF"],
    });
  });
  it("propagates an API error", async () => {
    const error = Object.assign(new Error("Bad Request"), {
      response: { status: 400 },
    });
    stubApi(vi.fn().mockRejectedValue(error));
    await expect(
      invoke(
        createCampaign,
        {
          connection,
          campaignName: "Broken campaign",
          campaignMessages: [],
          includedAudiences: ["X7MYfE"],
          excludedAudiences: undefined,
          campaignConfig: {},
        } as unknown as Params,
        { logger: loggerMock() },
      ),
    ).rejects.toBe(error);
  });
});
