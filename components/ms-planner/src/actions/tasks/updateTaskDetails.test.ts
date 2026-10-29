import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { DEFAULT_ORDER_HINT, ODATA_TYPE } from "../../constants";
import { updateTaskDetailsExamplePayload } from "../../examplePayloads";
import { updateTaskDetails } from "./updateTaskDetails";

const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const TASK_ID = "01gzSlKkIUSUl6DF_EilrmQAKDhh";
const DETAILS_URL = `/v1.0/planner/tasks/${TASK_ID}/details`;
const ETAG = 'W/"JzEtVGFza0RldGFpbHNAQEBAQEBAQEBAQEBAQEBARCc="';

const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = {
  connection,
  groupId: undefined,
  planId: PLAN_ID,
  taskId: TASK_ID,
  description: undefined,
  checklist: { addItems: [], removeItemIds: [] },
  references: { addReferences: [], removeReferenceUrls: [] },
  previewType: undefined,
  etag: undefined,
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("builds the checklist and reference open types with generated and encoded keys", async () => {
  let patchedBody: Record<string, Record<string, unknown>> = {};
  nock(BASE).get(DETAILS_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(DETAILS_URL)
    .matchHeader("If-Match", ETAG)
    .reply((_uri, body) => {
      patchedBody = body as Record<string, Record<string, unknown>>;
      return [200, updateTaskDetailsExamplePayload.data];
    });

  const { result } = await invoke(updateTaskDetails, {
    ...params,
    description: "Confirm every contact before the launch.",
    previewType: "description",
    checklist: {
      addItems: [{ title: "Confirm the mailing address", isChecked: true }],
      removeItemIds: ["95e27074-6c4a-447a-aa24-9d718a0b86fa"],
    },
    references: {
      addReferences: [{ url: "https://example.com/spec", alias: "Spec" }],
      removeReferenceUrls: [],
    },
  });

  expect(patchedBody.description).toBe(
    "Confirm every contact before the launch.",
  );
  expect(patchedBody.previewType).toBe("description");
  expect(Object.values(patchedBody.checklist)).toContainEqual({
    "@odata.type": ODATA_TYPE.checklistItem,
    title: "Confirm the mailing address",
    isChecked: true,
  });
  expect(
    patchedBody.checklist["95e27074-6c4a-447a-aa24-9d718a0b86fa"],
  ).toBeNull();
  expect(patchedBody.references).toEqual({
    "https%3A//example%2Ecom/spec": {
      "@odata.type": ODATA_TYPE.externalReference,
      previewPriority: DEFAULT_ORDER_HINT,
      alias: "Spec",
    },
  });
  expect(result.data).toEqual(updateTaskDetailsExamplePayload.data);
});

test("omits the checklist and references keys entirely when neither was supplied", async () => {
  let patchedBody: unknown;
  nock(BASE).get(DETAILS_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(DETAILS_URL)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, updateTaskDetailsExamplePayload.data];
    });

  await invoke(updateTaskDetails, {
    ...params,
    description: "Just the description.",
  });

  expect(patchedBody).toEqual({ description: "Just the description." });
});

test("surfaces a rejected update", async () => {
  const etagScope = nock(BASE)
    .get(DETAILS_URL)
    .reply(200, { "@odata.etag": ETAG });
  const errorScope = nock(BASE)
    .patch(DETAILS_URL)
    .reply(400, { error: { code: "invalidRequest" } });

  await expect(
    invoke(updateTaskDetails, { ...params, description: "x" }),
  ).rejects.toThrow(/status code 400/);
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);
});
