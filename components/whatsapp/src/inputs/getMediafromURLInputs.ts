import { input, util } from "@prismatic-io/spectral";
import { connection } from "./general";

const url = input({
  label: "URL",
  comments: "A URL returned by the Get Media action to download media from.",
  type: "string",
  placeholder: "URL",
  example:
    "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=12345...",
  required: true,
  clean: util.types.toString,
});

export const getMediafromURLInputs = { connection, url };
