import { invoke } from "@prismatic-io/spectral/testing";
import {
  deleteUserExamplePayload,
  getUserExamplePayload,
  updateUserExamplePayload,
} from "../../examplePayloads";
import { ACCOUNT_PATH, connection, mockApi, useNock } from "../../testHelpers";
import { deleteUser } from "./deleteUser";
import { getUser } from "./getUser";
import { updateUser } from "./updateUser";

const USER_ID = "2c1b0a99-8f7e-4d6c-b5a4-3928170f6e5d";
const userBody = { firstName: "Jane", lastName: "Doe", jobTitle: "Director" };

describe("users actions", () => {
  useNock();

  describe("deleteUser", () => {
    const params = {
      connection,
      userIds: [{ userId: USER_ID }],
      deleteParam: "groups",
    };

    it("sends the user ids in the DELETE body with the delete param", async () => {
      const scope = mockApi()
        .delete(`${ACCOUNT_PATH}/users`, { users: [{ userId: USER_ID }] })
        .query({ delete: "groups" })
        .reply(200, deleteUserExamplePayload.data);

      const { result } = await invoke(deleteUser, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(deleteUserExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .delete(`${ACCOUNT_PATH}/users`)
        .query(true)
        .reply(400, { errorCode: "INVALID_USERID" });

      await expect(invoke(deleteUser, params)).rejects.toThrow();
    });
  });

  describe("getUser", () => {
    const params = { connection, userId: USER_ID };

    it("reads the user by id", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/users/${USER_ID}`)
        .reply(200, getUserExamplePayload.data);

      const { result } = await invoke(getUser, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getUserExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/users/${USER_ID}`)
        .reply(404, { errorCode: "USER_DOES_NOT_EXIST_IN_SYSTEM" });

      await expect(invoke(getUser, params)).rejects.toThrow();
    });
  });

  describe("updateUser", () => {
    const params = { connection, jsonInput: userBody, userId: USER_ID };

    it("puts the JSON body to the user", async () => {
      const scope = mockApi()
        .put(`${ACCOUNT_PATH}/users/${USER_ID}`, userBody)
        .reply(200, updateUserExamplePayload.data);

      const { result } = await invoke(updateUser, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(updateUserExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .put(`${ACCOUNT_PATH}/users/${USER_ID}`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(updateUser, params)).rejects.toThrow();
    });
  });
});
