import { action, outputSchema } from "@prismatic-io/spectral";
import { closeUploadStreamExamplePayload } from "../../examplePayloads";
import { closeUploadStreamInputs } from "../../inputs";
import { closeUploadStreamOutputSchema } from "../../outputSchemas";
import { getUploadStream } from "../../utils";
export const closeUploadStream = action({
  display: {
    label: "Close Upload Stream",
    description: "Close an upload stream",
  },
  inputs: closeUploadStreamInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: closeUploadStreamOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async ({ executionState }, params) => {
    const { uploadFinisher, fileStream } = getUploadStream(
      executionState,
      params.uploadId,
    );
    fileStream.end();
    await uploadFinisher;
    return { data: null };
  },
  examplePerform: async () => closeUploadStreamExamplePayload,
  examplePayload: closeUploadStreamExamplePayload,
});
