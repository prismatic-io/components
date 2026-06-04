import { receiveMessagesFromQueue } from "./receiveFromQueue";
import sendMessageActions from "./sendToQueue";

export default {
  ...sendMessageActions,
  receiveMessagesFromQueue,
};
