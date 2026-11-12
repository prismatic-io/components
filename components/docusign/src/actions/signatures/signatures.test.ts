import { invoke } from "@prismatic-io/spectral/testing";
import {
  createAccountSignatureExamplePayload,
  deleteAccountSignatureExamplePayload,
  getAccountSignatureExamplePayload,
  getRecipientSignatureExamplePayload,
  updateAccountSignatureExamplePayload,
  updateAccountSignatureImageExamplePayload,
} from "../../examplePayloads";
import {
  ACCOUNT_ID,
  ACCOUNT_PATH,
  connection,
  mockApi,
  useNock,
} from "../../testHelpers";
import { createAccountSignature } from "./createAccountSignature";
import { deleteAccountSignature } from "./deleteAccountSignature";
import { getAccountSignature } from "./getAccountSignature";
import { getAccountSignatureImage } from "./getAccountSignatureImage";
import { getRecipientSignature } from "./getRecipientSignature";
import { getRecipientSignatureImage } from "./getRecipientSignatureImage";
import { updateAccountSignature } from "./updateAccountSignature";
import { updateAccountSignatureImage } from "./updateAccountSignatureImage";

const SIGNATURE_ID = "7b3e9d1f-2c6a-4f8e-b5d4-9a1c3e7f2b56";
const ENVELOPE_ID = "4b3a2918-0f7e-4d6c-b5a4-938271605f4e";
const RECIPIENT_ID = "1";
const IMAGE_TEXT = "GIF89a docusign test image";
const IMAGE_BYTES = Buffer.from(IMAGE_TEXT);
const signaturesBody = {
  accountSignatures: [
    { signatureName: "Example Corp Seal", signatureType: "stamp" },
  ],
};

describe("signatures actions", () => {
  useNock();

  describe("createAccountSignature", () => {
    const params = { connection, jsonInput: signaturesBody };

    it("posts the JSON body to /signatures", async () => {
      const scope = mockApi()
        .post(`${ACCOUNT_PATH}/signatures`, signaturesBody)
        .reply(201, createAccountSignatureExamplePayload.data);

      const { result } = await invoke(createAccountSignature, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(createAccountSignatureExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .post(`${ACCOUNT_PATH}/signatures`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(createAccountSignature, params)).rejects.toThrow();
    });
  });

  describe("deleteAccountSignature", () => {
    const params = {
      connection,
      accountId: ACCOUNT_ID,
      signatureId: SIGNATURE_ID,
    };

    it("deletes the signature by id", async () => {
      const scope = mockApi()
        .delete(`${ACCOUNT_PATH}/signatures/${SIGNATURE_ID}`)
        .reply(200, deleteAccountSignatureExamplePayload.data);

      const { result } = await invoke(deleteAccountSignature, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(deleteAccountSignatureExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .delete(`${ACCOUNT_PATH}/signatures/${SIGNATURE_ID}`)
        .reply(404, { errorCode: "SIGNATURE_NOT_FOUND" });

      await expect(invoke(deleteAccountSignature, params)).rejects.toThrow();
    });
  });

  describe("getAccountSignature", () => {
    const params = { connection, signatureId: SIGNATURE_ID };

    it("reads the signature by id", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/signatures/${SIGNATURE_ID}`)
        .reply(200, getAccountSignatureExamplePayload.data);

      const { result } = await invoke(getAccountSignature, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getAccountSignatureExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/signatures/${SIGNATURE_ID}`)
        .reply(404, { errorCode: "SIGNATURE_NOT_FOUND" });

      await expect(invoke(getAccountSignature, params)).rejects.toThrow();
    });
  });

  describe("getAccountSignatureImage", () => {
    const params = {
      connection,
      signatureId: SIGNATURE_ID,
      imageType: "stamp_image",
    };

    it("downloads the image as a decoded string", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/signatures/${SIGNATURE_ID}/stamp_image`)
        .reply(200, IMAGE_BYTES, { "Content-Type": "image/gif" });

      const { result } = await invoke(getAccountSignatureImage, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual({ data: IMAGE_TEXT });
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/signatures/${SIGNATURE_ID}/stamp_image`)
        .reply(404, { errorCode: "SIGNATURE_NOT_FOUND" });

      await expect(invoke(getAccountSignatureImage, params)).rejects.toThrow();
    });
  });

  describe("getRecipientSignature", () => {
    const params = {
      connection,
      envelopeId: ENVELOPE_ID,
      recipientId: RECIPIENT_ID,
    };

    it("reads the recipient's signature information", async () => {
      const scope = mockApi()
        .get(
          `${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/recipients/${RECIPIENT_ID}/signature`,
        )
        .reply(200, getRecipientSignatureExamplePayload.data);

      const { result } = await invoke(getRecipientSignature, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getRecipientSignatureExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(
          `${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/recipients/${RECIPIENT_ID}/signature`,
        )
        .reply(404, { errorCode: "RECIPIENT_NOT_IN_SEQUENCE" });

      await expect(invoke(getRecipientSignature, params)).rejects.toThrow();
    });
  });

  describe("getRecipientSignatureImage", () => {
    const params = {
      connection,
      envelopeId: ENVELOPE_ID,
      recipientId: RECIPIENT_ID,
      includeChrome: true,
    };

    it("downloads the image as a decoded string with include_chrome", async () => {
      const scope = mockApi()
        .get(
          `${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/recipients/${RECIPIENT_ID}/signature_image`,
        )
        .query({ include_chrome: "true" })
        .reply(200, IMAGE_BYTES, { "Content-Type": "image/gif" });

      const { result } = await invoke(getRecipientSignatureImage, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual({ data: IMAGE_TEXT });
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(
          `${ACCOUNT_PATH}/envelopes/${ENVELOPE_ID}/recipients/${RECIPIENT_ID}/signature_image`,
        )
        .query(true)
        .reply(404, { errorCode: "RECIPIENT_NOT_IN_SEQUENCE" });

      await expect(
        invoke(getRecipientSignatureImage, params),
      ).rejects.toThrow();
    });
  });

  describe("updateAccountSignature", () => {
    const params = {
      connection,
      signatureIdPath: SIGNATURE_ID,
      dateAreaHeight: undefined,
      dateAreaWidth: undefined,
      dateAreaX: undefined,
      dateAreaY: undefined,
      disallowUserResizeStamp: false,
      externalID: undefined,
      imageType: undefined,
      isDefault: true,
      nrdsId: undefined,
      nrdsLastName: undefined,
      phoneticName: undefined,
      signatureFont: "7_DocuSign",
      signatureId: SIGNATURE_ID,
      signatureGroups: undefined,
      signatureInitials: "EC",
      signatureName: "Example Corp Seal",
      signatureType: "stamp",
      signatureUsers: undefined,
      stampFormat: "NameDateHanko",
      stampSizeMM: "15",
    };

    it("puts the cleaned body to the path signature id", async () => {
      const scope = mockApi()
        .put(`${ACCOUNT_PATH}/signatures/${SIGNATURE_ID}`, {
          disallowUserResizeStamp: "false",
          isDefault: "true",
          signatureFont: "7_DocuSign",
          signatureId: SIGNATURE_ID,
          signatureInitials: "EC",
          signatureName: "Example Corp Seal",
          signatureType: "stamp",
          stampFormat: "NameDateHanko",
          stampSizeMM: "15",
        })
        .reply(200, updateAccountSignatureExamplePayload.data);

      const { result } = await invoke(updateAccountSignature, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(updateAccountSignatureExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .put(`${ACCOUNT_PATH}/signatures/${SIGNATURE_ID}`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(updateAccountSignature, params)).rejects.toThrow();
    });
  });

  describe("updateAccountSignatureImage", () => {
    const params = {
      connection,
      signatureId: SIGNATURE_ID,
      imageType: "stamp_image",
    };

    it("puts to the signature image path with no image payload", async () => {
      let sentBody: unknown;
      const scope = mockApi()
        .put(
          `${ACCOUNT_PATH}/signatures/${SIGNATURE_ID}/stamp_image`,
          (body) => {
            sentBody = body;
            return true;
          },
        )
        .reply(200, updateAccountSignatureImageExamplePayload.data);

      const { result } = await invoke(updateAccountSignatureImage, params);

      expect(scope.isDone()).toBe(true);
      expect(sentBody).toEqual({});
      expect(result).toEqual(updateAccountSignatureImageExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .put(`${ACCOUNT_PATH}/signatures/${SIGNATURE_ID}/stamp_image`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(
        invoke(updateAccountSignatureImage, params),
      ).rejects.toThrow();
    });
  });
});
