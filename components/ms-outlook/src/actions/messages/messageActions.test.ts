import { testing } from "@prismatic-io/spectral";
import nock from "nock";
import component from "../..";
import { listMessagesExamplePayload } from "../../examplePayloads";
import { delegatedConnection, GRAPH_HOST } from "../../testHelpers";

const MESSAGE_ID = "AAMkAGUAAAwTW09AAA=";
const FOLDER_ID = "AAMkAGI2TGuLAAA=";
const GRAPH_ERROR = { error: { code: "ErrorInvalidRequest", message: "Invalid request." } };

const harness = testing.createHarness(component);

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("listMessages", () => {
  test("lists the folder's messages with the search, filter and page size", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/me/mailFolders/${FOLDER_ID}/messages`)
      .query({ $top: "10", $search: "subject:meeting" })
      .reply(200, listMessagesExamplePayload.data);

    const result = await harness.action("listMessages", {
      connection: delegatedConnection(),
      folderId: FOLDER_ID,
      search: "subject:meeting",
      pagination: { pageLimit: "10" },
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(listMessagesExamplePayload.data);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).get("/v1.0/me/messages").reply(400, GRAPH_ERROR);

    await expect(
      harness.action("listMessages", { connection: delegatedConnection() }),
    ).rejects.toThrow();
  });
});

describe("sendMessage", () => {
  const messageInput = {
    to: ["john.doe@example.com,jane.smith@example.com"],
    subject: "Quarterly Report",
    body: "<p>Hello</p>",
  };

  test("posts the message to /me/sendMail and returns null data", async () => {
    const scope = nock(GRAPH_HOST)
      .post("/v1.0/me/sendMail", {
        message: {
          toRecipients: [
            { emailAddress: { address: "john.doe@example.com" } },
            { emailAddress: { address: "jane.smith@example.com" } },
          ],
          ccRecipients: [],
          bccRecipients: [],
          subject: "Quarterly Report",
          body: { contentType: "html", content: "<p>Hello</p>" },
          attachments: [],
        },
      })
      .reply(202);

    const result = await harness.action("sendMessage", {
      connection: delegatedConnection(),
      ...messageInput,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual({ data: null });
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).post("/v1.0/me/sendMail").reply(400, GRAPH_ERROR);

    await expect(
      harness.action("sendMessage", { connection: delegatedConnection(), ...messageInput }),
    ).rejects.toThrow();
  });
});

describe("deleteMessage", () => {
  test("deletes the message", async () => {
    const scope = nock(GRAPH_HOST).delete(`/v1.0/me/messages/${MESSAGE_ID}`).reply(204);

    const result = await harness.action("deleteMessage", {
      connection: delegatedConnection(),
      messageId: MESSAGE_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual({
      success: true,
      id: MESSAGE_ID,
      message: "Message deleted successfully",
    });
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).delete(`/v1.0/me/messages/${MESSAGE_ID}`).reply(404, GRAPH_ERROR);

    await expect(
      harness.action("deleteMessage", { connection: delegatedConnection(), messageId: MESSAGE_ID }),
    ).rejects.toThrow();
  });
});
