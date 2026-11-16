import { updateFileInputs, uploadFileInputs } from "./files";

describe("fileData", () => {
  test.each([
    ["uploadFile", uploadFileInputs.fileData],
    ["updateFile", updateFileInputs.fileData],
  ])("%s wraps text and keeps a data payload", (_key, definition) => {
    expect(definition.clean?.("Region,Amount")).toEqual({
      data: Buffer.from("Region,Amount"),
      contentType: "text/plain",
    });

    const payload = { data: Buffer.from("Region,Amount"), contentType: "text/csv" };
    expect(definition.clean?.(payload)).toEqual(payload);
  });

  test("rejects a value that cannot become file data", () => {
    expect(() => uploadFileInputs.fileData.clean?.(undefined)).toThrow(
      "Value 'undefined' cannot be converted to a Buffer.",
    );
  });
});
