import eventTriggers from "./eventTriggers";
import { pollChangesTrigger } from "./pollChangesTrigger";
import { webhook } from "./webhook";
export default { webhook, pollChangesTrigger, ...eventTriggers };
