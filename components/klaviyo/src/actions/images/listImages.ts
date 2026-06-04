import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { listImagesInputs as inputs } from "../../inputs/images";
import type { FieldsImage } from "../../types/FieldsImage";
import { fetchImages } from "../../utils";
import { listImagesExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const listImages = action({
  display: {
    label: "List Images",
    description: "Get all images in an account.",
  },
  perform: async (context, { connection, fieldsImage }) => {
    const imagesApi = getApi(connection, KlaviyoApi.Images);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, fieldsImage, debug });
    }
    const data = await fetchImages(
      imagesApi,
      fieldsImage as FieldsImage[],
      [],
      undefined,
    );
    return {
      data,
    };
  },
  inputs,
  examplePayload: listImagesExamplePayload,
});
