export const envelopeJson = {
  documents: [
    {
      documentBase64: "[Document content (PDF File)]",
      documentId: "1",
      fileExtension: "pdf",
      name: "NDA.pdf",
    },
  ],
  emailSubject: "Please sign the NDA",
  recipients: {
    signers: [
      {
        email: "the_nda_signer@example.com",
        name: "Darlene Petersen",
        recipientId: "1",
        routingOrder: "1",
        tabs: {
          dateSignedTabs: [
            {
              anchorString: "signer1date",
              anchorYOffset: "-6",
              fontSize: "Size12",
              name: "Date Signed",
              recipientId: "1",
              tabLabel: "date_signed",
            },
          ],
          fullNameTabs: [
            {
              anchorString: "signer1name",
              anchorYOffset: "-6",
              fontSize: "Size12",
              name: "Full Name",
              recipientId: "1",
              tabLabel: "Full Name",
            },
          ],
          signHereTabs: [
            {
              anchorString: "signer1sig",
              anchorUnits: "mms",
              anchorXOffset: "0",
              anchorYOffset: "0",
              name: "Please sign here",
              optional: "false",
              recipientId: "1",
              scaleValue: 1,
              tabLabel: "signer1sig",
            },
          ],
        },
      },
    ],
  },
  status: "sent",
};
