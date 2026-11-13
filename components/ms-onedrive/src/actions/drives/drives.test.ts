import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { BASE_URL } from "../../constants";
import {
  getDriveExamplePayload,
  listDrivesByGroupExamplePayload,
  listDrivesBySiteExamplePayload,
  listDrivesByUserExamplePayload,
  listDrivesExamplePayload,
} from "../../examplePayloads";
import { getDrive } from "./getDrive";
import { listDrives } from "./listDrives";
import { listDrivesByGroup } from "./listDrivesByGroup";
import { listDrivesBySite } from "./listDrivesBySite";
import { listDrivesByUser } from "./listDrivesByUser";

const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9uZWRyaXZlLXRlc3QifQ" },
);
const DRIVE_ID =
  "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd";
const GROUP_ID = "02bd9fd6-8f93-4758-87c3-1fb73740a315";
const SITE_ID =
  "contoso.sharepoint.com,6c44888f-4774-4ef0-b542-d21a795cfea6,80f1bb04-d076-4cb1-9fb7-3f7264e77163";
const USER_ID = "87d349ed-44d7-43e1-9a83-5f2406dee5bd";
const pagination = { pageLimit: 2, pageToken: "X%2744537079ghv" };
const pageQuery = { $top: "2", $skiptoken: "X%2744537079ghv" };
const notFound = {
  error: { code: "itemNotFound", message: "The resource could not be found." },
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("getDrive", () => {
  test("returns the drive", async () => {
    nock(BASE_URL)
      .get(`/drives/${DRIVE_ID}`)
      .reply(200, getDriveExamplePayload.data);

    const { result } = await invoke(getDrive, {
      connection,
      driveId: DRIVE_ID,
    });

    expect(result).toEqual(getDriveExamplePayload);
  });

  test("rejects when the drive does not exist", async () => {
    nock(BASE_URL).get(`/drives/${DRIVE_ID}`).reply(404, notFound);

    await expect(
      invoke(getDrive, { connection, driveId: DRIVE_ID }),
    ).rejects.toThrow("Status: 404 code: itemNotFound");
  });
});

describe("listDrives", () => {
  test("returns one page of the current user's drives", async () => {
    nock(BASE_URL)
      .get("/me/drives")
      .query(pageQuery)
      .reply(200, listDrivesExamplePayload.data);

    const { result } = await invoke(listDrives, {
      connection,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listDrivesExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL).get("/me/drives").query(pageQuery).reply(403, {});

    await expect(
      invoke(listDrives, { connection, fetchAll: false, pagination }),
    ).rejects.toThrow();
  });
});

describe("listDrivesByGroup", () => {
  test("returns one page of the group's drives", async () => {
    nock(BASE_URL)
      .get(`/groups/${GROUP_ID}/drives`)
      .query(pageQuery)
      .reply(200, listDrivesByGroupExamplePayload.data);

    const { result } = await invoke(listDrivesByGroup, {
      connection,
      groupId: GROUP_ID,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listDrivesByGroupExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL)
      .get(`/groups/${GROUP_ID}/drives`)
      .query(pageQuery)
      .reply(404, notFound);

    await expect(
      invoke(listDrivesByGroup, {
        connection,
        groupId: GROUP_ID,
        fetchAll: false,
        pagination,
      }),
    ).rejects.toThrow();
  });
});

describe("listDrivesBySite", () => {
  test("returns one page of the site's drives", async () => {
    nock(BASE_URL)
      .get(`/sites/${SITE_ID}/drives`)
      .query(pageQuery)
      .reply(200, listDrivesBySiteExamplePayload.data);

    const { result } = await invoke(listDrivesBySite, {
      connection,
      siteId: SITE_ID,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listDrivesBySiteExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL)
      .get(`/sites/${SITE_ID}/drives`)
      .query(pageQuery)
      .reply(404, notFound);

    await expect(
      invoke(listDrivesBySite, {
        connection,
        siteId: SITE_ID,
        fetchAll: false,
        pagination,
      }),
    ).rejects.toThrow();
  });
});

describe("listDrivesByUser", () => {
  test("returns one page of the user's drives", async () => {
    nock(BASE_URL)
      .get(`/users/${USER_ID}/drives`)
      .query(pageQuery)
      .reply(200, listDrivesByUserExamplePayload.data);

    const { result } = await invoke(listDrivesByUser, {
      connection,
      userId: USER_ID,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listDrivesByUserExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL)
      .get(`/users/${USER_ID}/drives`)
      .query(pageQuery)
      .reply(404, notFound);

    await expect(
      invoke(listDrivesByUser, {
        connection,
        userId: USER_ID,
        fetchAll: false,
        pagination,
      }),
    ).rejects.toThrow();
  });
});
