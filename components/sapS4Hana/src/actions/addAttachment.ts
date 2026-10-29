import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { requestBody, connectionInput } from "../inputs";

export const addAttachment = action({
  display: {
    label: "Add Attachment",
    description:
      "Uploads an attachment to a business object using the file name, mime type of the attachment, business object type, and business object instance key.",
  },
  perform: async (_context, { requestBody, connectionInput }) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "*/*",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.post(
        "/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/AttachmentContentSet",
        requestBody,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    requestBody,
    connectionInput,
  },
});
