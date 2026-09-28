import { action, outputSchema } from "@prismatic-io/spectral";
import { updateImageOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { updateImageInputs as inputs } from "../../inputs";
import { type ImagePartialUpdateQuery, ImageEnum } from "klaviyo-api";
import { updateImageExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const updateImage = action({
  display: {
    label: "Update Image",
    description: "Update the image with the given image ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, imageId, imageName, imageHidden }) => {
    const imagesApi = getApi(connection, KlaviyoApi.Images);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        imageId,
        imageName,
        imageHidden,
        debug,
      });
    }
    const image: ImagePartialUpdateQuery = {
      data: {
        type: ImageEnum.Image,
        attributes: {
          name: imageName,
          hidden: imageHidden,
        },
        id: imageId,
      },
    };
    const { body } = await imagesApi.updateImage(imageId, image);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateImageOutputSchema,
  }),
  examplePayload: updateImageExamplePayload,
});
