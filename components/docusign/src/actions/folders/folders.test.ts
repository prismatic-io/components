import { invoke } from "@prismatic-io/spectral/testing";
import {
  listFolderItemsExamplePayload,
  listFoldersExamplePayload,
} from "../../examplePayloads";
import { ACCOUNT_PATH, connection, mockApi, useNock } from "../../testHelpers";
import { listFolderItems } from "./listFolderItems";
import { listFolders } from "./listFolders";

const FOLDER_ID = "8c7b6a59-4f3e-4d2c-b1a0-9f8e7d6c5b4a";

describe("folders actions", () => {
  useNock();

  describe("listFolderItems", () => {
    const params = {
      connection,
      folderId: FOLDER_ID,
      fetchAll: false,
      includeItems: true,
    };

    it("reads one page of the folder's items", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/folders/${FOLDER_ID}`)
        .query({ include_items: "true" })
        .reply(200, listFolderItemsExamplePayload.data);

      const { result } = await invoke(listFolderItems, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(listFolderItemsExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/folders/${FOLDER_ID}`)
        .query(true)
        .reply(404, { errorCode: "FOLDER_NOT_FOUND" });

      await expect(invoke(listFolderItems, params)).rejects.toThrow();
    });
  });

  describe("listFolders", () => {
    const params = {
      connection,
      fetchAll: false,
      pagination: { startPosition: "0", count: "2" },
      include: "template_folders",
      includeItems: false,
      subFolderDepth: undefined,
      userFilter: undefined,
    };

    it("reads one page of folders with the pagination and filter params", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/folders`)
        .query({
          include: "template_folders",
          include_items: "false",
          count: "2",
          start_position: "0",
        })
        .reply(200, listFoldersExamplePayload.data);

      const { result } = await invoke(listFolders, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(listFoldersExamplePayload);
    });

    it("reads one page without page params when the pagination group is unset", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/folders`)
        .query({
          include: "template_folders",
          include_items: "false",
        })
        .reply(200, listFoldersExamplePayload.data);

      const { result } = await invoke(listFolders, {
        ...params,
        pagination: undefined as unknown as typeof params.pagination,
      });

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(listFoldersExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/folders`)
        .query(true)
        .reply(500, { errorCode: "UNSPECIFIED_ERROR" });

      await expect(invoke(listFolders, params)).rejects.toThrow();
    });
  });
});
