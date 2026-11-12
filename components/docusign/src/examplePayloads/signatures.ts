const accountStampSignature = {
  signatureId: "7b3e9d1f-2c6a-4f8e-b5d4-9a1c3e7f2b56",
  signatureName: "Example Corp Seal",
  signatureType: "stamp",
  signatureInitials: "EC",
  stampType: "name_stamp",
  stampFormat: "NameDateHanko",
  stampSizeMM: "15",
  signatureFont: "7_DocuSign",
  isDefault: "false",
  disallowUserResizeStamp: "false",
  dateStampProperties: {
    dateAreaX: "0",
    dateAreaY: "0",
    dateAreaWidth: "0",
    dateAreaHeight: "0",
  },
  signatureUsers: [
    {
      userId: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
      userName: "Jane Doe",
      rights: "admin",
      isDefault: "false",
    },
  ],
  signatureGroups: [],
  stampImageUri: "/signatures/7b3e9d1f-2c6a-4f8e-b5d4-9a1c3e7f2b56/stamp_image",
  createdDateTime: "2026-10-28T14:12:09.5300000Z",
  adoptedDateTime: "2026-10-28T14:12:09.5300000Z",
  lastModifiedDateTime: "2026-10-28T14:12:09.5300000Z",
  status: "active",
};

export const createAccountSignatureExamplePayload = {
  data: {
    accountSignatures: [accountStampSignature],
  },
};

export const getAccountSignatureExamplePayload = {
  data: accountStampSignature,
};

export const updateAccountSignatureExamplePayload = {
  data: {
    ...accountStampSignature,
    signatureName: "Example Corp Official Seal",
    lastModifiedDateTime: "2026-11-02T09:41:27.1170000Z",
  },
};

export const updateAccountSignatureImageExamplePayload = {
  data: {
    ...accountStampSignature,
    imageType: "stamp_image",
    lastModifiedDateTime: "2026-11-02T09:55:03.8800000Z",
  },
};

export const deleteAccountSignatureExamplePayload = {
  data: "",
};

export const getRecipientSignatureExamplePayload = {
  data: {
    signatureId: "3e8a1c5f-7d2b-4e9a-b6c4-0f5d3a8e1b72",
    signatureName: "Jane Doe",
    signatureInitials: "JD",
    signatureType: "signature",
    signatureFont: "1_DocuSign",
    isDefault: "true",
    signatureImageUri:
      "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/recipients/1/signature_image",
    initialsImageUri:
      "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/recipients/1/initials_image",
    createdDateTime: "2025-01-15T10:42:18.6070000Z",
    adoptedDateTime: "2025-01-15T10:42:18.6070000Z",
    lastModifiedDateTime: "2025-01-15T10:42:18.6070000Z",
    status: "active",
  },
};
