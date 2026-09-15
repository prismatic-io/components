import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  createInstalledEquipmentAttachmentExamplePayload,
  getJobExamplePayload,
} from "../examplePayloads";
import {
  api,
  BASE,
  connection,
  prefix,
  REQUIRED_HEADERS,
} from "../testHelpers";
import { createInstalledEquipmentAttachment } from "./installedEquipment/createInstalledEquipmentAttachment";
import { listInstalledEquipmentAttachments } from "./installedEquipment/listInstalledEquipmentAttachments";
import { rawRequest } from "./misc/rawRequest";
import { createPayment } from "./payments/createPayment";
const { "Content-type": _jsonContentType, ...MULTIPART_UPLOAD_HEADERS } =
  REQUIRED_HEADERS;
const multipartApi = () => nock(BASE, { reqheaders: MULTIPART_UPLOAD_HEADERS });
afterEach(() => nock.cleanAll());
describe("createInstalledEquipmentAttachment (multipart upload)", () => {
  test("posts the file buffer under a multipart content-type carrying a boundary", async () => {
    let sentContentType = "";
    let sentBody = "";
    multipartApi()
      .post(`${prefix("equipmentsystems")}/installed-equipment/attachments`)
      .reply(200, function (_uri, body) {
        sentContentType = String(this.req.headers["content-type"]);
        sentBody = String(body);
        return createInstalledEquipmentAttachmentExamplePayload.data;
      });
    const { result } = await invoke(createInstalledEquipmentAttachment, {
      connection,
      file: { data: Buffer.from("id,name\n1,Acme\n"), contentType: "text/csv" },
      fileName: "equipment.csv",
    });
    expect(sentContentType).toMatch(/^multipart\/form-data; boundary=.+/);
    expect(sentBody).toContain('Content-Disposition: form-data; name="file"');
    expect(sentBody).toContain('filename="equipment.csv"');
    expect(sentBody).toContain("Content-Type: text/csv");
    expect(sentBody).toContain("id,name");
    expect(result.data).toEqual(
      createInstalledEquipmentAttachmentExamplePayload.data,
    );
  });
  test("surfaces a rejected upload", async () => {
    multipartApi()
      .post(`${prefix("equipmentsystems")}/installed-equipment/attachments`)
      .reply(413, { title: "Payload Too Large" });
    await expect(
      invoke(createInstalledEquipmentAttachment, {
        connection,
        file: { data: Buffer.from("x"), contentType: "text/csv" },
        fileName: "equipment.csv",
      }),
    ).rejects.toThrow();
  });
});
describe("listInstalledEquipmentAttachments (binary download)", () => {
  test("forwards the path filter and returns the body untouched", async () => {
    let sentQuery: Record<string, string | string[] | undefined> = {};
    api()
      .get(`${prefix("equipmentsystems")}/installed-equipment/attachments`)
      .query((q) => {
        sentQuery = q;
        return true;
      })
      .reply(200, Buffer.from("ExampleFile"), {
        "content-type": "application/octet-stream",
      });
    const { result } = await invoke(listInstalledEquipmentAttachments, {
      connection,
      path: "department",
    });
    expect(sentQuery).toEqual({ path: "department" });
    expect(result.data).toBe("ExampleFile");
  });
  test("surfaces a failing download", async () => {
    api()
      .get(`${prefix("equipmentsystems")}/installed-equipment/attachments`)
      .query(true)
      .reply(404, { title: "Not Found" });
    await expect(
      invoke(listInstalledEquipmentAttachments, {
        connection,
        path: "department",
      }),
    ).rejects.toThrow();
  });
});
describe("createPayment (deprecated stub)", () => {
  test("rejects with the removed-endpoint message without making a request", async () => {
    await expect(
      invoke(createPayment, {
        connection,
        typeId: 4,
        splits: [{ invoiceId: 1, amount: 10 }],
        memo: "",
        paidOn: "",
        authCode: "",
        checkNumber: "",
        exportId: "",
        status: "",
      }),
    ).rejects.toThrow(
      "ServiceTitan removed the Create Payment endpoint (POST /payments) from the V2 API. Payment creation is no longer supported via the API.",
    );
  });
});
describe("rawRequest (raw passthrough)", () => {
  test("forwards the method, path and all four headers, and returns the response untouched", async () => {
    let sentHeaders: Record<string, unknown> = {};
    nock(BASE)
      .get(`${prefix("jpm")}/jobs`)
      .reply(200, function () {
        sentHeaders = this.req.headers;
        return getJobExamplePayload.data;
      });
    const { result } = await invoke(rawRequest, {
      connection,
      urlType: "jpm",
      url: "/jobs",
      method: "GET",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: [] as unknown as Record<string, string>,
      queryParams: [],
      headers: [],
      responseType: "json",
      timeout: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });
    expect(sentHeaders.authorization).toBe("Bearer test-access-token");
    expect(sentHeaders.accept).toBe("application/json");
    expect(sentHeaders["content-type"]).toBe("application/json");
    expect(sentHeaders["st-app-key"]).toBe("ak1.testapplicationkey");
    expect(result.data).toEqual(getJobExamplePayload.data);
  });
});
