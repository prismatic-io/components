import { webhook } from "./webhookTrigger";
import { pollChangesTrigger } from "./pollChangesTrigger";
import eventTriggers from "./eventTriggers";

export default { webhook, pollChangesTrigger, ...eventTriggers };
