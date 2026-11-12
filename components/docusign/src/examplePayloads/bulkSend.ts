export const getBulkSendListsExamplePayload = {
  data: {
    bulkListSummaries: [
      {
        bulkSendListId: "d2f8a4c6-1b3e-4d7a-9c5f-8e2a6b4d1f37",
        createdByUser: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
        createdDate: "2026-10-14T15:22:08.4170000Z",
        name: "Q4 Vendor Renewals",
      },
      {
        bulkSendListId: "6c1e9b3f-7a5d-4e2c-8b6a-3f9d1c7e5a24",
        createdByUser: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
        createdDate: "2026-10-21T09:47:31.0930000Z",
        name: "Partner NDA Refresh",
      },
    ],
  },
};

export const getBulkSendBatchesExamplePayload = {
  data: {
    totalQueued: "0",
    queueLimit: "2000",
    batchSizeLimit: "1000",
    bulkBatchSummaries: [
      {
        batchId: "a3f7c1e9-5d2b-4a8f-b6e4-1c9d7a3f5e02",
        batchName: "Q4 Vendor Renewals",
        batchSize: "25",
        batchUri: "/bulk_send_batch/a3f7c1e9-5d2b-4a8f-b6e4-1c9d7a3f5e02",
        action: "send",
        actionStatus: "queued",
        failed: "0",
        queued: "0",
        sent: "25",
        submittedDate: "2026-10-15T14:05:12.2270000Z",
      },
      {
        batchId: "e8b2d6f4-3c1a-4f9e-a7d5-6b2e8c4f1a93",
        batchName: "Partner NDA Refresh",
        batchSize: "12",
        batchUri: "/bulk_send_batch/e8b2d6f4-3c1a-4f9e-a7d5-6b2e8c4f1a93",
        action: "send",
        actionStatus: "queued",
        failed: "0",
        queued: "0",
        sent: "12",
        submittedDate: "2026-10-22T10:12:44.6810000Z",
      },
    ],
    nextUri: "",
    previousUri: "",
    startPosition: "0",
    endPosition: "1",
    resultSetSize: "2",
    totalSetSize: "2",
  },
};

const q4VendorRenewalsBulkSendList = {
  listId: "d2f8a4c6-1b3e-4d7a-9c5f-8e2a6b4d1f37",
  name: "Q4 Vendor Renewals",
  bulkCopies: [
    {
      emailSubject: "Please sign your 2027 vendor renewal",
      emailBlurb: "Review and sign the attached renewal agreement.",
      recipients: [
        {
          recipientId: "1",
          roleName: "Signer",
          name: "Avery Chen",
          email: "avery.chen@example.com",
        },
      ],
      customFields: [{ name: "vendorId", value: "V-10482" }],
      prefillTabs: [],
      docGenFormFields: [],
    },
    {
      emailSubject: "Please sign your 2027 vendor renewal",
      emailBlurb: "Review and sign the attached renewal agreement.",
      recipients: [
        {
          recipientId: "1",
          roleName: "Signer",
          name: "Marcus Webb",
          email: "marcus.webb@example.com",
        },
      ],
      customFields: [{ name: "vendorId", value: "V-10517" }],
      prefillTabs: [],
      docGenFormFields: [],
    },
  ],
};

export const createBulkSendListExamplePayload = {
  data: q4VendorRenewalsBulkSendList,
};

export const getBulkSendListExamplePayload = {
  data: q4VendorRenewalsBulkSendList,
};

export const updateBulkSendListExamplePayload = {
  data: {
    ...q4VendorRenewalsBulkSendList,
    name: "Q4 Vendor Renewals (Revised)",
  },
};

export const deleteBulkSendListExamplePayload = {
  data: {
    bulkListSummaries: [
      {
        bulkSendListId: "6c1e9b3f-7a5d-4e2c-8b6a-3f9d1c7e5a24",
        createdByUser: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
        createdDate: "2026-10-21T09:47:31.0930000Z",
        name: "Partner NDA Refresh",
      },
    ],
  },
};

export const getBulkSendBatchStatusExamplePayload = {
  data: {
    batchId: "a3f7c1e9-5d2b-4a8f-b6e4-1c9d7a3f5e02",
    batchName: "Q4 Vendor Renewals",
    batchSize: "25",
    action: "send",
    actionStatus: "queued",
    envelopeIdOrTemplateId: "6a2e8c4f-1d3b-4f7a-9e5c-0b8d2a6f4c13",
    mailingListId: "d2f8a4c6-1b3e-4d7a-9c5f-8e2a6b4d1f37",
    mailingListName: "Q4 Vendor Renewals",
    ownerUserId: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
    senderUserId: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
    envelopesUri:
      "/bulk_send_batch/a3f7c1e9-5d2b-4a8f-b6e4-1c9d7a3f5e02/envelopes",
    envelopesInfo: {
      authoritativeCopy: "0",
      completed: "18",
      correct: "0",
      created: "0",
      declined: "1",
      deleted: "0",
      delivered: "4",
      digitalSignaturesPending: "0",
      sent: "2",
      signed: "0",
      timedOut: "0",
      transferCompleted: "0",
      voided: "0",
    },
    bulkErrors: [],
    failed: "0",
    queued: "0",
    sent: "25",
    resendsRemaining: "3",
    submittedDate: "2026-10-15T14:05:12.2270000Z",
  },
};
