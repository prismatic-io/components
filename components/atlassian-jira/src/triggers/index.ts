import { pollChangesTrigger } from "./pollChangesTrigger";
import { webhookEvents } from "./webhookEvents";

export default {
  issueEventsTrigger: webhookEvents,
  pollChangesTrigger,
};
