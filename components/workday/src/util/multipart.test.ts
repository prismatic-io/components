import { parseJsonDataPart } from "../testHelpers";
import { createMultipartBody, getAttachmentFileName } from "./multipart";

describe("createMultipartBody", () => {
  it("puts the request JSON in an application/json jsonData part", () => {
    const { body, headers } = createMultipartBody({
      days: [{ date: "2026-10-20" }],
      comment: undefined,
    });
    const text = body.toString();

    expect(headers["content-type"]).toMatch(/^multipart\/form-data; boundary=/);
    expect(parseJsonDataPart(text)).toEqual({
      days: [{ date: "2026-10-20" }],
    });
    expect(text).not.toContain('name="file"');
  });

  it("adds the binary file part with its name and content type", () => {
    const { body } = createMultipartBody(
      { fileName: "invoice.pdf" },
      {
        payload: {
          data: Buffer.from("%PDF-1.4"),
          contentType: "application/pdf",
        },
        fileName: "invoice.pdf",
      },
    );
    const text = body.toString();

    expect(text).toContain(
      'name="file"; filename="invoice.pdf"\r\nContent-Type: application/pdf',
    );
    expect(text).toContain("%PDF-1.4");
  });
});

describe("getAttachmentFileName", () => {
  const file = (contentType: string, suggestedExtension?: string) => ({
    data: Buffer.from("x"),
    contentType,
    suggestedExtension,
  });

  it("keeps the File Name input when set", () => {
    expect(getAttachmentFileName(file("text/plain"), "notes.txt")).toBe(
      "notes.txt",
    );
  });

  it("uses the suggested extension first", () => {
    expect(getAttachmentFileName(file("text/plain", "pdf"), undefined)).toBe(
      "attachment.pdf",
    );
  });

  it("falls back to the content type when the suggested extension is empty", () => {
    expect(getAttachmentFileName(file("application/pdf", ""), undefined)).toBe(
      "attachment.pdf",
    );
  });

  it("derives the extension from the content type", () => {
    expect(
      getAttachmentFileName(file("text/plain; charset=utf-8"), undefined),
    ).toBe("attachment.txt");
  });

  it("throws when no extension can be determined", () => {
    expect(() =>
      getAttachmentFileName(file("application/octet-stream"), undefined),
    ).toThrow(/Set File Name/);
  });
});
