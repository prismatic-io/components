export const createEnvelopeExamplePayload = {
  data: {
    envelopeId: "a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    statusDateTime: "2025-01-15T10:30:45.123Z",
    status: "sent",
  },
};

export const getEnvelopeExamplePayload = {
  data: {
    envelopeId: "a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    status: "sent",
    documentsUri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents",
    recipientsUri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/recipients",
    attachmentsUri:
      "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/attachments",
    envelopeUri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    emailSubject: "Please sign the NDA",
    emailBlurb: "Please review and sign the attached NDA document.",
    envelopeIdStamping: "true",
    enableWetSign: "true",
    allowMarkup: "false",
    allowReassign: "true",
    createdDateTime: "2025-01-15T10:30:45.123Z",
    sentDateTime: "2025-01-15T10:30:50.456Z",
    statusChangedDateTime: "2025-01-15T10:30:50.456Z",
    recipients: {
      signers: [
        {
          recipientId: "1",
          recipientIdGuid: "b4c3d2e1-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
          name: "Jane Doe",
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@example.com",
          roleName: "Signer",
          routingOrder: "1",
          status: "sent",
          deliveryMethod: "email",
          tabs: {
            signHereTabs: [
              {
                tabId: "c5d4e3f2-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
                tabLabel: "signer1sig",
                name: "Please sign here",
                documentId: "1",
                recipientId: "1",
                pageNumber: "1",
                xPosition: "100",
                yPosition: "200",
                optional: "false",
                anchorString: "signer1sig",
                anchorXOffset: "0",
                anchorYOffset: "0",
                anchorUnits: "pixels",
                status: "active",
              },
            ],
            dateSignedTabs: [
              {
                tabId: "d6e5f4a3-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
                tabLabel: "date_signed",
                name: "Date Signed",
                documentId: "1",
                recipientId: "1",
                pageNumber: "1",
                xPosition: "100",
                yPosition: "250",
                anchorString: "signer1date",
                anchorYOffset: "-6",
                fontSize: "Size12",
                status: "active",
              },
            ],
          },
        },
      ],
      carbonCopies: [],
      certifiedDeliveries: [],
    },
    customFields: {
      textCustomFields: [],
      listCustomFields: [],
    },
    notification: {
      useAccountDefaults: "false",
      reminders: {
        reminderEnabled: "true",
        reminderDelay: "2",
        reminderFrequency: "2",
      },
      expirations: {
        expireEnabled: "true",
        expireAfter: "120",
        expireWarn: "20",
      },
    },
    signingLocation: "online",
    authoritativeCopy: "false",
    enforceSignerVisibility: "false",
    is21CFRPart11: "false",
  },
};

export const updateEnvelopeExamplePayload = {
  data: {
    envelopeId: "a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    purgeState: "unpurged",
    recipientUpdateResults: [],
    listCustomFieldUpdateResults: [],
    textCustomFieldUpdateResults: [],
    tabUpdateResults: {},
  },
};

export const deleteEnvelopeDocumentExamplePayload = {
  data: {
    envelopeId: "a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    envelopeDocuments: [
      {
        documentId: "1",
        documentIdGuid: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        name: "NDA.pdf",
        type: "content",
        uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents/1",
        order: "1",
        pages: [
          {
            pageId: "5b8d2f4a-6c1e-4a9b-8d3f-7e2a4c6b8d01",
            sequence: "1",
            height: "792",
            width: "612",
            dpi: "72",
          },
        ],
      },
    ],
  },
};

export const listEnvelopeDocumentsExamplePayload = {
  data: {
    envelopeId: "a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    envelopeDocuments: [
      {
        documentId: "1",
        documentIdGuid: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        name: "NDA.pdf",
        type: "content",
        uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents/1",
        order: "1",
        pages: [
          {
            pageId: "5b8d2f4a-6c1e-4a9b-8d3f-7e2a4c6b8d01",
            sequence: "1",
            height: "792",
            width: "612",
            dpi: "72",
          },
        ],
      },
      {
        documentId: "2",
        documentIdGuid: "f9a8b7c6-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
        name: "Terms and Conditions.pdf",
        type: "content",
        uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents/2",
        order: "2",
        pages: [
          {
            pageId: "8e1c3a5f-2d7b-4f6a-9c8e-1b3d5f7a9c02",
            sequence: "1",
            height: "792",
            width: "612",
            dpi: "72",
          },
        ],
      },
      {
        documentId: "certificate",
        name: "Certificate of Completion",
        type: "summary",
        uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents/certificate",
        order: "999",
        pages: [
          {
            pageId: "2f6a8c1e-4b3d-4e7f-a5c9-6d8b1f3a5e03",
            sequence: "1",
            height: "792",
            width: "612",
            dpi: "72",
          },
        ],
      },
    ],
  },
};

export const updateEnvelopeDocumentExamplePayload = {
  data: {
    documentId: "1",
    documentIdGuid: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    name: "NDA (Revised).pdf",
    type: "content",
    uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents/1",
    order: "1",
    pages: [
      {
        pageId: "5b8d2f4a-6c1e-4a9b-8d3f-7e2a4c6b8d01",
        sequence: "1",
        height: "792",
        width: "612",
        dpi: "72",
      },
    ],
    display: "inline",
    includeInDownload: "true",
    containsPdfFormFields: "false",
    signerMustAcknowledge: "no_interaction",
    templateLocked: "false",
    templateRequired: "false",
    authoritativeCopy: "false",
  },
};
