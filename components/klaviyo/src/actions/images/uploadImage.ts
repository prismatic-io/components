import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { uploadImageInputs as inputs } from "../../inputs/images";
import { type ImageCreateQuery, ImageEnum } from "klaviyo-api";
import { bufferToDataUri } from "../../utils";
import { uploadImageExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const uploadImage = action({
  display: {
    label: "Upload Image",
    description: "Import an image from a url or file.",
  },
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
  examplePayload: uploadImageExamplePayload,
});
