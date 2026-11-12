export const createTemplateExamplePayload = {
  data: {
    templateId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    uri: "/templates/e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    name: "Standard NDA Template",
  },
};

export const getTemplateExamplePayload = {
  data: {
    templateId: "9d4f1b7e-3a5c-4e2d-8b6f-5c1a9e3d7b02",
    uri: "/templates/9d4f1b7e-3a5c-4e2d-8b6f-5c1a9e3d7b02",
    name: "Vendor Services Agreement",
    shared: "false",
    passwordProtected: "false",
    description: "Services agreement template for new vendors",
    created: "2025-03-12T21:30:02.0600000Z",
    lastModified: "2025-03-12T21:30:02.1130000Z",
    lastModifiedBy: {
      userName: "Jane Doe",
      userId: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
      email: "jane.doe@example.com",
      uri: "/users/4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
    },
    lastUsed: "2025-03-12T21:30:02.2000000Z",
    owner: {
      userName: "Jane Doe",
      userId: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
      email: "jane.doe@example.com",
    },
    pageCount: "1",
    folderId: "2e7c9a1d-5f3b-4b8e-a6d4-8c2f0e7a1b59",
    folderName: "Templates",
    folderIds: ["2e7c9a1d-5f3b-4b8e-a6d4-8c2f0e7a1b59"],
    autoMatch: "false",
    autoMatchSpecifiedByUser: "false",
    emailSubject: "",
    emailBlurb: "",
    signingLocation: "Online",
    authoritativeCopy: "false",
    enforceSignerVisibility: "false",
    enableWetSign: "true",
    allowMarkup: "false",
    allowReassign: "true",
    envelopeIdStamping: "true",
    autoNavigation: "true",
    uSigState: "esign",
    allowComments: "true",
    disableResponsiveDocument: "true",
    anySigner: null,
    envelopeLocation: "current_site",
    documents: [
      {
        documentId: "1",
        name: "Vendor Services Agreement.pdf",
        uri: "/templates/9d4f1b7e-3a5c-4e2d-8b6f-5c1a9e3d7b02/documents/1",
        order: "1",
        pages: "1",
        fileExtension: "pdf",
        display: "inline",
        includeInDownload: "true",
      },
    ],
    recipients: {
      signers: [
        {
          recipientId: "1",
          roleName: "Signer",
          routingOrder: "1",
          name: "Signer 1",
          email: null,
          tabs: {
            signHereTabs: [
              {
                tabLabel: "signer1sig",
                name: "Signature",
                documentId: "1",
                recipientId: "1",
                pageNumber: "1",
                xPosition: "100",
                yPosition: "200",
                anchorString: "signer1sig",
                anchorXOffset: "0",
                anchorYOffset: "0",
                anchorUnits: "pixels",
              },
            ],
          },
        },
      ],
      carbonCopies: [],
      certifiedDeliveries: [],
    },
  },
};

export const listTemplatesExamplePayload = {
  data: {
    resultSetSize: "2",
    startPosition: "0",
    endPosition: "1",
    totalSetSize: "5",
    envelopeTemplates: [
      {
        templateId: "6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13",
        uri: "/templates/6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13",
        name: "Standard NDA Template",
        shared: "false",
        passwordProtected: "false",
        description: "Mutual non-disclosure agreement for partners",
        created: "2025-03-12T21:30:03.2430000Z",
        lastModified: "2025-03-20T14:46:51.3900000Z",
        lastUsed: "2026-09-30T21:13:56.3570000Z",
        owner: {
          userName: "Jane Doe",
          userId: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
          email: "jane.doe@example.com",
        },
        pageCount: "1",
        folderId: "2e7c9a1d-5f3b-4b8e-a6d4-8c2f0e7a1b59",
        folderName: "Templates",
        folderIds: ["2e7c9a1d-5f3b-4b8e-a6d4-8c2f0e7a1b59"],
        autoMatch: "true",
        autoMatchSpecifiedByUser: "false",
        emailSubject: "Please sign the Standard NDA",
        emailBlurb: "Please review and sign the attached NDA.",
        signingLocation: "Online",
        authoritativeCopy: "false",
        enforceSignerVisibility: "false",
        enableWetSign: "true",
        allowMarkup: "false",
        allowReassign: "true",
        disableResponsiveDocument: "true",
        anySigner: null,
        envelopeLocation: null,
      },
      {
        templateId: "9d4f1b7e-3a5c-4e2d-8b6f-5c1a9e3d7b02",
        uri: "/templates/9d4f1b7e-3a5c-4e2d-8b6f-5c1a9e3d7b02",
        name: "Vendor Services Agreement",
        shared: "false",
        passwordProtected: "false",
        description: "Services agreement template for new vendors",
        created: "2025-03-12T21:30:02.0600000Z",
        lastModified: "2025-03-12T21:30:02.1130000Z",
        lastUsed: "2025-03-12T21:30:02.1130000Z",
        owner: {
          userName: "Jane Doe",
          userId: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
          email: "jane.doe@example.com",
        },
        pageCount: "0",
        folderId: "2e7c9a1d-5f3b-4b8e-a6d4-8c2f0e7a1b59",
        folderName: "Templates",
        folderIds: ["2e7c9a1d-5f3b-4b8e-a6d4-8c2f0e7a1b59"],
        autoMatch: "false",
        autoMatchSpecifiedByUser: "false",
        emailSubject: "",
        emailBlurb: "",
        signingLocation: "Online",
        authoritativeCopy: "false",
        enforceSignerVisibility: "false",
        enableWetSign: "true",
        allowMarkup: "false",
        allowReassign: "true",
        disableResponsiveDocument: "true",
        anySigner: null,
        envelopeLocation: null,
      },
    ],
  },
};

export const updateTemplateExamplePayload = {
  data: {
    envelopeId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    recipientUpdateResults: [],
    listCustomFieldUpdateResults: [],
    textCustomFieldUpdateResults: [],
    tabUpdateResults: {},
  },
};

export const listTemplateDocumentsExamplePayload = {
  data: {
    templateId: "6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13",
    templateDocuments: [
      {
        documentId: "1",
        name: "Standard NDA.pdf",
        type: "content",
        uri: "/templates/6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13/documents/1",
        order: "1",
        pages: [
          {
            pageId: "1a4c2e6f-8b1d-4f3a-9c5e-7d2b4f6a8c11",
            sequence: "1",
            height: "792",
            width: "612",
            dpi: "72",
          },
        ],
        display: "inline",
        includeInDownload: "true",
      },
      {
        documentId: "2",
        name: "Appendix A.pdf",
        type: "content",
        uri: "/templates/6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13/documents/2",
        order: "2",
        pages: [
          {
            pageId: "2a4c2e6f-8b1d-4f3a-9c5e-7d2b4f6a8c12",
            sequence: "1",
            height: "792",
            width: "612",
            dpi: "72",
          },
        ],
        display: "inline",
        includeInDownload: "true",
      },
    ],
  },
};

export const updateTemplateDocumentExamplePayload = {
  data: {
    documentId: "1",
    name: "Standard NDA (2027).pdf",
    type: "content",
    uri: "/templates/6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13/documents/1",
    order: "1",
    pages: [
      {
        pageId: "1a4c2e6f-8b1d-4f3a-9c5e-7d2b4f6a8c11",
        sequence: "1",
        height: "792",
        width: "612",
        dpi: "72",
      },
    ],
    display: "inline",
    includeInDownload: "true",
    templateLocked: "false",
    templateRequired: "false",
  },
};

export const deleteTemplateDocumentExamplePayload = {
  data: {
    templateId: "6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13",
    templateDocuments: [
      {
        documentId: "1",
        name: "Standard NDA.pdf",
        type: "content",
        uri: "/templates/6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13/documents/1",
        order: "1",
        pages: [
          {
            pageId: "1a4c2e6f-8b1d-4f3a-9c5e-7d2b4f6a8c11",
            sequence: "1",
            height: "792",
            width: "612",
            dpi: "72",
          },
        ],
        display: "inline",
        includeInDownload: "true",
      },
    ],
  },
};

export const templatesExamplePayload = {
  result: [
    {
      key: "6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13",
      label: "Standard NDA Template",
    },
    {
      key: "9d4f1b7e-3a5c-4e2d-8b6f-5c1a9e3d7b02",
      label: "Vendor Services Agreement",
    },
  ],
};
