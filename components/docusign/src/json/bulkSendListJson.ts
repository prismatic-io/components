export const bulkSendListJson = {
  bulkCopies: [
    {
      customFields: [
        {
          name: "ProductType",
          value: "Electronics",
        },
      ],
      docGenFormFields: [
        {
          name: "DocumentType",
          value: "Invoice",
        },
      ],
      emailBlurb: "Please review and sign the attached document.",
      emailSubject: "Document Signature Request",
      recipients: [
        {
          accessCode: "1234",
          clientUserId: "user123",
          customFields: ["Customer123"],
          deliveryMethod: "email",
          email: "john.doe@example.com",
          emailNotification: {
            emailBody:
              "Dear John, please review and sign the attached document.",
            emailBodyMetadata: {
              options: ["Format1", "Format2"],
              rights: "editable",
            },
            emailSubject: "Signature Request",
            emailSubjectMetadata: {
              options: ["Urgent", "Normal"],
              rights: "editable",
            },
            supportedLanguage: "English",
            supportedLanguageMetadata: {
              options: ["English", "Spanish"],
              rights: "editable",
            },
          },
          embeddedRecipientStartURL: "https://example.com/signing-start",
          faxNumber: "+1234567890",
          hostEmail: "host@example.com",
          hostName: "Host Name",
          idCheckConfigurationName: "StandardCheck",
          idCheckInformationInput: {
            addressInformationInput: {
              addressInformation: {
                address1: "123 Main Street",
                address2: "Apt 456",
                city: "Cityville",
                country: "USA",
                fax: "+1234567891",
                phone: "+9876543210",
                postalCode: "12345",
                stateOrProvince: "CA",
                zipPlus4: "6789",
              },
              displayLevelCode: "ReadOnly",
              receiveInResponse: "true",
            },
            dobInformationInput: {
              dateOfBirth: "1980-01-01",
              displayLevelCode: "ReadOnly",
              receiveInResponse: "true",
            },
            ssn4InformationInput: {
              displayLevelCode: "ReadOnly",
              receiveInResponse: "true",
              ssn4: "5678",
            },
            ssn9InformationInput: {
              displayLevelCode: "ReadOnly",
              ssn9: "123-45-6789",
            },
          },
          identificationMethod: "GovernmentID",
          identityVerification: {
            workflowId: "IDVerificationWorkflow",
            inputOptions: [
              {
                name: "IDDocument",
                valueType: "GovernmentID",
                phoneNumberList: [
                  {
                    countryCode: "1",
                    countryCodeLock: "1",
                    extension: "123",
                    number: "9876543210",
                  },
                ],
              },
            ],
            workflowIdMetadata: {
              options: ["IDVerificationWorkflow"],
              rights: "editable",
            },
            workflowLabel: "ID Verification",
          },
          name: "John Doe",
          note: "Please sign this document promptly.",
          phoneAuthentication: {
            recipMayProvideNumber: "true",
            recipMayProvideNumberMetadata: {
              options: ["Yes", "No"],
              rights: "editable",
            },
            recordVoicePrint: "true",
            recordVoicePrintMetadata: {
              options: ["Yes", "No"],
              rights: "editable",
            },
            senderProvidedNumbers: ["9876543210"],
            senderProvidedNumbersMetadata: {
              options: ["9876543210"],
              rights: "editable",
            },
            validateRecipProvidedNumber: "true",
            validateRecipProvidedNumberMetadata: {
              options: ["Yes", "No"],
              rights: "editable",
            },
          },
          recipientId: "recipient123",
          recipientSignatureProviders: [
            {
              sealDocumentsWithTabsOnly: "No",
              sealName: "SignatureSeal",
              signatureProviderName: "eSignProvider",
              signatureProviderNameMetadata: {
                options: ["eSignProvider"],
                rights: "editable",
              },
              signatureProviderOptions: {
                cpfNumber: "9876543210",
                cpfNumberMetadata: {
                  options: ["9876543210"],
                  rights: "editable",
                },
                oneTimePassword: "OTP123",
                oneTimePasswordMetadata: {
                  options: ["OTP123"],
                  rights: "editable",
                },
                signerRole: "Manager",
                signerRoleMetadata: {
                  options: ["AuthorizedSigner"],
                  rights: "editable",
                },
                sms: "+9876543210",
                smsMetadata: {
                  options: ["+9876543210"],
                  rights: "editable",
                },
              },
            },
          ],
          roleName: "Signer",
          signerName: "John Doe",
          signingGroupId: "Group123",
          smsAuthentication: {
            senderProvidedNumbers: ["+9876543210"],
            senderProvidedNumbersMetadata: {
              options: ["+9876543210"],
              rights: "editable",
            },
          },
          socialAuthentications: [
            {
              authentication: "Facebook",
            },
          ],
          tabs: [
            {
              initialValue: "Sign Here",
              tabLabel: "SignatureTab",
            },
          ],
        },
      ],
    },
  ],
  listId: "List123",
  name: "SignatureRequest123",
};
