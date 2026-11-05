import type { TriggerPayload } from "@prismatic-io/spectral";
import type { AemChangeItem, AemEventEnvelope } from "../types";
import { searchAssetsExamplePayload } from "./assets";
import { getContentFragmentExamplePayload } from "./contentFragments";

const exampleAssetSearchHit = searchAssetsExamplePayload.data.hits.results[0];
const exampleContentFragment = getContentFragmentExamplePayload.data;

const exampleTriggerPayloadBase: Omit<TriggerPayload, "headers" | "body"> = {
  queryParameters: {},
  rawBody: { data: null },
  pathFragment: "",
  webhookUrls: {},
  webhookApiKeys: {},
  invokeUrl: "",
  executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
  customer: { id: "testCustomerId", name: "Test Customer", externalId: "testExternalId" },
  instance: { id: "testInstanceId", name: "Test Instance" },
  user: {
    id: "testUserId",
    email: "user@example.com",
    name: "Test User",
    externalId: "testUserExternalId",
  },
  integration: {
    id: "testIntegrationId",
    name: "Test Integration",
    versionSequenceId: "1",
    externalVersion: "",
  },
  flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
  startedAt: "2024-01-15T00:00:00.000Z",
  globalDebug: false,
};

const contentFragmentItem: AemChangeItem = {
  changeType: "published",
  record: {
    resourceType: "contentFragment",
    id: exampleContentFragment.id,
    path: exampleContentFragment.path,
    url: `https://www.example.com${exampleContentFragment.path}`,
    title: exampleContentFragment.title,
    tags: [
      {
        id: "wknd-shared:activity/surfing",
        title: "Surfing",
        titlePath: "WKND Shared : Activity / Surfing",
      },
    ],
    created: "2026-03-02T15:04:11.000Z",
    modified: "2026-09-18T09:21:44.000Z",
    published: "2026-09-18T09:25:02.000Z",
    scope: "/content/dam/wknd-shared/en",
    data: exampleContentFragment,
  },
};

export const contentFragmentChangesExamplePayload = {
  payload: {
    ...exampleTriggerPayloadBase,
    headers: {},
    body: { data: { items: [contentFragmentItem] } },
  },
  polledNoChanges: false,
};

const assetItem: AemChangeItem = {
  changeType: "published",
  record: {
    resourceType: "asset",
    id: exampleAssetSearchHit.assetId,
    path: "/content/dam/wknd-shared/en/city.jpeg",
    url: "https://www.example.com/content/dam/wknd-shared/en/city.jpeg",
    title: "City Skyline",
    tags: [
      {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        title: "City",
        titlePath: "WKND Shared : Region / City",
      },
    ],
    created: "2026-04-14T06:31:07.174Z",
    modified: "2026-04-15T05:01:44.229Z",
    published: "2026-04-15T05:03:47.229Z",
    scope: "urn:aaid:aem:abcd1234-ab12-ab12-ab12-abcdef123456",
    data: exampleAssetSearchHit,
  },
};

export const assetChangesExamplePayload = {
  payload: {
    ...exampleTriggerPayloadBase,
    headers: {},
    body: { data: { items: [assetItem] } },
  },
  polledNoChanges: false,
};

const exampleEvent = {
  specversion: "1.0",
  id: "1b4f6d3e-2a5c-4e8f-9b7a-0c1d2e3f4a5b",
  source: "acct:aem-p12345-e123456@adobe.com",
  type: "aem.sites.page.modified",
  datacontenttype: "application/json",
  time: "2026-09-18T09:25:02.374Z",
  recipientclientid: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
  data: {
    user: {
      imsUserId: "ims-0123456789ABCDEF01234567@techacct.adobe.com",
      principalId: "5f0e1d2c-3b4a-5968-7a8b-9c0d1e2f3a4b@techacct.adobe.com",
      displayName: "5f0e1d2c-3b4a-5968-7a8b-9c0d1e2f3a4b@techacct.adobe.com",
    },
    path: "/content/wknd/us/en/adventures/surf-camp",
    template: { id: "/conf/wknd/settings/wcm/templates/page-content" },
    properties: [
      { name: "cq:lastModified", changeType: "modified" },
      { name: "jcr:title", changeType: "modified" },
    ],
  },
};

const eventItem: AemChangeItem & AemEventEnvelope = {
  changeType: "modified",
  record: {
    resourceType: "page",
    id: "/content/wknd/us/en/adventures/surf-camp",
    path: "/content/wknd/us/en/adventures/surf-camp",
    url: "https://www.example.com/content/wknd/us/en/adventures/surf-camp.html",
    title: null,
    tags: [],
    created: null,
    modified: "2026-09-18T09:25:02.374Z",
    published: null,
    scope: "4566206088344853970",
    data: exampleEvent,
  },
  eventId: exampleEvent.id,
  eventSource: exampleEvent.source,
  eventType: exampleEvent.type,
};

export const aemSitesEventWebhookExamplePayload: { payload: TriggerPayload; branch: string } = {
  payload: {
    ...exampleTriggerPayloadBase,
    headers: { "content-type": "application/cloudevents+json" },
    body: { data: eventItem },
  },
  branch: "Notification",
};

const exampleAssetEvent = {
  specversion: "1.0",
  id: "7c2e9a41-5d3b-4f6a-8e1c-2b9d0f4a6c83",
  source: "acct:aem-p12345-e123456@adobe.com",
  type: "aem.assets.asset.metadata_updated",
  datacontenttype: "application/json",
  time: "2026-09-18T09:31:47.364Z",
  recipientclientid: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
  data: {
    user: {
      imsUserId: "ims-0123456789ABCDEF01234567@techacct.adobe.com",
      principalId: "5f0e1d2c-3b4a-5968-7a8b-9c0d1e2f3a4b@techacct.adobe.com",
    },
    repositoryMetadata: {
      "repo:repositoryId": "author-p12345-e123456.adobeaemcloud.com",
      "repo:assetId": "urn:aaid:aem:5b8f3e2a-9c1d-4e7f-a6b2-3d4c5e6f7a8b",
      "repo:name": "surf-camp-hero.jpg",
      "repo:path": "/content/dam/wknd/en/adventures/surf-camp/surf-camp-hero.jpg",
      "repo:ancestors": ["urn:aaid:aem:1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d"],
      "repo:state": "ACTIVE",
      "repo:createDate": "2026-09-01T14:02:11.985Z",
      "repo:modifyDate": "2026-09-01T14:02:43.218Z",
      "dc:format": "image/jpeg",
      "aem:assetState": "processed",
    },
    assetMetadata: {
      "dc:title": "Surf Camp Hero",
    },
  },
};

const assetEventItem: AemChangeItem & AemEventEnvelope = {
  changeType: "modified",
  record: {
    resourceType: "asset",
    id: "urn:aaid:aem:5b8f3e2a-9c1d-4e7f-a6b2-3d4c5e6f7a8b",
    path: "/content/dam/wknd/en/adventures/surf-camp/surf-camp-hero.jpg",
    url: "https://www.example.com/content/dam/wknd/en/adventures/surf-camp/surf-camp-hero.jpg",
    title: "Surf Camp Hero",
    tags: [],
    created: null,
    modified: "2026-09-18T09:31:47.364Z",
    published: null,
    scope: "4566206088344853970",
    data: exampleAssetEvent,
  },
  eventId: exampleAssetEvent.id,
  eventSource: exampleAssetEvent.source,
  eventType: exampleAssetEvent.type,
};

export const aemAssetsEventWebhookExamplePayload: { payload: TriggerPayload; branch: string } = {
  payload: {
    ...exampleTriggerPayloadBase,
    headers: { "content-type": "application/cloudevents+json" },
    body: { data: assetEventItem },
  },
  branch: "Notification",
};
