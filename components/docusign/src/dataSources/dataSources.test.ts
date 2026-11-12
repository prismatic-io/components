import { invokeDataSource } from "@prismatic-io/spectral/testing";
import {
  listFoldersExamplePayload,
  listTemplatesExamplePayload,
} from "../examplePayloads";
import { ACCOUNT_PATH, connection, mockApi, useNock } from "../testHelpers";
import { folders } from "./folders";
import { templates } from "./templates";

describe("data sources", () => {
  useNock();

  describe("folders", () => {
    const params = {
      connection,
      count: "",
      include: undefined,
      includeItems: false,
      startPosition: "",
      subFolderDepth: undefined,
      userFilter: undefined,
    };

    it("maps each folder to a key/label Element", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/folders`)
        .query({ include_items: "false" })
        .reply(200, listFoldersExamplePayload.data);

      const { result } = await invokeDataSource(folders, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(
        listFoldersExamplePayload.data.folders.map(({ folderId, name }) => ({
          key: folderId,
          label: name,
        })),
      );
    });

    it("returns an empty list when the account has no folders", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/folders`)
        .query(true)
        .reply(200, { resultSetSize: "0", folders: [] });

      const { result } = await invokeDataSource(folders, params);

      expect(result).toEqual([]);
    });
  });

  describe("templates", () => {
    const params = { connection };

    it("maps each template to a key/label Element", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/templates`)
        .reply(200, listTemplatesExamplePayload.data);

      const { result } = await invokeDataSource(templates, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(
        listTemplatesExamplePayload.data.envelopeTemplates.map(
          ({ templateId, name }) => ({ key: templateId, label: name }),
        ),
      );
    });

    it("returns an empty list when the account has no templates", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/templates`)
        .reply(200, { resultSetSize: "0", envelopeTemplates: [] });

      const { result } = await invokeDataSource(templates, params);

      expect(result).toEqual([]);
    });
  });
});
