








export const createEnvelopePayload = {
  data: {
    envelopeId: "a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    statusDateTime: "2025-01-15T10:30:45.123Z",
    status: "sent",
  },
};

export const getEnvelopePayload = {
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
    documents: [
      {
        documentId: "1",
        documentIdGuid: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        name: "NDA.pdf",
        type: "content",
        uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents/1",
        order: "1",
        pages: "5",
        display: "inline",
        includeInDownload: "true",
        fileExtension: "pdf",
        documentFields: [],
      },
    ],
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

export const listEnvelopesPayload = {
  data: {
    resultSetSize: "25",
    startPosition: "0",
    endPosition: "24",
    totalSetSize: "150",
    nextUri: "/envelopes?start_position=25",
    previousUri: null,
    envelopes: [
      {
        envelopeId: "a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        status: "completed",
        statusChangedDateTime: "2025-01-15T15:45:30.123Z",
        documentsCombinedUri:
          "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents/combined",
        documentsUri:
          "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents",
        recipientsUri:
          "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/recipients",
        envelopeUri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        emailSubject: "Please sign the NDA",
        emailBlurb: "Please review and sign the attached document.",
        envelopeIdStamping: "true",
        sender: {
          userName: "John Doe",
          userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
          accountId: "7654321",
          email: "john.doe@example.com",
        },
        createdDateTime: "2025-01-15T10:00:00.000Z",
        sentDateTime: "2025-01-15T10:05:00.000Z",
        completedDateTime: "2025-01-15T15:45:30.123Z",
        lastModifiedDateTime: "2025-01-15T15:45:30.123Z",
      },
      {
        envelopeId: "b4c3d2e1-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        status: "sent",
        statusChangedDateTime: "2025-01-14T09:20:15.456Z",
        documentsCombinedUri:
          "/envelopes/b4c3d2e1-6f7a-8b9c-0d1e-2f3a4b5c6d7e/documents/combined",
        documentsUri:
          "/envelopes/b4c3d2e1-6f7a-8b9c-0d1e-2f3a4b5c6d7e/documents",
        recipientsUri:
          "/envelopes/b4c3d2e1-6f7a-8b9c-0d1e-2f3a4b5c6d7e/recipients",
        envelopeUri: "/envelopes/b4c3d2e1-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        emailSubject: "Contract Review Required",
        emailBlurb: "Please review and sign the contract.",
        envelopeIdStamping: "true",
        sender: {
          userName: "John Doe",
          userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
          accountId: "7654321",
          email: "john.doe@example.com",
        },
        createdDateTime: "2025-01-14T09:15:00.000Z",
        sentDateTime: "2025-01-14T09:20:15.456Z",
        lastModifiedDateTime: "2025-01-14T09:20:15.456Z",
      },
    ],
  },
};

export const updateEnvelopePayload = {
  data: {
    envelopeId: "a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    status: "voided",
    voidedDateTime: "2025-01-15T16:30:00.000Z",
    voidedReason: "Requested by sender",
    statusChangedDateTime: "2025-01-15T16:30:00.000Z",
  },
};

export const deleteEnvelopePayload = {
  data: {
    envelopeId: "a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    status: "deleted",
    deletedDateTime: "2025-01-15T17:00:00.000Z",
  },
};



export const getEnvelopeDocumentPayload = {
  data: {
    documentId: "1",
    documentIdGuid: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    name: "NDA.pdf",
    type: "content",
    uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents/1",
    order: "1",
    pages: "5",
    display: "inline",
    includeInDownload: "true",
    signerMustAcknowledge: "false",
    templateLocked: "false",
    templateRequired: "false",
    fileExtension: "pdf",
    availableDocumentTypes: [
      {
        type: "electronic",
        isDefault: "true",
      },
    ],
  },
};

export const listEnvelopeDocumentsPayload = {
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
        pages: "5",
        fileExtension: "pdf",
      },
      {
        documentId: "2",
        documentIdGuid: "f9a8b7c6-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
        name: "Terms and Conditions.pdf",
        type: "content",
        uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents/2",
        order: "2",
        pages: "10",
        fileExtension: "pdf",
      },
      {
        documentId: "certificate",
        name: "Certificate of Completion",
        type: "summary",
        uri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d/documents/certificate",
        order: "999",
        pages: "1",
        fileExtension: "pdf",
      },
    ],
  },
};



export const getRecipientPayload = {
  data: {
    recipientId: "1",
    recipientIdGuid: "b4c3d2e1-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    recipientType: "signer",
    name: "Jane Doe",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    roleName: "Signer",
    routingOrder: "1",
    status: "completed",
    completedCount: "1",
    deliveryMethod: "email",
    signedDateTime: "2025-01-15T14:30:45.123Z",
    deliveredDateTime: "2025-01-15T10:35:00.000Z",
    sentDateTime: "2025-01-15T10:30:50.456Z",
    userId: null,
    clientUserId: null,
    embeddedRecipientStartURL: null,
    customFields: [],
    tabs: {
      signHereTabs: [
        {
          tabId: "c5d4e3f2-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
          tabLabel: "signer1sig",
          name: "Please sign here",
          status: "signed",
          documentId: "1",
          recipientId: "1",
          pageNumber: "1",
          xPosition: "100",
          yPosition: "200",
          signed: "true",
        },
      ],
      dateSignedTabs: [
        {
          tabId: "d6e5f4a3-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
          tabLabel: "date_signed",
          name: "Date Signed",
          value: "2025-01-15",
          status: "signed",
          documentId: "1",
          recipientId: "1",
          pageNumber: "1",
          xPosition: "100",
          yPosition: "250",
        },
      ],
    },
  },
};

export const listRecipientsPayload = {
  data: {
    signers: [
      {
        recipientId: "1",
        recipientIdGuid: "b4c3d2e1-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        recipientType: "signer",
        name: "Jane Doe",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        roleName: "Signer",
        routingOrder: "1",
        status: "completed",
        completedCount: "1",
        deliveryMethod: "email",
        signedDateTime: "2025-01-15T14:30:45.123Z",
        deliveredDateTime: "2025-01-15T10:35:00.000Z",
        sentDateTime: "2025-01-15T10:30:50.456Z",
      },
    ],
    carbonCopies: [
      {
        recipientId: "2",
        recipientIdGuid: "c5d4e3f2-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
        recipientType: "carboncopy",
        name: "John Smith",
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        routingOrder: "2",
        status: "completed",
        deliveryMethod: "email",
        deliveredDateTime: "2025-01-15T14:35:00.000Z",
        sentDateTime: "2025-01-15T14:30:50.456Z",
      },
    ],
    certifiedDeliveries: [],
    recipientCount: "2",
    currentRoutingOrder: "2",
  },
};

export const addRecipientPayload = {
  data: {
    recipientId: "3",
    recipientIdGuid: "d6e5f4a3-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    recipientType: "signer",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    routingOrder: "2",
    status: "created",
  },
};

export const updateRecipientPayload = {
  data: {
    recipientId: "1",
    recipientIdGuid: "b4c3d2e1-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    recipientType: "signer",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    routingOrder: "1",
    status: "sent",
    statusChangedDateTime: "2025-01-15T11:00:00.000Z",
  },
};



export const createTemplatePayload = {
  data: {
    templateId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    uri: "/templates/e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    name: "Standard NDA Template",
    shared: "false",
    description: "Non-Disclosure Agreement template for partners",
    created: "2025-01-15T10:00:00.000Z",
    lastModified: "2025-01-15T10:00:00.000Z",
    lastModifiedBy: {
      userName: "John Doe",
      userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
      email: "john.doe@example.com",
      userType: "CompanyUser",
      userStatus: "Active",
    },
    pageCount: 5,
    folderName: "Templates",
    folderId: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  },
};

export const getTemplatePayload = {
  data: {
    templateId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    name: "Standard NDA Template",
    shared: "false",
    description: "Non-Disclosure Agreement template for partners",
    created: "2025-01-15T10:00:00.000Z",
    lastModified: "2025-01-15T10:00:00.000Z",
    lastModifiedBy: {
      userName: "John Doe",
      userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
      email: "john.doe@example.com",
      userType: "CompanyUser",
      userStatus: "Active",
      uri: "/users/f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
    },
    uri: "/templates/e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    pageCount: 5,
    folderName: "Templates",
    folderId: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    folderUri: "/folders/a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    owner: {
      userName: "John Doe",
      userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
      email: "john.doe@example.com",
      userType: "CompanyUser",
      userStatus: "Active",
    },
    documents: [
      {
        documentId: "1",
        name: "NDA.pdf",
        type: "content",
        uri: "/templates/e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b/documents/1",
        order: "1",
        pages: "5",
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
    emailSubject: "Please sign this document",
    emailBlurb: "Please review and sign the attached document.",
    status: "created",
  },
};

export const listTemplatesPayload = {
  data: {
    resultSetSize: "10",
    startPosition: "0",
    endPosition: "9",
    totalSetSize: "25",
    nextUri: "/templates?start_position=10",
    previousUri: null,
    envelopeTemplates: [
      {
        templateId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        name: "Standard NDA Template",
        shared: "false",
        description: "Non-Disclosure Agreement template for partners",
        created: "2025-01-15T10:00:00.000Z",
        lastModified: "2025-01-15T10:00:00.000Z",
        pageCount: 5,
        uri: "/templates/e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        folderName: "Templates",
        folderId: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        owner: {
          userName: "John Doe",
          userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
          email: "john.doe@example.com",
        },
      },
      {
        templateId: "f9a8b7c6-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
        name: "Employment Contract Template",
        shared: "false",
        description: "Standard employment contract template",
        created: "2025-01-10T14:20:00.000Z",
        lastModified: "2025-01-12T09:15:00.000Z",
        pageCount: 12,
        uri: "/templates/f9a8b7c6-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
        folderName: "HR Templates",
        folderId: "b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        owner: {
          userName: "John Doe",
          userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
          email: "john.doe@example.com",
        },
      },
    ],
    folders: [
      {
        folderId: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        name: "Templates",
        type: "templates",
        uri: "/folders/a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
      },
      {
        folderId: "b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        name: "HR Templates",
        type: "templates",
        uri: "/folders/b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
      },
    ],
  },
};

export const updateTemplatePayload = {
  data: {
    templateId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    name: "Updated NDA Template",
    description: "Updated Non-Disclosure Agreement template",
    lastModified: "2025-01-15T16:30:00.000Z",
    lastModifiedBy: {
      userName: "John Doe",
      userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
      email: "john.doe@example.com",
    },
  },
};

export const deleteTemplatePayload = {
  data: {
    templateId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    status: "deleted",
  },
};

export const listTemplateDocumentsPayload = {
  data: {
    templateId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    templateDocuments: [
      {
        documentId: "1",
        name: "NDA.pdf",
        type: "content",
        uri: "/templates/e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b/documents/1",
        order: "1",
        pages: "5",
        fileExtension: "pdf",
        display: "inline",
        includeInDownload: "true",
      },
      {
        documentId: "2",
        name: "Appendix A.pdf",
        type: "content",
        uri: "/templates/e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b/documents/2",
        order: "2",
        pages: "3",
        fileExtension: "pdf",
        display: "inline",
        includeInDownload: "true",
      },
    ],
  },
};



export const getAccountPayload = {
  data: {
    accountId: "7654321",
    accountIdGuid: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
    accountName: "Example Corporation",
    allowTransactionRooms: "true",
    billingPeriodDaysRemaining: "28",
    billingPeriodEndDate: "2025-02-15",
    billingPeriodEnvelopesAllowed: "5000",
    billingPeriodEnvelopesSent: "1234",
    billingPeriodStartDate: "2025-01-15",
    billingProfile: "Professional",
    canCancelRenewal: "true",
    canUpgrade: "true",
    connectPermission: "full",
    createdDate: "2020-03-15",
    currencyCode: "USD",
    currentPlanId: "bfdf6b72-c0cb-4e92-ba26-27d1ff97d968",
    distributorCode: "none",
    envelopeSendingBlocked: "false",
    envelopeUnitPrice: "0.50",
    isDowngrade: "false",
    planClassification: "corporate",
    planName: "DocuSign Business Pro",
    planStartDate: "2020-03-15",
    seatsAllowed: "25",
    seatsInUse: "18",
    status: "active",
    suspensionDate: null,
    suspensionStatus: null,
  },
};

export const listAccountSettingsPayload = {
  data: {
    accountSettings: [
      {
        name: "allowEnvelopePublish",
        value: "true",
        type: "Boolean",
        canModify: "true",
      },
      {
        name: "allowExpressSignerCertificate",
        value: "true",
        type: "Boolean",
        canModify: "true",
      },
      {
        name: "allowSignerReassign",
        value: "true",
        type: "Boolean",
        canModify: "true",
      },
      {
        name: "allowSigningExtensions",
        value: "true",
        type: "Boolean",
        canModify: "true",
      },
      {
        name: "enableAutoNav",
        value: "true",
        type: "Boolean",
        canModify: "true",
      },
      {
        name: "enableDSPro",
        value: "true",
        type: "Boolean",
        canModify: "false",
      },
      {
        name: "envelopeIntegrationAllowed",
        value: "full",
        type: "String",
        canModify: "false",
      },
      {
        name: "useConsumerDisclosure",
        value: "true",
        type: "Boolean",
        canModify: "true",
      },
    ],
  },
};



export const createUserPayload = {
  data: {
    userId: "a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    uri: "/users/a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    userName: "Alice Johnson",
    email: "alice.johnson@example.com",
    userStatus: "Active",
    userType: "CompanyUser",
    createdDateTime: "2025-01-15T10:30:00.000Z",
  },
};

export const getUserPayload = {
  data: {
    userId: "a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    userName: "Alice Johnson",
    email: "alice.johnson@example.com",
    firstName: "Alice",
    lastName: "Johnson",
    middleName: null,
    suffixName: null,
    title: "Senior Engineer",
    userStatus: "Active",
    userType: "CompanyUser",
    isAdmin: "false",
    uri: "/users/a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    createdDateTime: "2025-01-15T10:30:00.000Z",
    lastLogin: "2025-01-20T09:15:30.000Z",
    permissionProfileId: "b1c2d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
    permissionProfileName: "DocuSign Sender",
    activationAccessCode: null,
    loginStatus: "active",
    userSettings: [
      {
        name: "canSendEnvelope",
        value: "true",
      },
      {
        name: "canSendAPIRequests",
        value: "true",
      },
    ],
    groupList: [],
    workAddress: {
      address1: "123 Main Street",
      address2: "Suite 400",
      city: "San Francisco",
      stateOrProvince: "CA",
      postalCode: "94105",
      phone: "+1-555-123-4567",
      fax: null,
      country: "US",
    },
    homeAddress: null,
  },
};

export const listUsersPayload = {
  data: {
    resultSetSize: "15",
    startPosition: "0",
    endPosition: "14",
    totalSetSize: "18",
    nextUri: null,
    previousUri: null,
    users: [
      {
        userId: "a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
        userName: "Alice Johnson",
        email: "alice.johnson@example.com",
        firstName: "Alice",
        lastName: "Johnson",
        userStatus: "Active",
        userType: "CompanyUser",
        isAdmin: "false",
        uri: "/users/a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
        createdDateTime: "2025-01-15T10:30:00.000Z",
        permissionProfileName: "DocuSign Sender",
      },
      {
        userId: "b1c2d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        userName: "Bob Williams",
        email: "bob.williams@example.com",
        firstName: "Bob",
        lastName: "Williams",
        userStatus: "Active",
        userType: "CompanyUser",
        isAdmin: "true",
        uri: "/users/b1c2d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        createdDateTime: "2024-11-20T14:20:00.000Z",
        permissionProfileName: "Account Administrator",
      },
    ],
  },
};

export const updateUserPayload = {
  data: {
    userId: "a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    userName: "Alice Johnson",
    email: "alice.johnson@example.com",
    title: "Lead Engineer",
    userStatus: "Active",
    lastModifiedDateTime: "2025-01-20T11:45:00.000Z",
  },
};

export const deleteUserPayload = {
  data: {
    userId: "a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    userStatus: "Closed",
    closedDateTime: "2025-01-20T15:00:00.000Z",
  },
};



export const createWebhookPayload = {
  data: {
    connectId: "c2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    configurationType: "custom",
    urlToPublishTo: "https://example.com/webhooks/docusign",
    name: "My Integration Webhook",
    allowEnvelopePublish: "true",
    enableLog: "true",
    requiresAcknowledgement: "true",
    signMessageWithX509Certificate: "false",
    useSoapInterface: "false",
    includeHMAC: "true",
    includeDocumentFields: "true",
    includeSenderAccountAsCustomField: "true",
    includeTimeZone: "true",
    includeEnvelopeVoidReason: "true",
    includeDocuments: "false",
    allUsers: "true",
    events: [
      "envelope-sent",
      "envelope-delivered",
      "envelope-completed",
      "envelope-declined",
      "envelope-voided",
      "recipient-sent",
      "recipient-delivered",
      "recipient-completed",
      "recipient-declined",
    ],
    eventData: {
      version: "restv2.1",
      includeData: ["documents", "recipients", "custom_fields"],
      format: "json",
    },
    deliveryMode: "SIM",
    soapNameSpace: null,
    createdDateTime: "2025-01-15T10:45:00.000Z",
  },
};

export const getWebhookPayload = {
  data: {
    connectId: "c2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    configurationType: "custom",
    urlToPublishTo: "https://example.com/webhooks/docusign",
    name: "My Integration Webhook",
    allowEnvelopePublish: "true",
    enableLog: "true",
    requiresAcknowledgement: "true",
    signMessageWithX509Certificate: "false",
    useSoapInterface: "false",
    includeHMAC: "true",
    includeDocumentFields: "true",
    includeSenderAccountAsCustomField: "true",
    includeTimeZone: "true",
    includeEnvelopeVoidReason: "true",
    includeDocuments: "false",
    allUsers: "true",
    events: [
      "envelope-sent",
      "envelope-delivered",
      "envelope-completed",
      "envelope-declined",
      "envelope-voided",
      "recipient-sent",
      "recipient-delivered",
      "recipient-completed",
      "recipient-declined",
    ],
    eventData: {
      version: "restv2.1",
      includeData: ["documents", "recipients", "custom_fields"],
      format: "json",
    },
    deliveryMode: "SIM",
    soapNameSpace: null,
    createdDateTime: "2025-01-15T10:45:00.000Z",
    failureDetails: null,
  },
};

export const listWebhooksPayload = {
  data: {
    totalRecords: "3",
    configurations: [
      {
        connectId: "c2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
        configurationType: "custom",
        urlToPublishTo: "https://example.com/webhooks/docusign",
        name: "My Integration Webhook",
        allowEnvelopePublish: "true",
        enableLog: "true",
        includeHMAC: "true",
        allUsers: "true",
        events: [
          "envelope-sent",
          "envelope-completed",
          "recipient-completed",
        ],
        createdDateTime: "2025-01-15T10:45:00.000Z",
      },
      {
        connectId: "d3e4f5a6-7b8c-9d0e-1f2a-3b4c5d6e7f8a",
        configurationType: "custom",
        urlToPublishTo: "https://example.com/webhooks/backup",
        name: "Backup Webhook",
        allowEnvelopePublish: "true",
        enableLog: "true",
        includeHMAC: "true",
        allUsers: "true",
        events: ["envelope-voided", "envelope-declined"],
        createdDateTime: "2025-01-10T14:20:00.000Z",
      },
    ],
  },
};

export const updateWebhookPayload = {
  data: {
    connectId: "c2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    configurationType: "custom",
    urlToPublishTo: "https://example.com/webhooks/docusign-updated",
    name: "Updated Integration Webhook",
    allowEnvelopePublish: "true",
    enableLog: "true",
    includeHMAC: "true",
    lastModifiedDateTime: "2025-01-20T09:30:00.000Z",
  },
};

export const deleteWebhookPayload = {
  data: {
    connectId: "c2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    status: "deleted",
  },
};



export const listFoldersPayload = {
  data: {
    resultSetSize: "6",
    startPosition: "0",
    endPosition: "5",
    totalSetSize: "6",
    folders: [
      {
        folderId: "inbox",
        name: "Inbox",
        type: "inbox",
        uri: "/folders/inbox",
        hasSubFolders: "false",
        filter: {
          actionRequired: "false",
        },
      },
      {
        folderId: "sentitems",
        name: "Sent Items",
        type: "sentitems",
        uri: "/folders/sentitems",
        hasSubFolders: "false",
        filter: {
          actionRequired: "false",
        },
      },
      {
        folderId: "draft",
        name: "Drafts",
        type: "draft",
        uri: "/folders/draft",
        hasSubFolders: "false",
        filter: {
          actionRequired: "false",
        },
      },
      {
        folderId: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        name: "Templates",
        type: "templates",
        uri: "/folders/a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        hasSubFolders: "true",
        filter: {
          actionRequired: "false",
        },
      },
    ],
  },
};

export const listFolderItemsPayload = {
  data: {
    resultSetSize: "5",
    startPosition: "0",
    endPosition: "4",
    totalSetSize: "12",
    nextUri: "/folders/inbox/envelopes?start_position=5",
    previousUri: null,
    folderItems: [
      {
        envelopeId: "a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        envelopeUri: "/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        status: "sent",
        statusChangedDateTime: "2025-01-15T10:30:50.456Z",
        emailSubject: "Please sign the NDA",
        sender: {
          userName: "John Doe",
          userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
          email: "john.doe@example.com",
          accountId: "7654321",
        },
        recipients: {
          signerCount: "1",
          carbonCopyCount: "1",
          certifiedDeliveryCount: "0",
        },
        createdDateTime: "2025-01-15T10:00:00.000Z",
        sentDateTime: "2025-01-15T10:30:50.456Z",
        lastModifiedDateTime: "2025-01-15T10:30:50.456Z",
      },
    ],
  },
};



export const getTabsPayload = {
  data: {
    signHereTabs: [
      {
        tabId: "c5d4e3f2-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
        tabLabel: "signer1sig",
        name: "Signature",
        status: "active",
        documentId: "1",
        recipientId: "1",
        pageNumber: "1",
        xPosition: "100",
        yPosition: "200",
        width: 100,
        height: 50,
        optional: "false",
        anchorString: "signer1sig",
        anchorXOffset: "0",
        anchorYOffset: "0",
        anchorUnits: "pixels",
        anchorIgnoreIfNotPresent: "false",
        anchorCaseSensitive: "false",
        anchorMatchWholeWord: "false",
        anchorHorizontalAlignment: "left",
        tabType: "signhere",
      },
    ],
    dateSignedTabs: [
      {
        tabId: "d6e5f4a3-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
        tabLabel: "date_signed",
        name: "Date Signed",
        value: "2025-01-15",
        status: "active",
        documentId: "1",
        recipientId: "1",
        pageNumber: "1",
        xPosition: "100",
        yPosition: "250",
        width: 84,
        height: 22,
        font: "lucidaconsole",
        fontSize: "Size12",
        fontColor: "Black",
        bold: "false",
        italic: "false",
        underline: "false",
        anchorString: "signer1date",
        anchorXOffset: "0",
        anchorYOffset: "-6",
        anchorUnits: "pixels",
        tabType: "datesigned",
      },
    ],
    textTabs: [
      {
        tabId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        tabLabel: "company_name",
        name: "Company Name",
        value: "Example Corporation",
        status: "active",
        documentId: "1",
        recipientId: "1",
        pageNumber: "1",
        xPosition: "100",
        yPosition: "150",
        width: 200,
        height: 22,
        required: "true",
        locked: "false",
        concealValueOnDocument: "false",
        disableAutoSize: "false",
        maxLength: 100,
        font: "arial",
        fontSize: "Size11",
        fontColor: "Black",
        bold: "false",
        italic: "false",
        underline: "false",
        tabType: "text",
      },
    ],
    checkboxTabs: [
      {
        tabId: "f9a8b7c6-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
        tabLabel: "agree_terms",
        name: "Agree to Terms",
        selected: "true",
        status: "active",
        documentId: "1",
        recipientId: "1",
        pageNumber: "1",
        xPosition: "100",
        yPosition: "300",
        width: 20,
        height: 20,
        required: "true",
        locked: "false",
        tabType: "checkbox",
      },
    ],
  },
};

export const addTabsPayload = {
  data: {
    signHereTabs: [
      {
        tabId: "a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
        tabLabel: "new_signature",
        name: "New Signature",
        documentId: "1",
        recipientId: "1",
        pageNumber: "2",
        xPosition: "150",
        yPosition: "400",
        status: "created",
      },
    ],
  },
};

export const updateTabsPayload = {
  data: {
    textTabs: [
      {
        tabId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        tabLabel: "company_name",
        value: "Updated Corporation Name",
        status: "updated",
        lastModified: "2025-01-20T14:30:00.000Z",
      },
    ],
  },
};

export const deleteTabsPayload = {
  data: {
    tabs: [
      {
        tabId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        status: "deleted",
      },
    ],
  },
};



export const getCustomFieldsPayload = {
  data: {
    textCustomFields: [
      {
        fieldId: "b1c2d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        name: "Project Code",
        show: "true",
        required: "true",
        value: "PROJ-2025-001",
        configurationType: "custom",
      },
      {
        fieldId: "c2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
        name: "Department",
        show: "true",
        required: "false",
        value: "Engineering",
        configurationType: "custom",
      },
    ],
    listCustomFields: [
      {
        fieldId: "d3e4f5a6-7b8c-9d0e-1f2a-3b4c5d6e7f8a",
        name: "Priority",
        show: "true",
        required: "true",
        value: "High",
        listItems: ["Low", "Medium", "High", "Critical"],
        configurationType: "custom",
      },
    ],
  },
};

export const addCustomFieldsPayload = {
  data: {
    textCustomFields: [
      {
        fieldId: "e4f5a6b7-8c9d-0e1f-2a3b-4c5d6e7f8a9b",
        name: "Cost Center",
        show: "true",
        required: "false",
        value: "CC-1000",
        configurationType: "custom",
      },
    ],
  },
};

export const updateCustomFieldsPayload = {
  data: {
    textCustomFields: [
      {
        fieldId: "b1c2d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        name: "Project Code",
        value: "PROJ-2025-002",
        lastModified: "2025-01-20T11:15:00.000Z",
      },
    ],
  },
};

export const deleteCustomFieldsPayload = {
  data: {
    textCustomFields: [
      {
        fieldId: "b1c2d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        status: "deleted",
      },
    ],
  },
};



export const getBrandPayload = {
  data: {
    brandId: "f5a6b7c8-9d0e-1f2a-3b4c-5d6e7f8a9b0c",
    brandName: "Corporate Brand",
    brandCompany: "Example Corporation",
    isDefault: "true",
    isSendingDefault: "true",
    isSigningDefault: "true",
    emailContent: {
      emailSubject: "Please sign this document from {CompanyName}",
      emailBlurb: "This document requires your signature.",
    },
    colors: {
      primary: "#0066CC",
      secondary: "#F0F0F0",
    },
    logos: {
      primary: "https://example.com/logos/primary.png",
      secondary: "https://example.com/logos/secondary.png",
      email: "https://example.com/logos/email.png",
    },
    createdDateTime: "2024-06-15T10:00:00.000Z",
    modifiedDateTime: "2025-01-10T14:30:00.000Z",
  },
};

export const listBrandsPayload = {
  data: {
    resultSetSize: "2",
    totalSetSize: "2",
    brands: [
      {
        brandId: "f5a6b7c8-9d0e-1f2a-3b4c-5d6e7f8a9b0c",
        brandName: "Corporate Brand",
        brandCompany: "Example Corporation",
        isDefault: "true",
        isSendingDefault: "true",
        isSigningDefault: "true",
      },
      {
        brandId: "a6b7c8d9-0e1f-2a3b-4c5d-6e7f8a9b0c1d",
        brandName: "Partner Brand",
        brandCompany: "Partner Division",
        isDefault: "false",
        isSendingDefault: "false",
        isSigningDefault: "false",
      },
    ],
  },
};



export const createPowerFormPayload = {
  data: {
    powerFormId: "b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
    powerFormUrl:
      "https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
    name: "Customer Onboarding Form",
    isActive: "true",
    createdDateTime: "2025-01-15T11:00:00.000Z",
  },
};

export const getPowerFormPayload = {
  data: {
    powerFormId: "b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
    powerFormUrl:
      "https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
    name: "Customer Onboarding Form",
    isActive: "true",
    usesRemaining: "unlimited",
    limitUseInterval: null,
    limitUseIntervalMinutes: null,
    limitUseIntervalEnabled: "false",
    createdDateTime: "2025-01-15T11:00:00.000Z",
    lastUsed: "2025-01-18T14:22:00.000Z",
    signingMode: "email",
    templateId: "e7f6a5b4-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    templateName: "Onboarding Template",
    envelopesCreatedCount: "47",
  },
};

export const listPowerFormsPayload = {
  data: {
    resultSetSize: "2",
    startPosition: "0",
    endPosition: "1",
    totalSetSize: "2",
    powerForms: [
      {
        powerFormId: "b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
        name: "Customer Onboarding Form",
        isActive: "true",
        createdDateTime: "2025-01-15T11:00:00.000Z",
        lastUsed: "2025-01-18T14:22:00.000Z",
        envelopesCreatedCount: "47",
      },
      {
        powerFormId: "c8d9e0f1-2a3b-4c5d-6e7f-8a9b0c1d2e3f",
        name: "Employee NDA",
        isActive: "true",
        createdDateTime: "2024-12-10T09:30:00.000Z",
        lastUsed: "2025-01-19T16:45:00.000Z",
        envelopesCreatedCount: "132",
      },
    ],
  },
};

export const deletePowerFormPayload = {
  data: {
    powerFormId: "b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
    status: "deleted",
  },
};



export const createBulkSendListPayload = {
  data: {
    listId: "d9e0f1a2-3b4c-5d6e-7f8a-9b0c1d2e3f4a",
    name: "Q1 2025 Agreements",
    createdDate: "2025-01-15T12:00:00.000Z",
    bulkCopies: "250",
  },
};

export const getBulkSendListPayload = {
  data: {
    listId: "d9e0f1a2-3b4c-5d6e-7f8a-9b0c1d2e3f4a",
    name: "Q1 2025 Agreements",
    createdBy: {
      userName: "John Doe",
      userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
      email: "john.doe@example.com",
    },
    createdDate: "2025-01-15T12:00:00.000Z",
    bulkCopies: "250",
    sent: "185",
    queued: "50",
    failed: "15",
  },
};



export const createContactPayload = {
  data: {
    contactId: "e0f1a2b3-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    organization: "Miller Associates",
    shared: "false",
    createdDateTime: "2025-01-15T13:00:00.000Z",
  },
};

export const getContactPayload = {
  data: {
    contactId: "e0f1a2b3-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    organization: "Miller Associates",
    cloudProvider: null,
    cloudProviderContainerId: null,
    signingGroup: null,
    signingGroupName: null,
    shared: "false",
    isOwner: "true",
    owner: {
      userName: "John Doe",
      userId: "f8a7b6c5-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
      email: "john.doe@example.com",
    },
    createdDateTime: "2025-01-15T13:00:00.000Z",
  },
};

export const listContactsPayload = {
  data: {
    resultSetSize: "3",
    startPosition: "0",
    endPosition: "2",
    totalSetSize: "3",
    contacts: [
      {
        contactId: "e0f1a2b3-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
        name: "Sarah Miller",
        email: "sarah.miller@example.com",
        organization: "Miller Associates",
        shared: "false",
        isOwner: "true",
      },
      {
        contactId: "f1a2b3c4-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
        name: "David Chen",
        email: "david.chen@example.com",
        organization: "Chen Consulting",
        shared: "false",
        isOwner: "true",
      },
      {
        contactId: "a2b3c4d5-6e7f-8a9b-0c1d-2e3f4a5b6c7d",
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        organization: "Rodriguez & Partners",
        shared: "true",
        isOwner: "false",
      },
    ],
  },
};

export const deleteContactPayload = {
  data: {
    contactId: "e0f1a2b3-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
    status: "deleted",
  },
};



export const getAccountSignaturePayload = {
  data: {
    accountSignatures: [
      {
        signatureId: "b3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e",
        signatureName: "John Doe Signature",
        signatureInitials: "JD",
        adoptedDateTime: "2024-05-10T14:00:00.000Z",
        createdDateTime: "2024-05-10T14:00:00.000Z",
        dateStampProperties: {
          dateAreaX: "100",
          dateAreaY: "20",
          dateAreaWidth: "150",
          dateAreaHeight: "30",
        },
        signatureFont: "lucida-handwriting",
        signatureType: "RubberStamp",
        signatureImageUri:
          "/accounts/7654321/signatures/b3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e",
        initialsImageUri:
          "/accounts/7654321/signatures/b3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e/initials",
      },
    ],
  },
};

export const createAccountSignaturePayload = {
  data: {
    signatureId: "c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f",
    signatureName: "Electronic Signature",
    signatureInitials: "JD",
    adoptedDateTime: "2025-01-15T14:00:00.000Z",
    createdDateTime: "2025-01-15T14:00:00.000Z",
  },
};



export const getPermissionProfilePayload = {
  data: {
    permissionProfileId: "d5e6f7a8-9b0c-1d2e-3f4a-5b6c7d8e9f0a",
    permissionProfileName: "DocuSign Sender",
    settings: [
      {
        name: "allowSendEnvelope",
        value: "true",
      },
      {
        name: "allowCreateTemplates",
        value: "true",
      },
      {
        name: "allowSigningGroups",
        value: "false",
      },
      {
        name: "allowAccountManagement",
        value: "false",
      },
      {
        name: "allowBulkSend",
        value: "true",
      },
      {
        name: "allowPowerForms",
        value: "true",
      },
    ],
    modifiedDateTime: "2024-08-20T10:30:00.000Z",
    createdDateTime: "2024-01-15T09:00:00.000Z",
    userCount: "12",
  },
};

export const listPermissionProfilesPayload = {
  data: {
    resultSetSize: "4",
    totalSetSize: "4",
    permissionProfiles: [
      {
        permissionProfileId: "d5e6f7a8-9b0c-1d2e-3f4a-5b6c7d8e9f0a",
        permissionProfileName: "DocuSign Sender",
        userCount: "12",
      },
      {
        permissionProfileId: "e6f7a8b9-0c1d-2e3f-4a5b-6c7d8e9f0a1b",
        permissionProfileName: "Account Administrator",
        userCount: "2",
      },
      {
        permissionProfileId: "f7a8b9c0-1d2e-3f4a-5b6c-7d8e9f0a1b2c",
        permissionProfileName: "DocuSign Viewer",
        userCount: "8",
      },
      {
        permissionProfileId: "a8b9c0d1-2e3f-4a5b-6c7d-8e9f0a1b2c3d",
        permissionProfileName: "Template Manager",
        userCount: "5",
      },
    ],
  },
};



export const errorPayload = {
  data: {
    errorCode: "ENVELOPE_NOT_FOUND",
    message: "The envelope specified by the envelopeId does not exist.",
  },
};

export const validationErrorPayload = {
  data: {
    errorCode: "INVALID_REQUEST_PARAMETER",
    message: "The request contained at least one invalid parameter.",
    errors: [
      {
        errorCode: "INVALID_EMAIL_ADDRESS",
        message: "Email address is not in a valid format.",
        propertyName: "recipients.signers[0].email",
      },
      {
        errorCode: "REQUIRED_PARAMETER_MISSING",
        message: "Required parameter is missing.",
        propertyName: "emailSubject",
      },
    ],
  },
};
