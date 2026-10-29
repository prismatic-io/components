import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { convertHtmlToPdfExamplePayload } from "../../examplePayloads";
import {
  connection,
  destinationPath,
  diagramName,
  height,
  htmlFileName,
  isLandscape,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  sourcePath,
  storageName,
  uploadToStorage,
  width,
} from "../../inputs";

export const convertHtmlToPdf = action({
  display: {
    label: "Convert HTML to PDF",
    description: "Converts HTML file in storage to PDF format.",
  },
  inputs: {
    connection,
    uploadToStorage,
    destinationPath: {
      ...destinationPath,
      required: false,
      label: "Destination Path",
      comments: "The destination document folder.",
    },
    storageName: {
      ...storageName,
      required: false,
      comments: "The document storage which contains the file.",
    },
    documentName: {
      ...diagramName,
      label: "Document Name",
      required: false,
      comments:
        "The document name located in storage. " +
        "(Note, this input is required in case you want to save the resulting " +
        "file in an Aspose storage).",
    },
    sourcePath: {
      ...sourcePath,
      required: false,
      comments:
        "Full source filename (ex. /folder1/folder2/template.zip). " +
        "Note: this input is required in case you want to get the resulting file in the response.",
    },
    htmlFileName,
    height,
    width,
    isLandscape,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
  },
  perform: async (
    context,
    {
      htmlFileName,
      height,
      width,
      isLandscape,
      marginBottom,
      marginTop,
      sourcePath,
      marginLeft,
      marginRight,
      uploadToStorage,
      documentName,
      storageName,
      destinationPath,
      connection,
    },
  ) => {
    let response;
    const client = await getAsposeClient(
      connection,
      context.debug.enabled,
      "v3.0",
    );
    const commonParams = {
      htmlFileName: htmlFileName || undefined,
      height: height || undefined,
      width: width || undefined,
      isLandscape: isLandscape,
      margintLeft: marginLeft || undefined,
      marginBottom: marginBottom || undefined,
      marginRight: marginRight || undefined,
      marginTop: marginTop || undefined,
      storage: storageName || undefined,
    };

    if (uploadToStorage) {
      if (!documentName) {
        throw new Error(
          "Convert HTML to PDF action failed, " +
            "in order to the converted file be " +
            "saved into a storage, Document Name needs to be defined.",
        );
      }
      const { data } = await client.put(
        `/pdf/${documentName}/create/html`,
        null,
        {
          params: {
            ...commonParams,
            dstPath: destinationPath || undefined,
          },
        },
      );
      response = data;
    } else {
      if (!sourcePath) {
        throw new Error(
          "Convert HTML to PDF action failed, " +
            "in order to the converted file be " +
            "returned into the response, Source Path needs to be defined.",
        );
      }
      const { data } = await client.get("/pdf/create/html", {
        params: {
          ...commonParams,
          srcPath: sourcePath,
        },
      });
      response = data;
    }

    return { data: response };
  },
  examplePayload: convertHtmlToPdfExamplePayload,
});
