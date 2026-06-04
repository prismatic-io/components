export const sendMessageExamplePayload = {
  data: {
    messaging_product: "whatsapp",
    contacts: [
      {
        input: "16505555555",
        wa_id: "16505555555",
      },
    ],
    messages: [
      {
        id: "wamid.HBgLMTY1MDUwNzY1MjAVAgARGBI5QTNDQTVCM0Q0Q0Q2RTY3RTcA",
      },
    ],
  },
};

export const requestVerificationCodeExamplePayload = {
  data: {
    success: true,
  },
};

export const registerPhoneNumberExamplePayload = {
  data: {
    success: true,
  },
};

export const uploadMediaExamplePayload = {
  data: {
    id: "<MEDIA_ID>",
  },
};

export const getMediaExamplePayload = {
  data: {
    messaging_product: "whatsapp",
    url: "<URL>",
    mime_type: "<MIME_TYPE>",
    sha256: "<HASH>",
    file_size: "<FILE_SIZE>",
    id: "<MEDIA_ID>",
  },
};

export const deleteMediaExamplePayload = {
  data: {
    success: true,
  },
};

export const getMediafromURLExamplePayload = {
  data: "<BINARY_DATA>",
};
