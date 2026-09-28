import { action, outputSchema } from "@prismatic-io/spectral";
import { getImageOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { getImageInputs as inputs } from "../../inputs";
import { getImageExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsImage } from "../../types";
export const getImage = action({
  display: {
    label: "Get Image",
    description: "Get the image with the given image ID.",
  },
  performSafety: "safe",
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
    const { body } = await imagesApi.getImage(imageId, {
      fieldsImage: fieldsImage as FieldsImage[],
    });
    return {
      data: body,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getImageExamplePayload.data,
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getImageOutputSchema,
  }),
  examplePayload: getImageExamplePayload,
});
