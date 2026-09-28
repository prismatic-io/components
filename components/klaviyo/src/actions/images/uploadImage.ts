import { action, outputSchema } from "@prismatic-io/spectral";
import { uploadImageOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { uploadImageInputs as inputs } from "../../inputs";
import { type ImageCreateQuery, ImageEnum } from "klaviyo-api";
import { bufferToDataUri } from "../../util";
import { uploadImageExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const uploadImage = action({
  display: {
    label: "Upload Image",
    description: "Import an image from a url or file.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, imageUrl, imageName, fileData }) => {
    const imagesApi = getApi(connection, KlaviyoApi.Images);
    const debug = context.debug.enabled;
    const importFromUrl =
      imageUrl || bufferToDataUri(fileData.data, fileData.contentType);
    if (debug) {
      context.logger.debug({
        connection,
        imageUrl,
        imageName,
        fileData,
        debug,
      });
    }
    const image: ImageCreateQuery = {
      data: {
        type: ImageEnum.Image,
        attributes: {
          importFromUrl,
          name: imageName,
        },
      },
    };
    const { body } = await imagesApi.uploadImageFromUrl(image);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadImageOutputSchema,
  }),
  examplePayload: uploadImageExamplePayload,
});
