import { action, outputSchema, util } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createArenaClient } from "../../client";
import { createItemImageExamplePayload } from "../../examplePayloads";
import { createItemImageInputs } from "../../inputs";
import { createItemImageOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createItemImage = action({
  display: {
    label: "Create Item Image",
    description: "Upload and set an image as the thumbnail of an item.",
  },
  inputs: createItemImageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createItemImageOutputSchema,
  }),
  examplePayload: createItemImageExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const formData = new FormData();
      const buffer = Buffer.from(util.types.toString(params.content), "base64");
      const filename = params.filename
        ? util.types.toString(params.filename)
        : "image.jpg";
      formData.append("content", buffer, {
        filename: filename,
        contentType: "image/jpeg",
      });
      const { data } = await client.post(
        `/items/${util.types.toString(params.itemGuid)}/image`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Item Image");
    }
  },
});
