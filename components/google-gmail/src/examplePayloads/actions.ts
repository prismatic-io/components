












export const createPushNotificationExamplePayload = {
  data: {
    historyId: "9876543210",
    expiration: "1731513045000",
  },
};

export const deletePushNotificationExamplePayload = {
  data: undefined,
};





export const renewPushNotificationExamplePayload = {
  data: {
    historyId: "9876543210",
    expiration: "1731513045000",
    expirationDate: "2024-11-13T15:30:45.000Z",
    expirationTimestamp: "1731513045000",
    hoursExtended: 168,
  },
};





export const getWatchStatusExamplePayload = {
  data: {
    status: "HEALTHY",
    recommendation: "No action needed.",
    expirationDate: "2024-11-13T15:30:45.000Z",
    expirationTimestamp: "1731513045000",
    hoursUntilExpiration: 156.5,
    expiringSoon: false,
    isExpired: false,
  },
};







export const listLabelsExamplePayload = {
  data: {
    labels: [
      {
        id: "INBOX",
        name: "INBOX",
        type: "system",
        messageListVisibility: "show",
        labelListVisibility: "labelShow",
      },
      {
        id: "SENT",
        name: "SENT",
        type: "system",
        messageListVisibility: "show",
        labelListVisibility: "labelShow",
      },
      {
        id: "Label_1234567890",
        name: "Work Projects",
        type: "user",
        messageListVisibility: "show",
        labelListVisibility: "labelShow",
        color: {
          backgroundColor: "#42d692",
          textColor: "#ffffff",
        },
        messagesTotal: 42,
        messagesUnread: 5,
        threadsTotal: 38,
        threadsUnread: 4,
      },
    ],
  },
};







export const getLabelByNameExamplePayload = {
  data: {
    id: "Label_1234567890",
    name: "Work Projects",
    type: "user",
    messageListVisibility: "show",
    labelListVisibility: "labelShow",
    color: {
      backgroundColor: "#42d692",
      textColor: "#ffffff",
    },
    messagesTotal: 42,
    messagesUnread: 5,
    threadsTotal: 38,
    threadsUnread: 4,
  },
};







export const getEventHistoryExamplePayload = {
  data: {
    history: [
      {
        id: "9876543210",
        messages: [
          {
            id: "18c2f4b3e8a9d7f6",
            threadId: "18c2f4b3e8a9d7f6",
          },
        ],
        messagesAdded: [
          {
            message: {
              id: "18c2f4b3e8a9d7f6",
              threadId: "18c2f4b3e8a9d7f6",
              labelIds: ["INBOX", "UNREAD"],
            },
          },
        ],
      },
      {
        id: "9876543211",
        messages: [
          {
            id: "18c2f4b3e8a9d7f6",
            threadId: "18c2f4b3e8a9d7f6",
          },
        ],
        labelsAdded: [
          {
            message: {
              id: "18c2f4b3e8a9d7f6",
              threadId: "18c2f4b3e8a9d7f6",
              labelIds: ["INBOX", "UNREAD", "IMPORTANT"],
            },
            labelIds: ["IMPORTANT"],
          },
        ],
      },
    ],
    historyId: "9876543211",
    nextPageToken: "12345678901234567890",
    // biome-ignore lint/suspicious/noExplicitAny: Example payload requires flexible typing
  } as any,
};







export const sendMessageExamplePayload = {
  data: {
    id: "18c2f4b3e8a9d7f6",
    threadId: "18c2f4b3e8a9d7f6",
    labelIds: ["SENT"],
    // biome-ignore lint/suspicious/noExplicitAny: Example payload requires flexible typing
  } as any,
};







export const trashMessageByIdExamplePayload = {
  data: {
    id: "18c2f4b3e8a9d7f6",
    threadId: "18c2f4b3e8a9d7f6",
    labelIds: ["TRASH"],
    historyId: "9876543210",
    internalDate: "1730913045000",
    sizeEstimate: 2543,
    snippet: "This is the beginning of the email message...",
    // biome-ignore lint/suspicious/noExplicitAny: Example payload requires flexible typing
  } as any,
};







export const unTrashMessageByIdExamplePayload = {
  data: {
    id: "18c2f4b3e8a9d7f6",
    threadId: "18c2f4b3e8a9d7f6",
    labelIds: ["INBOX"],
    historyId: "9876543211",
    internalDate: "1730913045000",
    sizeEstimate: 2543,
    snippet: "This is the beginning of the email message...",
    // biome-ignore lint/suspicious/noExplicitAny: Example payload requires flexible typing
  } as any,
};







export const updateLabelsExamplePayload = {
  data: {
    id: "18c2f4b3e8a9d7f6",
    threadId: "18c2f4b3e8a9d7f6",
    labelIds: ["INBOX", "IMPORTANT", "STARRED"],
    // biome-ignore lint/suspicious/noExplicitAny: Example payload requires flexible typing
  } as any,
};





export const rawRequestExamplePayload = {
  data: {
    messages: [
      {
        id: "18c2f4b3e8a9d7f6",
        threadId: "18c2f4b3e8a9d7f6",
      },
      {
        id: "18c2f4b3e8a9d7f5",
        threadId: "18c2f4b3e8a9d7f5",
      },
    ],
    nextPageToken: "12345678901234567890",
    resultSizeEstimate: 2,
  },
};
