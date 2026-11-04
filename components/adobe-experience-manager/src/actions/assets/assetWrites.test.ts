import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import {
  deleteAssetExamplePayload,
  getAssetJobStatusExamplePayload,
  getAssetMetadataExamplePayload,
  getImportJobStatusExamplePayload,
  importAssetFromUrlExamplePayload,
} from "../../examplePayloads";
import { buildMetadataPatch, cleanKeyValueRecord } from "../../utils";
import { deleteAsset } from "./deleteAsset";
import { getAssetJobStatus } from "./getAssetJobStatus";
import { getImportJobStatus } from "./getImportJobStatus";
import { importAssetFromUrl } from "./importAssetFromUrl";
import { updateAssetMetadata } from "./updateAssetMetadata";

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const BASE = `https://${AEM_HOST}`;
const connection = createConnection(
  aemOAuthServerToServer,
  {
    aemHost: AEM_HOST,
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    scopes: "openid, AdobeID",
    tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
  },
  { access_token: "test-access-token" },
);
const assetId = getAssetMetadataExamplePayload.data.assetId;
const metadataPath = `/adobe/assets/${encodeURIComponent(assetId)}/metadata`;
const assetJobExamplePayload = getAssetJobStatusExamplePayload;

beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

describe("buildMetadataPatch", () => {
  test("adds values and removes fields at the metadata root, as the live API expects", () => {
    expect(
      buildMetadataPatch({ "dc:title": "City" }, ["dc:description"]),
    ).toEqual([
      { op: "add", path: "/dc:title", value: "City" },
      { op: "remove", path: "/dc:description" },
    ]);
  });
  test("escapes slashes and tildes in field names as JSON Pointer segments", () => {
    expect(buildMetadataPatch({ "custom/region": "EU" }, ["a~b"])).toEqual([
      { op: "add", path: "/custom~1region", value: "EU" },
      { op: "remove", path: "/a~0b" },
    ]);
  });
  test("rejects an empty change set", () => {
    expect(() => buildMetadataPatch({}, [])).toThrow(
      "at least one metadata value or field to remove",
    );
  });
});

describe("cleanKeyValueRecord", () => {
  test("turns key-value rows into an object and drops blank keys", () => {
    expect(
      cleanKeyValueRecord([
        { key: " dc:title ", value: "City" },
        { key: "", value: "ignored" },
      ]),
    ).toEqual({ "dc:title": "City" });
  });
});

describe("importAssetFromUrl", () => {
  test("posts the folder and file and returns the job", async () => {
    nock(BASE)
      .post("/adobe/assets/import/fromUrl", {
        folder: "/content/dam/wknd-shared/en",
        files: [
          {
            url: "https://cdn.example.com/city.jpeg",
            fileName: "city.jpeg",
            mimeType: "image/jpeg",
          },
        ],
      })
      .reply(202, importAssetFromUrlExamplePayload.data);
    const { result } = await invoke(importAssetFromUrl, {
      connection,
      folder: "/content/dam/wknd-shared/en",
      fileUrl: "https://cdn.example.com/city.jpeg",
      fileName: "city.jpeg",
      mimeType: "image/jpeg",
    });
    expect(result).toEqual(importAssetFromUrlExamplePayload);
  });

  test("surfaces a 400", async () => {
    nock(BASE).post("/adobe/assets/import/fromUrl").reply(400, {});
    await expect(
      invoke(importAssetFromUrl, {
        connection,
        folder: "/content/dam/x",
        fileUrl: "https://cdn.example.com/a.pdf",
        fileName: "a.pdf",
        mimeType: undefined,
      }),
    ).rejects.toThrow("400");
  });
});

describe("getImportJobStatus", () => {
  test("returns the import job status", async () => {
    const id = getImportJobStatusExamplePayload.data.id;
    nock(BASE)
      .get(`/adobe/assets/import/jobs/${id}/status`)
      .reply(200, getImportJobStatusExamplePayload.data);
    const { result } = await invoke(getImportJobStatus, {
      connection,
      jobId: id,
    });
    expect(result).toEqual(getImportJobStatusExamplePayload);
  });

  test("surfaces a 404 for an unknown job", async () => {
    nock(BASE).get("/adobe/assets/import/jobs/missing/status").reply(404, {});
    await expect(
      invoke(getImportJobStatus, { connection, jobId: "missing" }),
    ).rejects.toThrow("404");
  });
});

describe("updateAssetMetadata", () => {
  test("patches unconditionally with If-Match: *, since AEM serves inconsistent ETags", async () => {
    nock(BASE, {
      reqheaders: {
        "if-match": "*",
        "content-type": "application/json-patch+json",
      },
    })
      .patch(metadataPath, [{ op: "add", path: "/dc:title", value: "City" }])
      .reply(200, getAssetMetadataExamplePayload.data);
    const { result } = await invoke(updateAssetMetadata, {
      connection,
      assetId,
      metadataValues: { "dc:title": "City" },
      removeFields: [],
    });
    expect(result).toEqual(getAssetMetadataExamplePayload);
  });

  test("surfaces a 412 from AEM unchanged", async () => {
    nock(BASE).patch(metadataPath).reply(412, {});
    await expect(
      invoke(updateAssetMetadata, {
        connection,
        assetId,
        metadataValues: { "dc:title": "City" },
        removeFields: [],
      }),
    ).rejects.toThrow("412");
  });

  test("fails without a request when there is nothing to change", async () => {
    await expect(
      invoke(updateAssetMetadata, {
        connection,
        assetId,
        metadataValues: {},
        removeFields: [],
      }),
    ).rejects.toThrow(
      "Update Asset Metadata needs at least one metadata value or field to remove.",
    );
  });
});

describe("deleteAsset and getAssetJobStatus", () => {
  test("returns the deleted asset on a 204", async () => {
    const deletedId = deleteAssetExamplePayload.data.assetId;
    nock(BASE)
      .delete(`/adobe/assets/${encodeURIComponent(deletedId)}`)
      .query({ force: "false" })
      .reply(204);
    const { result } = await invoke(deleteAsset, {
      connection,
      assetId: deletedId,
      force: false,
    });
    expect(result).toEqual(deleteAssetExamplePayload);
  });

  test("deletes with force and returns the job on a 202", async () => {
    nock(BASE)
      .delete(`/adobe/assets/${encodeURIComponent(assetId)}`)
      .query({ force: "true" })
      .reply(202, assetJobExamplePayload.data);
    const { result } = await invoke(deleteAsset, {
      connection,
      assetId,
      force: true,
    });
    expect(result).toEqual(assetJobExamplePayload);
  });

  test("returns the asset job state", async () => {
    const id = assetJobExamplePayload.data.jobId;
    nock(BASE)
      .get(`/adobe/assets/jobs/${id}/status`)
      .reply(200, assetJobExamplePayload.data);
    const { result } = await invoke(getAssetJobStatus, {
      connection,
      jobId: id,
    });
    expect(result).toEqual(assetJobExamplePayload);
  });

  test("surfaces a 404 for an unknown asset job", async () => {
    nock(BASE).get("/adobe/assets/jobs/missing/status").reply(404, {});
    await expect(
      invoke(getAssetJobStatus, { connection, jobId: "missing" }),
    ).rejects.toThrow("404");
  });

  test("surfaces a 404 on delete", async () => {
    nock(BASE).delete("/adobe/assets/missing").query(true).reply(404, {});
    await expect(
      invoke(deleteAsset, { connection, assetId: "missing", force: false }),
    ).rejects.toThrow("404");
  });
});
