import { action, outputSchema } from "@prismatic-io/spectral";
import { writeUploadStreamExamplePayload } from "../../examplePayloads";
import { writeUploadStreamInputs } from "../../inputs";
import { writeUploadStreamOutputSchema } from "../../outputSchemas";
import { getUploadStream } from "../../utils";
export const writeUploadStream = action({
  display: {
    label: "Write Upload Stream",
    description: "Write to an upload stream",
  },
  inputs: writeUploadStreamInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: writeUploadStreamOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async ({ executionState }, params) => {
    const { fileStream } = getUploadStream(executionState, params.uploadId);
    await new Promise((resolve) => {
      if (!fileStream.write(params.fileContents.data)) {
        fileStream.once("drain", resolve);
      } else {
        resolve(true);
      }
    });
    return { data: null };
  },
  examplePerform: async () => writeUploadStreamExamplePayload,
  examplePayload: writeUploadStreamExamplePayload,
});
