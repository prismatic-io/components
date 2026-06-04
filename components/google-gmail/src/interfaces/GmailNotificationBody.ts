export interface GmailNotificationBody {
  message: {
    data: string;
    decodedData: {
      emailAddress: string;
      historyId: number;
    };
    messageId: string;
    message_id: string;
    publishTime: string;
    publish_time: string;
  };
}
