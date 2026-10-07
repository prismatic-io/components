import { util } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { uploadFileExamplePayload } from "../../examplePayloads";
import {
  ACCESS_TOKEN,
  connection,
  UPLOAD_BASE,
  useNock,
} from "../../testHelpers";
import { uploadFile } from "./uploadFile";
const params = {
  connection,
  spaceId: "yadj1kx9rmg0",
  fileContents: util.types.toData(Buffer.from("hello world")),
};
describe("uploadFile", () => {
  useNock();
  test("happy path posts octet-stream to the upload host and returns the upload", async () => {
    let sentHeaders: Record<string, unknown> = {};
    let sentBody: unknown;
    const scope = nock(UPLOAD_BASE)
      .post("/spaces/yadj1kx9rmg0/uploads")
      .reply(201, function (_uri, body) {
        sentHeaders = this.req.headers;
        sentBody = body;
        return uploadFileExamplePayload.data;
      });
    const { result } = await invoke(uploadFile, params);
    expect(scope.isDone()).toBe(true);
    expect(sentHeaders["content-type"]).toBe("application/octet-stream");
    expect(sentHeaders.authorization).toBe(`Bearer ${ACCESS_TOKEN}`);
    expect(sentBody).toBe("hello world");
    expect(result).toEqual(uploadFileExamplePayload);
  });
  test("error path surfaces a 403 from the upload host", async () => {
    nock(UPLOAD_BASE)
      .post("/spaces/yadj1kx9rmg0/uploads")
      .reply(403, { sys: { type: "Error", id: "AccessDenied" } });
    await expect(invoke(uploadFile, params)).rejects.toThrow();
  });
});
