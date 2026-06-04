import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { convertPdfToHtmlExamplePayload } from "../../examplePayloads";
import {
  additionalMarginWidthInPoints,
  antialiasingProcessing,
  compressSvgGraphicsIfAny,
  connection,
  convertMarkedContentToLayers,
  cssClassNamesPrefix,
  defaultFontName,
  diagramName,
  fileContent,
  fixedLayout,
  folderPath,
  fontEncodingStrategy,
  fontSavingMode,
  format,
  htmlMarkupGenerationMode,
  imageResolution,
  lettersPositioningMethod,
  minimalLineWidth,
  outPath,
  pagesFlowTypeDependsOnViewersScreenSize,
  partsEmbeddingMode,
  preventGlyphsGrouping,
  rasterImagesSavingMode,
  removeEmptyAreasOnTopAndBottom,
  saveShadowedTextsAsTransparentTexts,
  saveTransparentTexts,
  specialFolderForAllImages,
  specialFolderForSvgImages,
  splitCssIntoPages,
  splitIntoPages,
  storageName,
  trySaveTextUnderliningAndStrikeoutingInCss,
  uploadToStorage,
  useZOrder,
} from "../../inputs";

export const convertPdfToHtml = action({
  display: {
    label: "Convert PDF to HTML",
    description: "Converts a PDF to HTML format.",
  },
  inputs: {
    connection,
    uploadToStorage,
    storageName,
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
        "the file to convert in located in an Aspose storage.)",
    },
    documentType: {
      ...format,
      required: true,
      comments: "Result document type.",
      default: "Html5",
      model: ["Xhtml", "Html5"].map((value) => ({
        value,
        label: value,
      })),
    },
    outPath,
    folder: {
      ...folderPath,
      required: false,
      label: "Folder Name",
      comments: "The document folder",
      example: "folder1",
    },
    additionalMarginWidthInPoints,
    compressSvgGraphicsIfAny,
    convertMarkedContentToLayers,
    defaultFontName,
    fixedLayout,
    imageResolution,
    preventGlyphsGrouping,
    splitCssIntoPages,
    splitIntoPages,
    useZOrder,
    antialiasingProcessing,
    cssClassNamesPrefix,
    fontEncodingStrategy,
    fontSavingMode,
    htmlMarkupGenerationMode,
    lettersPositioningMethod,
    pagesFlowTypeDependsOnViewersScreenSize,
    partsEmbeddingMode,
    rasterImagesSavingMode,
    removeEmptyAreasOnTopAndBottom,
    saveShadowedTextsAsTransparentTexts,
    saveTransparentTexts,
    specialFolderForAllImages,
    specialFolderForSvgImages,
    trySaveTextUnderliningAndStrikeoutingInCss,
    minimalLineWidth,
  },
  perform: async (
    context,
    {
      additionalMarginWidthInPoints,
      outPath,
      antialiasingProcessing,
      cssClassNamesPrefix,
      fontEncodingStrategy,
      fontSavingMode,
      htmlMarkupGenerationMode,
      imageResolution,
      preventGlyphsGrouping,
      splitCssIntoPages,
      splitIntoPages,
      useZOrder,
      storageName,
      trySaveTextUnderliningAndStrikeoutingInCss,
      uploadToStorage,
      folder,
      convertMarkedContentToLayers,
      defaultFontName,
      fixedLayout,
      compressSvgGraphicsIfAny,
      connection,
      removeEmptyAreasOnTopAndBottom,
      saveShadowedTextsAsTransparentTexts,
      saveTransparentTexts,
      specialFolderForAllImages,
      fileContent,
      lettersPositioningMethod,
      pagesFlowTypeDependsOnViewersScreenSize,
      partsEmbeddingMode,
      rasterImagesSavingMode,
      specialFolderForSvgImages,
      documentName,
      documentType,
      minimalLineWidth,
    },
  ) => {
    let response;
    const client = await getAsposeClient(
      connection,
      context.debug.enabled,
      "v3.0",
    );
    const commonParams = {
      storage: storageName || undefined,
      documentType: documentType,
      additionalMarginWidthInPoints: additionalMarginWidthInPoints || undefined,
      compressSvgGraphicsIfAny: compressSvgGraphicsIfAny || undefined,
      convertMarkedContentToLayers: convertMarkedContentToLayers || undefined,
      defaultFontName: defaultFontName || undefined,
      fixedLayout: fixedLayout || undefined,
      imageResolution: imageResolution || undefined,
      minimalLineWidth: minimalLineWidth || undefined,
      preventGlyphsGrouping: preventGlyphsGrouping || undefined,
      splitCssIntoPages: splitCssIntoPages || undefined,
      splitIntoPages: splitIntoPages || undefined,
      useZOrder: useZOrder || undefined,
      antialiasingProcessing: antialiasingProcessing || undefined,
      cssClassNamesPrefix: cssClassNamesPrefix || undefined,
      fontEncodingStrategy: fontEncodingStrategy || undefined,
      fontSavingMode: fontSavingMode || undefined,
      htmlMarkupGenerationMode: htmlMarkupGenerationMode || undefined,
      lettersPositioningMethod: lettersPositioningMethod || undefined,
      pagesFlowTypeDependsOnViewersScreenSize:
        pagesFlowTypeDependsOnViewersScreenSize || undefined,
      partsEmbeddingMode: partsEmbeddingMode || undefined,
      rasterImagesSavingMode: rasterImagesSavingMode || undefined,
      removeEmptyAreasOnTopAndBottom:
        removeEmptyAreasOnTopAndBottom || undefined,
      saveShadowedTextsAsTransparentTexts:
        saveShadowedTextsAsTransparentTexts || undefined,
      saveTransparentTexts: saveTransparentTexts || undefined,
      specialFolderForAllImages: specialFolderForAllImages || undefined,
      specialFolderForSvgImages: specialFolderForSvgImages || undefined,
      trySaveTextUnderliningAndStrikeoutingInCss:
        trySaveTextUnderliningAndStrikeoutingInCss || undefined,
    };

    if (!fileContent) {
      
      const NO_CHARACTERS = 0;
      if (documentName.length === NO_CHARACTERS) {
        throw new Error(
          "Document Name input is required whenever pre-conversion file is located in an Aspose storage.",
        );
      }

      if (!uploadToStorage) {
        
        const { data } = await client.get(`/pdf/${documentName}/convert/html`, {
          headers: {
            Accept: "multipart/form-data",
          },
          params: {
            ...commonParams,
            folder: folder || undefined,
          },
        });

        response = data;
      } else {
        

        if (!outPath) {
          throw new Error(
            "Out Path input is required whenever trying to save post-conversion file into an aspose storage.",
          );
        }

        const { data } = await client.put(
          `/pdf/${documentName}/convert/html`,
          null,
          {
            params: {
              ...commonParams,
              outPath,
              folder: folder || undefined,
            },
          },
        );

        response = data;
      }
    } else {
      
      if (!uploadToStorage)
        throw new Error(
          `This use-case (provided a file into the File Content input
          and wanting the converted file to be returned in response body)
          is not supported by Aspose's API.`,
        );

      if (!outPath) {
        throw new Error(
          `Out Path input is required whenever trying to save post-conversion
          file into an Aspose storage.`,
        );
      }

      const { data } = await client.put("/pdf/convert/html", fileContent.data, {
        params: {
          ...commonParams,
          outPath,
        },
      });

      response = data;
    }

    return { data: response };
  },
  examplePayload: convertPdfToHtmlExamplePayload,
});
