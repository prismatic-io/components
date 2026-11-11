//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "aspose";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/aspose/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    createFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderPath: {
        label: string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      storageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    copyFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sourcePath: {
        label: string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationPath: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sourceStorageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      destinationStorageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    deleteFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderPath: {
        label: string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      storageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      recursive: {
        label: string;
        comments: string;
        required: false;
        default: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    moveFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sourcePath: {
        label: string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationPath: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sourceStorageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      destinationStorageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    getFilesList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderPath: {
        label: string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      storageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    downloadFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filePath: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileVersionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      storageName: {
        comments: string;
        label: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filePath: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileVersionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      storageName: {
        comments: string;
        label: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    copyFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sourcePath: {
        comments: string;
        label: string;
        required: true;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationPath: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sourceStorageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      destinationStorageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      fileVersionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    uploadFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filePath: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileContent: {
        label: string;
        type: "data";
        comments: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      storageName: {
        comments: string;
        label: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    moveFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sourcePath: {
        comments: string;
        label: string;
        required: true;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationPath: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sourceStorageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      destinationStorageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      fileVersionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    createDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      documentName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      folderPath: {
        comments: string;
        required: false;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      storageName: {
        comments: string;
        label: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    loadWebDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      loadingDocumentUrl: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDiagram: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      diagramName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      format: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      folder: {
        required: false;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    convertDiagram: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileContent: {
        label: string;
        type: "data";
        comments: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      fileName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    saveDiagramAs: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationPath: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationFileName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      folderName: {
        required: false;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      overwrite: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      defaultFont: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    convertLocalDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      outPath: {
        label: string;
        comments: string;
        required: false;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentPassword: {
        label: string;
        type: "password";
        comments: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      format: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileNameFieldValue: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      loadEncoding: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      storage: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      document: {
        label: string;
        comments: string;
        type: "data";
        placeholder: string;
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    convertCloudStorageDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileName: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      format: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentPassword: {
        label: string;
        type: "password";
        comments: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      folderName: {
        label: string;
        comments: string;
        required: false;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      outPath: {
        label: string;
        comments: string;
        required: false;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      loadEncoding: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      storage: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    saveDocumentAs: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileName: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationFileName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      format: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      saveOptions: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      folderName: {
        label: string;
        comments: string;
        required: false;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentPassword: {
        label: string;
        type: "password";
        comments: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      loadEncoding: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      storage: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    convertHtmlToPdf: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      uploadToStorage: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      destinationPath: {
        required: false;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      storageName: {
        required: false;
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      documentName: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sourcePath: {
        required: false;
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      htmlFileName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      height: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      width: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      isLandscape: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      marginLeft: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      marginRight: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      marginBottom: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      marginTop: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    convertPdfToHtml: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      uploadToStorage: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      storageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      fileContent: {
        required: false;
        comments: string;
        label: string;
        type: "data";
        placeholder: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      documentName: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentType: {
        required: true;
        comments: string;
        default: string;
        model: {
          value: string;
          label: string;
        }[];
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      outPath: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      folder: {
        required: false;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalMarginWidthInPoints: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      compressSvgGraphicsIfAny: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      convertMarkedContentToLayers: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      defaultFontName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      fixedLayout: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      imageResolution: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      preventGlyphsGrouping: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      splitCssIntoPages: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      splitIntoPages: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      useZOrder: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      antialiasingProcessing: {
        label: string;
        type: "string";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      cssClassNamesPrefix: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      fontEncodingStrategy: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      fontSavingMode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
      };
      htmlMarkupGenerationMode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      lettersPositioningMethod: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      pagesFlowTypeDependsOnViewersScreenSize: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      partsEmbeddingMode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      rasterImagesSavingMode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      removeEmptyAreasOnTopAndBottom: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      saveShadowedTextsAsTransparentTexts: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      saveTransparentTexts: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      specialFolderForAllImages: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      specialFolderForSvgImages: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      trySaveTextUnderliningAndStrikeoutingInCss: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      minimalLineWidth: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    convertPdfToDoc: import("@prismatic-io/spectral").ActionDefinition<{
      uploadToStorage: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      outPath: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      folderPath: {
        required: false;
        example: string;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileContent: {
        required: false;
        comments: string;
        label: string;
        type: "data";
        placeholder: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      documentName: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentPassword: {
        comments: string;
        label: string;
        type: "password";
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      format: {
        required: true;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      addReturnToLineEnd: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      imageResolutionX: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      imageResolutionY: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      maxDistanceBetweenTextLines: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      mode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      recognizeBullets: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      relativeHorizontalProximity: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      storageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    splitDocument: import("@prismatic-io/spectral").ActionDefinition<{
      documentName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentPassword: {
        label: string;
        type: "password";
        comments: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      storageName: {
        label: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      loadEncoding: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fromPage: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        required: false;
      };
      toPage: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        required: false;
      };
      zipOutput: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      format: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationFileName: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      folder: {
        example: string;
        label: string;
        comments: string;
        required: false;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      clientId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        required: true;
        placeholder: string;
        comments: string;
      };
      baseUrl: {
        label: string;
        type: "string";
        default: string;
        required: true;
        shown: false;
        comments: string;
      };
    };
  }, "apiKey">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;