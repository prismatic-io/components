import { invoke } from "@prismatic-io/spectral/testing";
import {
  createTemplateExamplePayload,
  deleteTemplateDocumentExamplePayload,
  getTemplateExamplePayload,
  listTemplateDocumentsExamplePayload,
  listTemplatesExamplePayload,
  updateTemplateDocumentExamplePayload,
  updateTemplateExamplePayload,
} from "../../examplePayloads";
import { ACCOUNT_PATH, connection, mockApi, useNock } from "../../testHelpers";
import { createTemplate } from "./createTemplate";
import { deleteTemplateDocument } from "./deleteTemplateDocument";
import { getTemplate } from "./getTemplate";
import { getTemplateDocument } from "./getTemplateDocument";
import { listTemplateDocuments } from "./listTemplateDocuments";
import { listTemplates } from "./listTemplates";
import { updateTemplate } from "./updateTemplate";
import { updateTemplateDocument } from "./updateTemplateDocument";

const TEMPLATE_ID = "6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13";
const DOCUMENT_ID = "1";
const PDF_TEXT = "%PDF-1.4 docusign test template";
const PDF_BYTES = Buffer.from(PDF_TEXT);
const templateBody = {
  name: "Mutual NDA",
  emailSubject: "Please sign the NDA",
  description: "Standard two-party NDA",
};
const templateDocumentBody = {
  document: { documentId: DOCUMENT_ID, name: "nda.pdf", fileExtension: "pdf" },
};

describe("templates actions", () => {
  useNock();

  describe("createTemplate", () => {
    const params = { connection, jsonInput: templateBody };

    it("posts the JSON body to /templates", async () => {
      const scope = mockApi()
        .post(`${ACCOUNT_PATH}/templates`, templateBody)
        .reply(201, createTemplateExamplePayload.data);

      const { result } = await invoke(createTemplate, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(createTemplateExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .post(`${ACCOUNT_PATH}/templates`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(createTemplate, params)).rejects.toThrow();
    });
  });

  describe("deleteTemplateDocument", () => {
    const params = {
      connection,
      templateId: TEMPLATE_ID,
      documentIds: [{ documentId: "1" }],
    };

    it("sends the document ids in the DELETE body", async () => {
      const scope = mockApi()
        .delete(`${ACCOUNT_PATH}/templates/${TEMPLATE_ID}/documents`, {
          documents: [{ documentId: "1" }],
        })
        .reply(200, deleteTemplateDocumentExamplePayload.data);

      const { result } = await invoke(deleteTemplateDocument, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(deleteTemplateDocumentExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .delete(`${ACCOUNT_PATH}/templates/${TEMPLATE_ID}/documents`)
        .reply(404, { errorCode: "TEMPLATE_NOT_FOUND" });

      await expect(invoke(deleteTemplateDocument, params)).rejects.toThrow();
    });
  });

  describe("getTemplate", () => {
    const params = { connection, templateId: TEMPLATE_ID };

    it("reads the template by id", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/templates/${TEMPLATE_ID}`)
        .reply(200, getTemplateExamplePayload.data);

      const { result } = await invoke(getTemplate, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getTemplateExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/templates/${TEMPLATE_ID}`)
        .reply(404, { errorCode: "TEMPLATE_NOT_FOUND" });

      await expect(invoke(getTemplate, params)).rejects.toThrow();
    });
  });

  describe("getTemplateDocument", () => {
    const params = {
      connection,
      templateId: TEMPLATE_ID,
      documentId: DOCUMENT_ID,
      encrypt: false,
      fileType: undefined,
      showChanges: true,
    };

    it("downloads the document as a decoded string", async () => {
      const scope = mockApi()
        .get(
          `${ACCOUNT_PATH}/templates/${TEMPLATE_ID}/documents/${DOCUMENT_ID}`,
        )
        .query({ encrypt: "false", show_changes: "true" })
        .reply(200, PDF_BYTES, { "Content-Type": "application/pdf" });

      const { result } = await invoke(getTemplateDocument, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual({ data: PDF_TEXT });
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(
          `${ACCOUNT_PATH}/templates/${TEMPLATE_ID}/documents/${DOCUMENT_ID}`,
        )
        .query(true)
        .reply(404, { errorCode: "DOCUMENT_DOES_NOT_EXIST" });

      await expect(invoke(getTemplateDocument, params)).rejects.toThrow();
    });
  });

  describe("listTemplateDocuments", () => {
    const params = { connection, templateId: TEMPLATE_ID };

    it("lists the template documents", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/templates/${TEMPLATE_ID}/documents`)
        .reply(200, listTemplateDocumentsExamplePayload.data);

      const { result } = await invoke(listTemplateDocuments, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(listTemplateDocumentsExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/templates/${TEMPLATE_ID}/documents`)
        .reply(404, { errorCode: "TEMPLATE_NOT_FOUND" });

      await expect(invoke(listTemplateDocuments, params)).rejects.toThrow();
    });
  });

  describe("listTemplates", () => {
    const params = { connection, fetchAll: false };

    it("reads one page of templates", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/templates`)
        .reply(200, listTemplatesExamplePayload.data);

      const { result } = await invoke(listTemplates, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(listTemplatesExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/templates`)
        .reply(500, { errorCode: "UNSPECIFIED_ERROR" });

      await expect(invoke(listTemplates, params)).rejects.toThrow();
    });
  });

  describe("updateTemplate", () => {
    const params = {
      connection,
      jsonInput: templateBody,
      templateId: TEMPLATE_ID,
    };

    it("puts the JSON body to the template", async () => {
      const scope = mockApi()
        .put(`${ACCOUNT_PATH}/templates/${TEMPLATE_ID}`, templateBody)
        .reply(200, updateTemplateExamplePayload.data);

      const { result } = await invoke(updateTemplate, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(updateTemplateExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .put(`${ACCOUNT_PATH}/templates/${TEMPLATE_ID}`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(updateTemplate, params)).rejects.toThrow();
    });
  });

  describe("updateTemplateDocument", () => {
    const params = {
      connection,
      jsonInput: templateDocumentBody,
      templateId: TEMPLATE_ID,
      documentId: DOCUMENT_ID,
    };

    it("puts the JSON body to the template document", async () => {
      const scope = mockApi()
        .put(
          `${ACCOUNT_PATH}/templates/${TEMPLATE_ID}/documents/${DOCUMENT_ID}`,
          templateDocumentBody,
        )
        .reply(200, updateTemplateDocumentExamplePayload.data);

      const { result } = await invoke(updateTemplateDocument, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(updateTemplateDocumentExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .put(
          `${ACCOUNT_PATH}/templates/${TEMPLATE_ID}/documents/${DOCUMENT_ID}`,
        )
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(updateTemplateDocument, params)).rejects.toThrow();
    });
  });
});
