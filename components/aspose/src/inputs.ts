import { input, util } from "@prismatic-io/spectral";
import { cleanString, createModelWithAReadableInput } from "./utils";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Aspose connection to use.",
});

export const folderPath = input({
  label: "Folder Path",
  comments: "Target folder's path. The folders will be created recursively.",
  required: true,
  example: "/Folder1/Folder2",
  placeholder: "Enter folder path",
  type: "string",
  clean: util.types.toString,
});

export const storageName = input({
  label: "Storage Name",
  comments: "Aspose storage name where the folder gets read or created.",
  required: false,
  example: "MyStorage",
  placeholder: "Enter storage name",
  type: "string",
  clean: cleanString,
});

export const recursive = input({
  label: "Recursive",
  comments: "When true, deletes folders, subfolders, and files recursively.",
  required: false,
  default: "false",
  type: "boolean",
  clean: util.types.toBool,
});

export const destinationPath = input({
  ...folderPath,
  label: "Destination Folder Path",
  comments: "Destination folder path.",
  example: "/destination",
  placeholder: "Enter destination folder path",
});

export const sourcePath = input({
  ...folderPath,
  label: "Source Folder Path",
  comments: "Source folder path.",
});

export const sourceStorageName = input({
  ...storageName,
  label: "Source Storage Name",
  comments: "Source storage name.",
});

export const destinationStorageName = input({
  ...storageName,
  label: "Destination Storage Name",
  comments: "Destination storage name.",
});

export const filePath = input({
  label: "File Path",
  type: "string",
  comments: "Path of the file including the file name and extension.",
  example: "/folder1/document.pdf",
  placeholder: "Enter file path",
  required: true,
  clean: util.types.toString,
});

export const fileVersionId = input({
  label: "File Version ID",
  type: "string",
  comments:
    "File version ID to download. If not specified, the latest version is used.",
  example: "v1.2.3",
  placeholder: "Enter file version ID",
  required: false,
  clean: cleanString,
});

export const fileContent = input({
  label: "File Content",
  type: "data",
  comments: "Reference of a file from a previous step to upload.",
  placeholder: "File from previous step",
  required: true,
  clean: util.types.toData,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  comments: "Name of the file to upload.",
  example: "document.pdf",
  placeholder: "Enter file name",
  required: true,
  clean: util.types.toString,
});

export const loadingDocumentUrl = input({
  label: "Loading Document URL",
  type: "string",
  comments: "The web document URL.",
  example: "https://example.com/documents/file.pdf",
  placeholder: "Enter document URL",
  required: true,
  clean: util.types.toString,
});

export const diagramName = input({
  label: "Diagram Name",
  type: "string",
  comments: "The name of the diagram.",
  example: "flowchart.vsdx",
  placeholder: "Enter diagram name",
  required: true,
  clean: util.types.toString,
});

export const format = input({
  label: "Format",
  type: "string",
  comments: "The destination format for the converted file.",
  example: "pdf",
  placeholder: "Enter output format",
  required: true,
  clean: util.types.toString,
});

export const overwrite = input({
  label: "Overwrite",
  type: "boolean",
  comments: "When true, overwrites existing files with the same name.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const defaultFont = input({
  label: "Default Font",
  type: "string",
  comments: "The default font for the diagram.",
  example: "Arial",
  placeholder: "Enter font name",
  required: false,
  clean: cleanString,
});

export const destinationFileName = input({
  label: "Destination File Name",
  type: "string",
  comments: "The name of the converted file.",
  example: "converted-document.pdf",
  placeholder: "Enter destination file name",
  required: true,
  clean: util.types.toString,
});

export const loadEncoding = input({
  label: "Load Encoding",
  type: "string",
  comments:
    "Encoding that will be used to load an HTML (or TXT) document if the encoding is not specified in HTML.",
  example: "UTF-8",
  placeholder: "Enter encoding",
  required: false,
  clean: cleanString,
});

export const documentPassword = input({
  label: "Password",
  type: "password",
  comments: "Password of protected Word document.",
  placeholder: "Enter document password",
  required: false,
  clean: cleanString,
});

export const fileNameFieldValue = input({
  label: "File Name Field Value",
  type: "string",
  comments:
    "The filename of the output document. This will be used when the resulting document has a dynamic field (filename). If not set, the document name will be used instead.",
  required: false,
  example: "output.pdf",
  placeholder: "Enter output file name",
  clean: cleanString,
});

export const uploadToStorage = input({
  label: "Upload to Storage",
  type: "boolean",
  comments:
    "When true, saves the post-conversion file to Aspose storage. When false, the resulting file is returned in the response body.",
  required: false,
  clean: util.types.toBool,
});

export const htmlFileName = input({
  label: "HTML File Name",
  type: "string",
  comments: "Name of HTML file in ZIP archive.",
  example: "index.html",
  placeholder: "Enter HTML file name",
  required: true,
  clean: util.types.toString,
});

export const height = input({
  label: "Page Height",
  type: "string",
  comments: "Desired page height (in px).",
  example: "1024",
  placeholder: "Enter page height",
  required: false,
  clean: util.types.toNumber,
});

export const width = input({
  label: "Page Width",
  type: "string",
  comments: "Desired page width (in px).",
  example: "768",
  placeholder: "Enter page width",
  required: false,
  clean: util.types.toNumber,
});

export const isLandscape = input({
  label: "Is Landscape",
  type: "boolean",
  comments: "When true, uses landscape page orientation.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const marginLeft = input({
  label: "Margin Left",
  type: "string",
  comments: "Page margin left (in px).",
  example: "20",
  placeholder: "Enter left margin",
  required: false,
  clean: util.types.toNumber,
});

export const marginRight = input({
  label: "Margin Right",
  type: "string",
  comments: "Page margin right (in px).",
  example: "20",
  placeholder: "Enter right margin",
  required: false,
  clean: util.types.toNumber,
});

export const marginTop = input({
  label: "Margin Top",
  type: "string",
  comments: "Page margin top (in px).",
  example: "20",
  placeholder: "Enter top margin",
  required: false,
  clean: util.types.toNumber,
});

export const marginBottom = input({
  label: "Margin Bottom",
  type: "string",
  comments: "Page margin bottom (in px).",
  example: "20",
  placeholder: "Enter bottom margin",
  required: false,
  clean: util.types.toNumber,
});

export const addReturnToLineEnd = input({
  label: "Add Return to Line End",
  type: "boolean",
  comments: "When true, adds a return character at the end of each line.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const imageResolutionX = input({
  label: "Image Resolution X",
  type: "string",
  comments: "Image resolution X (horizontal).",
  example: "1920",
  placeholder: "Enter horizontal resolution",
  required: false,
  clean: util.types.toNumber,
});

export const imageResolutionY = input({
  label: "Image Resolution Y",
  type: "string",
  comments: "Image resolution Y (vertical).",
  example: "1080",
  placeholder: "Enter vertical resolution",
  required: false,
  clean: util.types.toNumber,
});

export const maxDistanceBetweenTextLines = input({
  label: "Max Distance Between Text Lines",
  type: "string",
  comments: "Max distance between text lines (in px).",
  example: "15",
  placeholder: "Enter max distance",
  required: false,
  clean: util.types.toNumber,
});

export const mode = input({
  label: "Conversion Mode",
  type: "string",
  comments:
    "Controls how a PDF document is converted into a word processing document.",
  required: false,
  model: ["Textbox", "Flow"].map((value) => ({ value, label: value })),
  placeholder: "Select conversion mode",
  clean: cleanString,
});

export const recognizeBullets = input({
  label: "Recognize Bullets",
  type: "boolean",
  comments: "When true, the converter recognizes and preserves bullet points.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const relativeHorizontalProximity = input({
  label: "Relative Horizontal Proximity",
  type: "string",
  comments: "Relative horizontal proximity (in px).",
  example: "15",
  placeholder: "Enter proximity value",
  required: false,
  clean: util.types.toNumber,
});

export const outPath = input({
  label: "Out Path",
  type: "string",
  comments:
    "Full resulting filename. Note: This field is required when the post-conversion file needs to be saved in an Aspose storage.",
  example: "/folder1/folder2/result.docx",
  placeholder: "Enter output path",
  required: false,
  clean: cleanString,
});

export const fromPage = input({
  label: "From Page",
  comments: "The start page from where to start the splitting process.",
  example: "1",
  placeholder: "Enter start page number",
  type: "string",
  clean: util.types.toNumber,
  required: false,
});

export const toPage = input({
  label: "To Page",
  comments: "The end page where to end the splitting process.",
  example: "10",
  placeholder: "Enter end page number",
  type: "string",
  clean: util.types.toNumber,
  required: false,
});

export const zipOutput = input({
  label: "Zip Output",
  comments: "When true, compresses the output into a ZIP file.",
  type: "boolean",
  default: "false",
  required: false,
  clean: util.types.toBool,
});

export const additionalMarginWidthInPoints = input({
  label: "Additional Margin Width In Points",
  type: "string",
  comments:
    "Defines width of margin that will be left around output HTML areas.",
  example: "10",
  placeholder: "Enter margin width",
  required: false,
  clean: util.types.toNumber,
});

export const compressSvgGraphicsIfAny = input({
  label: "Compress SVG Graphics If Any",
  type: "boolean",
  comments:
    "When true, compresses SVG graphics into SVGZ format during saving.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const convertMarkedContentToLayers = input({
  label: "Convert Marked Content To Layers",
  type: "boolean",
  comments:
    "When true, converts PDF marked content (layers) into HTML divs with 'data-pdflayer' attributes specifying layer names.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const defaultFontName = input({
  label: "Default Font Name",
  type: "string",
  comments:
    "Specifies the name of an installed font used to substitute any document font that is not embedded or installed in the system. If not specified, the default substitution font is used.",
  example: "Arial",
  placeholder: "Enter font name",
  required: false,
  clean: cleanString,
});

export const fixedLayout = input({
  label: "Fixed Layout",
  type: "boolean",
  comments: "When true, creates the HTML as a fixed layout.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const imageResolution = input({
  label: "Image Resolution",
  type: "string",
  comments: "Resolution for image rendering.",
  required: false,
  example: "300",
  placeholder: "Enter image resolution",
  clean: util.types.toNumber,
});

export const minimalLineWidth = input({
  label: "Minimal Line Width",
  type: "string",
  comments: "Minimal line width.",
  required: false,
  example: "1",
  placeholder: "Enter line width",
  clean: util.types.toNumber,
});

export const preventGlyphsGrouping = input({
  label: "Prevent Glyphs Grouping",
  type: "boolean",
  comments:
    "When true, prevents text glyphs from being grouped into words. Useful for documents with music notes or glyphs that should be positioned precisely. Only applies when Fixed Layout is true.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const splitCssIntoPages = input({
  label: "Split CSS Into Pages",
  type: "boolean",
  comments:
    "When true, creates separate CSS files for each HTML result page. Only applies when 'Split Into Pages' is enabled.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const splitIntoPages = input({
  label: "Split Into Pages",
  type: "boolean",
  comments:
    "When true, converts each page of the source document into a separate HTML file.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const useZOrder = input({
  label: "Use Z-Order",
  type: "boolean",
  comments:
    "When true, graphics and text are added to the HTML document according to the Z-order in the original PDF. When false, all graphics are rendered as a single layer.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const antialiasingProcessing = input({
  label: "Antialiasing Processing",
  type: "string",
  comments:
    "Defines antialiasing measures during conversion of compound background images from PDF to HTML.",
  model: ["NoAdditionalProcessing", "TryCorrectResultHtml"].map(
    createModelWithAReadableInput,
  ),
  placeholder: "Select antialiasing mode",
  required: false,
  clean: cleanString,
});

export const cssClassNamesPrefix = input({
  label: "CSS Class Names Prefix",
  type: "string",
  example: "aspose-",
  placeholder: "Enter CSS class prefix",
  comments:
    "Sets a prefix for CSS class names generated during PDF to HTML conversion.",
  required: false,
  clean: cleanString,
});

export const fontEncodingStrategy = input({
  label: "Font Encoding Strategy",
  type: "string",
  model: ["Default", "DecreaseToUnicodePriorityLevel"].map(
    createModelWithAReadableInput,
  ),
  comments:
    "Defines encoding rule to tune PDF decoding for the current document.",
  placeholder: "Select encoding strategy",
  required: false,
  clean: cleanString,
});

export const fontSavingMode = input({
  label: "Font Saving Mode",
  type: "string",
  required: false,
  comments: "Defines font saving mode used during PDF conversion.",
  placeholder: "Select font saving mode",
  clean: cleanString,
  model: [
    "AlwaysSaveAsWOFF",
    "AlwaysSaveAsTTF",
    "AlwaysSaveAsEOT",
    "SaveInAllFormats",
  ].map(createModelWithAReadableInput),
});

export const htmlMarkupGenerationMode = input({
  label: "HTML Markup Generation Mode",
  type: "string",
  required: false,
  comments:
    "Defines HTML markup generation mode during PDF to HTML conversion.",
  default: "WriteAllHtml",
  placeholder: "Select markup generation mode",
  model: ["WriteAllHtml", "WriteOnlyBodyContent"].map(
    createModelWithAReadableInput,
  ),
  clean: cleanString,
});

export const lettersPositioningMethod = input({
  label: "Letters Positioning Method",
  type: "string",
  required: false,
  comments: "The mode of positioning letters in words in the result HTML.",
  placeholder: "Select positioning method",
  model: [
    "UseEmUnitsAndCompensationOfRoundingErrorsInCss",
    "UsePixelUnitsInCssLetterSpacingForIE",
  ].map(createModelWithAReadableInput),
  clean: cleanString,
});

export const pagesFlowTypeDependsOnViewersScreenSize = input({
  label: "Pages Flow Type Depends On Viewers Screen Size",
  type: "boolean",
  required: false,
  comments:
    "When true, flow areas representing PDF pages in the result HTML adapt to the viewer's screen resolution. Only applies when 'Split Into Pages' is false.",
  clean: util.types.toBool,
});

export const partsEmbeddingMode = input({
  label: "Parts Embedding Mode",
  type: "string",
  required: false,
  comments:
    "Defines whether referenced files (HTML, Fonts, Images, CSS) will be embedded into the main HTML file or generated as separate files.",
  placeholder: "Select embedding mode",
  model: ["EmbedAllIntoHtml", "EmbedCssOnly", "NoEmbedding"].map(
    createModelWithAReadableInput,
  ),
  clean: cleanString,
});

export const rasterImagesSavingMode = input({
  label: "Raster Images Saving Mode",
  type: "string",
  required: false,
  comments:
    "Defines how raster images in the PDF should be handled during conversion to HTML.",
  placeholder: "Select image saving mode",
  model: [
    "AsPngImagesEmbeddedIntoSvg",
    "AsExternalPngFilesReferencedViaSvg",
    "AsEmbeddedPartsOfPngPageBackground",
  ].map(createModelWithAReadableInput),
  clean: cleanString,
});

export const removeEmptyAreasOnTopAndBottom = input({
  label: "Remove Empty Areas On Top And Bottom",
  type: "boolean",
  required: false,
  comments:
    "When true, removes empty areas at the top and bottom of the created HTML that have no content.",
  clean: util.types.toBool,
});

export const saveShadowedTextsAsTransparentTexts = input({
  label: "Save Shadowed Texts As Transparent Texts",
  type: "boolean",
  required: false,
  comments:
    "When true, saves text that is shadowed by other elements (e.g., images with OCR text) as transparent selectable text in the result HTML, mimicking Acrobat Reader behavior.",
  clean: util.types.toBool,
});

export const saveTransparentTexts = input({
  label: "Save Transparent Texts",
  type: "boolean",
  required: false,
  comments:
    "When true, saves transparent text (typically OCR text from images) as transparent selectable text in the result HTML.",
  clean: util.types.toBool,
});

export const specialFolderForAllImages = input({
  label: "Special Folder For All Images",
  type: "string",
  required: false,
  example: "/images",
  placeholder: "Enter folder path for images",
  comments:
    "The path to directory where images will be saved during HTML conversion. If empty, images are saved with other HTML-linked files.",
  clean: cleanString,
});

export const specialFolderForSvgImages = input({
  label: "Special Folder For SVG Images",
  type: "string",
  required: false,
  example: "/svg",
  placeholder: "Enter folder path for SVG images",
  comments:
    "The path to directory where SVG images will be saved during HTML conversion. If empty, SVG images are saved with other HTML-linked files.",
  clean: cleanString,
});

export const trySaveTextUnderliningAndStrikeoutingInCss = input({
  label: "Try Save Text Underlining And Strikethrough In CSS",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, attempts to detect text underlining and strikethrough (which PDF emulates with lines) and represent them using CSS instead of graphical elements.",
  clean: util.types.toBool,
});

export const saveOptions = input({
  label: "Save Options Data",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify({
    AllowNegativeIndent: false,
    CssClassNamePrefix: "sample-prefix",
    CssStyleSheetFileName: "sample.css",
    CssStyleSheetType: "Embedded",
    DocumentSplitCriteria: "SectionBreak",
    DocumentSplitHeadingLevel: 1,
    Encoding: "UTF-8",
    ExportDocumentProperties: false,
    ExportDropDownFormFieldAsText: false,
    ExportFontResources: true,
    ExportFontsAsBase64: false,
    ExportHeadersFootersMode: "None",
    ExportImagesAsBase64: false,
    ExportLanguageInformation: false,
    ExportListLabels: "AsInlineText",
    ExportOriginalUrlForLinkedImages: false,
    ExportPageMargins: false,
    ExportPageSetup: false,
    ExportRelativeFontSize: false,
    ExportRoundtripInformation: false,
    ExportTextInputFormFieldAsText: false,
    ExportTocPageNumbers: false,
    ExportXhtmlTransitional: false,
    FontResourcesSubsettingSizeThreshold: 0,
    FontsFolder: "fonts",
  }),
  comments:
    "Provide save options related to the SaveFormat provided. " +
    "For all save options, please refer to this link: " +
    "https://reference.aspose.cloud/words/#/op/SaveAs (Toggle " +
    "'Advanced Parameters' on and then select a SaveOptionsData object " +
    "congruent to the one chosen in the 'Format' input)",
  clean: util.types.toObject,
});
