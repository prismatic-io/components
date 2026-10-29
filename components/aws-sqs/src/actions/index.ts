import listQueues from "./listQueues";
import sendMessage from "./sendMessage";
import receiveMessages from "./receiveMessages";
import getQueueUrl from "./getQueueUrl";
import deleteQueue from "./deleteQueue";
import createQueue from "./createQueue";
import deleteMessage from "./deleteMessage";
import createDeadLetterQueue from "./createDeadLetterQueue";

export default {
  listQueues,
  sendMessage,
  receiveMessages,
  getQueueUrl,
  deleteQueue,
  createQueue,
  deleteMessage,
  createDeadLetterQueue,
};
