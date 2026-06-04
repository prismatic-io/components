export const getFilesListExamplePayload = {
  data: {
    Value: [
      {
        Name: "file1",
        Path: "path1",
        IsFolder: false,
        Size: 100,
        ModifiedDate: "2021-01-01",
      },
      {
        Name: "file2",
        Path: "path2",
        IsFolder: false,
        Size: 200,
        ModifiedDate: "2021-01-02",
      },
    ],
  },
};

export const downloadFileExamplePayload = {
  data: "<binary data of file downloaded>",
};

export const convertDiagramExamplePayload = {
  data: "<binary data of diagram converted>",
};

export const getDiagramExamplePayload = {
  data: "<binary data of diagram downloaded>",
};

export const saveDiagramAsExamplePayload = {
  data: "<binary data of file downloaded>",
};

export const splitDocumentExamplePayload = {
  data: {
    SplitResult: {
      Pages: [
        {
          Href: "https://www.example.com/file_page1.ext",
          Rel: "page",
        },
        {
          Href: "https://www.example.com/file_page2.ext",
          Rel: "page",
        },
      ],
      ZippedPages: {
        Href: "/test/test.docx.zip",
        Rel: "zippedpages",
      },
      SourceDocument: {
        Href: "https://www.example.com/file.ext",
        Rel: "self",
      },
    },
  },
};

export const saveDocumentAsExamplePayload = {
  data: null,
};

export const loadWebDocumentExamplePayload = {
  data: null,
};

export const getDocumentExamplePayload = {
  data: {
    Document: {
      Links: [
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest",
          Rel: "self",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=doc",
          Rel: "alternate",
          Type: "application/msword",
          Title: "Download as DOC",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=dot",
          Rel: "alternate",
          Type: "application/msword",
          Title: "Download as DOT",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=docx",
          Rel: "alternate",
          Type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          Title: "Download as DOCX",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=docm",
          Rel: "alternate",
          Type: "application/vnd.ms-word.document.macroEnabled.12",
          Title: "Download as DOCM",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=dotx",
          Rel: "alternate",
          Type: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
          Title: "Download as DOTX",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=dotm",
          Rel: "alternate",
          Type: "application/vnd.ms-word.template.macroEnabled.12",
          Title: "Download as DOTM",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=flatopc",
          Rel: "alternate",
          Type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          Title: "Download as FLATOPC",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=rtf",
          Rel: "alternate",
          Type: "application/rtf",
          Title: "Download as RTF",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=wml",
          Rel: "alternate",
          Type: "text/xml",
          Title: "Download as WML",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=odt",
          Rel: "alternate",
          Type: "application/vnd.oasis.opendocument.text",
          Title: "Download as ODT",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=ott",
          Rel: "alternate",
          Type: "application/vnd.oasis.opendocument.text-template",
          Title: "Download as OTT",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=txt",
          Rel: "alternate",
          Type: "text/plain",
          Title: "Download as TXT",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=mhtml",
          Rel: "alternate",
          Type: "multipart/related",
          Title: "Download as MHTML",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=epub",
          Rel: "alternate",
          Type: "application/epub+zip",
          Title: "Download as EPUB",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=pdf",
          Rel: "alternate",
          Type: "application/pdf",
          Title: "Download as PDF",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=xps",
          Rel: "alternate",
          Type: "application/vnd.ms-xpsdocument",
          Title: "Download as XPS",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=openxps",
          Rel: "alternate",
          Type: "application/oxps",
          Title: "Download as OPENXPS",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=ps",
          Rel: "alternate",
          Type: "application/postscript",
          Title: "Download as PS",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=tiff",
          Rel: "alternate",
          Type: "image/tiff",
          Title: "Download as TIFF",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=png",
          Rel: "alternate",
          Type: "image/png",
          Title: "Download as PNG",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=jpeg",
          Rel: "alternate",
          Type: "image/jpeg",
          Title: "Download as JPEG",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=bmp",
          Rel: "alternate",
          Type: "image/bmp",
          Title: "Download as BMP",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=gif",
          Rel: "alternate",
          Type: "image/gif",
          Title: "Download as GIF",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=emf",
          Rel: "alternate",
          Type: "image/emf",
          Title: "Download as EMF",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=eps",
          Rel: "alternate",
          Type: "image/eps",
          Title: "Download as EPS",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=svg",
          Rel: "alternate",
          Type: "image/svg+xml",
          Title: "Download as SVG",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=html",
          Rel: "alternate",
          Type: "text/html",
          Title: "Download as HTML",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=htmlfixed",
          Rel: "alternate",
          Type: "text/html",
          Title: "Download as HTMLFIXED",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=pcl",
          Rel: "alternate",
          Type: "application/x-pcl",
          Title: "Download as PCL",
        },
        {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx?folder=%2ftest&format=md",
          Rel: "alternate",
          Type: "text/markdown",
          Title: "Download as MD",
        },
      ],
      FileName: "testPdf.docx",
      SourceFormat: "Docx",
      IsEncrypted: false,
      IsSigned: false,
      DocumentProperties: {
        Link: {
          Href: "http://api.aspose.cloud/v4.0/words/testPdf.docx/documentProperties?folder=%2ftest",
          Rel: "self",
        },
      },
    },
    RequestId: "Root=1-65dfb304-6d7ffbc37ba1bebb44f6103c",
  },
};

export const createDocumentExamplePayload = {
  data: {
    StatusCode: 200,
    Status: "OK",
  },
};

export const convertLocalDocumentExamplePayload = {
  data: "<binary data of file converted>",
};

export const convertHtmlToPdfExamplePayload = {
  data: {
    Code: 200,
    Status: "OK",
  },
};

export const convertPdfToDocExamplePayload = {
  data: {
    Code: 200,
    Status: "OK",
  },
};

export const convertPdfToHtmlExamplePayload = {
  data: {
    Code: 200,
    Status: "OK",
  },
};
