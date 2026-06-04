import { input, util } from "@prismatic-io/spectral";
import { connection } from "./general";

const whatsappBusinessAccountId = input({
  label: "WhatsApp Business Account ID",
  comments:
    "The ID of the WhatsApp Business Account to retrieve phone numbers for.",
  type: "string",
  required: true,
  example: "12345678901234567",
  placeholder: "Enter WhatsApp Business Account ID",
  clean: util.types.toString,
});

export const selectPhoneInputs = { connection, whatsappBusinessAccountId };
