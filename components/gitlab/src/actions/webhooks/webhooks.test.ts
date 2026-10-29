import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listProjectWebhooksExamplePayload } from "../../examplePayloads";
import { accessTokenConnection, GITLAB_URL } from "../../testHelpers";
import { deleteInstancedWebhooks } from "./deleteInstancedWebhooks";
import { listProjectWebhooks } from "./listProjectWebhooks";

const exampleHook = listProjectWebhooksExamplePayload.data[0];

afterEach(() => nock.cleanAll());

test("List Project Webhooks", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/278964/hooks")
    .query(true)
    .reply(200, [exampleHook]);
  const { result } = await invoke(listProjectWebhooks, {
    connection: accessTokenConnection,
    project: "278964",
    fetchAll: false,
    pagination: { perPage: 0, page: undefined },
  });
  expect(result?.data).toEqual([exampleHook]);
});

test("Delete Instanced Webhooks removes only hooks pointing at this instance", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/278964/hooks")
    .query(true)
    .reply(200, [
      exampleHook,
      { ...exampleHook, id: 99, url: "https://elsewhere.example.com" },
    ])
    .delete("/api/v4/projects/278964/hooks/14982")
    .reply(204);
  const { result } = await invoke(
    deleteInstancedWebhooks,
    { connection: accessTokenConnection, projects: ["278964"] },
    {
      webhookUrls: {
        "Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
      },
    } as never,
  );
  expect(result?.data).toEqual({
    deleted: [{ projectId: "278964", hookId: 14982 }],
  });
});

test("Delete Instanced Webhooks lists each project's hooks once across every flow URL", async () => {
  const hooksList = nock(GITLAB_URL)
    .get("/api/v4/projects/278964/hooks")
    .query(true)
    .reply(200, [
      exampleHook,
      {
        ...exampleHook,
        id: 15,
        url: "https://hooks.example.com/trigger/OTHER",
      },
      { ...exampleHook, id: 99, url: "https://elsewhere.example.com" },
    ]);
  nock(GITLAB_URL)
    .delete("/api/v4/projects/278964/hooks/14982")
    .reply(204)
    .delete("/api/v4/projects/278964/hooks/15")
    .reply(204);
  let listCalls = 0;
  hooksList.on("request", () => {
    listCalls += 1;
  });
  const { result } = await invoke(
    deleteInstancedWebhooks,
    { connection: accessTokenConnection, projects: ["278964"] },
    {
      webhookUrls: {
        "Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
        "Other Flow": "https://hooks.example.com/trigger/OTHER",
      },
    } as never,
  );
  expect(listCalls).toBe(1);
  expect(result?.data).toEqual({
    deleted: [
      { projectId: "278964", hookId: 14982 },
      { projectId: "278964", hookId: 15 },
    ],
  });
});

describe("error paths", () => {
  afterEach(() => expect(nock.isDone()).toBe(true));
  const notFound = { message: "404 Project Not Found" };

  test("List Project Webhooks rejects on 404", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/projects/999/hooks")
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listProjectWebhooks, {
        connection: accessTokenConnection,
        project: "999",
        fetchAll: false,
        pagination: { perPage: 0, page: undefined },
      }),
    ).rejects.toThrow();
  });

  test("Delete Instanced Webhooks rejects when the hooks list returns 404", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/projects/999/hooks")
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(
        deleteInstancedWebhooks,
        { connection: accessTokenConnection, projects: ["999"] },
        {
          webhookUrls: {
            "Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
          },
        } as never,
      ),
    ).rejects.toThrow();
  });
});
