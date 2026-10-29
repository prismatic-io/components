import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { adpOauth2 } from "../../connections/adpOauth2";
import { API_ENDPOINT, TOKEN_ENDPOINT } from "../../constants";
import {
  addPersonalContactExamplePayload,
  deletePersonalContactExamplePayload,
  getPersonalContactExamplePayload,
  getPersonalContactMetaExamplePayload,
  listPersonalContactsExamplePayload,
  updatePersonalContactExamplePayload,
} from "../../examplePayloads";
import { addPersonalContact } from "./addPersonalContact";
import { deletePersonalContact } from "./deletePersonalContact";
import { getPersonalContact } from "./getPersonalContact";
import { getPersonalContactMeta } from "./getPersonalContactMeta";
import { listPersonalContacts } from "./listPersonalContacts";
import { updatePersonalContact } from "./updatePersonalContact";

const BASE = "https://api.adp.com";
const TOKEN = "test-token";
const AOID = "G3R47DSRZK5TRCFJ";
const CONTACT_ID = "169750562647_284";

const connection = createConnection(adpOauth2, {
  endpoint: API_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
  clientId: "client-id",
  clientSecret: "client-secret",
  sslCert: "-----BEGIN CERTIFICATE-----\nCERT\n-----END CERTIFICATE-----",
  sslKey: "-----BEGIN PRIVATE KEY-----\nKEY\n-----END PRIVATE KEY-----",
});

const context = () => ({
  executionState: {
    [`ADP - ${connection.configVarKey}`]: {
      accessToken: TOKEN,
      expiresDate: Date.now() / 1000 + 3600,
    },
  },
});

const api = () =>
  nock(BASE, { reqheaders: { authorization: `Bearer ${TOKEN}` } });

const personalContact = { personName: { givenName: "Test" } };

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("addPersonalContact", () => {
  test("happy path posts the add event and returns the response", async () => {
    api()
      .post("/events/hr/v1/worker.personal-contact.add", {
        events: [
          {
            data: {
              eventContext: { worker: { associateOID: AOID } },
              transform: { personalContact },
            },
          },
        ],
      })
      .reply(200, addPersonalContactExamplePayload.data);
    const { result } = await invoke(
      addPersonalContact,
      { connection, aoid: AOID, personalContact },
      context(),
    );
    expect(result).toEqual(addPersonalContactExamplePayload);
  });

  test("error path rejects", async () => {
    api()
      .post("/events/hr/v1/worker.personal-contact.add")
      .reply(400, { error: "bad" });
    await expect(
      invoke(
        addPersonalContact,
        { connection, aoid: AOID, personalContact },
        context(),
      ),
    ).rejects.toThrow();
  });
});

describe("deletePersonalContact", () => {
  test("happy path posts the remove event and returns the response", async () => {
    api()
      .post("/events/hr/v1/worker.personal-contact.remove", {
        events: [
          {
            data: {
              eventContext: {
                worker: { associateOID: AOID },
                personalContact: { itemID: CONTACT_ID },
              },
            },
          },
        ],
      })
      .reply(200, deletePersonalContactExamplePayload.data);
    const { result } = await invoke(
      deletePersonalContact,
      { connection, aoid: AOID, personalContactId: CONTACT_ID },
      context(),
    );
    expect(result).toEqual(deletePersonalContactExamplePayload);
  });

  test("error path rejects", async () => {
    api()
      .post("/events/hr/v1/worker.personal-contact.remove")
      .reply(404, { error: "not found" });
    await expect(
      invoke(
        deletePersonalContact,
        { connection, aoid: AOID, personalContactId: CONTACT_ID },
        context(),
      ),
    ).rejects.toThrow();
  });
});

describe("getPersonalContact", () => {
  test("happy path returns the contact", async () => {
    api()
      .get(`/hr/v2/associates/${AOID}/personal-contacts/${CONTACT_ID}`)
      .query({ $select: "personalContacts/personName" })
      .reply(200, getPersonalContactExamplePayload.data);
    const { result } = await invoke(
      getPersonalContact,
      {
        connection,
        aoid: AOID,
        personalContactId: CONTACT_ID,
        $select: "personalContacts/personName",
      },
      context(),
    );
    expect(result).toEqual(getPersonalContactExamplePayload);
  });

  test("error path rejects", async () => {
    api()
      .get(`/hr/v2/associates/${AOID}/personal-contacts/${CONTACT_ID}`)
      .query(true)
      .reply(404, { error: "not found" });
    await expect(
      invoke(
        getPersonalContact,
        { connection, aoid: AOID, personalContactId: CONTACT_ID, $select: "" },
        context(),
      ),
    ).rejects.toThrow();
  });
});

describe("getPersonalContactMeta", () => {
  test("happy path returns the metadata", async () => {
    api()
      .get(`/hr/v2/associates/${AOID}/personal-contacts/meta`)
      .query({ $select: "meta" })
      .reply(200, getPersonalContactMetaExamplePayload.data);
    const { result } = await invoke(
      getPersonalContactMeta,
      { connection, aoid: AOID, $select: "meta" },
      context(),
    );
    expect(result).toEqual(getPersonalContactMetaExamplePayload);
  });

  test("error path rejects", async () => {
    api()
      .get(`/hr/v2/associates/${AOID}/personal-contacts/meta`)
      .query(true)
      .reply(500, { error: "boom" });
    await expect(
      invoke(
        getPersonalContactMeta,
        { connection, aoid: AOID, $select: "" },
        context(),
      ),
    ).rejects.toThrow();
  });
});

describe("listPersonalContacts", () => {
  test("happy path returns the contacts", async () => {
    api()
      .get(`/hr/v2/associates/${AOID}/personal-contacts`)
      .query({ $select: "personalContacts/personName" })
      .reply(200, listPersonalContactsExamplePayload.data);
    const { result } = await invoke(
      listPersonalContacts,
      { connection, aoid: AOID, $select: "personalContacts/personName" },
      context(),
    );
    expect(result).toEqual(listPersonalContactsExamplePayload);
  });

  test("error path rejects", async () => {
    api()
      .get(`/hr/v2/associates/${AOID}/personal-contacts`)
      .query(true)
      .reply(403, { error: "forbidden" });
    await expect(
      invoke(
        listPersonalContacts,
        { connection, aoid: AOID, $select: "" },
        context(),
      ),
    ).rejects.toThrow();
  });
});

describe("updatePersonalContact", () => {
  test("happy path posts the change event and returns the response", async () => {
    api()
      .post("/events/hr/v1/worker.personal-contact.change", {
        events: [
          {
            data: {
              eventContext: {
                worker: { associateOID: AOID },
                personalContact: { itemID: CONTACT_ID },
              },
              transform: { personalContact },
            },
          },
        ],
      })
      .reply(200, updatePersonalContactExamplePayload.data);
    const { result } = await invoke(
      updatePersonalContact,
      {
        connection,
        aoid: AOID,
        personalContactId: CONTACT_ID,
        personalContact,
      },
      context(),
    );
    expect(result).toEqual(updatePersonalContactExamplePayload);
  });

  test("error path rejects", async () => {
    api()
      .post("/events/hr/v1/worker.personal-contact.change")
      .reply(422, { error: "invalid" });
    await expect(
      invoke(
        updatePersonalContact,
        {
          connection,
          aoid: AOID,
          personalContactId: CONTACT_ID,
          personalContact,
        },
        context(),
      ),
    ).rejects.toThrow();
  });
});
