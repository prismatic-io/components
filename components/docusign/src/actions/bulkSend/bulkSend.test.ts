import { invoke } from "@prismatic-io/spectral/testing";
import {
  createBulkSendListExamplePayload,
  deleteBulkSendListExamplePayload,
  getBulkSendBatchStatusExamplePayload,
  getBulkSendBatchesExamplePayload,
  getBulkSendListExamplePayload,
  getBulkSendListsExamplePayload,
  updateBulkSendListExamplePayload,
} from "../../examplePayloads";
import { ACCOUNT_PATH, connection, mockApi, useNock } from "../../testHelpers";
import { createBulkSendList } from "./createBulkSendList";
import { deleteBulkSendList } from "./deleteBulkSendList";
import { getBulkSendBatchStatus } from "./getBulkSendBatchStatus";
import { getBulkSendBatches } from "./getBulkSendBatches";
import { getBulkSendList } from "./getBulkSendList";
import { getBulkSendLists } from "./getBulkSendLists";
import { updateBulkSendList } from "./updateBulkSendList";

const LIST_ID = "3f2c1b0a-9e8d-4c7b-a6f5-e4d3c2b1a098";
const BATCH_ID = "7d6c5b4a-3e2f-4a1b-9c8d-0e1f2a3b4c5d";
const listBody = {
  name: "Quarterly renewals",
  bulkCopies: [{ recipients: [{ roleName: "Signer", name: "Jane Doe" }] }],
};

describe("bulkSend actions", () => {
  useNock();

  describe("createBulkSendList", () => {
    const params = { connection, jsonInput: listBody };

    it("posts the JSON body to /bulk_send_lists", async () => {
      const scope = mockApi()
        .post(`${ACCOUNT_PATH}/bulk_send_lists`, listBody)
        .reply(201, createBulkSendListExamplePayload.data);

      const { result } = await invoke(createBulkSendList, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(createBulkSendListExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .post(`${ACCOUNT_PATH}/bulk_send_lists`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(createBulkSendList, params)).rejects.toThrow();
    });
  });

  describe("deleteBulkSendList", () => {
    const params = { connection, bulkSendListId: LIST_ID };

    it("deletes the list by id", async () => {
      const scope = mockApi()
        .delete(`${ACCOUNT_PATH}/bulk_send_lists/${LIST_ID}`)
        .reply(200, deleteBulkSendListExamplePayload.data);

      const { result } = await invoke(deleteBulkSendList, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(deleteBulkSendListExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .delete(`${ACCOUNT_PATH}/bulk_send_lists/${LIST_ID}`)
        .reply(404, { errorCode: "BULK_SEND_LIST_NOT_FOUND" });

      await expect(invoke(deleteBulkSendList, params)).rejects.toThrow();
    });
  });

  describe("getBulkSendBatchStatus", () => {
    const params = { connection, bulkSendBatchId: BATCH_ID };

    it("reads the batch status by id", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/bulk_send_batch/${BATCH_ID}`)
        .reply(200, getBulkSendBatchStatusExamplePayload.data);

      const { result } = await invoke(getBulkSendBatchStatus, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getBulkSendBatchStatusExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/bulk_send_batch/${BATCH_ID}`)
        .reply(404, { errorCode: "BULK_SEND_BATCH_NOT_FOUND" });

      await expect(invoke(getBulkSendBatchStatus, params)).rejects.toThrow();
    });
  });

  describe("getBulkSendBatches", () => {
    const params = { connection };

    it("reads the batch summary", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/bulk_send_batch`)
        .reply(200, getBulkSendBatchesExamplePayload.data);

      const { result } = await invoke(getBulkSendBatches, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getBulkSendBatchesExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/bulk_send_batch`)
        .reply(500, { errorCode: "UNSPECIFIED_ERROR" });

      await expect(invoke(getBulkSendBatches, params)).rejects.toThrow();
    });
  });

  describe("getBulkSendList", () => {
    const params = { connection, bulkSendListId: LIST_ID };

    it("reads the list by id", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/bulk_send_lists/${LIST_ID}`)
        .reply(200, getBulkSendListExamplePayload.data);

      const { result } = await invoke(getBulkSendList, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getBulkSendListExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/bulk_send_lists/${LIST_ID}`)
        .reply(404, { errorCode: "BULK_SEND_LIST_NOT_FOUND" });

      await expect(invoke(getBulkSendList, params)).rejects.toThrow();
    });
  });

  describe("getBulkSendLists", () => {
    const params = { connection };

    it("reads every bulk send list", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/bulk_send_lists`)
        .reply(200, getBulkSendListsExamplePayload.data);

      const { result } = await invoke(getBulkSendLists, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getBulkSendListsExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/bulk_send_lists`)
        .reply(500, { errorCode: "UNSPECIFIED_ERROR" });

      await expect(invoke(getBulkSendLists, params)).rejects.toThrow();
    });
  });

  describe("updateBulkSendList", () => {
    const params = { connection, jsonInput: listBody, bulkSendListId: LIST_ID };

    it("puts the JSON body to the list", async () => {
      const scope = mockApi()
        .put(`${ACCOUNT_PATH}/bulk_send_lists/${LIST_ID}`, listBody)
        .reply(200, updateBulkSendListExamplePayload.data);

      const { result } = await invoke(updateBulkSendList, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(updateBulkSendListExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .put(`${ACCOUNT_PATH}/bulk_send_lists/${LIST_ID}`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(updateBulkSendList, params)).rejects.toThrow();
    });
  });
});
