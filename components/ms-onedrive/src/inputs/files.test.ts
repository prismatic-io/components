import { listChangesInputs, updateFileInputs, uploadFileInputs } from "./files";

const { deltaURL, queryParameters } = listChangesInputs;
const { fileData, timeout } = uploadFileInputs;

describe("deltaURL input", () => {
  test("keeps a value and turns a missing one into an empty string", () => {
    const delta =
      "/drives/b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd/root/delta";
    expect(deltaURL.clean?.(delta)).toBe(delta);
    expect(deltaURL.clean?.(undefined)).toBe("");
  });
});

describe("fileData input", () => {
  test("wraps a string in a text data payload", () => {
    expect(fileData.clean?.("id,name\n1,Ada")).toEqual({
      data: Buffer.from("id,name\n1,Ada"),
      contentType: "text/plain",
    });
  });

  test("wraps a Buffer in a binary data payload", () => {
    const bytes = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
    expect(fileData.clean?.(bytes)).toEqual({
      data: bytes,
      contentType: "application/octet-stream",
    });
  });

  test("rejects a value that cannot become file data", () => {
    expect(() => fileData.clean?.(42)).toThrow(
      "Value '42' cannot be converted to a Buffer.",
    );
  });
});

describe("$top query parameter", () => {
  test("cleans the page size to a number and a blank value to undefined", () => {
    expect(queryParameters.inputs.$top.clean?.("5")).toBe(5);
    expect(queryParameters.inputs.$top.clean?.("")).toBeUndefined();
  });
});

describe("timeout input", () => {
  test("cleans the milliseconds to a number and a blank value to undefined", () => {
    expect(timeout.clean?.("3000")).toBe(3000);
    expect(timeout.clean?.("")).toBeUndefined();
  });
});

describe("updateFile optional overrides", () => {
  test("clean a blank new name or path to undefined so the request leaves them out", () => {
    expect(updateFileInputs.fileName.clean?.("")).toBeUndefined();
    expect(updateFileInputs.path.clean?.("   ")).toBeUndefined();
    expect(updateFileInputs.fileName.clean?.(" Report.docx ")).toBe(
      "Report.docx",
    );
  });
});
