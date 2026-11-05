import { createSign, generateKeyPairSync } from "node:crypto";
import { createConnection } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer, aemOAuthWebApp } from "../connections";
import { AEM_ASSETS_EVENT_TYPES, AEM_SITES_EVENT_TYPES } from "../constants";
import {
  aemAssetsEventWebhookExamplePayload,
  aemSitesEventWebhookExamplePayload,
} from "../examplePayloads";
import type { AemChangeItem, AemEventEnvelope, AemWebhookFlowState } from "../types";
import { clearPublicKeyCache } from "../utils";
import { aemAssetsEventWebhook } from "./aemAssetsEventWebhook";
import { aemSitesEventWebhook } from "./aemSitesEventWebhook";

type PerformContext = Parameters<typeof aemSitesEventWebhook.perform>[0];
type PerformPayload = Parameters<typeof aemSitesEventWebhook.perform>[1];
type LifecycleContext = Parameters<
  NonNullable<typeof aemSitesEventWebhook.webhookLifecycleHandlers>["create"]
>[0];

const TRIGGERS = [
  {
    name: "aemSitesEventWebhook",
    trigger: aemSitesEventWebhook,
    label: "AEM Sites Event Subscription",
    examplePayload: aemSitesEventWebhookExamplePayload,
    eventTypes: AEM_SITES_EVENT_TYPES.map((t) => t.value as string),
    providerId: "61378e83-878f-409c-ade1-0e3482aa90a7",
  },
  {
    name: "aemAssetsEventWebhook",
    trigger: aemAssetsEventWebhook,
    label: "AEM Assets Event Subscription",
    examplePayload: aemAssetsEventWebhookExamplePayload,
    eventTypes: AEM_ASSETS_EVENT_TYPES.map((t) => t.value as string),
    providerId: "5b0beec8-725f-4881-97f4-bfb8bfb4b6d5",
  },
];

const CLIENT_ID = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6";
const KEY_HOST = "https://static.adobeioevents.com";
const KEY_PATH = "/prod/keys/pub-key-test.pem";
const IO_EVENTS = "https://api.adobe.io";
const WORKSPACE = "/events/123456/4566206088344794931/4566206088344853970";
const WEBHOOK_URL = "https://hooks.example.com/trigger/abc";

const connection = createConnection(
  aemOAuthServerToServer,
  {
    aemHost: "author-p12345-e123456.adobeaemcloud.com",
    clientId: CLIENT_ID,
    clientSecret: "test-client-secret",
    scopes: "openid, AdobeID",
    tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
  },
  { access_token: "test-access-token" },
);

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const publicPem = publicKey.export({ type: "spki", format: "pem" }).toString();
const sign = (body: string) => createSign("RSA-SHA256").update(body).sign(privateKey, "base64");

const performContext = (isSimulatedTestExecution = false) =>
  ({
    isSimulatedTestExecution,
    debug: { enabled: false },
    logger: { debug: vi.fn(), info: vi.fn() },
  }) as unknown as PerformContext;

const signedHeaders = (body: string) => ({
  "Content-Type": "application/cloudevents+json",
  "X-Adobe-Digital-Signature-1": sign(body),
  "X-Adobe-Public-Key1-Path": KEY_PATH,
});

const bodyItem = (result: Awaited<ReturnType<typeof aemSitesEventWebhook.perform>>) =>
  (result as { payload: { body: { data: AemChangeItem & AemEventEnvelope } } }).payload.body.data;

beforeAll(() => nock.disableNetConnect());
beforeEach(() => clearPublicKeyCache());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

describe.each(TRIGGERS)("$name", ({ trigger, label, examplePayload, eventTypes, providerId }) => {
  const defaultEventType = eventTypes[0];
  const params = (eventTypes: string[] = [defaultEventType]) => ({
    connection,
    consumerOrgId: "123456",
    projectId: "4566206088344794931",
    workspaceId: "4566206088344853970",
    providerId,
    eventTypes,
    publishBaseUrl: "https://www.example.com",
  });

  const exampleEvent = (examplePayload.payload.body.data as { record: { data: object } }).record
    .data as Record<string, unknown>;

  const deliveryPayload = (
    event: Record<string, unknown>,
    headers: Record<string, string>,
    rawBody = JSON.stringify(event),
  ) =>
    ({
      ...examplePayload.payload,
      headers,
      queryParameters: {},
      rawBody: { data: Buffer.from(rawBody) },
      body: { data: event },
    }) as unknown as PerformPayload;

  describe("challenge", () => {
    test("echoes the challenge as text/plain", async () => {
      const payload = {
        ...examplePayload.payload,
        queryParameters: { challenge: "challenge-123" },
      } as unknown as PerformPayload;
      const result = await trigger.perform(performContext(), payload, params());
      expect((result as { response?: unknown }).response).toEqual({
        statusCode: 200,
        contentType: "text/plain",
        body: "challenge-123",
      });
      const branched = result as { branch?: string; payload: { body: { data: unknown } } };
      expect(branched.branch).toBe("URL Verification");
      expect(branched.payload.body.data).toBeNull();
    });
  });

  describe("signature verification", () => {
    test("accepts a body signed with the published public key", async () => {
      const body = JSON.stringify(exampleEvent);
      nock(KEY_HOST).get(KEY_PATH).reply(200, publicPem);
      const result = await trigger.perform(
        performContext(),
        deliveryPayload(exampleEvent, signedHeaders(body), body),
        params(),
      );
      expect(bodyItem(result)).toEqual(examplePayload.payload.body.data);
      expect((result as { branch?: string }).branch).toBe("Notification");
      expect(nock.isDone()).toBe(true);
    });

    test("accepts the second signature when the first does not verify", async () => {
      const body = JSON.stringify(exampleEvent);
      nock(KEY_HOST)
        .get("/prod/keys/other.pem")
        .reply(200, publicPem)
        .get(KEY_PATH)
        .reply(200, publicPem);
      const result = await trigger.perform(
        performContext(),
        deliveryPayload(
          exampleEvent,
          {
            "X-Adobe-Digital-Signature-1": sign("something else"),
            "X-Adobe-Public-Key1-Path": "/prod/keys/other.pem",
            "X-Adobe-Digital-Signature-2": sign(body),
            "X-Adobe-Public-Key2-Path": KEY_PATH,
          },
          body,
        ),
        params(),
      );
      expect(bodyItem(result).eventId).toBe(exampleEvent.id);
    });

    test("tries the second signature when the first key cannot be fetched", async () => {
      const body = JSON.stringify(exampleEvent);
      nock(KEY_HOST).get("/prod/keys/rotated.pem").reply(404).get(KEY_PATH).reply(200, publicPem);
      const result = await trigger.perform(
        performContext(),
        deliveryPayload(
          exampleEvent,
          {
            "X-Adobe-Digital-Signature-1": sign(body),
            "X-Adobe-Public-Key1-Path": "/prod/keys/rotated.pem",
            "X-Adobe-Digital-Signature-2": sign(body),
            "X-Adobe-Public-Key2-Path": KEY_PATH,
          },
          body,
        ),
        params(),
      );
      expect(bodyItem(result).eventId).toBe(exampleEvent.id);
      expect(nock.isDone()).toBe(true);
    });

    test("rejects a bad signature", async () => {
      const body = JSON.stringify(exampleEvent);
      nock(KEY_HOST).get(KEY_PATH).reply(200, publicPem);
      await expect(
        trigger.perform(
          performContext(),
          deliveryPayload(exampleEvent, signedHeaders("tampered body"), body),
          params(),
        ),
      ).rejects.toThrow("Adobe I/O Events signature verification failed.");
    });

    test("rejects a delivery with no signature headers", async () => {
      await expect(
        trigger.perform(performContext(), deliveryPayload(exampleEvent, {}), params()),
      ).rejects.toThrow("Adobe I/O Events signature verification failed.");
    });

    test("never fetches a key path that is not rooted on the key host", async () => {
      const body = JSON.stringify(exampleEvent);
      await expect(
        trigger.perform(
          performContext(),
          deliveryPayload(
            exampleEvent,
            {
              "X-Adobe-Digital-Signature-1": sign(body),
              "X-Adobe-Public-Key1-Path": "@evil.example/key.pem",
            },
            body,
          ),
          params(),
        ),
      ).rejects.toThrow("Adobe I/O Events signature verification failed.");
    });

    test("skips verification for a simulated test execution", async () => {
      const result = await trigger.perform(
        performContext(true),
        deliveryPayload(exampleEvent, {}),
        params(),
      );
      expect(bodyItem(result).eventType).toBe(exampleEvent.type);
    });

    test("reads a CloudEvent delivered only as raw bytes", async () => {
      const body = JSON.stringify(exampleEvent);
      nock(KEY_HOST).get(KEY_PATH).reply(200, publicPem);
      const payload = {
        ...deliveryPayload(
          exampleEvent,
          {
            ...signedHeaders(body),
            "Content-Type": "application/cloudevents+json; charset=UTF-8",
          },
          body,
        ),
        body: { data: Buffer.from(body) },
      } as unknown as PerformPayload;
      const result = await trigger.perform(performContext(), payload, params());
      expect(bodyItem(result)).toEqual(examplePayload.payload.body.data);
    });

    test("checks the recipient client ID of a raw-bytes delivery", async () => {
      const event = { ...exampleEvent, recipientclientid: "someone-else" };
      const body = JSON.stringify(event);
      nock(KEY_HOST).get(KEY_PATH).reply(200, publicPem);
      const payload = {
        ...deliveryPayload(event, signedHeaders(body), body),
        body: { data: Buffer.from(body) },
      } as unknown as PerformPayload;
      await expect(trigger.perform(performContext(), payload, params())).rejects.toThrow(
        "AEM event was addressed to a different Adobe client ID.",
      );
    });

    test("rejects a delivery whose body is not a JSON CloudEvent", async () => {
      const payload = {
        ...deliveryPayload(exampleEvent, {}, "not json"),
        body: { data: Buffer.from("not json") },
      } as unknown as PerformPayload;
      await expect(trigger.perform(performContext(true), payload, params())).rejects.toThrow(
        "Adobe I/O Events delivered a body that is not a JSON CloudEvent.",
      );
    });

    test("rejects an event addressed to a different client ID", async () => {
      const event = { ...exampleEvent, recipientclientid: "someone-else" };
      const body = JSON.stringify(event);
      nock(KEY_HOST).get(KEY_PATH).reply(200, publicPem);
      await expect(
        trigger.perform(
          performContext(),
          deliveryPayload(event, signedHeaders(body), body),
          params(),
        ),
      ).rejects.toThrow("AEM event was addressed to a different Adobe client ID.");
    });
  });

  describe("event-code mapping", () => {
    const expected: Record<string, [string, string]> = {
      "aem.sites.contentFragment.created": ["contentFragment", "created"],
      "aem.sites.contentFragment.modified": ["contentFragment", "modified"],
      "aem.sites.contentFragment.published": ["contentFragment", "published"],
      "aem.sites.contentFragment.unpublished": ["contentFragment", "unpublished"],
      "aem.sites.contentFragment.deleted": ["contentFragment", "deleted"],
      "aem.sites.page.created": ["page", "created"],
      "aem.sites.page.modified": ["page", "modified"],
      "aem.sites.page.published": ["page", "published"],
      "aem.sites.page.unpublished": ["page", "unpublished"],
      "aem.sites.page.deleted": ["page", "deleted"],
      "aem.assets.asset.processing_completed": ["asset", "created"],
      "aem.assets.asset.metadata_updated": ["asset", "modified"],
      "aem.assets.asset.published": ["asset", "published"],
      "aem.assets.asset.unpublished": ["asset", "unpublished"],
      "aem.assets.asset.deleted": ["asset", "deleted"],
    };

    test("covers every event type the trigger can register for", () => {
      expect(eventTypes.filter((type) => !(type in expected))).toEqual([]);
    });

    test.each(
      Object.entries(expected).filter(([type]) => eventTypes.includes(type)),
    )("maps %s", async (type, [resourceType, changeType]) => {
      const result = await trigger.perform(
        performContext(true),
        deliveryPayload({ ...exampleEvent, type }, {}),
        params(),
      );
      const item = bodyItem(result);
      expect([item.record.resourceType, item.changeType, item.eventType]).toEqual([
        resourceType,
        changeType,
        type,
      ]);
    });

    test("builds the URL from the publish base URL when sourceUrl is only the author origin", async () => {
      const event = {
        ...exampleEvent,
        type: "aem.sites.contentFragment.modified",
        data: {
          id: "06722bff-525f-4c9d-a329-ebb4c9c2aa7a",
          path: "/content/dam/wknd/en/articles/surf-camp",
          sourceUrl: "https://author-p12345-e123456.adobeaemcloud.com",
        },
      };
      const result = await trigger.perform(
        performContext(true),
        deliveryPayload(event, {}),
        params(),
      );
      expect(bodyItem(result).record.url).toBe(
        "https://www.example.com/content/dam/wknd/en/articles/surf-camp",
      );
    });

    test("builds a page URL that the publish tier serves, with the .html extension", async () => {
      const event = {
        ...exampleEvent,
        type: "aem.sites.page.modified",
        data: { path: "/content/wknd/us/en/adventures/surf-camp" },
      };
      const result = await trigger.perform(
        performContext(true),
        deliveryPayload(event, {}),
        params(),
      );
      expect(bodyItem(result).record.url).toBe(
        "https://www.example.com/content/wknd/us/en/adventures/surf-camp.html",
      );
    });

    test("reads an asset event's ID, path and title from its metadata", async () => {
      const event = {
        ...exampleEvent,
        type: "aem.assets.asset.metadata_updated",
        data: {
          repositoryMetadata: {
            "repo:assetId": "urn:aaid:aem:a1213cf3-d3a9-45e7-8248-e77439e90a37",
            "repo:path": "/content/dam/prismatic-test/flower.jpg",
          },
          assetMetadata: { "dc:title": "Flower" },
        },
      };
      const result = await trigger.perform(
        performContext(true),
        deliveryPayload(event, {}),
        params(),
      );
      const { record } = bodyItem(result);
      expect([record.id, record.path, record.title]).toEqual([
        "urn:aaid:aem:a1213cf3-d3a9-45e7-8248-e77439e90a37",
        "/content/dam/prismatic-test/flower.jpg",
        "Flower",
      ]);
    });

    test("passes an unknown action under a known prefix through as modified", async () => {
      const result = await trigger.perform(
        performContext(true),
        deliveryPayload({ ...exampleEvent, type: "aem.sites.page.moved" }, {}),
        params(),
      );
      const item = bodyItem(result);
      expect([item.record.resourceType, item.changeType, item.eventType]).toEqual([
        "page",
        "modified",
        "aem.sites.page.moved",
      ]);
    });

    test("passes an unknown event code through as modified", async () => {
      const result = await trigger.perform(
        performContext(true),
        deliveryPayload({ ...exampleEvent, type: "aem.forms.form.submitted" }, {}),
        params(),
      );
      const item = bodyItem(result);
      expect([item.record.resourceType, item.changeType, item.eventType]).toEqual([
        "unknown",
        "modified",
        "aem.forms.form.submitted",
      ]);
    });
  });

  describe("lifecycle", () => {
    const flow = { id: "flow-1", name: "AEM Flow" };
    const stateKey = `aemEventSubscription:${flow.id}`;

    const lifecycleContext = (crossFlowState: Record<string, unknown> = {}) =>
      ({
        crossFlowState,
        flow,
        webhookUrls: { [flow.name]: WEBHOOK_URL },
        debug: { enabled: false },
        logger: { info: vi.fn(), debug: vi.fn() },
      }) as unknown as LifecycleContext;

    const handlers = trigger.webhookLifecycleHandlers as NonNullable<
      typeof trigger.webhookLifecycleHandlers
    >;

    test("create registers the webhook for the selected events and stores the state", async () => {
      let posted: Record<string, unknown> = {};
      nock(IO_EVENTS)
        .get(`${WORKSPACE}/registrations`)
        .reply(200, { _embedded: { registrations: [] } })
        .post(`${WORKSPACE}/registrations`, (body) => {
          posted = body;
          return true;
        })
        .reply(201, { registration_id: "reg-1", webhook_url: WEBHOOK_URL });
      const selected = eventTypes.slice(0, 2);
      const result = await handlers.create(lifecycleContext(), params(selected));
      expect(posted).toMatchObject({
        client_id: CLIENT_ID,
        delivery_type: "webhook",
        webhook_url: WEBHOOK_URL,
        enabled: true,
        events_of_interest: [
          { provider_id: providerId, event_code: selected[0] },
          { provider_id: providerId, event_code: selected[1] },
        ],
      });
      expect(result).toEqual({
        crossFlowState: {
          [stateKey]: {
            registrationId: "reg-1",
            previousClientId: CLIENT_ID,
            previousEventTypes: selected,
            previousProviderId: providerId,
            previousWorkspace: "/123456/4566206088344794931/4566206088344853970",
          },
        },
      });
      expect(nock.isDone()).toBe(true);
    });

    test("create skips when the stored registration has identical settings", async () => {
      const existing: AemWebhookFlowState = {
        registrationId: "reg-1",
        previousClientId: CLIENT_ID,
        previousEventTypes: [eventTypes[1], eventTypes[0]],
        previousProviderId: providerId,
        previousWorkspace: "/123456/4566206088344794931/4566206088344853970",
      };
      const result = await handlers.create(
        lifecycleContext({ [stateKey]: existing }),
        params([eventTypes[0], eventTypes[1]]),
      );
      expect(result).toBeUndefined();
    });

    test("create deletes the old registration and recreates it when event types change", async () => {
      const existing: AemWebhookFlowState = {
        registrationId: "reg-1",
        previousClientId: CLIENT_ID,
        previousEventTypes: [eventTypes[0]],
        previousProviderId: providerId,
        previousWorkspace: "/123456/4566206088344794931/4566206088344853970",
      };
      let posted: Record<string, unknown> = {};
      nock(IO_EVENTS)
        .get(`${WORKSPACE}/registrations`)
        .reply(200, {
          _embedded: {
            registrations: [
              { registration_id: "reg-1", webhook_url: WEBHOOK_URL },
              { registration_id: "reg-other", webhook_url: "https://hooks.example.com/other" },
            ],
          },
        })
        .delete(`${WORKSPACE}/registrations/reg-1`)
        .reply(204)
        .post(`${WORKSPACE}/registrations`, (body) => {
          posted = body;
          return true;
        })
        .reply(201, { registration_id: "reg-2" });
      const result = await handlers.create(
        lifecycleContext({ [stateKey]: existing }),
        params([eventTypes[1]]),
      );
      expect(posted.events_of_interest).toEqual([
        { provider_id: providerId, event_code: eventTypes[1] },
      ]);
      expect(result).toEqual({
        crossFlowState: {
          [stateKey]: expect.objectContaining({
            registrationId: "reg-2",
            previousEventTypes: [eventTypes[1]],
          }),
        },
      });
      expect(nock.isDone()).toBe(true);
    });

    test("create recreates the registration when the credential's client ID changes", async () => {
      const existing: AemWebhookFlowState = {
        registrationId: "reg-1",
        previousClientId: "0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f",
        previousEventTypes: [eventTypes[0]],
        previousProviderId: providerId,
        previousWorkspace: "/123456/4566206088344794931/4566206088344853970",
      };
      let posted: Record<string, unknown> = {};
      nock(IO_EVENTS)
        .get(`${WORKSPACE}/registrations`)
        .reply(200, {
          _embedded: { registrations: [{ registration_id: "reg-1", webhook_url: WEBHOOK_URL }] },
        })
        .delete(`${WORKSPACE}/registrations/reg-1`)
        .reply(204)
        .post(`${WORKSPACE}/registrations`, (body) => {
          posted = body;
          return true;
        })
        .reply(201, { registration_id: "reg-2" });
      const result = await handlers.create(lifecycleContext({ [stateKey]: existing }), params());
      expect(posted.client_id).toBe(CLIENT_ID);
      expect(result).toEqual({
        crossFlowState: {
          [stateKey]: expect.objectContaining({
            registrationId: "reg-2",
            previousClientId: CLIENT_ID,
          }),
        },
      });
      expect(nock.isDone()).toBe(true);
    });

    test("create sweeps both the old and the new workspace when the workspace changes", async () => {
      const OLD_WORKSPACE = "/events/123456/4566206088344794931/old-workspace";
      const existing: AemWebhookFlowState = {
        registrationId: "reg-old",
        previousClientId: CLIENT_ID,
        previousEventTypes: [eventTypes[0]],
        previousProviderId: providerId,
        previousWorkspace: "/123456/4566206088344794931/old-workspace",
      };
      nock(IO_EVENTS)
        .get(`${OLD_WORKSPACE}/registrations`)
        .reply(200, {
          _embedded: { registrations: [{ registration_id: "reg-old", webhook_url: WEBHOOK_URL }] },
        })
        .delete(`${OLD_WORKSPACE}/registrations/reg-old`)
        .reply(204)
        .get(`${WORKSPACE}/registrations`)
        .reply(200, {
          _embedded: {
            registrations: [{ registration_id: "reg-stale", webhook_url: WEBHOOK_URL }],
          },
        })
        .delete(`${WORKSPACE}/registrations/reg-stale`)
        .reply(204)
        .post(`${WORKSPACE}/registrations`)
        .reply(201, { registration_id: "reg-new" });
      const result = await handlers.create(lifecycleContext({ [stateKey]: existing }), params());
      expect(result).toEqual({
        crossFlowState: { [stateKey]: expect.objectContaining({ registrationId: "reg-new" }) },
      });
      expect(nock.isDone()).toBe(true);
    });

    test("delete removes every registration whose webhook_url matches", async () => {
      nock(IO_EVENTS)
        .get(`${WORKSPACE}/registrations`)
        .reply(200, {
          _embedded: {
            registrations: [
              { registration_id: "reg-1", webhook_url: WEBHOOK_URL },
              { registration_id: "reg-2", webhook_url: WEBHOOK_URL },
              { registration_id: "reg-other", webhook_url: "https://hooks.example.com/other" },
            ],
          },
        })
        .delete(`${WORKSPACE}/registrations/reg-1`)
        .reply(204)
        .delete(`${WORKSPACE}/registrations/reg-2`)
        .reply(204);
      const result = await handlers.delete(lifecycleContext(), params());
      expect(result).toEqual({ crossFlowState: { [stateKey]: null } });
      expect(nock.isDone()).toBe(true);
    });

    const webAppParams = () => ({
      ...params(),
      connection: createConnection(
        aemOAuthWebApp,
        {
          aemHost: "author-p12345-e123456.adobeaemcloud.com",
          authorizeUrl: "https://ims-na1.adobelogin.com/ims/authorize/v2",
          tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
          scopes: "openid,AdobeID",
          clientId: CLIENT_ID,
          clientSecret: "test-client-secret",
        },
        { access_token: "user-access-token" },
      ),
    });

    test("create refuses a Web App connection before calling Adobe I/O Events", async () => {
      await expect(handlers.create(lifecycleContext(), webAppParams())).rejects.toThrow(
        `${label} requires the OAuth 2.0 Client Credentials connection`,
      );
    });

    test("delete with a Web App connection clears state without calling Adobe I/O Events", async () => {
      const result = await handlers.delete(lifecycleContext(), webAppParams());
      expect(result).toEqual({ crossFlowState: { [stateKey]: null } });
    });

    test("create refuses an empty event list before calling Adobe I/O Events", async () => {
      await expect(handlers.create(lifecycleContext(), params([]))).rejects.toThrow(
        `${label} needs at least one event type. Select the events to subscribe to in Event Types.`,
      );
    });

    test("create surfaces a registration failure", async () => {
      nock(IO_EVENTS)
        .get(`${WORKSPACE}/registrations`)
        .reply(200, { _embedded: { registrations: [] } })
        .post(`${WORKSPACE}/registrations`)
        .reply(400, { message: "invalid provider" });
      await expect(handlers.create(lifecycleContext(), params())).rejects.toThrow(
        "Request failed with status code 400",
      );
    });
  });
});
