import type {
  AttributeDefinitionFullRepResultRep,
  CategoryAttributeDefinitionResultRep,
  CategoryAttributeDefinitionVo,
  FileDetailVo,
  FileFullVoResultRep,
} from "../types";
const sampleFileDetail: FileDetailVo = {
  guid: "F1LE23DEF456GHI789JKL012",
  name: "assembly-drawing.pdf",
  number: "FILE-000842",
  title: "Assembly Drawing Rev B",
  description: "Assembly drawing reflecting the latest capacitor change.",
  edition: "B",
  format: "PDF",
  mimeType: "application/pdf",
  size: 284516,
  storageMethodName: "FILE",
  location: "https://app.bom.com/files/F1LE23DEF456GHI789JKL012/content",
  category: { guid: "CAT123DEF456GHI789JKL012", name: "Drawings" },
  author: { fullName: "Jordan Rivera" },
  creationDateTime: "2026-03-10T09:15:00Z",
  lastModifiedDateTime: "2026-03-12T16:42:00Z",
  latest: true,
  checkedOut: false,
  corrected: false,
  hasMarkup: false,
  haveContent: true,
  locked: false,
  private: false,
};
const sampleBase64Content =
  "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2c+PgplbmRvYmoK";
export const changeFileCheckoutStatusExamplePayload = {
  data: {
    ...sampleFileDetail,
    checkedOut: false,
    locked: false,
    edition: "C",
    lastModifiedDateTime: "2026-03-18T14:05:00Z",
  },
};
export const createFileCorrectionExamplePayload = {
  data: {
    ...sampleFileDetail,
    corrected: true,
    lastModifiedDateTime: "2026-03-19T10:22:00Z",
  },
};
export const createFileEditionExamplePayload = {
  data: {
    ...sampleFileDetail,
    edition: "C",
    latest: true,
    creationDateTime: "2026-03-20T08:00:00Z",
    lastModifiedDateTime: "2026-03-20T08:00:00Z",
  },
};
export const createFileMarkupExamplePayload = {
  data: {
    guid: "MRK123DEF456GHI789JKL012",
    file: {
      ...sampleFileDetail,
      guid: "MKF123DEF456GHI789JKL012",
      name: "assembly-drawing-markup.pdf",
      title: "Assembly Drawing Rev B - Markup",
      category: { guid: "MKC123DEF456GHI789JKL012", name: "Markups" },
    },
  },
};
export const createFileWithContentExamplePayload: {
  data: FileDetailVo;
} = {
  data: sampleFileDetail,
};
export const deleteFileExamplePayload = {
  data: {
    success: true,
    message:
      "File with GUID F1LE23DEF456GHI789JKL012 has been deleted successfully",
    fileGuid: "F1LE23DEF456GHI789JKL012",
    statusCode: 204,
  },
};
export const downloadFileContentExamplePayload = {
  data: {
    content: sampleBase64Content,
    contentType: "application/pdf",
    filename: "assembly-drawing.pdf",
    size: 284516,
  },
};
export const listFileAttributesExamplePayload: {
  data: AttributeDefinitionFullRepResultRep;
} = {
  data: {
    results: [
      {
        guid: "ATT123DEF456GHI789JKL012",
        active: true,
        apiName: "revision",
        name: "Revision",
        fieldType: "SINGLE_LINE_TEXT",
        required: false,
        editable: true,
        creatable: true,
        custom: false,
        description: "Revision label associated with the file.",
        maxLength: 32,
      },
      {
        guid: "ATT234DEF456GHI789JKL012",
        active: true,
        apiName: "confidentiality",
        name: "Confidentiality",
        fieldType: "FIXED_DROP_DOWN",
        required: false,
        editable: true,
        creatable: true,
        custom: true,
        multiSelect: false,
        possibleValues: ["Public", "Internal", "Restricted"],
      },
    ],
    count: 2,
  },
};
export const getFileByGuidExamplePayload: {
  data: FileDetailVo;
} = {
  data: sampleFileDetail,
};
export const listFileCategoriesExamplePayload = {
  data: {
    results: [
      {
        guid: "CAT123DEF456GHI789JKL012",
        name: "Drawings",
        path: "Files/Drawings",
        assignable: true,
      },
      {
        guid: "CAT234DEF456GHI789JKL012",
        name: "Specifications",
        path: "Files/Specifications",
        assignable: true,
      },
    ],
    count: 2,
  },
};
export const getFileCategoryAttributeDetailsExamplePayload: {
  data: CategoryAttributeDefinitionVo;
} = {
  data: {
    guid: "ATT234DEF456GHI789JKL012",
    active: true,
    apiName: "confidentiality",
    name: "Confidentiality",
    fieldType: "FIXED_DROP_DOWN",
    required: false,
    editable: true,
    custom: true,
    description: "Confidentiality level applied to files in this category.",
    possibleValues: ["Public", "Internal", "Restricted"],
    multiSelect: false,
  },
};
export const listFileCategoryAttributesExamplePayload: {
  data: CategoryAttributeDefinitionResultRep;
} = {
  data: {
    results: [
      {
        guid: "ATT123DEF456GHI789JKL012",
        active: true,
        apiName: "revision",
        name: "Revision",
        fieldType: "SINGLE_LINE_TEXT",
        required: false,
        editable: true,
        custom: false,
        description: "Revision label associated with the file.",
        maxLength: 32,
      },
    ],
    count: 1,
  },
};
export const getFileCategoryDetailsExamplePayload = {
  data: {
    guid: "CAT123DEF456GHI789JKL012",
    name: "Drawings",
    path: "Files/Drawings",
    assignable: true,
    description: "Category for engineering and assembly drawings.",
  },
};
export const getFileContentExamplePayload = {
  data: Buffer.from(sampleBase64Content, "base64"),
  contentType: "application/pdf",
};
export const listFileCorrectionsExamplePayload = {
  data: {
    results: [
      {
        guid: "COR123DEF456GHI789JKL012",
        comments: "Corrected dimensions on sheet 2.",
        storageMethodName: "FILE",
        creationDateTime: "2026-03-19T10:22:00Z",
        creator: {
          guid: "USR123DEF456GHI789JKL012",
          fullName: "Jordan Rivera",
          email: "jordan.rivera@example.com",
        },
        file: sampleFileDetail,
      },
    ],
    count: 1,
  },
};
export const listFileEditionsExamplePayload = {
  data: {
    results: [
      {
        ...sampleFileDetail,
        edition: "A",
        latest: false,
        creationDateTime: "2026-02-01T09:00:00Z",
        lastModifiedDateTime: "2026-02-01T09:00:00Z",
      },
      {
        ...sampleFileDetail,
        edition: "B",
        latest: true,
      },
    ],
    count: 2,
  },
};
export const listFileMarkupsExamplePayload = {
  data: {
    results: [
      {
        guid: "MRK123DEF456GHI789JKL012",
        file: {
          ...sampleFileDetail,
          guid: "MKF123DEF456GHI789JKL012",
          name: "assembly-drawing-markup.pdf",
          title: "Assembly Drawing Rev B - Markup",
          category: { guid: "MKC123DEF456GHI789JKL012", name: "Markups" },
        },
      },
    ],
    count: 1,
  },
};
export const listFilesExamplePayload: {
  data: FileFullVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "F1LE23DEF456GHI789JKL012",
        number: "FILE-000842",
        name: "assembly-drawing.pdf",
        title: "Assembly Drawing Rev B",
        edition: "B",
        format: "PDF",
        storageMethodName: "FILE",
        category: { guid: "CAT123DEF456GHI789JKL012", name: "Drawings" },
        checkedOut: false,
        corrected: false,
        creationDateTime: "2026-03-10T09:15:00Z",
      },
      {
        guid: "F2LE34DEF456GHI789JKL012",
        number: "FILE-000843",
        name: "gasket-spec.docx",
        title: "Enclosure Gasket Specification",
        edition: "A",
        format: "DOCX",
        storageMethodName: "FILE",
        category: { guid: "CAT234DEF456GHI789JKL012", name: "Specifications" },
        checkedOut: false,
        corrected: false,
        creationDateTime: "2026-03-16T13:45:00Z",
      },
    ],
    count: 2,
  },
};
export const getFileWatermarkContentExamplePayload = {
  data: {
    content: sampleBase64Content,
    contentType: "application/pdf",
    filename: "assembly-drawing-watermarked.pdf",
    size: 291045,
  },
};
export const updateFileContentExamplePayload = {
  data: {
    ...sampleFileDetail,
    haveContent: true,
    lastModifiedDateTime: "2026-03-21T11:30:00Z",
  },
};
