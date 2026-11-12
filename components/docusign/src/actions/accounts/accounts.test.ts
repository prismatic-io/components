import { invoke } from "@prismatic-io/spectral/testing";
import {
  createAccountExamplePayload,
  deleteAccountExamplePayload,
  getAccountExamplePayload,
  listAccountSettingsExamplePayload,
} from "../../examplePayloads";
import { ACCOUNTS_PATH, connection, mockApi, useNock } from "../../testHelpers";
import { createAccount } from "./createAccount";
import { deleteAccount } from "./deleteAccount";
import { getAccount } from "./getAccount";
import { listAccountSettings } from "./listAccountSettings";

const TARGET_ACCOUNT = "18b8a3f5-7c1e-4d2a-9b3f-6e5d4c3b2a10";

const createParams = {
  connection,
  accountName: "Example Corp",
  initialUser: {
    email: "jane.doe@example.com",
    firstName: "Jane",
    middleName: undefined,
    lastName: "Doe",
    suffixName: undefined,
    userName: "Jane Doe",
    jobTitle: "Operations Lead",
    company: "Example Corp",
  },
  address: {
    address1: "221 Main Street",
    address2: undefined,
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    country: "US",
  },
  phone: "415-555-0100",
  fax: undefined,
  includedSeats: undefined,
  planId: "a9c1e2f3-4b5d-4e6f-8a7b-9c0d1e2f3a4b",
  referralCode: undefined,
  referrerName: undefined,
  distributorCode: undefined,
  distributorPassword: undefined,
};

describe("accounts actions", () => {
  useNock();

  describe("createAccount", () => {
    it("posts to the accounts root and maps the address and initialUser groups", async () => {
      const scope = mockApi()
        .post(`${ACCOUNTS_PATH}/`, {
          newAccountRequest: [
            {
              accountName: "Example Corp",
              initialUser: {
                email: "jane.doe@example.com",
                firstName: "Jane",
                lastName: "Doe",
                userName: "Jane Doe",
                jobTitle: "Operations Lead",
                company: "Example Corp",
              },
              addressInformation: {
                address1: "221 Main Street",
                city: "San Francisco",
                state: "CA",
                postalCode: "94105",
                country: "US",
                phone: "415-555-0100",
              },
              planInformation: {
                planId: "a9c1e2f3-4b5d-4e6f-8a7b-9c0d1e2f3a4b",
              },
            },
          ],
        })
        .reply(201, createAccountExamplePayload.data);

      const { result } = await invoke(createAccount, createParams);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(createAccountExamplePayload);
    });

    it("omits the initialUser and address fields when both groups are unset", async () => {
      const scope = mockApi()
        .post(`${ACCOUNTS_PATH}/`, {
          newAccountRequest: [
            {
              accountName: "Example Corp",
              addressInformation: {
                phone: "415-555-0100",
              },
              planInformation: {
                planId: "a9c1e2f3-4b5d-4e6f-8a7b-9c0d1e2f3a4b",
              },
            },
          ],
        })
        .reply(201, createAccountExamplePayload.data);

      const { result } = await invoke(createAccount, {
        ...createParams,
        initialUser: undefined as unknown as typeof createParams.initialUser,
        address: undefined as unknown as typeof createParams.address,
      });

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(createAccountExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .post(`${ACCOUNTS_PATH}/`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(createAccount, createParams)).rejects.toThrow();
    });
  });

  describe("deleteAccount", () => {
    const params = { connection, accountId: TARGET_ACCOUNT };

    it("deletes the account by id without the caller's account segment", async () => {
      const scope = mockApi()
        .delete(`${ACCOUNTS_PATH}/${TARGET_ACCOUNT}`)
        .reply(200, deleteAccountExamplePayload.data);

      const { result } = await invoke(deleteAccount, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(deleteAccountExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .delete(`${ACCOUNTS_PATH}/${TARGET_ACCOUNT}`)
        .reply(404, { errorCode: "ACCOUNT_NOT_FOUND" });

      await expect(invoke(deleteAccount, params)).rejects.toThrow();
    });
  });

  describe("getAccount", () => {
    const params = { connection, accountId: TARGET_ACCOUNT };

    it("reads the account by id", async () => {
      const scope = mockApi()
        .get(`${ACCOUNTS_PATH}/${TARGET_ACCOUNT}`)
        .reply(200, getAccountExamplePayload.data);

      const { result } = await invoke(getAccount, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getAccountExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNTS_PATH}/${TARGET_ACCOUNT}`)
        .reply(404, { errorCode: "ACCOUNT_NOT_FOUND" });

      await expect(invoke(getAccount, params)).rejects.toThrow();
    });
  });

  describe("listAccountSettings", () => {
    const params = { connection, accountId: TARGET_ACCOUNT };

    it("reads the account settings", async () => {
      const scope = mockApi()
        .get(`${ACCOUNTS_PATH}/${TARGET_ACCOUNT}/settings`)
        .reply(200, listAccountSettingsExamplePayload.data);

      const { result } = await invoke(listAccountSettings, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(listAccountSettingsExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNTS_PATH}/${TARGET_ACCOUNT}/settings`)
        .reply(500, { errorCode: "UNSPECIFIED_ERROR" });

      await expect(invoke(listAccountSettings, params)).rejects.toThrow();
    });
  });
});
