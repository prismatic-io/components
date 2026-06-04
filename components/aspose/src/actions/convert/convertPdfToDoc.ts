import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { convertPdfToDocExamplePayload } from "../../examplePayloads";
import {
  addReturnToLineEnd,
  connection,
  diagramName,
  documentPassword,
  fileContent,
  folderPath,
  format,
  imageResolutionX,
  imageResolutionY,
  maxDistanceBetweenTextLines,
  mode,
  outPath,
  recognizeBullets,
  relativeHorizontalProximity,
  storageName,
  uploadToStorage,
} from "../../inputs";
import { convertToBase64 } from "../../utils";

export const convertPdfToDoc = action({
  display: {
    label: "Convert PDF to DOC",
    description: "Converts PDF document to DOC format.",
  },
  inputs: {
    uploadToStorage,
    outPath,
    folderPath: {
      ...folderPath,
      required: false,
      example: "folder1",
      comments: "The Document folder",
    },
    fileContent: {
      ...fileContent,
      required: false,
      comments:
        "File to convert, if missing, action will assume that the file is located in an Aspose storage.",
    },
    documentName: {
      ...diagramName,
      label: "Document Name",
      required: false,
      comments:
        "The name of the document inside Aspose. (Note: this input is required when " +
        "the file to convert is located in an Aspose storage.)",
    },
    documentPassword: {
      ...documentPassword,
      comments: "The file password.",
    },
    format: {
      ...format,
      required: true,
      comments: "Allows to specify .doc or .docx file format.",
      model: ["Doc", "DocX"].map((value) => ({
        value,
        label: value.toLowerCase(),
      })),
    },
    addReturnToLineEnd,
    imageResolutionX,
    imageResolutionY,
    maxDistanceBetweenTextLines,
    mode,
    recognizeBullets,
    relativeHorizontalProximity,
    storageName,
    connection,
  },
  perform: async (
    context,
    {
      addReturnToLineEnd,
      connection,
      outPath,
      storageName,
      uploadToStorage,
      documentName,
      folderPath,
      format,
      imageResolutionX,
      imageResolutionY,
      maxDistanceBetweenTextLines,
      mode,
      recognizeBullets,
      relativeHorizontalProximity,
      fileContent,
      documentPassword,
    },
  ) => {
    let response;
    const client = await getAsposeClient(
      connection,
      context.debug.enabled,
      "v3.0",
    );
    const commonParams = {
      format,
      addReturnToLineEnd: addReturnToLineEnd || undefined,
      imageResolutionX: imageResolutionX || undefined,
      imageResolutionY: imageResolutionY || undefined,
      maxDistanceBetweenTextLines: maxDistanceBetweenTextLines || undefined,
      mode: mode || undefined,
      recognizeBullets: recognizeBullets || undefined,
      relativeHorizontalProximity: relativeHorizontalProximity || undefined,
      storage: storageName || undefined,
      password: documentPassword
        ? convertToBase64(documentPassword)
        : undefined,
    };

    if (!fileContent) {
      
      if (!documentName) {
        throw new Error(
          "Document Name input is required whenever pre-conversion file is located in an Aspose storage.",
        );
      }

      if (!uploadToStorage) {
        
        const { data } = await client.get(`/pdf/${documentName}/convert/doc`, {
          headers: {
            Accept: "multipart/form-data",
          },
          params: {
            ...commonParams,
            folder: folderPath || undefined,
          },
        });

        response = data;
      }

      
      if (!outPath) {
        throw new Error(
          "Out Path input is required whenever trying to save post-conversion file into an aspose storage.",
        );
      }

      const { data } = await client.put(
        `/pdf/${documentName}/convert/doc`,
        null,
        {
          params: {
            ...commonParams,
            outPath,
            folder: folderPath || undefined,
          },
        },
      );

      response = data;
    } else {
      
      if (!uploadToStorage)
        throw new Error(
          "This use-case (provided a file into the File Content " +
            "input and wanting the converted file to be returned in response body)" +
            " is not supported by Aspose's API.",
        );

      if (!outPath) {
        throw new Error(
          "Out Path input is required whenever trying to save post-conversion file into an Aspose storage.",
        );
      }

      const { data } = await client.put("/pdf/convert/doc", fileContent.data, {
        params: {
          ...commonParams,
          outPath,
        },
      });

      response = data;
    }

    return { data: response };
  },
  examplePayload: convertPdfToDocExamplePayload,
});
