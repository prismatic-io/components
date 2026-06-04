import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { getImageInputs as inputs } from "../../inputs/images";
import type { FieldsImage } from "../../types/FieldsImage";
import { getImageExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const getImage = action({
  display: {
    label: "Get Image",
    description: "Get the image with the given image ID.",
  },
  perform: async (context, { connection, imageId, fieldsImage }) => {
    const imagesApi = getApi(connection, KlaviyoApi.Images);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        imageId,
        fieldsImage,
        debug,
      });
    }
    const { body } = await imagesApi.getImage(imageId!, {
      fieldsImage: fieldsImage as FieldsImage[],
    });
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: getImageExamplePayload,
});
