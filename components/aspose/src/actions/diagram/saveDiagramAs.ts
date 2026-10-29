import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { saveDiagramAsExamplePayload } from "../../examplePayloads";
import {
  connection,
  defaultFont,
  destinationFileName,
  destinationPath,
  fileName,
  folderPath,
  overwrite,
} from "../../inputs";

export const saveDiagramAs = action({
  display: {
    label: "Save Diagram As",
    description:
      "Converts document to destination format with detailed settings and saves result to storage.",
  },
  inputs: {
    connection,
    fileName: {
      ...fileName,
      label: "Original Document Name",
      comments: "Name of the original document.",
    },
    destinationPath,
    destinationFileName,
    folderName: {
      ...folderPath,
      required: false,
      label: "Folder Name",
      comments: "Original document folder.",
    },
    overwrite,
    defaultFont,
  },
  perform: async (
    context,
    {
      connection,
      fileName,
      folderName,
      overwrite,
      defaultFont,
      destinationPath,
      destinationFileName,
    },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    const { data } = await client.post(
      `/diagram/${fileName}/saveAs`,
      {
        name: fileName,
        folder: folderName,
        saveOptionsRequest: {
          Folder: destinationPath,
          FileName: destinationFileName,
          saveOptions: {
            DefaultFont: defaultFont,
          },
        },
      },
      {
        params: {
          isOverwrite: overwrite,
        },
      },
    );

    return { data };
  },
  examplePayload: saveDiagramAsExamplePayload,
});
