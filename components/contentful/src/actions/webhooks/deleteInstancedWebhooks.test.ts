import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getSpaceExamplePayload,
  getWebhookExamplePayload,
} from "../../examplePayloads";
import { asCollection, BASE, connection, useNock } from "../../testHelpers";
import { deleteInstancedWebhooks } from "./deleteInstancedWebhooks";
const SPACE_ID = getSpaceExamplePayload.data.sys.id;
const FLOW_URL = "https://hooks.example.com/trigger/flow-a";
const OTHER_URL = "https://hooks.example.com/trigger/flow-b";
const webhook = (id: string, url: string) => ({
  ...getWebhookExamplePayload.data,
  sys: { ...getWebhookExamplePayload.data.sys, id },
  url,
});
const context = {
  webhookUrls: { "Flow A": FLOW_URL, "Flow B": OTHER_URL },
  flow: { id: "flowA", name: "Flow A", stableId: "flowAStable" },
};
const params = { connection, spaceId: SPACE_ID };
describe("deleteInstancedWebhooks", () => {
  useNock();
  test("deletes only webhooks whose URL matches this flow's webhook URL", async () => {
    const scope = nock(BASE)
      .get(`/spaces/${SPACE_ID}`)
      .reply(200, getSpaceExamplePayload.data)
      .get(`/spaces/${SPACE_ID}/webhook_definitions`)
      .query(true)
      .reply(
        200,
        asCollection([
          webhook("hookA1", FLOW_URL),
          webhook("hookB1", OTHER_URL),
          webhook("hookA2", FLOW_URL),
        ]),
      )
      .delete(`/spaces/${SPACE_ID}/webhook_definitions/hookA1`)
      .reply(204)
      .delete(`/spaces/${SPACE_ID}/webhook_definitions/hookA2`)
      .reply(204);
    const { result } = await invoke(deleteInstancedWebhooks, params, context);
    expect(scope.isDone()).toBe(true);
    expect(result).toEqual({ data: { webhooksDeleted: 2 } });
  });
  test("returns a zero count when no webhook matches", async () => {
    nock(BASE)
      .get(`/spaces/${SPACE_ID}`)
      .reply(200, getSpaceExamplePayload.data)
      .get(`/spaces/${SPACE_ID}/webhook_definitions`)
      .query(true)
      .reply(200, asCollection([webhook("hookB1", OTHER_URL)]));
    const { result } = await invoke(deleteInstancedWebhooks, params, context);
    expect(result).toEqual({ data: { webhooksDeleted: 0 } });
  });
  test("error path surfaces a 404 from the space fetch", async () => {
    nock(BASE)
      .get(`/spaces/${SPACE_ID}`)
      .reply(404, { sys: { type: "Error", id: "NotFound" } });
    await expect(
      invoke(deleteInstancedWebhooks, params, context),
    ).rejects.toThrow();
  });
});
