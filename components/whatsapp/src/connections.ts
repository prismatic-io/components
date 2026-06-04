import { connection } from "@prismatic-io/spectral";

export const whatsAppAccessToken = connection({
  key: "whatsapp-access-token",
  display: {
    label: "Access Token",
    description: "Access Token connection for WhatsApp",
  },
  inputs: {
    accessToken: {
      label: "Access Token",
      placeholder: "Enter your Access Token",
      type: "password",
      required: true,
      comments: "Your WhatsApp Access Token.",
    },
  },
});

export default [whatsAppAccessToken];
