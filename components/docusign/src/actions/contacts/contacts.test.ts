import { util } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/testing";
import {
  createContactExamplePayload,
  deleteContactExamplePayload,
  getContactExamplePayload,
  updateContactExamplePayload,
} from "../../examplePayloads";
import {
  ACCOUNT_ID,
  ACCOUNT_PATH,
  connection,
  mockApi,
  useNock,
} from "../../testHelpers";
import { createContact } from "./createContact";
import { deleteContact } from "./deleteContact";
import { getContact } from "./getContact";
import { updateContact } from "./updateContact";

const CONTACT_ID = "5e4d3c2b-1a09-4f8e-b7d6-c5b4a3928170";
const contactsBody = {
  contactList: [{ name: "Jane Doe", emails: ["jane.doe@example.com"] }],
};

describe("contacts actions", () => {
  useNock();

  describe("createContact", () => {
    const params = { connection, jsonInput: contactsBody };

    it("posts the JSON body to /contacts", async () => {
      const scope = mockApi()
        .post(`${ACCOUNT_PATH}/contacts`, contactsBody)
        .reply(201, createContactExamplePayload.data);

      const { result } = await invoke(createContact, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(createContactExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .post(`${ACCOUNT_PATH}/contacts`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(createContact, params)).rejects.toThrow();
    });
  });

  describe("deleteContact", () => {
    const params = { connection, contactId: CONTACT_ID };

    it("deletes through the account-scoped contacts endpoint", async () => {
      const scope = mockApi()
        .delete(`/restapi/v2.1/accounts/${ACCOUNT_ID}/contacts/${CONTACT_ID}`)
        .reply(200, deleteContactExamplePayload.data);

      const { result } = await invoke(deleteContact, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(deleteContactExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .delete(`${ACCOUNT_PATH}/contacts/${CONTACT_ID}`)
        .reply(404, { errorCode: "CONTACT_NOT_FOUND" });

      await expect(invoke(deleteContact, params)).rejects.toThrow();
    });
  });

  describe("getContact", () => {
    const params = {
      connection,
      contactId: CONTACT_ID,
      cloudProvider: "rooms",
    };

    it("reads the contact and forwards the cloud provider", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/contacts/${CONTACT_ID}`)
        .query({ cloud_provider: "rooms" })
        .reply(200, getContactExamplePayload.data);

      const { result } = await invoke(getContact, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getContactExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/contacts/${CONTACT_ID}`)
        .query(true)
        .reply(404, { errorCode: "CONTACT_NOT_FOUND" });

      await expect(invoke(getContact, params)).rejects.toThrow();
    });
  });

  describe("updateContact", () => {
    const params = { connection, jsonInput: contactsBody };

    it("puts the JSON body to /contacts", async () => {
      const scope = mockApi()
        .put(`${ACCOUNT_PATH}/contacts`, contactsBody)
        .reply(200, updateContactExamplePayload.data);

      const { result } = await invoke(updateContact, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(updateContactExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .put(`${ACCOUNT_PATH}/contacts`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(updateContact, params)).rejects.toThrow();
    });
  });
});

describe("contact request body defaults", () => {
  it.each([
    ["createContact", createContact],
    ["updateContact", updateContact],
  ])("%s defaults to the documented contactList body", (_key, action) => {
    const jsonInput = action.inputs.jsonInput;
    expect(
      Object.keys(JSON.parse(util.types.toString(jsonInput.default))),
    ).toEqual(["contactList"]);
  });
});
