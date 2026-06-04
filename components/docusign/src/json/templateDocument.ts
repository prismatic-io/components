export const templateDocument = {
  accessControlListBase64: "base64string",
  accessibility: "accessibility",
  allowComments: "true",
  allowMarkup: "true",
  allowReassign: "true",
  allowRecipientRecursion: "true",
  allowViewHistory: "true",
  asynchronous: "true",
  attachments: [
    {
      accessControl: "sender",
      attachmentId: "1234",
      attachmentType: "type",
      data: "base64string",
      label: "label",
      name: "name",
      remoteUrl: "https://www.example.com/path/to/resource",
    },
  ],
  attachmentsUri: "https://www.example.com/path/to/resourc",
  authoritativeCopy: "true",
  authoritativeCopyDefault: "default",
  autoNavigation: "true",
  brandId: "12345",
  brandLock: "true",
  burnDefaultTabData: "data",
  certificateUri: "https://www.example.com/path/to/resource",
  completedDateTime: "2023-12-25",
  compositeTemplates: [
    {
      compositeTemplateId: "1234",
      document: {
        assignTabsToRecipientId: "tabs",
        authoritativeCopy: true,
        display: "modal",
        docGenFormFields: [
          {
            description: "description",
            label: "label",
            name: "name",
            options: [
              {
                description: "description",
                label: "label",
                selected: "true",
                value: "value",
              },
            ],
            required: "true",
            type: "Date",
            value: "value",
            validation: {
              errorMessage: "error",
              expression: "=",
            },
          },
        ],
        documentBase64: "base64string",
        documentFields: [
          {
            name: "name",
            errorDetails: {
              errorCode: "code",
              message: "message",
            },
            originalValue: "originalValue",
            value: "value",
          },
        ],
        documentId: "1234",
        encryptedWithKeyManager: "true",
        fileExtension: "jpg",
        fileFormatHint: "hint",
        htmlDefinition: {
          displayAnchorPrefix: "prefix",
        },
      },
    },
  ],
};
