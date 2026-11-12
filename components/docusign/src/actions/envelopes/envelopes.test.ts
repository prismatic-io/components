import { invoke } from "@prismatic-io/spectral/testing";
import {
  createEnvelopeExamplePayload,
  deleteEnvelopeDocumentExamplePayload,
  getEnvelopeExamplePayload,
  listEnvelopeDocumentsExamplePayload,
  updateEnvelopeDocumentExamplePayload,
  updateEnvelopeExamplePayload,
} from "../../examplePayloads";
import { ACCOUNT_PATH, connection, mockApi, useNock } from "../../testHelpers";
import { createEnvelope } from "./createEnvelope";
import { deleteEnvelopeDocument } from "./deleteEnvelopeDocument";
import { getEnvelope } from "./getEnvelope";
import { getEnvelopeDocument } from "./getEnvelopeDocument";
import { listEnvelopeDocuments } from "./listEnvelopeDocuments";
import { updateEnvelope } from "./updateEnvelope";
import { updateEnvelopeDocument } from "./updateEnvelopeDocument";

const ENVELOPE_ID = "4b3a2918-0f7e-4d6c-b5a4-938271605f4e";
const DOCUMENT_ID = "1";
const PDF_TEXT = "%PDF-1.4 docusign test document";
const PDF_BYTES = Buffer.from(PDF_TEXT);
const envelopeBody = {
  emailSubject: "Please sign this agreement",
  status: "sent",
  recipients: {
    signers: [
      { email: "jane.doe@example.com", name: "Jane Doe", recipientId: "1" },
    ],
  },
};

describe("envelopes actions", () => {
  useNock();

  describe("createEnvelope", () => {
    const params = {
      connection,
      jsonInput: envelopeBody,
      changeRoutingOrder: false,
      mergeRolesOnDraft: true,
    };

    it("posts the JSON body with the routing and merge query flags", async () => {
      const scope = mockApi()
        .post(`${ACCOUNT_PATH}/envelopes`, envelopeBody)
        .query({ change_routing_order: "false", merge_roles_on_draft: "true" })
        .reply(201, createEnvelopeExamplePayload.data);

      const { result } = await invoke(createEnvelope, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(createEnvelopeExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .post(`${ACCOUNT_PATH}/envelopes`)
        .query(true)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(createEnvelope, params)).rejects.toThrow();
    });
  });

  describe("deleteEnvelopeDocument", () => {
    const params = {
      connection,
      envelopeId: ENVELOPE_ID,
      documentIds: [{ documentId: "1" }, { documentId: "2" }],
    };

    it("sends the document ids in the DELETE body", async () => {
      const scope = mockApi()
        .delete(`${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/documents`, {
          documents: [{ documentId: "1" }, { documentId: "2" }],
        })
        .reply(200, deleteEnvelopeDocumentExamplePayload.data);

      const { result } = await invoke(deleteEnvelopeDocument, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(deleteEnvelopeDocumentExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .delete(`${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/documents`)
        .reply(400, { errorCode: "ENVELOPE_INVALID_STATUS" });

      await expect(invoke(deleteEnvelopeDocument, params)).rejects.toThrow();
    });
  });

  describe("getEnvelope", () => {
    const params = {
      connection,
      envelopeId: ENVELOPE_ID,
      advancedUpdate: false,
      include: "recipients,tabs",
    };

    it("reads the envelope with the include list", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}`)
        .query({ advanced_update: "false", include: "recipients,tabs" })
        .reply(200, getEnvelopeExamplePayload.data);

      const { result } = await invoke(getEnvelope, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getEnvelopeExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}`)
        .query(true)
        .reply(404, { errorCode: "ENVELOPE_DOES_NOT_EXIST" });

      await expect(invoke(getEnvelope, params)).rejects.toThrow();
    });
  });

  describe("getEnvelopeDocument", () => {
    const params = {
      connection,
      envelopeId: ENVELOPE_ID,
      documentId: DOCUMENT_ID,
      certificate: false,
      documentsByUserid: false,
      encrypt: false,
      language: undefined,
      recipientId: undefined,
      sharedUserId: undefined,
      showChanges: false,
      watermark: false,
    };

    it("downloads the document as a decoded string", async () => {
      const scope = mockApi()
        .get(
          `${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/documents/${DOCUMENT_ID}`,
        )
        .query({
          certificate: "false",
          documents_by_userid: "false",
          encrypt: "false",
          show_changes: "false",
          watermark: "false",
        })
        .reply(200, PDF_BYTES, { "Content-Type": "application/pdf" });

      const { result } = await invoke(getEnvelopeDocument, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual({ data: PDF_TEXT });
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(
          `${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/documents/${DOCUMENT_ID}`,
        )
        .query(true)
        .reply(404, { errorCode: "DOCUMENT_DOES_NOT_EXIST" });

      await expect(invoke(getEnvelopeDocument, params)).rejects.toThrow();
    });
  });

  describe("listEnvelopeDocuments", () => {
    const params = {
      connection,
      envelopeId: ENVELOPE_ID,
      documentsByUserid: false,
      includeMetadata: true,
      includeTabs: false,
      recipientId: undefined,
      sharedUserId: undefined,
    };

    it("lists the envelope documents with the flags as query params", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/documents`)
        .query({
          documents_by_userid: "false",
          include_metadata: "true",
          include_tabs: "false",
        })
        .reply(200, listEnvelopeDocumentsExamplePayload.data);

      const { result } = await invoke(listEnvelopeDocuments, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(listEnvelopeDocumentsExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/documents`)
        .query(true)
        .reply(404, { errorCode: "ENVELOPE_DOES_NOT_EXIST" });

      await expect(invoke(listEnvelopeDocuments, params)).rejects.toThrow();
    });
  });

  describe("updateEnvelope", () => {
    const params = {
      connection,
      jsonInput: envelopeBody,
      envelopeId: ENVELOPE_ID,
      advancedUpdate: true,
      resendEnvelope: false,
    };

    it("puts the JSON body with the update flags", async () => {
      const scope = mockApi()
        .put(`${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}`, envelopeBody)
        .query({ advanced_update: "true", resend_envelope: "false" })
        .reply(200, updateEnvelopeExamplePayload.data);

      const { result } = await invoke(updateEnvelope, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(updateEnvelopeExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .put(`${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}`)
        .query(true)
        .reply(400, { errorCode: "ENVELOPE_INVALID_STATUS" });

      await expect(invoke(updateEnvelope, params)).rejects.toThrow();
    });
  });

  describe("updateEnvelopeDocument", () => {
    const params = {
      connection,
      documentName: "agreement.pdf",
      envelopeId: ENVELOPE_ID,
      documentId: DOCUMENT_ID,
      pdfBuffer: PDF_BYTES,
    };

    it("puts the raw PDF bytes with the filename and PDF content type", async () => {
      const scope = mockApi()
        .matchHeader("content-type", "application/pdf")
        .matchHeader("content-disposition", 'filename="agreement.pdf"')
        .put(
          `${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/documents/${DOCUMENT_ID}`,
          PDF_TEXT,
        )
        .reply(200, updateEnvelopeDocumentExamplePayload.data);

      const { result } = await invoke(updateEnvelopeDocument, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(updateEnvelopeDocumentExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .put(
          `${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/documents/${DOCUMENT_ID}`,
        )
        .reply(400, { errorCode: "INVALID_CONTENT_TYPE" });

      await expect(invoke(updateEnvelopeDocument, params)).rejects.toThrow();
    });
  });
});
