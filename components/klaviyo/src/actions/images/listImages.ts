import { action, outputSchema } from "@prismatic-io/spectral";
import { listImagesOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { listImagesInputs as inputs } from "../../inputs";
import { fetchImages } from "../../util";
import { listImagesExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsImage } from "../../types";
export const listImages = action({
  display: {
    label: "List Images",
    description: "Get all images in an account.",
  },
  performSafety: "notAllowed",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listImagesOutputSchema,
  }),
  examplePayload: listImagesExamplePayload,
});
