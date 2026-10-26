import { parseJsonDataPart } from "../testHelpers";
import { createMultipartBody } from "./multipart";
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
