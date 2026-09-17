import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { getFileMetadata } from "./getFileMetadata";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("getFileMetadata", () => {
  afterEach(() => nock.cleanAll());
  test("returns the file's metadata", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/1t_RTuXpBgBEEC1TfZILWJJSBr2gilSFTyhDO_6RwSBs")
      .query(true)
      .reply(200, {
        id: "1t_RTuXpBgBEEC1TfZILWJJSBr2gilSFTyhDO_6RwSBs",
        name: "Fountain AX <> ADP WFN Marketplace Mapping",
        mimeType: "application/vnd.google-apps.spreadsheet",
        thumbnailLink:
          "https://lh3.googleusercontent.com/drive-storage/AJQWtBNQ460KV9YNsFDL_x3WQq6D019SkKdIUuWzGO2YKBSiLOfmFtlunKSyC02yi7bycbMN_n2DB1k7OJ5akXI6ZrQ0s0y6qHOaaTrOJyis6EeSsEnJMrFOeNzzn3jo0kg=s220",
      });
    const { result } = await invoke(getFileMetadata, {
      connection,
      fileId: "1t_RTuXpBgBEEC1TfZILWJJSBr2gilSFTyhDO_6RwSBs",
      metadataFields: "id,name,mimeType,thumbnailLink",
    });
    expect(result.data).toEqual({
      id: "1t_RTuXpBgBEEC1TfZILWJJSBr2gilSFTyhDO_6RwSBs",
      name: "Fountain AX <> ADP WFN Marketplace Mapping",
      mimeType: "application/vnd.google-apps.spreadsheet",
      thumbnailLink:
        "https://lh3.googleusercontent.com/drive-storage/AJQWtBNQ460KV9YNsFDL_x3WQq6D019SkKdIUuWzGO2YKBSiLOfmFtlunKSyC02yi7bycbMN_n2DB1k7OJ5akXI6ZrQ0s0y6qHOaaTrOJyis6EeSsEnJMrFOeNzzn3jo0kg=s220",
    });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/missing-file")
      .query(true)
      .reply(404, { error: { message: "File not found" } });
    await expect(
      invoke(getFileMetadata, {
        connection,
        fileId: "missing-file",
        metadataFields: "id,name",
      }),
    ).rejects.toThrow();
  });
});
