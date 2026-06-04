import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { uploadMediaInputs } from "../inputs/uploadMediaInputs";
import { uploadMediaExamplePayload } from "../examplePayloads";
import FormData from "form-data";

export const uploadMedia = action({
  display: {
    label: "Upload Media",
    description: "Upload media to WhatsApp.",
  },
  perform: async (context, { connection, phoneNumberId, file, filename }) => {
    const client = getClient(connection, context.debug.enabled);

    const formData = new FormData();
    formData.append("messaging_product", "whatsapp");
    formData.append("file", file.data, { filename });

    const { data } = await client.post(`/${phoneNumberId}/media`, formData, {
      maxBodyLength: Infinity,
      headers: {
        ...formData.getHeaders(),
      },
    });
    return {
      data,
    };
  },
  inputs: uploadMediaInputs,
  examplePayload: uploadMediaExamplePayload,
});
